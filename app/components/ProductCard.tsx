import {Link} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {ColorSwatches} from './ColorSwatches';
import {useState, useMemo, useCallback} from 'react';
import {HoverableImage} from './HoverableImage';
import {Badge} from './Badge';
import {getColorVariants} from '~/lib/util';

type ProductCardProps = {
  id: string;
  vendor: string;
  handle: string;
  title: string;
  variants: ProductItemFragment['variants']['nodes'];
  images: ProductItemFragment['images']['nodes'];
  price: ProductItemFragment['priceRange'];
  originalPrice: ProductItemFragment['compareAtPriceRange'];
};

export function ProductCard({
  id,
  handle,
  title,
  vendor,
  images,
  price,
  originalPrice,
  variants,
}: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  
  const colorVariants = useMemo(() => getColorVariants(variants), [variants]);
  
  const handleColorSelect = useCallback((color: string) => {
    const newVariant = variants.find(
      (variant) => variant.title.toLowerCase() === color.toLowerCase()
    );
    
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  }, [variants]);

  const variantImage = selectedVariant?.image || images[0];
  
  const hoverImageValue = selectedVariant?.hoverImage?.reference?.image;
  const hoverImageUrl = hoverImageValue?.url ?? null;
  const hoverImageAltText = hoverImageValue?.altText ?? '';
  
  const isOnSale = Number(originalPrice?.minVariantPrice?.amount) > Number(price?.minVariantPrice?.amount);

  return (
    <div className="flex flex-col gap-3">
      <div className="border border-[#E8E8E8] rounded-[10px] overflow-hidden aspect-square relative p-[20px]">
        {isOnSale && <Badge className="absolute top-4 left-4 z-10">On Sale!</Badge>}
        <Link key={id} className="recommended-product block h-full" to={`/products/${handle}`}>
          {variantImage && (
            <HoverableImage
              imageUrl={variantImage.url}
              hoverImageUrl={hoverImageUrl}
              imageAltText={variantImage.altText || title}
              hoverImageAltText={hoverImageAltText}
              width={variantImage.width || 72}
              height={variantImage.height || 72}
            />
          )}
        </Link>
      </div>
      <div className="mt-2">
        <ColorSwatches 
          colors={colorVariants} 
          selectedColor={selectedVariant.title}
          onSelectColor={handleColorSelect}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p>{vendor}</p>
        <h4 className="text-[var(--color-primary-blue)]">{title}</h4>
        <div className="flex gap-3">
          {isOnSale && <Money className="line-through" data={originalPrice.minVariantPrice} />}
          <Money className={`${isOnSale ? 'text-[var(--color-sale)]' : ''}`} data={price.minVariantPrice} />
        </div>
      </div>
    </div>
  );
}
