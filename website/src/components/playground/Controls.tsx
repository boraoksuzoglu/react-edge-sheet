'use client';

import type { ReactNode } from 'react';
import type { SheetEdge, AnimationPreset } from 'react-edge-sheet';
import { C, LABEL_STYLE, TEXT_INPUT } from './theme';
import type { CustomStyle, PlaygroundConfig, Preset } from './types';

// ─── ControlSection ───────────────────────────────────────────────────────────

export function ControlSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={LABEL_STYLE}>{title}</div>
      {children}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function Divider() {
  return (
    <div
      style={{
        height: '1px',
        background: C.borderFaint,
        margin: '0.25rem -1rem 1rem',
      }}
    />
  );
}

// ─── EdgeButton ───────────────────────────────────────────────────────────────

export function EdgeButton({
  edge,
  active,
  onClick,
}: {
  edge: SheetEdge;
  active: boolean;
  onClick: () => void;
}) {
  const arrows: Record<SheetEdge, string> = { top: '↑', bottom: '↓', left: '←', right: '→' };
  return (
    <button
      onClick={onClick}
      title={edge.charAt(0).toUpperCase() + edge.slice(1)}
      style={{
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: '0.375rem',
        border: `1px solid ${active ? 'var(--color-brand)' : C.border}`,
        background: active
          ? 'color-mix(in oklch, var(--color-brand) 16%, var(--glass-overlay))'
          : C.bgInput,
        color: active ? 'var(--color-brand)' : C.textDim,
        fontSize: '0.9rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.12s',
        boxShadow: active
          ? '0 0 10px color-mix(in oklch, var(--color-brand) 30%, transparent)'
          : 'none',
        flexShrink: 0,
      }}
    >
      {arrows[edge]}
    </button>
  );
}

// ─── AlignButton ──────────────────────────────────────────────────────────────

export function AlignButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '0.28rem 0',
        borderRadius: '0.375rem',
        border: `1px solid ${active ? 'var(--color-brand)' : C.border}`,
        background: active
          ? 'color-mix(in oklch, var(--color-brand) 13%, var(--glass-overlay))'
          : C.bgInput,
        color: active ? 'var(--color-brand)' : C.textDim,
        fontSize: '0.7rem',
        cursor: 'pointer',
        transition: 'all 0.12s',
      }}
    >
      {label}
    </button>
  );
}

// ─── PresetPill ───────────────────────────────────────────────────────────────

export function PresetPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.2rem 0.65rem',
        borderRadius: '999px',
        border: `1px solid ${active ? 'transparent' : C.border}`,
        background: active
          ? 'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))'
          : C.bgInput,
        color: active ? 'white' : C.textDim,
        fontSize: '0.7rem',
        cursor: 'pointer',
        transition: 'all 0.12s',
        whiteSpace: 'nowrap',
        boxShadow: active ? '0 0 10px oklch(62% 0.22 275 / 22%)' : 'none',
      }}
    >
      {label}
    </button>
  );
}

// ─── ToggleRow ────────────────────────────────────────────────────────────────

export function ToggleRow({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        marginBottom: '0.4rem',
        gap: '0.5rem',
        minWidth: 0,
      }}
    >
      <span style={{ fontSize: '0.75rem', color: C.textMuted, minWidth: 0 }}>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{
          accentColor: 'var(--color-brand)',
          width: '0.875rem',
          height: '0.875rem',
          flexShrink: 0,
        }}
      />
    </label>
  );
}

// ─── NumberRow ────────────────────────────────────────────────────────────────

