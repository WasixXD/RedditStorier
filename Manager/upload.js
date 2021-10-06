

const { google } = require("googleapis")
const service = google.youtube("v3")
const fs = require('fs');




const video = require("../video.json")

async function uploadVideo(auth) {
    console.log("Començando a fazer o upload")

    const fileSize = fs.statSync(__dirname + "/../Editor/main.mov").size
    
    const videoTitle = video.title + " - /r/AskReddit"
    const videoDescription = `The Top posts from AskReddit this week: ${video.title}\nr/AskReddit was used for this video\n\nif you liked it, consider leaving a like and sharing the video.\n\nThis video was made by a BOT created by WasixXD\nCheck the code source in https://github.com/WasixXD` 
    let videoTags = []
    for(let i in video.comments) {
        for(let j in video.comments[i].keyword) {
            videoTags.push(video.comments[i].keyword[j])
        }
    }
    videoTags = videoTags.join(",")

    

    const youtubeResponse = await service.videos.insert({
        auth: auth,
        part: "snippet,contentDetails,status",
        requestBody: {
            snippet: {
                title: videoTitle,
                description: videoDescription,
                tags: videoTags,
                thumbnails: fs.createReadStream(__dirname + `/../photos/${video.id}/${video.id}.png`) 
            },
            status: {
                privacyStatus: "public"
            }
        },
        media: {
    
            body: fs.createReadStream(__dirname + "/../Editor/main.mov")
        }
    },
    {
        onUploadProgress: (event) => {
            
            console.log(`${Math.round((event.bytesRead / fileSize) * 100)}% completed` )
        }
    })

    console.log(`O vídeo pode ser visto em https://www.youtube.com/watch?v=${youtubeResponse.data.id}`)
    

    
}


module.exports = uploadVideo