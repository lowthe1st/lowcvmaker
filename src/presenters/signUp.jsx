import {
  signUpWithEmail,
  signInWithGoogle,
  signInWithApple,
} from '../models/appModel.js'

export function useSignUpPresenter() {
  return {
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
  }
}
