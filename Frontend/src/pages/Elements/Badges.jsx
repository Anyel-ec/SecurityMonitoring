import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../components/Icon/IconCode';
import IconFacebook from '../../components/Icon/IconFacebook';
import IconSettings from '../../components/Icon/IconSettings';
const Badges = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Badges'));
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
                        Elements
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Badges</span>
                </li>
            </ul>
            <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
                {/* Basic */}
                <div className="panel" id="basic">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Basic</h5>
                        <button
                            onClick={() => {
                                toggleCode('code1');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>

                    <div className="mb-5">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <span className="badge bg-primary">Primary</span>
                            <span className="badge bg-secondary">Secondary</span>
                            <span className="badge bg-success">Success</span>
                            <span className="badge bg-danger">Danger</span>
                            <span className="badge bg-warning">Warning</span>
                            <span className="badge bg-info">Info</span>
                            <span className="badge bg-dark">Dark</span>
                        </div>
                    </div>
                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre>{`<span className="badge bg-primary">Primary</span>

<span className="badge bg-secondary">Secondary</span>

<span className="badge bg-success">Success</span>

<span className="badge bg-danger">Danger</span>

<span className="badge bg-warning">Warning</span>

<span className="badge bg-info">Info</span>

<span className="badge bg-dark">Dark</span>
`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Outline */}
                <div className="panel" id="outline">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Outline</h5>
                        <button
                            onClick={() => {
                                toggleCode('code2');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <span className="badge badge-outline-primary">Primary</span>
                            <span className="badge badge-outline-secondary">Secondary</span>
                            <span className="badge badge-outline-success">Success</span>
                            <span className="badge badge-outline-danger">Danger</span>
                            <span className="badge badge-outline-warning">Warning</span>
                            <span className="badge badge-outline-info">Info</span>
                            <span className="badge badge-outline-dark">Dark</span>
                        </div>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre>{`<span className="badge badge-outline-primary">Primary</span>

<span className="badge badge-outline-secondary">Secondary</span>

<span className="badge badge-outline-success">Success</span>

<span className="badge badge-outline-danger">Danger</span>

<span className="badge badge-outline-warning">Warning</span>

<span className="badge badge-outline-info">Info</span>

<span className="badge badge-outline-dark">Dark</span>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Pills */}
                <div className="panel" id="pills">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Pills</h5>
                        <button
                            onClick={() => {
                                toggleCode('code3');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex w-full">
                            <div className="flex items-center justify-center w-1/2">
                                <span className="badge bg-primary rounded-full">Primary</span>
                            </div>
                            <div className="flex items-center justify-center w-1/2">
                                <span className="badge badge-outline-primary rounded-full">Primary</span>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code3') && (
                        <CodeHighlight>
                            <pre>{`<div className="flex items-center justify-center w-1/2">
    <span className="badge bg-primary rounded-full">Primary</span>
</div>

<div className="flex items-center justify-center w-1/2">
    <span className="badge badge-outline-primary rounded-full">Primary</span>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Classic */}
                <div className="panel" id="classic">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Classic</h5>
                        <button
                            onClick={() => {
                                toggleCode('code4');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex w-full">
                            <div className="flex items-center justify-center w-1/2">
                                <span className="badge bg-primary rounded-none">Primary</span>
                            </div>
                            <div className="flex items-center justify-center w-1/2">
                                <span className="badge badge-outline-primary rounded-none">Primary</span>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code4') && (
                        <CodeHighlight>
                            <pre>{`<div className="flex items-center justify-center w-1/2">
    <span className="badge bg-primary rounded-none">Primary</span>
</div>

<div className="flex items-center justify-center w-1/2">
    <span className="badge badge-outline-primary rounded-none">Primary</span>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Badges with Heading */}
                <div className="panel" id="with_headings">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Badges with Heading</h5>
                        <button
                            onClick={() => {
                                toggleCode('code5');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 dark:text-white-dark">
                        <p className="mb-5">Badges scale to match the size of the immediate parent element by using relative font sizing and em units.</p>
                        <div className="space-y-2 prose dark:prose-headings:text-white-dark">
                            <h1>
                                Example heading <span className="badge bg-primary">Primary</span>
                            </h1>
                            <h2>
                                Example heading <span className="badge bg-success">Success</span>
                            </h2>
                            <h3>
                                Example heading <span className="badge bg-info">Info</span>
                            </h3>
                            <h4>
                                Example heading <span className="badge bg-warning">Warning</span>
                            </h4>
                            <h5>
                                Example heading <span className="badge bg-danger">Danger</span>
                            </h5>
                            <h6>
                                Example heading <span className="badge bg-dark">Dark</span>
                            </h6>
                        </div>
                    </div>
                    {codeArr.includes('code5') && (
                        <CodeHighlight>
                            <pre>{`<div className="space-y-2 prose dark:prose-headings:text-white-dark">
    <h1>
        Example heading <span className="badge bg-primary">Primary</span>
    </h1>
    <h2>
        Example heading <span className="badge bg-success">Success</span>
    </h2>
    <h3>
        Example heading <span className="badge bg-info">Info</span>
    </h3>
    <h4>
        Example heading <span className="badge bg-warning">Warning</span>
    </h4>
    <h5>
        Example heading <span className="badge bg-danger">Danger</span>
    </h5>
    <h6>
        Example heading <span className="badge bg-dark">Dark</span>
    </h6>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Custom Badges */}
                <div className="panel" id="custom">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Custom Badges</h5>
                        <button
                            onClick={() => {
                                toggleCode('code6');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button type="button" className="btn btn-primary my-4">
                                <span className="flex items-center">
                                    <IconFacebook className="w-4.5 h-4.5 ltr:mr-1 rtl:ml-1 shrink-0" />
                                    Facebook
                                </span>
                                <span className="badge absolute ltr:right-0 rtl:left-0 -top-3 bg-danger p-0.5 px-1.5 rounded-full">9</span>
                            </button>
                            <button type="button" className="btn btn-info my-4">
                                <span>Twitter</span>
                                <span className="badge absolute ltr:right-0 rtl:left-0 -top-3 bg-danger p-0.5 px-1.5 rounded-full">4</span>
                            </button>
                            <button type="button" className="btn btn-secondary px-5 my-4">
                                <span>
                                    <IconSettings className="w-5 h-5" />
                                </span>
                                <span className="badge absolute ltr:right-0 rtl:left-0 -top-3 bg-danger p-0.5 px-1.5 rounded-full">8</span>
                            </button>
                            <button type="button" className="btn btn-dark my-4">
                                Notifications
                                <span className="badge my-0 bg-white-light text-black ltr:ml-4 rtl:mr-4">4</span>
                            </button>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <span className="badge bg-warning p-0 ltr:pr-4 rtl:pl-4 my-4 rounded-full flex items-center text-base">
                                    <img src="/assets/images/profile-34.jpeg" className="w-10 h-10 rounded-full object-cover" alt="img" />
                                    <span className="ltr:ml-2 rtl:mr-2">John Doe</span>
                                </span>
                                <span className="badge bg-danger p-0 ltr:pr-4 rtl:pl-4 my-4 rounded-full flex items-center text-base">
                                    <img src="/assets/images/profile-34.jpeg" className="w-10 h-10 rounded-full object-cover" alt="img" />
                                    <span className="ltr:ml-2 rtl:mr-2">John Doe</span>
                                    <span className="ltr:ml-4 rtl:mr-4 cursor-pointer hover:opacity-90">x</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code6') && (
                        <CodeHighlight>
                            <pre>{`<button type="button" className="btn btn-primary my-4">
    <span className="flex items-center">
        <svg>...</svg>
        Facebook
    </span>
    <span className="badge absolute ltr:right-0 rtl:left-0 -top-3 bg-danger p-0.5 px-1.5 rounded-full">9</span>
</button>

<button type="button" className="btn btn-info my-4">
    <span>Twitter</span>
    <span className="badge absolute ltr:right-0 rtl:left-0 -top-3 bg-danger p-0.5 px-1.5 rounded-full">4</span>
</button>

<button type="button" className="btn btn-secondary px-5 my-4">
    <span>
        <svg>...</svg>
    </span>
    <span className="badge absolute ltr:right-0 rtl:left-0 -top-3 bg-danger p-0.5 px-1.5 rounded-full">8</span>
</button>

<button type="button" className="btn btn-dark my-4">
    Notifications
    <span className="badge my-0 bg-white-light text-black ltr:ml-4 rtl:mr-4">4</span>
</button>

<div className="flex flex-wrap items-center justify-center gap-3">
    <span className="badge bg-warning p-0 ltr:pr-4 rtl:pl-4 my-4 rounded-full flex items-center text-base">
        <img src="/assets/images/profile-34.jpeg" className="w-10 h-10 rounded-full object-cover" alt="img" />
        <span className="ltr:ml-2 rtl:mr-2">John Doe</span>
    </span>
    <span className="badge bg-danger p-0 ltr:pr-4 rtl:pl-4 my-4 rounded-full flex items-center text-base">
        <img src="/assets/images/profile-34.jpeg" className="w-10 h-10 rounded-full object-cover" alt="img" />
        <span className="ltr:ml-2 rtl:mr-2">John Doe</span>
        <span className="ltr:ml-4 rtl:mr-4 cursor-pointer hover:opacity-90">x</span>
    </span>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Badges;
