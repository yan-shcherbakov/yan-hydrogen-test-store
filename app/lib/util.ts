import {
  DEFAULT_COLOR_MAP,
  DEFAULT_COLOR,
  COLOR_OPTION_NAME,
  COLOUR_OPTION_NAME,
} from './constants';
import {ColorPaletteQuery, ProductItemFragment} from 'storefrontapi.generated';

export function getColorMap(
  colorPalette: ColorPaletteQuery['metaobjects']['edges'],
) {
  if (
    !colorPalette ||
    !Array.isArray(colorPalette) ||
    colorPalette.length === 0
  ) {
    return DEFAULT_COLOR_MAP;
  }

  return (
    colorPalette.reduce((acc, edge) => {
      const label = edge?.node?.label?.value?.toLowerCase();
      const color = edge?.node?.color?.value;

      if (label && color) {
        acc[label] = color;
      }

      return {...DEFAULT_COLOR_MAP, ...acc};
    }, {} as Record<string, string>) ?? DEFAULT_COLOR_MAP
  );
}

export function getColorVariants(
  variants: ProductItemFragment['variants']['nodes'],
) {
  return variants
    .filter((variant) => {
      return variant.selectedOptions.some(
        (option) =>
          option.name.toLowerCase() === COLOR_OPTION_NAME ||
          option.name.toLowerCase() === COLOUR_OPTION_NAME,
      );
    })
    .map((variant) => {
      const colorOption = variant.selectedOptions.find(
        (option) =>
          option.name.toLowerCase() === COLOR_OPTION_NAME ||
          option.name.toLowerCase() === COLOUR_OPTION_NAME,
      );
      return colorOption?.value || '';
    })
    .filter(Boolean);
}

export function getColorHex(color: string) {
  return DEFAULT_COLOR_MAP[color] || DEFAULT_COLOR;
}
