import { Desk } from '../models/Desk';

export interface FilestoreService {
  getDesks(): Promise<Desk[]>;
}
