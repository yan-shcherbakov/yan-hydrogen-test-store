import {Image} from '@shopify/hydrogen';
import {useState, useEffect, useCallback, useMemo} from 'react';

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
  const [hoverImageError, setHoverImageError] = useState(false);

  // Calculate aspect ratio
  const aspectRatio = useMemo(() => (height / width) * 100, [height, width]);

  // Memoize the image preloading logic
  const preloadImage = useCallback((url: string) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => reject(new Error('Failed to load hover image'));
    });
  }, []);

  // Preload hover image only on client side
  useEffect(() => {
    let isMounted = true;

    const loadHoverImage = async () => {
      if (!hoverImageUrl) {
        setHoverImageLoaded(false);
        setHoverImageError(false);
        return;
      }

      try {
        await preloadImage(hoverImageUrl);
        if (isMounted) {
          setHoverImageLoaded(true);
          setHoverImageError(false);
        }
      } catch (error) {
        if (isMounted) {
          setHoverImageLoaded(false);
          setHoverImageError(true);
        }
      }
    };

    loadHoverImage();

    return () => {
      isMounted = false;
    };
  }, [hoverImageUrl, preloadImage]);

  // Memoize the hover handlers
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: `${aspectRatio}%` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main image */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isHovering && hoverImageUrl && hoverImageLoaded && !hoverImageError
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
      {hoverImageUrl && !hoverImageError && (
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
            className="w-full h-full object-contain object-top"
          />
        </div>
      )}
    </div>
  );
}
