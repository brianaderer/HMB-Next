// In pages/sitemap.xml.js:

import { getSitemapProps } from '@faustwp/core';

export default function Sitemap() {}

export function getServerSideProps(ctx) {
    return getSitemapProps(ctx, {
        frontendUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
        sitemapPathsToIgnore: [
            '/wp-sitemap-posts-post-*',
            '/wp-sitemap-posts-attractions-*',
            '/wp-sitemap-posts-review-*',
            '/wp-sitemap-taxonomies-category-*',
            '/wp-sitemap-taxonomies-place-category-*',
            '/wp-sitemap-taxonomies-placetype-*',
            '/wp-sitemap-users-*',
            '/wp-sitemap-posts-guest-book-entry-*',
        ]
    });
}