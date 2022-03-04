import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = (props) => {
    return (
        <div id="wrapper">
            <section className="intro">
                <header>
                    <h1>Reciperts</h1>
                    <p>
                        your place for generation after generation of tradition
                    </p>
                    <Link to='login'><button className="button primary">Sign In</button></Link>
                </header>
            </section>
            
            <div className="content">
                <header>
                    <h1>New User</h1>
                    <p>
                    The little cards grandma wrote her recipes on in her beautiful cursive are getting lost or are hard to read. You need somewhere secure to keep my recipes with me forever!
                    </p>
                    <Link to='signup'><button className="button secondary">Sign Up</button></Link>
                </header>
            </div>
        </div>
    )
}

export default Home;