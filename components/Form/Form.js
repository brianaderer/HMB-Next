import React, {useContext, useEffect, useState} from "react";
import { FormElements } from '../FormElements';
import {AuthContext} from "../../contexts";

const { Submit, FormWrapper } = FormElements;
const Form = props => {
    const {user, setUser, signIn, signOut} = useContext( AuthContext );
    const {fieldsData, submitter} = props;
    const time = new Date();
    // States for contact form fields
    const [values, setValues] = useState({
        title: user?.displayName + ' at ' + time,
    });
    const [images, setImages] = useState([]);
    //   Form validation state
    const [errors, setErrors] = useState({});

    //   Setting button text on form submission
    const [buttonText, setButtonText] = useState("Send");

    // Setting success or failure messages states
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);


    //   Handling form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValidForm = handleValidation();

        if (isValidForm) {
            setButtonText("Sending");
            await uploadFiles(images);
        }
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
            const validIds = uploadedIds.filter(id => id != null); // Filter out null values (failed uploads)
            setImages([]);
            handleValues({slug: 'boat_images', value: validIds});
            return new Promise(resolve => {
                setUploadComplete(true);
                resolve();
            });
        } catch (error) {
            console.error('Error in uploading files:', error);
        }
    };
    useEffect(async () => {
        if (uploadComplete) {
            const res = await submitter(values);
            const { error } = await res.json();
            if (error) {
                setShowSuccessMessage(false);
                setShowFailureMessage(true);
                setButtonText("Send");
                return;
            }
            setShowSuccessMessage(true);
            setShowFailureMessage(false);
            setButtonText("Send");

            // Reset the flag
            setUploadComplete(false);
            setValues([]);
        }
    }, [uploadComplete, values]); // Depend on uploadComplete and values


    function handleValues({ value, slug }) {
        setValues(prevValues => ({
            ...prevValues,
            [slug]: value
        }));
    }
    const labelClasses = "text-gray-500 font-light mt-8 dark:text-gray-50";
    const spanClasses = "text-red-500";
    const inputClasses = "bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 dark:text-gray-50";
    const classes = {labelClasses, spanClasses, inputClasses};
    return (
            <FormWrapper handleSubmit={handleSubmit} prompt={'Send Us a Message'}>
                {
                    Object.keys(fieldsData).map((field, index) => {
                        const {type, label, ...otherProps} = (fieldsData[field]);
                        const E = type.charAt(0).toUpperCase() +  type.slice(1);
                        const {value, options, placeholder} = otherProps;
                        const slug = slugify(label);
                        let Elem;
                        if( fieldsData[field].display ) {
                            if (FormElements[E]) {
                                Elem = FormElements[E];
                            }
                            else {
                                return <h1 key={index}>We could not find that form element</h1>
                            }
                            if(E !== 'Gallery') {
                                return (
                                    <Elem key={index} slug={slug} classes={classes} options={options} title={label}
                                          required={true} value={values[slug] || ''} handler={handleValues}/>
                                )
                            } else {
                                return (
                                    <Elem key={index} slug={slug} classes={classes} options={options} title={label}
                                          required={true} setState={setImages} state={images}/>
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