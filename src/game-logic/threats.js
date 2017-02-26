const processSpeed = ({ newThreat, size, canFlyAway }) => ({ axis, lean }) => {
    newThreat.isGoingOut = Math.sign(lean) === Math.sign(newThreat.speed[axis])

    if (!newThreat.isOut) {
        if (canFlyAway && newThreat.isGoingOut) {
            newThreat.isOut = true
        } else {
            newThreat.speed[axis] = (newThreat.isGoingOut ? -1 : 1) * (newThreat.speed[axis] || 1)
        }
    }
    if (Math.abs(lean) > size * 2) {
        newThreat.isAroundField = false
    }

    return newThreat
}

const beat = ({
    removeProbability,
    size,
    fieldWidth,
    fieldHeight,
}) => (threat) => {
    let newThreat = { ...threat }
    const canFlyAway = Math.random() < 1 / removeProbability
    const processThreat = processSpeed({ newThreat, size, canFlyAway })

    if (newThreat.x < 0) {
        newThreat = processThreat({
            axis: 'x',
            lean: newThreat.x,
        })
    }
    const rightBorder = fieldWidth - size
    if (newThreat.x > rightBorder) {
        newThreat = processThreat({
            axis: 'x',
            lean: newThreat.x - rightBorder,
        })
    }

    if (newThreat.y < 0) {
        newThreat = processThreat({
            axis: 'y',
            lean: newThreat.y,
        })
    }
    const bottomBorder = fieldHeight - size
    if (newThreat.y > bottomBorder) {
        newThreat = processThreat({
            axis: 'y',
            lean: newThreat.y - bottomBorder,
        })
    }

    return newThreat
}

const newThreat = ({ size, index, fieldWidth, fieldHeight, maxSpeed }) => {
    let x = Math.round(Math.random() * (fieldWidth - size))
    let y = 0 - size
    let speed = {
        x: Math.round((Math.random() * 2 - 1) * maxSpeed),
        y: Math.ceil(Math.random() * maxSpeed),
    }

    if (Math.random() < 0.5) {
        x = 0 - size
        y = Math.round(Math.random() * (fieldHeight - size))
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

export function controlThreats (
    threats,
    removeProbability,
    limit,
    frame,
    lastTime,
    addTimeout,
    frameLength,
    size,
    index,
    fieldWidth,
    fieldHeight,
    maxSpeed,
) {
    threats = threats
        .map((threat) => (
            {
                ...threat,
                x: threat.x + threat.speed.x,
                y: threat.y + threat.speed.y,
            }
        ))
        .map(beat({
            removeProbability,
            size,
            fieldWidth,
            fieldHeight,
        }))
    const oldThreatsNum = threats.length
    threats = threats.filter((threat) => threat.isAroundField)
    const outs = oldThreatsNum - threats.length

    let beats = 0

    threats = threats.map((threat) => {
        if (threat.isGoingOut && !threat.isOut) {
            beats += 1
            delete threat.isGoingOut
        }

        return threat
    })

    let added = 0
    if (threats.length < limit && frame >= lastTime + (addTimeout / frameLength)) {
        threats.push(newThreat({ size, index, fieldWidth, fieldHeight, maxSpeed }))
        added = 1
        lastTime = frame
    }

    return {
        threats,
        beats,
        outs,
        added,
        lastTime,
    }
}
