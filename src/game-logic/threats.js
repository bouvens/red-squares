import _ from 'lodash'
import { sign } from '../utils/funcs'
import { DEFAULTS } from '../constants/game'

const processSpeed = (threat, size, canFlyAway) => (axis, lean) => {
  const updatedThreat = { ...threat }

  updatedThreat.isGoingOut = sign(lean) === sign(updatedThreat.speed[axis])

  if (!updatedThreat.isOut) {
    if (canFlyAway && updatedThreat.isGoingOut) {
      updatedThreat.isOut = true
    } else {
      updatedThreat.speed[axis] = (updatedThreat.isGoingOut ? -1 : 1)
        * (updatedThreat.speed[axis] || 1)
    }
  }
  if (Math.abs(lean) > size * 3) {
    updatedThreat.isAroundField = false
  }

  return updatedThreat
}

const beat = (
  removeProbability,
  size,
  fieldWidth,
  fieldHeight,
) => (threat) => {
  let newThreat = { ...threat }
  const canFlyAway = Math.random() < 1 / removeProbability
  const processThreat = processSpeed(newThreat, size, canFlyAway)

  const leftBorder = size
  if (newThreat.x < leftBorder) {
    newThreat = processThreat('x', newThreat.x - leftBorder)
  }
  const rightBorder = fieldWidth - size
  if (newThreat.x > rightBorder) {
    newThreat = processThreat('x', newThreat.x - rightBorder)
  }

  const topBorder = size
  if (newThreat.y < topBorder) {
    newThreat = processThreat('y', newThreat.y - topBorder)
  }
  const bottomBorder = fieldHeight - size
  if (newThreat.y > bottomBorder) {
    newThreat = processThreat('y', newThreat.y - bottomBorder)
  }

  return newThreat
}

const newThreat = (size, index, fieldWidth, fieldHeight, maxSpeed) => {
  const lean = size * 2
  let x = Math.round(Math.random() * (fieldWidth - lean))
  let y = 0 - lean
  let speed = {
    x: Math.round(((Math.random() * 2) - 1) * maxSpeed),
    y: Math.ceil(Math.random() * maxSpeed),
  }

  if (Math.random() < 0.5) {
    x = 0 - lean
    y = Math.round(Math.random() * (fieldHeight - lean))
    speed = {
      x: Math.ceil(Math.random() * maxSpeed),
      y: Math.round(((Math.random() * 2) - 1) * maxSpeed),
    }

    if (Math.random() < 0.5) {
      x = fieldWidth
      speed.x *= -1
    }
  } else if (Math.random() < 0.5) {
    y = fieldHeight
    speed.y *= -1
  }
  return {
    id: index,
    x,
    y,
    speed,
    isOut: false,
    isAroundField: true,
  }
}

function moveThreats ({ threats, removeProbability, size }, fieldWidth, fieldHeight) {
  return threats
    .map((threat) => ({
      ...threat,
      x: threat.x + threat.speed.x,
      y: threat.y + threat.speed.y,
    }))
    .map(beat(
      removeProbability,
      size,
      fieldWidth,
      fieldHeight,
    ))
    .filter((threat) => threat.isAroundField)
}

function beatThreats (newThreats) {
  let beats = 0

  return {
    beatenThreats: newThreats.map((threat) => {
      const updatedThreat = { ...threat }

      if (updatedThreat.isGoingOut && !updatedThreat.isOut) {
        beats += 1
        delete updatedThreat.isGoingOut
      }
      return updatedThreat
    }, 0),
    beats,
  }
}

function addThreats ({ newThreats, threats, frame, fieldWidth, fieldHeight, frameLength }) {
  const threatsWithAdded = [...newThreats]
  let isAdded = false

  if ((newThreats.length < threats.limit)
    && (frame >= threats.lastTime + (threats.addTimeout / frameLength))) {
    threatsWithAdded.push(newThreat(
      threats.size,
      threats.index,
      fieldWidth,
      fieldHeight,
      threats.maxSpeed,
    ))
    isAdded = true
  }

  return { threatsWithAdded, isAdded }
}

export function controlThreats (state) {
  const { threats, game: { frame, fieldWidth, fieldHeight } } = state
  const { frameLength } = DEFAULTS

  const movedThreats = moveThreats(threats, fieldWidth, fieldHeight)
  const outs = threats.threats.length - movedThreats.length

  const { beatenThreats, beats } = beatThreats(movedThreats)

  const { threatsWithAdded, isAdded } = addThreats(
    { newThreats: beatenThreats, threats, frame, fieldWidth, fieldHeight, frameLength },
  )

  const newState = _.merge({}, state, {
    game: {
      beats: state.game.beats + beats,
      outs: state.game.outs + outs,
    },
    threats: isAdded
      ? {
        lastTime: frame,
        index: threats.index + 1,
      }
      : threats,
  })

  newState.threats.threats = threatsWithAdded

  return newState
}
