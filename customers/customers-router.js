const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

router.post("/accounts", (req, res) => {
  // insert into pots () values ()
  const postData = req.body;
  // validate the postData before inserting into db
  console.log("THIS IS THE DATA", postData);

  db("accounts")
    .insert(postData, "id")
    .then(([id]) => {
      db("accounts")
        .where({ id })
        .first()
        .then(account => res.status(200).json(account));
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/accounts", (req, res) => {
  // select title, contents from posts
  // db.select('*')
  //     .from('posts')
  db("accounts")
    .select("*")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/accounts/:id", (req, res) => {
  // update posts set .... where id = 123
  const changes = req.body;
  console.log("this is the changes", changes);
  db("accounts")
    .where("id", req.params.id)
    .update(changes)
    .then(count => {
      res.status(200).json({ message: `updated ${count} record` });
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/accounts/:id", (req, res) => {
  // delete from posts where ...
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `deleted ${count} records` });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
