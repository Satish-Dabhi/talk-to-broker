const mongoose = require("mongoose"); 

// mongodb://atlas-sql-62359e0dd0f3c742cf1286d5-djnk3.a.query.mongodb.net/myFirstDatabase?ssl=true&authSource=admin
const DB_URI = 'mongodb+srv://satishDabhi:aniish1435@cluster0.djnk3.mongodb.net/talkToBroker?retryWrites=true&w=majority';
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected');
  });
