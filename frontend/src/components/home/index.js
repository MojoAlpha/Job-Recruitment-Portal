import React from 'react'

export default function Home() {
    return (
        <div>
           <nav className="navbar fixed-top mx-4">
                <a class="navbar-brand logo font-primary" href="/">Devhub</a>
                <div className="nav-cta float-right">
                    <button className="btn btn-outline-primary mr-2" >Log in</button>
                    <button className="btn btn-primary" style={{color:"##11B0BB"}}>sign up</button>
                </div>
            </nav>

            <div id="landing"></div>
        </div>
    )
}
