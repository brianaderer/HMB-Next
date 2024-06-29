import * as MENUS from '../constants/menus';
import {
    Header,
    Footer,
    Main,
    Container,
    EntryHeader,
    NavigationMenu,
    FeaturedImage,
    SEO,
} from '../components';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical } from '@faustwp/core';
import { pageQuery } from '../queries/pageQuery';

// Existing Component
export default function Component(props) {
    if (props.loading) {
        return <>Loading...</>;
    }

    const { title: siteTitle, description: siteDescription, siteLogo } =
        props?.data?.generalSettings;
    const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
    const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
    const { title, content, featuredImage } = props?.data?.page ?? { title: '' };
    const parsedSiteLogo = siteLogo?.length > 0 ? JSON.parse(siteLogo) : {};

    const { editorBlocks } = props.data.page;
    const returnedBlocks = flatListToHierarchical(editorBlocks);

    return (
        <>
            <SEO
                title={siteTitle}
                description={siteDescription}
                imageUrl={featuredImage?.node?.sourceUrl}
            />
            <Header
                siteLogo={parsedSiteLogo}
                title={siteTitle}
                description={siteDescription}
                menuItems={primaryMenu}
            />
            <Main className={`pb-12`}>
                <Container>
                    <WordPressBlocksViewer blocks={returnedBlocks}/>
                </Container>
            </Main>
            <Footer title={siteTitle} menuItems={footerMenu} />
        </>
    );
}

// Variables for getStaticProps
Component.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        headerLocation: MENUS.PRIMARY_LOCATION,
        footerLocation: MENUS.FOOTER_LOCATION,
        asPreview: ctx?.asPreview,
    };
};

// GraphQL query
Component.query = pageQuery;

// Add getStaticPaths function
export async function getStaticPaths() {
    // Fetch all slugs for the paths
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE}/${process.env.GRAPHQL_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                {
                    posts(first: 100) {
                        nodes {
                            slug
                        }
                    }
                }
            `,
        }),
    });

    const json = await res.json();
    const paths = json.data.posts.nodes.map(post => ({
        params: { slug: post.slug },
    }));

    return {
        paths,
        fallback: 'blocking', // or 'true' or 'false' based on your preference
    };
}
