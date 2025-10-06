import { supabase } from './supabase';

// ============================================
// TYPES
// ============================================

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  profile_image?: string;
  created_at: string;
}

export interface HomeData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  updated_at?: string;
}

export interface HomeStat {
  id: number;
  value: string;
  label: string;
  order_index: number;
}

export interface AboutData {
  id: number;
  who_am_i: string;
  my_approach: string;
  name: string;
  location: string;
  email: string;
  phone: string;
  education: string;
  image: string;
  updated_at?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string;
  color: string;
  created_at?: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  handle: string;
  image: string;
  border_color: string;
  gradient: string;
  url: string;
  created_at?: string;
}

// ============================================
// USER OPERATIONS
// ============================================

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
  return data;
}

export async function createUser(user: { username: string; password: string; email: string }): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateUserPassword(userId: number, newPassword: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ password: newPassword })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getUserById(userId: number): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateUsername(userId: number, newUsername: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ username: newUsername })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateProfileImage(userId: number, profileImage: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ profile_image: profileImage })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateUserProfile(userId: number, updates: { 
  username?: string; 
  password?: string; 
  profile_image?: string 
}): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============================================
// HOME OPERATIONS
// ============================================

export async function getHomeData(): Promise<HomeData | null> {
  const { data, error } = await supabase
    .from('home')
    .select('*')
    .eq('id', 1)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getHomeStats(): Promise<HomeStat[]> {
  const { data, error } = await supabase
    .from('home_stats')
    .select('*')
    .order('order_index', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function updateHomeData(updates: Partial<HomeData>): Promise<HomeData> {
  const { data, error } = await supabase
    .from('home')
    .update(updates)
    .eq('id', 1)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============================================
// ABOUT OPERATIONS
// ============================================

export async function getAboutData(): Promise<AboutData | null> {
  const { data, error } = await supabase
    .from('about')
    .select('*')
    .eq('id', 1)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateAboutData(updates: Partial<AboutData>): Promise<AboutData> {
  const { data, error } = await supabase
    .from('about')
    .update(updates)
    .eq('id', 1)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============================================
// SKILLS OPERATIONS
// ============================================

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function createSkill(skill: Omit<Skill, 'id' | 'created_at'>): Promise<Skill> {
  const { data, error } = await supabase
    .from('skills')
    .insert([skill])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateSkill(id: number, updates: Partial<Skill>): Promise<Skill> {
  const { data, error } = await supabase
    .from('skills')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteSkill(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// ============================================
// PROJECTS OPERATIONS
// ============================================

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateProject(id: number, updates: Partial<Project>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteProject(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// ============================================
// PROFILE IMAGE SYNC OPERATIONS
// ============================================

// Update profile image in home table
export async function updateHomeProfileImage(profileImage: string): Promise<void> {
  const { error } = await supabase
    .from('home')
    .update({ image: profileImage })
    .eq('id', 1); // Assuming id 1 is the main home record
  
  if (error) throw error;
}

// Update profile image in about table
export async function updateAboutProfileImage(profileImage: string): Promise<void> {
  const { error } = await supabase
    .from('about')
    .update({ image: profileImage })
    .eq('id', 1); // Assuming id 1 is the main about record
  
  if (error) throw error;
}

// Sync profile image across all tables (users, home, about)
export async function syncProfileImageAcrossTables(userId: number, profileImage: string): Promise<void> {
  // Update in parallel for better performance
  await Promise.all([
    updateProfileImage(userId, profileImage),
    updateHomeProfileImage(profileImage),
    updateAboutProfileImage(profileImage)
  ]);
}

