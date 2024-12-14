import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../components/Icon/IconCode';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconThumbUp from '../../components/Icon/IconThumbUp';

const Wizards = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Wizards'));
    });
    const [codeArr, setCodeArr] = useState([]);

    const toggleCode = (name) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const [activeTab, setActiveTab] = useState(1);
    const [activeTab1, setActiveTab1] = useState(1);
    const [activeTab2, setActiveTab2] = useState(1);
    const [activeTab3, setActiveTab3] = useState(1);
    const [activeTab4, setActiveTab4] = useState(1);
    const [activeTab5, setActiveTab5] = useState(1);
    const [activeTab6, setActiveTab6] = useState(1);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Wizards</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                {/*  Basic */}
                <h4 className="badge bg-primary inline-block hover:top-0 text-base mb-0">Pills</h4>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Text Only</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>

                        <div className="mb-5">
                            <div className="inline-block w-full">
                                <ul className="mb-5 grid grid-cols-3 text-center">
                                    <li>
                                        <div
                                            className={`${activeTab === 1 ? '!bg-primary text-white' : ''}
                                            block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                                            onClick={() => setActiveTab(1)}
                                        >
                                            1 Home
                                        </div>
                                    </li>

                                    <li>
                                        <div className={`${activeTab === 2 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`} onClick={() => setActiveTab(2)}>
                                            2 About
                                        </div>
                                    </li>

                                    <li>
                                        <div className={`${activeTab === 3 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`} onClick={() => setActiveTab(3)}>
                                            3 Success
                                        </div>
                                    </li>
                                </ul>

                                <div>
                                    <p className="mb-5">{activeTab === 1 && 'Try the keyboard navigation by clicking arrow left or right!'}</p>
                                    <p className="mb-5">{activeTab === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>
                                    <p className="mb-5">{activeTab === 3 && 'Wonderful transition effects.'}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" className={`btn btn-primary ${activeTab === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab(activeTab === 3 ? 2 : 1)}>
                                        Back
                                    </button>
                                    <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab(activeTab === 1 ? 2 : 3)}>
                                        {activeTab === 3 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {codeArr.includes('code1') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';

const [activeTab, setActiveTab] = useState(1);

<div className="inline-block w-full">
    <ul className="mb-5 grid grid-cols-3 text-center">
        <li>
            <div
                className={\`\${activeTab === 1 ? '!bg-primary text-white' : ''}
                block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]\`}
                onClick={() => setActiveTab(1)}
            >
                1 Home
            </div>
        </li>

        <li>
            <div className={\`\${activeTab === 2 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]\`} onClick={() => setActiveTab(2)}>
                2 About
            </div>
        </li>

        <li>
            <div className={\`\${activeTab === 3 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]\`} onClick={() => setActiveTab(3)}>
                3 Success
            </div>
        </li>
    </ul>

    <div>
        <p className="mb-5">{activeTab === 1 && 'Try the keyboard navigation by clicking arrow left or right!'}</p>
        <p className="mb-5">{activeTab === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>
        <p className="mb-5">{activeTab === 3 && 'Wonderful transition effects.'}</p>
    </div>
    <div className="flex justify-between">
        <button type="button" className={\`btn btn-primary \${activeTab === 1 ? 'hidden' : ''}\`} onClick={() => setActiveTab(activeTab === 3 ? 2 : 1)}>
            Back
        </button>
        <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab(activeTab === 1 ? 2 : 3)}>
            {activeTab === 3 ? 'Finish' : 'Next'}
        </button>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* icon only */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Icon Only</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="inline-block w-full">
                                <ul className="mb-5 grid grid-cols-3">
                                    <li>
                                        <div
                                            className={`${activeTab1 === 1 ? '!bg-primary text-white' : ''}
                                            flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                                            onClick={() => setActiveTab1(1)}
                                        >
                                            <IconHome />
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className={`${activeTab1 === 2 ? '!bg-primary text-white' : ''}
                                            flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                                            onClick={() => setActiveTab1(2)}
                                        >
                                            <IconUser className="w-5 h-5" />
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className={`${activeTab1 === 3 ? '!bg-primary text-white' : ''}
                                            flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                                            onClick={() => setActiveTab1(3)}
                                        >
                                            <IconThumbUp className="w-5 h-5" />
                                        </div>
                                    </li>
                                </ul>
                                <div>
                                    <p className="mb-5">{activeTab1 === 1 && 'Try the keyboard navigation by clicking arrow left or right!'}</p>

                                    <p className="mb-5">{activeTab1 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

                                    <p className="mb-5">{activeTab1 === 3 && 'Wonderful transition effects.'}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" className={`btn btn-primary ${activeTab1 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab1(activeTab1 === 3 ? 2 : 1)}>
                                        Back
                                    </button>
                                    <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab1(activeTab1 === 1 ? 2 : 3)}>
                                        {activeTab1 === 3 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code2') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';

const [activeTab1, setActiveTab1] = useState(1);

<div className="inline-block w-full">
    <ul className="mb-5 grid grid-cols-3">
        <li>
            <div
                className={\`\${activeTab1 === 1 ? '!bg-primary text-white' : ''}
                flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]\`}
                onClick={() => setActiveTab1(1)}
            >
                <svg>...</svg>
            </div>
        </li>
        <li>
            <div
                className={\`\${activeTab1 === 2 ? '!bg-primary text-white' : ''}
                flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]\`}
                onClick={() => setActiveTab1(2)}
            >
                <svg>...</svg>
            </div>
        </li>
        <li>
            <div
                className={\`\${activeTab1 === 3 ? '!bg-primary text-white' : ''}
                flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]\`}
                onClick={() => setActiveTab1(3)}
            >
                <svg>...</svg>
            </div>
        </li>
    </ul>
    <div>
        <p className="mb-5">{activeTab1 === 1 && 'Try the keyboard navigation by clicking arrow left or right!'}</p>

        <p className="mb-5">{activeTab1 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

        <p className="mb-5">{activeTab1 === 3 && 'Wonderful transition effects.'}</p>
    </div>
    <div className="flex justify-between">
        <button type="button" className={\`btn btn-primary \${activeTab1 === 1 ? 'hidden' : ''}\`} onClick={() => setActiveTab1(activeTab1 === 3 ? 2 : 1)}>
            Back
        </button>
        <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab1(activeTab1 === 1 ? 2 : 3)}>
            {activeTab1 === 3 ? 'Finish' : 'Next'}
        </button>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Text & Icon */}
                    <div className="panel lg:col-span-2">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Text & Icon</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="inline-block w-full">
                                <ul className="mb-5 grid grid-cols-3">
                                    <li>
                                        <div
                                            className={`${activeTab2 === 1 ? '!bg-primary text-white' : ''}
                                            flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                                            onClick={() => setActiveTab2(1)}
                                        >
                                            <IconHome />
                                        </div>
                                        <span className="text-center block mt-2">Home</span>
                                    </li>
                                    <li>
                                        <div
                                            className={`${activeTab2 === 2 ? '!bg-primary text-white' : ''}
                                            flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                                            onClick={() => setActiveTab2(2)}
                                        >
                                            <IconUser className="w-5 h-5" />
                                        </div>
                                        <span className="text-center block mt-2">About</span>
                                    </li>
                                    <li>
                                        <div
                                            className={`${activeTab2 === 3 ? '!bg-primary text-white' : ''}
                                            flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                                            onClick={() => setActiveTab2(3)}
                                        >
                                            <IconThumbUp className="w-5 h-5" />
                                        </div>
                                        <span className={`text-center block mt-2 ${activeTab2 === 3 ? 'text-primary ' : ''}`}>Success</span>
                                    </li>
                                </ul>
                                <div>
                                    <p className="mb-5">{activeTab2 === 1 && ' Try the keyboard navigation by clicking arrow left or right!'}</p>

                                    <p className="mb-5">{activeTab2 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

                                    <p className="mb-5">{activeTab2 === 3 && 'Wonderful transition effects.'}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" className={`btn btn-primary ${activeTab2 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab2(activeTab2 === 3 ? 2 : 1)}>
                                        Back
                                    </button>
                                    <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab2(activeTab2 === 1 ? 2 : 3)}>
                                        {activeTab2 === 3 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code3') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';

const [activeTab2, setActiveTab2] = useState(1);

<div className="inline-block w-full">
    <ul className="mb-5 grid grid-cols-3">
        <li>
            <div
                className={\`\${activeTab2 === 1 ? '!bg-primary text-white' : ''}
                flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]\`}
                onClick={() => setActiveTab2(1)}
            >
                <svg>...</svg>
            </div>
            <span className="text-center block mt-2">Home</span>
        </li>
        <li>
            <div
                className={\`\${activeTab2 === 2 ? '!bg-primary text-white' : ''}
                flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]\`}
                onClick={() => setActiveTab2(2)}
            >
                <svg>...</svg>
            </div>
            <span className="text-center block mt-2">About</span>
        </li>
        <li>
            <div
                className={\`\${activeTab2 === 3 ? '!bg-primary text-white' : ''}
                flex items-center justify-center rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]\`}
                onClick={() => setActiveTab2(3)}
            >
                <svg>...</svg>
            </div>
            <span className={\`text-center block mt-2 \${activeTab2 === 3 ? 'text-primary ' : ''}\`}>Success</span>
        </li>
    </ul>
    <div>
        <p className="mb-5">{activeTab2 === 1 && ' Try the keyboard navigation by clicking arrow left or right!'}</p>

        <p className="mb-5">{activeTab2 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

        <p className="mb-5">{activeTab2 === 3 && 'Wonderful transition effects.'}</p>
    </div>
    <div className="flex justify-between">
        <button type="button" className={\`btn btn-primary \${activeTab2 === 1 ? 'hidden' : ''}\`} onClick={() => setActiveTab2(activeTab2 === 3 ? 2 : 1)}>
            Back
        </button>
        <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab2(activeTab2 === 1 ? 2 : 3)}>
            {activeTab2 === 3 ? 'Finish' : 'Next'}
        </button>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>

                {/* Circle */}
                <h4 className="badge bg-primary inline-block hover:top-0 text-base mb-0">Circle</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* icon only */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Icon Only</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="inline-block w-full">
                                <div className="relative z-[1]">
                                    <div
                                        className={`${activeTab3 === 1 ? 'w-[15%]' : activeTab3 === 2 ? 'w-[48%]' : activeTab3 === 3 ? 'w-[81%]' : ''}
                                            bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]`}
                                    ></div>
                                    <ul className="mb-5 grid grid-cols-3">
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab3 === 1 ? '!border-primary !bg-primary text-white' : ''}
                                            bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                                onClick={() => setActiveTab3(1)}
                                            >
                                                <IconHome />
                                            </button>
                                        </li>
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab3 === 2 ? '!border-primary !bg-primary text-white' : ''}
                                            bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                                onClick={() => setActiveTab3(2)}
                                            >
                                                <IconUser className="w-5 h-5" />
                                            </button>
                                        </li>
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab3 === 3 ? '!border-primary !bg-primary text-white' : ''}
                                            bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                                onClick={() => setActiveTab3(3)}
                                            >
                                                <IconThumbUp className="w-5 h-5" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="mb-5">{activeTab3 === 1 && ' Try the keyboard navigation by clicking arrow left or right!'}</p>

                                    <p className="mb-5">{activeTab3 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

                                    <p className="mb-5">{activeTab3 === 3 && 'Wonderful transition effects.'}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" className={`btn btn-primary ${activeTab3 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab3(activeTab3 === 3 ? 2 : 1)}>
                                        Back
                                    </button>
                                    <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab3(activeTab3 === 1 ? 2 : 3)}>
                                        {activeTab3 === 3 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code4') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';

const [activeTab3, setActiveTab3] = useState(1);

<div className="inline-block w-full">
    <div className="relative z-[1]">
        <div
            className={\`\${activeTab3 === 1 ? 'w-[15%]' : activeTab3 === 2 ? 'w-[48%]' : activeTab3 === 3 ? 'w-[81%]' : ''}
                bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]\`}
        ></div>
        <ul className="mb-5 grid grid-cols-3">
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab3 === 1 ? '!border-primary !bg-primary text-white' : ''}
                bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full\`}
                    onClick={() => setActiveTab3(1)}
                >
                    <svg>...</svg>
                </button>
            </li>
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab3 === 2 ? '!border-primary !bg-primary text-white' : ''}
                bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full\`}
                    onClick={() => setActiveTab3(2)}
                >
                    <svg>...</svg>
                </button>
            </li>
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab3 === 3 ? '!border-primary !bg-primary text-white' : ''}
                bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full\`}
                    onClick={() => setActiveTab3(3)}
                >
                    <svg>...</svg>
                </button>
            </li>
        </ul>
    </div>
    <div>
        <p className="mb-5">{activeTab3 === 1 && ' Try the keyboard navigation by clicking arrow left or right!'}</p>

        <p className="mb-5">{activeTab3 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

        <p className="mb-5">{activeTab3 === 3 && 'Wonderful transition effects.'}</p>
    </div>
    <div className="flex justify-between">
        <button type="button" className={\`btn btn-primary \${activeTab3 === 1 ? 'hidden' : ''}\`} onClick={() => setActiveTab3(activeTab3 === 3 ? 2 : 1)}>
            Back
        </button>
        <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab3(activeTab3 === 1 ? 2 : 3)}>
            {activeTab3 === 3 ? 'Finish' : 'Next'}
        </button>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Text & Icon */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Text & Icon</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code5')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="inline-block w-full">
                                <div className="relative z-[1]">
                                    <div
                                        className={`${activeTab4 === 1 ? 'w-[15%]' : activeTab4 === 2 ? 'w-[48%]' : activeTab4 === 3 ? 'w-[81%]' : ''}
                                        bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]`}
                                    ></div>
                                    <ul className="mb-5 grid grid-cols-3">
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab4 === 1 ? '!border-primary !bg-primary text-white' : ''}
                                                border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                                onClick={() => setActiveTab4(1)}
                                            >
                                                <IconHome />
                                            </button>
                                            <span className={`${activeTab4 === 1 ? 'text-primary ' : ''}text-center block mt-2`}>Home</span>
                                        </li>
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab4 === 2 ? '!border-primary !bg-primary text-white' : ''}
                                                border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                                onClick={() => setActiveTab4(2)}
                                            >
                                                <IconUser className="w-5 h-5" />
                                            </button>
                                            <span className={`${activeTab4 === 2 ? 'text-primary ' : ''}text-center block mt-2`}>About</span>
                                        </li>
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab4 === 3 ? '!border-primary !bg-primary text-white' : ''}
                                                border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                                onClick={() => setActiveTab4(3)}
                                            >
                                                <IconThumbUp className="w-5 h-5" />
                                            </button>
                                            <span className={`${activeTab4 === 3 ? 'text-primary ' : ''}text-center block mt-2`}>Success</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="mb-5">{activeTab4 === 1 && ' Try the keyboard navigation by clicking arrow left or right!'}</p>

                                    <p className="mb-5">{activeTab4 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

                                    <p className="mb-5">{activeTab4 === 3 && 'Wonderful transition effects.'}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" className={`btn btn-primary ${activeTab4 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab4(activeTab4 === 3 ? 2 : 1)}>
                                        Back
                                    </button>
                                    <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab4(activeTab4 === 1 ? 2 : 3)}>
                                        {activeTab4 === 3 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code5') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';

const [activeTab4, setActiveTab4] = useState(1);

<div className="inline-block w-full">
    <div className="relative z-[1]">
        <div
            className={\`\${activeTab4 === 1 ? 'w-[15%]' : activeTab4 === 2 ? 'w-[48%]' : activeTab4 === 3 ? 'w-[81%]' : ''}
            bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]\`}
        ></div>
        <ul className="mb-5 grid grid-cols-3">
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab4 === 1 ? '!border-primary !bg-primary text-white' : ''}
                    border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full\`}
                    onClick={() => setActiveTab4(1)}
                >
                    <svg>...</svg>
                </button>
                <span className={\`\${activeTab4 === 1 ? 'text-primary ' : ''}text-center block mt-2\`}>Home</span>
            </li>
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab4 === 2 ? '!border-primary !bg-primary text-white' : ''}
                    border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full\`}
                    onClick={() => setActiveTab4(2)}
                >
                    <svg>...</svg>
                </button>
                <span className={\`\${activeTab4 === 2 ? 'text-primary ' : ''}text-center block mt-2\`}>About</span>
            </li>
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab4 === 3 ? '!border-primary !bg-primary text-white' : ''}
                    border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full\`}
                    onClick={() => setActiveTab4(3)}
                >
                    <svg>...</svg>
                </button>
                <span className={\`\${activeTab4 === 3 ? 'text-primary ' : ''}text-center block mt-2\`}>Success</span>
            </li>
        </ul>
    </div>
    <div>
        <p className="mb-5">{activeTab4 === 1 && ' Try the keyboard navigation by clicking arrow left or right!'}</p>

        <p className="mb-5">{activeTab4 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

        <p className="mb-5">{activeTab4 === 3 && 'Wonderful transition effects.'}</p>
    </div>
    <div className="flex justify-between">
        <button type="button" className={\`btn btn-primary \${activeTab4 === 1 ? 'hidden' : ''}\`} onClick={() => setActiveTab4(activeTab4 === 3 ? 2 : 1)}>
            Back
        </button>
        <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab4(activeTab4 === 1 ? 2 : 3)}>
            {activeTab4 === 3 ? 'Finish' : 'Next'}
        </button>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>

                {/* Square */}
                <h4 className="badge bg-primary inline-block hover:top-0 text-base mb-0">Square</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* icon only */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Icon Only</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code6')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="inline-block w-full">
                                <div className="relative z-[1]">
                                    <div
                                        className={`${activeTab5 === 1 ? 'w-[15%]' : activeTab5 === 2 ? 'w-[48%]' : activeTab5 === 3 ? 'w-[81%]' : ''}
                                        bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]`}
                                    ></div>
                                    <ul className="mb-5 grid grid-cols-3">
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab5 === 1 ? '!border-primary !bg-primary text-white' : ''}
                                                bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16`}
                                                onClick={() => setActiveTab5(1)}
                                            >
                                                <IconHome />
                                            </button>
                                        </li>
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab5 === 2 ? '!border-primary !bg-primary text-white' : ''}
                                                bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16`}
                                                onClick={() => setActiveTab5(2)}
                                            >
                                                <IconUser className="w-5 h-5" />
                                            </button>
                                        </li>
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab5 === 3 ? '!border-primary !bg-primary text-white' : ''}
                                                bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16`}
                                                onClick={() => setActiveTab5(3)}
                                            >
                                                <IconThumbUp className="w-5 h-5" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="mb-5">{activeTab5 === 1 && ' Try the keyboard navigation by clicking arrow left or right!'}</p>

                                    <p className="mb-5">{activeTab5 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

                                    <p className="mb-5">{activeTab5 === 3 && 'Wonderful transition effects.'}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" className={`btn btn-primary ${activeTab5 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab5(activeTab5 === 3 ? 2 : 1)}>
                                        Back
                                    </button>
                                    <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab5(activeTab5 === 1 ? 2 : 3)}>
                                        {activeTab5 === 3 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code6') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';

const [activeTab5, setActiveTab5] = useState(1);

<div className="inline-block w-full">
    <div className="relative z-[1]">
        <div
            className={\`\${activeTab5 === 1 ? 'w-[15%]' : activeTab5 === 2 ? 'w-[48%]' : activeTab5 === 3 ? 'w-[81%]' : ''}
            bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]\`}
        ></div>
        <ul className="mb-5 grid grid-cols-3">
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab5 === 1 ? '!border-primary !bg-primary text-white' : ''}
                    bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16\`}
                    onClick={() => setActiveTab5(1)}
                >
                    <svg>...</svg>
                </button>
            </li>
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab5 === 2 ? '!border-primary !bg-primary text-white' : ''}
                    bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16\`}
                    onClick={() => setActiveTab5(2)}
                >
                    <svg>...</svg>
                </button>
            </li>
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab5 === 3 ? '!border-primary !bg-primary text-white' : ''}
                    bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16\`}
                    onClick={() => setActiveTab5(3)}
                >
                    <svg>...</svg>
                </button>
            </li>
        </ul>
    </div>
    <div>
        <p className="mb-5">{activeTab5 === 1 && ' Try the keyboard navigation by clicking arrow left or right!'}</p>

        <p className="mb-5">{activeTab5 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

        <p className="mb-5">{activeTab5 === 3 && 'Wonderful transition effects.'}</p>
    </div>
    <div className="flex justify-between">
        <button type="button" className={\`btn btn-primary \${activeTab5 === 1 ? 'hidden' : ''}\`} onClick={() => setActiveTab5(activeTab5 === 3 ? 2 : 1)}>
            Back
        </button>
        <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab5(activeTab5 === 1 ? 2 : 3)}>
            {activeTab5 === 3 ? 'Finish' : 'Next'}
        </button>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Text & Icon */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Text & Icon</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code7')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="inline-block w-full">
                                <div className="relative z-[1]">
                                    <div
                                        className={`${activeTab6 === 1 ? 'w-[15%]' : activeTab6 === 2 ? 'w-[48%]' : activeTab6 === 3 ? 'w-[81%]' : ''}
                                        bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]`}
                                    ></div>
                                    <ul className="mb-5 grid grid-cols-3">
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab6 === 1 ? '!border-primary !bg-primary text-white' : ''}
                                                border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16`}
                                                onClick={() => setActiveTab6(1)}
                                            >
                                                <IconHome />
                                            </button>
                                            <span className={`${activeTab6 === 1 ? 'text-primary ' : ''}text-center block mt-2`}>Home</span>
                                        </li>
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab6 === 2 ? '!border-primary !bg-primary text-white' : ''}
                                                border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16`}
                                                onClick={() => setActiveTab6(2)}
                                            >
                                                <IconUser className="w-5 h-5" />
                                            </button>
                                            <span className={`${activeTab6 === 2 ? 'text-primary ' : ''}text-center block mt-2`}>About</span>
                                        </li>
                                        <li className="mx-auto">
                                            <button
                                                type="button"
                                                className={`${activeTab6 === 3 ? '!border-primary !bg-primary text-white' : ''}
                                                border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16`}
                                                onClick={() => setActiveTab6(3)}
                                            >
                                                <IconThumbUp className="w-5 h-5" />
                                            </button>
                                            <span className={`${activeTab6 === 3 ? 'text-primary ' : ''}text-center block mt-2`}>Success</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="mb-5">{activeTab6 === 1 && ' Try the keyboard navigation by clicking arrow left or right!'}</p>

                                    <p className="mb-5">{activeTab6 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

                                    <p className="mb-5">{activeTab6 === 3 && 'Wonderful transition effects.'}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" className={`btn btn-primary ${activeTab6 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab6(activeTab6 === 3 ? 2 : 1)}>
                                        Back
                                    </button>
                                    <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab6(activeTab6 === 1 ? 2 : 3)}>
                                        {activeTab6 === 3 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code7') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';

const [activeTab6, setActiveTab6] = useState(1);

<div className="inline-block w-full">
    <div className="relative z-[1]">
        <div
            className={\`\${activeTab6 === 1 ? 'w-[15%]' : activeTab6 === 2 ? 'w-[48%]' : activeTab6 === 3 ? 'w-[81%]' : ''}
            bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]\`}
        ></div>
        <ul className="mb-5 grid grid-cols-3">
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab6 === 1 ? '!border-primary !bg-primary text-white' : ''}
                    border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16\`}
                    onClick={() => setActiveTab6(1)}
                >
                    <svg>...</svg>
                </button>
                <span className={\`\${activeTab6 === 1 ? 'text-primary ' : ''}text-center block mt-2\`}>Home</span>
            </li>
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab6 === 2 ? '!border-primary !bg-primary text-white' : ''}
                    border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16\`}
                    onClick={() => setActiveTab6(2)}
                >
                    <svg>...</svg>
                </button>
                <span className={\`\${activeTab6 === 2 ? 'text-primary ' : ''}text-center block mt-2\`}>About</span>
            </li>
            <li className="mx-auto">
                <button type="button"
                    className={\`\${activeTab6 === 3 ? '!border-primary !bg-primary text-white' : ''}
                    border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16\`}
                    onClick={() => setActiveTab6(3)}
                >
                    <svg>...</svg>
                </button>
                <span className={\`\${activeTab6 === 3 ? 'text-primary ' : ''}text-center block mt-2\`}>Success</span>
            </li>
        </ul>
    </div>
    <div>
        <p className="mb-5">{activeTab6 === 1 && ' Try the keyboard navigation by clicking arrow left or right!'}</p>

        <p className="mb-5">{activeTab6 === 2 && 'The next and previous buttons help you to navigate through your content.'}</p>

        <p className="mb-5">{activeTab6 === 3 && 'Wonderful transition effects.'}</p>
    </div>
    <div className="flex justify-between">
        <button type="button" className={\`btn btn-primary \${activeTab6 === 1 ? 'hidden' : ''}\`} onClick={() => setActiveTab6(activeTab6 === 3 ? 2 : 1)}>
            Back
        </button>
        <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab6(activeTab6 === 1 ? 2 : 3)}>
            {activeTab6 === 3 ? 'Finish' : 'Next'}
        </button>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wizards;
