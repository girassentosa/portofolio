import { NextResponse } from 'next/server';
import { getHomeData, getAboutData, getSkills, getProjects } from '@/lib/dbHelper';

export async function GET() {
  try {
    const home = getHomeData();
    const about = getAboutData();
    const skills = getSkills();
    const projects = getProjects();

    return NextResponse.json({
      home,
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

