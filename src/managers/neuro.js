import RL from '../lib/rl'
import { GAME_STATUS } from '../constants/game'
import { getNearest, getSafeInterval, getVariants, VARIANTS_QUANTITY } from './common'

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
const spec = { alpha: 0.01 } // see full options on DQN page // TODO: tune it
const getAgent = () => new RL.DQNAgent(env, spec)
let agent = getAgent()
let neuroStatus = STATUSES.notInitialized

const getState = (hero, threats) => {
    const firstThreat = threats.threats[0]
        || {
            x: 0,
            y: 0,
            speed: {
                x: 0,
                y: 0,
            }
        }

    return [
        hero.x,
        hero.y,
        firstThreat.x,
        firstThreat.y,
        firstThreat.speed.x,
        firstThreat.speed.y,
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

        debugger
        fetch('/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(agent.toJSON(), null, 2),
        }).then((response) => {
            console.log('dead: ' + JSON.stringify(agent.toJSON(), null, 2))
            console.log('response: ' + response)

            return {
                x: hero.x,
                y: hero.y,
            }
        }).catch(console.error)
    } else if (neuroStatus === STATUSES.dead) { // TODO when we got normal save, replace it to !== STATUSES.learn
        fetch('/')
            .then((response) => response.json())
            .then((save) => {
                console.log('reborn: ' + save)
                agent = getAgent() // TODO will we need to complete remake?
                agent.fromJSON(save)
            })
            .catch(console.error)
    } else {
        // set first act
        neuroStatus = STATUSES.learning

        const action = agent.act(getState(hero, threats)) // s is an array of length env.getNumStates()

        return action < VARIANTS_QUANTITY
            ? getVariants(hero)[action]
            : {
                x: hero.x,
                y: hero.y,
            }
    }

}
