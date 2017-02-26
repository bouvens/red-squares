import { heroStates } from '../constants/hero'

const getHeroStatus = ({
    x,
    y,
    heroSize,
    threatSize,
    threats,
}) => {
    const safeLength = (heroSize + threatSize) / 2
    const sizeFix = (threatSize - heroSize) / 2

    if (threats.some((threat) =>
            Math.abs(threat.x - x + sizeFix) < safeLength && Math.abs(threat.y - y + sizeFix) < safeLength
        )) {

        return heroStates.trouble
    }

    return heroStates.normal
}

export function moveHero (
    mousePos,
    field,
    heroSize,
    threatSize,
    threats,
) {
    let x = Math.max(mousePos.x - heroSize / 2, field.left)
    x = Math.min(x, field.right - heroSize)
    x -= field.left
    let y = Math.max(mousePos.y - heroSize / 2, field.top)
    y = Math.min(y, field.bottom - heroSize)
    y -= field.top

    return {
        hero: {
            x,
            y,
            status: getHeroStatus({
                x,
                y,
                heroSize,
                threatSize,
                threats,
            }),
        }
    }
}
