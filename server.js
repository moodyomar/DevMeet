const express = require('express');
const connectDB = require('./config/db');
// const { originAllow } = require('./middleware/originAllow');

const app = express();

// connect mongoDB
connectDB();

// Init Middleware
app.use(express.json({extended:false}))
// Init Middleware
originAllow = (app) => {
  app.all("*", function (req, res, next) {
    if (!req.get("Origin")) return next();
    res.set("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.set(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,x-auth-token"
    );
    next();
  });
};
originAllow(app);

app.get('/',(req,res) => res.send('API RUNNING'))

// define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));

const port = process.env.PORT || '5000' ;

app.listen(port, () => console.log(`Server started on port ${port}`));