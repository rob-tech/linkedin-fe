import React, { Component } from 'react';
import io from "socket.io-client";
import { Col, Row, Container, Button} from "reactstrap";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { handleProfiles } from "../Actions";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    userThunk: () => dispatch(handleProfiles()),
});

class Chat extends Component {
  socket = null;

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      userName: "",
      messages: [],
      showModal: true
    };
  }

  componentDidMount = async () => {
   await this.props.userThunk()
    const connOpts = {
      transports: ["websocket"]
    };

    this.socket = io("https://striveschool.herokuapp.com/", connOpts);

    this.socket.on("bmsg", msg => {
      this.setState(
        {
          messages: this.state.messages.concat(msg)
        },
        () => {
          window.scrollTo(0, document.body.scrollHeight);
          console.log(this.state.messages);
        }
      );
    });
  }

  handleMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  sendMessage = async event => {
    event.preventDefault();
    await this.socket.emit("bmsg", {
      message: this.state.message
    });
    this.setState({
      message: ""
    });
  };

  toggleModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <Container fluid className="feedCont">
          <Row id="feedrow" className="col-12 ">
            <Col className="col-2 sideSect">
              <section className="msgLeftSect">
                <ul>
                  <li><h1 className="t-19">Messaging</h1>
               <Link id="addLink"><i class="fa fa-user-plus" aria-hidden="true"></i></Link></li>
                </ul>
                <hr id= "msgHr" style={{ backgroundColor: "#f2f2f2", height: 0.2 }} />
  
                <input className="search-messages" placeholder="search messages..." role="combobox" aria-expanded="false" aria-owns aria-label="search" type="text"/>  

              </section>
            </Col>
            <Col className="col-sm-10 col-12">
            <section className="feedCard3">
            <ul id="messagesList">
            <>
            {/* {this.props.profile.userProfile && this.props.profile.userProfile.map(message=> {
              return(
              <div  key={message._id}>
              <li>
                 {message.username}
              </li>
              </div>
              )
            })} */}
            
              {this.state.messages && this.state.messages.map((message, index) => (
                <div  key={index}>
                  
                <li>
                   {message.message}
                </li>
                </div>
              ))}
              </>
            </ul>
            </section>
            <section className="feedCard4">
            <form id="chat" onSubmit={this.sendMessage}>
              <input
                className="textInput"
                placeholder="write message here..."
                type="text"
                id="m"
                autoComplete="off"
                onChange={this.handleMessage}
                value={this.state.message}
              />
              <br/>
              <Button id="msgBtn" size="sm" color="info">Send</Button>
            </form>
            </section>
            </Col>
          </Row>
        </Container>
      </>

    );
  }





}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
