Games = new Mongo.Collection('Games');

Games.schema = new SimpleSchema({
  id: {type: String},
  courtId: {type: String}, // reference to the court where the game is played
  createdAt: {type: Date}, // when the 'new game' was createdAt
  endedAt: {type: Date}, // when the game's final score was input
  team1: {type: [String]}, // array of playerIds for team 1
  team2: {type: [String]}, // array of playerIds for team 2
  finalScore: {type: [Number]} // team 1 score then team 2 score
});
