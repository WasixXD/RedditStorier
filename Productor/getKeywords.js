const NaturalUnderstanding = require('ibm-watson/natural-language-understanding/v1')
const { IamAuthenticator } = require("ibm-watson/auth")
require('dotenv').config()



const naturalUnderstanding = new NaturalUnderstanding({
    version: "2021-08-01",
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_LANGUAGE_KEY
    }),
    serviceUrl: process.env.IBM_LANGUAGE_URL
})



async function getKeywords(text) {
    console.log(`Getting Keywords for:${text}\n`)
    const params = {
        text,
        features: {
            keywords: {
                sentiment: true,
                emotion: true,
                limit: 3
            }
        }
    }
    
    let response = await naturalUnderstanding.analyze(params)
    let result = await response.result
    

    let keywords = []

    for(let i in result.keywords) {
        keywords.push(result.keywords[i].text)
    }
    
    console.log("Keywords getted\n")
    return keywords
}




module.exports = getKeywords