import segmentsManifest from '../styles/generated/segments/segments.json';

export type SegmentOption = {
  slug: string;
  title: string;
};

export const SEGMENT_OPTIONS: SegmentOption[] = segmentsManifest;
