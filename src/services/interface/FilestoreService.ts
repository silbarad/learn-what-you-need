import { Desk, DocRef, DeskType } from '../models';

export interface FilestoreService {
  getDesks(): Promise<Desk[]>;
  getDeskTypes(deskRef: DocRef): Promise<DeskType[]>;
}
