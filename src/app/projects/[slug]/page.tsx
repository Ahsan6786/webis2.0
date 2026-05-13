import fs from 'fs';
import path from 'path';
import ProjectCarousel from '@/components/ProjectCarousel';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectsDir = path.join(process.cwd(), 'public', 'projects');
  
  let projectsData: { slug: string; images: string[] }[] = [];

  if (fs.existsSync(projectsDir)) {
    const slugs = fs.readdirSync(projectsDir).filter(file => {
      return fs.statSync(path.join(projectsDir, file)).isDirectory();
    });

    projectsData = slugs.map(projectSlug => {
      const projectDir = path.join(projectsDir, projectSlug);
      const images = fs.readdirSync(projectDir)
        .filter(file => /\.(png|jpe?g|webp)$/i.test(file))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
      
      return { slug: projectSlug, images };
    });
  }

  return (
    <ProjectCarousel projects={projectsData} initialSlug={slug} />
  );
}
