import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
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
import { pageQuery } from "../queries/pageQuery";
import { WordPressBlocksViewer } from '@faustwp/blocks';
import components from '../wp-blocks';
import {flatListToHierarchical} from "@faustwp/core";

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
      props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage } = props?.data?.page ?? { title: '' };

  const { editorBlocks } = props.data.page;
  const blocks = flatListToHierarchical(editorBlocks);
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  return (
      <>
        <SEO
            title={siteTitle}
            description={siteDescription}
            imageUrl={featuredImage?.node?.sourceUrl}
        />
        <Header
            title={siteTitle}
            description={siteDescription}
            menuItems={primaryMenu}
        />
        <Main>
          <>
            <EntryHeader title={title} image={featuredImage?.node} />
            <Container>
              <WordPressBlocksViewer blocks={blocks}/>
              {/*<ContentWrapper content={content} />*/}
            </Container>
          </>
        </Main>
        <Footer title={siteTitle} menuItems={footerMenu} />
      </>
  );
}
//@TODO need a handler here so that selecting 'latest posts' as the homepage doesn't break it
Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = pageQuery;
