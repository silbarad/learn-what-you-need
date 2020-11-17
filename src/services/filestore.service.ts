import firebase from 'firebase/app';
import 'firebase/firestore';
import { Desk, DocRef, DeskType } from '@/services/models';
import { FilestoreService } from './interface/FilestoreService';

export default class implements FilestoreService {
  async getDesks(): Promise<Desk[]> {
    const db = firebase.firestore();
    const desksCollection = await db.collection('desks').get();
    const desks = desksCollection.docs.map((d) => {
      // eslint-disable-next-line
      const { name, url } = (d.data() as any) as Desk;
      const { id, ref } = d;
      return { name, id, url, ref };
    });
    return desks;
  }

  async getDeskTypes(deskRef: DocRef): Promise<DeskType[]> {
    console.log(deskRef);
    const db = firebase.firestore();
    const desksCollection = await db
      .collection('types')
      .where('desk', '==', deskRef)
      // .where('desk', '==', `/desks/${idDesk}`)
      .where('key', '==', 'aaa')
      .get();
    const deskTypes = desksCollection.docs.map((d) => {
      // eslint-disable-next-line
      const { name } = (d.data() as any) as DeskType;
      const { id } = d;
      return { name, id } as DeskType;
    });
    console.log(deskTypes);
    return deskTypes;
  }
}
