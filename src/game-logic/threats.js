import _ from 'lodash'
import { sign } from '../utils/funcs'

const processSpeed = (newThreat, size, canFlyAway) => (axis, lean) => {
    newThreat.isGoingOut = sign(lean) === sign(newThreat.speed[axis])

    if (!newThreat.isOut) {
        if (canFlyAway && newThreat.isGoingOut) {
            newThreat.isOut = true
        } else {
            newThreat.speed[axis] = (newThreat.isGoingOut ? -1 : 1) * (newThreat.speed[axis] || 1)
        }
    }
    if (Math.abs(lean) > size * 3) {
        newThreat.isAroundField = false
    }

    return newThreat
}

const beat = (removeProbability,
              size,
              fieldWidth,
              fieldHeight) =>
    (threat) => {
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
        x: Math.round((Math.random() * 2 - 1) * maxSpeed),
        y: Math.ceil(Math.random() * maxSpeed),
    }

    if (Math.random() < 0.5) {
        x = 0 - lean
        y = Math.round(Math.random() * (fieldHeight - lean))
        speed = {
            x: Math.ceil(Math.random() * maxSpeed),
            y: Math.round((Math.random() * 2 - 1) * maxSpeed),
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

export function controlThreats (state) {
    const { threats } = state
    const { frame, frameLength, fieldWidth, fieldHeight } = state.game

    let newThreats = threats.threats
        .map((threat) => (
            {
                ...threat,
                x: threat.x + threat.speed.x,
                y: threat.y + threat.speed.y,
            }
        ))
        .map(beat(
            threats.removeProbability,
            threats.size,
            fieldWidth,
            fieldHeight,
        ))
    const oldThreatsNum = newThreats.length
    newThreats = newThreats.filter((threat) => threat.isAroundField)
    const outs = oldThreatsNum - newThreats.length

    let beats = 0

    newThreats = newThreats.map((threat) => {
        if (threat.isGoingOut && !threat.isOut) {
            beats += 1
            delete threat.isGoingOut
        }
        return threat
    }, 0)

    let added = 0
    if (newThreats.length < threats.limit && frame >= threats.lastTime + (threats.addTimeout / frameLength)) {
        newThreats.push(newThreat(
            threats.size,
            threats.index,
            fieldWidth,
            fieldHeight,
            threats.maxSpeed,
        ))
        added = 1
    }

    const newState = _.merge({}, state, {
        game: {
            beats: state.game.beats + beats,
            outs: state.game.outs + outs,
        },
        threats: {
            lastTime: added ? frame : threats.lastTime,
            index: threats.index + added,
        },
    })

    newState.threats.threats = newThreats

    return newState
}
