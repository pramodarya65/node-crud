var mongoose = require("mongoose");

var Schema = mongoose.Schema;

let db_link = process.env.DB_LINK;

let db;

mongoose
  .connect(db_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "node_crud",
  })
  .then((db_) => {
    db = db_;
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
