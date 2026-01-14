import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(), // 'Manager', 'Developer', 'Tester', 'Admin'
  avatarUrl: text("avatar_url"),
});

export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  workflowId: integer("workflow_id"), // Custom workflow for this project
  status: text("status").default("Active"),
  dueDate: timestamp("due_date"),
});

// A Workflow defines the "Path" tasks must take (e.g. Manager -> Dev -> Tester)
export const workflows = pgTable("workflows", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  steps: jsonb("steps").$type<string[]>().notNull(), // Array of roles/designations: ["Manager", "Developer", "Tester"]
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  assigneeId: integer("assignee_id"), // User ID
  status: text("status").notNull(), // Current step in the workflow (e.g., "Developer")
  priority: text("priority").default("Medium"), // Low, Medium, High
  tags: jsonb("tags").$type<string[]>(),
  dueDate: timestamp("due_date"),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id").notNull(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull(), // 'task', 'project'
  entityId: integer("entity_id").notNull(),
  userId: integer("user_id").notNull(),
  action: text("action").notNull(), // 'moved', 'created', 'commented'
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===
export const projectRelations = relations(projects, ({ one, many }) => ({
  tasks: many(tasks),
}));

export const taskRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  assignee: one(users, {
    fields: [tasks.assigneeId],
    references: [users.id],
  }),
  comments: many(comments),
}));

// === ZOD SCHEMAS ===
export const insertUserSchema = createInsertSchema(users);
export const insertProjectSchema = createInsertSchema(projects);
export const insertTaskSchema = createInsertSchema(tasks);
export const insertWorkflowSchema = createInsertSchema(workflows);
export const insertCommentSchema = createInsertSchema(comments);

// === EXPLICIT API TYPES ===
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Workflow = typeof workflows.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type Notification = typeof notifications.$inferSelect;

export type CreateTaskRequest = z.infer<typeof insertTaskSchema>;
export type UpdateTaskRequest = Partial<CreateTaskRequest>;
