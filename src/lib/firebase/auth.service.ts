import { FirebaseError } from 'firebase/app'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

import auth from '.'

const signInWithGooglePopup = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    GoogleAuthProvider.credentialFromResult(result)

    // const token = credential?.accessToken
    const user = result.user
    console.log('Auth service: ', user)
    return user
  } catch (e) {
    const error = e as FirebaseError
    // const errorCode = error?.code;
    // const errorMessage = error?.message;

    // const email = error?.customData?.email ?? "";
    GoogleAuthProvider.credentialFromError(error)
    throw e
  }
}

const logOut = async () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then((value) => resolve(value))
      .catch((err) => reject(err))
  })
}

export { signInWithGooglePopup, logOut }
