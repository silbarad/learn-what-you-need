import firebase from 'firebase/app';
import 'firebase/firestore';
import { FilestoreService } from './interface/FilestoreService';
import { Desk } from './models/Desk';

export default class implements FilestoreService {
  async getDesks(): Promise<Desk[]> {
    console.log('Service FileStore');
    const db = firebase.firestore();
    const desksCollection = await db.collectionGroup('desks').get();
    const desks = desksCollection.docs.map((d) => {
      // eslint-disable-next-line
      const { name } = (d.data() as any) as Desk;
      const { id } = d;
      return { name, id };
    });
    console.log(desks);
    return desks;
  }
}
