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

    // Transform about data to frontend format (snake_case to camelCase)
    const aboutTransformed = about ? {
      whoAmI: about.who_am_i || '',
      myApproach: about.my_approach || '',
      personalInfo: {
        name: about.name || '',
        location: about.location || '',
        email: about.email || '',
        phone: about.phone || '',
        education: about.education || ''
      },
      image: about.image || ''
    } : null;

    // Transform projects to frontend format (snake_case to camelCase)
    const projectsTransformed = projects.map(project => ({
      id: project.id,
      title: project.title,
      subtitle: project.subtitle,
      tech: project.handle,
      image: project.image,
      borderColor: project.border_color,
      gradient: project.gradient,
      url: project.url
    }));

    return NextResponse.json({
      home: homeWithStats,
      about: aboutTransformed,
      skills,
      projects: projectsTransformed,
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}

