import { getNearest, getVariants, getSafeInterval } from './common'

const setupMinDistance = (fieldWidth, fieldHeight, safe) => ({ x, y }, threats) => Math.min(
    getNearest({ x, y }, threats).distance,
    x + safe,
    fieldWidth + safe - x,
    y + safe,
    fieldHeight + safe - y,
)

function getClearest (safe, fieldWidth, fieldHeight, threats) {
    let clearest = 0
    let xBest
    let yBest
    const getMinDistance = setupMinDistance(fieldWidth, fieldHeight, safe)

    for (let x = safe; x < fieldWidth - safe; x += safe) {
        for (let y = safe; y < fieldHeight - safe; y += safe) {
            const distance = getMinDistance({ x, y }, threats)

            if (distance > clearest) {
                clearest = distance
                xBest = x
                yBest = y
            }
        }
    }

    return {
        x: xBest,
        y: yBest,
    }
}

export default function ({ game, hero, threats }) {
    const newThreats = threats.threats.map((threat) => (
        {
            x: threat.x + threat.speed.x,
            y: threat.y + threat.speed.y,
        }
    ))

    const safe = hero.size + threats.size
    const getMinDistance = setupMinDistance(game.fieldWidth, game.fieldHeight, safe)
    const nearest = getMinDistance(hero, newThreats)

    if (nearest > getSafeInterval(hero, threats)) {
        return getClearest(safe, game.fieldWidth, game.fieldHeight, newThreats)
    }

    const variant = getVariants(hero).reduce((best, current) => {
        const distance = getMinDistance(current, newThreats)

        if (distance > best.distance) {
            return {
                x: current.x,
                y: current.y,
                distance,
            }
        }

        return best
    }, {
        x: hero.x,
        y: hero.y,
        distance: nearest,
    })

    return {
        x: variant.x,
        y: variant.y,
    }
}
