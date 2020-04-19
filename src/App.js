import React, { Component } from "react";
import "./styles.css"
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  Input,
  Button,
  InputGroupAddon,
  FormGroup,
  Fade
} from "reactstrap";

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      status: 'Up',
      setCounter: 0,
      repCounter: 0,
      startingSet:30,
      lineHieght:200,
      threshold:5,
      fadeIn:true,
      collapsed:true,
      setCollapsed:true,
      time: 0,
      showTime:'0',
      isOn: false,
      start: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  startTimer() {
    if(!this.state.isOn){
      this.setState({
        time: this.state.time,
        start: Date.now() - this.state.time,
        isOn: true
      })
      
      this.timer = setInterval(() => {
        var fullTime = Date.now() - this.state.start
        var strTime = fullTime.toString().substr(0, fullTime.toString().length - 3)
        this.setState({
        time: Date.now() - this.state.start,
        showTime: strTime
      })
      } , 1);
    }
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({isOn: false, time: 0, showTime:'0'})
    clearInterval(this.timer)
  }
  
  componentDidMount() {
    this.timer1 = setInterval(() => this.fecthInfo(), 500);
  }
  
  async fecthInfo() {
    console.log('Fecht Data')
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
      if(responseData.startTimer){
        console.log('Start Timer')
        this.startTimer()
      }
      else{
        console.log('Reset Timer')
        this.resetTimer()
      }
      console.log(responseData);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  runPython = () => {
    console.log('Start Video')
    this.setState({fadeIn:false})
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
    var path = 'http://127.0.0.1:5000/submitData?setCounter=' + String(this.state.startingSet)
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

  submitDataLine = () => {
    console.log('Submit Data')
    var path = 'http://127.0.0.1:5000/submitData?lineHeight=' + String(this.state.lineHieght)
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

  submitDataThreshold = () => {
    console.log('Submit Data')
    var path = 'http://127.0.0.1:5000/submitData?threshold=' + String(this.state.threshold)
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

  handleChangeTextSet(newText){
    this.setState({ startingSet: newText });
  }
  handleChangeTextLine(newText){
    this.setState({ lineHieght: newText });
    var path = 'http://127.0.0.1:5000/submitData?lineHeight=' + String(this.state.lineHieght)
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
  }
  handleChangeTextThreshold(newText){
    this.setState({ threshold: newText });
  }

  toggleNavbar = ()=>{
    this.setState({ 
      collapsed: !this.state.collapsed
    });
  }
  

  render(props) {
    return (
      <div>
        <Navbar dark color="dark">
          <Button className="but" color="secondary" onClick={this.runPython}>
            Start!
          </Button>
          <NavbarBrand href="/" >Prisoner Style Squat Workout</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <Row className="test">
                <Col>
                  <h4 className="settingsH4">Starting Set: {this.state.startingSet}</h4>
                  <InputGroup>
                    <Input 
                      placeholder="Amount" 
                      defaultValue={30}
                      min={1} 
                      max={100} 
                      type="number" 
                      step="1" 
                      onChange={(e) => this.handleChangeTextSet(`${e.target.value}`)} 
                    />
                    <InputGroupAddon addonType="prepend">
                      <Button onClick={this.submitData}>
                        Submit
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <Col>
                  <h4 className="settingsH4">Line Height: {this.state.lineHieght}</h4>
                  <InputGroup>
                    <Input 
                      placeholder="Amount" 
                      defaultValue={200}
                      min={50} 
                      max={425} 
                      type="number" 
                      step="5" 
                      onChange={(e) => this.handleChangeTextLine(`${e.target.value}`)} 
                    />
                    <InputGroupAddon addonType="prepend">
                      <Button onClick={this.submitDataLine}>
                        Submit
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <Col>
                  <h4 className="settingsH4">Threshold: {this.state.threshold}</h4>
                  <InputGroup>
                    <Input 
                      placeholder="Amount" 
                      defaultValue={5}
                      min={1} 
                      max={20} 
                      type="number" 
                      step="1" 
                      onChange={(e) => this.handleChangeTextThreshold(`${e.target.value}`)} 
                    />
                    <InputGroupAddon addonType="prepend">
                      <Button onClick={this.submitDataThreshold}>
                        Submit
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
            </Nav>
          </Collapse>
        </Navbar>
        <Row className="test">
          <Col xs={9}>
            <img className="img"></img>
          </Col>
          <Col>
            <Col>
              <h3 className="centered">
                Timer:
              </h3>
              <h4 className="centered">
                {this.state.showTime}
              </h4>
            </Col>
            <Col>
              <h3 className="centered">
                Position
              </h3>
              <h4 className="centered">
                {this.state.status}
              </h4>
            </Col>
            <Col>
              <h3 className="centered">
                Current Set
              </h3>
              <h4 className="centered">
                {this.state.setCounter}
              </h4>
            </Col>
            <Col>
              <h3 className="centered">
                Current Rep
              </h3>
              <h4 className="centered">
                {this.state.repCounter}
              </h4>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
