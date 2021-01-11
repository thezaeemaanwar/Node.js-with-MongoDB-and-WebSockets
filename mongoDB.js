const MongoClient = require("mongodb").MongoClient;
var Users;

async function DB() {
  const uri =
    "mongodb+srv://nodejs-mongodb:nodejs-mongodb@cluster0.ulgkf.mongodb.net/usersDB?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    await retrieveData(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  console.log(Users);
}
async function retrieveData(client) {
  const db = client.db("usersDB");
  const collection = db.collection("TableData");
  var data = await collection.find({}).toArray();
  Users = { Users: data[0].Users, TableData: data[0].TableData };
}
