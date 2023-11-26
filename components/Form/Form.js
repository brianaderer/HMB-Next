import React, {useState} from "react";
import { FormElements } from '../FormElements';

const { Submit } = FormElements;
const Form = () => {
    // States for contact form fields
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

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

        if (fullname.length <= 0) {
            tempErrors["fullname"] = true;
            isValid = false;
        }
        if (email.length <= 0) {
            tempErrors["email"] = true;
            isValid = false;
        }
        if (subject.length <= 0) {
            tempErrors["subject"] = true;
            isValid = false;
        }
        if (message.length <= 0) {
            tempErrors["message"] = true;
            isValid = false;
        }

        setErrors({ ...tempErrors });
        //console.log("errors", errors);
        return isValid;
    };

    //   Handling form submit

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValidForm = handleValidation();

        if (isValidForm) {
            setButtonText("Sending");
            //console.log(message);
            const res = await fetch("/api/hello", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    fullname: fullname,
                    subject: subject,
                    message: message,
                }),
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
    const labelClasses = "text-gray-500 font-light mt-8 dark:text-gray-50";
    const spanClasses = "text-red-500";
    return (
        <main>
            <form className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-hmbBlue-300 drop-shadow-blueStandard" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold dark:text-gray-50">Send a message</h1>
                <label htmlFor="fullname" className={`${labelClasses}`}>Full name<span className={`${spanClasses}`}>*</span></label>
                <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 dark:text-gray-50"
                />
                <label htmlFor="email" className={`${labelClasses}`}>E-mail<span className={`${spanClasses}`}>*</span></label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 dark:text-gray-50"
                />

                <label htmlFor="subject" className={`${labelClasses}`}>Subject<span className={`${spanClasses}`}>*</span></label>
                <input
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 dark:text-gray-50"
                />

                <label htmlFor="message" className={`${labelClasses}`}>Message<span className={`${spanClasses}`}>*</span></label>
                <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 dark:text-gray-50"
                ></textarea>
                <Submit buttonText={buttonText} />
            </form>

        </main>
    );
}
export default Form;