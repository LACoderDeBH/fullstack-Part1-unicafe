import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
  <h1>
  {props.headings}
  </h1>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => {
  let display = (
  (props.text === "%") ? (
    <div>
      {props.value} %
    </div>
    ):
    (
    <div>
      {props.text} {props.value}
    </div>
    ))
    return display;
}

const Statistic = (props) => {
  return(
    <div>
    <Display value={props.value} text={props.text}/>
    </div>)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const headings = {
    feedback: 'give feedback',
    statistics: 'statistics'
  }

  const handleAverage = () => {
    if (!bad && !good && ! neutral) return 0
    return (-bad + good) / (bad + good + neutral)
  }

  const handlePositive = () => {
    if (!bad && !good && ! neutral) return 0
    return (good / (bad + good + neutral)) * 100
  }

  const handleAll = () => {
    if (!bad && !good && ! neutral) return 0
    return (bad +good + neutral)
  }

  const handleGoodClick = (newValue) => {
    setGood(newValue)
  }
  
  const handleNeutralClick = (newValue) => {
    setNeutral(newValue)
  }
  
  const handleBadClick = (newValue) => {
    setBad(newValue)
  }

  let stats = 
  (!bad && !good && ! neutral) ? (<div>No feedback given</div>)
  :
  (<div>
    <table>
      <tbody>
      <tr>
        <td><Statistic text="good" handleClick={() => handleGoodClick(good + 1)} value='' /></td>
        <td><Statistic text="" handleClick={() => handleGoodClick(good + 1)} value={good} /></td>
      </tr>
      <tr>
        <td><Statistic text="neutral" handleClick={() => handleNeutralClick(neutral + 1)} value =''/></td>
        <td><Statistic text="" handleClick={() => handleNeutralClick(neutral + 1)} value ={neutral}/></td>
      </tr>
      <tr>
        <td><Statistic text="bad" handleClick={() => handleBadClick(bad + 1)} value ='' /> </td>
        <td><Statistic text="" handleClick={() => handleBadClick(bad + 1)} value ={bad} /> </td>
      </tr>
      <tr>
        <td><Statistic text="all" value='' /></td>
        <td><Statistic text="" value={handleAll()} /></td>
      </tr>
      <tr>
        <td><Statistic text="average" value='' /></td>
        <td><Statistic text="" value={handleAverage()} /></td>
      </tr>
      <tr>
        <td><Statistic text="Positive" value='' /></td>
        <td><Statistic text="%" value={handlePositive()} /></td>
      </tr>
      </tbody>
    </table>
  </div>)

  return (
    <div>
      <Header headings={headings.feedback} />
      <Button handleClick={() => handleGoodClick(good + 1)} text="good" />
      <Button handleClick={() => handleNeutralClick(neutral + 1)} text="neutral" />
      <Button handleClick={() => handleBadClick(bad + 1)} text="bad" />
      <Header headings={headings.statistics} />
      {stats}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)