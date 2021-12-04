import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Data } from "./Data.js";
const React = require("react");

export class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "la1",
      name: "",
      api: "",
      data: false,
      puuid: "",
      reload: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleApi = this.handleApi.bind(this);
    this.getNombre = this.getNombre.bind(this);
    this.data = this.data.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleApi(event) {
    this.setState({ api: event.target.value });
  }

  handleName(event) {
    this.setState({ name: event.target.value });
    event.preventDefault();
  }

  componentDidMount() {}

  data() {
    if (!this.state.data) {
      return <div> </div>;
    }

    return (
      <Data
        patch={this.props.patch}
        region={this.state.value}
        puuid={this.state.puuid}
        api={this.state.api}
        name={this.state.name}
      />
    );
  }

  getNombre(event) {
    fetch(
      "https://" +
        this.state.value +
        ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
        this.state.name +
        "?api_key=" +
        this.state.api
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            puuid: result.puuid,
            reload: true,
            data: true,
          });
        },
        (error) => {
          this.setState({
            reload: true,
            data: true,
            error,
          });
        }
      );
    event.preventDefault();
  }

  show(event) {
    this.getNombre();
    event.preventDefault();
  }

  render() {
    return (
      <div>
        {" "}
        <Form onSubmit={this.getNombre}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Nombre:
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                placeholder="Nombre"
                value={this.state.name}
                onChange={this.handleName}
                size="sm"
              />
            </Col>

            <Form.Label column sm="2">
              Region:
            </Form.Label>
            <Col sm={2}>
              <Form.Select
                aria-label="Default select example"
                onChange={this.handleChange}
                size="sm"
              >
                <option value="la1">LA1</option>
                <option value="la2">LA2</option>
                <option value="br1">BR1</option>
              </Form.Select>
            </Col>
            <Form.Label column sm="1">
              API:
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                placeholder="RGAPI-xxxx-xxxx-xx"
                value={this.state.api}
                onChange={this.handleApi}
                size="sm"
              />
            </Col>
            <Col sm={1}>
              <Button variant="success" type="submit">
                Buscar
              </Button>
            </Col>
          </Form.Group>
        </Form>
        <div>{this.data()}</div>
      </div>
    );
  }
}
