import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
  state = {
    results: {}, // { [id]: success | error }
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'Вопрос 1',
        rightAnswerId: 2,
        id: 1,
        answers: [
          {text: 'Ответ 1', id: 1},
          {text: 'Ответ 2', id: 2},
          {text: 'Ответ 3', id: 3},
          {text: 'Ответ 4', id: 4}
        ]
      },
      {
        question: 'Вопрос 2',
        rightAnswerId: 4,
        id: 4,
        answers: [
          {text: 'Ответ 1', id: 1},
          {text: 'Ответ 2', id: 2},
          {text: 'Ответ 3', id: 3},
          {text: 'Ответ 4', id: 4}
        ]
      }
    ]
  }

  onAnswerClickHandler = (id) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        console.log('return')
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = {}

    if (question.rightAnswerId === id) {

      this.setState({
        answerState: { [id]: 'success' }
      })

      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[id] = 'error'
      this.setState({
        answerState: { [id]: 'error' },
        results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  render() {
    return (
      <div className={classes.Quiz}>

        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.isFinished
              ? <FinishedQuiz />
              : <ActiveQuiz 
                  answers={this.state.quiz[this.state.activeQuestion].answers}
                  question={this.state.quiz[this.state.activeQuestion].question}
                  onAnswerClick={this.onAnswerClickHandler}
                  quizLength={this.state.quiz.length}
                  answerNumber={this.state.activeQuestion + 1}
                  answerState={this.state.answerState}
              />
          }
        </div>
      </div>
    )
  }
}

export default Quiz
