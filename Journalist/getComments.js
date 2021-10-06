const journalist = require('./credentials.js')





async function getTopComments(postID) {
    console.log("Getting Comments\n")

    let { comments }  = await journalist.getSubmission(postID).expandReplies({limit: 1, depth: 1})
    
    let selectedComments = []
    const numberOfComments = 51
    
    for(let i = 0; i < numberOfComments; i++) {
        selectedComments.push({id: comments[i].id, body: comments[i].body, permalink: comments[i].permalink})
    }
    console.log("Comments Getted\n")
    return selectedComments
    
}

module.exports = getTopComments