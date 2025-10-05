import { NextRequest, NextResponse } from 'next/server';
import { getSkills, createSkill } from '@/lib/supabaseHelper';

// Disable caching for admin routes
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const skills = await getSkills();
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
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
    const newSkill = await createSkill(body);
    return NextResponse.json(newSkill);
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

