const express = require("express"),
  members = require("../../Members"),
  router = express.Router(),
  uuid = require("uuid");


// CRUD
router
  // Get all members
  .get("/", (req, res) => res.json(members))
  // Get single user
  .get("/:id", (req, res) => {
    console.log(req.params.id);
    let found = members.some((member) => member.id === Number(req.params.id));
    console.log(found);
    if (found) {
      res.send(members.filter((member) => member.id === Number(req.params.id)));
    } else {
      res.status(400).json({
        msg: "Not found!",
      });
    }
  })
  //Create a user
  .post("/", (req, res) => {
    console.log(req.body);
    let newUser = {
      id: uuid.v4(),
      name: req.body.name,
      age: req.body.age,
      status: req.body.status,
    };

    if (!newUser.name || !newUser.age) {
      return res.status(400).json({
        msg: "Provide name and email",
      });
    }

    members.push(newUser);
    console.log("New user => ", newUser);
    return res.json(members);
  })
  // Update user
  .put("/:id", (req, res) => {
    let found = members.some((member) => member.id === Number(req.params.id));
    if (found) {
      let updateMember = req.body;
      members.forEach((member) => {
        if (member.id === Number(req.params.id)) {
          member.name = updateMember.name ? updateMember.name : member.name;
          member.age = updateMember.age ? updateMember.age : member.age;
          res.json({
            msg: "Member updated",
            member,
          });
        }
      });
    } else {
      res.status(400).json({
        msg: "The user not found to updated!",
      });
    }
  })
  .delete("/:id", (req, res) => {
    let found = members.some((member) => member.id === Number(req.params.id));
    if (found) {
      res.json({
        msg: "Member deleted",
        members: members.filter((member) => member.id !== Number(req.params.id)),
      });
    } else {
      res.status(400).json({
        msg: "User not found!",
      });
    }
  });

module.exports = router;
