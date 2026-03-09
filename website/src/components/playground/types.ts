import type { SheetEdge, AnimationPreset } from 'react-edge-sheet';

export type CustomStyle = {
  background: string;
  color: string;
  borderRadius: string;
  border: string;
  padding: string;
  margin: string;
};

export type PlaygroundConfig = {
  edge: SheetEdge;
  align: 'start' | 'center' | 'end';
  animationPreset: AnimationPreset;
  maxSize: string;
  minSize: string;
  maxWidth: string;
  maxHeight: string;
  minWidth: string;
  minHeight: string;
  backdrop: boolean;
  closeOnBackdropClick: boolean;
  animateSize: boolean;
  draggable: boolean;
  showDragHandle: boolean;
  dragThreshold: number;
  dragVelocityThreshold: number;
  snapPoints: string[];
  zIndex: number;
  customStyle: CustomStyle;
};

export type Preset = {
  name: string;
  description: string;
  config: Partial<Omit<PlaygroundConfig, 'customStyle'>> & { customStyle?: Partial<CustomStyle> };
};

export const DEFAULT_CONFIG: PlaygroundConfig = {
  edge: 'bottom',
  align: 'center',
  animationPreset: 'default',
  maxSize: '80%',
  minSize: '',
  maxWidth: '',
  maxHeight: '',
  minWidth: '',
  minHeight: '',
  backdrop: true,
  closeOnBackdropClick: true,
  animateSize: true,
  draggable: false,
  showDragHandle: false,
  dragThreshold: 80,
  dragVelocityThreshold: 0.3,
  snapPoints: [],
  zIndex: 200,
  customStyle: {
    background: '',
    color: '',
    borderRadius: '',
    border: '',
    padding: '',
    margin: '',
  },
};
