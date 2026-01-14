import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Users
  app.get(api.users.list.path, async (req, res) => {
    const users = await storage.getUsers();
    res.json(users);
  });
  
  app.get(api.users.current.path, async (req, res) => {
    // Mock current user
    const user = await storage.getUser(1);
    res.json(user);
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  });

  app.post(api.projects.create.path, async (req, res) => {
    const project = await storage.createProject(req.body);
    res.status(201).json(project);
  });

  // Tasks
  app.get(api.tasks.list.path, async (req, res) => {
    const projectId = req.query.projectId ? Number(req.query.projectId) : undefined;
    const tasks = await storage.getTasks(projectId);
    res.json(tasks);
  });

  app.post(api.tasks.create.path, async (req, res) => {
    const task = await storage.createTask(req.body);
    res.status(201).json(task);
  });

  app.put(api.tasks.update.path, async (req, res) => {
    try {
      const task = await storage.updateTask(Number(req.params.id), req.body);
      res.json(task);
    } catch (e) {
      res.status(404).json({ message: "Task not found" });
    }
  });

  app.delete(api.tasks.delete.path, async (req, res) => {
    await storage.deleteTask(Number(req.params.id));
    res.status(204).send();
  });

  // Workflows
  app.get(api.workflows.list.path, async (req, res) => {
    const workflows = await storage.getWorkflows();
    res.json(workflows);
  });

  app.post(api.workflows.create.path, async (req, res) => {
    const workflow = await storage.createWorkflow(req.body);
    res.status(201).json(workflow);
  });

  // Comments & Activities
  app.get(api.comments.list.path, async (req, res) => {
    const comments = await storage.getComments(Number(req.params.taskId));
    res.json(comments);
  });

  app.get(api.activities.list.path, async (req, res) => {
    const activities = await storage.getActivities();
    res.json(activities);
  });

  return httpServer;
}
