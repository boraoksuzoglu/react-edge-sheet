'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Sheet, type SheetRef } from 'react-edge-sheet';
import { CopyButton } from '@/components/ui/CopyButton';
import { type PlaygroundConfig, type CustomStyle, DEFAULT_CONFIG } from './types';
import { PRESETS } from './presets';
import { generateCode, highlight } from './codegen';
import { C } from './theme';
import { ControlsPanel, PresetBar } from './Controls';

export function Playground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const sheetRef = useRef<SheetRef>(null);
  const [snapInput, setSnapInput] = useState('');

  // Auto-close when switching edge.
  // Guard: only call close() if open — calling close() on a never-opened sheet
  // sets isExiting=true with no matching CSS transitionend, leaving an invisible
  // fixed overlay that blocks all pointer events.
  useEffect(() => {
    if (sheetRef.current?.isOpen) {
      sheetRef.current.close();
    }
  }, [config.edge]);

  const update = useCallback(
    <K extends keyof PlaygroundConfig>(key: K, value: PlaygroundConfig[K]) => {
      setActivePreset(null);
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const applyPreset = useCallback((preset: (typeof PRESETS)[number]) => {
    setActivePreset(preset.name);
    setConfig({
      ...DEFAULT_CONFIG,
      maxSize: '',
      maxWidth: '',
      maxHeight: '',
      minSize: '',
      minWidth: '',
      minHeight: '',
      snapPoints: [],
      ...preset.config,
      customStyle: { ...DEFAULT_CONFIG.customStyle, ...preset.config.customStyle },
    });
  }, []);

  const updateStyle = useCallback((key: keyof CustomStyle, value: string) => {
    setActivePreset(null);
    setConfig((prev) => ({
      ...prev,
      customStyle: { ...prev.customStyle, [key]: value },
    }));
  }, []);

  const addSnapPoint = useCallback(() => {
    const v = snapInput.trim();
    if (v && !config.snapPoints.includes(v)) {
      update('snapPoints', [...config.snapPoints, v]);
      setSnapInput('');
    }
  }, [snapInput, config.snapPoints, update]);

  const removeSnapPoint = useCallback(
    (sp: string) => {
      update(
        'snapPoints',
        config.snapPoints.filter((s) => s !== sp)
      );
    },
    [config.snapPoints, update]
  );

  const code = generateCode(config);
  const codeLines = code.split('\n');
  const lineCount = codeLines.length;
  const gutterPx = lineCount >= 100 ? 52 : lineCount >= 10 ? 40 : 32;

  const statusTokens = [
    `edge:${config.edge}`,
    config.animationPreset !== 'default' ? `anim:${config.animationPreset}` : null,
    config.align !== 'center' ? `align:${config.align}` : null,
    config.maxSize && config.maxSize !== '80%' ? `maxSize:${config.maxSize}` : null,
    config.minSize ? `minSize:${config.minSize}` : null,
    config.maxWidth ? `maxW:${config.maxWidth}` : null,
    config.maxHeight ? `maxH:${config.maxHeight}` : null,
    config.minWidth ? `minW:${config.minWidth}` : null,
    config.minHeight ? `minH:${config.minHeight}` : null,
    !config.backdrop ? 'no-backdrop' : null,
    config.draggable || config.showDragHandle ? 'draggable' : null,
    config.snapPoints.length > 0 ? `snaps:${config.snapPoints.length}` : null,
    config.zIndex !== 200 ? `z:${config.zIndex}` : null,
  ].filter(Boolean) as string[];

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 3.6rem)',
        overflow: 'hidden',
        background: C.bg,
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* ═══════════════ LEFT PANEL — Controls ═══════════════ */}
      <div
        style={{
          width: '450px',
          minWidth: '450px',
          display: 'flex',
          flexDirection: 'column',
          borderRight: `1px solid ${C.borderFaint}`,
          overflow: 'hidden',
          background: C.bgPanel,
        }}
      >
        {/* Launch button */}
        <div
          style={{ padding: '0.875rem', borderBottom: `1px solid ${C.borderFaint}`, flexShrink: 0 }}
        >
          <button
            onClick={() => sheetRef.current?.open()}
            style={{
              width: '100%',
              padding: '0.625rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              background:
                'linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))',
              color: 'white',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              boxShadow: '0 0 22px oklch(62% 0.22 275 / 22%), 0 2px 8px oklch(0% 0 0 / 35%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
              <path d="M2 1.5v9l8-4.5L2 1.5z" />
            </svg>
            Launch Sheet
          </button>
        </div>

        {/* Preset bar */}
        <PresetBar presets={PRESETS} activePreset={activePreset} onSelect={applyPreset} />

        {/* Scrollable controls */}
        <ControlsPanel
          config={config}
          update={update}
          updateStyle={updateStyle}
          snapInput={snapInput}
          setSnapInput={setSnapInput}
          addSnapPoint={addSnapPoint}
          removeSnapPoint={removeSnapPoint}
        />
      </div>

      {/* ═══════════════ RIGHT PANEL — Code Editor ═══════════════ */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: C.bgEditor,
          minWidth: 0,
        }}
      >
        {/* Tab bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            borderBottom: `1px solid ${C.borderFaint}`,
            height: '2.5rem',
            flexShrink: 0,
            background: C.bgTabBar,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0 1rem',
              borderRight: `1px solid ${C.borderFaint}`,
              background: C.bgEditor,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'var(--color-brand)',
              }}
            />
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
              <path
                d="M1 1.5C1 1.22 1.22 1 1.5 1h4.586a.5.5 0 0 1 .353.146l2.415 2.415A.5.5 0 0 1 9 3.914V10.5c0 .28-.22.5-.5.5h-7A.5.5 0 0 1 1 10.5v-9Z"
                stroke={C.textDim}
                strokeWidth="0.75"
              />
              <path d="M6 1v2.5a.5.5 0 0 0 .5.5H9" stroke={C.textDim} strokeWidth="0.75" />
              <text
                x="1.8"
                y="9.8"
                fill="oklch(58% 0.18 255)"
                style={{ fontSize: '4px', fontWeight: 700, fontFamily: 'monospace' }}
              >
                tsx
              </text>
            </svg>
            <span
              style={{
                fontSize: '0.72rem',
                color: C.textMuted,
                fontFamily: 'var(--font-mono)',
                whiteSpace: 'nowrap',
              }}
            >
              App.tsx
            </span>
          </div>

          <div style={{ flex: 1 }} />

          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.875rem' }}
          >
            <span
              style={{
                fontSize: '0.62rem',
                color: C.textDimmer,
                fontFamily: 'var(--font-mono)',
                userSelect: 'none',
              }}
            >
              {lineCount} lines
            </span>
            <div style={{ width: '1px', height: '1rem', background: C.border }} />
            <CopyButton text={code} />
          </div>
        </div>

        {/* Code body */}
        <div style={{ flex: 1, overflow: 'auto', background: C.bgEditor }}>
          <div
            style={{
              minWidth: 'max-content',
              paddingTop: '0.75rem',
              paddingBottom: '3rem',
              paddingRight: '3rem',
            }}
          >
            {codeLines.map((rawLine, i) => {
              const isBlank = rawLine.trim() === '';
              return (
                <div key={i} style={{ display: 'flex', lineHeight: '1.7rem', minHeight: '1.7rem' }}>
                  <div
                    style={{
                      width: `${gutterPx}px`,
                      flexShrink: 0,
                      textAlign: 'right',
                      paddingRight: '1rem',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: C.textFaint,
                      userSelect: 'none',
                      lineHeight: '1.7rem',
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      lineHeight: '1.7rem',
                      whiteSpace: 'pre',
                      tabSize: 8,
                      color: C.text,
                      background: 'transparent',
                      padding: 0,
                      margin: 0,
                    }}
                    dangerouslySetInnerHTML={{ __html: isBlank ? '\u00a0' : highlight(rawLine) }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Status bar */}
        <div
          style={{
            height: '1.625rem',
            borderTop: `1px solid ${C.borderFaint}`,
            background: C.bgStatusBar,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: `${gutterPx + 16}px`,
            paddingRight: '0.875rem',
            gap: '1.25rem',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {statusTokens.map((token, i) => (
            <span
              key={i}
              style={{
                fontSize: '0.62rem',
                color: C.textDimmer,
                fontFamily: 'var(--font-mono)',
                whiteSpace: 'nowrap',
              }}
            >
              {token}
            </span>
          ))}
          <div style={{ flex: 1 }} />
          <span
            style={{ fontSize: '0.62rem', color: C.textDimmer, fontFamily: 'var(--font-mono)' }}
          >
            TypeScript JSX
          </span>
        </div>
      </div>

      {/* Sheet (portals to document.body) */}
      <Sheet
        ref={sheetRef}
        edge={config.edge}
        align={config.align}
        animationPreset={config.animationPreset}
        maxSize={config.maxSize || undefined}
        minSize={config.minSize || undefined}
        maxWidth={config.maxWidth || undefined}
        maxHeight={config.maxHeight || undefined}
        minWidth={config.minWidth || undefined}
        minHeight={config.minHeight || undefined}
        backdrop={config.backdrop}
        closeOnBackdropClick={config.closeOnBackdropClick}
        animateSize={config.animateSize}
        draggable={config.draggable}
        showDragHandle={config.showDragHandle}
        dragThreshold={config.dragThreshold}
        dragVelocityThreshold={config.dragVelocityThreshold}
        snapPoints={config.snapPoints.length > 0 ? config.snapPoints : undefined}
        zIndex={config.zIndex}
        style={{
          background: config.customStyle.background || C.bgElevated,
          color: config.customStyle.color || C.text,
          ...(config.customStyle.borderRadius
            ? { borderRadius: config.customStyle.borderRadius }
            : {}),
          ...(config.customStyle.border ? { border: config.customStyle.border } : {}),
          ...(config.customStyle.padding ? { padding: config.customStyle.padding } : {}),
          ...(config.customStyle.margin ? { margin: config.customStyle.margin } : {}),
        }}
      >
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 600 }}>
            Sheet Preview
          </h3>
          <p
            style={{ margin: '0 0 1rem', fontSize: '0.82rem', color: C.textMuted, lineHeight: 1.6 }}
          >
            Live preview of your configuration.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {['Action one', 'Action two', 'Action three'].map((item) => (
              <div
                key={item}
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: '0.5rem',
                  background: C.bgButton,
                  border: `1px solid ${C.border}`,
                  fontSize: '0.82rem',
                  color: C.textMuted,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <button
            onClick={() => sheetRef.current?.close()}
            style={{
              marginTop: '1rem',
              width: '100%',
              padding: '0.55rem',
              borderRadius: '0.5rem',
              border: `1px solid ${C.border}`,
              background: C.bgButton,
              color: C.textMuted,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </Sheet>
    </div>
  );
}
