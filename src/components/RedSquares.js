import React, { Component, PropTypes } from 'react'
import _ from 'lodash' // TODO is it needed?
import style from './RedSquares.less'

const Square = (props) => (
    <div
        ref={props.refHandler}
        className={props.style}
        style={{
            width: `${props.size}px`,
            height: `${props.size}px`,
            top: `${props.top}px`,
            left: `${props.left}px`,
        }}
    />
)

Square.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    refHandler: PropTypes.func,
    size: PropTypes.number.isRequired,
}

Square.defaultProps = {
    refHandler: _.noop,
}

const Field = (props) => (
    <div
        ref={props.refHandler}
        className={style.field}
    >
        {props.children}
    </div>
)

Field.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    refHandler: PropTypes.func,
}

Field.defaultProps = {
    children: null,
    refHandler: _.noop,
}

const heroStates = {
    normal: {
        id: 'normal',
        style: style.hero,
    },
    trouble: {
        id: 'trouble',
        style: style.heroInTrouble,
    },
}

export default class RedSquares extends Component {
    static propTypes = {
        settings: PropTypes.object.isRequired,
    }

    state = {
        hero: {
            x: 0,
            y: 0,
            status: heroStates.normal,
        },
        threats: [
            {
                x: 200,
                y: 0,
                speed: {
                    x: 0,
                    y: 2,
                }
            },
        ],
    }

    componentDidMount () {
        document.onmousemove = this.saveMousePos
        setInterval(this.updateFrame, 20)
    }

    static mousePos = {
        x: 0,
        y: 0,
    }

    saveMousePos = (e) => {
        RedSquares.mousePos = {
            x: e.pageX,
            y: e.pageY,
        }
    }

    getHeroStatus = () => {
        const { heroSize, threatSize } = this.props.settings
        const safeLength = (heroSize + threatSize) / 2
        const sizeFix = (threatSize - heroSize) / 2
        const hero = this.state.hero

        return this.state.threats.some((threat) =>
            Math.abs(threat.x - hero.x + sizeFix) < safeLength && Math.abs(threat.y - hero.y + sizeFix) < safeLength
        ) ? heroStates.trouble : heroStates.normal
    }

    updateFrame = () => {
        this.moveHero()
        this.moveThreats()
    }

    getFieldPos = () => {
        const fieldRect = this.field
        // TODO check and browsers and rewrite like https://learn.javascript.ru/coordinates-document
        return {
            left: fieldRect.offsetLeft,
            top: fieldRect.offsetTop,
            right: fieldRect.offsetLeft + fieldRect.clientWidth,
            bottom: fieldRect.offsetTop + fieldRect.clientHeight,
            width: fieldRect.clientWidth,
            height: fieldRect.clientHeight,
        }
    }

    moveHero = () => {
        const fieldPos = this.getFieldPos()
        let x = Math.max(RedSquares.mousePos.x - this.props.settings.heroSize / 2, fieldPos.left)
        x = Math.min(x, fieldPos.right - this.props.settings.heroSize)
        let y = Math.max(RedSquares.mousePos.y - this.props.settings.heroSize / 2, fieldPos.top)
        y = Math.min(y, fieldPos.bottom - this.props.settings.heroSize)

        this.setState({
            hero: {
                x: x - fieldPos.left,
                y: y - fieldPos.top,
                status: this.getHeroStatus(),
            }
        })
    }

    moveThreats = () => {
        const fieldPos = this.getFieldPos()

        this.setState({
            threats: this.state.threats.map((threat) => {
                const y = threat.y + threat.speed.y

                return {
                    ...threat,
                    x: threat.x,
                    y: y <= fieldPos.height ? y : -this.props.settings.threatSize,
                }
            })
        })
    }

    render () {
        return (
            <div className={style.wrapper}>
                <Field
                    refHandler={(elem) => { this.field = elem }}
                >
                    <Square
                        style={this.state.hero.status.style}
                        refHandler={(elem) => { this.hero = elem }}
                        size={this.props.settings.heroSize}
                        left={this.state.hero.x}
                        top={this.state.hero.y}
                    />
                    {this.state.threats.map((threat, index) => (
                        <Square
                            style={style.threat}
                            size={this.props.settings.threatSize}
                            left={threat.x}
                            top={threat.y}
                        />
                    ))}
                </Field>
                <p>hero.x = {this.state.hero.x}</p>
                <p>hero.y = {this.state.hero.y}</p>
                <p>threat.x = {this.state.threats[0].x}</p>
                <p>threat.y = {this.state.threats[0].y}</p>
            </div>
        )
    }
}
