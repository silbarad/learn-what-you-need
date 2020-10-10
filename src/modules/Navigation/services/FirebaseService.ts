import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseCallbackInterface } from '../types/FirebaseCallbackInterface';
import { FirebaseServiceInterface } from '../types/FirebaseServiceInterface';
import UserAuthenticateSend from '../types/UserAuthenticateSend';

const firebaseConfig = {
  apiKey: 'AIzaSyCxQtV1jMKKvOG0FX3jhsDUHBDYb3rdNm4',
  authDomain: 'learn-what-you-need-25577.firebaseapp.com',
  databaseURL: 'https://learn-what-you-need-25577.firebaseio.com',
  projectId: 'learn-what-you-need-25577',
  storageBucket: 'learn-what-you-need-25577.appspot.com',
  messagingSenderId: '17350185799',
  appId: '1:17350185799:web:42928ab118810fe112f262',
  measurementId: 'G-35R14P3GEV',
};

export default class implements FirebaseServiceInterface {
  private app?: firebase.app.App;

  private callbacks?: FirebaseCallbackInterface;

  public async init(navigationStore: FirebaseCallbackInterface) {
    this.callbacks = navigationStore;
    this.app = firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(() => this.userAuthStateChanged());
  }

  public async userAuthStateChanged() {
    console.log('123');
    await this.callbacks?.userChange();
  }

  public async login(userAuth: UserAuthenticateSend) {
    const AUTH_NOT_FOUND = 'auth/user-not-found';
    const AUTH_NOT_FOUND_MESSAGE = 'Email or password is wrong.';
    const AUTH_DEFAULT_MESSAGE = 'Something wrong with authentication.';
    try {
      await firebase.auth().signInWithEmailAndPassword(userAuth.email, userAuth.password);
      return '';
    } catch (error) {
      const authFirebaseError = error as firebase.auth.Error;
      switch (authFirebaseError.code) {
        case AUTH_NOT_FOUND:
          return AUTH_NOT_FOUND_MESSAGE;
        default:
          return AUTH_DEFAULT_MESSAGE;
      }
    }
  }

  public async logout() {
    // await firebase.auth().signOut();
    return Promise.resolve();
  }
}
