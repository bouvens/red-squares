import _ from 'lodash'
import { sign } from '../utils/funcs'
import { DEFAULTS } from '../constants/game'

const processSpeed = (rival, size, canFlyAway) => (axis, lean) => {
  const updatedRival = { ...rival }

  updatedRival.isGoingOut = sign(lean) === sign(updatedRival.speed[axis])

  if (!updatedRival.isOut) {
    if (canFlyAway && updatedRival.isGoingOut) {
      updatedRival.isOut = true
    } else {
      updatedRival.speed[axis] = (updatedRival.isGoingOut ? -1 : 1)
        * (updatedRival.speed[axis] || 1)
    }
  }
  if (Math.abs(lean) > size * 3) {
    updatedRival.isAroundField = false
  }

  return updatedRival
}

const bump = (
  removeProbability,
  size,
  fieldWidth,
  fieldHeight,
) => (rival) => {
  let newRival = { ...rival }
  const canFlyAway = Math.random() < 1 / removeProbability
  const processRival = processSpeed(newRival, size, canFlyAway)

  const leftBorder = size
  if (newRival.x < leftBorder) {
    newRival = processRival('x', newRival.x - leftBorder)
  }
  const rightBorder = fieldWidth - size
  if (newRival.x > rightBorder) {
    newRival = processRival('x', newRival.x - rightBorder)
  }

  const topBorder = size
  if (newRival.y < topBorder) {
    newRival = processRival('y', newRival.y - topBorder)
  }
  const bottomBorder = fieldHeight - size
  if (newRival.y > bottomBorder) {
    newRival = processRival('y', newRival.y - bottomBorder)
  }

  return newRival
}

const newRival = (size, index, fieldWidth, fieldHeight, maxSpeed) => {
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

function moveRivals ({ rivals, removeProbability, size }, fieldWidth, fieldHeight) {
  return rivals
    .map((rival) => ({
      ...rival,
      x: rival.x + rival.speed.x,
      y: rival.y + rival.speed.y,
    }))
    .map(bump(
      removeProbability,
      size,
      fieldWidth,
      fieldHeight,
    ))
    .filter((rival) => rival.isAroundField)
}

function bumpRivals (newRivals) {
  let score = 0

  return {
    bumpedRivals: newRivals.map((rival) => {
      const updatedRival = { ...rival }

      if (updatedRival.isGoingOut && !updatedRival.isOut) {
        score += 1
        delete updatedRival.isGoingOut
      }
      return updatedRival
    }),
    score,
  }
}

function addRivals ({ newRivals, rivals, frame, fieldWidth, fieldHeight, frameLength }) {
  const rivalsWithAdded = [...newRivals]
  let isAdded = false

  if ((newRivals.length < rivals.limit)
    && (frame >= rivals.lastTime + (rivals.addTimeout / frameLength))) {
    rivalsWithAdded.push(newRival(
      rivals.size,
      rivals.index,
      fieldWidth,
      fieldHeight,
      rivals.maxSpeed,
    ))
    isAdded = true
  }

  return { rivalsWithAdded, isAdded }
}

export function controlRivals (state) {
  const { rivals, game: { frame, fieldWidth, fieldHeight } } = state
  const { frameLength } = DEFAULTS

  const movedRivals = moveRivals(rivals, fieldWidth, fieldHeight)
  const outs = rivals.rivals.length - movedRivals.length

  const { bumpedRivals, score } = bumpRivals(movedRivals)

  const { rivalsWithAdded, isAdded } = addRivals(
    { newRivals: bumpedRivals, rivals, frame, fieldWidth, fieldHeight, frameLength },
  )

  const newState = _.merge({}, state, {
    game: {
      score: state.game.score + score,
      outs: state.game.outs + outs,
    },
    rivals: isAdded
      ? {
        lastTime: frame,
        index: rivals.index + 1,
      }
      : rivals,
  })

  newState.rivals.rivals = rivalsWithAdded

  return newState
}
