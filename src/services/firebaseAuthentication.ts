import {app} from './firebase'

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app);

/*
const loginComEmailESenha = async (email: string, pass: string) => {
  try{
    await signInWithEmailAndPassword(auth, email, pass)
  } catch (err) {
    console.log(err)
  }
}
*/
const logout = () => {
  signOut(auth)
}

export {
  auth, 
  logout
}