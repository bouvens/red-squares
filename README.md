# Red Squares

### [Demo](https://bouvens.github.io/red-squares/)
This experiment is made with [state-control ![npm][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/state-control.png?style=flat-square
[npm]: https://www.npmjs.org/package/state-control

## What is this?

This is a simple game I made on React and Redux with a self-made canvas component. It can be played with a mouse or automatically with special functions written on JavaScript.

## Rules

The field has a size of 800 by 600 pixels. Rivals are generated just behind edges of the field. The timeout of adding rivals is configurable. Every rival has a random speed that cannot be greater than configurable maximum speed. A rival can fly off the field on every hit with an edge with a given probability. The Hero must avoid any contact with rivals.

## How to run locally

Run in bash:
```Shell
git clone git@github.com:bouvens/red-squares.git
cd red-squares
npm install
npm run start
```

Also, there's a script for a local build:
```Shell
npm run build
```

## Controlling by AI

A controller is a JavaScript function that accepts a state of the game and returns a new position to which the Hero should move. The Hero is moving to a new location with his maximum speed. To proceed with a lower speed controller should return position closer to current.

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

The game AI controllers use the store as input.

* game
    * redSquares: a helper object for getting mouse position
    * inputController: a helper object for intercepting keypresses
    * manager: a name of a controller function
    * status: one of `GAME_STATUS` constants which defines the state of the game (_play_, _pause_, _stop_)
    * autoRestart: the flag which represents will be game restarted on stop or not
    * score: a score
    * highestScore: the highest score
    * outs: a quantity of flown away rivals
    * frame: the game frames counter
    * speed: one of `SPEEDS` constants that can be _normal_ for frames with timeouts, _fast_ without timeouts, or _fastest_ for rendering only 100th frame
    * fieldWidth: width of the field
    * fieldHeight: height of the field
    * error: a string that will appear below the field in case of error
* hero
    * x: horizontal position of the Hero in pixels
    * y: vertical position of the Hero in pixels
    * maxSpeed: a maximum speed of the Hero in pixels
    * status: on of `HERO_STATUSES` constants that can be _normal_ for alive Hero and _trouble_ for dead Hero
    * size: half of the size of the Hero in pixels
    * shadowPeriod: number of frames, one of them will appear as a shadow
    * shadowQuantity: quantity of shadows
    * shadows: an array of shadows
        * x: horizontal position of a shadow in pixels
        * y: vertical position of a shadow in pixels
        * id: an identifier of a shadow element
    * target: object
        * x: horizontal position in pixels to which the Hero seeks
        * y: vertical position in pixels to which the Hero seeks
        * save: not used element for now for keeping information by AI controller
* rivals
    * rivals: an array of rivals
        * id: an identifier of the rival element
        * x: horizontal position of the rival in pixels
        * y: vertical position of the rival in pixels
        * speed: an object of speed
            * x: horizontal speed in pixels per frame
            * y: vertical speed in pixels per frame
        * isOut: flag of moving out of the field
        * isAroundField: helper flag to define is rival close enough to field or need to be removed
        * isGoingOut: flag showing if the rival is flying out
    * size: half of the size of a rival in pixels
    * maxSpeed: a maximum speed of rivals in pixels
    * lastTime: number of a frame when the game added a rival
    * addTimeout: quantity of frames between adding rivals
    * index: id for a new rival
    * limit: a maximum amount of rivals
    * removeProbability: a reciprocal probability of flying out on hitting with an edge of the field

## Structure of folders

* dist: a build will be saved there on running `npm run build`
* public: files from here will be added to `dist` folder on build
* src: source folder
    * controllers: AI for the red square
* test: there must be tests
