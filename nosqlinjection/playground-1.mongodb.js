use('mongodbVSCodePlaygroundDB');
db.users.deleteMany({})

db.users.insertMany([
  { username: "admin", password: "secure" },
  { username: "user1", password: "123" }
]);

db.users.find();


