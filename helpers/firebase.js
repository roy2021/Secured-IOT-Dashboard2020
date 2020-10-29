import firebase from 'firebase/app';
import firebaseConfig from '../config/firebase'
export const initializeFirebase = async() => {
    try{
    return firebase.initializeApp(firebaseConfig)
    }catch(e){
        if (!/already exists/.test(e.message)) {
            console.error('Firebase initialization error', e.stack)}
        return e
    }
}