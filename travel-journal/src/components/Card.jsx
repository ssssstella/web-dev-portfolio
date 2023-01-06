import React from "react"

export default function Card(props) {
    const {imageUrl, title, location, googleMapsUrl, startDate, endDate, description} = props.item

    return (
        <div className="card--ctn">
            <img className="card--img" src={imageUrl} alt={title}/>
            <div className="card--info">
                <div className="card--location">
                    <img src="images/pin.png" alt="pin-logo"/>
                    <p>{location}</p>
                    <a href={googleMapsUrl}>View on Google Maps</a>
                </div>
                <h1>{title}</h1>
                <p className="card--date">{startDate} - {endDate}</p>
                <p className="card--desc">{description}</p>
            </div>
        </div>
    )
}