type ColorSwatchesProps = {
  colors: string[];
};

export function ColorSwatches({colors}: ColorSwatchesProps) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <div
          key={color}
          className="bg-black text-white px-2 py-1 rounded text-sm"
        >
          {color}
        </div>
      ))}
    </div>
  );
}
