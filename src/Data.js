import { Tabla } from "./Tabla.js";
const React = require("react");

export class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isLoaded: false,
      puuid: "",
      list: [],
      loadedMatch: false,
    };
    this.list = this.list.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.puuid !== this.props.puuid) {
      fetch(
        "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
          this.props.puuid +
          "/ids?type=ranked&start=0&count=10&api_key=" +
          this.props.api
      )
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              list: result,
              isLoaded: true,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
  }

  componentDidMount() {
    fetch(
      "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
        this.props.puuid +
        "/ids?type=ranked&start=0&count=10&api_key=" +
        this.props.api
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            list: result,
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  list() {
    if (this.state.list.length === 0) {
      return <div> </div>;
    }
    return (
      <Tabla
        patch={this.props.patch}
        region={this.props.region}
        list={this.state.list}
        api={this.props.api}
        name={this.props.name}
      />
    );
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div>{this.list()}</div>;
    }
  }
}
