import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import style from './RedSquares.less'

const Hero = (props) => (
    <div
        ref={props.refHandler}
        className={style.hero}
        style={{
            width: `${props.size}px`,
            height: `${props.size}px`,
            top: `${props.top}px`,
            left: `${props.left}px`,
        }}
    />
)

const Threat = (props) => (
    <div
        ref={props.refHandler}
        className={style.threat}
        style={{
            width: `${props.size}px`,
            height: `${props.size}px`,
            top: `${props.top}px`,
            left: `${props.left}px`,
        }}
    />
)

Hero.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    refHandler: PropTypes.func,
    size: PropTypes.number.isRequired,
}

Hero.defaultProps = {
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
    children: PropTypes.object,
    refHandler: PropTypes.func,
}

Field.defaultProps = {
    children: null,
    refHandler: _.noop,
}

export default class RedSquares extends Component {
    propTypes = {
        settings: PropTypes.object,
    }
    state = {
        hero: {
            x: 0,
            y: 0,
        },
        threats: [
            {
                x: 200,
                y: 300,
            },
        ],
    }

    componentDidMount () {
        document.onmousemove = this.saveMousePos
        setInterval(this.updateFrame, 20)
    }

    mousePos = {
        x: 0,
        y: 0,
    }

    saveMousePos = (e) => {
        this.mousePos = {
            x: e.pageX,
            y: e.pageY,
        }
    }

    updateFrame = () => {
        const fieldRect = this.field
        // TODO check and browsers and rewrite like https://learn.javascript.ru/coordinates-document
        const fieldPos = {
            left: fieldRect.offsetLeft,
            top: fieldRect.offsetTop,
            right: fieldRect.offsetLeft + fieldRect.clientWidth,
            bottom: fieldRect.offsetTop + fieldRect.clientHeight,
        }
        let x = Math.max(this.mousePos.x - this.props.settings.heroSize / 2, fieldPos.left)
        x = Math.min(x, fieldPos.right - this.props.settings.heroSize)
        let y = Math.max(this.mousePos.y - this.props.settings.heroSize / 2, fieldPos.top)
        y = Math.min(y, fieldPos.bottom - this.props.settings.heroSize)

        this.setState({
            heroX: x - fieldPos.left,
            heroY: y - fieldPos.top,
        })
    }

    render () {
        return (
            <div className={style.wrapper}>
                <Field
                    refHandler={(elem) => { this.field = elem }}
                >
                    <Hero
                        refHandler={(elem) => { this.hero = elem }}
                        size={this.props.settings.heroSize}
                        left={this.state.heroX}
                        top={this.state.heroY}
                    />
                    {this.state.threats.map((threat, index) => <Threat
                        size={this.props.settings.threatSize}
                        left={threat.x}
                        top={threat.y}
                    />)}
                </Field>
            </div>
        )
    }
}
