import mongoose, { Schema, Model } from 'mongoose';

// Home Section
export interface IHome {
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  stats: Array<{ value: string; label: string }>;
}

const HomeSchema = new Schema<IHome>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    profileImage: { type: String, required: true },
    stats: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// About Section
export interface IAbout {
  whoAmI: string;
  myApproach: string;
  personalInfo: {
    fullName: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    availability: string;
    linkedin: string;
    github: string;
    instagram: string;
    twitter: string;
  };
}

const AboutSchema = new Schema<IAbout>(
  {
    whoAmI: { type: String, required: true },
    myApproach: { type: String, required: true },
    personalInfo: {
      fullName: { type: String, required: true },
      role: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      location: { type: String, required: true },
      availability: { type: String, required: true },
      linkedin: { type: String },
      github: { type: String },
      instagram: { type: String },
      twitter: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// Skill
export interface ISkill {
  name: string;
  category: string;
  icon: string;
  color: string;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Project
export interface IProject {
  title: string;
  subtitle: string;
  handle: string;
  image: string;
  borderColor: string;
  gradient: string;
  url: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    handle: { type: String, required: true },
    image: { type: String, required: true },
    borderColor: { type: String, required: true },
    gradient: { type: String, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Export Models
export const Home: Model<IHome> = mongoose.models.Home || mongoose.model<IHome>('Home', HomeSchema);
export const About: Model<IAbout> = mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
export const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
export const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
