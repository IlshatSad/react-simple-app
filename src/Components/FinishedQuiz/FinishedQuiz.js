import React from 'react'
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        <li>
          <strong>1. </strong>
          Test
          <i className={'fa fa-times ' + classes.error} />
        </li>
      </ul>


      <p>Правильно 4 из 10</p>

      <button>Повторить</button>
    </div>
  )
}
export default FinishedQuiz
