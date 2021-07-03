import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDfL6MjgRPJMT1DOAV6ffwBfG5ESpPSS3I",
    authDomain: "financasseubeto.firebaseapp.com",
    projectId: "financasseubeto",
    storageBucket: "financasseubeto.appspot.com",
    messagingSenderId: "247758170339",
    appId: "1:247758170339:web:dc53899cb1debae4683dd6",
    measurementId: "G-M3B7BYG6YV"
}

const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp.firestore()
