const TextToSpeechv1 = require('ibm-watson/text-to-speech/v1')
const { IamAuthenticator } = require("ibm-watson/auth")
const fs = require("fs")
require('dotenv').config()



const textToSpeech = new TextToSpeechv1({
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_VOICE_KEY
    }),
    serviceUrl: process.env.IBM_VOICE_URL,
    disableSslVerification: true
})


async function audioGetter() {
    console.log("Getting Audio for comments\n")
    const post = require('../video.json')
    
    for(let i in post.comments) {
        const params = {
            text: post.comments[i].body,
            accept: "audio/wav",
            voice: "en-US_KevinV3Voice"
        }

        let response = await textToSpeech.synthesize(params)
        let result = await textToSpeech.repairWavHeaderStream(response.result)

        fs.writeFileSync(__dirname + `/../photos/${post.id}/${post.comments[i].id}.wav`, result)
        console.log("A audio has been saved\n")
    }
}


async function postAudioGetter() {
    const post = require('../video.json')

    const params = {
        text: post.title,
        accept: "audio/wav",
        voice: "en-US_KevinV3Voice"
    }

    let response = await textToSpeech.synthesize(params)
    let result = await textToSpeech.repairWavHeaderStream(response.result)

    fs.writeFileSync(__dirname + `/../photos/${post.id}/${post.id}.wav`, result)
}

module.exports = {audioGetter, postAudioGetter}