const props = [
  { name: 'children', type: 'React.ReactNode', default: '—', description: 'Sheet panel content.' },
  {
    name: 'edge',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
    description: 'Which screen edge the sheet slides from.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description:
      'Horizontal align for top/bottom edges, vertical align for left/right. Use "end" for top-right notifications.',
  },
  {
    name: 'open',
    type: 'boolean',
    default: '—',
    description: 'Controlled open state. Omit for uncontrolled (imperative) mode.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '—',
    description: 'Called when the sheet should change open state (Escape, backdrop click).',
  },
  {
    name: 'onOpen',
    type: '() => void',
    default: '—',
    description: 'Fires after the enter animation fully completes.',
  },
  {
    name: 'onClose',
    type: '() => void',
    default: '—',
    description: 'Fires after the exit animation fully completes.',
  },
  {
    name: 'portal',
    type: 'HTMLElement | null',
    default: 'document.body',
    description: 'Portal target. Pass null to render inline without a portal.',
  },
  {
    name: 'closeOnBackdropClick',
    type: 'boolean',
    default: 'true',
    description: 'Whether clicking the backdrop closes the sheet.',
  },
  {
    name: 'backdrop',
    type: 'boolean',
    default: 'true',
    description: 'When false, no backdrop is rendered (sheet-only modal).',
  },
  {
    name: 'backdropComponent',
    type: '(props: SheetBackdropComponentProps) => ReactNode',
    default: '—',
    description:
      'Custom backdrop component. Receives isExiting, isEntered, close, closeOnBackdropClick.',
  },
  {
    name: 'animateSize',
    type: 'boolean',
    default: 'true',
    description: 'Animate panel size changes via ResizeObserver.',
  },
  {
    name: 'zIndex',
    type: 'number',
    default: '200',
    description: 'CSS z-index of the sheet container.',
  },
  {
    name: 'maxSize',
    type: 'string',
    default: '—',
    description:
      'Shorthand: max-height for top/bottom, max-width for left/right. Optional — no default when omitted.',
  },
  {
    name: 'maxHeight',
    type: 'string',
    default: '—',
    description:
      'Explicit max-height of the panel. Optional — no default when omitted. Overrides maxSize for height.',
  },
  {
    name: 'maxWidth',
    type: 'string',
    default: '—',
    description:
      'Explicit max-width of the panel. Optional — no default when omitted. Overrides maxSize for width.',
  },
  {
    name: 'minSize',
    type: 'string',
    default: '—',
    description: 'Shorthand: min-height for top/bottom, min-width for left/right.',
  },
  {
    name: 'minHeight',
    type: 'string',
    default: '—',
    description: 'Explicit min-height of the panel.',
  },
  {
    name: 'minWidth',
    type: 'string',
    default: '—',
    description: 'Explicit min-width of the panel.',
  },
  {
    name: 'transition',
    type: 'string',
    default: '—',
    description: 'Override panel slide transition (e.g. "transform 0.3s ease").',
  },
  {
    name: 'sizeTransition',
    type: 'string',
    default: '—',
    description: 'Override size-change transition when animateSize is true.',
  },
  {
    name: 'backdropTransition',
    type: 'string',
    default: '—',
    description: 'Override backdrop opacity transition (default backdrop only).',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    default: '—',
    description: 'Inline styles applied to the sheet panel element.',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'CSS class applied to the sheet panel element.',
  },
  {
    name: 'contentClassName',
    type: 'string',
    default: '—',
    description: 'CSS class applied to the inner content wrapper (the div that wraps children).',
  },
  {
    name: 'contentStyle',
    type: 'React.CSSProperties',
    default: '—',
    description: 'Inline styles for the inner content wrapper.',
  },
  {
    name: 'backdropStyle',
    type: 'React.CSSProperties',
    default: '—',
    description: 'Inline styles merged onto the default backdrop element.',
  },
  {
    name: 'backdropClassName',
    type: 'string',
    default: '—',
    description: 'CSS class applied to the default backdrop element.',
  },
  {
    name: 'animationPreset',
    type: "'default' | 'spring' | 'bounce' | 'snappy' | 'slow'",
    default: "'default'",
    description:
      'Named animation preset for the slide transition. Overridden by transition/enterTransition/exitTransition.',
  },
  {
    name: 'enterTransition',
    type: 'string',
    default: '—',
    description: 'Override transition for enter animation only (e.g. "transform 0.1s ease").',
  },
  {
    name: 'exitTransition',
    type: 'string',
    default: '—',
    description: 'Override transition for exit animation only (e.g. "transform 0.6s ease").',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: '—',
    description: 'ARIA label for the dialog element.',
  },
  {
    name: 'aria-labelledby',
    type: 'string',
    default: '—',
    description: 'ID of element that labels the dialog.',
  },
  {
    name: 'aria-describedby',
    type: 'string',
    default: '—',
    description: 'ID of element that describes the dialog.',
  },
  {
    name: 'draggable',
    type: 'boolean',
    default: 'false',
    description: 'Enable drag-to-dismiss gesture. Automatically true when showDragHandle is true.',
  },
  {
    name: 'showDragHandle',
    type: 'boolean',
    default: 'false',
    description: 'Show a drag handle pill. Also enables draggable unless explicitly set to false.',
  },
  {
    name: 'dragHandleStyle',
    type: 'React.CSSProperties',
    default: '—',
    description:
      'Inline styles for the default drag handle pill. Ignored when dragHandleComponent is set.',
  },
  {
    name: 'dragHandleClassName',
    type: 'string',
    default: '—',
    description:
      'CSS class for the default drag handle pill. Ignored when dragHandleComponent is set.',
  },
  {
    name: 'dragHandleComponent',
    type: 'React.ReactNode',
    default: '—',
    description: 'Replace the default drag handle pill with a custom element.',
  },
  {
    name: 'dragThreshold',
    type: 'number',
    default: '80',
    description: 'Pixels to drag before dismissing on release.',
  },
  {
    name: 'dragVelocityThreshold',
    type: 'number',
    default: '0.3',
    description: 'Velocity (px/ms) above which release triggers dismiss.',
  },
  {
    name: 'snapPoints',
    type: 'string[]',
    default: '—',
    description: "Snap points array in ascending order, e.g. ['200px','50vh','90vh'].",
  },
  {
    name: 'defaultSnapPoint',
    type: 'number',
    default: 'last',
    description: 'Initial snap index. Defaults to the last (largest) snap point.',
  },
  {
    name: 'onSnapChange',
    type: '(index: number) => void',
    default: '—',
    description: 'Called when the active snap point changes.',
  },
  {
    name: 'scrollLockPadding',
    type: 'boolean | string',
    default: 'true',
    description:
      'Body padding during scroll lock. true = scrollbar width, false = none, string = custom (e.g. "0", "1rem").',
  },
];

