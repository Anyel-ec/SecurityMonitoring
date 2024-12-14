import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../components/Icon/IconCode';

const Layouts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Layouts'));
    });
    const [codeArr, setCodeArr] = useState(['code1,code2,code3,code4,code5,code6,code7,code8']);

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
                    <span>Layouts</span>
                </li>
            </ul>

            <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
                {/* Stack */}
                <div className="panel" id="stack_form">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Stack Forms</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div>
                                <input type="email" placeholder="Enter Email" className="form-input" />
                                <span className="text-white-dark text-[11px] inline-block mt-1">We'll never share your email with anyone else.</span>
                            </div>
                            <div>
                                <input type="password" placeholder="Enter Password" className="form-input" />
                            </div>
                            <div>
                                <label className="inline-flex items-center mt-1 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-white-dark">Subscribe to weekly newsletter</span>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div>
        <input type="email" placeholder="Enter Email" className="form-input" />
        <span className="text-white-dark text-[11px] inline-block mt-1">We'll never share your email with anyone else.</span>
    </div>
    <div>
        <input type="password" placeholder="Enter Password" className="form-input" />
    </div>
    <div>
        <label className="inline-flex items-center mt-1 cursor-pointer">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-white-dark">Subscribe to weekly newsletter</span>
        </label>
    </div>
    <button type="submit" className="btn btn-primary !mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Horizontal */}
                <div className="panel" id="horizontal_form">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Horizontal form</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div className="flex sm:flex-row flex-col">
                                <label htmlFor="horizontalEmail" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">
                                    Email
                                </label>
                                <input id="horizontalEmail" type="email" placeholder="Enter Email" className="form-input flex-1" />
                            </div>
                            <div className="flex sm:flex-row flex-col">
                                <label htmlFor="horizontalPassword" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">
                                    Password
                                </label>
                                <input id="horizontalPassword" type="password" placeholder="Enter Password" className="form-input flex-1" />
                            </div>
                            <div className="flex sm:flex-row flex-col">
                                <label className="sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">Choose Segements</label>
                                <div className="flex-1">
                                    <div className="mb-2">
                                        <label className="inline-flex mt-1 cursor-pointer">
                                            <input type="radio" name="segements" className="form-radio" />
                                            <span className="text-white-dark">Segements 1</span>
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="inline-flex mt-1 cursor-pointer">
                                            <input type="radio" name="segements" className="form-radio" />
                                            <span className="text-white-dark">Segements 2</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex mt-1">
                                            <input type="radio" name="segements" className="form-radio" disabled />
                                            <span className="text-white-dark">Segements 3 ( disabled )</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex sm:flex-row flex-col">
                                <label className="font-semibold sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">Apply</label>
                                <label className="inline-flex mb-0 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-white-dark">Terms Conditions</span>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div className="flex sm:flex-row flex-col">
        <label htmlFor="horizontalEmail" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">
            Email
        </label>
        <input id="horizontalEmail" type="email" placeholder="Enter Email" className="form-input flex-1" />
    </div>
    <div className="flex sm:flex-row flex-col">
        <label htmlFor="horizontalPassword" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">
            Password
        </label>
        <input id="horizontalPassword" type="password" placeholder="Enter Password" className="form-input flex-1" />
    </div>
    <div className="flex sm:flex-row flex-col">
        <label className="sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">Choose Segements</label>
        <div className="flex-1">
            <div className="mb-2">
                <label className="inline-flex mt-1 cursor-pointer">
                    <input type="radio" name="segements" className="form-radio" />
                    <span className="text-white-dark">Segements 1</span>
                </label>
            </div>
            <div className="mb-2">
                <label className="inline-flex mt-1 cursor-pointer">
                    <input type="radio" name="segements" className="form-radio" />
                    <span className="text-white-dark">Segements 2</span>
                </label>
            </div>
            <div>
                <label className="inline-flex mt-1">
                    <input type="radio" name="segements" className="form-radio" disabled />
                    <span className="text-white-dark">Segements 3 ( disabled )</span>
                </label>
            </div>
        </div>
    </div>
    <div className="flex sm:flex-row flex-col">
        <label className="font-semibold sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">Apply</label>
        <label className="inline-flex mb-0 cursor-pointer">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-white-dark">Terms Conditions</span>
        </label>
    </div>
    <button type="submit" className="btn btn-primary !mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Registration */}
                <div className="panel" id="registration_form">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Registration Forms</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div>
                                <input type="email" placeholder="Enter Email Address *" className="form-input" />
                            </div>
                            <div>
                                <input type="password" placeholder="Enter Password *" className="form-input" />
                            </div>
                            <div>
                                <input type="password" placeholder="Enter Confirm Password *" className="form-input" />
                            </div>
                            <div className="!mt-2">
                                <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                            </div>
                            <div>
                                <label className="inline-flex cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-white-dark">Subscribe to weekly newsletter</span>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code3') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div>
        <input type="email" placeholder="Enter Email Address *" className="form-input" />
    </div>
    <div>
        <input type="password" placeholder="Enter Password *" className="form-input" />
    </div>
    <div>
        <input type="password" placeholder="Enter Confirm Password *" className="form-input" />
    </div>
    <div className="!mt-2">
        <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
    </div>
    <div>
        <label className="inline-flex cursor-pointer">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-white-dark">Subscribe to weekly newsletter</span>
        </label>
    </div>
    <button type="submit" className="btn btn-primary !mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Login */}
                <div className="panel" id="login_form">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Login Forms</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div>
                                <input type="text" placeholder="Enter Full Name *" className="form-input" />
                            </div>
                            <div>
                                <input type="email" placeholder="Enter Email Address *" className="form-input" />
                            </div>
                            <div>
                                <input type="password" placeholder="Enter Password *" className="form-input" />
                            </div>
                            <div className="!mt-2">
                                <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                            </div>
                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code4') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div>
        <input type="text" placeholder="Enter Full Name *" className="form-input" />
    </div>
    <div>
        <input type="email" placeholder="Enter Email Address *" className="form-input" />
    </div>
    <div>
        <input type="password" placeholder="Enter Password *" className="form-input" />
    </div>
    <div className="!mt-2">
        <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
    </div>
    <button type="submit" className="btn btn-primary !mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Grid */}
                <div className="panel" id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Forms Grid</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code5')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gridEmail">Email</label>
                                    <input id="gridEmail" type="email" placeholder="Enter Email" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="gridPassword">Password</label>
                                    <input id="gridPassword" type="Password" placeholder="Enter Password" className="form-input" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="gridAddress1">Address</label>
                                <input id="gridAddress1" type="text" placeholder="Enter Address" defaultValue="1234 Main St" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gridAddress2">Address2</label>
                                <input id="gridAddress2" type="text" placeholder="Enter Address2" defaultValue="Apartment, studio, or floor" className="form-input" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div className="md:col-span-2">
                                    <label htmlFor="gridCity">City</label>
                                    <input id="gridCity" type="text" placeholder="Enter City" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="gridState">State</label>
                                    <select id="gridState" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="gridZip">Zip</label>
                                    <input id="gridZip" type="text" placeholder="Enter Zip" className="form-input" />
                                </div>
                            </div>
                            <div>
                                <label className="flex items-center mt-1 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-white-dark">Check me out</span>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </form>
                    </div>

                    {codeArr.includes('code5') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
            <label htmlFor="gridEmail">Email</label>
            <input id="gridEmail" type="email" placeholder="Enter Email" className="form-input" />
        </div>
        <div>
            <label htmlFor="gridPassword">Password</label>
            <input id="gridPassword" type="Password" placeholder="Enter Password" className="form-input" />
        </div>
    </div>
    <div>
        <label htmlFor="gridAddress1">Address</label>
        <input id="gridAddress1" type="text" placeholder="Enter Address" defaultValue="1234 Main St" className="form-input" />
    </div>
    <div>
        <label htmlFor="gridAddress2">Address2</label>
        <input id="gridAddress2" type="text" placeholder="Enter Address2" defaultValue="Apartment, studio, or floor" className="form-input" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="md:col-span-2">
            <label htmlFor="gridCity">City</label>
            <input id="gridCity" type="text" placeholder="Enter City" className="form-input" />
        </div>
        <div>
            <label htmlFor="gridState">State</label>
            <select id="gridState" className="form-select text-white-dark">
                <option>Choose...</option>
                <option>...</option>
            </select>
        </div>
        <div>
            <label htmlFor="gridZip">Zip</label>
            <input id="gridZip" type="text" placeholder="Enter Zip" className="form-input" />
        </div>
    </div>
    <div>
        <label className="flex items-center mt-1 cursor-pointer">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-white-dark">Check me out</span>
        </label>
    </div>
    <button type="submit" className="btn btn-primary !mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Inline */}
                <div className="panel lg:col-span-2" id="inline_form">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Inline Forms</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code6')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div className="flex flex-col md:flex-row gap-4 items-center max-w-[900px] mx-auto">
                                <input type="email" placeholder="Jane Doe" className="form-input flex-1" />
                                <div className="flex flex-1">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        @
                                    </div>
                                    <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="text-white-dark">Remember me</span>
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary py-2.5">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code6') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div className="flex flex-col md:flex-row gap-4 items-center max-w-[900px] mx-auto">
        <input type="email" placeholder="Jane Doe" className="form-input flex-1" />
        <div className="flex flex-1">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                @
            </div>
            <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
        </div>
        <div>
            <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-white-dark">Remember me</span>
            </label>
        </div>
        <button type="submit" className="btn btn-primary py-2.5">
            Submit
        </button>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Auto-sizing */}
                <div className="panel lg:col-span-2" id="auto_sizing">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Auto-sizing</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code7')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div className="flex flex-col md:flex-row gap-4 items-center max-w-[900px] mx-auto">
                                <input type="email" placeholder="Jane Doe" className="form-input flex-1" />
                                <div className="flex flex-1">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        @
                                    </div>
                                    <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                                <div>
                                    <label className="flex items-center cursor-pointer">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="text-white-dark">Remember me</span>
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary py-2.5">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code7') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div className="flex flex-col md:flex-row gap-4 items-center max-w-[900px] mx-auto">
        <input type="email" placeholder="Jane Doe" className="form-input flex-1" />
        <div className="flex flex-1">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                @
            </div>
            <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
        </div>
        <div>
            <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-white-dark">Remember me</span>
            </label>
        </div>
        <button type="submit" className="btn btn-primary py-2.5">
            Submit
        </button>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Actions Buttons */}
                <div className="panel lg:row-start-3 lg:col-start-2" id="actions_buttons">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Actions Buttons</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code8')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div>
                                <label htmlFor="actionName">Full Name:</label>
                                <input id="actionName" type="text" placeholder="Enter Full Name" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="actionEmail">Email:</label>
                                <div className="flex flex-1">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        @
                                    </div>
                                    <input id="actionEmail" type="email" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="actionWeb">Website:</label>
                                <input id="actionWeb" type="text" placeholder="https://" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="actionPassword">Password:</label>
                                <input id="actionPassword" type="password" placeholder="Enter Password" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="actionCpass">Confirm Password:</label>
                                <input id="actionCpass" type="password" placeholder="Enter Confirm Password" className="form-input" />
                            </div>
                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code8') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div>
        <label htmlFor="actionName">Full Name:</label>
        <input id="actionName" type="text" placeholder="Enter Full Name" className="form-input" />
    </div>
    <div>
        <label htmlFor="actionEmail">Email:</label>
        <div className="flex flex-1">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                @
            </div>
            <input id="actionEmail" type="email" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
        </div>
    </div>
    <div>
        <label htmlFor="actionWeb">Website:</label>
        <input id="actionWeb" type="text" placeholder="https://" className="form-input" />
    </div>
    <div>
        <label htmlFor="actionPassword">Password:</label>
        <input id="actionPassword" type="password" placeholder="Enter Password" className="form-input" />
    </div>
    <div>
        <label htmlFor="actionCpass">Confirm Password:</label>
        <input id="actionCpass" type="password" placeholder="Enter Confirm Password" className="form-input" />
    </div>
    <button type="submit" className="btn btn-primary !mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Layouts;
