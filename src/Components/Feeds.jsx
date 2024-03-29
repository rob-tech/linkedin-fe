import React, { Component } from 'react';
import {
    Card,
    Col,
    Row,
    Container,
    Button,
    Modal
} from "reactstrap";
import { Scrollbars } from 'react-custom-scrollbars';
import image from "../Assets/welcome1.jpg"
import face from "../Assets/face.jpg"
import { connect } from "react-redux";
// import { handleProfiles } from "../Actions";
// import {handleAllProfiles } from "../Actions";
// import { getFeeds } from "../Actions";
import { postFeeds } from "../Actions";
import { Link } from "react-router-dom"

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    errMess: () =>
        dispatch({
            type: "ERR_MSG",
        }),
    // userThunk: () => dispatch(handleProfiles()),
    // userFeedThunk: () => dispatch(getFeeds()),
    postFeedThunk: (userText) => dispatch(postFeeds(userText)),
    // allProfilesThunk: () => dispatch(handleAllProfiles()),
});

class Feeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultModal: false,
            userText: "",
            messages: "",
            feeds: [],
            user: null

        };
    }
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    handleSubmit = async userText => {


        try {
    

            var response = await this.props.postFeedThunk(this.state.userText)
            if (response === null) {
                var error = await this.props.errMess()
                console.log(error)
                this.props.errMess(error.message)
                        this.setState({
            userText: ""
        });
            }
 
        } catch (ex) {
            console.log(ex);
            this.props.errMess(ex.message)
        }

        var allFeeds = await this.getFeeds()
        this.setState(
            {
                messages: this.state.messages.concat(allFeeds)
            }
        )
    }

    render() {
        console.log(this.state.text)
        return (
            <>
                {this.state.user && (
                    <>
                        <div key={this.state.user._id}>
                            <Container fluid className="feedCont">
                                <Row id="feedrow" className="col-12 ">
                                    <Col className="col-2 sideSect">
                                        <section className="feedLeftSect">
                                            <div className="profile-background-image profile-background-image--loading-feed" style={{ backgroundImage: `url(${image})` }}>   </div>

                                            <div className="ph4 pb4">

                                                <div className="display-flex">
                                                    <Card className="photo">
                                                        <img className="feedCardImage" src={face} alt="img"/>
                                                    </Card>
                                                </div>

                                                <div className="leftSideSect">
                                                    <h2 className="inline t-23 t-black t-normal break-words">{this.state.user.name} {this.state.user.surname}</h2>
                                                    <h4 className="mt1 t-17 t-black t-normal">{this.state.user.title}</h4>
                                                </div>

                                            </div>
                                            <hr style={{ backgroundColor: "#f2f2f2", height: 0.2 }} />
                                        </section>
                                    </Col>

                                    <Col className="col-sm-10 col-12">

                                        <section className="feedCard">
                                            <Row id="feedRow2" className="col-3 col-sm-12 col-md-12">
                                                <Col id="writeInst" className="col-sm-4 "><Link id="feedLink" onClick={() => this.toggleModal("defaultModal")}><i className="fa fa-pencil-square fa-lg" aria-hidden="true">   Start a post</i> </Link></Col>
                                                <Modal
                                                    className="modal-dialog-centered"
                                                    isOpen={this.state.defaultModal}
                                                    toggle={() => this.toggleModal("defaultModal")}
                                                >
                                                    <div className="modal-header">
                                                        <h6 className="modal-title" id="modal-title-default">
                                                            Comment
                                               </h6>
                                                        <button
                                                            aria-label="Close"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            type="button"
                                                            onClick={() => this.toggleModal("defaultModal")}
                                                        >
                                                            <span aria-hidden={true}>×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <input type="text" value={this.state.userText} onChange={(val) => this.setState({ userText: val.currentTarget.value })} />
                                                    </div>
                                                    <div className="modal-footer">
                                                        <Button color="primary"
                                                            type='submit' onClick={this.handleSubmit}>
                                                            Post Comment
                                                      </Button>
                                                        <Button
                                                            className="ml-auto"
                                                            color="link"
                                                            data-dismiss="modal"
                                                            type="button"
                                                            onClick={() => this.toggleModal("defaultModal")}
                                                        >
                                                            Close
                                              </Button>
                                                    </div>
                                                </Modal>
                                                <Col id="camInst" className="col-2"> <Link id="cameraLink"><i className="fa fa-camera fa-lg" aria-hidden="true"></i> </Link>
                                                </Col>
                                                <Col id="camInst" className="col-2"> <Link id="cameraLink"><i className="fa fa-video-camera fa-lg" aria-hidden="true"></i> </Link>
                                                </Col>
                                                <Col id="camInst" className="col-2"> <Link id="cameraLink"><i className="fa fa-file-text fa-lg" aria-hidden="true"></i> </Link>
                                                </Col>
                                            </Row>
                                            <hr id="feedHr" />
                                        </section>
                                        <Scrollbars style={{ height: 500 }}>

                                            {this.state.feeds && this.state.feeds.map(feeds => {
                                                return (
                                                    <div key={feeds._id}>
                                                        <section className="feedCard2">
                                                            <Row className="col-sm-12" id="experienceRow" >
                                                                <Col sm="12" className="expCol">
                                                                    <h6 className="expHeaders"><b>{feeds.username}</b></h6>
                                                                </Col>
                                                                <Col sm="12" >
                                                                    <h6 className="expHeaders"><b>{feeds.text}</b></h6>
                                                                </Col>
                                                            </Row>
                                                        </section>
                                                    </div>
                                                )
                                            })}

                                        </Scrollbars>
                                    </Col>

                                </Row>
                            </Container>
                        </div>
                    </>

                )}

            </>

        );
    }
    componentDidMount = async () => {
      
        // await this.props.userThunk()
        // await this.props.userFeedThunk()
        await this.getProfile()
        await this.getFeeds()
        // await this.props.allProfilesThunk()
    }

    getFeeds = async () => {
        // var token = this.props.token
        var token = localStorage.getItem("accessToken");
        console.log(token)

        if (token) {
            var res = await fetch("http://localhost:3000/feeds", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                },
            })
            if (res.ok) {
                var posts = await res.json();

                this.setState({
                    feeds: posts
                })

            }
        }
    }

    getProfile = async () => {
        var token = localStorage.getItem("accessToken");
        console.log(token)

        if (token) {
            var username = this.props.username
            var res = await fetch("http://localhost:3000/users/" + username, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
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

}
export default connect(mapStateToProps, mapDispatchToProps)(Feeds);