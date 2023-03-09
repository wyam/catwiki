const path = require('path');
const express = require("express");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const env = process.env.NODE_ENV;
const PORT = env === 'test' ? process.env[`PORT_${env}`] : process.env.PORT || 3001;

const app = express();
const cats = require('./cats/catsRouter')

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from CatWiki!" });
});

app.use("/api/v1/cats/", cats);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = server;