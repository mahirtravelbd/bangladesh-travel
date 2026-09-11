// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDriDLO67_ZCxH9piYxkMBDrlUYynqWVTY",
  authDomain: "bangladesh-travel-nirob.firebaseapp.com",
  projectId: "bangladesh-travel-nirob",
  storageBucket: "bangladesh-travel-nirob.firebasestorage.app",
  messagingSenderId: "479214980103",
  appId: "1:479214980103:web:50fa0b628e676b1597eea2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseConfig = {
  // তোমার Firebase-এর আসল তথ্য
};


// 👆 এখানে Enter দিয়ে নিচে 👇

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider =
  new firebase.auth.GoogleAuthProvider();

async function googleLogin() {
  try {
    const result =
      await auth.signInWithPopup(provider);

    console.log(
      "Login successful:",
      result.user.displayName
    );

  } catch (error) {
    console.error(error);

    alert("Google Sign-In করা যায়নি। আবার চেষ্টা করুন।");
  }
}

async function googleLogout() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
}

auth.onAuthStateChanged(user => {

  const buttons =
    document.querySelectorAll(
      ".login-button, #loginButton"
    );

  buttons.forEach(button => {

    if (user) {
      button.textContent =
        `👤 ${user.displayName || "Profile"}`;

      button.onclick = googleLogout;

    } else {
      button.textContent = "Google Sign-In";
      button.onclick = googleLogin;
    }

  });

});