export function PropsTable() {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-[color-mix(in_oklch,var(--glass-border)_40%,transparent)]">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="text-left px-4 py-3 font-semibold text-[var(--foreground)] bg-[color-mix(in_oklch,var(--glass-surface)_80%,transparent)] border-b border-[color-mix(in_oklch,var(--glass-border)_40%,transparent)]">
              Prop
            </th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--foreground)] bg-[color-mix(in_oklch,var(--glass-surface)_80%,transparent)] border-b border-[color-mix(in_oklch,var(--glass-border)_40%,transparent)]">
              Type
            </th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--foreground)] bg-[color-mix(in_oklch,var(--glass-surface)_80%,transparent)] border-b border-[color-mix(in_oklch,var(--glass-border)_40%,transparent)]">
              Default
            </th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--foreground)] bg-[color-mix(in_oklch,var(--glass-surface)_80%,transparent)] border-b border-[color-mix(in_oklch,var(--glass-border)_40%,transparent)]">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={
                i % 2 === 0 ? '' : 'bg-[color-mix(in_oklch,var(--glass-surface)_30%,transparent)]'
              }
            >
              <td className="px-4 py-3 font-mono text-[var(--color-brand)] border-b border-[color-mix(in_oklch,var(--glass-border)_20%,transparent)]">
                {prop.name}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-[var(--color-atmos-indigo)] border-b border-[color-mix(in_oklch,var(--glass-border)_20%,transparent)] max-w-[200px]">
                {prop.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-[var(--foreground-muted)] border-b border-[color-mix(in_oklch,var(--glass-border)_20%,transparent)]">
                {prop.default}
              </td>
              <td className="px-4 py-3 text-[var(--foreground-muted)] border-b border-[color-mix(in_oklch,var(--glass-border)_20%,transparent)]">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
