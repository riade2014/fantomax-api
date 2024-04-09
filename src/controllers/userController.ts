// userController.ts
import { Request, Response } from 'express';
import { getAuth, createUserWithEmailAndPassword, updateProfile ,signInWithEmailAndPassword,UserCredential} from 'firebase/auth';
import { sign } from 'jsonwebtoken';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import moment from "moment";

class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const { lastname, firstname, email, password, username } = req.body;
      
      const auth = getAuth();
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const firestore = getFirestore();
      const userRef = doc(firestore, 'USER', user.uid);

      const userData = {
        lastname,
        firstname,
        username,
        email: user.email,
        password,
        createdAt: moment().valueOf(),
        id: user.uid,
      };

      await setDoc(userRef, userData);

      res.status(201).json({
        id: user.uid,
        lastname,
        firstname,
        email: user.email,
        username,
        password,
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const firestore = getFirestore();
      const userRef = doc(firestore, 'USER', user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      res.status(200).json({
        id: user.uid,
        email: user.email,
        lastname: userData?.lastname || '',
        firstname: userData?.firstname || '',
        username: userData?.username,
        createdAt: userData?.createdAt

      });
    } catch (error) {
      console.error('Erreur lors de la connexion de l\'utilisateur:', error);
      res.status(401).json({ error: 'Identifiants invalides.' });
    }
  }

}

export default new UserController();
