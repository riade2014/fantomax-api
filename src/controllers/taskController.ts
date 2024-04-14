// taskController.ts
import { Request, Response } from 'express';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import moment from "moment";

class TaskController {
  async createTask(req: Request, res: Response) {
    try {
      const { title, description, state } = req.body;
      const userId = req.params.uid;

      const firestore = getFirestore();
      const tasksCollection = collection(firestore, 'TASK');
      const taskData = {
        title,
        description,
        state,
        userId,
        createAt: moment().valueOf()
      };
      await addDoc(tasksCollection, taskData);

      res.status(201).json({ message: 'Tâche créée avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la création de la tâche.' });
    }
  }

  async getListTasks(req: Request, res: Response) {
    try {
      const userId = req.params.uid;
      const state = req.query.state as string;
  
      const firestore = getFirestore();
      const tasksCollection = collection(firestore, 'TASK');
  
      let tasksQuery = query(tasksCollection, where('userId', '==', userId));
  
      if (state === 'true') {
        tasksQuery = query(tasksQuery, where('state', '==', state === 'true'));
      }
  
      const tasksSnapshot = await getDocs(tasksQuery);
      const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      res.status(200).json(tasks); 
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches de l\'utilisateur :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des tâches.' });
    }
  }
  

  async getTaskById(req: Request, res: Response) {
    try {
      const taskId = req.params.taskId;

      const firestore = getFirestore();
      const taskRef = doc(firestore, 'TASK', taskId);
      const taskDoc = await getDoc(taskRef);

      if (!taskDoc.exists()) {
        return res.status(404).json({ error: 'Tâche non trouvée.' });
      }

      const taskData = taskDoc.data();

      res.status(200).json({ task: { id: taskDoc.id, ...taskData } });
    } catch (error) {
      console.error('Erreur lors de la récupération de la tâche :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la tâche.' });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const taskId = req.params.taskId; 

      const firestore = getFirestore();
      const taskRef = doc(firestore, 'TASK', taskId);
      await deleteDoc(taskRef);

      res.status(200).json({ message: 'Tâche supprimée avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la tâche.' });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const taskId = req.params.taskId; 
      const updatedTaskData = req.body; 

      const firestore = getFirestore();
      const taskRef = doc(firestore, 'TASK', taskId);
      await updateDoc(taskRef, updatedTaskData);

      res.status(200).json({ message: 'Tâche mise à jour avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la tâche.' });
    }
  }
}

export default new TaskController();