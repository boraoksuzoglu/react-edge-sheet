import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'React Edge Sheet',
    template: '%s | React Edge Sheet',
  },
  description:
    'A lightweight React component library for sliding panels from any screen edge — top, bottom, left, or right.',
  keywords: ['react', 'sheet', 'drawer', 'bottom sheet', 'slide panel', 'typescript'],
  openGraph: {
    title: 'React Edge Sheet',
    description: 'Slide in from any edge. Zero dependencies. TypeScript-first.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  const ac = new AbortController();
  navigator.modelContext.registerTool({
    name: 'navigate_docs',
    description: 'Navigate to a documentation page for react-edge-sheet',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Doc page slug: getting-started, api, examples, advanced, keyboard, animation, gestures, changelog',
          enum: ['getting-started','api','examples','advanced','keyboard','animation','gestures','changelog']
        }
      },
      required: ['slug']
    },
    execute: function(input) {
      window.location.href = '/docs/' + input.slug;
      return { success: true, url: '/docs/' + input.slug };
    },
    signal: ac.signal
  });
  navigator.modelContext.registerTool({
    name: 'open_playground',
    description: 'Open the interactive playground to configure and preview react-edge-sheet',
    inputSchema: { type: 'object', properties: {} },
    execute: function() {
      window.location.href = '/playground';
      return { success: true, url: '/playground' };
    },
    signal: ac.signal
  });
  navigator.modelContext.registerTool({
    name: 'get_llms_txt',
    description: 'Fetch the llms.txt index for react-edge-sheet documentation',
    inputSchema: { type: 'object', properties: {} },
    execute: async function() {
      const res = await fetch('/llms.txt');
      const text = await res.text();
      return { content: text };
    },
    signal: ac.signal
  });
})();
            `,
          }}
        />
      </body>
    </html>
  );
}
