import Head from 'next/head';

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.imageUrl Used for the og:image and twitter:image. NOTE: Must be an absolute url.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({ siteTitle, pageTitle, description, imageUrl, url }) {
    if (!siteTitle && !description && !imageUrl && !url) {
        return null;
    }
    const logoUrl = imageUrl?.logo;
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
                <link rel="icon" href={logoUrl} type="image/png" />

                {siteTitle && pageTitle && (
                    <>
                        <title>{`${siteTitle} - ${pageTitle}`}</title>
                        <meta name="title" content={`${siteTitle} - ${pageTitle}`} />
                        <meta property="og:title" content={`${siteTitle} - ${pageTitle}`} />
                        <meta property="twitter:title" content={`${siteTitle} - ${pageTitle}`} />
                    </>
                )}

                {description && (
                    <>
                        <meta name="description" content={description} />
                        <meta property="og:description" content={description} />
                        <meta property="twitter:description" content={description} />
                    </>
                )}

                {logoUrl && (
                    <>
                        <meta property="og:image" content={logoUrl} />
                        <meta property="twitter:image" content={logoUrl} />
                    </>
                )}

                {url && (
                    <>
                        <meta property="og:url" content={url} />
                        <meta property="twitter:url" content={url} />
                    </>
                )}

                {/* Structured Data Example */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "http://schema.org",
                            "@type": "WebPage",
                            "name": `${siteTitle} - ${pageTitle}`,
                            "description": description,
                            "url": url,
                            "image": logoUrl,
                        }),
                    }}
                />
            </Head>
            {/* Google tag (gtag.js) */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-BGVLN882LC"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA4_TAG}');
          `,
                }}
            />
        </>
    );
}
