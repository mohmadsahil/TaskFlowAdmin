import { db } from "./db";
import {
  users, projects, tasks, workflows, comments, activities, notifications,
  type User, type Project, type Task, type Workflow, type Comment, type Activity, type Notification,
  type CreateTaskRequest, type UpdateTaskRequest,
  insertUserSchema, insertProjectSchema, insertTaskSchema, insertWorkflowSchema
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUsers(): Promise<User[]>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: any): Promise<Project>;

  // Tasks
  getTasks(projectId?: number): Promise<Task[]>;
  createTask(task: CreateTaskRequest): Promise<Task>;
  updateTask(id: number, updates: UpdateTaskRequest): Promise<Task>;
  deleteTask(id: number): Promise<void>;

  // Workflows
  getWorkflows(): Promise<Workflow[]>;
  createWorkflow(workflow: any): Promise<Workflow>;

  // Comments
  getComments(taskId: number): Promise<Comment[]>;

  // Activities
  getActivities(): Promise<Activity[]>;
}

export class MemStorage implements IStorage {
  private users: User[];
  private projects: Project[];
  private tasks: Task[];
  private workflows: Workflow[];
  private comments: Comment[];
  private activities: Activity[];
  
  private ids: { [key: string]: number } = {
    users: 1,
    projects: 1,
    tasks: 1,
    workflows: 1,
    comments: 1,
    activities: 1,
  };

  constructor() {
    this.users = [
      { id: 1, name: "Alice Manager", email: "alice@company.com", role: "Manager", avatarUrl: "https://i.pravatar.cc/150?u=alice" },
      { id: 2, name: "Bob Developer", email: "bob@company.com", role: "Developer", avatarUrl: "https://i.pravatar.cc/150?u=bob" },
      { id: 3, name: "Charlie Tester", email: "charlie@company.com", role: "Tester", avatarUrl: "https://i.pravatar.cc/150?u=charlie" }
    ];

    this.workflows = [
      { id: 1, name: "Software Development", description: "Standard software lifecycle", steps: ["Manager", "Developer", "Tester", "Deployed"] },
      { id: 2, name: "Content Creation", description: "Blog post workflow", steps: ["Idea", "Draft", "Editor", "Published"] }
    ];

    this.projects = [
      { id: 1, workspaceId: 1, name: "SaaS Platform Redesign", description: "Overhaul the UI/UX of the main platform", workflowId: 1, status: "Active", dueDate: new Date("2024-12-31") },
      { id: 2, workspaceId: 1, name: "Marketing Campaign Q1", description: "Launch new marketing initiative", workflowId: 2, status: "Active", dueDate: new Date("2024-03-31") }
    ];

    this.tasks = [
      { id: 1, projectId: 1, title: "Design System Updates", description: "Update color palette and typography", assigneeId: 2, status: "Developer", priority: "High", tags: ["Design", "UI"], dueDate: new Date() },
      { id: 2, projectId: 1, title: "Backend API Integration", description: "Connect frontend to new API endpoints", assigneeId: 2, status: "Manager", priority: "Medium", tags: ["Backend"], dueDate: new Date() },
      { id: 3, projectId: 1, title: "Unit Testing", description: "Write tests for auth module", assigneeId: 3, status: "Tester", priority: "Low", tags: ["QA"], dueDate: new Date() },
      { id: 4, projectId: 2, title: "Blog Post Draft", description: "Write initial draft for Q1 announcement", assigneeId: 1, status: "Draft", priority: "Medium", tags: ["Content"], dueDate: new Date() }
    ];

    this.comments = [];
    this.activities = [
      { id: 1, entityType: "task", entityId: 1, userId: 1, action: "created", details: "Task created", createdAt: new Date() }
    ];
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.find(p => p.id === id);
  }

  async createProject(project: any): Promise<Project> {
    const newProject = { ...project, id: ++this.ids.projects };
    this.projects.push(newProject);
    return newProject;
  }

  async getTasks(projectId?: number): Promise<Task[]> {
    if (projectId) {
      return this.tasks.filter(t => t.projectId === projectId);
    }
    return this.tasks;
  }

  async createTask(task: CreateTaskRequest): Promise<Task> {
    const newTask = { ...task, id: ++this.ids.tasks, assigneeId: task.assigneeId || null, priority: task.priority || "Medium", tags: task.tags || [], dueDate: task.dueDate || null };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(id: number, updates: UpdateTaskRequest): Promise<Task> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Task not found");
    const updatedTask = { ...this.tasks[index], ...updates };
    this.tasks[index] = updatedTask;
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  async getWorkflows(): Promise<Workflow[]> {
    return this.workflows;
  }

  async createWorkflow(workflow: any): Promise<Workflow> {
    const newWorkflow = { ...workflow, id: ++this.ids.workflows };
    this.workflows.push(newWorkflow);
    return newWorkflow;
  }

  async getComments(taskId: number): Promise<Comment[]> {
    return this.comments.filter(c => c.taskId === taskId);
  }

  async getActivities(): Promise<Activity[]> {
    return this.activities;
  }
}

export const storage = new MemStorage();
