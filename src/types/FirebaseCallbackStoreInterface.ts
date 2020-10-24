import { FirebaseCallbackStoreInterface } from './FirebaseCallbackInterface';
import UserAuthenticateSend from './UserAuthenticateSend';

export interface FirebaseServiceInterface {
  init(navigationStore: FirebaseCallbackStoreInterface): Promise<void>;
  login(userAuth: UserAuthenticateSend): Promise<string>;
  logout(): Promise<void>;
}
