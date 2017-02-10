 var mongoose = require('mongoose'),
   crypto = require('crypto');


module.exports = function(config) {

  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('joeymeanstack db opened');
  });

  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    salt: String,
    hashed_pwd: String,
  });

  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hash_pwd;
    }
  };

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'mike');
      User.create({firstName: "Mike", lastName: "LaFirenza", username: "mike", salt: salt, hashed_pwd: hash});
      salt = createSalt();
      hash = hashPwd(salt, 'tunechi');
      User.create({firstName: "Lil", lastName: "Wayne", username: "tunechi", salt: salt, hashed_pwd: hash});
      salt = createSalt();
      hash = hashPwd(salt, 'ab');
      User.create({firstName: "Antonio", lastName: "Brown", username: "ab", salt: salt, hashed_pwd: hash});
    }
    // hash and salt fields should be removed from data that is sent to the client! bahp.. how to do that
  });

};

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
  var hmac = crypto.createHmac('sha1', salt);
  hmac.setEncoding('hex');
  hmac.write(pwd);
  hmac.end();
  return hmac.read();
}