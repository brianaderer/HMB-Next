import React, {useState} from "react";
import { FormElements } from '../FormElements';
import {formatError} from "graphql/error";

const { Submit, FormWrapper } = FormElements;
const Form = props => {
    const {fieldsData} = props;
    // States for contact form fields
    const [values, setValues] = useState([]);

    //   Form validation state
    const [errors, setErrors] = useState({});

    //   Setting button text on form submission
    const [buttonText, setButtonText] = useState("Send");

    // Setting success or failure messages states
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

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

    //   Handling form submit

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValidForm = handleValidation();

        if (isValidForm) {
            setButtonText("Sending");
            const res = await fetch("/api/hello", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });

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
        }
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
                        if ( FormElements[E] ){
                            Elem = FormElements[E];
                        } else {
                            return <h1>We could not find that form element</h1>
                        }
                        return (
                            <Elem key={index} slug={slug} classes={classes} options={options} title={label} required={true} value={values[slug] || ''} handler={handleValues} />
                        )
                    })
                }
                {/*<FormElements.Text slug={'fullName'} classes={classes} handler={setFullname} value={fullname} title={'Full Name'} required={true}/>*/}
                {/*<FormElements.Email slug={'email'}  classes={classes} handler={setEmail} value={email} title={'Email'} required={true}/>*/}
                {/*<FormElements.Text slug={'subject'} classes={classes} handler={setSubject} value={subject} title={'Subject'} required={true}/>*/}
                {/*<FormElements.Textarea slug={'message'} classes={classes} handler={setMessage} value={message} title={'Message'} required={true}/>*/}
                {/*<FormElements.Select options={{foo: 'bar', baz: 'bap'}}/>*/}
                <Submit buttonText={buttonText} />
        </FormWrapper>
    );
}
export default Form;