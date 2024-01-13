import React, {useContext, useEffect, useState} from "react";
import { FormElements } from '../FormElements';
import {AuthContext} from "../../contexts";

const { Submit, FormWrapper } = FormElements;
const Form = props => {
    const authContext = useContext( AuthContext );
    const {user, setUser, signIn, signOut, dbUser, setDbUser, checkUser, updateUserDb} = authContext || {};
    const {fieldsData, submitter, headline, referrer} = props;
    const time = new Date();
    // States for contact form fields
    const [values, setValues] = useState({});
    const [images, setImages] = useState([]);
    //   Form validation state
    const [errors, setErrors] = useState({});
    //   Setting button text on form submission
    const defaultButtonText = 'Send It!';
    const [buttonText, setButtonText] = useState(defaultButtonText);

    // Setting success or failure messages states
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    //   Handling form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // let isValidForm = handleValidation();
        // if (isValidForm) {
        //     setButtonText("Sending");
        //     await uploadFiles(images);
        // }
        setButtonText("Sending");
        await uploadFiles(images);
    };
    // Validation check method
    const handleValidation = () => {
        let tempErrors = {};
        let isValid = true;
        Object.keys(values)?.map((key) => {
            if (values[key].length <= 0) {
                tempErrors[key] = true;
                isValid = false;
            }
        })
        setErrors({ ...tempErrors });
        return isValid;
    };
    useEffect(() => {
        const {'image-gallery': imageGallery, ...restOfDbUser} = dbUser;
        setValues({
            ...restOfDbUser,
            uid: user?.uid,
            title: user?.displayName + ' at ' + time
        });
    }, [user, dbUser]);
    function slugify(str) {
        return String(str)
            .normalize('NFKD') // split accented characters into their base characters and diacritical marks
            .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
            .trim() // trim leading or trailing whitespace
            .toLowerCase() // convert to lowercase
            .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
    }
    const uploadFiles = async (files) => {
        const uploadPromises = files.map(async file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('caption', file.caption);
            formData.append('uuid', user.uid);
            formData.append('uploaded_by', user.displayName);

            try {
                const response = await fetch('/api/uploads', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log('Upload successful:', result);
                return result.data.id; // return the id from each upload
            } catch (error) {
                console.error('Upload error:', error);
                return null; // return null or handle the error as needed
            }
        });

        try {
            const uploadedIds = await Promise.all(uploadPromises);
            return new Promise(resolve => {
                const validIds = uploadedIds.filter(id => id != null); // Filter out null values (failed uploads)
                setImages([]);
                const newImages = addImageIds({ids: validIds});
                handleValues({slug: 'image-gallery', value: newImages});
                setUploadComplete(true);
                resolve();
            });
        } catch (error) {
            console.error('Error in uploading files:', error);
        }
    };
    useEffect( () => {
        handleUpload().then(()=>{});
    }, [uploadComplete, values]); // Depend on uploadComplete and values
    const addImageIds = props => {
        const { ids } = props;
        const newImageGallery = [...(values['image-gallery'] || [])];
        ids.forEach(id => {
            newImageGallery.push(id);
        });
        return newImageGallery;
    }

    const handleUpload = async () => {
        if (uploadComplete) {
            const res = await submitter(values);
            const { error } = await res.json();
            if (error) {
                setShowSuccessMessage(false);
                setShowFailureMessage(true);
                setButtonText(defaultButtonText);
                return () => {};
            }
            setShowSuccessMessage(true);
            setShowFailureMessage(false);
            setButtonText(defaultButtonText);

            // Reset the flag
            setUploadComplete(false);
            setValues({
                uid: user?.uid,
                title: user?.displayName + ' at ' + time
            });
            checkUser();
            mapDbUser();
        }
    }

    function handleValues({ value, slug }) {
        setValues(prevValues => ({
            ...prevValues,
            [slug]: value
        }));
    }
    const mapDbUser = props => {
        if(dbUser){
            Object.keys(dbUser).map( key => {
                if( key !== 'image-gallery' ) {
                    handleValues({value: dbUser[key], slug: key});
                }
            })
        }
    };
    useEffect(() => {
        mapDbUser();
    }, [dbUser]);
    const labelClasses = "label-text";
    const spanClasses = "text-red-500";
    const inputClasses = "input input-bordered input-primary";
    const textAreaClasses = "textarea textarea-primary";
    const selectClasses = "select select-primary";
    const classes = {selectClasses, labelClasses, spanClasses, inputClasses, textAreaClasses};
    const {formHeadline, fields, anchor} = fieldsData;
    return (
            <FormWrapper className={`my-12`} anchor={anchor} handleSubmit={handleSubmit} prompt={formHeadline ? formHeadline : 'Send us a message'}>
                {
                    Object.keys(fields).map((field, index) => {
                        const {type, label, ...otherProps} = (fields[field]);
                        const E = type.charAt(0).toUpperCase() +  type.slice(1);
                        const {value, options, placeholder, message, required} = otherProps;
                        const slug = slugify(label);
                        let Elem;
                        if( fields[field].display ) {
                            if (FormElements[E]) {
                                Elem = FormElements[E];
                            }
                            else {
                                return <h1 key={index}>We could not find {E} form element</h1>
                            }
                            if(E !== 'Gallery') {
                                return (
                                    <Elem message={message} key={index} slug={slug} classes={classes} options={options} title={label}
                                          required={required} value={values[slug] || ''} handler={handleValues}/>
                                )
                            } else {
                                return (
                                    <Elem  message={referrer === 'GuestBook' ? `Would you like to share some images with your post?`: ''} key={index} slug={slug} classes={classes} options={options} title={label}
                                          required={required} setState={setImages} state={images}/>
                                )
                            }
                        }
                    })
                }
                <Submit buttonText={buttonText} />
        </FormWrapper>
    );
}
export default Form;