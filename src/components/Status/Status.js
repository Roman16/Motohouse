import React from "react"

export const Status = ({value}) => {
    switch (value) {
        case 'progress':
            return (<span style={{color: 'red'}}>В роботі</span>)

        case 'done':
            return (<span style={{color: 'green'}}>Виконаний</span>)

        case 'archived':
            return (<span style={{color: '#fff'}}>Закритий</span>)

        default:
            return (<span/>)
    }
}