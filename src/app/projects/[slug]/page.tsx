import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

// Generate static params for optimal server rendering
export async function generateStaticParams() {
  return projects.map((proj) => ({
    slug: proj.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} | Basharat Salam`,
    description: project.desc,
  };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-neutral-800">
      {/* Removed redundant Back to Portfolio nav as global HomeButton handles this */}

      <article className="pt-32 pb-24 px-6 md:px-24 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-20">
          <div className="flex gap-3 flex-wrap mb-8">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-1.5 text-sm uppercase tracking-widest bg-white/5 border border-white/10 rounded-full text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-500 mb-8 leading-tight">
            {project.title}
          </h1>

          <p className="text-xl md:text-3xl font-light text-neutral-400 max-w-3xl leading-relaxed">
            {project.desc}
          </p>
        </header>

        {/* Beautiful Image Placeholder (User will fill out imagePath) */}
        <div className="relative w-full aspect-video bg-neutral-900 rounded-3xl border border-white/10 overflow-hidden mb-20 group flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent opacity-50" />
          
          {project.imagePath ? (
            // Once user adds image path, this renders
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={project.imagePath} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="relative z-10 flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full border border-dashed border-neutral-600 flex items-center justify-center mb-4 text-neutral-500">
                +
              </div>
              <p className="text-neutral-400 font-light">Add your project image inside <code className="text-white bg-white/10 px-2 py-1 rounded">src/data/projects.ts</code></p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Main Case Study */}
          <div className="md:col-span-2">
            <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6">Overview</h2>
            <div className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed space-y-6">
              <p>{project.longDesc}</p>
              
              {/* Note: The user can add more paragraphs or map an array of sections here later! */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-10">
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4">Technologies</h2>
              <ul className="space-y-3">
                {project.tags.map(tag => (
                  <li key={tag} className="text-white font-medium border-b border-white/10 pb-2">{tag}</li>
                ))}
              </ul>
            </div>

            {project.externalLink && (
               <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4">Live Link</h2>
                <a 
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Live Project <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>

      </article>
    </main>
  );
}
