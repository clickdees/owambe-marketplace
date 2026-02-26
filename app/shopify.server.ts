const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch(query: string, variables = {}) {
  // const endpoint = `https://${domain}/api/2024-01/graphql.json`;
  const endpoint = `https://${domain}/api/2026-01/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API Error: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

// --- QUERIES ---

// UPDATED to include a query for Vendor metaobjects
export const HOME_PAGE_QUERY = `
  query HomePageData {
    collections(first: 50) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
        }
      }
    }
    articles(first: 3, sortKey: PUBLISHED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        publishedAt
        excerpt
        tags
        blog {
          handle
        }
        authorV2 {
          name
        }
        image {
          url
          altText
        }
      }
    }  
    products(first: 4, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        vendor
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          nodes {
            url
            altText
          }
        }
      }
    }
    # NEW: Fetching the first 4 vendor metaobjects
    featuredVendors: metaobjects(type: "vendor", first: 4) {
      nodes {
        id
        handle # The URL-friendly identifier for the vendor
        displayName: field(key: "display_name") {
          value
        }
        logo: field(key: "logo") {
          reference {
           ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;


export const COLLECTION_PAGE_QUERY = `
  query CollectionPage($handle: String!) {
    # 1. Fetch the Shop's Currency Code
    shop {
      paymentSettings {
        currencyCode
      }
    }
    collection(handle: $handle) {
      id
      title
      description
      products(first: 24, sortKey: BEST_SELLING) {
        nodes {
          id
          title
          handle
          vendor
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            nodes {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_PAGE_QUERY = `
  query ProductPage($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle  
      descriptionHtml
      vendor
      productType
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 4) {
        nodes {
          url
          altText
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          price {
            amount
            currencyCode
          }
          image {
            url
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

export const GET_VARIANT_PRICE_QUERY = `
  query getVariantPrice($id: ID!) {
    node(id: $id) {
      ... on ProductVariant {
        price {
          amount
          currencyCode
        }
      }
    }
  }
`;


export const SEARCH_QUERY = `
  query SearchProducts($query: String!) {
    products(first: 24, sortKey: RELEVANCE, query: $query) {
      nodes {
        id
        title
        handle
        vendor
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          nodes {
            url
            altText
          }
        }
      }
    }
  }
`;

export const BLOG_QUERY = `
  query BlogArticles {
    articles(first: 9, sortKey: PUBLISHED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        publishedAt
        contentHtml
        excerpt
        image {
          url
          altText
        }
        authorV2 {
          name
        }
        tags
        blog {
          handle
          title
        }
      }
    }
  }
`;


export const ARTICLE_QUERY = `
  query ArticlePage($articleHandle: String!, $blogHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        id
        title
        contentHtml
        publishedAt
        image {
          url
          altText
        }
        authorV2 {
          name
        }
        tags
      }
    }
  }
`;

export const ALL_VENDORS_QUERY = `
  query AllVendors {
    metaobjects(type: "vendor", first: 50) {
      nodes {
        id
        handle
        displayName: field(key: "display_name") {
          value
        }
        logo: field(key: "logo") {
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
        # Uncomment these if you added these fields to your Metaobject definition:
        # bio: field(key: "bio") { value }
        # location: field(key: "location") { value }
        # rating: field(key: "rating") { value }
      }
    }
  }
`;


export const ALL_SERVICES_QUERY = `
  query AllServices {
    collections(first: 50, sortKey: TITLE) {
      nodes {
        id
        title
        handle
        description # Added description for the UI
        image {
          url
          altText
        }
      }
    }
  }
`;


// 1. Fetch Profile Info
export const VENDOR_PROFILE_QUERY = `
  query VendorProfile($handle: String!) {
    metaobject(handle: {handle: $handle, type: "vendor"}) {
      id
      handle
      displayName: field(key: "display_name") { value }
      bio: field(key: "bio") { value }
      location: field(key: "location") { value }
      logo: field(key: "logo") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

// 2. Fetch Services (Products) by Vendor Name
export const VENDOR_PRODUCTS_QUERY = `
  query VendorProducts($query: String!) {
    products(first: 10, query: $query, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        description
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 2) {
          nodes {
            url
            altText
          }
        }
      }
    }
  }
`;