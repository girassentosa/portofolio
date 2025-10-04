import { NextRequest, NextResponse } from 'next/server';
import { updateSkill, deleteSkill } from '@/lib/supabaseHelper';

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
    const updatedSkill = await updateSkill(id, body);
    
    if (!updatedSkill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedSkill);
  } catch (error) {
    console.error('Error updating skill:', error);
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
    const success = await deleteSkill(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

