import type { HTMLAttributes } from 'react';
import type { RowFeatureBackground } from '../shared/types';
import { CardBaseLFilled } from '../../../details/cards/CardBaseLFilled';
import { CardBaseLImage } from '../../../details/cards/CardBaseLImage';
import { LayoutHPaddingRulers, LayoutVerticalPaddingRuler } from '../shared/LayoutPaddingRuler';
import {
  ROW_FEATURE_H_PADDING_PX,
  ROW_FEATURE_T_PADDING_PX,
  rowFeatureFigmaNodeId,
} from './types';
import './rows.css';

export interface RowFeatureProps extends HTMLAttributes<HTMLDivElement> {
  background?: RowFeatureBackground;
}

/** Figma `row - feature` (6117:9081). */
export function RowFeature({
  background = 'fill',
  className,
  ...props
}: RowFeatureProps) {
  const classes = ['layout-row', 'layout-row--feature', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="row - feature"
      data-figma-node={rowFeatureFigmaNodeId(background)}
      data-background={background}
      {...props}
    >
      <LayoutVerticalPaddingRuler px={ROW_FEATURE_T_PADDING_PX} />
      <LayoutHPaddingRulers
        px={ROW_FEATURE_H_PADDING_PX}
        topInset={ROW_FEATURE_T_PADDING_PX}
      />
      <div className="layout-row--feature__card">
        {background === 'image' ? <CardBaseLImage /> : <CardBaseLFilled />}
      </div>
    </div>
  );
}
