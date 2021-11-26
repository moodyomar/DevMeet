const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors')
const app = express();
app.use(cors())

// connect mongoDB
connectDB();

// Init Middleware
app.use(express.json({extended:false}))

// define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
  // set static folder
  app.use(express.static('client/build'))
  // app.get('*',(req,res) => {
  //   res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  // })
}

const port = process.env.PORT || 5001 ;

app.listen(port, () => console.log(`Server started on port ${port}`));