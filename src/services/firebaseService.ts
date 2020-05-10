import firebase from 'firebase/app';
import 'firebase/auth';
import { UserAuthenticateSend } from './models/UserAuthenticateSend';
import { mainEventBus, mainEventName } from './mainEventBus';

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


class FirebaseService {
  public app?: firebase.app.App;

  // eslint-disable-next-line  class-methods-use-this
  public get userInfo() {
    return firebase.auth().currentUser;
  }

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(this.userAuthStateChanged);
  }

  // eslint-disable-next-line  class-methods-use-this
  public userAuthStateChanged() {
    mainEventBus.$emit(mainEventName.userChanged);
  }

  // eslint-disable-next-line  class-methods-use-this
  public async login(userAuth: UserAuthenticateSend) {
    const AUTH_NOT_FOUND = 'auth/user-not-found';
    const AUTH_NOT_FOUND_MESSAGE = 'Email or password is wrong.';
    const AUTH_DEFAULT_MESSAGE = 'Something wrong with authentication.';
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(userAuth.email, userAuth.password);
      mainEventBus.$emit(mainEventName.userChanged);
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

  // eslint-disable-next-line  class-methods-use-this
  public async logout() {
    await firebase.auth().signOut();
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
