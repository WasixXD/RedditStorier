// Should return Top Posts from /r/AskReddit

const journalist = require("./credentials.js")

async function getTopPosts() {
    console.log("Getting POSTS\n")
    const askReddit = await journalist.getSubreddit("AskReddit")
    const topPosts = await askReddit.getTop({time: "week", limit: 20})

    let collection = []

    topPosts.forEach(post => {

        collection.push({id: post.id, title: post.title, url: post.url})
    })

    console.log("POSTS Getted\n")
    return collection
    
}



module.exports = getTopPosts