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
let { PythonShell } = require("python-shell");

class App extends Component {
  constructor(props) {
    super(props);
    this.scale = [
      "A",
      "A#",
      "B",
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
    ];
    this.totalChords = [
      "A",
      "Am",
      "A#",
      "A#m",
      "B",
      "Bm",
      "C",
      "Cm",
      "C#",
      "C#m",
      "D",
      "Dm",
      "D#",
      "D#m",
      "E",
      "Em",
      "F",
      "Fm",
      "F#",
      "F#m",
      "G",
      "Gm",
      "G#",
      "G#m",
    ];
    this.state = {
      chords: [],
      newChord: "A",
      results: [],
      frets: [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6],
      currentFret: -6,
    };
  }
  handleInputChange = (e) => {
    this.setState({ newChord: e.target.value });
  };

  handleAddCity = () => {
    this.setState((prevState) => ({
      chords: [...prevState.chords, this.state.newChord],
    }));
    console.log(this.state.chords, this.state.currentFret);
  };

  removeChord = (e) => {
    var index = e.target.value;
    console.log(index);
    this.setState((prevState) => {
      // pass callback in setState to avoid race condition
      let newData = prevState.chords.slice(); //copy array from prevState
      newData.splice(index, 1); // remove element
      return { chords: newData };
    });
    console.log(this.state);
  };
  handleChangeCity = (e) => {
    this.setState({ currentFret: parseInt(e.target.value) });
  };
  submit = () => {
    var mychord;
    var results = [];
    var chordIndex;
    for (var i = 0; i < this.state.chords.length; i++) {
      if (this.state.chords[i].includes("m")) {
        mychord = this.state.chords[i].replace("m", "");
        chordIndex = this.scale.indexOf(mychord) + this.state.currentFret;
        console.log(this.scale.indexOf(mychord), this.state.currentFret);
        if (chordIndex > this.scale.length - 1) {
          chordIndex -= this.scale.length;
        }
        if (chordIndex < 0) {
          chordIndex += this.scale.length;
        }
        results.push(this.scale[chordIndex] + "m");
      } else {
        mychord = this.state.chords[i];
        chordIndex = this.scale.indexOf(mychord) + this.state.currentFret;
        console.log(this.scale.indexOf(mychord), this.state.currentFret);
        if (chordIndex > this.scale.length - 1) {
          chordIndex -= this.scale.length;
        }
        if (chordIndex < 0) {
          chordIndex += this.scale.length;
        }
        console.log(chordIndex);
        results.push(this.scale[chordIndex]);
      }
    }
    this.setState({ results });
    console.log(results);
  };

  render(props) {
    return (
      <div>
        <Navbar dark color="dark">
          <NavbarBrand href="/"> Rocker</NavbarBrand>
        </Navbar>
        <Row>
          <Col className="jumbo">
            <Container className="centered">
              <h1 className="display-3">Rocker</h1>
              <p className="lead">Seleccionar</p>
              <FormGroup>
                <Input type="select" onChange={this.handleChangeCity}>
                  {this.state.frets.map((frets, i) => (
                    <option key={i}>{frets}</option>
                  ))}
                </Input>
              </FormGroup>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col className="in">
            <Container className="centered">
              <p className="lead">Agregar acorde</p>
              <Col className="cent">
                {this.state.chords.map((chord, i) => (
                  <Row className="cent">
                    <h1 key={i}>{chord}</h1>
                    <Button
                      key={i}
                      onClick={this.removeChord}
                      value={i}
                      className="redbutton"
                      color="danger"
                    >
                      X
                    </Button>
                  </Row>
                ))}
              </Col>
              <InputGroup>
                <Input type="select" onChange={this.handleInputChange}>
                  {this.totalChords.map((frets, i) => (
                    <option key={i}>{frets}</option>
                  ))}
                </Input>
                <InputGroupAddon>
                  <Button color="primary" onClick={this.handleAddCity}>
                    Agregar
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Container>
          </Col>
          <Col className="out">
            <Container className="centered">
              <p className="lead">Tus acordes</p>

              {this.state.results.map((chord, i) => (
                <Row className="cent">
                  <h1 key={i * 2}>{chord}</h1>
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
        <Col className="centered">
          <Button color="primary" onClick={this.submit}>
            Submit
          </Button>
        </Col>
      </div>
    );
  }
}

export default App;
