# Red Squares

### [Demo](https://bouvens.github.io/red-squares/)
This experiment made with [state-control ![npm][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/state-control.png?style=flat-square
[npm]: https://www.npmjs.org/package/state-control

## What's this?

This is simple game made with React and Redux and displaying on canvas. It can be played with a mouse or automatically with special functions written on Javascript.

## Rules

The field has a size of 800 by 600 pixels. Threats are generated just behind edges of the field. Timeout of adding threats is configurable. Every threat have a random speed that can't be greater than configurable max speed. Threat can fly off the field on every hit with an edge with given probability. Hero must avoid any contacts with threats.

## How to run locally

Run in bash:
```Shell
git clone git@github.com:bouvens/red-squares.git
cd red-squares
npm install
npm run start
```

Also there's a script for local build:
```Shell
npm run build
```

## Controlling by AI

A controller is a Javascript function that accepted a state of the game and return new position to which the hero should move. Hero moving to a new position with his maximum speed. To move with lower speed controller should return position closer to current.

There's an example of a controller that moves the hero until he reaches a randomly chosen position:

```javascript
function getRandomCoordinate (range, size) {
    return Math.random() * (range - size * 2) + size
}

let target

export default function (state) {
    if (!target || (state.hero.x === target.x && state.hero.y === target.y)) {
        target = {
            x: getRandomCoordinate(state.game.fieldWidth, state.hero.size),
            y: getRandomCoordinate(state.game.fieldHeight, state.hero.size),
        }
    }

    return target
}
```

## Structure of the store

Store used as input in game AI controllers.

* game
    * redSquares: helper object for getting mouse position
    * inputController: helper object for intercepting key presses
    * manager: name of a controller function
    * status: one of `GAME_STATUS` constants that defines state of the game (_play_, _pause_, _stop_)
    * autoRestart: flag defines will be game restarted on stop or not
    * beats: score
    * highestBeats: highest score
    * outs: number of flied off threats
    * frame: game’s frame counter
    * speed: one of `SPEEDS` constants that can be _normal_ for frames with timeouts, _fast_ without timeouts, or _fastest_ for rendering only 100th frame
    * fieldWidth: width of the field
    * fieldHeight: height of the field
    * error: string that will be shown as error below the field
* hero
    * x: horizontal position of the Hero in pixels
    * y: vertical position of the Hero in pixels
    * maxSpeed: maximum speed of the Hero in pixels
    * status: on of `HERO_STATUSES` constants that can be _normal_ for alive hero and _trouble_ for dead hero
    * size: half of size of the Hero in pixels
    * shadowPeriod: defines which frame must be saved as shadow
    * shadowQuantity: quantity of shadows
    * shadows: array of shadows
        * x: horizontal position of a shadow in pixels
        * y: vertical position of a shadow in pixels
        * id: identifier of a shadow element
    * target: object
        * x: horizontal position in pixels to which the Hero seeks
        * y: vertical position in pixels to which the Hero seeks
        * save: not used element for now for saving information by AI controller
* threats
    * threats: array of threats
        * id: identifier of a threat element
        * x: horizontal position of a threat in pixels
        * y: vertical position of a threat in pixels
        * speed: object of speed
            * x: horizontal speed in pixels per frame
            * y: vertical speed in pixels per frame
        * isOut: flag of moving out of the field
        * isAroundField: helper flag to define is threat close enough to field or need to be removed
    * size: half of size of a threat in pixels
    * maxSpeed: maximum speed of threats in pixels
    * lastTime: number of a frame when a threat was added
    * addTimeout: quantity of frames between adding threats
    * index: id for a new threat
    * limit: maximum quantity of threats
    * removeProbability: reciprocal probability of flying out on hitting with an edge of the field

## Structure of folders

* dist: there build will be saved on running `npm run build`
* public: will be added to dist folder on build
* src: source folder
    * controllers: AI for red square
* test: there must be tests
