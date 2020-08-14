import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import "./style.css";
import backIcon from "./../../assets/icons/back.svg";

export default function DetailedView({ player }) {
  const [stats, setStats] = useState({
    // Fallback player stats
    games_played: 0,
    player_id: 0,
    season: 0,
    min: 0,
    fgm: 0,
    fga: 0,
    fg3m: 0,
    fg3a: 0,
    ftm: 0,
    fta: 0,
    oreb: 0,
    dreb: 0,
    reb: 0,
    ast: 0,
    stl: 0,
    blk: 0,
    turnover: 0,
    pf: 0,
    pts: 0,
    fg_pct: 0,
    fg3_pct: 0,
    ft_pct: 0,
  });

  useEffect(() => {
    // Load player stats on first render
    getStats(player.id);
  }, [player.id]);

  function getStats(playerId) {
    // Get stats from balldontlie API, if no stats are returned will use the fallback stats
    const url =
      "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" +
      playerId;
    Axios.get(url).then((res) => {
      if (res.data.data[0]) {
        setStats(res.data.data[0]);
      }
    });
  }

  return (
    <div>
      <div className="container">
        <BackBtn />
        <h1>{player.name}</h1>
        <h3>{player.team}</h3>
        <div className="statistics">
          <Statistic name="Games played" value={stats.games_played} />
          <Statistic name="Minutes per game" value={stats.min} />
          <Statistic name="Points per game" value={stats.pts} />
          <Statistic name="Assists per game" value={stats.ast} />
          <Statistic name="Steals per game" value={stats.stl} />
          <Statistic name="Blocks per game" value={stats.blk} />
          <Statistic name="Rebounds per game" value={stats.reb} />
          <Statistic name="Offensive rebounds" value={stats.oreb} />
          <Statistic name="Defensive rebounds" value={stats.dreb} />
          <Statistic name="FG %" value={stats.fg_pct} />
          <Statistic name="Fieldgoals made" value={stats.fgm} />
          <Statistic name="Fieldgoals atempted" value={stats.fga} />
          <Statistic name="3P %" value={stats.fg3_pct} />
          <Statistic name="3P Made" value={stats.fg3m} />
          <Statistic name="3P Atempted" value={stats.fg3a} />
          <Statistic name="Freethrow %" value={stats.ft_pct} />
          <Statistic name="Freethrows made" value={stats.ftm} />
          <Statistic name="Freethrows atempted" value={stats.fta} />
          <Statistic name="Turnovers per game" value={stats.turnover} />
          <Statistic name="PF per game" value={stats.pf} />
        </div>
      </div>
    </div>
  );
}

function BackBtn() {
  return (
    <Link to="/home">
      <img id="back-btn" src={backIcon} height="40px" alt="back-arrow" />
    </Link>
  );
}

function Statistic({ name, value }) {
  return (
    <div className="statistic">
      <div className="statistic-value">{value}</div>
      <div className="statistic-name">{name}</div>
    </div>
  );
}
