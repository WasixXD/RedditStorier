
const fs = require('fs')
const getTopComments = require('./getComments')
const getTopPosts = require('./getPost')
const { commentTitle, commentScreenshot} = require('./getScreenshot')




async function write() {

    //take a Top Post
    const topPosts = await getTopPosts()
    let post
    
    //make sure that its not a repeted post
    for(let i in topPosts) {
        if(!ifVideoAlreadyExist(topPosts[i].id))     {
            post = topPosts[i]
            break
        }
    }

    //get his comments
    const comments = await getTopComments(post.id)

    post = {...post, comments}

    //creating a folder to store the prints
    if(!fs.existsSync(__dirname + `/../photos/${post.id}`)) {
        fs.mkdirSync(__dirname + `/../photos/${post.id}`)
    }

    
    //take the prints
    await commentTitle(post)
    await commentScreenshot(post)

    for(let i in post.comments) {
        post.comments[i].imgPath = `photos/${post.id}/${post.comments[i].id}.png`
    }
    
    fs.writeFileSync(__dirname + "/../video.json", JSON.stringify(post))
}




function ifVideoAlreadyExist(id) {
    const posts = require('./posts.json')

    for(let i in posts) {
        if(posts[i].id == id) {
            return true
        }
    }
    return false
}

module.exports = write
