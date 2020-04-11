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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: "feed",
    };
  }

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
              <p className="lead">Seleccionar traste</p>
              <FormGroup>
                <Input type="select"></Input>
              </FormGroup>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col className="in">
            <Container className="centered">
              <p className="lead">Seleccionar traste</p>
              <FormGroup>
                <Input type="select"></Input>
              </FormGroup>
            </Container>
          </Col>
          <Col className="out">
            <Container className="centered">
              <p className="lead">Seleccionar traste</p>
              <FormGroup>
                <Input type="select"></Input>
              </FormGroup>
            </Container>
          </Col>
        </Row>
        <Col className="centered">
          <Button color="primary" onClick={this.handleAddCity}>
            Submit
          </Button>
        </Col>
      </div>
    );
  }
}

export default App;
