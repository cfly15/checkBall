Courts = new Mongo.Collection('Courts');

Courts.schema = new SimpleSchema({
  id: {type: String},
  name: {type: String},
  location: {type: String},
  description: {type: String},
  settings: {type: Object},
  currentAttendance: {type: [String]}, // player ids of current courtTime
  plannedAttendance: {type: [String]}, // player ids of next courtTime who are planning on attending
  courtTimes: {type: [Object]} // array of objects holding dates and start and stop times
});

// winnersStay: {type: Boolean},
// winBy2: {type: Boolean},
// scoreBy: {type: String},
// games2IfWaiting: {type: Number},
// games2IfNotWaiting: {type: Number},
// maxGameLimit: {type: Number}
