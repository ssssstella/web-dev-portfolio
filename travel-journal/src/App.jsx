import React from "react"
import Hero from "./components/Hero"
import Card from "./components/Card"
import data from "./data"


export default function App() {
    const cardElements = data.map(item => {
        return <Card 
                    key={item.id}
                    item={item}
               />
    })

    return (
        <div className="app">
            <Hero />
            <div className="cards">
                {cardElements}
            </div>
        </div>
    )
}