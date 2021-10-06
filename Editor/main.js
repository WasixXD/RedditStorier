const write = require("../Journalist/main");
const getMedia = require("../Productor");

const { spawn } = require('child_process')

const ae = require("after-effects")

async function getTheContent() {
    await write();
    await getMedia();
}

async function renderVideo() {
    const aerenderPath = "C:/Program Files/Adobe/Adobe After Effects 2020/Support Files/aerender"


    const defaultPath = "C:/Users/Pichau/Documents/RedditStories/Editor/"
    const aerender = spawn(aerenderPath, [
        "-project", defaultPath + "main.aep",
        "-comp", "main",
        "-output", `${defaultPath}`  + "main.mov"
    ])

    aerender.stdout.on("data", (data) => {
        
        process.stdout.write(data)
    })


    aerender.on("close", () => {
        console.log("VIDEO renderizado")
    })
}



async function makeVideo() {
    await getTheContent()

    const video = require('../video.json');

    //import images
    let createComps = ae((videoData) => {
        
        
        //import title
        let pngTitle = app.project.importFile(new ImportOptions(`C:/Users/Pichau/Documents/RedditStories/photos/${videoData.id}/${videoData.id}.png`))
        let audioTitle = app.project.importFile(new ImportOptions(`C:/Users/Pichau/Documents/RedditStories/photos/${videoData.id}/${videoData.id}.wav`))
        
        //duration of the main composition
        let videoDuration = audioTitle.duration
        let allComps = []

        var newComp = app.project.items.addComp(videoData.id, 1050, 576, 1, audioTitle.duration, 30)
        newComp.layers.add(pngTitle)
        newComp.layers.add(audioTitle)

        allComps.push(newComp)

        //import comments
        //and create compositions for each one
        for(let i = 0; i < videoData.comments.length; i++) {
            let commentPng = app.project.importFile(new ImportOptions(`C:/Users/Pichau/Documents/RedditStories/photos/${videoData.id}/${videoData.comments[i].id}.png`))
            let commentAudio = app.project.importFile(new ImportOptions(`C:/Users/Pichau/Documents/RedditStories/photos/${videoData.id}/${videoData.comments[i].id}.wav`))

            let commentComp = app.project.items.addComp(videoData.comments[i].id, 1050, 576, 1, commentAudio.duration, 30)
        
            commentComp.layers.add(commentPng)
            commentComp.layers.add(commentAudio)

            videoDuration += commentAudio.duration
            allComps.push(commentComp)
        }
        
        let mainComp = app.project.items.addComp("main", 1050, 576, 1, videoDuration, 30)
        

        
        //add the comps for the main 
        let objectTimes = {}
        for(let i = 0; i < allComps.length; i++) {
            mainComp.layers.add(allComps[i])
            objectTimes[allComps[i].name] = allComps[i].duration
        }

        
        //order the comps
        let sum = allComps[0].duration

       
        
        for(let i = 1; i < mainComp.layers.length; i++) {  
            mainComp.layers[i].startTime = sum
            sum += objectTimes[mainComp.layers[i].name]
            
        }


    

    }, video)

    await renderVideo()
    return true
    
    
}


module.exports = makeVideo