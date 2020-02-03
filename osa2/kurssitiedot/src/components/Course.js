import React from 'react';

const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

const Content = (props) => {

    return (
        <div>

            {props.parts.map((part) =>
                <Part key={part.id} part={part}></Part>
            )}

        </div>
    )
}


const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Total = (props) => {
    const exercises = props.parts.map(part => part.exercises)
        .reduce((a, b) => a + b);

    return (
        <p><b>Number of exercises {exercises}</b></p>
    )
}

const Course = (props) => {

    return (
        <div>
            <Header course={props.course.name}></Header>
            <Content parts={props.course.parts}></Content>
            <Total parts={props.course.parts}></Total>
        </div>
    )
}

export default Course
