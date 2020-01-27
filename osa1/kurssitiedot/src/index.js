import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {

    return (
        <>
            <Part part={props.parts[0]}></Part>
            <Part part={props.parts[1]}></Part>
            <Part part={props.parts[2]}></Part>
        </>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Total = (props) => {
    let exercises = 0;
    props.parts.forEach(part => {
        exercises += part.exercises;
    })
    return (
        <p>Number of exercises {exercises}</p>
    )
}

const App = () => {
    const course = {
        name:'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of react',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

