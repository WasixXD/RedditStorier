const makeVideo = require("./Editor/main");
const credentials = require("./client_secret.json");
const autorize = require("./Manager/credentials");
const uploadVideo = require("./Manager/upload");


const auth = autorize(credentials)

const fs = require('fs')


function makedVideos(videoID) {
    const videos = require("./Journalist/posts.json")

    videos.push({id: videoID})

    fs.writeFileSync(__dirname + "\\Journalist\\posts.json", JSON.stringify(videos))
}

async function main() {
    await makeVideo()
    uploadVideo(auth)

    const atualVideo = require("./video.json")
    makedVideos(atualVideo.id)

}


main()