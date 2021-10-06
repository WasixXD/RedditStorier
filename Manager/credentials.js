const fs = require('fs')

const input = require('prompt-sync')()

const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2


function autorize(credentials) {
    const clientSecret = credentials.installed.client_secret
    const clientId = credentials.installed.client_id
    const redirectURI = credentials.installed.redirect_uris[0]
    const oauthclient = new OAuth2(clientId, clientSecret, redirectURI)

    
    try {

        const access_token  = JSON.parse(fs.readFileSync(__dirname + "/../token.json"))
        
        oauthclient.setCredentials(access_token)
    } catch(e) {
        console.log("Acess token not exists")
        getNewToken(oauthclient)
    }

    return oauthclient
   

}


function getNewToken(client) {
    const authURL = client.generateAuthUrl({
        access_type: "offline",
        scope: [
            'https://www.googleapis.com/auth/youtube.upload',
            'https://www.googleapis.com/auth/youtube.readonly',
            'https://www.googleapis.com/auth/youtube'
        ]
    })

    console.log(`URL: ${authURL}`)
    const token = input("Enter the token: ")

    client.getToken(token, (error, token) => {
        if(error) {
            console.error("A error has occurred" + error)
            return 
        }

        client.credentials = token
        fs.writeFileSync(__dirname + "/../token.json", JSON.stringify(token))
    })
}

module.exports = autorize