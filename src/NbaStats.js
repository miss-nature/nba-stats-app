import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '3c649d0f-e904-45f8-85fd-ec2a5f68016f'; // Replace with your actual API key

const NbaStats = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState([]);
  const [seasonAverages, setSeasonAverages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playersResponse = await axios.get('https://www.balldontlie.io/api/v1/players', {
          headers: {
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        setPlayers(playersResponse.data.data);

        const teamsResponse = await axios.get('https://www.balldontlie.io/api/v1/teams', {
          headers: {
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        setTeams(teamsResponse.data.data);

        const gamesResponse = await axios.get('https://www.balldontlie.io/api/v1/games', {
          headers: {
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        setGames(gamesResponse.data.data);

        const statsResponse = await axios.get('https://www.balldontlie.io/api/v1/stats', {
          headers: {
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        setStats(statsResponse.data.data);

        const seasonAveragesResponse = await axios.get('https://www.balldontlie.io/api/v1/season_averages', {
          headers: {
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        setSeasonAverages(seasonAveragesResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>NBA Stats</h1>

      <h2>Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <h3>{player.first_name} {player.last_name}</h3>
            <p>Position: {player.position}</p>
            <p>Height: {player.height}</p>
            <p>Weight: {player.weight}</p>
            <p>Jersey Number: {player.jersey_number}</p>
            <p>College: {player.college}</p>
            <p>Country: {player.country}</p>
            <p>Draft Year: {player.draft_year}</p>
            <p>Draft Round: {player.draft_round}</p>
            <p>Draft Number: {player.draft_number}</p>
            <p>Team: {player.team.full_name}</p>
          </li>
        ))}
      </ul>

      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <h3>{team.full_name}</h3>
            <p>Conference: {team.conference}</p>
            <p>Division: {team.division}</p>
            <p>City: {team.city}</p>
            <p>Abbreviation: {team.abbreviation}</p>
          </li>
        ))}
      </ul>

      <h2>Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <h3>{game.home_team.full_name} vs {game.visitor_team.full_name}</h3>
            <p>Date: {game.date}</p>
            <p>Season: {game.season}</p>
            <p>Status: {game.status}</p>
            <p>Home Team Score: {game.home_team_score}</p>
            <p>Visitor Team Score: {game.visitor_team_score}</p>
          </li>
        ))}
      </ul>

      <h2>Stats</h2>
      <ul>
        {stats.map((stat) => (
          <li key={stat.id}>
            <h3>{stat.player.first_name} {stat.player.last_name} ({stat.team.full_name})</h3>
            <p>Game: {stat.game.home_team.full_name} vs {stat.game.visitor_team.full_name}</p>
            <p>Date: {stat.game.date}</p>
            <p>Minutes Played: {stat.min}</p>
            <p>Points: {stat.pts}</p>
            <p>Rebounds: {stat.reb}</p>
            <p>Assists: {stat.ast}</p>
            <p>Steals: {stat.stl}</p>
            <p>Blocks: {stat.blk}</p>
          </li>
        ))}
      </ul>

      <h2>Season Averages</h2>
      <ul>
        {seasonAverages.map((average) => (
          <li key={average.player_id}>
            <h3>{average.player.first_name} {average.player.last_name}</h3>
            <p>Team: {average.team.full_name}</p>
            <p>Games Played: {average.games_played}</p>
            <p>Points per Game: {average.pts}</p>
            <p>Rebounds per Game: {average.reb}</p>
            <p>Assists per Game: {average.ast}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NbaStats;