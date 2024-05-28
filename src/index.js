const express = require('express');
const { serverConfig } = require('./config');
const apiRoutes = require('./routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes)

app.listen(serverConfig.PORT,()=>{
    console.log(`successfully started the server  on port: ${serverConfig.PORT} `);
   
}) 
