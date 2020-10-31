import { FirebaseCallbackStoreInterface } from '@/types/FirebaseCallbackInterface';
import UserAuthenticateSend from '@/types/UserAuthenticateSend';

export interface FirebaseService {
  init(navigationStore: FirebaseCallbackStoreInterface): Promise<void>;
  login(userAuth: UserAuthenticateSend): Promise<string>;
  logout(): Promise<void>;
}
