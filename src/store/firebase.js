import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA5IVGZM5zGSP_kI3vstG60a47tpxn_5ls",
    authDomain: "gastcolegevue.firebaseapp.com",
    databaseURL: "https://gastcolegevue.firebaseio.com",
    projectId: "gastcolegevue",
    storageBucket: "gastcolegevue.appspot.com",
    messagingSenderId: "688191113875",
    appId: "1:688191113875:web:fb77e46d199b1074cf5b66"
};

const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore()

export function listenToMessages (actions) {
    db.collection("messages").orderBy("time", "desc").limit(50)
        .onSnapshot((querySnapshot) => {
            actions.setMessages(querySnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            }).sort((a,b) => a.time - b.time))
        });

    db.collection("users").orderBy("name")
        .onSnapshot((querySnapshot) => {
            actions.setUsers(querySnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            }))
        });
}

export async function loginAsUser (user) {
    try {
        const result = await db.collection("users").add(user)
        return result.id
    } catch (e) {
        console.error(e)
    }
}

export async function postMessage (message) {
    try {
        const result = await db.collection("messages").add(message)
        return result.id
    } catch (e) {
        console.error(e)
    }
}

