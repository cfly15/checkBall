# Check Ball
An web and mobile application to manage a weekly basketball open gyms.

------
## Background on the application

#### What the app does
1. Finds the best matchup - based on skill, size, and positions of the players
2. Manages fair game play - keeps track of who has played how many times to make sure each player gets as much time on the court as possible. It does this by enforcing the court rules and then randomizes player draws when necessary
3. Reminders for attendance - Checks in on players to get a count of how many are showing up to make sure there are enough

#### How new games are computed
1. Get 10 players
  - Remove Players leaving the court
  - Add Players who have been waiting
  - Add back Players from the winning team
  - Remove Players who reached 'max games played in a row' (if set to true in court settings)
  - 'Random Draw' for remaining spots
    - Only players who haven't reached 'max games played in a row' in first Draw
    - Second draw necessary between players who reached limit
2. Ask 'Find best matchup' (default) or 'keep winners together'
3. If 'Find best matchup', run the 'Find best matchup' function
  - Match players with similar skill, position, size -- put on opposing teams
  - Check for mismatches (point differential vs matchup player on opposing team)
  - Compensate for mismatch with point differential team players
4. Allow for manual override
5. Click "play game"

#### User Flow (views)

** User with an account, going to weekly court **
1. Login - email and password
2. Select Court - 'YWCA' or 'IHM' to start
3. View Court - see current game, player attendance, option to 'check in', view past games
4. New Game - populates players and best matchup
  - Include random draw animations and why each player is in or out
5. Current Game - view who is playing with the option to 'add final score'. Input final score
6. Past Game - view the results of the previous game

** Add a (new) player **
- On "new game" or "view court", you should be able to "add a player"
- Add the players name, height, weight/build (S, M, L, XL), position, play style (shooter, passer, scorer, rebounder, hustle) -- this creates a new instance of "Player"
- Invite player to app via email -- this associates a Player with a User

** Add / Edit a court **
- Create a court (name, location)
- Set court times (M/W/F at Noon)
- Set court settings (Winner stays, win by 2 / straight up, play to #, scoring by 1s | 1s & 2s | 2s & 3s, max games played in a row)

#### How to find the best matchups (Game Maker Algorithm)
TBD
- Start with the highest skilled or most winning players
- Find the lowest overall point differential between matchups
- Players matchup based on position, size, skill
- Flip players to get overall point differential the lowest between teams


------
## Technical Build Considerations

#### Data Architecture
- Users - uses the base Meteor Users Collection (id, emails, password)

```javascript
Meteor.users = {
  id: {type: String},
  emails: [
    {address: String, verified: Boolean}
  ],
  createdAt: {type: Date},
  password: {hashed password}
}

```

- Players - players are people who play games in the application. A user account is not required to be a players

```javascript
Players = new Mongo.Collection('Players');

Players.schema = new SimpleSchema({
  id: {type: String},
  name: {type: String},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}, // matched to a user account
  gamesPlayed: {type: [String], optional: true}, // ids of the games played
  wins: {type: [String], optional: true}, // ids of the games won
  losses: {type: [String], optional: true}, // ids of the games lost
  height: {
    feet: {type: Number, optional: true},
    inches: {type: Number, optional: true},
  }, // Feet, Inches
  build: {type: String, optional: true}, // Small, Medium, Large, Extra Large
  position: {type: [String], optional: true}, // Guard, Forward
  playStyle: {type: [String], optional: true} // Shooter, Scorer, Passer, Rebounder, Hustler
  selfSkillLevel: {type: Number} // self selected skill between 1 and 10 (10 being the best for rec players) should this be by each court?
  skillLevel: {type: Number} // adjusted skill based on wins and other player ratings
});
```
- Court - where a game is played. It includes the location and the current attendance and planned attendance.

```javascript
Courts = new Mongo.Collection('Courts');

Courts.schema = new SimpleSchema({
  id: {type: String}
  name: {type: String},
  location: {type: String},
  description: {type: String},
  settings: {
    winnersStay: {type: Boolean},
    winBy2: {type: Boolean},
    scoreBy: {type: String},
    games2IfWaiting: {type: Number},
    games2IfNotWaiting: {type: Number},
    maxGameLimit: {type: Number}
  },
  currentAttendance: {type: [String]}, // player ids of current courtTime
  plannedAttendance: {type: [String]}, // player ids of next courtTime who are planning on attending
  courtTimes: {type: [Object]} // array of objects holding dates and start and stop times
});
```

- Game - a game is an event in time where two teams play and one team wins, with a score

```javascript
Games = new Mongo.Collection('Games');

Games.schema = new SimpleSchema({
  id: {type: String},
  courtId: {type: String}, // reference to the court where the game is played
  createdAt: {type: Date}, // when the 'new game' was createdAt
  endedAt: {type: Date}, // when the game's final score was input
  team1: {type: [String]}, // array of playerIds
  team2: {type: [String]}, // array of playerIds for
});
```

#### Development Guidelines
- Use the guide.meteor.com for how to build application
- Should be used as a simple app so that different builds (blaze vs. react) can be compared
- Uses ES2015 syntax

#### Package Dependencies
- Meteor Accounts - core accounts system / authentication
- alanning:roles - to enable roles and permissions
- aldeed:simple-schema - for collection validations
- pcjpcj2:ratchet - for mobile components and page transitions styling
- useraccounts:ratchet - for user accounts
- sideburns - meteor templates into react (possible)

------