export function NumberRow({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.4rem',
        gap: '0.5rem',
        opacity: disabled ? 0.38 : 1,
      }}
    >
      <span style={{ fontSize: '0.75rem', color: C.textMuted, minWidth: 0, flexShrink: 1 }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          min={min}
          max={max}
          step={step ?? 1}
          disabled={disabled}
          style={{
            width: '5.5rem',
            padding: '0.28rem 0.4rem',
            borderRadius: '0.375rem',
            border: `1px solid ${C.border}`,
            background: C.bgInput,
            color: C.text,
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            outline: 'none',
            textAlign: 'right',
          }}
        />
        {unit && (
          <span style={{ fontSize: '0.63rem', color: C.textDimmer, whiteSpace: 'nowrap' }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── SizePresetChips ──────────────────────────────────────────────────────────

export function SizePresetChips({
  presets,
  onSelect,
}: {
  presets: string[];
  onSelect: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.3rem' }}>
      {presets.map((p) => (
        <button
          key={p}
          onClick={() => onSelect(p)}
          style={{
            padding: '0.1rem 0.4rem',
            borderRadius: '0.25rem',
            border: `1px solid ${C.border}`,
            background: C.bgInput,
            color: C.textDim,
            fontSize: '0.66rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

// ─── SnapChip ─────────────────────────────────────────────────────────────────

export function SnapChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.2rem',
        padding: '0.12rem 0.4rem',
        borderRadius: '0.25rem',
        background: 'color-mix(in oklch, var(--color-brand) 10%, var(--glass-overlay))',
        border: '1px solid color-mix(in oklch, var(--color-brand) 28%, transparent)',
        color: 'var(--color-brand)',
        fontSize: '0.7rem',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {label}
      <button
        onClick={onRemove}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          padding: 0,
          lineHeight: 1,
          fontSize: '0.95rem',
          opacity: 0.7,
        }}
      >
        ×
      </button>
    </span>
  );
}

// ─── SizeField ────────────────────────────────────────────────────────────────
// Reusable labeled text input + preset chips for size props.

export function SizeField({
  label,
  value,
  onChange,
  placeholder,
  presets,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  presets: string[];
}) {
  return (
    <div>
      <div style={{ fontSize: '0.65rem', color: C.textDim, marginBottom: '0.25rem' }}>{label}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={TEXT_INPUT}
      />
      <SizePresetChips presets={presets} onSelect={onChange} />
    </div>
  );
}

// ─── PresetBar ────────────────────────────────────────────────────────────────

export function PresetBar({
  presets,
  activePreset,
  onSelect,
}: {
  presets: Preset[];
  activePreset: string | null;
  onSelect: (preset: Preset) => void;
}) {
  return (
    <div
      style={{
        padding: '0.6rem 0.875rem',
        borderBottom: `1px solid ${C.borderFaint}`,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
      }}
    >
      <div style={LABEL_STYLE}>Presets</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
        {presets.map((preset) => {
          const isActive = activePreset === preset.name;
          return (
            <button
              key={preset.name}
              onClick={() => onSelect(preset)}
              title={preset.description}
              style={{
                flexShrink: 0,
                padding: '0.3rem 0.7rem',
                borderRadius: '0.375rem',
                border: `1px solid ${isActive ? 'var(--color-brand)' : C.border}`,
                background: isActive
                  ? 'color-mix(in oklch, var(--color-brand) 14%, var(--glass-overlay))'
                  : C.bgInput,
                color: isActive ? 'var(--color-brand)' : C.textMuted,
                fontSize: '0.72rem',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.12s',
                whiteSpace: 'nowrap',
                boxShadow: isActive
                  ? '0 0 10px color-mix(in oklch, var(--color-brand) 22%, transparent)'
                  : 'none',
              }}
            >
              {preset.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── StyleField ───────────────────────────────────────────────────────────────

const STYLE_FIELDS: { key: keyof CustomStyle; label: string; placeholder: string }[] = [
  { key: 'background', label: 'Background', placeholder: 'oklch(13% 0.01 260)' },
  { key: 'color', label: 'Text color', placeholder: 'oklch(88% 0.04 260)' },
  { key: 'borderRadius', label: 'Border radius', placeholder: '0.75rem' },
  { key: 'border', label: 'Border', placeholder: '1px solid #333' },
  { key: 'padding', label: 'Padding', placeholder: '1.5rem' },
  { key: 'margin', label: 'Margin', placeholder: '1rem' },
];

export function StyleSection({
  customStyle,
  onChange,
}: {
  customStyle: CustomStyle;
  onChange: (key: keyof CustomStyle, value: string) => void;
}) {
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem 0.875rem',
          marginBottom: '0.5rem',
        }}
      >
        {STYLE_FIELDS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <div style={{ fontSize: '0.65rem', color: C.textDim, marginBottom: '0.25rem' }}>
              {label}
            </div>
            <input
              type="text"
              value={customStyle[key]}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              style={TEXT_INPUT}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '0.25rem', fontSize: '0.62rem', color: C.textDimmer }}>
        Applied to the Sheet panel element
      </div>
    </>
  );
}

// ─── ControlsPanel ────────────────────────────────────────────────────────────
// The full left-panel scrollable controls section.

export function ControlsPanel({
  config,
  update,
  updateStyle,
  snapInput,
  setSnapInput,
  addSnapPoint,
  removeSnapPoint,
}: {
  config: PlaygroundConfig;
  update: <K extends keyof PlaygroundConfig>(key: K, value: PlaygroundConfig[K]) => void;
  updateStyle: (key: keyof CustomStyle, value: string) => void;
  snapInput: string;
  setSnapInput: (v: string) => void;
  addSnapPoint: () => void;
  removeSnapPoint: (sp: string) => void;
}) {
  const isHorizontal = config.edge === 'top' || config.edge === 'bottom';
  const isDraggable = config.draggable || config.showDragHandle;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
      {/* ── Position ── */}
      <ControlSection title="Position">
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          {/* Edge cross grid */}
          <div>
            <div style={{ ...LABEL_STYLE, marginBottom: '0.35rem' }}>Edge</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 2.25rem)',
                gridTemplateRows: 'repeat(3, 2.25rem)',
                gap: '0.25rem',
              }}
            >
              <span />
              <EdgeButton
                edge="top"
                active={config.edge === 'top'}
                onClick={() => update('edge', 'top')}
              />
              <span />
              <EdgeButton
                edge="left"
                active={config.edge === 'left'}
                onClick={() => update('edge', 'left')}
              />
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '0.375rem',
                  background: C.bgInput,
                  border: `1px solid ${C.borderSubtle}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '0.3rem',
                    height: '0.3rem',
                    borderRadius: '999px',
                    background: C.textDimmer,
                  }}
                />
              </div>
              <EdgeButton
                edge="right"
                active={config.edge === 'right'}
                onClick={() => update('edge', 'right')}
              />
              <span />
              <EdgeButton
                edge="bottom"
                active={config.edge === 'bottom'}
                onClick={() => update('edge', 'bottom')}
              />
              <span />
            </div>
          </div>

          {/* Align + Animation stacked on right */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ ...LABEL_STYLE, marginBottom: '0.35rem' }}>
              {isHorizontal ? 'Horizontal align' : 'Vertical align'}
            </div>
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.9rem' }}>
              <AlignButton
                label="Start"
                active={config.align === 'start'}
                onClick={() => update('align', 'start')}
              />
              <AlignButton
                label="Center"
                active={config.align === 'center'}
                onClick={() => update('align', 'center')}
              />
              <AlignButton
                label="End"
                active={config.align === 'end'}
                onClick={() => update('align', 'end')}
              />
            </div>

            <div style={{ ...LABEL_STYLE, marginBottom: '0.35rem' }}>Animation</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {(['default', 'spring', 'bounce', 'snappy', 'slow'] as AnimationPreset[]).map((p) => (
                <PresetPill
                  key={p}
                  label={p}
                  active={config.animationPreset === p}
                  onClick={() => update('animationPreset', p)}
                />
              ))}
            </div>
          </div>
        </div>
      </ControlSection>

      <Divider />

      {/* ── Size ── */}
      <ControlSection title="Size">
        <div style={{ ...LABEL_STYLE, marginBottom: '0.3rem' }}>
          Shorthand{' '}
          <span
            style={{
              fontWeight: 400,
              textTransform: 'none',
              letterSpacing: 0,
              color: C.textDimmer,
            }}
          >
            — height for top/bottom · width for left/right
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0 0.875rem',
            marginBottom: '0.75rem',
          }}
        >
          <SizeField
            label="Max size"
            value={config.maxSize}
            onChange={(v) => update('maxSize', v)}
            placeholder="80%"
            presets={['40%', '60%', '80%', '95%']}
          />
          <SizeField
            label="Min size"
            value={config.minSize}
            onChange={(v) => update('minSize', v)}
            placeholder="none"
            presets={['100px', '200px', '25%']}
          />
        </div>

        <div style={{ ...LABEL_STYLE, marginBottom: '0.3rem' }}>Width</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0 0.875rem',
            marginBottom: '0.75rem',
          }}
        >
          <SizeField
            label="Max width"
            value={config.maxWidth}
            onChange={(v) => update('maxWidth', v)}
            placeholder="none"
            presets={['320px', '480px', '50%', '75%']}
          />
          <SizeField
            label="Min width"
            value={config.minWidth}
            onChange={(v) => update('minWidth', v)}
            placeholder="none"
            presets={['200px', '280px', '20%']}
          />
        </div>

        <div style={{ ...LABEL_STYLE, marginBottom: '0.3rem' }}>Height</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.875rem' }}>
          <SizeField
            label="Max height"
            value={config.maxHeight}
            onChange={(v) => update('maxHeight', v)}
            placeholder="none"
            presets={['40%', '60%', '80%', '95%']}
          />
          <SizeField
            label="Min height"
            value={config.minHeight}
            onChange={(v) => update('minHeight', v)}
            placeholder="none"
            presets={['120px', '200px', '20%']}
          />
        </div>

        <div style={{ marginTop: '0.45rem', fontSize: '0.62rem', color: C.textDimmer }}>
          % is relative to the viewport · empty = unconstrained
        </div>
      </ControlSection>

      <Divider />

      {/* ── Behavior ── */}
      <ControlSection title="Behavior">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.5rem' }}>
          <ToggleRow
            label="Show backdrop"
            checked={config.backdrop}
            onChange={(v) => update('backdrop', v)}
          />
          <ToggleRow
            label="Close on backdrop click"
            checked={config.closeOnBackdropClick}
            onChange={(v) => update('closeOnBackdropClick', v)}
            disabled={!config.backdrop}
          />
          <ToggleRow
            label="Animate size changes"
            checked={config.animateSize}
            onChange={(v) => update('animateSize', v)}
          />
        </div>
      </ControlSection>

      <Divider />

      {/* ── Gestures ── */}
      <ControlSection title="Gestures">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0 0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <ToggleRow
            label="Draggable"
            checked={config.draggable}
            onChange={(v) => update('draggable', v)}
          />
          <ToggleRow
            label={
              <span>
                Show drag handle{' '}
                <span style={{ fontSize: '0.62rem', color: C.textDimmer }}>(auto-enables)</span>
              </span>
            }
            checked={config.showDragHandle}
            onChange={(v) => update('showDragHandle', v)}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0 0.875rem',
            opacity: isDraggable ? 1 : 0.35,
            transition: 'opacity 0.15s',
            marginBottom: '0.75rem',
          }}
        >
          <NumberRow
            label="Dismiss threshold"
            value={config.dragThreshold}
            onChange={(v) => update('dragThreshold', v)}
            min={10}
            max={400}
            step={5}
            unit="px"
            disabled={!isDraggable}
          />
          <NumberRow
            label="Velocity threshold"
            value={config.dragVelocityThreshold}
            onChange={(v) => update('dragVelocityThreshold', v)}
            min={0.05}
            max={5}
            step={0.05}
            unit="px/ms"
            disabled={!isDraggable}
          />
        </div>

        <div>
          <div style={{ ...LABEL_STYLE, marginBottom: '0.4rem' }}>Snap points</div>
          {config.snapPoints.length > 0 && (
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.4rem' }}
            >
              {config.snapPoints.map((sp) => (
                <SnapChip key={sp} label={sp} onRemove={() => removeSnapPoint(sp)} />
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <input
              type="text"
              value={snapInput}
              onChange={(e) => setSnapInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSnapPoint()}
              placeholder="e.g. 30%, 60%…"
              style={{ ...TEXT_INPUT, flex: 1, minWidth: 0, width: 'auto' }}
            />
            <button
              onClick={addSnapPoint}
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '0.375rem',
                border: `1px solid ${C.border}`,
                background: C.bgButton,
                color: C.textMuted,
                fontSize: '0.72rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Add
            </button>
          </div>
          <div style={{ marginTop: '0.35rem', fontSize: '0.62rem', color: C.textDimmer }}>
            Ascending order. Enter key adds.
          </div>
        </div>
      </ControlSection>

      <Divider />

      {/* ── Advanced ── */}
      <ControlSection title="Advanced">
        <NumberRow
          label="z-index"
          value={config.zIndex}
          onChange={(v) => update('zIndex', Math.max(0, Math.round(v)))}
          min={0}
          max={9999}
          step={10}
          unit="(default 200)"
        />
      </ControlSection>

      <Divider />

      {/* ── Style ── */}
      <ControlSection title="Style">
        <StyleSection customStyle={config.customStyle} onChange={updateStyle} />
      </ControlSection>

      <div style={{ height: '1.5rem' }} />
    </div>
  );
}
