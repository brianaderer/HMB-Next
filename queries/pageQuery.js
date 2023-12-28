import {gql} from "@apollo/client";
import {BlogInfoFragment} from "../fragments/GeneralSettings";
import {FeaturedImage, NavigationMenu} from "../components";
import components from "../wp-blocks";

export const pageQuery = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  ${components.CoreParagraph.fragments.entry}
  ${components.AcfGallery.fragments.entry}
  ${components.AcfTransientContactForm.fragments.entry}
  ${components.AcfSignUpForm.fragments.entry}
  ${components.AcfUserInfoForm.fragments.entry}
  ${components.AcfUploadMediaForm.fragments.entry}
  ${components.CreateBlockAttractions.fragments.entry}
  ${components.AcfGuestBook.fragments.entry}
  ${components.CreateBlockReviews.fragments.entry}
  ${components.CreateBlockInstagramGallery.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      editorBlocks(flat: false) {
        __typename
        renderedHtml
        id: clientId
        parentClientId
        ...${components.CoreParagraph.fragments.key}
        ...${components.AcfGallery.fragments.key}
        ...${components.AcfTransientContactForm.fragments.key}
        ...${components.AcfSignUpForm.fragments.key}
        ...${components.AcfUserInfoForm.fragments.key}
        ...${components.AcfUploadMediaForm.fragments.key}
        ...${components.CreateBlockAttractions.fragments.key}
        ...${components.AcfGuestBook.fragments.key}
        ...${components.CreateBlockReviews.fragments.key}
        ...${components.CreateBlockInstagramGallery.fragments.key}
      }
      ...FeaturedImageFragment
    }
    generalSettings {
      ...BlogInfoFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;