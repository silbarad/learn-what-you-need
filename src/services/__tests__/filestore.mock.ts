import { FilestoreService } from '@/services/interface/FilestoreService';
import { Desk } from '../models/Desk';

class FilestoreMock implements FilestoreService {
  getDesks(): Promise<Desk[]> {
    return Promise.resolve([]);
  }
}
export default FilestoreMock;
