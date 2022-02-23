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

<h3>2) Create a game with</h3>
Create a new game passing in the letters you want to make up the board
- URL [POST] https://saleswhale-boggle.herokuapp.com/game
- Body: {
          random: true,
          board: 'abcdefghijklmnop',
          duration: 1000
        }

<h3>Get a game</h3>
Get the game details before you play!
- URL: https://saleswhale-boggle.herokuapp.com/game/1
- Params: Game id
