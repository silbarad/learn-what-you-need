import { FilestoreService } from '@/services/interface/FilestoreService';
import { Desk, DocRef, DeskType } from '../models';

class FilestoreMock implements FilestoreService {
  getDeskTypes(deskRef: DocRef): Promise<DeskType[]> {
    return Promise.resolve([]);
  }

  getDesks(): Promise<Desk[]> {
    return Promise.resolve([]);
  }
}
export default FilestoreMock;
