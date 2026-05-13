import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectDir = path.join(process.cwd(), 'public', 'projects', slug);
  let images: string[] = [];

  if (fs.existsSync(projectDir)) {
    images = fs.readdirSync(projectDir)
      .filter(file => /\.(png|jpe?g|webp)$/i.test(file))
      .sort((a, b) => {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
      });
  }

  return (
    <main style={{ background: '#030508', minHeight: '100vh', color: '#ffffff' }}>
      {/* Header */}
      <div style={{ padding: '40px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px', fontFamily: 'Space Grotesk' }}>
            ← BACK TO ARCHIVE
          </Link>
          <h1 style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 300, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            {slug}
          </h1>
          <div style={{ width: '100px' }} /> {/* Spacer */}
        </div>
      </div>

      {/* Images */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        {images.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {images.map((img) => (
              <div key={img} style={{ width: '100%', position: 'relative' }}>
                <img
                  src={`/projects/${slug}/${img}`}
                  alt={`${slug} screenshot`}
                  style={{ width: '100%', height: 'auto', borderRadius: '4px', display: 'block' }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '100px 0' }}>
            No images found in this project directory.
          </div>
        )}
      </div>
    </main>
  );
}
