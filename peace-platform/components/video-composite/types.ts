export type BlendMode =
  | 'normal'
  | 'screen'
  | 'multiply'
  | 'overlay'
  | 'lighten'
  | 'darken'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

export const BLEND_MODES: BlendMode[] = [
  'normal', 'screen', 'multiply', 'overlay', 'lighten', 'darken',
  'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
  'exclusion', 'hue', 'saturation', 'color', 'luminosity'
];

export interface LayerFilters {
  brightness: number;
  contrast: number;
  saturation: number;
}

export interface VideoLayer {
  id: number;
  streamId: string;
  opacity: number;
  blendMode: BlendMode;
  visible: boolean;
  filters: LayerFilters;
  zIndex: number;
}

export interface Participant {
  id: string;
  name: string;
}
