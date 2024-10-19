const express = require('express');
const path = require('path');
const gamesRoute = require('./routes/games');
const regusRoute = require('./routes/regus');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));

// APIルートの設定
app.use('/api/games', gamesRoute);
app.use('/api/regus', regusRoute);

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
