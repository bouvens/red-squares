export const SCARY_INTERVAL = 3
export const VARIANTS_QUANTITY = 24

const getDistance = (A, B) => Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)

export const getNearest = (hero, threats) => threats.reduce((nearest, threat) => {
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

export const getScaryEdges = (size, width, height) => {
    const edges = []

    for (
        let x = -size;
        x < width + size;
        x += size
    ) {
        edges.push({
            x,
            y: -size * 1.1,
        })
        edges.push({
            x,
            y: height + size * 1.1,
        })
    }

    for (
        let y = -size;
        y < height + size;
        y += size
    ) {
        edges.push({
            x: -size * 1.1,
            y,
        })
        edges.push({
            x: width + size * 1.1,
            y,
        })
    }

    return edges
}
