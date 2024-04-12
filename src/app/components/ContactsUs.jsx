"use client";
import { useState } from 'react';
import '../globals.css'
import { LocationIcon, MailIcon, TelIcon } from './Common'
import emailjs from '@emailjs/browser';
const ContactsUs = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        number: "",
        mail: "",
        msg: "",
    });
    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        number: "",
        mail: "",
        msg: "",
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const regex = {
            name: /^[a-zA-Z\s]+$/,
            mail: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            number: /^\d{10}$/,
        };
        const errors = {};
        // console.log(errors);
        if (!regex.name.test(formData.firstName)) {
            errors.firstName = "First Name is invalid.";
        }
        if (!regex.name.test(formData.lastName)) {
            errors.lastName = "Last Name is invalid.";
        }
        if (!regex.mail.test(formData.mail)) {
            errors.mail = "Gmail is invalid.";
        }
        if (!regex.number.test(formData.number)) {
            errors.number = "Number is invalid.";
        }
        if (!regex.name.test(formData.msg)) {
            errors.msg = "write your massege";
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            emailjs.sendForm('service_29d4v7n', 'template_pbr1t4p', e.target, 'lx417-9z_PTKeaRVv')
                .then(
                    (result) => { console.log(result.text); },
                    (error) => { console.log(error.text); },
                );
            emailjs.send("service_29d4v7n", "template_pbr1t4p", {
                from_Deepak: formData.firstName + ' ' + formData.lastName,
                to_name: "Deepak",
                from_name: formData.firstName + ' ' + formData.lastName,
                message: formData.msg,
            }, 'lx417-9z_PTKeaRVv');
            setShowSuccessPopup(true);
            document.body.classList.add("overflow-hidden")
        }
    };
    const handlePopupClose = () => {
        document.body.classList.remove("overflow-hidden")
        setShowSuccessPopup(false);
        setFormData({
            firstName: "",
            lastName: "",
            number: "",
            mail: "",
            msg: "",
        });
        setFormErrors({
            firstName: "",
            lastName: "",
            number: "",
            mail: "",
            msg: "",
        });
    };
    return (
        <div className=" container mx-auto max-w-[1140px] w-full mt-20">
            <h1 className="font-sans text-4xl font-bold text-center text-black">Contact Us</h1>
            <p className="font-sans text-lg font-normal text-[#717171] mt-4 text-center">Any question or remarks? Just write us a message!</p>
            <div className="grid grid-col-1 md:grid-cols-7 p-3 mt-10 rounded-sm md:min-h-[650px] w-full">
                <div className="md:col-span-3 p-10 bg-black rounded-md md:max-w-[500px] mr-3 md:mr-0">
                    <h2 className='font-sans text-2xl font-semibold text-white'>Contact Information</h2>
                    <p className='font-sans text-lg font-normal text-[#C9C9C9] mt-4'>Say something to start a live chat!</p>
                    <a className='flex items-center gap-6 mt-20 font-sans text-lg text-white' href="tel:+1012 3456 789"><span><TelIcon /></span>+1012 3456 789</a>
                    <a className='flex items-center gap-6 mt-10 font-sans text-lg text-white' href="mail"><span><MailIcon /></span>demo@gmail.com</a>
                    <a className='flex items-start gap-6 mt-10 font-sans text-lg text-white max-w-[288px]' href="mail"><span><LocationIcon /></span>132 Dartmouth Street Boston, Massachusetts 02156 United States</a>
                </div>
                <div className='p-12 md:col-span-4'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex w-full gap-10'>
                            <div className='flex flex-col w-1/2'>
                                <label htmlFor="firstName" className='text-[#8D8D8D] font-sans font-medium text-xs'>First Name</label>
                                <input className={`py-2 border-b border-black outline-none ${formErrors.firstName ? "border-red-200" : ""}`} type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />
                                {formErrors.firstName && (<p className="error-message">{formErrors.firstName}</p>)}
                            </div>
                            <div className='flex flex-col w-1/2'>
                                <label htmlFor="name" className='text-[#8D8D8D] font-sans font-medium text-xs'>Last Name</label>
                                <input className={`py-2 border-b border-black outline-none ${formErrors.firstName ? "border-red-200" : ""}`} type="text" name="lastName" id="" value={formData.lastName} onChange={handleChange} />
                                {formErrors.lastName && (<p className="error-message">{formErrors.lastName}</p>)}
                            </div>
                        </div>
                        <div className='flex w-full gap-10 mt-10'>
                            <div className='flex flex-col w-1/2'>
                                <label htmlFor="name" className='text-[#8D8D8D] font-sans font-medium text-xs'>Email</label>
                                <input className={`py-2 border-b border-black outline-none ${formErrors.firstName ? "border-red-200" : ""}`} type="text" name="mail" id="" value={formData.mail} onChange={handleChange} />
                                {formErrors.mail && (<p className="error-message">{formErrors.mail}</p>)}
                            </div>
                            <div className='flex flex-col w-1/2'>
                                <label htmlFor="name" className='text-[#8D8D8D] font-sans font-medium text-xs'>Phone Number</label>
                                <input className={`py-2 border-b border-black outline-none ${formErrors.firstName ? "border-red-200" : ""}`} type="text" name="number" id="" value={formData.number} onChange={handleChange} />
                                {formErrors.number && (<p className="error-message">{formErrors.number}</p>)}
                            </div>
                        </div>
                        <div className='flex flex-col mt-10'>
                            <label htmlFor="name" className='text-[#8D8D8D] font-sans font-medium text-xs'>Message</label>
                            <input className={`py-2 border-b border-black outline-none placeholder:text-[#8D8D8D] pt-5 ${formErrors.msg ? "border-red-200" : ""}`} type="text" name="msg" id="" placeholder='Write your message..' value={formData.msg} onChange={handleChange} />
                            {formErrors.msg && (<p className="error-message">{formErrors.msg}</p>)}
                        </div>
                        <p className='mt-10 font-sans text-xl font-medium text-black'>Select Subject?</p>
                        <div className='flex items-center gap-10'>
                            <div className='flex items-center gap-3 pt-5'>
                                <input className='bg-black' type="checkbox" name="" id="chaeckbox" /><label htmlFor='chaeckbox' className='font-sans text-sm font-medium text-black'>General Inquiry</label>
                            </div>
                            <div className='flex items-center gap-3 pt-5'>
                                <input className='bg-black' type="checkbox" name="" id="chaeckbox2" /><label htmlFor='chaeckbox2' className='font-sans text-sm font-medium text-black'>Course Related Inquiry</label>
                            </div>
                        </div>
                        <div className='flex justify-end mt-10'>
                            <button type='submit' className='px-10 py-3 font-sans text-base font-medium text-white bg-black rounded-md'>Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
            {showSuccessPopup && (
                <div className='fixed p-10 bg-white rounded-xl min-h-[300px] max-w-[500px] w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                    <div className="py-20">
                        <p className='font-sans text-3xl font-bold text-center text-black'>Contact Information submitted successfully!</p>
                        <button className='flex px-10 py-3 mx-auto mt-10 font-sans text-base font-medium text-white bg-black rounded-md' onClick={handlePopupClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContactsUs
