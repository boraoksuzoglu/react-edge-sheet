import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src/content/docs');

// Doc order matching docsNav in nav.ts (changelog handled separately via CHANGELOG.md)
const DOC_ORDER = [
  'getting-started',
  'api',
  'examples',
  'advanced',
  'keyboard',
  'animation',
  'gestures',
];

/**
 * Strip JSX component usages from MDX content (not code fence contents).
 * Removes import statements and PascalCase JSX tags (both single-line and multi-line self-closing).
 * Code fences (```) are never touched — they are the most valuable content.
 */
function stripJsx(content: string): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let inCodeFence = false;
  let inJsxBlock = false;

  for (const line of lines) {
    // Track code fence boundaries
    if (/^```/.test(line)) {
      inCodeFence = !inCodeFence;
      result.push(line);
      continue;
    }

    // Inside a code fence: always keep
    if (inCodeFence) {
      result.push(line);
      continue;
    }

    // Inside a multi-line JSX block: skip until closing />
    if (inJsxBlock) {
      if (/^\s*\/>/.test(line)) {
        inJsxBlock = false;
      }
      // Skip this line entirely (part of the JSX block)
      continue;
    }

    // Import statements
    if (/^import\s+.+from\s+['"]/.test(line)) {
      continue;
    }

    // PascalCase JSX component (starts with <UppercaseLetter)
    if (/^<[A-Z]/.test(line)) {
      if (/\/>$/.test(line.trimEnd())) {
        // Single-line self-closing: skip
        continue;
      } else {
        // Multi-line self-closing block: enter skip mode
        inJsxBlock = true;
        continue;
      }
    }

    result.push(line);
  }

  return result.join('\n');
}

export function buildLlmsFullContent(): string {
  const sections: string[] = [];

  sections.push('# react-edge-sheet — Complete Documentation\n');
  sections.push(
    'Source: https://react-sheet.borao.dev | npm: react-edge-sheet | GitHub: https://github.com/boraoksuzoglu/react-edge-sheet\n'
  );

  for (const slug of DOC_ORDER) {
    const filePath = path.join(contentDir, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(raw);
    const cleaned = stripJsx(content).trim();

    // MDX content already begins with its own H1 heading
    sections.push(`\n---\n\n${cleaned}`);
  }

  // Changelog: read from root CHANGELOG.md (same pattern as [slug]/page.tsx)
  const changelogPath = path.join(process.cwd(), '../CHANGELOG.md');
  const changelog = fs.readFileSync(changelogPath, 'utf8').trim();
  // CHANGELOG.md already starts with # Changelog
  sections.push(`\n---\n\n${changelog}`);

  return sections.join('') + '\n';
}
