export const SCARY_INTERVAL = 4 / 3
export const VARIANTS_QUANTITY = 24

const getDistance = (A, B) => Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)

export const getNearest = ({ x, y }, threats) => threats.reduce((nearest, threat) => {
    const distance = getDistance({ x, y }, threat)
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

export const getSafeInterval = (hero, threats) =>
    (hero.size + threats.size + hero.maxSpeed + threats.maxSpeed) * SCARY_INTERVAL

export function getScaryEdges (hero, size, width, height) {
    const edges = []
    const { x, y } = hero

    edges.push({
        x,
        y: -size * 1.1,
    })
    edges.push({
        x,
        y: height + size * 1.1,
    })

    edges.push({
        x: -size * 1.1,
        y,
    })
    edges.push({
        x: width + size * 1.1,
        y,
    })

    return edges
}

export function getVariants (hero) {
    const variants = []
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / VARIANTS_QUANTITY) {
        variants.push({
            x: hero.x + Math.cos(angle) * hero.maxSpeed,
            y: hero.y + Math.sin(angle) * hero.maxSpeed,
        })
    }

    return variants
}
