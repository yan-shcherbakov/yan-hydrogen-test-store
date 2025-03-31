import {useRouteLoaderData} from '@remix-run/react';
import type {RootLoader} from '~/root';
import {getColorMap} from '~/lib/util';
import {DEFAULT_COLOR, DEFAULT_COLOR_MAP} from '~/lib/constants';

type ColorSwatchesProps = {
  colors: string[];
  selectedColor?: string;
  onSelectColor?: (color: string) => void;
};

export function ColorSwatches({
  colors,
  selectedColor,
  onSelectColor,
}: ColorSwatchesProps) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const colorPalette = rootData?.colorPalette?.metaobjects?.edges ?? [];

  const colorMap = getColorMap(colorPalette) || DEFAULT_COLOR_MAP;

  return (
    <div className="flex gap-2">
      {colors.map((color) => {
        const normalizedColor = color.toLowerCase();
        const isSelected =
          selectedColor && normalizedColor === selectedColor.toLowerCase();
        const colorHex = colorMap[normalizedColor] || DEFAULT_COLOR;

        return (
          <button
            key={color}
            onClick={() => onSelectColor?.(color)}
            className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer ${
              isSelected ? 'ring-1 ring-[var(--color-primary-blue)] p-0.5' : ''
            }`}
            title={color}
            aria-label={`${color} color${isSelected ? ' (selected)' : ''}`}
            type="button"
          >
            <span
              className={`w-full h-full rounded-full block ${
                isSelected ? 'ring-1 ring-white' : ''
              }`}
              style={{backgroundColor: colorHex}}
              data-color-name={color}
              role="presentation"
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
