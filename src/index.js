const express = require('express');
const { serverConfig } = require('./config');
const apiRoutes = require('./routes');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 15, // Limit each IP to 3 requests per `window` (here, per 15 minutes).
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(limiter);

app.use(
    '/flightsService',
    createProxyMiddleware({
      target: serverConfig.FLIGHT_SERVICE ,
      changeOrigin: true,
    }),
  );
//there is also a property '''pathRewrite: {'^/old/api' : '/new/api'}'''

//for an example we can write '''pathRewrite:{'/flightsService','/'} in this you are not needed to add another route to your 
//flight service ad you need to add '''app.use('/flightsService/api',apiRoutes)''' in flights service
  app.use(
    '/bookingService',
    createProxyMiddleware({
      target: serverConfig.BOOKING_SERVICE,
      changeOrigin: true,
    }),
  );

app.use('/api',apiRoutes)

app.listen(serverConfig.PORT,async ()=>{
    console.log(`successfully started the server  on port: ${serverConfig.PORT} `);
   
}) 
