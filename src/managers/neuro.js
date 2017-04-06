import RL from '../lib/rl'
import { getNearest, getSafeInterval, getVariants, VARIANTS_QUANTITY } from './common'
import { GAME_STATUS } from '../constants/game'

const STATUSES = {
    notInitialized: 'notInitialized',
    learning: 'learning',
    dead: 'dead',
}

// create an environment object
const env = {
    getNumStates: () => 6, // one hero (2) + one threat (1 * 4)
    getMaxNumActions: () => VARIANTS_QUANTITY + 1,
}

// create the DQN agent
const spec = { alpha: 0.01 } // see full options on DQN page
const agent = new RL.DQNAgent(env, spec)
let neuroStatus = STATUSES.notInitialized

const getState = (hero, threats) => {
    const firstThreat = threats.threats[0] || { speed: {} }

    return [
        hero.x,
        hero.y,
        firstThreat.x || 0,
        firstThreat.y || 0,
        firstThreat.speed.x || 0,
        firstThreat.speed.y || 0,
    ]
}

export default function ({ game, hero, threats }) {
    const nearest = getNearest(hero, threats.threats).distance
    const safe = getSafeInterval(hero, threats)
    const reward = nearest > safe ? 1 : 1 - nearest / safe
    console.log(reward)

    // learning only after first act
    if (neuroStatus === STATUSES.learning) {
        agent.learn(reward) // the agent improves its Q, policy, model, etc. reward is a float
    }

    if (game.status === GAME_STATUS.stop) {
        neuroStatus = STATUSES.dead
        return {
            save: agent.toJSON()
        }
    }



    // set first act
    neuroStatus = STATUSES.learning
    const action = agent.act(getState(hero, threats)) // s is an array of length env.getNumStates()

    if (action < VARIANTS_QUANTITY) {
        return getVariants(hero)[action]
    }

    return {
        x: hero.x,
        y: hero.y,
    }
}
