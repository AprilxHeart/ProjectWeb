
const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const config = require('./config')
// Create Express Server
const app = express();
// Configuration
let PORT = process.argv[2] || 3000;
const HOST = "localhost";
const API_SERVICE_URL = "http://localhost:9000";
const tokenList = {}



// create application/json parser
let jsonParser = bodyParser.json();
// parse application/x-www-form-urlencoded

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))


// Loggings
app.use(morgan('dev'));

// Set x-powered-by
app.disable('x-powered-by');

// Set up CORS
app.use(cors({
    origin: true, 
    credentials: true,
    methods: 'POST,GET,PUT,OPTIONS,DELETE'
}));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
});


//gentoken
app.post('/gentoken', jsonParser,(req, res) => {
    const { userName, firstName, lastName } = req.body;
    if (userName) {
        const user = {
            "userName": userName,
            "firstName": firstName,
            "lastName": lastName
        }
        const token = jwt.sign(user, config.jwt_secret, { expiresIn: config.tokenLife })
        const refreshToken = jwt.sign(user, config.jwt_refreshTokenSecret, { expiresIn: config.refreshTokenLife })
        const response = {
            "status": "success",
            "token": token,
            "refreshToken": refreshToken,
        }
        tokenList[refreshToken] = response
        res.status(200).json(response);
    } else {
        res.status(404).send('Invalid request')
    }
})


//refreshtoken
app.post('/refreshtoken',jsonParser, (req, res) => {

    const { userName, firstName, lastName, refreshToken } = req.body;
    // if refresh token exists
    if ((refreshToken) && (refreshToken in tokenList)) {
        const user = {
            "userName": userName,
            "firstName": firstName,
            "lastName": lastName
        }
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[refreshToken].token = token
        res.status(200).json(response);

    } else {
        res.status(404).send('Invalid request')
    }
})


//refreshtoken
app.post('/verifytoken',jsonParser, (req, res) => {

    const token = req.body.token || req.query.token || req.headers['token'] || req.headers['x-access-token'] || req.headers['authorization']
        console.log('node--');
        console.log(req.body.token);
        if (token) {
            jwt.verify(token, config.jwt_secret, function (err, decoded) {
                if (err) {
                    return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
                }
                req.decoded = decoded;
                next();
            });
        } else {
            return res.status(403).send({
                "error": true,
                "message": 'No token provided.'
            });
    }
})


// Authorization
app.use('',(req, res, next) => {
    console.log('---req headers----');
    console.log(req.headers);
    console.log('---req----');
    console.log(req.url);
    console.log(req.body);
    next();
});

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        [`^/api`]: 'api',
    }
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});




