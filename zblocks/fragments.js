import components from '../wp-blocks';
const fragments = `        
        ...${components.CoreParagraph.fragments.key}
        ...${components.CoreHeading.fragments.key}
        ...${components.CoreButtons.fragments.key}
        ...${components.CoreButton.fragments.key}
        ...${components.CoreColumns.fragments.key}
        ...${components.CoreColumn.fragments.key}
        ...${components.CoreSeparator.fragments.key}
        ...${components.CoreMediaText.fragments.key}
        ...${components.CoreImage.fragments.key}
        ...${components.CoreList.fragments.key}
        ...${components.AcfGallery.fragments.key}
        ...${components.AcfContactForm.fragments.key}
        ...${components.AcfSignUpForm.fragments.key}
        ...${components.AcfUserInfoForm.fragments.key}
        ...${components.AcfHmbMap.fragments.key}
        ...${components.AcfUploadMediaForm.fragments.key}
        ...${components.CreateBlockAttractions.fragments.key}
        ...${components.AcfGuestBook.fragments.key}
        ...${components.CreateBlockReviews.fragments.key}
        ...${components.CreateBlockGuestbook.fragments.key}
        ...${components.CreateBlockInstagramGallery.fragments.key}`;

export default fragments;