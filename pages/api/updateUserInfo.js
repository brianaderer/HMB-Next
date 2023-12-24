import {db} from '../../utilities/firebase'
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
export default async function handler(req, res) {
    const { image_gallery, uid, title, lastLogin, ...data } = req.body || {};
    try {
        if( uid ){
            const docRef = doc(db, 'uuids', uid);
            await setDoc(docRef, data, {merge: true});
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ error: "", data: "that worked" });
}