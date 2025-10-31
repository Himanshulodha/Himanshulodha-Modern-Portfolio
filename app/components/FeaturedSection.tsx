import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ProjectCard, cardProps } from './ProjectCard';
import { Tag } from '../ui/cardTags';
import { CardLink } from '../ui/cardLinks';
import projectsData from '../../src/projects.json';
import publicationsData from '../../src/publications.json';
import { Calistoga } from "next/font/google"

const giestCalistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
})

interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  slug: string;
  readTime: string;
}

interface Publication {
  title: string;
  description: string;
  type: string;
  publisher: string;
  book: string;
  tags: string[];
  links: {
    name: string;
    href: string;
    icon: 'linkedin' | 'github' | 'mail'| 'resume' | 'document' | 'jupyter';
  }[];
}

async function getFeaturedProjects(): Promise<cardProps[]> {
  // Get top 2 projects - prioritize Web Apps and AI/ML projects
  const projects = projectsData.projects;
  return projects.slice(0, 2).map(project => ({
    name: project.name,
    description: project.description,
    image: project.image,
    tags: project.tags,
    links: project.links as cardProps['links']
  }));
}

async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const contentDir = path.join(process.cwd(), 'content');
    
    if (!fs.existsSync(contentDir)) {
      return [];
    }

    const files = fs.readdirSync(contentDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));

    const posts = mdxFiles.map(filename => {
      const filePath = path.join(contentDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Himanshu Lodha',
        tags: data.tags || [],
        featured: data.featured || false,
        slug: data.slug || filename.replace('.mdx', ''),
        readTime: data.readTime || '5 min read',
      };
    });

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts.slice(0, 2);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

async function getFeaturedPublications(): Promise<Publication[]> {
  // Support new `achievements` key, fall back to legacy `publications`.
  const publications = (publicationsData as any).achievements || (publicationsData as any).Certificates || [];

  // Ensure publications is an array before mapping.
  if (!Array.isArray(publications) || publications.length === 0) return [];

  return publications.map((pub: any) => ({
    title: pub.title,
    description: pub.description,
    type: pub.type,
    publisher: pub.publisher,
    book: pub.book,
    tags: pub.tags || [],
    links: (pub.links || []) as Publication['links']
  }));
}

export async function FeaturedSection() {
  const featuredProjects = await getFeaturedProjects();
  const recentPosts = await getFeaturedBlogPosts();
  const featuredPublications = await getFeaturedPublications();

  // Load certificates from publications.json (new schema)
  const certificatesData = (publicationsData as any).certificates || [];
  // DEBUG: print certificates to server console to verify data is loaded
  console.log('DEBUG: certificatesData ->', JSON.stringify(certificatesData, null, 2));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      {/* Featured Projects Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className={"text-2xl font-bold text-black dark:text-white " + giestCalistoga.className}>
            featured projects
          </h2>
          <Link 
            href="/projects" 
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            view more 
            <svg className="w-4 h-4 transform transition-transform duration-200 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M5 12h16" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              description={project.description}
              image={project.image}
              tags={project.tags}
              links={project.links}
            />
          ))}
        </div>
      </section>

      {/* Featured Publications Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          {/* publications heading removed - keeping layout and content */}
        </div>

        <div className="space-y-6">
          {featuredPublications.map((pub, index) => (
            <div key={index} className="p-6 bg-white dark:bg-background-black border border-light-border dark:border-hover-black rounded-lg transition-all duration-200 mb-2">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {pub.description}
                  </p>
                  
                  {/* Tags */}
                  {pub.tags && pub.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {pub.tags.slice(0, 4).map((tag, tagIndex) => (
                        <Tag 
                          key={tagIndex}
                          name={tag}
                        />
                      ))}
                      {pub.tags.length > 4 && (
                        <Tag name={`+${pub.tags.length - 4} more`} />
                      )}
                    </div>
                  )}

                  {/* Type, Publisher and Book */}
                  <div className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                    <p className="mb-1">{pub.type} &bull; {pub.publisher}</p>
                    <p className="italic">Published in: {pub.book}</p>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2">
                    {pub.links.map((link, linkIndex) => (
                      <CardLink
                        key={linkIndex}
                        name={link.name}
                        icon={link.icon}
                        link={link.href}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates Section */}
      {Array.isArray(certificatesData) && certificatesData.length > 0 && (
        <section className="mt-17 md:mt-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className={"text-2xl font-bold text-black dark:text-white "+giestCalistoga.className}>
              Certificates
            </h2>
          </div>

          <div className="space-y-6">
            {certificatesData.map((cert: any, index: number) => (
              <div key={index} className="p-6 bg-white dark:bg-background-black border border-light-border dark:border-hover-black rounded-lg transition-all duration-200 mb-2">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{cert.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{cert.issuer} • {cert.date}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{cert.description}</p>

                    {cert.tags && cert.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {cert.tags.map((tag: string, tagIndex: number) => (
                          <Tag key={tagIndex} name={tag} />
                        ))}
                      </div>
                    )}

                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 underline">View Credential</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
