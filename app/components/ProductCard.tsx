import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {ColorSwatches} from './ColorSwatches';

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
  return (
    <Link key={id} className="recommended-product" to={`/products/${handle}`}>
      <div className="border border-[#E8E8E8] rounded-[10px] overflow-hidden">
        <Image
          data={images[0]}
          aspectRatio="1/1"
          sizes="(min-width: 45em) 20vw, 50vw"
        />
      </div>
      <ColorSwatches colors={variants.map((variant) => variant.title)} />
      <h6>Good Brand Company</h6>
      <h4>{title}</h4>
      <small>
        <Money data={priceRange.minVariantPrice} />
      </small>
    </Link>
  );
}