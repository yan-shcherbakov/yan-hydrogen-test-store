import { useRouteLoaderData } from "@remix-run/react";
import type {RootLoader} from '~/root';
import {getColorMap} from '~/lib/util';

type ColorSwatchesProps = {
  colors: string[];
  selectedColor?: string;
  onSelectColor?: (color: string) => void;
};


export function ColorSwatches({colors, selectedColor, onSelectColor}: ColorSwatchesProps) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const colorPalette = rootData?.colorPalette;

  const colorMap = getColorMap(colorPalette?.metaobjects.edges ?? []);

  return (
    <div className="flex gap-2">
      {colors.map((color) => {
        const normalizedColor = color.toLowerCase();
        const isSelected = selectedColor && normalizedColor === selectedColor.toLowerCase();
        const colorHex = colorMap[normalizedColor] || '#cccccc'; // Default to gray if color not found
        
        return (
          <button
            key={color}
            onClick={() => onSelectColor?.(color)}
            className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer ${
              isSelected ? 'ring-1 ring-[var(--color-primary-blue)] p-0.5' : ''
            }`}
            title={color}
            aria-label={`${color} color${isSelected ? ' (selected)' : ''}`}
          >
            <span 
              className={`w-full h-full rounded-full block ${
                isSelected ? 'ring-1 ring-white' : ''
              }`}
              style={{backgroundColor: colorHex}}
            />
          </button>
        );
      })}
    </div>
  );
}
