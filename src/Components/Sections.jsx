import React, { Component } from 'react';
import {
    Card,
    Col,
    Row,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from "reactstrap";
import { Link } from "react-router-dom"
import image from "../Assets/welcome1.jpg"
import face from "../Assets/face.jpg"
import Feeds from "../Components/Feeds"
import { connect } from "react-redux";
import { handleProfiles } from "../Actions";
import { handleExperience } from "../Actions";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    userThunk: () => dispatch(handleProfiles()),
    experienceThunk: () => dispatch(handleExperience())
});

class Sections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            user: null
        };

        this.toggle = this.toggle.bind(this);
    }
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }



    render() {
        return (
            <>
  
                {this.state.user &&  (
                    <>
                     {/* <Feeds username = {this.state.user.username}/> */}
                           
                        <Container fluid className="hpCont">
                            <section className="sectCard">
                                <div className="profile-background-image profile-background-image--loading ember-view" style={{ backgroundImage: `url(${image})` }}>   </div>

                                <div className="ph5 pb5">

                                    <div className="display-flex">
                                        <Card className="photo text-align-left">
                                            <img className="cardImage" src={face} />
                                        </Card>
                                        <div className="flex-1 flex-column display-flex mt3 mb1">
                                            <div className="display-flex justify-flex-end align-items-center">
                                                <ButtonDropdown onClick={this.toggle} isOpen={this.state.isOpen}>
                                                    <DropdownToggle caret color="primary">
                                                        Add Profile Section
                                        </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem header>Header</DropdownItem>
                                                        <DropdownItem disabled>Action</DropdownItem>
                                                        <DropdownItem>Another Action</DropdownItem>
                                                        <DropdownItem divider />
                                                        <DropdownItem>Another Action</DropdownItem>
                                                    </DropdownMenu>
                                                </ButtonDropdown>
                                                <Button outline color="secondary">More</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Row className="col-sm-12">
                                        <Col sm="6">
                                            <div className="display-flex mt2">
                                                <div className="flex-1 mr5">
                                                    <h2 className="inline t-24 t-black t-normal break-words">{this.state.user.name} {this.state.user.surname}</h2>
                                                    <h4 className="mt1 t-18 t-black t-normal">{this.state.user.title}</h4>
                                                    <h6 className="mt1 t-18 t-black t-normal">{this.state.user.area}</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm="6" className="experienceCol" >
                                            <ul>
                                                <li className="expElement"><img id="expImage" src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.norrislakemarinas.org%2Fwp-content%2Fthemes%2Fnorris%2Fimg%2Flogo_placeholder.png&f=1&nofb=1" height="20px" />
                                                    <h6 className="experienceHeaders">Strive School</h6></li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                            </section>
                        </Container>
                        <Container fluid className="aboutCont">
                            <section className="aboutCard">
                                <ul>
                                    <li><h1 className="t-20">About</h1>
                                        <Link id="editLink"><i class="fa fa-pencil" aria-hidden="true"></i></Link></li>
                                </ul>
                                <p>{this.state.user.bio}</p>
                            </section>
                        </Container>
              </>
                )}


                <Container fluid className="experienceCont">
                    <section className="experienceCard">
                        <ul id="expUl">
                            <li><h1 className="t-20">Experience</h1>
                                <Link id="editLink"> <i class="fa fa-pencil" aria-hidden="true"></i></Link></li>
                        </ul>


                        {this.props.profile.userExperiences && this.props.profile.userExperiences.map(experience => (
                            <div key={experience._id}>
                                <Row className="col-sm-12" id="experienceRow" >
                                    <Col sm="2" className="my-1" >
                                        <img id="expImageTwo" src={experience.image} />
                                    </Col>
                                    <Col sm="2" className="expCol">
                                        <h6 className="expHeaders"><b>{experience.company}</b></h6>
                                        <h6>{experience.startDate.substr(0, 10)}</h6>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </section>
                    <hr style={{ backgroundColor: "#f2f2f2", height: 0.2 }} />
                    <section className="experienceCard">
                        <ul id="expUl">
                            <li><h1 className="t-20">Education</h1>
                                <Link id="editLink"> <i class="fa fa-pencil" aria-hidden="true"></i></Link></li>
                        </ul>

                        <Row className="col-sm-12" id="experienceRow" >
                            <Col sm="2" className="my-1" >
                                <img id="expImageTwo" src="http://www.logoground.com/uploads/z4110148Dummy.jpg" />
                            </Col>
                            <Col sm="2" className="expCol">
                                <h6 className="expHeaders"><b>Strive School</b></h6>
                                <h6>2019-06-01</h6>
                            </Col>
                        </Row>

                    </section>
                </Container>
            </>

        );
    }
    componentDidMount = async () => {
        await this.getProfile()
    }

    getProfile = async () => {
        var token = localStorage.getItem("accessToken");
        console.log(token)

        if (token) {
            var username = this.props.match.params.username;
            var res = await fetch("http://localhost:3000/users/" + username, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer" + " " + token
                },
            })
            if (res.ok) {
                var profile = await res.json();
            
            this.setState({
                user: profile
            })

        }
        }
    }

    // refreshToken = async () => {
    //     var token = localStorage.getItem("accessToken");
    //     console.log(token)
    //     if (token) {
    //         var res = await fetch("http://localhost:3000/users/refresh", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": "Bearer" + " " + token
    //             },
    //         })
    //         if (res.ok) {
    //             var tokenJson = await res.json();
    //             localStorage.setItem("accessToken", tokenJson.token)
    //         }

    //         // localStorage.removeItem("accessToken")
    //     }
    // }
}




export default connect(mapStateToProps, mapDispatchToProps)(Sections);
