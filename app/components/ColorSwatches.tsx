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

// TODO: This order should be defined in a metafield in the future for better customization
const COLOR_ORDER = ['orange', 'green', 'blue', 'yellow', 'pink', 'navy'];

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

  // Sort colors according to the predefined order
  const sortedColors = [...colors].sort((a, b) => {
    const aIndex = COLOR_ORDER.indexOf(a.toLowerCase());
    const bIndex = COLOR_ORDER.indexOf(b.toLowerCase());
    
    // Colors not in the predefined order go to the end
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    
    return aIndex - bIndex;
  });

  return (
    <div className="flex gap-2">
      {sortedColors.map((color) => {
        const normalizedColor = color.toLowerCase();
        const isSelected = selectedColor && normalizedColor === selectedColor.toLowerCase();
        const colorHex = COLOR_MAP[normalizedColor] || '#cccccc'; // Default to gray if color not found
        
        return (
          <button
            key={color}
            onClick={() => onSelectColor?.(color)}
            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
              isSelected ? 'ring-2 ring-black p-0.5' : ''
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
