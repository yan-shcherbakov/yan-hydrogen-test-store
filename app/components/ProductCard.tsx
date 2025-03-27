import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {ColorSwatches} from './ColorSwatches';
import {useState} from 'react';

type ProductCardProps = {
  id: string;
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
  images,
  priceRange,
  variants,
  isOnSale = false,
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
  const variantImage = images.find(
    (image) => image.id === selectedVariant?.image?.id
  ) || images[0];
  
  return (
    <div>
      <div className="border border-[#E8E8E8] rounded-[10px] overflow-hidden">
        <Image
          data={variantImage}
          aspectRatio="1/1"
          sizes="(min-width: 45em) 20vw, 50vw"
        />
      </div>
      <div className="mt-2">
        <ColorSwatches 
          colors={colorVariants} 
          selectedColor={selectedVariant.title}
          onSelectColor={handleColorSelect}
        />
      </div>
      <Link key={id} className="recommended-product" to={`/products/${handle}`}>
        <h6>Good Brand Company</h6>
        <h4>{title}</h4>
        <small>
          <Money data={priceRange.minVariantPrice} />
        </small>
      </Link>
    </div>
  );
}
