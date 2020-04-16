import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  Input,
  Button,
  InputGroupAddon,
  FormGroup,
} from "reactstrap";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Up',
      setCounter: 0,
      repCounter: 0,
      startingSet:30
    }
  }
  
  componentDidMount() {
    this.timer = setInterval(() => this.fecthInfo(), 500);
  }
  
  async fecthInfo() {
    console.log('Call Python')
    fetch('http://127.0.0.1:5000/data', {method: "POST"})
    .then((response) => response.json())
    .then((responseData) =>
    {
      //set your data here
      console.log(responseData.img)
      this.setState({
        status: responseData.position,
        repCounter: responseData.repCounter,
        setCounter: responseData.setCounter,
      });
      console.log(responseData);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  runPython = () => {
    console.log('Call Python')
    fetch('http://127.0.0.1:5000/start', {method: "POST"})
    .then((response) => response.json())
    .then((responseData) =>
    {
      //set your data here
      console.log(responseData);
    })
    .catch((error) => {
        console.error(error);
    });
  };

  submitData = () => {
    console.log('Submit Data')
    var path = 'http://127.0.0.1:5000/submitData?startingSet=' + String(this.state.startingSet)
    fetch(path, {method: "POST"})
    .then((response) => response.json())
    .then((responseData) =>
    {
      //set your data here
      console.log(responseData);
    })
    .catch((error) => {
        console.error(error);
    });
  };

  handleChangeText(newText){
    this.setState({ startingSet: newText });
  }

  render(props) {
    return (
      <div>
        <Navbar dark color="dark">
          <NavbarBrand href="/"> Squat</NavbarBrand>
        </Navbar>
        <Row>
          <Col xs={9} className="main"></Col>
          <Col className="sideBar">
            <Col>
              <h3 className="centered" id="tit">
                Starting Set
              </h3>
              <h1 className="centered" id="bod">
                {this.state.startingSet}
              </h1>
              <InputGroup>
                <Input 
                  placeholder="Amount" 
                  defaultValue={30}
                  min={0} 
                  max={100} 
                  type="number" 
                  step="1" 
                  onChange={(e) => this.handleChangeText(`${e.target.value}`)} 
                />
                <InputGroupAddon addonType="prepend">
                  <Button onClick={this.submitData}>
                    Submit
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              
            </Col>
            <Col>
              <h3 className="centered" id="tit">
                Position
              </h3>
              <h1 className="centered" id="bod">
                {this.state.status}
              </h1>
            </Col>
            <Col>
              <h3 className="centered" id="tit">
                Current Set
              </h3>
              <h1 className="centered" id="bod">
                {this.state.setCounter}
              </h1>
            </Col>
            <Col>
              <h3 className="centered" id="tit">
                Current Rep
              </h3>
              <h1 className="centered" id="bod">
                {this.state.repCounter}
              </h1>
            </Col>
            <Col className="centered">
              <Button className="but" color="primary" onClick={this.runPython}>
                Start!
              </Button>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
