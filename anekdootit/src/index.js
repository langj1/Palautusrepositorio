import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(6).fill(0))
    const [mostVotes, setMostVotes] = useState(0)

    const getRandom = () => {
        let index = Math.floor(Math.random() * 6);
        setSelected(index);
    }

    const addVote = () => {
        const copy = [...points];
        copy[selected] +=1;
        setPoints(copy);
        setMostVotes(setVotes(copy));
    }

    const setVotes = (array) => {
        let max = 0;
        let index = 0;
        for(let i=0;i<array.length;i++){
           if(array[i] > max){
            index = i;
            max = array[i];
           }
        }
        console.log(index);
        return index;
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            {props.anecdotes[selected]}
            <br />
            has {points[selected]} votes
            <br/>
            <button onClick={() => addVote()}>vote</button>
            <button onClick={() => getRandom()}>next anecdote</button>
       
            <h2>Anecdote with most votes</h2>
            {props.anecdotes[mostVotes]}
            <br/>
            has {points[mostVotes]} votes
        </div>
    )
}


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes}  />,
    document.getElementById('root')
)
