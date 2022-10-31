const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const accounts = require("../models/accounts");
const verify = require("../middleware/verifyToken");


// GET ALL ACCOUNTS
router.get("/", (req, res) => {
    Account.find().then((data) => {
        res.send(data);
    });
});

// ADD NEW ACCOUNT
router.post("/", async (req, res) => {
    try {
        await _validateNewUser(req);
        const date = new Date().toLocaleString();
        const hashpassword = await bcrypt.hash(req.body.password,1);
        req.body.password = hashpassword;
        const newAccount = new Account(req.body);
        newAccount.created_at = date;
        await newAccount.save().then((account) => {
            if (account._id) {
                res.status(201).send({
                    account: account,
                    success: true,
                    message: "Account successfully created!"});
            } else {
                res.status(400).send({
                    success: false,
                    error: "User already exist!" });
            }
        });
    } catch (exception) {
        res.status(400).send({
            success: false, error: "Account registration failed!" });
    }
});

// LOGIN ACCOUNT
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Account.findOne({"email": email}).then(async(account) => {
        if (account) {
            const match = await bcrypt.compare(password, account.password);
            if (match) {
                const accountpayload = {
                    accountId: account._id,
                    username: account.username,
                    email: account.email,
                    password: account.password,
                };
                const token = jwt.sign(accountpayload, "ACCOUNT_TOKEN");
                res.send({
                    jwttoken: token, 
                    message: "Login successful!",
                    success: true
                });
            } else {
                res.send({
                    success: false,
                    message: "Wrong password"
                });
            }
        } else {
            res.send({
                success: false,
                message: "Invalid credentials"
            })
        }
    })
});

// GET ACTIVE ACCOUNT
router.post("/active", verify, (req, res) => {
    Account.findOne({ _id: req.accountId }).then((details) => {
        res.send({success: true, data: details});
    });
});

// GET SPECIFIC ACCOUNT
router.get("/show-account/:id", (request, response) => {
  Account.findOne({ _id: request.params.id }).then((data) => {
    response.send(data);
  });
});

router.put("/edit-account/:id", (request, response) => {
  let error = new Error('AccountUpdateException');
  error.message = 'Error in updating account';

  try {
    const date = new Date().toLocaleString();
    request.body.updated_at = date;

    Account.updateOne({ _id: request.params.id }, [{ $set: request.body}]).then((data) => {
      console.log(data);
      if (data.modifiedCount > 0) {
        response.status(201).send({message: "Account Updated"});
      } else {
        throw error;
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});


// DELETE SPECIFIC ACCOUNT
router.delete("/:id", (request, response) => {
  try {
    Account.deleteOne({ _id: request.params.id }).then((data) => {
      if (data.deletedCount > 0) {
        response.status(202).send({message: "Account Deleted"});
      } else {
        throw error;
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

/*
 * This function validates user if already existing
 * @param {Object} request 
 * @throws {Error} User already exist
 */

 const _validateNewUser = async (request) => {
  await Account.findOne({
    // first_name: request.body.first_name,
    // middle_name: request.body.middle_name,
    // last_name: request.body.last_name,
    // birth_date: request.body.birth_date,
    username: request.body.username,
    email: request.body.email,
  }).then((data) => {
    if (data !== null) {
      const error = new Error('UserRegistrationException');
      error.message = 'User already exist';
      throw error;
    }
  });
};


module.exports = router;