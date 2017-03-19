import { defaultHeroPosition } from '../utils/funcs'

const SCARY_INTERVAL = 4

const getDistance = (A, B) => Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)

const getNearest = (hero, threats) => threats.reduce((nearest, threat) => {
    const distance = getDistance(hero, threat)
    if (!nearest.threat || nearest.distance > distance) {
        return {
            threat,
            distance,
        }
    }

    return nearest
}, {
    threat: null,
    distance: Infinity,
})

const getScaryEdges = (size, width, height) => {
    const edges = []

    for (
        let x = -size;
        x < width + size;
        x += size
    ) {
        edges.push({
            x,
            y: -size,
        })
        edges.push({
            x,
            y: height + size,
        })
    }

    for (
        let y = -size;
        y < height + size;
        y += size
    ) {
        edges.push({
            x: -size,
            y,
        })
        edges.push({
            x: width + size,
            y,
        })
    }

    return edges
}

export default function ({ game, hero, threats }) {
    const scaryEdges = getScaryEdges(2 * threats.size, game.fieldWidth, game.fieldHeight)

    const nearestThreat = getNearest(hero, _.extend(scaryEdges, threats.threats))

    if (!nearestThreat.threat || nearestThreat.distance > SCARY_INTERVAL * hero.size) {
        return defaultHeroPosition
    }

    const distance = {
        x: hero.x - nearestThreat.threat.x,
        y: hero.y - nearestThreat.threat.y,
    }

    return {
        x: hero.x + distance.x,
        y: hero.y + distance.y,
    }
}
