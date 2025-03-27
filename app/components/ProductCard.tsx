import {Link, useRouteLoaderData} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {ColorSwatches} from './ColorSwatches';
import {useState} from 'react';
import {HoverableImage} from './HoverableImage';
import {Badge} from './Badge';

type ProductCardProps = {
  id: string;
  vendor: string;
  handle: string;
  title: string;
  variants: RecommendedProductsQuery['products']['nodes'][number]['variants']['nodes'];
  images: RecommendedProductsQuery['products']['nodes'][number]['images']['nodes'];
  priceRange: RecommendedProductsQuery['products']['nodes'][number]['priceRange'];
  isOnSale?: boolean;
};

export function ProductCard({
  id,
  handle,
  title,
  vendor,
  images,
  priceRange,
  variants,
  isOnSale = true,
}: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  
  // Extract colors from variant titles
  const colorVariants = variants.map((variant) => variant.title);
  
  // Handle color selection
  const handleColorSelect = (color: string) => {
    const newVariant = variants.find(
      (variant) => variant.title.toLowerCase() === color.toLowerCase()
    );
    
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  // Find selected variant image or use the first image as fallback
  const variantImage = selectedVariant?.image || images[0];
  
  // Get hover image from metafield
  const hoverImageValue = selectedVariant?.hoverImage?.reference?.image?.url;
  const hoverImageUrl = hoverImageValue ?? null;
  
  return (
    <div className="flex flex-col gap-3">
      <div className="border border-[#E8E8E8] rounded-[10px] overflow-hidden aspect-square relative p-[20px]">
        {isOnSale && <Badge className="absolute top-5 left-5 z-10" />}
        <Link key={id} className="recommended-product block h-full" to={`/products/${handle}`}>
          {variantImage && (
            <HoverableImage
              imageUrl={variantImage.url}
              hoverImageUrl={hoverImageUrl}
              altText={variantImage.altText || title}
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
      <div className="flex flex-col gap-1">
        <p>{vendor}</p>
        <h2 className="text-[var(--color-title-blue)]">{title}</h2>
        <Money data={priceRange.minVariantPrice} />
      </div>
    </div>
  );
}
