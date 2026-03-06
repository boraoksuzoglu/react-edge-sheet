import { codeToHtml } from 'shiki';
import { CodeShowcaseClient } from './CodeShowcase';

const snippets = [
  {
    label: 'Bottom Sheet',
    code: `import { useRef } from 'react';
import { Sheet, SheetRef } from 'react-edge-sheet';

export function BottomSheetExample() {
  const ref = useRef<SheetRef>(null);

  return (
    <>
      <button onClick={() => ref.current?.open()}>
        Open Bottom Sheet
      </button>

      <Sheet ref={ref} edge="bottom">
        <div style={{ padding: '2rem' }}>
          <h2>Bottom Sheet</h2>
          <p>Slides up from the bottom.</p>
          <button onClick={() => ref.current?.close()}>
            Close
          </button>
        </div>
      </Sheet>
    </>
  );
}`,
  },
  {
    label: 'Right Drawer',
    code: `import { useRef } from 'react';
import { Sheet, SheetRef } from 'react-edge-sheet';

export function RightDrawer() {
  const ref = useRef<SheetRef>(null);

  return (
    <>
      <button onClick={() => ref.current?.open()}>
        Open Drawer
      </button>

      <Sheet
        ref={ref}
        edge="right"
        style={{ width: '320px', padding: '1.5rem' }}
        backdropStyle={{ backdropFilter: 'blur(4px)' }}
      >
        <h2>Navigation</h2>
        <nav>
          <a href="/docs">Docs</a>
          <a href="/api">API</a>
          <a href="/examples">Examples</a>
        </nav>
      </Sheet>
    </>
  );
}`,
  },
  {
    label: 'Glass Style',
    code: `import { useRef } from 'react';
import { Sheet, SheetRef } from 'react-edge-sheet';

export function GlassSheet() {
  const ref = useRef<SheetRef>(null);

  return (
    <>
      <button onClick={() => ref.current?.open()}>
        Open Glass Sheet
      </button>

      <Sheet
        ref={ref}
        edge="bottom"
        backdropStyle={{
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(to top, rgba(107,107,191,0.15) 0%, transparent 60%)',
        }}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 100%)',
          border: '1px solid rgba(255,255,255,0.5)',
          borderTop: '1px solid rgba(255,255,255,0.85)',
          borderRadius: '1.5rem 1.5rem 0 0',
          padding: '1.5rem',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.5)', borderRadius: 9999, margin: '0 auto 1.5rem' }} />
        <h2 style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>Glass Sheet</h2>
        <p style={{ marginBottom: '1.5rem', opacity: 0.75 }}>
          Glassmorphism style with blurred backdrop.
        </p>
        <button onClick={() => ref.current?.close()}>
          Close
        </button>
      </Sheet>
    </>
  );
}`,
  },
  {
    label: 'Controlled Mode',
    code: `import { useState } from 'react';
import { Sheet } from 'react-edge-sheet';

export function ControlledSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open Sheet
      </button>

      <Sheet
        open={open}
        onOpenChange={setOpen}
        edge="bottom"
      >
        <div style={{ padding: '2rem' }}>
          <h2>Controlled Sheet</h2>
          <p>State managed by your component.</p>
          <button onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      </Sheet>
    </>
  );
}`,
  },
];

async function renderCode(code: string, theme: 'github-light' | 'github-dark-dimmed') {
  return codeToHtml(code, {
    lang: 'tsx',
    theme,
  });
}

export async function CodeShowcaseServer() {
  const tabs = await Promise.all(
    snippets.map(async (s) => ({
      label: s.label,
      code: s.code,
      lightHtml: await renderCode(s.code, 'github-light'),
      darkHtml: await renderCode(s.code, 'github-dark-dimmed'),
    }))
  );

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3">
            Simple, flexible API
          </h2>
          <p className="text-[var(--foreground-muted)]">
            Imperative refs or controlled state — whichever you prefer.
          </p>
        </div>
        <CodeShowcaseClient tabs={tabs} />
      </div>
    </section>
  );
}
