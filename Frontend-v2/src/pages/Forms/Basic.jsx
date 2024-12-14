import { Link } from 'react-router-dom';
import CodeHighlight from '../../components/Highlight';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../components/Icon/IconCode';

const Basic = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Basic Forms'));
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
                    <span>Basic</span>
                </li>
            </ul>

            <div className="pt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input Text</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <input type="text" placeholder="Some Text..." className="form-input" required />
                            <button type="submit" className="btn btn-primary mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <input type="text" placeholder="Some Text..." className="form-input" required />
    <button type="submit" className="btn btn-primary mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* type=password */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input Password</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <input type="password" placeholder="Enter Password" className="form-input" required />
                            <button type="submit" className="btn btn-primary mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <input type="password" placeholder="Enter Password" className="form-input" required />
    <button type="submit" className="btn btn-primary mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* type=email */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input Email</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <input type="email" placeholder="email@mail.com" className="form-input" required />
                            <button type="submit" className="btn btn-primary mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code3') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <input type="email" placeholder="email@mail.com" className="form-input" required />
    <button type="submit" className="btn btn-primary mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* type=url */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input Url</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <input type="url" placeholder="https://dummyurl.com" className="form-input" required />
                            <button type="submit" className="btn btn-primary mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code4') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <input type="url" placeholder="https://dummyurl.com" className="form-input" required />
    <button type="submit" className="btn btn-primary mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* type=tel */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input Telephone</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code5')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <input type="tel" placeholder="6-(666)-111-7777" className="form-input" required />
                            <button type="submit" className="btn btn-primary mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code5') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <input type="tel" placeholder="6-(666)-111-7777" className="form-input" required />
    <button type="submit" className="btn btn-primary mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* type=search */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input Search</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code6')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <input type="search" placeholder="Search..." className="form-input" required />
                            <button type="button" className="btn btn-primary mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code6') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <input type="search" placeholder="Search..." className="form-input" required />
    <button type="button" className="btn btn-primary mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* type=range */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input Range</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code7')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <input type="range" className="w-full py-2.5" min="0" max="100" />
                        </form>
                    </div>
                    {codeArr.includes('code7') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <input type="range" className="w-full py-2.5" min="0" max="100" />
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* input with label */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input With Label</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code8')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <label htmlFor="fullname">Full Name</label>
                            <input id="fullname" type="text" placeholder="Enter Full Name" defaultValue="Alan Green" className="form-input" />
                        </form>
                    </div>
                    {codeArr.includes('code8') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <label htmlFor="fullname">Full Name</label>
    <input id="fullname" type="text" placeholder="Enter Full Name" defaultValue="Alan Green" className="form-input" />
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* form controls */}
                <div className="panel lg:row-span-3">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Form controls</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code9')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div>
                                <label htmlFor="ctnEmail">Email address</label>
                                <input id="ctnEmail" type="email" placeholder="name@example.com" className="form-input" required />
                            </div>
                            <div>
                                <label htmlFor="ctnSelect1">Example select</label>
                                <select id="ctnSelect1" className="form-select text-white-dark" required>
                                    <option>Open this select menu</option>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="ctnSelect2">Example multiple select</label>
                                <select id="ctnSelect2" multiple className="form-multiselect text-white-dark" required>
                                    <option>Open this select menu</option>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="ctnTextarea">Example textarea</label>
                                <textarea id="ctnTextarea" rows={3} className="form-textarea" placeholder="Enter Address" required></textarea>
                            </div>
                            <div>
                                <label htmlFor="ctnFile">Example file input</label>
                                <input
                                    id="ctnFile"
                                    type="file"
                                    className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code9') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div>
        <label htmlFor="ctnEmail">Email address</label>
        <input id="ctnEmail" type="email" placeholder="name@example.com" className="form-input" required />
    </div>
    <div>
        <label htmlFor="ctnSelect1">Example select</label>
        <select id="ctnSelect1" className="form-select text-white-dark" required>
            <option>Open this select menu</option>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
        </select>
    </div>
    <div>
        <label htmlFor="ctnSelect2">Example multiple select</label>
        <select id="ctnSelect2" multiple className="form-multiselect text-white-dark" required>
            <option>Open this select menu</option>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
        </select>
    </div>
    <div>
        <label htmlFor="ctnTextarea">Example textarea</label>
        <textarea id="ctnTextarea" rows={3} className="form-textarea" placeholder="Enter Address" required></textarea>
    </div>
    <div>
        <label htmlFor="ctnFile">Example file input</label>
        <input
            id="ctnFile"
            type="file"
            className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
            required
        />
    </div>
    <button type="submit" className="btn btn-primary !mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Form Grid Layouts */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Form grid</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code10')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                                <input type="text" placeholder="Enter First Name" className="form-input" />
                                <input type="text" placeholder="Enter Last Name" className="form-input" />
                            </div>
                            <button type="button" className="btn btn-primary mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code10') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div className="grid grid-cols-1 sm:flex justify-between gap-5">
        <input type="text" placeholder="Enter First Name" className="form-input" />
        <input type="text" placeholder="Enter Last Name" className="form-input" />
    </div>
    <button type="button" className="btn btn-primary mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Form row</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code11')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                                <input type="text" placeholder="Enter First Name" className="form-input" />
                                <input type="text" placeholder="Enter Last Name" className="form-input" />
                            </div>
                            <button type="button" className="btn btn-primary mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code11') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div className="grid grid-cols-1 sm:flex justify-between gap-5">
        <input type="text" placeholder="Enter First Name" className="form-input" />
        <input type="text" placeholder="Enter Last Name" className="form-input" />
    </div>
    <button type="button" className="btn btn-primary mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Form groups</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code12')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div>
                                <label htmlFor="groupFname">First Name</label>
                                <input id="groupFname" type="text" placeholder="Enter First Name" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="groupLname">Last Name</label>
                                <input id="groupLname" type="text" placeholder="Enter Last Name" className="form-input" />
                            </div>
                            <button type="button" className="btn btn-primary !mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code12') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div>
        <label htmlFor="groupFname">First Name</label>
        <input id="groupFname" type="text" placeholder="Enter First Name" className="form-input" />
    </div>
    <div>
        <label htmlFor="groupLname">Last Name</label>
        <input id="groupLname" type="text" placeholder="Enter Last Name" className="form-input" />
    </div>
    <button type="button" className="btn btn-primary !mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel lg:col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Column sizing</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code13')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                <input type="text" placeholder="Enter City" className="form-input lg:col-span-2" />
                                <input type="text" placeholder="Enter State" className="form-input" />
                                <input type="text" placeholder="Enter Zip" className="form-input" />
                            </div>
                            <button type="button" className="btn btn-primary mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code13') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <input type="text" placeholder="Enter City" className="form-input lg:col-span-2" />
        <input type="text" placeholder="Enter State" className="form-input" />
        <input type="text" placeholder="Enter Zip" className="form-input" />
    </div>
    <button type="button" className="btn btn-primary mt-6">
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Helper Text */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input with help text ( Default Left)</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code14')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div>
                                <input type="text" placeholder="Enter First Name" className="form-input" />
                                <span className="text-white-dark text-xs">I am the helper text.</span>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code14') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div>
        <input type="text" placeholder="Enter First Name" className="form-input" />
        <span className="text-white-dark text-xs">I am the helper text.</span>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input with badge help text (Default Left)</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code15')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div>
                                <input type="text" placeholder="Enter First Name" className="form-input mb-2" />
                                <span className="badge bg-primary text-xs hover:top-0">I am the helper text.</span>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code15') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div>
        <input type="text" placeholder="Enter First Name" className="form-input mb-2" />
        <span className="badge bg-primary text-xs hover:top-0">I am the helper text.</span>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input with block badge help text (Default Left)</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code27')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div>
                                <input type="text" placeholder="Enter First Name" className="form-input mb-2" />
                                <span className="badge bg-primary block text-xs hover:top-0">I am the helper text.</span>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code27') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div>
        <input type="text" placeholder="Enter First Name" className="form-input mb-2" />
        <span className="badge bg-primary block text-xs hover:top-0">I am the helper text.</span>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Inline Help text</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code16')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div>
                                <label htmlFor="Txtpassword">Password</label>
                                <input id="Txtpassword" type="password" placeholder="Enter Password" className="form-input w-3/5" />
                                <span className="text-xs text-white-dark ltr:pl-2 rtl:pr-2">Min 8-20 char</span>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code16') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div>
        <label htmlFor="Txtpassword">Password</label>
        <input id="Txtpassword" type="password" placeholder="Enter Password" className="form-input w-3/5" />
        <span className="text-xs text-white-dark ltr:pl-2 rtl:pr-2">Min 8-20 char</span>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Sizing */}
                <div className="panel lg:col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input Fields</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code17')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="inputLarge">Large Input</label>
                                    <input id="inputLarge" type="text" placeholder="Large Input" className="form-input form-input-lg" />
                                </div>
                                <div>
                                    <label htmlFor="inputDefault">Default Input</label>
                                    <input id="inputDefault" type="text" placeholder="Default Input" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="inputSmall">Small Input</label>
                                    <input id="inputSmall" type="text" placeholder="Small Input" className="form-input form-input-sm" />
                                </div>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code17') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
            <label htmlFor="inputLarge">Large Input</label>
            <input id="inputLarge" type="text" placeholder="Large Input" className="form-input form-input-lg" />
        </div>
        <div>
            <label htmlFor="inputDefault">Default Input</label>
            <input id="inputDefault" type="text" placeholder="Default Input" className="form-input" />
        </div>
        <div>
            <label htmlFor="inputSmall">Small Input</label>
            <input id="inputSmall" type="text" placeholder="Small Input" className="form-input form-input-sm" />
        </div>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel lg:col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Select Field</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code18')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <select className="form-select form-select-lg text-white-dark">
                                        <option>Open this select menu</option>
                                        <option>One</option>
                                        <option>Two</option>
                                        <option>Three</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="form-select text-white-dark">
                                        <option>Open this select menu</option>
                                        <option>One</option>
                                        <option>Two</option>
                                        <option>Three</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="form-select form-select-sm text-white-dark">
                                        <option>Open this select menu</option>
                                        <option>One</option>
                                        <option>Two</option>
                                        <option>Three</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code18') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
            <select className="form-select form-select-lg text-white-dark">
                <option>Open this select menu</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
            </select>
        </div>
        <div>
            <select className="form-select text-white-dark">
                <option>Open this select menu</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
            </select>
        </div>
        <div>
            <select className="form-select form-select-sm text-white-dark">
                <option>Open this select menu</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
            </select>
        </div>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Horizontal form label sizing</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code19')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div className="sm:flex justify-between items-center gap-5 md:gap-20">
                                <label htmlFor="hrLargeinput">Email</label>
                                <input id="hrLargeinput" type="email" placeholder="name@example.com" className="form-input py-2.5 text-base" />
                            </div>
                            <div className="sm:flex justify-between items-center gap-5 md:gap-20">
                                <label htmlFor="hrDefaultinput">Email</label>
                                <input id="hrDefaultinput" type="email" placeholder="name@example.com" className="form-input" />
                            </div>
                            <div className="sm:flex justify-between items-center gap-5 md:gap-20">
                                <label htmlFor="hrSmallinput">Email</label>
                                <input id="hrSmallinput" type="email" placeholder="name@example.com" className="form-input py-1.5 text-xs" />
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code19') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div className="sm:flex justify-between items-center gap-5 md:gap-20">
        <label htmlFor="hrLargeinput">Email</label>
        <input id="hrLargeinput" type="email" placeholder="name@example.com" className="form-input py-2.5 text-base" />
    </div>
    <div className="sm:flex justify-between items-center gap-5 md:gap-20">
        <label htmlFor="hrDefaultinput">Email</label>
        <input id="hrDefaultinput" type="email" placeholder="name@example.com" className="form-input" />
    </div>
    <div className="sm:flex justify-between items-center gap-5 md:gap-20">
        <label htmlFor="hrSmallinput">Email</label>
        <input id="hrSmallinput" type="email" placeholder="name@example.com" className="form-input py-1.5 text-xs" />
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/*  Readonly  */}
                <div className="panel lg:row-start-[14]" id="readonly_input">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input Readonly</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code20')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div>
                                <input type="text" placeholder="Readonly input here…" className="form-input disabled:pointer-events-none" readOnly />
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code20') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div>
        <input type="text" placeholder="Readonly input here…" className="form-input disabled:pointer-events-none" readOnly />
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Disabled */}
                <div className="panel" id="disabled">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Disabled Fields</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code21')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div>
                                <label htmlFor="disInput" className="text-white-dark">
                                    Disabled input
                                </label>
                                <input
                                    id="disInput"
                                    type="text"
                                    placeholder="Readonly input here…"
                                    className="form-input disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="disSelect" className="text-white-dark">
                                    Disabled select menu
                                </label>
                                <select id="disSelect" className="form-select disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] text-white-dark" disabled>
                                    <option>Open this select menu</option>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                </select>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox" disabled />
                                    <span className="text-white-dark">Can't check this</span>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary !mt-6 disabled:pointer-events-none disabled:opacity-60" disabled>
                                Submit
                            </button>
                        </form>
                    </div>
                    {codeArr.includes('code21') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div>
        <label htmlFor="disInput" className="text-white-dark">
            Disabled input
        </label>
        <input
            id="disInput"
            type="text"
            placeholder="Readonly input here…"
            className="form-input disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed"
            disabled
        />
    </div>
    <div>
        <label htmlFor="disSelect" className="text-white-dark">
            Disabled select menu
        </label>
        <select id="disSelect" className="form-select disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] text-white-dark" disabled>
            <option>Open this select menu</option>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
        </select>
    </div>
    <div>
        <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" disabled />
            <span className="text-white-dark">Can't check this</span>
        </label>
    </div>
    <button type="submit" className="btn btn-primary !mt-6 disabled:pointer-events-none disabled:opacity-60" disabled>
        Submit
    </button>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Custom */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Checkboxes</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code22')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div>
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" defaultChecked />
                                    <span className=" text-white-dark">Checkbox</span>
                                </label>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code22') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div>
        <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="form-checkbox" defaultChecked />
            <span className=" text-white-dark">Checkbox</span>
        </label>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Radio</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code23')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div>
                                <label className="flex items-center cursor-pointer">
                                    <input type="radio" name="custom_radio2" className="form-radio" defaultChecked />
                                    <span className="text-white-dark">Toggle this custom radio</span>
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center cursor-pointer">
                                    <input type="radio" name="custom_radio2" className="form-radio" />
                                    <span className="text-white-dark">Or toggle this other custom radio</span>
                                </label>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code23') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div>
        <label className="flex items-center cursor-pointer">
            <input type="radio" name="custom_radio2" className="form-radio" defaultChecked />
            <span className="text-white-dark">Toggle this custom radio</span>
        </label>
    </div>
    <div>
        <label className="flex items-center cursor-pointer">
            <input type="radio" name="custom_radio2" className="form-radio" />
            <span className="text-white-dark">Or toggle this other custom radio</span>
        </label>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Disabled</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code24')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox" disabled />
                                    <span className=" text-white-dark">Check this custom checkbox</span>
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input type="radio" className="form-radio" disabled />
                                    <span className="text-white-dark">Toggle this custom radio</span>
                                </label>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code24') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form className="space-y-5">
    <div>
        <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" disabled />
            <span className=" text-white-dark">Check this custom checkbox</span>
        </label>
    </div>
    <div>
        <label className="flex items-center">
            <input type="radio" className="form-radio" disabled />
            <span className="text-white-dark">Toggle this custom radio</span>
        </label>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Select menu</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code25')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div>
                                <select className="form-select text-white-dark">
                                    <option>Open this select menu</option>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code25') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div>
        <select className="form-select text-white-dark">
            <option>Open this select menu</option>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
        </select>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Multiselect</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code26')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div>
                                <select size={4} multiple className="form-multiselect text-white-dark !bg-none">
                                    <option>Open this select menu</option>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                    <option>Four</option>
                                    <option>Five</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code26') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div>
        <select size={4} className="form-multiselect multiple text-white-dark !bg-none">
            <option>Open this select menu</option>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
            <option>Four</option>
            <option>Five</option>
        </select>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Basic;
