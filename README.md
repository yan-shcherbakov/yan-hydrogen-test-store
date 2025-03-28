# Yan Product Test Store

This is a Shopify Hydrogen storefront built with Remix and modern web technologies. The project features a comprehensive set of components for e-commerce functionality, including product browsing, variant selection, and cart management.

## Technical Stack & Decisions

- **Framework**: [Remix](https://remix.run/) for server-side rendering and routing
- **Commerce**: [Shopify Hydrogen](https://shopify.dev/custom-storefronts/hydrogen) for headless commerce
- **Hosting**: [Oxygen](https://shopify.dev/custom-storefronts/oxygen) for deployment
- **Build Tool**: [Vite](https://vitejs.dev/) for rapid development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling approach
- **Type Safety**: TypeScript for improved developer experience and code quality
- **Testing**: Playwright for end-to-end testing
- **CI/CD**: GitHub Actions for automated testing and deployment

### Key Architecture Decisions

- **Component Structure**: Modular, reusable components with clear responsibility boundaries
- **State Management**: React hooks for local state, context for cross-component state
- **Data Fetching**: GraphQL with Shopify's Storefront API
- **Image Handling**: Optimized with lazy loading and hover states for product images
- **Accessibility**: ARIA attributes and semantic HTML throughout components
- **Performance**: Code splitting, lazy loading, and optimized asset delivery

## Requirements

- Node.js version 18.0.0 or higher
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd yan-hydrogen-test-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Link to Hydrogen store:
   ```bash
   npx shopify hydrogen link
   ```

3. Pull the environment variable (if necessary):
   ```bash
   npx shopify hydrogen env pull
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Testing

### Running End-to-End Tests

We use Playwright for end-to-end testing. To run the tests:

```bash
# Install Playwright browsers (first time only)
npx playwright install --with-deps chromium

# Run the tests
npm run test:e2e
```

To view the test results in a visual interface:
```bash
npm run test:e2e:ui
```

### Test Structure

- Tests are located in the `tests/e2e` directory
- Each component has its own test file
- Tests verify both visual appearance and functional behavior

## Building for Production

```bash
npm run build
```

## Deployment

This project is set up to auto-deploy on Shopify Oxygen.


All pull requests are automatically tested via GitHub Actions workflows.