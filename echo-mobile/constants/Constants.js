import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const { PI } = Math;
export const TAU = 2 * PI;
export const RADIUS = width / 7 - 16;
export const STROKE_WIDTH = 100;
