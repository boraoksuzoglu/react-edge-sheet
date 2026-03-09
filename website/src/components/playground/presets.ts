import type { Preset } from './types';

export const PRESETS: Preset[] = [
  {
    name: 'Bottom Sheet',
    description: 'Default bottom sheet',
    config: {
      edge: 'bottom',
      align: 'center',
      animationPreset: 'default',
      maxSize: '70%',
      maxWidth: '500px',
    },
  },
  {
    name: 'Notifications',
    description: 'Top-right slide-in, no backdrop',
    config: {
      edge: 'top',
      align: 'end',
      animationPreset: 'snappy',
      maxSize: '30%',
      maxWidth: '420px',
      backdrop: false,
    },
  },
  {
    name: 'Feedback',
    description: 'Bottom-right floating panel',
    config: {
      edge: 'bottom',
      align: 'end',
      animationPreset: 'default',
      maxSize: '70%',
      maxWidth: '460px',
    },
  },
  {
    name: 'Action Sheet',
    description: 'Spring + drag + snap points',
    config: {
      edge: 'bottom',
      align: 'center',
      animationPreset: 'spring',
      maxSize: '55%',
      maxWidth: '500px',
      draggable: true,
      showDragHandle: true,
      snapPoints: ['30%', '55%'],
    },
  },
  {
    name: 'Left Drawer',
    description: 'Navigation drawer',
    config: {
      edge: 'left',
      align: 'center',
      animationPreset: 'default',
      maxSize: '100%',
      maxWidth: '280px',
    },
  },
  {
    name: 'Right Panel',
    description: 'Settings / detail panel',
    config: {
      edge: 'right',
      align: 'center',
      animationPreset: 'default',
      maxSize: '100%',
      maxWidth: '360px',
      maxHeight: '98vh',
    },
  },
  {
    name: 'Cart',
    description: 'Right-side cart drawer',
    config: {
      edge: 'right',
      align: 'center',
      animationPreset: 'spring',
      maxSize: '100%',
      maxWidth: '420px',
      maxHeight: '98vh',
    },
  },
  {
    name: 'Filter',
    description: 'Bottom filter sheet',
    config: {
      edge: 'bottom',
      align: 'center',
      animationPreset: 'default',
      maxSize: '70%',
      maxWidth: '460px',
    },
  },
  {
    name: 'Full Screen',
    description: 'Slow dramatic entrance',
    config: {
      edge: 'bottom',
      align: 'center',
      animationPreset: 'slow',
      minHeight: '100vh',
      minWidth: '100vw',
      closeOnBackdropClick: false,
    },
  },
];
