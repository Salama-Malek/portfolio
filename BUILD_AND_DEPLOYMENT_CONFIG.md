# Build Configuration & Deployment Optimization Guide

## 📦 Build Configuration Enhancements

### 1. Create/Update .env.production

```bash
# .env.production
REACT_APP_ENV=production
GENERATE_SOURCEMAP=false  # Disable source maps in production (saves ~50KB)
IMAGE_INLINE_SIZE_LIMIT=10000  # Inline images smaller than 10KB
```

### 2. Update package.json Scripts

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "build:analyze": "npm run build && source-map-explorer 'build/static/js/*.js'",
    "build:report": "npm run build && webpack-bundle-analyzer build/static/js/*.js",
    "analyze": "source-map-explorer 'build/static/js/*.js'",
    "lighthouse": "lighthouse http://localhost:3000 --view",
    "lighthouse:mobile": "lighthouse http://localhost:3000 --emulated-form-factor=mobile --view",
    "size-limit": "size-limit",
    "bundle-check": "npm run build && npm run analyze"
  }
}
```

### 3. Create .env.development

```bash
# .env.development
REACT_APP_ENV=development
GENERATE_SOURCEMAP=true  # Keep source maps for debugging
```

---

## 🔧 Webpack Configuration Optimizations

If you're using Create React App with custom webpack, add these:

### 1. Enable Brotli Compression

```javascript
// config/webpack.config.prod.js
const CompressionPlugin = require('compression-webpack-plugin');

plugins: [
  new CompressionPlugin({
    algorithm: 'brotliSize',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  }),
],
```

### 2. Optimize Bundle Chunks

```javascript
// config/webpack.config.prod.js
optimization: {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    }),
  ],
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      // React vendor
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/,
        name: 'vendor-react',
        priority: 20,
      },
      // Other vendors
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor-other',
        priority: 10,
      },
      // Common code used in multiple chunks
      common: {
        minChunks: 2,
        priority: 5,
        reuseExistingChunk: true,
      },
    },
  },
  runtimeChunk: 'single',
},
```

### 3. Image Optimization Plugin

```javascript
// config/webpack.config.prod.js
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

plugins: [
  new ImageMinimizerPlugin({
    minimizerOptions: {
      plugins: [
        ['imagemin-mozjpeg', { quality: 75 }],
        ['imagemin-pngquant', { quality: [0.6, 0.8] }],
        ['imagemin-webp', { quality: 80 }],
      ],
    },
  }),
],
```

---

## 🎨 CSS Optimization

### 1. Install and Configure PostCSS

```bash
npm install --save-dev postcss postcss-cli cssnano @fullhuman/postcss-purgecss autoprefixer
```

**postcss.config.js:**

```javascript
module.exports = {
  plugins: [
    require("autoprefixer"),
    process.env.NODE_ENV === "production" &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [/^active/, /^disabled/, /^visited/],
          deep: [/^modal/, /^toast/],
        },
      }),
    process.env.NODE_ENV === "production" &&
      require("cssnano")({
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
            normalizeUnicode: false,
          },
        ],
      }),
  ].filter(Boolean),
};
```

### 2. Critical CSS Extraction

```bash
npm install --save-dev critical
```

**Extract critical CSS for above-fold content:**

```bash
critical index.html --base ./ --inline --minify > index-critical.html
```

---

## 🚀 Deployment Optimizations

### 1. Nginx Configuration for Gzip + Brotli

```nginx
# nginx.conf
gzip on;
gzip_vary on;
gzip_min_length 1000;
gzip_proxied any;
gzip_types text/plain text/css text/xml text/javascript
            application/x-javascript application/xml+rss
            application/rss+xml font/truetype font/opentype
            application/vnd.ms-fontobject image/svg+xml;
gzip_disable "MSIE [1-6]\.";

# Brotli compression (if available)
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css text/xml text/javascript
             application/x-javascript application/xml+rss
             application/rss+xml application/javascript;

# Caching headers
location ~* \.(?:jpg|jpeg|gif|png|webp|svg|woff|woff2|eot|ttf|otf)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.js$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.css$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location /index.html {
    expires 1h;
    add_header Cache-Control "public, max-age=3600";
}
```

### 2. Apache Configuration

```apache
# .htaccess for Apache
<IfModule mod_deflate.c>
  AddType application/x-font-ttf .ttf
  AddType application/x-font-otf .otf
  AddType application/x-font-woff .woff
  AddType application/x-font-woff2 .woff2
  AddType image/svg+xml .svg

  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE image/svg+xml
  AddOutputFilterByType DEFLATE font/truetype
  AddOutputFilterByType DEFLATE font/opentype
  AddOutputFilterByType DEFLATE application/x-font-ttf
  AddOutputFilterByType DEFLATE application/x-font-otf
  AddOutputFilterByType DEFLATE application/x-font-woff
  AddOutputFilterByType DEFLATE application/x-font-woff2
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access 1 year"
  ExpiresByType image/gif "access 1 year"
  ExpiresByType image/png "access 1 year"
  ExpiresByType image/webp "access 1 year"
  ExpiresByType image/svg+xml "access 1 year"
  ExpiresByType text/css "access 1 year"
  ExpiresByType application/javascript "access 1 year"
  ExpiresByType font/truetype "access 1 year"
  ExpiresByType font/opentype "access 1 year"
  ExpiresByType application/x-font-woff "access 1 year"
  ExpiresByType application/x-font-woff2 "access 1 year"
  ExpiresByType text/html "access 1 day"
