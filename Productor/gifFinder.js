const axios = require('axios').default


async function seachGif(keyword) {
    console.log(`Searching for GIFS with keyword: ${keyword}\n`)
    let response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
            api_key: "rl8Xnqjq2HyFunaktSm2d61LPh1aCBVw",
            q: keyword,
            limit: 1
        }
    })

    const { data } = response.data

    console.log("GIFS already chosen\n")
    return data
}

module.exports = seachGif