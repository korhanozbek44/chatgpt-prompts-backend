/* eslint-disable import/no-unresolved */
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const { FIREBASE_SERVICE_ACCOUNT } = require('../config/config');

initializeApp({
  credential: cert(FIREBASE_SERVICE_ACCOUNT),
});

const db = getFirestore();

module.exports = {
  promptsDb: db.collection('prompts'),
};