</IfModule>
```

---

## 📱 Mobile-Specific Optimizations

### 1. Responsive Image Configuration

```jsx
// src/components/OptimizedImage.jsx
export const ResponsiveImage = ({
  src,
  srcSmall,
  srcMedium,
  alt,
  width,
  height,
}) => {
  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={srcSmall} />
      <source media="(max-width: 1024px)" srcSet={srcMedium} />
      <source srcSet={src} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};
```

### 2. Network Information API

```javascript
// src/hooks/useNetworkStatus.js
export const useNetworkStatus = () => {
  const [connectionType, setConnectionType] = useState("4g");

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection;
    if (!connection) return;

    setConnectionType(connection.effectiveType);

    const updateConnectionType = () => {
      setConnectionType(connection.effectiveType);
    };

    connection.addEventListener("change", updateConnectionType);
    return () => connection.removeEventListener("change", updateConnectionType);
  }, []);

  return connectionType;
};

// Usage
const {
  Hero,
} = () => {
  const connection = useNetworkStatus();
  const isSlowNetwork = ["slow-2g", "2g", "3g"].includes(connection);

  return (
    <>
      {!isSlowNetwork && <HeavyAnimation />}
      {isSlowNetwork && <SimpleFallback />}
    </>
  );
};
```

---

## 🔍 Performance Monitoring

### 1. Setup Web Vitals Tracking

```bash
npm install web-vitals
```

**src/performance/vitals.js:**

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

// Send to analytics
export const sendToAnalytics = (metric) => {
  if (process.env.NODE_ENV === "production") {
    // Send to your analytics service
    console.log(metric);
    // E.g., fetch('/api/metrics', { method: 'POST', body: JSON.stringify(metric) })
  }
};

export default reportWebVitals;
```

**src/index.js:**

```javascript
import reportWebVitals from "./performance/vitals";

// ...

reportWebVitals(sendToAnalytics);
```

### 2. Create Performance Dashboard

```javascript
// src/components/PerformanceDashboard.jsx
import { useEffect, useState } from "react";

export const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const paint = performance.getEntriesByType("paint");

    setMetrics({
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ttfb: navigation.responseStart - navigation.requestStart,
      domLoad: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      pageLoad: navigation.loadEventEnd - navigation.navigationStart,
      fcp: paint.find((p) => p.name === "first-contentful-paint")?.startTime,
    });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        background: "#fff",
        padding: "10px",
        zIndex: 9999,
      }}
    >
      <h4>Performance Metrics</h4>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
};
```

---

## 🧪 Performance Testing CI/CD

### 1. Lighthouse CI Setup

```bash
npm install -g @lhci/cli@latest
npm install --save-dev @lhci/server
```

**lighthouserc.json:**

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/projects",
        "http://localhost:3000/contact"
      ],
      "settings": {
        "configPath": "./lighthouse-config.js"
      }
    },
    "upload": {
      "target": "filesystem",
      "outputDir": "./lighthouse-results"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["warn", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }]
      }
    }
  }
}
```

### 2. GitHub Actions Workflow

**`.github/workflows/lighthouse.yml`:**

```yaml
name: Lighthouse CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          configPath: "./.github/lighthouse/lighthouserc.json"
          uploadArtifacts: true
```

---

## 📊 Monitoring & Analytics

### 1. Error Tracking

```javascript
// src/utils/errorTracking.js
import * as Sentry from "@sentry/react";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    integrations: [
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
}

export default Sentry;
```

### 2. Google Analytics 4 Integration

```javascript
// src/utils/analytics.js
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.REACT_APP_GA_ID);

export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};
```

---

## ✅ Final Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test with `npm run build:analyze` - bundle looks good
- [ ] Run Lighthouse: `npm run lighthouse`
- [ ] Test on mobile: `npm run lighthouse:mobile`
- [ ] Performance score > 80
- [ ] All images optimized
- [ ] Source maps disabled
- [ ] Service Worker registered
- [ ] Cache headers configured
- [ ] Compression enabled (gzip/brotli)
- [ ] Security headers configured
- [ ] Error tracking enabled
- [ ] Analytics tracking enabled
- [ ] All tests passing
- [ ] No console errors/warnings

---

## 🚀 Deployment Command

```bash
# Build for production
npm run build

# Verify bundle size
npm run analyze

# Run Lighthouse tests
npm run lighthouse

# Deploy to your hosting (example - Vercel)
vercel --prod

# Or deploy manually
# Copy ./build folder to your server
```

---

## 📞 Troubleshooting

### High Bundle Size After Build?

```bash
npm run analyze
# Identify and remove unused dependencies
npm uninstall [package-name]
```

### Lighthouse Score Still Low?

```bash
npm run lighthouse
# Check the detailed report for specific issues
# Address lowest scoring categories first
```

### Images Not Optimizing?

```bash
# Manually convert remaining images
cwebp -q 80 image.png -o image.webp
avifenc --speed 6 -q 60 image.png image.avif
```

---

**Version:** 1.0  
**Last Updated:** January 29, 2026  
**Status:** Ready for Implementation
