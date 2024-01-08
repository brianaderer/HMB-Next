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

  const { title: siteTitle, description: siteDescription, siteLogo } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage } = props?.data?.page ?? { title: '' };
  const parsedSiteLogo = siteLogo?.length > 0 ? JSON.parse(siteLogo) : {};

  const { editorBlocks } = props.data.page;
  const returnedBlocks = flatListToHierarchical(editorBlocks);
  console.log(returnedBlocks);
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
      >
      <Main className={`pb-12`}>
          <Container>
            <WordPressBlocksViewer blocks={returnedBlocks}/>
          </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
      </Header>
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
