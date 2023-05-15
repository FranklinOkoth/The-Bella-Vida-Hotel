const express = require("express");
const app = express();
const bookingSchema = require("./model/database");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

mongoose.connect("mongodb://0.0.0.0/Bella_Vida");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/:id", (req, res) => {
    res.render("response");
})

app.post("/send", async (req, res) => {
    let booking = new bookingSchema ({
        arrivalDate: req.body.arrival_date,
        departureDate: req.body.departure_date,
        grownUps: req.body.grown_ups,
        kids: req.body.kids
    });
    
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "brucewynentreprices@gmail.com",
          pass: "bklfqowqaqieqzfg",
        },
      });
    
      var mailOptions = {
        from: "brucewynentreprices@gmail.com",
        to: "franklinphilip81@gmail.com",
        subject: "New Booking",
        html: `<h1 style="text-align:center;">A New Booking Was Made</h1>
        <div style="text-align: center; color:royal-blue;">Details of the Order</div>
        <ul style="list-style-type:decimal;">
        <li>Sign in Date: ${req.body.arrival_date}</li>
        <li>Number of Adults: ${req.body.grown_ups}</li>
        <li>Number of Children: ${req.body.kids}</li>
        </ul>
    `,
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email Sent: " + info.response);
        }
      });
    
    try {
        booking = await booking.save();
        res.redirect(`${booking.id}`);
     } catch (e) { 
        console.log(e);
        res.render("index")
     }
})

app.listen(3000, console.log("You are connected"));