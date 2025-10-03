import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'lib', 'db.json');

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: string;
}

export interface HomeData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: Array<{ value: string; label: string }>;
}

export interface AboutData {
  whoAmI: string;
  myApproach: string;
  personalInfo: {
    name: string;
    location: string;
    email: string;
    phone: string;
    education: string;
  };
  image: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  handle: string;
  image: string;
  borderColor: string;
  gradient: string;
  url: string;
}

interface Database {
  users: User[];
  home: HomeData;
  about: AboutData;
  skills: Skill[];
  projects: Project[];
}

export function readDB(): Database {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return {
      users: [],
      home: {} as HomeData,
      about: {} as AboutData,
      skills: [],
      projects: []
    };
  }
}

export function writeDB(data: Database): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing database:', error);
  }
}

export function getUsers(): User[] {
  const db = readDB();
  return db.users;
}

export function getUserByUsername(username: string): User | undefined {
  const users = getUsers();
  return users.find(u => u.username === username);
}

export function createUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const db = readDB();
  const newUser: User = {
    ...user,
    id: Math.max(...db.users.map(u => u.id), 0) + 1,
    createdAt: new Date().toISOString()
  };
  db.users.push(newUser);
  writeDB(db);
  return newUser;
}

export function updateUserPassword(userId: number, newPassword: string): boolean {
  const db = readDB();
  const userIndex = db.users.findIndex(u => u.id === userId);
  if (userIndex === -1) return false;
  
  db.users[userIndex].password = newPassword;
  writeDB(db);
  return true;
}

// Home CRUD
export function getHomeData(): HomeData {
  const db = readDB();
  return db.home;
}

export function updateHomeData(data: Partial<HomeData>): HomeData {
  const db = readDB();
  db.home = { ...db.home, ...data };
  writeDB(db);
  return db.home;
}

// About CRUD
export function getAboutData(): AboutData {
  const db = readDB();
  return db.about;
}

export function updateAboutData(data: Partial<AboutData>): AboutData {
  const db = readDB();
  db.about = { ...db.about, ...data };
  writeDB(db);
  return db.about;
}

// Skills CRUD
export function getSkills(): Skill[] {
  const db = readDB();
  return db.skills;
}

export function createSkill(skill: Omit<Skill, 'id'>): Skill {
  const db = readDB();
  const newSkill: Skill = {
    ...skill,
    id: Math.max(...db.skills.map(s => s.id), 0) + 1
  };
  db.skills.push(newSkill);
  writeDB(db);
  return newSkill;
}

export function updateSkill(id: number, data: Partial<Skill>): Skill | null {
  const db = readDB();
  const skillIndex = db.skills.findIndex(s => s.id === id);
  if (skillIndex === -1) return null;
  
  db.skills[skillIndex] = { ...db.skills[skillIndex], ...data };
  writeDB(db);
  return db.skills[skillIndex];
}

export function deleteSkill(id: number): boolean {
  const db = readDB();
  const initialLength = db.skills.length;
  db.skills = db.skills.filter(s => s.id !== id);
  
  if (db.skills.length < initialLength) {
    writeDB(db);
    return true;
  }
  return false;
}

// Projects CRUD
export function getProjects(): Project[] {
  const db = readDB();
  return db.projects;
}

export function createProject(project: Omit<Project, 'id'>): Project {
  const db = readDB();
  const newProject: Project = {
    ...project,
    id: Math.max(...db.projects.map(p => p.id), 0) + 1
  };
  db.projects.push(newProject);
  writeDB(db);
  return newProject;
}

export function updateProject(id: number, data: Partial<Project>): Project | null {
  const db = readDB();
  const projectIndex = db.projects.findIndex(p => p.id === id);
  if (projectIndex === -1) return null;
  
  db.projects[projectIndex] = { ...db.projects[projectIndex], ...data };
  writeDB(db);
  return db.projects[projectIndex];
}

export function deleteProject(id: number): boolean {
  const db = readDB();
  const initialLength = db.projects.length;
  db.projects = db.projects.filter(p => p.id !== id);
  
  if (db.projects.length < initialLength) {
    writeDB(db);
    return true;
  }
  return false;
}

