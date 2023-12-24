import {db} from '../../utilities/firebase'
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
export default async function handler(req, res) {
     const { uid, displayName, email } = req.body || {};
    try {
        if( uid ){
            const docRef = doc(db, 'uuids', uid);
            await setDoc(docRef, {'full-name': displayName, 'email': email }, {merge: true});
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ error: "", data: "that worked" });
}