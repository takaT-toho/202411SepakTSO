const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// pool.connect((err) => {
//   if (err) {
//     console.error('データベースへの接続に失敗しました: ' + err.stack);
//     return;
//   }
//   console.log('データベースに接続しました。ID: ' + connection.threadId);
// });

router.get('/', (req, res) => {
  const query = `
    SELECT 
        g.round,
        g.time,
        c.name AS courtName,
        g.gameId,
        aRegu.abbreviation AS areguAbb,
        bRegu.abbreviation AS breguAbb,
        mainJudgeRegu.abbreviation AS mainJudgeReguAbb,
        subJudgeRegu.abbreviation AS subJudgeReguAbb,
        winnerRegu.abbreviation AS winnerReguAbb,
        loserRegu.abbreviation AS loserReguAbb,
        g.isStarted,
        g.isFinished,
        g.setNumGotByA,
        g.setNumGotByB,
        gd.points1setA,
        gd.points2setA,
        gd.points3setA,
        gd.points1setB,
        gd.points2setB,
        gd.points3setB
    FROM 
        GAME g
    JOIN COURT c ON g.courtId = c.courtId
    JOIN REGU aRegu ON g.areguId = aRegu.reguId
    JOIN REGU bRegu ON g.breguId = bRegu.reguId
    JOIN REGU mainJudgeRegu ON g.mainJudgeReguId = mainJudgeRegu.reguId
    LEFT JOIN REGU subJudgeRegu ON g.subJudgeReguId = subJudgeRegu.reguId
    LEFT JOIN REGU winnerRegu ON g.winner = winnerRegu.reguId
    LEFT JOIN REGU loserRegu ON g.loser = loserRegu.reguId
    JOIN gameDetail gd ON g.gameId = gd.gameId
    ORDER BY g.gameId;
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('データの取得に失敗しました: ' + error);
      return res.status(500).send('データの取得に失敗しました。');
    }
    res.json(results);
  });
});

module.exports = router;
