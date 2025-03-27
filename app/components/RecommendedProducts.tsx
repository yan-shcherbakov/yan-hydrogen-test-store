import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {ProductCard} from './ProductCard';

export function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      handle={product.handle}
                      vendor={product.vendor}
                      title={product.title}
                      images={product.images.nodes}
                      price={product.priceRange}
                      originalPrice={product.compareAtPriceRange}
                      variants={product.variants.nodes}
                    />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}
