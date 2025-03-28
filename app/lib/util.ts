import {DEFAULT_COLOR_MAP} from './constants';
import {ColorPaletteQuery} from 'storefrontapi.generated';

export function getColorMap(
  colorPalette: ColorPaletteQuery['metaobjects']['edges'],
) {
  return (
    colorPalette.reduce((acc, edge) => {
      const label = edge.node.label?.value?.toLowerCase();
      const color = edge.node.color?.value;

      if (label && color) {
        acc[label] = color;
      }

      return acc;
    }, {} as Record<string, string>) ?? DEFAULT_COLOR_MAP
  );
}
