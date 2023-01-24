require("dotenv").config();

const express = require("express");
const {check, validationResult} = require("express-validator");
const app = express();
const mysql = require("mysql");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function usersRoutes(app, connection) {
  //Create new user
  app.post("/api/users/add", async (req, res) => {
    if (
      req.body.first_name &&
      req.body.last_name &&
      req.body.email &&
      req.body.password 
    ) {
      const hash = await bcrypt.hash(req.body.password, 10)

      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const email = req.body.email;
      const password = hash;
      const role = "user";


      const responseDB = await connection.query(
        "INSERT INTO users ( first_name, last_name, email, password, role) VALUES (?,?,?,?,?)",
        [first_name, last_name, email, password, role],
        (err, result) => {
          if (err) throw err;
          res.json({ status: 200, result });
        }
      );
    } else {
      res.sendStatus(422);
    }
  });

  //Read all users
  app.get("/api/users", (req, res) => {
    connection.query(`SELECT * FROM users`, (err, result) => {
      if (err) throw err;
      return res.status(200).json(result);
    });
  });

  //Read one user
  app.get("/api/users/:id", async (req, res) => {
    const id = req.params.id;

    await connection.query(
      `SELECT * FROM users WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) throw err;
        res.json({ status: 200, result });
      }
    );
  });

  //Update one user(TODO)
  app.put("/api/users/:id", (req, res) => {});

  //Delete one user
  app.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    const responseDB = await connection.query(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );
    res.status(200).send({ message: "User deleted" });
  });
}

module.exports = usersRoutes;
