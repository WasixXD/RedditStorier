const snoowrap = require('snoowrap')
require('dotenv').config()

const journalist = new snoowrap({
    userAgent: "WasixXD",
    clientId: process.env.REDDIT_ID,
    clientSecret: process.env.REDDIT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN,
    accessToken: process.env.REDDIT_TOKEN
    
})


module.exports = journalist