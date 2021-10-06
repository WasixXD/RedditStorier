const getKeywords = require("./getKeywords");
const {audioGetter, postAudioGetter} = require("./makeAudio");
const fs = require('fs');
const seachGif = require("./gifFinder");

async function getMedia() {
    //get the audio for each image
    await audioGetter()
    await postAudioGetter()

    //select the keywords for seach the gifs later
    let post = require('../video.json')
    
    for(let i in post.comments) {
        if(post.comments[i].body.length > 10) {

            post.comments[i].keyword = await getKeywords(post.comments[i].body)
        } else {
            post.comments[i].keyword = ["universe"]
        }
    }
    


    //get the gifs
    for(let i in post.comments) {
        
        post.comments[i].gif = await seachGif(post.comments[i].keyword[0])
        
    }
    

    fs.writeFileSync(__dirname + "/../video.json", JSON.stringify(post))
    

    
    

}

module.exports = getMedia