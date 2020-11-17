import firebase from 'firebase/app';
import { Desk } from './Desk';
import { DeskType } from './DeskType';
import { Dictionary } from './Dictionary';

type DocRef = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export { Desk, DeskType, Dictionary, DocRef };
