import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/supabaseHelper';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newProject = await createProject(body);
    return NextResponse.json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

