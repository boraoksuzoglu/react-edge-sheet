import type { PlaygroundConfig } from './types';

// ─── Code Generation ──────────────────────────────────────────────────────────

export function generateCode(config: PlaygroundConfig): string {
  const props: string[] = [];
  if (config.edge !== 'bottom') props.push(`edge="${config.edge}"`);
  if (config.align !== 'center') props.push(`align="${config.align}"`);
  if (config.animationPreset !== 'default')
    props.push(`animationPreset="${config.animationPreset}"`);
  if (config.maxSize && config.maxSize !== '80%') props.push(`maxSize="${config.maxSize}"`);
  if (config.minSize) props.push(`minSize="${config.minSize}"`);
  if (config.maxWidth) props.push(`maxWidth="${config.maxWidth}"`);
  if (config.maxHeight) props.push(`maxHeight="${config.maxHeight}"`);
  if (config.minWidth) props.push(`minWidth="${config.minWidth}"`);
  if (config.minHeight) props.push(`minHeight="${config.minHeight}"`);
  if (!config.backdrop) props.push(`backdrop={false}`);
  if (!config.closeOnBackdropClick) props.push(`closeOnBackdropClick={false}`);
  if (!config.animateSize) props.push(`animateSize={false}`);
  if (config.draggable) props.push(`draggable`);
  if (config.showDragHandle) props.push(`showDragHandle`);
  const isDraggable = config.draggable || config.showDragHandle;
  if (isDraggable && config.dragThreshold !== 80)
    props.push(`dragThreshold={${config.dragThreshold}}`);
  if (isDraggable && config.dragVelocityThreshold !== 0.3)
    props.push(`dragVelocityThreshold={${config.dragVelocityThreshold}}`);
  if (config.snapPoints.length > 0) {
    props.push(`snapPoints={[${config.snapPoints.map((s) => `'${s}'`).join(', ')}]}`);
  }
  if (config.zIndex !== 200) props.push(`zIndex={${config.zIndex}}`);
  const styleEntries: string[] = [];
  if (config.customStyle.background)
    styleEntries.push(`background: '${config.customStyle.background}'`);
  if (config.customStyle.color) styleEntries.push(`color: '${config.customStyle.color}'`);
  if (config.customStyle.borderRadius)
    styleEntries.push(`borderRadius: '${config.customStyle.borderRadius}'`);
  if (config.customStyle.border) styleEntries.push(`border: '${config.customStyle.border}'`);
  if (config.customStyle.padding) styleEntries.push(`padding: '${config.customStyle.padding}'`);
  if (config.customStyle.margin) styleEntries.push(`margin: '${config.customStyle.margin}'`);
  if (styleEntries.length > 0) props.push(`style={{ ${styleEntries.join(', ')} }}`);

  // Build the <Sheet ...> opening tag with tab indentation
  const T = '\t';
  let sheetOpen: string;
  if (props.length === 0) {
    sheetOpen = `${T}${T}${T}<Sheet ref={sheetRef}>`;
  } else {
    const propsBlock = props.map((p) => `${T}${T}${T}${T}${p}`).join('\n');
    sheetOpen = `${T}${T}${T}<Sheet\n${T}${T}${T}${T}ref={sheetRef}\n${propsBlock}\n${T}${T}${T}>`;
  }

  return `import { useRef } from 'react';
import { Sheet, SheetRef } from 'react-edge-sheet';

function App() {
${T}const sheetRef = useRef<SheetRef>(null);

${T}return (
${T}${T}<>
${T}${T}${T}<button onClick={() => sheetRef.current?.open()}>
${T}${T}${T}${T}Open Sheet
${T}${T}${T}</button>

${sheetOpen}
${T}${T}${T}${T}<div style={{ padding: '1.5rem' }}>
${T}${T}${T}${T}${T}<h2>Sheet Title</h2>
${T}${T}${T}${T}${T}<p>Sheet content goes here.</p>
${T}${T}${T}${T}${T}<button onClick={() => sheetRef.current?.close()}>
${T}${T}${T}${T}${T}${T}Close
${T}${T}${T}${T}${T}</button>
${T}${T}${T}${T}</div>
${T}${T}${T}</Sheet>
${T}${T}</>
${T});
}`;
}

// ─── Syntax Highlighting ──────────────────────────────────────────────────────

export function highlight(line: string): string {
  const keywords = [
    'import',
    'from',
    'function',
    'return',
    'const',
    'let',
    'var',
    'export',
    'default',
  ];
  const kwColor = 'var(--color-atmos-purple)';
  const strColor = 'oklch(73% 0.16 55)'; // amber
  const tagColor = 'oklch(65% 0.20 255)'; // blue — JSX component names
  const propColor = 'oklch(68% 0.15 200)'; // teal — prop names
  const punctColor = 'oklch(50% 0.05 260)'; // dim — < > { }

  const slots: string[] = [];
  const MARK = '\uFFFE'; // non-character sentinel (avoids ESLint \x00 warning)
  function protect(html: string): string {
    const i = slots.length;
    slots.push(html);
    return `${MARK}${i}${MARK}`;
  }

  let out = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Strings (single-quoted)
  out = out.replace(/'[^']*'/g, (m) => protect(`<span style="color:${strColor}">${m}</span>`));
  // Keywords
  out = out.replace(new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'), (m) =>
    protect(`<span style="color:${kwColor};font-weight:600">${m}</span>`)
  );
  // JSX closing tags  </Component  or  </div
  out = out.replace(/&lt;\/([A-Za-z][A-Za-z0-9]*)/g, (_, tag) => {
    const name = /^[A-Z]/.test(tag)
      ? `<span style="color:${tagColor}">${tag}</span>`
      : `<span style="color:${punctColor}">${tag}</span>`;
    return protect(`<span style="color:${punctColor}">&lt;/</span>${name}`);
  });
  // JSX opening tags  <Component  or  <div
  out = out.replace(/&lt;([A-Za-z][A-Za-z0-9]*)/g, (_, tag) => {
    const name = /^[A-Z]/.test(tag)
      ? `<span style="color:${tagColor}">${tag}</span>`
      : `<span style="color:${punctColor}">${tag}</span>`;
    return protect(`<span style="color:${punctColor}">&lt;</span>${name}`);
  });
  // JSX self-close  />
  out = out.replace(/\/&gt;/g, () => protect(`<span style="color:${punctColor}">/&gt;</span>`));
  // Closing >
  out = out.replace(/(?<!=)&gt;/g, () => protect(`<span style="color:${punctColor}">&gt;</span>`));
  // Curly braces and arrows
  out = out.replace(/([{}()=>;])/g, (m) =>
    protect(`<span style="color:${punctColor}">${m}</span>`)
  );
  // JSX prop names  propName=
  out = out.replace(/\b([a-z][A-Za-z0-9]*)(?=<\/|=)/g, (_, p) =>
    protect(`<span style="color:${propColor}">${p}</span>`)
  );

  // Restore sentinels
  const sentinelRe = new RegExp(`${MARK}(\\d+)${MARK}`, 'g');
  out = out.replace(sentinelRe, (_, i) => slots[parseInt(i, 10)]);
  return out;
}
