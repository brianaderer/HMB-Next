import {db} from './firebase';
import {doc, getDoc} from 'firebase/firestore';
export const preUserLogin = async props => {
    const {uuid, id} = props;
    const docRef = doc(db, 'uuids', uuid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return docSnap.data();
    } else {
        document.getElementById(id)?.showModal();
    }
}