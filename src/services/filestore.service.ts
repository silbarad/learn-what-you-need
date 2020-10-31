import firebase from 'firebase/app';
import 'firebase/firestore';
import { FilestoreService } from './interface/FilestoreService';
import { Desk } from './models/Desk';

export default class implements FilestoreService {
  async getDesks(): Promise<Desk[]> {
    const db = firebase.firestore();
    const desksCollection = await db.collectionGroup('desks').get();
    const desks = desksCollection.docs.map((d) => {
      // eslint-disable-next-line
      const { name, url } = (d.data() as any) as Desk;
      const { id } = d;
      return { name, id, url };
    });
    return desks;
  }
}
