import { loadLatestContent, saveLatestContent, logOut } from '../models/appModel.js'

export function useHomePresenter() {
  return {
    loadLatestCvAndCoverLetter: loadLatestContent,
    saveUpdates: saveLatestContent,
    logOut,
  }
}
