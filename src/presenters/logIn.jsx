import {
  logInWithEmail,
  signInWithGoogle,
  signInWithApple,
} from '../models/appModel.js'

export function useLogInPresenter() {
  return {
    logInWithEmail,
    signInWithGoogle,
    signInWithApple,
  }
}
