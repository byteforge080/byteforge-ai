import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
doc,
setDoc,
getDoc,
updateDoc,
increment
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXvMefLHgf3Gi_5ld-wPMiYzTndTB96ng",
  authDomain: "byteforge-ai.firebaseapp.com",
  projectId: "byteforge-ai",
  storageBucket: "byteforge-ai.firebasestorage.app",
  messagingSenderId: "724553759435",
  appId: "1:724553759435:web:49d588a0c665abd778394e",
  measurementId: "G-H0HEGDPZCG"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const statsRef =
doc(db,"analytics","stats");

async function initStats(){

const snap = await getDoc(statsRef);

if(!snap.exists()){

await setDoc(statsRef,{
users:0,
generations:0
});

}

loadStats();

}

export async function loadStats(){

const snap = await getDoc(statsRef);

const data = snap.data();

const ai =
document.getElementById("aiCount");

const users =
document.getElementById("usersCount");

if(ai){

ai.innerText = data.generations;

}

if(users){

users.innerText = data.users;

}

}

export async function generateAI(){

await updateDoc(statsRef,{
generations: increment(1)
});

loadStats();

}

export async function trackUser(){

if(!localStorage.getItem("visited")){

localStorage.setItem("visited","true");

await updateDoc(statsRef,{
users: increment(1)
});

loadStats();

}

}

initStats();