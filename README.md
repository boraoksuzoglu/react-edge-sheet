# react-edge-sheet

[![npm](https://img.shields.io/npm/v/react-edge-sheet)](https://www.npmjs.com/package/react-edge-sheet)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-edge-sheet)](https://bundlephobia.com/package/react-edge-sheet)
[![license](https://img.shields.io/npm/l/react-edge-sheet)](./LICENSE)

A lightweight, zero-dependency React component for sliding panels from any screen edge — bottom sheets, drawers, side panels, and more.

**~4 kB gzipped. No framer-motion, no emotion, no lodash. Just React.**

## Features

- Slides from any edge: `top`, `bottom`, `left`, `right`
- Drag-to-dismiss and snap points
- Focus trap + keyboard navigation (Escape closes, Tab cycles within)
- Animation presets + asymmetric enter/exit transitions
- Controlled (`open` prop) and imperative (`ref`) APIs
- Customizable backdrop, drag handle, and portal target
- TypeScript-first — full types for props, refs, and variants

## Installation

```bash
npm install react-edge-sheet
```

## Quick Start

```tsx
import { useRef } from 'react';
import { Sheet, SheetRef } from 'react-edge-sheet';

export function Example() {
  const ref = useRef<SheetRef>(null);

  return (
    <>
      <button onClick={() => ref.current?.open()}>Open Sheet</button>

      <Sheet ref={ref} edge="bottom">
        <div style={{ padding: '2rem' }}>
          <p>Content here</p>
          <button onClick={() => ref.current?.close()}>Close</button>
        </div>
      </Sheet>
    </>
  );
}
```

## Drag to Dismiss

```tsx
<Sheet ref={ref} edge="bottom" showDragHandle>
  <div style={{ padding: '2.5rem 2rem 2rem' }}>
    <p>Drag the handle or swipe down to close</p>
  </div>
</Sheet>
```

## Snap Points

```tsx
<Sheet
  ref={ref}
  edge="bottom"
  showDragHandle
  snapPoints={['25vh', '50vh', '90vh']}
  defaultSnapPoint={1}
  onSnapChange={(index) => console.log('snapped to', index)}
>
  <div style={{ padding: '2rem' }}>
    <p>Drag to snap between heights</p>
  </div>
</Sheet>
```

## Animation Presets

```tsx
// animationPreset: 'default' | 'spring' | 'bounce' | 'snappy' | 'slow'
<Sheet ref={ref} edge="bottom" animationPreset="spring">
  ...
</Sheet>

// Asymmetric enter/exit:
<Sheet
  ref={ref}
  edge="bottom"
  enterTransition="transform 0.15s ease"
  exitTransition="transform 0.5s ease"
>
  ...
</Sheet>
```

## Controlled API

```tsx
const [open, setOpen] = useState(false);

<Sheet edge="right" open={open} onOpenChange={setOpen}>
  ...
</Sheet>;
```

## Imperative API

```tsx
const ref = useRef<SheetRef>(null);

ref.current?.open();
ref.current?.close();
ref.current?.toggle();
ref.current?.isOpen; // boolean
```

## Usage with Next.js

`Sheet` accesses `document` and uses `createPortal`, so it must run on the client. Wrap it in a dynamic import:

```tsx
// MyDrawer.tsx — your component that uses Sheet
import { useRef } from 'react';
import { Sheet, SheetRef } from 'react-edge-sheet';

export default function MyDrawer() {
  const ref = useRef<SheetRef>(null);
  // ...
}

// page.tsx
import dynamic from 'next/dynamic';

const MyDrawer = dynamic(() => import('./MyDrawer'), { ssr: false });
```

## Key Props

| Prop                   | Type                                     | Default           | Description                                       |
| ---------------------- | ---------------------------------------- | ----------------- | ------------------------------------------------- |
| `edge`                 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'`        | Which edge the sheet slides from                  |
| `open`                 | `boolean`                                | —                 | Controlled open state                             |
| `onOpenChange`         | `(open: boolean) => void`                | —                 | Called when open state should change              |
| `draggable`            | `boolean`                                | `false`           | Enable drag-to-dismiss                            |
| `showDragHandle`       | `boolean`                                | `false`           | Show drag handle pill (also enables draggable)    |
| `snapPoints`           | `string[]`                               | —                 | Snap heights/widths e.g. `['25vh','50vh','90vh']` |
| `defaultSnapPoint`     | `number`                                 | last index        | Initial snap point index                          |
| `animationPreset`      | `AnimationPreset`                        | `'default'`       | Built-in transition curve                         |
| `maxSize`              | `string`                                 | `'90vh'`/`'90vw'` | Max panel size                                    |
| `animateSize`          | `boolean`                                | `true`            | Animate content height/width changes              |
| `backdrop`             | `boolean`                                | `true`            | Show/hide backdrop                                |
| `closeOnBackdropClick` | `boolean`                                | `true`            | Close when backdrop is clicked                    |
| `portal`               | `HTMLElement \| null`                    | `document.body`   | Portal target (`null` = inline)                   |
| `aria-label`           | `string`                                 | —                 | Accessible label for the dialog                   |

Full API reference and live demos: **https://react-sheet.borao.dev**

## LLM-Friendly Docs

Machine-readable documentation for AI assistants and code search tools:

- **[llms.txt](https://react-sheet.borao.dev/llms.txt)** — Lightweight index with links to all doc sections
- **[llms-full.txt](https://react-sheet.borao.dev/llms-full.txt)** — Complete documentation in a single plain-text file

## License

MIT © [Bora Öksüzoglu](https://github.com/boraoksuzoglu)
