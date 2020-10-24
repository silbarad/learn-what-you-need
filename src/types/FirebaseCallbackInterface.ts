import { UserAuthenticate } from './UserAuthenticate';

export interface FirebaseCallbackInterface {
  userChange(user: UserAuthenticate): Promise<void>;
}
