import { NextRequest, NextResponse } from 'next/server';
import { getHomeData, updateHomeData, getHomeStats } from '@/lib/supabaseHelper';

// Disable caching for admin routes
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const homeData = await getHomeData();
    const homeStats = await getHomeStats();
    
    // Combine data for frontend
    const responseData = {
      ...homeData,
      stats: homeStats.map(stat => ({
        value: stat.value,
        label: stat.label
      }))
    };
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching home data:', error);
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
    
    // Separate stats from home data
    const { stats, ...homeData } = body;
    
    // Update home data (without stats)
    const updatedData = await updateHomeData(homeData);
    
    // Note: Home stats update requires a separate endpoint or implementation
    // For now, we just update the main home data
    
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Error updating home data:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

