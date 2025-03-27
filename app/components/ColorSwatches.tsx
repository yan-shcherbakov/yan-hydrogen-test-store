import { useRouteLoaderData } from "@remix-run/react";
import type {RootLoader} from '~/root';

type ColorSwatchesProps = {
  colors: string[];
  selectedColor?: string;
  onSelectColor?: (color: string) => void;
};

// TODO: Move to constants file
const DEFAULT_COLOR_MAP: Record<string, string> = {
  orange: '#FF6633',
  green: '#006600',
  blue: '#00639C',
  yellow: '#FCE78D',
  pink: '#FFCCFF',
  navy: '#19264B',
};

export function ColorSwatches({colors, selectedColor, onSelectColor}: ColorSwatchesProps) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const colorPalette = rootData?.colorPalette;

  const COLOR_MAP = (colorPalette?.metaobjects.edges.reduce((acc, edge) => {
    const label = edge.node.label?.value?.toLowerCase();
    const color = edge.node.color?.value;

    if (label && color) {
      acc[label] = color;
    }

    return acc;
  }, {} as Record<string, string>) ?? DEFAULT_COLOR_MAP);

  return (
    <div className="flex gap-2">
      {colors.map((color) => {
        const normalizedColor = color.toLowerCase();
        const isSelected = selectedColor && normalizedColor === selectedColor.toLowerCase();
        const colorHex = COLOR_MAP[normalizedColor] || '#cccccc'; // Default to gray if color not found
        
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
