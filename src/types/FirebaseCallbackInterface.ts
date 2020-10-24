import { UserAuthenticate } from './UserAuthenticate';

export interface FirebaseCallbackStoreInterface {
  userChange(user: UserAuthenticate): Promise<void>;
}
