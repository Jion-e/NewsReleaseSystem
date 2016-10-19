import firebase from 'firebase'

var config = {
 apiKey: "AIzaSyDxUppBRTczs5FWVfmQaiqKve6zaw1_-_I",
 authDomain: "newssystem-2b6d6.firebaseapp.com",
 databaseURL: "https://newssystem-2b6d6.firebaseio.com",
 storageBucket: "newssystem-2b6d6.appspot.com",
 messagingSenderId: "830388281949"
};
firebase.initializeApp(config);
const email = 'w131080601@gmail.com'
const password =  'timo0703COM'
// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   console.log('login failed:' + errorMessage);
// });
// var user = firebase.auth().currentUser;
// if (user != null) {
//   user.providerData.forEach(function (profile) {
//     console.log("Sign-in provider: "+profile.providerId);
//     console.log("  Provider-specific UID: "+profile.uid);
//     console.log("  Name: "+profile.displayName);
//     console.log("  Email: "+profile.email);
//     console.log("  Photo URL: "+profile.photoURL);
//   });
// }

const db = firebase.database().ref();
const newsListRef = db.child('newsList');
const webTypesRef = db.child('webTypes');

export const fetchWebTypes = ({ commit }) => {
  webTypesRef.on('value', snapshot => {
    // console.log("webTypes:" + snapshot.val());
    commit('GET_WEBTYPES', snapshot.val())
  }, err => {
    console.log("The read webTypes failed: " + err.code);
  })
}

export const fetchNewsList = ({ commit }, page, count) => {
  newsListRef.on('value', snapshot => {
    // console.log("newsList:" + JSON.stringify(snapshot.val()));
    commit('GET_NEWSLIST', snapshot.val())
  }, err => {
    console.log("The read newsList failed: " + err.code);
  })
}

export const fetchNewsItem = ({ commit }, newsID) => {
  const newsItemRef = firebase.database().ref('newsList/' + newsID);
  newsItemRef.on('value', snapshot => {
    // console.log("newsItem:" + JSON.stringify(snapshot.val()));
    commit('GET_NEWSITEM', snapshot.val())
  }, err => {
    console.log("The read newsItem failed: " + err.code);
  })
}

export const clearNewsItem = ({ commit }) => {
  commit('CLEAR_NEWSITEM')
}

export const addNews = ({ commit }, newsItem) => {
  commit('ADD_NEWS', newsItem)
  firebase.database().ref('newsList/' + newsItem.id).set(newsItem)
}

export const updateNews = ({ commit }, newsItem) => {
  commit('UPDATE_NEWS', newsItem)
  firebase.database().ref('newsList/' + newsItem.id).update(newsItem)
}

export const deleteNews = ({ commit }, newsID) => {
  firebase.database().ref('newsList/' + newsID).update({'is': '1'})
}
