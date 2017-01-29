import React, { Component, PropTypes } from 'react'
import style from './RedSquares.less'
import Field from './Field'
import Square from './Square'

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
    /* global performance */
    static propTypes = {
        heroSize: PropTypes.number.isRequired,
        threatSize: PropTypes.number.isRequired,
        threatLimit: PropTypes.number.isRequired,
        threatAddTimeout: PropTypes.number.isRequired,
    }

    state = {
        hero: {
            x: 0,
            y: 0,
            status: heroStates.normal,
        },
        threats: [],
        lastTreatTime: performance.now() - this.props.threatAddTimeout,
    }

    componentDidMount () {
        document.onmousemove = this.saveMousePos

        this.saveFieldSize()
        window.onresize = this.saveFieldSize

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
        const { heroSize, threatSize } = this.props
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
        this.controlThreats()
    }

    saveFieldSize = () => {
        const fieldRect = this.field
        // TODO check and browsers and rewrite like https://learn.javascript.ru/coordinates-document
        this.setState({
            field: {
                left: fieldRect.offsetLeft,
                top: fieldRect.offsetTop,
                right: fieldRect.offsetLeft + fieldRect.clientWidth,
                bottom: fieldRect.offsetTop + fieldRect.clientHeight,
                width: fieldRect.clientWidth,
                height: fieldRect.clientHeight,
            }
        })
    }

    moveHero = () => {
        const fieldPos = this.state.field
        let x = Math.max(RedSquares.mousePos.x - this.props.heroSize / 2, fieldPos.left)
        x = Math.min(x, fieldPos.right - this.props.heroSize)
        let y = Math.max(RedSquares.mousePos.y - this.props.heroSize / 2, fieldPos.top)
        y = Math.min(y, fieldPos.bottom - this.props.heroSize)

        this.setState({
            hero: {
                x: x - fieldPos.left,
                y: y - fieldPos.top,
                status: this.getHeroStatus(),
            }
        })
    }

    moveThreats = () => {
        this.setState({
            threats: this.state.threats.map((threat) => (
                {
                    ...threat,
                    x: threat.x + threat.speed.x,
                    y: threat.y + threat.speed.y,
                }
            ))
        })
    }

    beat = (field) => (threat) => {
        let { x, y, speed } = threat

        const rightBorder = field.width - this.props.threatSize
        if (x <= 0) {
            speed.x = Math.abs(speed.x)
        }
        if (x >= rightBorder) {
            speed.x = -Math.abs(speed.x)
        }

        const bottomBorder = field.height - this.props.threatSize
        if (y <= 0) {
            speed.y = Math.abs(speed.y)
        }
        if (y >= bottomBorder) {
            speed.y = -Math.abs(speed.y)
        }

        return {
            ...threat,
            x,
            y,
            speed,
        }
    }

    controlThreats = () => {
        const field = this.state.field
        let threats = this.state.threats.map(this.beat(field))

        if (threats.length < this.props.threatLimit
            && performance.now() >= this.state.lastTreatTime + this.props.threatAddTimeout * 1000) {
            let y = 0 - this.props.threatSize
            let speed = {
                x: Math.floor(Math.random() * 4),
                y: Math.floor(Math.random() * 4 + 1),
            }

            if (Math.random() < 0.5) {
                y = field.height + this.props.threatSize
                speed.y = -speed.y
            }
            threats.push({
                x: Math.floor(Math.random() * (field.width - this.props.threatSize + 1)),
                y,
                speed,
            })
            this.setState({
                threats,
                lastTreatTime: performance.now(),
            })
        }
    }

    render () {
        return (
            <div className={style.wrapper}>
                <Field
                    style={style.field}
                    refHandler={(elem) => { this.field = elem }}
                >
                    <Square
                        style={this.state.hero.status.style}
                        refHandler={(elem) => { this.hero = elem }}
                        size={this.props.heroSize}
                        left={this.state.hero.x}
                        top={this.state.hero.y}
                    />
                    {this.state.threats.map((threat, index) => (
                        <Square
                            style={style.threat}
                            size={this.props.threatSize}
                            left={threat.x}
                            top={threat.y}
                        />
                    ))}
                </Field>
                <p>hero.x = {this.state.hero.x}</p>
                <p>hero.y = {this.state.hero.y}</p>
                <p>threat.x = {this.state.threats[0] && this.state.threats[0].x}</p>
                <p>threat.y = {this.state.threats[0] && this.state.threats[0].y}</p>
            </div>
        )
    }
}
