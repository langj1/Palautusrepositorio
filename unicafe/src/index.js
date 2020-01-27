import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ name, handleClick }) => (

    <button onClick={handleClick}>{name}</button>
)

const StatisticsLine = ({ name, value, suffix }) => {
    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                {value} {suffix}
            </td>
        </tr>
    )
}

const Statistics = ({ good, bad, neutral }) => {

    let all = bad + good + neutral;
    let avg = good || bad ? (good - bad) / all : 0;
    let pos = good ? (good / all) * 100 : 0;
    if (all > 0) {
        return (
            <>
                <h2>Statistics</h2>

                <table>
                    <tbody>
                    <StatisticsLine name="good" value={good}></StatisticsLine>
                    <StatisticsLine name="neutral" value={neutral}></StatisticsLine>
                    <StatisticsLine name="bad" value={bad}></StatisticsLine>
                    <StatisticsLine name="all" value={all}></StatisticsLine>
                    <StatisticsLine name="average" value={avg}></StatisticsLine>
                    <StatisticsLine name="positive" value={pos} suffix="%"></StatisticsLine>
                    </tbody>
                </table>
            </>
        )
    } else {
        return (
            <>
                <h2>Statistics</h2>
                <div>
                    No feedback given
                </div>
            </>
        )
    }
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setGoodValue = (newValue) => setGood(newValue);
    const setNeutralValue = (newValue) => setNeutral(newValue);
    const setBadValue = (newValue) => setBad(newValue);

    return (
        <div>
            <h2>Give feedback</h2>

            <Button name="good" handleClick={() => setGoodValue(good + 1)}></Button>
            <Button name="neutral" handleClick={() => setNeutralValue(neutral + 1)}></Button>
            <Button name="bad" handleClick={() => setBadValue(bad + 1)}></Button>

            <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)