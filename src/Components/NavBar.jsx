import React, { Component } from "react";
import image from "../Assets/download.png"
import face from "../Assets/face.jpg"
import { Link } from "react-router-dom"
import Sections from "./Sections"

class NavBar extends Component {
    state = {}
    render() {
        return (
            <header id="extended-nav" className="extended-nav nav-main-container global-alert-offset-top">
                <div id="bodyDiv" className="nav-main__content full-height display-flex align-items-center">
                    <div id="inbugDiv" className="nav-main__inbug-container">
                        <div id="inbug-nav-item" className="nav-item--inbug">
                            <img src={image} id="linkedinIcon" height="30px"/>
                            <input className="search-global-typeahead__input" placeholder=" search" role="combobox" aria-expanded="false" aria-owns aria-label="search" type="text"/>
                   
                        </div>

                    </div>
                    <ul className="nav-main nav-container display-flex full-height">
                     <li id="feed-nav-item" className="nav-item nav-item--feed">
                     <Link to={"/feed"} id="icons">
                     <span><i className="fa fa-home fa-lg" aria-hidden="true"></i></span>
                     <span className="nav-item__title">Home</span>
                     </Link>
                     </li>

                     <li id="feed-nav-item" className="nav-item nav-item--feed">
                     <a id="iconsNetwork" href="#">
                     <span> <i className="fa fa-users" aria-hidden="true"></i></span>
                     <span className="nav-item__title">My Network</span>
                     </a>
                     </li>

                     <li id="feed-nav-item" className="nav-item nav-item--feed">
                     <a id="iconsJobs" href="#">
                     <span><i className="fa fa-briefcase" aria-hidden="true"></i></span>
                     <span className="nav-item__title">Jobs</span>
                     </a>
                     </li>

                     <li id="feed-nav-item" className="nav-item nav-item--feed">
                     <Link to={"/chat"} id="iconsMessaging" href="/chat">
                     <span><i className="fa fa-comments" aria-hidden="true"></i></span>
                     <span className="nav-item__title">Messages</span>
                     </Link>
                     </li>

                     <li id="feed-nav-item" className="nav-item nav-item--feed">
                     <a id="iconsNotifications" href="#">
                     <span><i className="fa fa-bell" aria-hidden="true"></i></span>
                     <span className="nav-item__title">Notifications</span>
                     </a>
                     </li>

                     <li id="feed-nav-item" className="nav-item nav-item--feed">
                     <Link to= {"/profile/" + this.props.username} id="iconsProfile">
                     <img className="navImg" src={face}/>
                     <span className="nav-item__title">Profile</span>
                     </Link>
                     </li>
                     
                    </ul>
                </div>
            </header>
        )
    }
}

export default NavBar;