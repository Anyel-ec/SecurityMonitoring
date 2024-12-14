import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';

const Validation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Validation'));
    });
    const submitForm = () => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Form submitted successfully',
            padding: '10px 20px',
        });
    };

    const submitForm4 = Yup.object().shape({
        firstname: Yup.string().required('Please fill the first name'),
        lastname: Yup.string().required('Please fill the last name'),
        username: Yup.string().required('Please choose a userName'),
        city: Yup.string().required('Please provide a valid city'),
        state: Yup.string().required('Please provide a valid state'),
        zip: Yup.string().required('Please provide a valid zip'),
        agree: Yup.bool().oneOf([true], 'You must agree before submitting.'),
    });

    const SubmittedForm = Yup.object().shape({
        fullName: Yup.string().required('Please fill the Name'),
        email: Yup.string().email('Invalid email').required('Please fill the Email'),
        color: Yup.string().required('Please Select the field'),
        firstname: Yup.string().required('Please fill the first name'),
        lastname: Yup.string().required('Please fill the last name'),
        username: Yup.string().required('Please choose a userName'),
        city: Yup.string().required('Please provide a valid city'),
        state: Yup.string().required('Please provide a valid state'),
        zip: Yup.string().required('Please provide a valid zip'),
        agree: Yup.string().required('You must agree before submitting.'),
        select: Yup.string().required('Please Select the field'),
    });

    const [codeArr, setCodeArr] = useState([]);

    const toggleCode = (name) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Validation</span>
                </li>
            </ul>

            <div className="pt-5 space-y-8">
                <div className="panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap">
                    <div className="ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://www.npmjs.com/package/formik" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://www.npmjs.com/package/formik
                    </a>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Basic */}
                    <div className="panel" id="basic">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Basic</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>

                        <div className="mb-5">
                            <Formik
                                initialValues={{
                                    fullName: '',
                                }}
                                validationSchema={SubmittedForm}
                                onSubmit={() => {}}
                            >
                                {({ errors, submitCount, touched }) => (
                                    <Form className="space-y-5">
                                        <div className={submitCount ? (errors.fullName ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="fullName">Full Name </label>
                                            <Field name="fullName" type="text" id="fullName" placeholder="Enter Full Name" className="form-input" />

                                            {submitCount ? errors.fullName ? <div className="text-danger mt-1">{errors.fullName}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary !mt-6"
                                            onClick={() => {
                                                if (touched.fullName && !errors.fullName) {
                                                    submitForm();
                                                }
                                            }}
                                        >
                                            Submit Form
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        {codeArr.includes('code1') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
const submitForm = () => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: 'Form submitted successfully',
        padding: '10px 20px',
    });
};

const SubmittedForm = Yup.object().shape({
    fullName: Yup.string().required('Please fill the Name'),
});

<Formik
    initialValues={{
        fullName: '',
    }}
    validationSchema={SubmittedForm}
    onSubmit={() => {}}
>
    {({ errors, submitCount, touched }) => (
        <Form className="space-y-5">
            <div className={submitCount ? (errors.fullName ? 'has-error' : 'has-success') : ''}>
                <label htmlFor="fullName">Full Name </label>
                <Field name="fullName" type="text" id="fullName" placeholder="Enter Full Name" className="form-input" />

                {submitCount ? errors.fullName ? <div className="text-danger mt-1">{errors.fullName}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
            </div>
            <button
                type="submit"
                className="btn btn-primary !mt-6"
                onClick={() => {
                    if (touched.fullName && !errors.fullName) {
                        submitForm();
                    }
                }}
            >
                Submit Form
            </button>
        </Form>
    )}
</Formik>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Email */}
                    <div className="panel" id="email">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Email</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <Formik
                                initialValues={{
                                    email: '',
                                }}
                                validationSchema={SubmittedForm}
                                onSubmit={() => {}}
                            >
                                {({ errors, submitCount, touched }) => (
                                    <Form className="space-y-5">
                                        <div className={submitCount ? (errors.email ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="Email">Email</label>
                                            <Field name="email" type="text" id="Email" placeholder="Enter Email" className="form-input" />

                                            {submitCount ? errors.email ? <div className="text-danger mt-1">{errors.email}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary !mt-6"
                                            onClick={() => {
                                                if (touched.email && !errors.email) {
                                                    submitForm();
                                                }
                                            }}
                                        >
                                            Submit Form
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                        {codeArr.includes('code2') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
const submitForm = () => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: 'Form submitted successfully',
        padding: '10px 20px',
    });
};

const SubmittedForm = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please fill the Email'),
});

<Formik
    initialValues={{
        email: '',
    }}
    validationSchema={SubmittedForm}
    onSubmit={() => {}}
>
    {({ errors, submitCount, touched }) => (
        <Form className="space-y-5">
            <div className={submitCount ? (errors.email ? 'has-error' : 'has-success') : ''}>
                <label htmlFor="Email">Email</label>
                <Field name="email" type="text" id="Email" placeholder="Enter Email" className="form-input" />

                {submitCount ? errors.email ? <div className="text-danger mt-1">{errors.email}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
            </div>
            <button
                type="submit"
                className="btn btn-primary !mt-6"
                onClick={() => {
                    if (touched.email && !errors.email) {
                        submitForm();
                    }
                }}
            >
                Submit Form
            </button>
        </Form>
    )}
</Formik>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Select */}
                    <div className="panel" id="select">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Select</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <Formik
                                initialValues={{
                                    select: '',
                                }}
                                validationSchema={SubmittedForm}
                                onSubmit={() => {}}
                            >
                                {({ errors, submitCount, touched }) => (
                                    <Form className="space-y-5">
                                        <div className={submitCount ? (errors.select ? 'has-error' : 'has-success') : ''}>
                                            <Field as="select" name="select" className="form-select">
                                                <option value="">Open this select menu</option>
                                                <option value="One">One</option>
                                                <option value="Two">Two</option>
                                                <option value="Three">Three</option>
                                            </Field>
                                            {submitCount ? (
                                                errors.select ? (
                                                    <div className=" text-danger mt-1">{errors.select}</div>
                                                ) : (
                                                    <div className=" text-[#1abc9c] mt-1">Example valid custom select feedback</div>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary !mt-6"
                                            onClick={() => {
                                                if (touched.select && !errors.select) {
                                                    submitForm();
                                                }
                                            }}
                                        >
                                            Submit Form
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        {codeArr.includes('code3') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
const submitForm = () => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: 'Form submitted successfully',
        padding: '10px 20px',
    });
};

const SubmittedForm = Yup.object().shape({
    select: Yup.string().required('Please Select the field'),
});

<Formik
    initialValues={{
        select: '',
    }}
    validationSchema={SubmittedForm}
    onSubmit={() => {}}
>
    {({ errors, submitCount, touched }) => (
        <Form className="space-y-5">
            <div className={submitCount ? (errors.select ? 'has-error' : 'has-success') : ''}>
                <Field as="select" name="select" className="form-select">
                    <option value="">Open this select menu</option>
                    <option value="One">One</option>
                    <option value="Two">Two</option>
                    <option value="Three">Three</option>
                </Field>
                {submitCount ? (
                    errors.select ? (
                        <div className=" text-danger mt-1">{errors.select}</div>
                    ) : (
                        <div className=" text-[#1abc9c] mt-1">Example valid custom select feedback</div>
                    )
                ) : (
                    ''
                )}
            </div>
            <button
                type="submit"
                className="btn btn-primary !mt-6"
                onClick={() => {
                    if (touched.select && !errors.select) {
                        submitForm();
                    }
                }}
            >
                Submit Form
            </button>
        </Form>
    )}
</Formik>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Custom Styles */}
                    <div className="panel" id="custom_styles">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Custom Styles</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <Formik
                                initialValues={{
                                    firstname: 'Shaun',
                                    lastname: 'Park',
                                    username: '',
                                    city: '',
                                    state: '',
                                    zip: '',
                                    agree: false,
                                }}
                                validationSchema={submitForm4}
                                onSubmit={() => {}}
                            >
                                {({ errors, submitCount, touched, values }) => (
                                    <Form className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className={submitCount ? (errors.firstname ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="firstname">First Name </label>
                                                <Field name="firstname" type="text" id="firstname" placeholder="Enter First Name" className="form-input" />

                                                {submitCount ? (
                                                    errors.firstname ? (
                                                        <div className="text-danger mt-1">{errors.firstname}</div>
                                                    ) : (
                                                        <div className="text-success mt-1">Looks Good!</div>
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </div>

                                            <div className={submitCount ? (errors.lastname ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="fullName">Last Name </label>
                                                <Field name="lastname" type="text" id="lastname" placeholder="Enter Last Name" className="form-input" />

                                                {submitCount ? errors.lastname ? <div className="text-danger mt-1">{errors.lastname}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                            </div>

                                            <div className={submitCount ? (errors.username ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="username">Username</label>
                                                <div className="flex">
                                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                        @
                                                    </div>
                                                    <Field name="username" type="text" id="username" placeholder="Enter Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                </div>
                                                {submitCount ? errors.username ? <div className="text-danger mt-1">{errors.username}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                            <div className={`md:col-span-2 ${submitCount ? (errors.city ? 'has-error' : 'has-success') : ''}`}>
                                                <label htmlFor="customeCity">City</label>
                                                <Field name="city" type="text" id="city" placeholder="Enter City" className="form-input" />

                                                {submitCount ? errors.city ? <div className="text-danger mt-1">{errors.city}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                            </div>

                                            <div className={submitCount ? (errors.state ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="customeState">State</label>
                                                <Field name="state" type="text" id="customeState" placeholder="Enter State" className="form-input" />
                                                {submitCount ? errors.state ? <div className="text-danger mt-1">{errors.state}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                            </div>

                                            <div className={submitCount ? (errors.zip ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="customeZip">Zip</label>
                                                <Field name="zip" type="text" id="customeZip" placeholder="Enter Zip" className="form-input" />
                                                {submitCount ? errors.zip ? <div className="text-danger mt-1">{errors.zip}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                            </div>
                                        </div>

                                        <div className={submitCount ? (errors.agree ? 'has-error' : 'has-success') : ''}>
                                            <div className="flex">
                                                <Field name="agree" id="agree" type="checkbox" className="form-checkbox" />
                                                {values.agree}
                                                <label htmlFor="agree" className="text-white-dark font-semibold">
                                                    Agree to terms and conditions
                                                </label>
                                            </div>
                                            {submitCount ? errors.agree ? <div className="text-danger mt-1">{errors.agree}</div> : '' : ''}
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary !mt-6"
                                            onClick={() => {
                                                if (Object.keys(touched).length !== 0 && Object.keys(errors).length === 0) {
                                                    submitForm();
                                                }
                                            }}
                                        >
                                            Submit Form
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        {codeArr.includes('code4') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
const submitForm = () => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: 'Form submitted successfully',
        padding: '10px 20px',
    });
};

const submitForm4 = Yup.object().shape({
    firstname: Yup.string().required('Please fill the first name'),
    lastname: Yup.string().required('Please fill the last name'),
    username: Yup.string().required('Please choose a userName'),
    city: Yup.string().required('Please provide a valid city'),
    state: Yup.string().required('Please provide a valid state'),
    zip: Yup.string().required('Please provide a valid zip'),
    agree: Yup.bool().oneOf([true], 'You must agree before submitting.'),
});

<Formik
    initialValues={{
        firstname: 'Shaun',
        lastname: 'Park',
        username: '',
        city: '',
        state: '',
        zip: '',
        agree: false,
    }}
    validationSchema={submitForm4}
    onSubmit={() => {}}
>
    {({ errors, submitCount, touched, values }) => (
        <Form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className={submitCount ? (errors.firstname ? 'has-error' : 'has-success') : ''}>
                    <label htmlFor="firstname">First Name </label>
                    <Field name="firstname" type="text" id="firstname" placeholder="Enter First Name" className="form-input" />

                    {submitCount ? (
                        errors.firstname ? (
                            <div className="text-danger mt-1">{errors.firstname}</div>
                        ) : (
                            <div className="text-success mt-1">Looks Good!</div>
                        )
                    ) : (
                        ''
                    )}
                </div>

                <div className={submitCount ? (errors.lastname ? 'has-error' : 'has-success') : ''}>
                    <label htmlFor="fullName">Last Name </label>
                    <Field name="lastname" type="text" id="lastname" placeholder="Enter Last Name" className="form-input" />

                    {submitCount ? errors.lastname ? <div className="text-danger mt-1">{errors.lastname}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                </div>

                <div className={submitCount ? (errors.username ? 'has-error' : 'has-success') : ''}>
                    <label htmlFor="username">Username</label>
                    <div className="flex">
                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                            @
                        </div>
                        <Field name="username" type="text" id="username" placeholder="Enter Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                    </div>
                    {submitCount ? errors.username ? <div className="text-danger mt-1">{errors.username}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className={\`md:col-span-2 \${submitCount ? (errors.city ? 'has-error' : 'has-success') : ''}\`}>
                    <label htmlFor="customeCity">City</label>
                    <Field name="city" type="text" id="city" placeholder="Enter City" className="form-input" />

                    {submitCount ? errors.city ? <div className="text-danger mt-1">{errors.city}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                </div>

                <div className={submitCount ? (errors.state ? 'has-error' : 'has-success') : ''}>
                    <label htmlFor="customeState">State</label>
                    <Field name="state" type="text" id="customeState" placeholder="Enter State" className="form-input" />
                    {submitCount ? errors.state ? <div className="text-danger mt-1">{errors.state}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                </div>

                <div className={submitCount ? (errors.zip ? 'has-error' : 'has-success') : ''}>
                    <label htmlFor="customeZip">Zip</label>
                    <Field name="zip" type="text" id="customeZip" placeholder="Enter Zip" className="form-input" />
                    {submitCount ? errors.zip ? <div className="text-danger mt-1">{errors.zip}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                </div>
            </div>

            <div className={submitCount ? (errors.agree ? 'has-error' : 'has-success') : ''}>
                <div className="flex">
                    <Field name="agree" id="agree" type="checkbox" className="form-checkbox" />
                    {values.agree}
                    <label htmlFor="agree" className="text-white-dark font-semibold">
                        Agree to terms and conditions
                    </label>
                </div>
                {submitCount ? errors.agree ? <div className="text-danger mt-1">{errors.agree}</div> : '' : ''}
            </div>

            <button
                type="submit"
                className="btn btn-primary !mt-6"
                onClick={() => {
                    if (Object.keys(touched).length !== 0 && Object.keys(errors).length === 0) {
                        submitForm();
                    }
                }}
            >
                Submit Form
            </button>
        </Form>
    )}
</Formik>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* <!-- Browser Default --> */}
                    <div className="panel" id="browser_default">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Browser Default</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code5')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <form
                                className="space-y-5"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    submitForm();
                                }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div>
                                        <label htmlFor="browserFname">First Name</label>
                                        <input id="browserFname" type="text" placeholder="Enter First Name" className="form-input" required />
                                    </div>
                                    <div>
                                        <label htmlFor="browserLname">Last name</label>
                                        <input id="browserLname" type="text" placeholder="Enter Last name" className="form-input" required />
                                    </div>
                                    <div>
                                        <label htmlFor="browserEmail">Username</label>
                                        <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                @
                                            </div>
                                            <input id="browserEmail" type="text" placeholder="Enter Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                    <div className="md:col-span-2">
                                        <label htmlFor="browserCity">City</label>
                                        <input id="browserCity" type="text" placeholder="Enter City" className="form-input" required />
                                    </div>
                                    <div>
                                        <label htmlFor="browserState">State</label>
                                        <input id="browserState" type="text" placeholder="Enter State" className="form-input" required />
                                    </div>
                                    <div>
                                        <label htmlFor="browserZip">Zip</label>
                                        <input id="browserZip" type="text" placeholder="Enter Zip" className="form-input" required />
                                    </div>
                                </div>
                                <div className="flex items-center cursor-pointer mt-1">
                                    <input type="checkbox" id="agree1" className="form-checkbox" required />
                                    <label htmlFor="agree1" className="text-white-dark font-semibold mb-0">
                                        Agree to terms and conditions
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary !mt-6">
                                    Submit Form
                                </button>
                            </form>
                        </div>
                        {codeArr.includes('code5') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import Swal from 'sweetalert2';
const submitForm = () => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: 'Form submitted successfully',
        padding: '10px 20px',
    });
};

<form
    className="space-y-5"
    onSubmit={(e) => {
        e.preventDefault();
        submitForm();
    }}
>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
            <label htmlFor="browserFname">First Name</label>
            <input id="browserFname" type="text" placeholder="Enter First Name" className="form-input" required />
        </div>
        <div>
            <label htmlFor="browserLname">Last name</label>
            <input id="browserLname" type="text" placeholder="Enter Last name" className="form-input" required />
        </div>
        <div>
            <label htmlFor="browserEmail">Username</label>
            <div className="flex">
                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                    @
                </div>
                <input id="browserEmail" type="text" placeholder="Enter Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" required />
            </div>
        </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="md:col-span-2">
            <label htmlFor="browserCity">City</label>
            <input id="browserCity" type="text" placeholder="Enter City" className="form-input" required />
        </div>
        <div>
            <label htmlFor="browserState">State</label>
            <input id="browserState" type="text" placeholder="Enter State" className="form-input" required />
        </div>
        <div>
            <label htmlFor="browserZip">Zip</label>
            <input id="browserZip" type="text" placeholder="Enter Zip" className="form-input" required />
        </div>
    </div>
    <div className="flex items-center cursor-pointer mt-1">
        <input type="checkbox" id="agree1 className="form-checkbox" required />
        <label htmlFor="agree1" className="text-white-dark font-semibold mb-0">Agree to terms and conditions</label>
    </div>
    <button type="submit" className="btn btn-primary !mt-6">
        Submit Form
    </button>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Tooltips */}
                    <div className="panel" id="tooltips">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Tooltips</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code6')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <Formik
                                initialValues={{
                                    firstname: 'Shaun',
                                    lastname: 'Park',
                                    username: '',
                                    city: '',
                                    state: '',
                                    zip: '',
                                    agree: false,
                                }}
                                validationSchema={submitForm4}
                                onSubmit={() => {}}
                            >
                                {({ errors, submitCount, touched }) => (
                                    <Form className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className={submitCount ? (errors.firstname ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="firstname">First Name </label>
                                                <Field name="firstname" type="text" id="firstname" placeholder="Enter First Name" className="form-input mb-2" />

                                                {submitCount ? (
                                                    errors.firstname ? (
                                                        <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.firstname}</div>
                                                    ) : (
                                                        <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </div>

                                            <div className={submitCount ? (errors.lastname ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="lastName">Last name </label>
                                                <Field name="lastname" type="text" id="lastname" placeholder="Enter Last Name" className="form-input mb-2" />

                                                {submitCount ? (
                                                    errors.lastname ? (
                                                        <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.lastname}</div>
                                                    ) : (
                                                        <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </div>

                                            <div className={submitCount ? (errors.username ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="username">Username</label>
                                                <div className="flex">
                                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                        @
                                                    </div>

                                                    <Field name="username" type="text" id="username" placeholder="Enter Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                </div>
                                                <div className="mt-2">
                                                    {submitCount ? (
                                                        errors.username ? (
                                                            <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.username}</div>
                                                        ) : (
                                                            <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                                                        )
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                            <div className={`md:col-span-2 ${submitCount ? (errors.city ? 'has-error' : 'has-success') : ''}`}>
                                                <label htmlFor="customeCity">City</label>
                                                <Field name="city" type="text" id="city" placeholder="Enter City" className="form-input mb-2" />

                                                {submitCount ? (
                                                    errors.city ? (
                                                        <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.city}</div>
                                                    ) : (
                                                        <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </div>

                                            <div className={submitCount ? (errors.state ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="customeState">State</label>
                                                <Field name="state" type="text" id="customeState" placeholder="Enter State" className="form-input mb-2" />
                                                {submitCount ? (
                                                    errors.state ? (
                                                        <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.state}</div>
                                                    ) : (
                                                        <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </div>

                                            <div className={submitCount ? (errors.zip ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="customeZip">Zip</label>
                                                <Field name="zip" type="text" id="customeZip" placeholder="Enter Zip" className="form-input mb-2" />
                                                {submitCount ? (
                                                    errors.zip ? (
                                                        <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.zip}</div>
                                                    ) : (
                                                        <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>

                                        <div className={submitCount ? (errors.agree ? 'has-error' : 'has-success') : ''}>
                                            <div className="flex">
                                                <Field name="agree" id="agree2" type="checkbox" className="form-checkbox" />
                                                <label htmlFor="agree2" className="text-white-dark font-semibold">
                                                    Agree to terms and conditions
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                {submitCount ? errors.agree ? <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.agree}</div> : '' : ''}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary !mt-6"
                                            onClick={() => {
                                                if (Object.keys(touched).length !== 0 && Object.keys(errors).length === 0) {
                                                    submitForm();
                                                }
                                            }}
                                        >
                                            Submit Form
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        {codeArr.includes('code6') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
const submitForm = () => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: 'Form submitted successfully',
        padding: '10px 20px',
    });
};

const submitForm4 = Yup.object().shape({
    firstname: Yup.string().required('Please fill the first name'),
    lastname: Yup.string().required('Please fill the last name'),
    username: Yup.string().required('Please choose a userName'),
    city: Yup.string().required('Please provide a valid city'),
    state: Yup.string().required('Please provide a valid state'),
    zip: Yup.string().required('Please provide a valid zip'),
    agree: Yup.bool().oneOf([true], 'You must agree before submitting.'),
});

<Formik
    initialValues={{
        firstname: 'Shaun',
        lastname: 'Park',
        username: '',
        city: '',
        state: '',
        zip: '',
        agree: false,
    }}
    validationSchema={submitForm4}
    onSubmit={() => {}}
>
    {({ errors, submitCount, touched }) => (
        <Form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className={submitCount ? (errors.firstname ? 'has-error' : 'has-success') : ''}>
                    <label htmlFor="firstname">First Name </label>
                    <Field name="firstname" type="text" id="firstname" placeholder="Enter First Name" className="form-input mb-2" />

                    {submitCount ? (
                        errors.firstname ? (
                            <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.firstname}</div>
                        ) : (
                            <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                        )
                    ) : (
                        ''
                    )}
                </div>

                <div className={submitCount ? (errors.lastname ? 'has-error' : 'has-success') : ''}>
                    <label htmlFor="lastName">Last name </label>
                    <Field name="lastname" type="text" id="lastname" placeholder="Enter Last Name" className="form-input mb-2" />

                    {submitCount ? (
                        errors.lastname ? (
                            <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.lastname}</div>
                        ) : (
                            <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                        )
                    ) : (
                        ''
                    )}
                </div>

                <div className={submitCount ? (errors.username ? 'has-error' : 'has-success') : ''}>
                    <label htmlFor="username">Username</label>
                    <div className="flex">
                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                            @
                        </div>

                        <Field name="username" type="text" id="username" placeholder="Enter Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                    </div>
                    <div className="mt-2">
                        {submitCount ? (
                            errors.username ? (
                                <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.username}</div>
                            ) : (
                                <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                            )
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className={\`md:col-span-2 \${submitCount ? (errors.city ? 'has-error' : 'has-success') : ''}\`}>
                    <label htmlFor="customeCity">City</label>
                    <Field name="city" type="text" id="city" placeholder="Enter City" className="form-input mb-2" />

                    {submitCount ? (
                        errors.city ? (
                            <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.city}</div>
                        ) : (
                            <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                        )
                    ) : (
                        ''
                    )}
                </div>

                <div className={submitCount ? (errors.state ? 'has-error' : 'has-success') : ''}>
                    <label htmlFor="customeState">State</label>
                    <Field name="state" type="text" id="customeState" placeholder="Enter State" className="form-input mb-2" />
                    {submitCount ? (
                        errors.state ? (
                            <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.state}</div>
                        ) : (
                            <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                        )
                    ) : (
                        ''
                    )}
                </div>

                <div className={submitCount ? (errors.zip ? 'has-error' : 'has-success') : ''}>
                    <label htmlFor="customeZip">Zip</label>
                    <Field name="zip" type="text" id="customeZip" placeholder="Enter Zip" className="form-input mb-2" />
                    {submitCount ? (
                        errors.zip ? (
                            <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.zip}</div>
                        ) : (
                            <div className="text-white bg-[#1abc9c] py-1 px-2 rounded inline-block">Looks Good!</div>
                        )
                    ) : (
                        ''
                    )}
                </div>
            </div>

            <div className={submitCount ? (errors.agree ? 'has-error' : 'has-success') : ''}>
                <div className="flex">
                    <Field name="agree" id="agree2" type="checkbox" className="form-checkbox" />
                    <label htmlFor="agree2" className="text-white-dark font-semibold">
                        Agree to terms and conditions
                    </label>
                </div>
                <div className="mt-2">
                    {submitCount ? errors.agree ? <div className="text-white bg-danger py-1 px-2 rounded inline-block">{errors.agree}</div> : '' : ''}
                </div>
            </div>

            <button
                type="submit"
                className="btn btn-primary !mt-6"
                onClick={() => {
                    if (Object.keys(touched).length !== 0 && Object.keys(errors).length === 0) {
                        submitForm();
                    }
                }}
            >
                Submit Form
            </button>
        </Form>
    )}
</Formik>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Validation;
