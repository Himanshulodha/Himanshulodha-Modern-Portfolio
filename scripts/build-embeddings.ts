import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from 'dotenv';
dotenv.config();

interface Experience {
  name: string;
  title: string;
  start: string;
  end: string;
  description: string;
  technologies?: string[];
  location?: string;
}

interface Project {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
}

interface Publication {
  title: string;
  description: string;
  type: string;
  publisher?: string;
  book?: string;
  tags: string[];
  links?: { name: string; href: string; icon: string; }[];
}

interface Social {
  name: string;
  href: string;
  icon: string;
}

interface Education {
  name: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
}

async function buildEmbeddings() {
  try {
    console.log('Starting to build embeddings...');
    
    // Try to connect directly to existing collection instead of using vector store
    const { getEmbeddingsCollection } = await import('../lib/vectordb');
    const collection = await getEmbeddingsCollection();
    
    console.log('✅ Connected to existing collection');
    
    // Clear existing embeddings first
    console.log('🗑️  Clearing existing embeddings...');
    const deleteResult = await collection.deleteMany({});
    console.log(`✅ Cleared ${deleteResult.deletedCount} existing embeddings`);
    
    // Continue with data processing...
    const dataDir = path.join(process.cwd(), 'src');
    
    const experiencesData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'experiences.json'), 'utf-8')
    );
    
    const projectsData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf-8')
    );
    
    const publicationsData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'publications.json'), 'utf-8')
    );
    
    const educationsData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'educations.json'), 'utf-8')
    );

    // Load socials data
    const socialsData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'socials.json'), 'utf-8')
    );

    // Extract arrays from the data structure
    const experiences = experiencesData.experience || experiencesData.experiences || experiencesData;
    const projects = projectsData.projects || projectsData;
    const publications = publicationsData.publications || publicationsData;
    const educations = educationsData.education || educationsData.educations || educationsData;
    const socials = socialsData.socials || socialsData;

    // Prepare documents for embedding
    const documents = [];

    // Add homepage/general information
    // Create a comprehensive skills summary from all projects
    const allTechnologies = new Set<string>();
    projects.forEach((project: Project) => {
      project.tags?.forEach(tag => allTechnologies.add(tag));
    });
    
    const skillsList = Array.from(allTechnologies).join(', ');
    
  const homepageContent = `
Himanshu Lodha - AI & Data Science Enthusiast

Bio: Passionate about Artificial Intelligence, Data Science, and full-stack web development, Himanshu blends technical intelligence with creative problem-solving to build smart, impactful solutions. He has completed his B.Tech in Artificial Intelligence and Data Science and continues to explore the intersection of AI, data, and scalable web technologies to drive real-world innovation.

Current Role: Working on AI-powered web applications, LLM integrations, and intelligent data systems — combining machine learning with modern web frameworks like Flask, Django, and React to deliver seamless end-to-end user experiences.

Key Achievements: Achieved a max rating of 1514 on LeetCode, solving 550+ problems and earning 11 skill badges (Profile: Lodha11).

Solved 500+ problems on HackerRank across multiple domains, earning 5★ badges (Profile: lodha11).

Earned a Certificate in Large Language Models (LLMs) from IIT Madras, strengthening expertise in Generative AI.

Secured 4th position in the Rajasthan IT Day Hackathon (SIH track) for developing an innovative AI-based solution.

Completed Coursera certifications in Data Science and Machine Learning, demonstrating strong analytical and modeling capabilities.

Certified in Python and SQL on HackerRank, showcasing practical coding and database proficiency.

Led teams in organizing technical and innovation-driven events under ASIMOV Robotics Club and Innovation Cell, MITS. Successfully transitioned from academia to industry, contributing to production-level AI solutions.

Technical Skills: ${skillsList}

Core Competencies: LLM, Langchain, Data Analysis, AI/ML Engineering, MLOps, Web Development, Machine Learning, Data Science, Cloud Computing.

Contact Information: 
- Email: himanshulodha3302@gmail.com
- LinkedIn: https://www.linkedin.com/in/himanshu-lodha-350b92216/
- GitHub: https://github.com/Himanshulodha

Social Media Profiles:
${socials.map((social: Social) => `- ${social.name}: ${social.href}`).join('\n')}

Professional Summary: AI & ML Engineer at RavenRisk AI, with a strong foundation in full-stack development and artificial intelligence. Experienced in building and deploying innovative web applications and AI solutions. Adept at integrating AI models into production and collaborating across teams.

Current Learning & Development: Exploring advanced MLOps practices, scalable AI deployment, and the intersection of Web3 with AI. Continuously learning to bridge the gap between traditional and decentralized web technologies.

Resume: Available at https://drive.google.com/file/d/1dV-4M9qmORCxohHVQLADK3UdfHVi-jQL/view?usp=drive_link

About: AI & ML Engineer passionate about creating intelligent, production-ready web applications and solutions. Strong academic background with top GATE rankings, now applying expertise in industry. Experienced in full-stack development, machine learning, and data science projects, with a focus on real-world impact.

Himanshu Lodha is a dedicated problem solver with a strong command of Data Structures and Algorithms, as demonstrated by his consistent performance on LeetCode. He has solved 590 problems across all difficulty levels — 131 Easy, 369 Medium, and 93 Hard — out of a total of 3,617 available challenges. With a global rank of 102,486, Himanshu has made over 1,100 submissions in 2024 alone, maintaining an impressive 132-day streak and remaining active for 303 days throughout the year. He has earned 16 achievement badges, including the prestigious 365 Days Badge, reflecting his persistence, analytical mindset, and continuous growth. Now, as a professional AI & Data Science Engineer, Himanshu continues to strengthen his algorithmic thinking and apply it to solving complex, real-world engineering challenges.
Leetcode profile link - https://leetcode.com/u/Lodha11/
`;

    documents.push({
      pageContent: homepageContent.trim(),
      metadata: {
        type: 'general',
        id: 0,
        source: 'homepage',
        category: 'personal_info'
      }
    });

    // Process experiences
    experiences.forEach((exp: Experience, index: number) => {
      const content = `Experience at ${exp.name} as ${exp.title} (${exp.start} - ${exp.end}): ${exp.description}. Location: ${exp.location || 'N/A'}.`;
      documents.push({
        pageContent: content,
        metadata: {
          type: 'experience',
          id: index,
          company: exp.name,
          position: exp.title,
          duration: `${exp.start} - ${exp.end}`,
          location: exp.location
        }
      });
    });

    // Process projects
    projects.forEach((project: Project, index: number) => {
      const content = `Project: ${project.name}. Description: ${project.description}. Technologies: ${project.tags.join(', ')}.`;
      documents.push({
        pageContent: content,
        metadata: {
          type: 'project',
          id: index,
          title: project.name,
          technologies: project.tags,
          image: project.image
        }
      });
    });

    // Process publications
    publications.forEach((pub: Publication, index: number) => {
      const content = `Publication: ${pub.title}. Type: ${pub.type}. Publisher: ${pub.publisher || 'N/A'}. Description: ${pub.description}. Tags: ${pub.tags?.join(', ') || 'N/A'}.`;
      documents.push({
        pageContent: content,
        metadata: {
          type: 'publication',
          id: index,
          title: pub.title,
          publicationType: pub.type,
          publisher: pub.publisher,
          tags: pub.tags || [],
          links: pub.links || []
        }
      });
    });

    // Process education
    educations.forEach((edu: Education, index: number) => {
      const content = `Education: ${edu.title} from ${edu.name} (${edu.start} - ${edu.end}). ${edu.description || ''} Location: ${edu.location || 'N/A'}.`;
      documents.push({
        pageContent: content,
        metadata: {
          type: 'education',
          id: index,
          institution: edu.name,
          degree: edu.title,
          duration: `${edu.start} - ${edu.end}`,
          location: edu.location
        }
      });
    });

    console.log(`Prepared ${documents.length} documents for embedding...`);

    // Initialize embeddings model
    const embeddings = new GoogleGenerativeAIEmbeddings({ 
      model: "text-embedding-004",
      apiKey: process.env.GEMINI_API_KEY 
    });

    console.log('Generating embeddings for documents...');
    
    // Process documents in batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(documents.length/batchSize)}...`);
      
      for (const doc of batch) {
        try {
          // Generate embedding for this document
          const embedding = await embeddings.embedQuery(doc.pageContent);
          
          // Insert into collection
          await collection.insertOne({
            $vector: embedding,
            content: doc.pageContent,
            metadata: doc.metadata
          });
          
          console.log(`✅ Embedded and stored: ${doc.metadata.type} #${doc.metadata.id}`);
        } catch (error) {
          console.error(`❌ Error processing document:`, doc.metadata, error);
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('✅ Successfully built and stored embeddings!');
    console.log(`📊 Total documents embedded: ${documents.length}`);
    console.log('📝 Document types:');
    console.log(`   - Experiences: ${experiences.length}`);
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Publications: ${publications.length}`);
    console.log(`   - Education: ${educations.length}`);
    console.log(`   - General: 1`);
    
  } catch (error) {
    console.error('❌ Error building embeddings:', error);
    process.exit(1);
  }
}

buildEmbeddings();
