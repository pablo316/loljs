import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Filters } from "./Filters.js";

const React = require("react");

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "LA1",
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            value: result[0],
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

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <Filters patch={this.state.value} />
          </header>
        </div>
      );
    }
  }
}
export default App;
