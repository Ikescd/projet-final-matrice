const express = require('express');
const app = express();

const cors = require('cors');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/api/login/checkToken", withAuth, usersRoutes);


const port = process.env.PORT || 3000;



app.get('/', (req, res) => {
  res.send('oui');
});

module.exports = { app }

