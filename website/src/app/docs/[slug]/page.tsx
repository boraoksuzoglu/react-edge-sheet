import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import type { Metadata } from 'next';
import { getDocBySlug, getDocSlugs } from '@/lib/mdx';
import { PropsTable } from '@/components/docs/PropsTable';
import { DocDemo } from '@/components/docs/DocDemo';
import { AnimationPresetDemo, AsymmetricTransitionDemo } from '@/components/docs/AnimationDemo';
import {
  DragToDismissDemo,
  SnapPointsDemo,
  SidebarDragDemo,
  MusicPlayerDemo,
} from '@/components/docs/GestureDemo';
import { FocusTrapDemo, AriaDemo } from '@/components/docs/KeyboardDemo';

const prettyCodeOptions = {
  theme: { dark: 'github-dark-dimmed', light: 'github-light' },
  keepBackground: false,
};

const mdxComponents = {
  PropsTable,
  DocDemo,
  AnimationPresetDemo,
  AsymmetricTransitionDemo,
  DragToDismissDemo,
  SnapPointsDemo,
  SidebarDragDemo,
  MusicPlayerDemo,
  FocusTrapDemo,
  AriaDemo,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [...getDocSlugs(), 'changelog'].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'changelog') {
    return { title: 'Changelog', description: 'Release history for react-edge-sheet.' };
  }
  try {
    const { meta } = getDocBySlug(slug);
    return { title: meta.title, description: meta.description };
  } catch {
    return {};
  }
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  // Changelog page: read root CHANGELOG.md directly so it stays in sync with the repo
  if (slug === 'changelog') {
    const changelogPath = path.join(process.cwd(), '../CHANGELOG.md');
    const content = fs.readFileSync(changelogPath, 'utf8');
    return (
      <article className="mdx-prose max-w-3xl">
        <MDXRemote
          source={content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
        />
      </article>
    );
  }

  let doc: { meta: { title: string; description: string }; content: string };

  try {
    doc = getDocBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article className="mdx-prose max-w-3xl">
      <MDXRemote
        source={doc.content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </article>
  );
}
