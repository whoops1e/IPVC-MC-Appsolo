const admin = require('firebase-admin');

const serviceAccount = require('./mobile-computing-app-ae276-firebase-adminsdk-vihz9-7e6f881864.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mobile-computing-app-ae276.firebaseio.com'
});

module.exports = admin;
