// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase/auth';

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non authentifié.' });
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la vérification de l\'authentification.' });
  }
}
