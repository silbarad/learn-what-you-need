import FilestoreStore from '@/stores/FilestoreStore';
import NavigationStore from '@/stores/NavigationStore';

interface HomeProps {
  ds?: NavigationStore;
  fbs?: FilestoreStore;
  userName: string;
}
export default HomeProps;
