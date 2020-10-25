import { NavigationStoreInterface } from '@/types/NavigationStoreInterface';
import UserAuthenticateSend from '@/types/UserAuthenticateSend';

interface LoginProps {
  ds?: NavigationStoreInterface;
  isAuthorized: boolean;
  model: UserAuthenticateSend;
  login(): Promise<void>;
}
export default LoginProps;
