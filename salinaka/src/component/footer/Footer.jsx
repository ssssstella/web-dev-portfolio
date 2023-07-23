import React from "react";
import Logo from "../logo/Logo";
import "./sass/footer.css";

export default function Footer() {
    return (
        <div className="footer">
            <p>Developed by <a href="https://github.com/ssssstella/web-dev-portfolio">Stella</a></p>
            <div>
                <Logo/>
                <p>&copy; 2023</p>
            </div>
            <p>Folk this project <a href="https://github.com/ssssstella/web-dev-portfolio/tree/main/salinaka">HERE</a></p>
        </div>
    )
}