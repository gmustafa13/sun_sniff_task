const express = require('express');
const app = express();
require('dotenv').config();

/**
 * require main router file
 */
const routes = require('./src/routes/index')
/**
 * global level func/veriable
 */
require('./src/utils/global')

/**
 * required db setup
 */

require('./src/utils/db').dbConnect()
/**
 * use as middlewere by using app.use
 */
app.use(express.json())

// router
routes(app)


app.get('/ping', (req, res) => {
    res.json({data:"pong"})
})


const port = process.env.PORT

app.listen(port, () => {
    console.log(`listening port ${port}!`);
});

module.exports = {app}