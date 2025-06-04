import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { DataService } from "../services/dataService";
import { User } from "../types";

export class UsersController {
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  public createUser = (req: Request, res: Response): void => {
    try {
      const { name, email } = req.body;
      
      if (!name || !email) {
        res.status(400).json({ 
          message: "Name and email are required" 
        });
        return;
      }

      // Check if user with email already exists
      const existingUser = this.dataService.findUserByEmail(email);
      
      if (existingUser) {
        res.status(409).json({ 
          message: "User with this email already exists" 
        });
        return;
      }

      const user: User = {
        id: uuidv4(),
        name,
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const newUser = this.dataService.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  };

  public listUsers = (req: Request, res: Response): void => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      if (limit < 1 || limit > 100) {
        res.status(400).json({ 
          message: "Limit must be between 1 and 100" 
        });
        return;
      }

      if (offset < 0) {
        res.status(400).json({ 
          message: "Offset must be non-negative" 
        });
        return;
      }

      const result = this.dataService.getUsersPaginated(limit, offset);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  };

  public getUser = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const user = this.dataService.getUserById(id);
      
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ 
          message: "User not found" 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  };

  public updateUser = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      if (!name && !email) {
        res.status(400).json({ 
          message: "At least one field (name or email) is required for update" 
        });
        return;
      }

      // Check if email is being updated and if it conflicts with existing users
      if (email) {
        const existingUser = this.dataService.findUserByEmail(email);
        
        if (existingUser && existingUser.id !== id) {
          res.status(409).json({ 
            message: "User with this email already exists" 
          });
          return;
        }
      }

      const updateData: Partial<User> = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;

      const updatedUser = this.dataService.updateUser(id, updateData);
      
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ 
          message: "User not found" 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  };

  public deleteUser = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const success = this.dataService.deleteUser(id);
      
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ 
          message: "User not found" 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  };
}
