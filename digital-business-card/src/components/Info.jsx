import React from "react"

export default function Info() {
    return (
        <div className="info">
            <img className="info--profile" src="/src/images/profile.jpg" alt="laura proflie"/>
            <h4 className="info--name">Laura Smith</h4>
            <p className="info--occupation">Frontend Developer</p>
            <a href="#" className="info--website small-text">laurasmith.website</a>
            <div className="info--btn-ctn">
                <button className="info--btn email">
                    <img className="info--contact" src="/src/images/mail.png" alt="email"/>
                    <a href="#">Email</a>
                </button>
                <button className="info--btn linkedin">
                    <img className="info--contact" src="/src/images/linkedin.png" alt="linkedin"/>
                    <a href="#">LinkedIn</a>
                </button>
            </div>
        </div>
    )
}
