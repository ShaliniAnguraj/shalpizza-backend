const express = require("express")
const cors = require("cors")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
require("colors")

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const Pizza = require('./models/pizzaModel')
const connectDB = require("./config/config.js");
const pizzasRoute = require('./routes/pizzasRoute')
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')

app.use('/api/pizzas', pizzasRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', ordersRoute)

const port = process.env.PORT || 4455;

connectDB().then(() => {
  app.get("/", (req, res) => {
      res.send("<h1>Hello From Node Server vai nodemon</h1>");
  });
  app.get("/getpizzas", (req, res) => {
    Pizza.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(docs);
      }
    })
  })
  try {
      app.listen(port, () => {
          console.log(`Server Running on ${process.env.NODE_ENV} on port no ${process.env.PORT}`.bgRed.bgYellow);
      })
  } catch (error) {
      console.log('Cannot connect to the server')
  }
}).catch(error => {
  console.log("Invalid database connection...!");
})


