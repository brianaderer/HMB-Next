import components from '../wp-blocks';
import {gql} from '@apollo/client';

const blocks = gql`
  ${components.CoreParagraph.fragments.entry}
  ${components.CoreHeading.fragments.entry}
  ${components.CoreButtons.fragments.entry}
  ${components.CoreButton.fragments.entry}
  ${components.CoreColumns.fragments.entry}
  ${components.CoreColumn.fragments.entry}
  ${components.CoreMediaText.fragments.entry}
  ${components.CoreSeparator.fragments.entry}
  ${components.CoreImage.fragments.entry}
  ${components.AcfGallery.fragments.entry}
  ${components.AcfContactForm.fragments.entry}
  ${components.AcfSignUpForm.fragments.entry}
  ${components.AcfUserInfoForm.fragments.entry}
  ${components.AcfHmbMap.fragments.entry}
  ${components.AcfUploadMediaForm.fragments.entry}
  ${components.CreateBlockAttractions.fragments.entry}
  ${components.AcfGuestBook.fragments.entry}
  ${components.CreateBlockReviews.fragments.entry}
  ${components.CreateBlockGuestbook.fragments.entry}
  ${components.CreateBlockInstagramGallery.fragments.entry}
`
export default blocks;