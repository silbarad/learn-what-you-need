import { Dictionary } from './Dictionary';

export interface DeskType {
  id: string;
  name: string | Dictionary<string>;
}
