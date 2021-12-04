import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
const React = require("react");

export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isLoaded: false,
      puuid: "",
      l: [],
      loadedMatch: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match !== this.props.match) {
      this.data();
    }
  }

  componentDidMount() {
    this.data();
  }

  data() {
    let table = [];
    let kda = "";
    let rol = "";
    let urlImg = "http://ddragon.leagueoflegends.com/cdn/" + this.props.patch;
    this.props.match.forEach((e) => {
      console.log(e);
      let team1 = [];
      let team2 = [];
      let items = [];
      let champ = "";
      e.forEach((s) => {
        if (s.summonerName === this.props.name) {
          champ = s.championName;
          rol = s.individualPosition;
          kda = s.kills + "/" + s.deaths + "/" + s.assists;
          if (s.item0 !== 0) {
            items.push(
              <td>
                <Image
                  src={urlImg + "/img/item/" + s.item0 + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          }
          if (s.item1 !== 0) {
            items.push(
              <td>
                <Image
                  src={urlImg + "/img/item/" + s.item1 + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          }
          if (s.item2 !== 0) {
            items.push(
              <td>
                <Image
                  src={urlImg + "/img/item/" + s.item2 + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          }
          if (s.item3 !== 0) {
            items.push(
              <td>
                <Image
                  src={urlImg + "/img/item/" + s.item3 + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          }
          if (s.item4 !== 0) {
            items.push(
              <td>
                <Image
                  src={urlImg + "/img/item/" + s.item4 + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          }
          if (s.item5 !== 0) {
            items.push(
              <td>
                <Image
                  src={urlImg + "/img/item/" + s.item5 + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          }
          if (s.item6 !== 0) {
            items.push(
              <td>
                <Image
                  src={urlImg + "/img/item/" + s.item6 + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          }
          if (s.teamId === 100) {
            team1.push(
              <td>
                <Image
                  src={urlImg + "/img/champion/" + s.championName + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          } else {
            team2.push(
              <td>
                <Image
                  src={urlImg + "/img/champion/" + s.championName + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          }
        } else {
          if (s.teamId === 100) {
            team1.push(
              <td>
                <Image
                  src={urlImg + "/img/champion/" + s.championName + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          } else {
            team2.push(
              <td>
                <Image
                  src={urlImg + "/img/champion/" + s.championName + ".png"}
                  rounded
                  width="30"
                  height="30"
                />
              </td>
            );
          }
        }
      });
      table.push(
        <tr>
          <td>
            <Image
              src={urlImg + "/img/champion/" + champ + ".png"}
              rounded
              width="30"
              height="30"
            />
          </td>
          <td>{rol}</td>
          <td>{kda}</td>
          <td>{items}</td>
          <td bgcolor="red">{team1}</td>
          <td>{team2}</td>
        </tr>
      );
    });
    console.log(table);
    this.setState({ l: table, isLoaded: true });
  }

  render() {
    if (this.state.l.length <= 0) {
      return <div>Loading Table...</div>;
    } else {
      return (
        <div>
          <div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Campeon</th>
                  <th>Rol</th>
                  <th>KDA</th>
                  <th>Items</th>
                  <th>Team</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>{this.state.l}</tbody>
            </Table>
          </div>
        </div>
      );
    }
  }
}
