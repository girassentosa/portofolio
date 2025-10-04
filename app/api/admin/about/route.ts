import { NextRequest, NextResponse } from 'next/server';
import { getAboutData, updateAboutData } from '@/lib/supabaseHelper';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getAboutData();
    
    // Transform database format to frontend format
    const responseData = {
      whoAmI: data?.who_am_i || '',
      myApproach: data?.my_approach || '',
      personalInfo: {
        name: data?.name || '',
        location: data?.location || '',
        email: data?.email || '',
        phone: data?.phone || '',
        education: data?.education || '',
      },
      image: data?.image || ''
    };
    
    return NextResponse.json(responseData);
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
    
    // Transform frontend format to database format
    const dbData = {
      who_am_i: body.whoAmI,
      my_approach: body.myApproach,
      name: body.personalInfo?.name,
      location: body.personalInfo?.location,
      email: body.personalInfo?.email,
      phone: body.personalInfo?.phone,
      education: body.personalInfo?.education,
      image: body.image
    };
    
    const updatedData = await updateAboutData(dbData);
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

