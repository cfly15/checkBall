Players = new Mongo.Collection('Players');

Players.schema = new SimpleSchema({
  id: {type: String},
  name: {type: String},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}, // matched to a user account
  gamesPlayed: {type: [String], optional: true}, // ids of the games played
  wins: {type: [String], optional: true}, // ids of the games won
  losses: {type: [String], optional: true}, // ids of the games lost
  height: {type: Object}, // Feet, Inches
  build: {type: String, optional: true}, // Small, Medium, Large, Extra Large
  position: {type: [String], optional: true}, // Guard, Forward
  playStyle: {type: [String], optional: true}, // Shooter, Scorer, Passer, Rebounder, Hustler
  selfSkillLevel: {type: Number}, // self selected skill between 1 and 10 (10 being the best for rec players) should this be by each court?
  skillLevel: {type: Number} // adjusted skill based on wins and other player ratings
});
