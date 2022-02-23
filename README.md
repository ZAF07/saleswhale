# saleswhale

<h1>Follow this guide on how to get started with the game </h1>
<h3>1) Create a user</h3>
This would return you a token to use to authenticate yourself <br>
- URL: [POST] https://saleswhale-boggle.herokuapp.com/user/create-account<br>
- Body: <br>{ <br>
          user: James,<br>
          password: 1234<br>
        }<br>
Returns: {<br>
            "message": "Successfully created a new user",<br>
            "status": 200,<br>
            "user": "zaffere",<br>
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",<br>
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."<br>
}<br>

<h3>2) Create a new game</h3>
Create a new game passing in the letters you want to make up the board<br>
- URL [POST] https://saleswhale-boggle.herokuapp.com/game<br>
- Body: {<br>
          random: true,<br>
          board: 'abcdefghijklmnop',<br>
          duration: 1000<br>
        }<br>
 Returns: {<br>
             "message": "Successfully created a new game"<br>
             "status": 200<br>
             "game_id": 1<br>
          }<br>

<h3>Get a game</h3>
Get the game details before you play!<br>
- URL: https://saleswhale-boggle.herokuapp.com/game/1<br>
- Params: Game id<br>

Returns: {<br>
    "message": "Success",<br>
    "status": 200,<br>
    "data": {<br>
        "id": 5,<br>
        "userId": 9,<br>
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6InphZmZlcmUiLCJpYXQiOjE2NDU2MTg0MTN9.CRfnELaYTomGrue3LvZMSc1X8bSvNx1LehDElIHJgyw",<br>
        "board": "ahdyueb*fuschdkjsj",<br>
        "duration": 1000,<br>
        "timeRemaining": 995,<br>
        "points": 3,<br>
        "createdAt": "2022-02-23",<br>
        "updatedAt": "2022-02-23"<br>
    }<br>
}<br>
