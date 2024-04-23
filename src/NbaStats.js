import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NbaStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.balldontlie.io/api/v1/stats');
        setStats(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>NBA Stats</h1>
      <ul>
        {stats.map((stat) => (
          <li key={stat.id}>
            <h3>{stat.game.homeTeam.fullName} vs {stat.game.visitorTeam.fullName}</h3>
            <p>Date: {stat.game.dateStarted}</p>
            <p>Home Team Score: {stat.home.score}</p>
            <p>Visitor Team Score: {stat.visitor.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NbaStats;