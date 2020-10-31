import NavigationStore from '@/stores/NavigationStore';
import UserAuthenticateSend from '@/types/UserAuthenticateSend';

interface LoginProps {
  ds?: NavigationStore;
  isAuthorized: boolean;
  model: UserAuthenticateSend;
  login(): Promise<void>;
}
export default LoginProps;
