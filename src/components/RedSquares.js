import React, { Component, PropTypes } from 'react'
import style from './RedSquares.less'

const Hero = (props) => <div
    className={style.hero}
    style={{
        top: `${props.top}px`,
        left: `${props.left}px`,
    }}
/>

Hero.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
}

const Field = (props) => <div className={style.field}>
    {props.children}
</div>

Field.propTypes = {
    children: PropTypes.object,
}

Field.defaultProps = {
    children: null,
}

export default class RedSquares extends Component {
    handleMouseMove (e) {
        // console.log(e.pageX, e.pageY)
    }

    render () {
        return (
            <div className={style.wrapper} onMouseMove={this.handleMouseMove}>
                <Field
                    ref={(elem) => { this.hero = elem }}
                >
                    <Hero
                        ref={(elem) => { this.hero = elem }}
                        top={10}
                        left={20}
                    />
                </Field>
            </div>
        )
    }
}
