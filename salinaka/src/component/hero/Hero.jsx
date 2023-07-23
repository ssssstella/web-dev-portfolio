import React from "react";
import "./sass/hero.css";
import { ArrowRight } from "@phosphor-icons/react";
import {Link} from "react-router-dom";

export default function Hero(props) {
    const {title, msg, btn, img} = props;

    return (
        <div className="hero">
            <div className="hero--left">
                <h1>{title}</h1>
                {msg && <p>{msg}</p>}
                {btn && <Link className="link" to="/shop"><button>{btn}<ArrowRight size={20} /></button></Link>}
            </div>
            <img src={img} alt="person with glasses" />
        </div>
    )
}