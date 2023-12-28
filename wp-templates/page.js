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
import {flatListToHierarchical} from "@faustwp/core";
import {pageQuery} from "../queries/pageQuery";

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
  const returnedBlocks = flatListToHierarchical(editorBlocks);

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
          <Container>
            <WordPressBlocksViewer blocks={returnedBlocks}/>
            {/*<ContentWrapper content={content} />*/}
          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = pageQuery;
