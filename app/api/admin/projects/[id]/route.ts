import { NextRequest, NextResponse } from 'next/server';
import { updateProject, deleteProject } from '@/lib/supabaseHelper';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = request.cookies.get('admin_session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const updatedProject = await updateProject(id, body);
    
    if (!updatedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = request.cookies.get('admin_session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    const success = await deleteProject(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

