import {Image} from '@shopify/hydrogen';
import {useState, useEffect} from 'react';

type HoverableImageProps = {
  imageUrl: string;
  hoverImageUrl: string | null;
  altText: string;
  width: number;
  height: number;
};

export function HoverableImage({
  imageUrl,
  hoverImageUrl,
  altText,
  width,
  height,
}: HoverableImageProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverImageLoaded, setHoverImageLoaded] = useState(false);

  // Calculate aspect ratio
  const aspectRatio = (height / width) * 100;

  // Preload hover image only on client side
  useEffect(() => {
    if (hoverImageUrl) {
      const img = document.createElement('img');
      img.src = hoverImageUrl;
      img.onload = () => setHoverImageLoaded(true);
    } else {
      setHoverImageLoaded(false);
    }
  }, [hoverImageUrl]);

  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: `${aspectRatio}%` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main image */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isHovering && hoverImageUrl && hoverImageLoaded
            ? 'opacity-0'
            : 'opacity-100'
        }`}
      >
        <Image
          src={imageUrl}
          alt={altText}
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hover image */}
      {hoverImageUrl && (
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHovering && hoverImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={hoverImageLoaded ? {} : {display: 'none'}}
        >
          <Image
            src={hoverImageUrl}
            alt={`${altText} - hover`}
            width={width}
            height={height}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
