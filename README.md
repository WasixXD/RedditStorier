# RedditStorier
A video maker bot about reddit comments in r/AskReddit<br>

channel link: [Reddit Storier Channel](https://www.youtube.com/channel/UCTCzl863i54MPp-uINvdyTg)

# Brief 📖
After seeing Filipe Deschamps' video about making a bot, I was inspired and wanted to create mine. But different from his, mine is not about trivia, but about comments from a super cool subreddit.

<br>


# Challenges 🐢
- The reddit api not provide a way to get the post and comments
- never has used a editor
- a way to make the process automatic
- upload heavy videos
- transform text in audio
- getting a screenshot from the post

<br>


# Goals 🏆
[ x ] Get the comments and post from reddit<br>
[ x ] Get audio and screenshots from the reddit post<br>
[ x ] Edit is automatic <br>
[ x ] Upload is also automatic <br>

<br>

# How it works? 💼
First, through a package called snoowrap, the script gets all the top post of the subreddit, after choosing one that hasn't been chosen previously it goes to the link and takes all the necessary screenshots.
Then it passes all the information to IBM Watson which makes the audio of the comments and finds the keywords to be tags for the video later.
Then it sorts the audio and images in After Effects and through the terminal renders the video.
Finally, upload the video on youtube through your api.
PS: maybe because the project was not authorized by google, the video always gets private visibility.



