import { gameStatus } from '../constants/game'

const statusHandler = (state, status) => ({
    ...state,
    game: {
        ...state.game,
        status
    }
})

export function spacePress (state) {
    switch (state.game.status) {
        case gameStatus.play:
            return statusHandler(state, gameStatus.pause)
        case gameStatus.pause:
            return statusHandler(state, gameStatus.play)
        case gameStatus.stop:
        default:
            return {
                ...state,
                game: {
                    ...state.game,
                    status: gameStatus.play,
                    beats: 0,
                    outs: 0,
                    frame: 0,
                },
                threats: {
                    ...state.threats,
                    threats: [],
                    lastTime: 0 - state.threats.addTimeout / state.game.frameLength,
                },
            }
    }
}
