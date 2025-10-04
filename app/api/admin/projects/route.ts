import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/supabaseHelper';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = await getProjects();
    
    // Transform database format to frontend format (snake_case to camelCase)
    const transformedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      subtitle: project.subtitle,
      handle: project.handle,
      image: project.image,
      borderColor: project.border_color,
      gradient: project.gradient,
      url: project.url
    }));
    
    return NextResponse.json(transformedProjects);
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
    
    // Transform frontend format to database format (camelCase to snake_case)
    const dbData = {
      title: body.title,
      subtitle: body.subtitle,
      handle: body.handle,
      image: body.image,
      border_color: body.borderColor,
      gradient: body.gradient,
      url: body.url
    };
    
    const newProject = await createProject(dbData);
    return NextResponse.json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

