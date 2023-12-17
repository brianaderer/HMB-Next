import {db} from './firebase';
import {doc, getDoc} from 'firebase/firestore';
export const isNewUser = async props => {
    const {uuid} = props;
    const docRef = doc(db, 'uuids', uuid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return 'found that fucker';
    } else {
        return 'no soup for you';
    }
}