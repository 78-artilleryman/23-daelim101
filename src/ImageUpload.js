import {db, auth} from './firebaseCross'
import { getStorage, ref, uploadBytes } from "firebase/storage";

function ImageUpload() {

  const storage = getStorage();
  const storageRef = ref(storage, 'images/yunbh.jpg');

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
 
}
export default ImageUpload