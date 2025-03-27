import {Link, useRouteLoaderData} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {ColorSwatches} from './ColorSwatches';
import {useState} from 'react';
import {HoverableImage} from './HoverableImage';

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
  isOnSale = false,
}: ProductCardProps) {
  const rootData = useRouteLoaderData('root');
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
    <div>
      <div className="border border-[#E8E8E8] rounded-[10px] overflow-hidden aspect-square">
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
      <h6>{vendor}</h6>
      <h4>{title}</h4>
      <small>
        <Money data={priceRange.minVariantPrice} />
      </small>
    </div>
  );
}
