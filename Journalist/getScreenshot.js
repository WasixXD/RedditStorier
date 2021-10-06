const puppeteer = require('puppeteer')





async function commentScreenshot(post) {
    console.log("Getting screenshots")
    const browser = await puppeteer.launch({headless:true })
    const page = await browser.newPage()
    

    for(let i in post.comments) {
        await page.goto(`https://reddit.com/${post.comments[i].permalink}`)


        //get the element and take a screenshot
        await page.waitForSelector(".entry > .usertext > .usertext-body > div")
    
        
        const element = await page.$(".entry > .usertext > .usertext-body > div")
        
    
        const box = await element.boundingBox()
    
        const cordinates = {x: box.x, y: box.y, width: box.width, height: box.height}
    
        await page.screenshot({path: `photos/${post.id}/${post.comments[i].id}.png`, clip: cordinates})

        console.log("Screenshot taken and saved")
    }


    await browser.close()
}


async function commentTitle(post) {
    
    
    const browser = await puppeteer.launch({headless:true })
    const page = await browser.newPage()

    await page.goto(post.url)


    await page.waitForSelector(`#t3_${post.id}`)

    const element = await page.$(`#t3_${post.id}`)
        
    
    const box = await element.boundingBox()

    const cordinates = {x: box.x, y: box.y, width: box.width, height: box.height}

    await page.screenshot({path: `photos/${post.id}/${post.id}.png`, clip: cordinates})

    await browser.close()
    console.log("POST Screentshot taken")
}

module.exports = {
    commentScreenshot,
    commentTitle
}