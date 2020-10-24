import { FirebaseCallbackInterface } from './FirebaseCallbackInterface';
import UserAuthenticateSend from './UserAuthenticateSend';

export interface FirebaseServiceInterface {
  init(navigationStore: FirebaseCallbackInterface): Promise<void>;
  login(userAuth: UserAuthenticateSend): Promise<string>;
  logout(): Promise<void>;
}
