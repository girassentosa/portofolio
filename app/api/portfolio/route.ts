import { NextResponse } from 'next/server';
import { getHomeData, getHomeStats, getAboutData, getSkills, getProjects } from '@/lib/supabaseHelper';

export async function GET() {
  try {
    const home = await getHomeData();
    const homeStats = await getHomeStats();
    const about = await getAboutData();
    const skills = await getSkills();
    const projects = await getProjects();

    // Combine home data with stats
    const homeWithStats = home ? {
      ...home,
      stats: homeStats.map(stat => ({
        value: stat.value,
        label: stat.label
      }))
    } : null;

    return NextResponse.json({
      home: homeWithStats,
      about,
      skills,
      projects,
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}

