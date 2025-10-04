import { NextRequest, NextResponse } from 'next/server';
import { getAboutData, updateAboutData } from '@/lib/supabaseHelper';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getAboutData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updatedData = await updateAboutData(body);
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

