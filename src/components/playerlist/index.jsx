import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function PlayerList({ players = [], setSelectedPlayer }) {
  var playerList = players.map((player) => (
    <Player
      key={player.id}
      playerId={player.id}
      name={player.first_name + " " + player.last_name}
      team={player.team.abbreviation}
      setSelectedPlayer={setSelectedPlayer}
    />
  ));

  return playerList.length >= 1 ? (
    <div className="player-list">{playerList}</div>
  ) : (
    <p>Loading...</p>
  );
}

function Player({ name, team, setSelectedPlayer, playerId }) {
  return (
    <Link
      to="/player"
      className="player-link"
      onClick={() =>
        setSelectedPlayer({
          id: playerId,
          name: name,
          team: team,
        })
      }
    >
      <div className="player">
        <div className="player-name">{name}</div>
        <div className="player-team">{team}</div>
      </div>
    </Link>
  );
}
