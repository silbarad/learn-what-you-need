import { FirebaseCallbackStoreInterface } from '@/types/FirebaseCallbackInterface';
import { FirebaseServiceInterface } from '@/types/FirebaseCallbackStoreInterface';
import UserAuthenticateSend from '@/types/UserAuthenticateSend';

class FirebaseMock implements FirebaseServiceInterface {
  callback?: FirebaseCallbackStoreInterface;

  init(callback: FirebaseCallbackStoreInterface): Promise<void> {
    this.callback = callback;
    return Promise.resolve();
  }

  public login(userAuth: UserAuthenticateSend): Promise<string> {
    const { callback } = this;
    if (callback) {
      callback.userChange({ userName: userAuth.email, userRoles: ['user'] });
    } else {
      console.error('Navigation/Index.vue is not connected');
    }
    return Promise.resolve('');
  }

  public logout(): Promise<void> {
    const { callback } = this;
    if (callback) {
      callback.userChange({ userName: '', userRoles: [] });
    } else {
      console.error('Navigation/Index.vue is not connected');
    }
    return Promise.resolve();
  }
}
export default FirebaseMock;