import { Request, Response, NextFunction } from 'express';
//import { getAuth } from 'firebase/auth';
import { getAuth, Auth } from 'firebase/auth';

export async function extractUser(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = getAuth();
    const idToken = req.headers.authorization?.split(' ')[1]; // Supposons que le jeton JWT est passé dans le header Authorization

    if (!idToken) {
      //req.user = null;
    } else {
      // Vérifiez le jeton JWT
    //   const decodedToken = await auth.verifyIdToken(idToken);
    //   req.user = decodedToken;
    }

    next();
  } catch (error) {
    console.error('Erreur lors de l\'extraction de l\'utilisateur :', error);
    //req.user = null;
    next();
  }
}
