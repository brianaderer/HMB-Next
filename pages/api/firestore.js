import {db} from '../../utilities/firebase'
import { collection, doc, setDoc } from "firebase/firestore";
export default async function handler(req, res) {
    const { image_gallery, ...data } = req.body;


    try {
        if( data ){
            console.log(data);
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ error: "" });
}
