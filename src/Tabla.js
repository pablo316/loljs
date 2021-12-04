import { Item } from "./Item.js";
const React = require("react");

export class Tabla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isLoaded: false,
      puuid: "",
      l: [],
      loadedMatch: false,
      match: [],
    };
    this.item = this.item.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      let list = [];
      this.props.list.forEach((id) => {
        fetch(
          "https://americas.api.riotgames.com/lol/match/v5/matches/" +
            id +
            "?api_key=" +
            this.props.api
        )
          .then((res) => res.json())
          .then(
            (result) => {
              list.push(result.info.participants);
            },
            (error) => {
              this.setState({
                error,
              });
            }
          );
      });
      this.setState({
        match: list,
        isLoaded: true,
      });
    }
  }

  componentDidMount() {
    let list = [];
    this.props.list.forEach((id) => {
      fetch(
        "https://americas.api.riotgames.com/lol/match/v5/matches/" +
          id +
          "?api_key=" +
          this.props.api
      )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            list.push(result.info.participants);
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    });
    this.setState({
      match: list,
      isLoaded: true,
    });
  }

  item() {
    while (this.state.match.length === 0) {
      return <div> </div>;
    }
    return (
      <Item
        match={this.state.match}
        patch={this.props.patch}
        name={this.props.name}
        list={this.props.list}
      />
    );
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div>{this.item()}</div>
        </div>
      );
    }
  }
}
