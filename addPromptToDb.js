const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const prompts = [];

const serviceAccount = require('./src/config/firebase-service-account.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const promptsDb = db.collection('prompts');
Promise.all(prompts.map((p) => promptsDb.add(p))).then(() => console.log('done'));
//   .get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, doc.data());
//     });
//   });
