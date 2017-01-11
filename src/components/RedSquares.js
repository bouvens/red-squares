import React, { PropTypes } from 'react'
import style from './RedSquares.less'

export default class RedSquares extends React.Component {
    render () {
        return (
            <div className={style.wrapper}>
                <div className={style.field}>
                    <div className={style.hero} />
                </div>
            </div>
        )
    }
}
