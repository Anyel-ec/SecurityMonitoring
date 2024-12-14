import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconBellBing from '../../components/Icon/IconBellBing';
import IconLoader from '../../components/Icon/IconLoader';
import IconSettings from '../../components/Icon/IconSettings';
import IconCaretDown from '../../components/Icon/IconCaretDown';

const InputGroup = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Input Group'));
    });
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
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
                    <span>Input Group</span>
                </li>
            </ul>

            <div className="pt-5 space-y-4">
                {/*  Basic  */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" id="basic">
                    {/* default */}
                    <div className="panel lg:row-span-2">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Default</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <form>
                                <div className="mb-5">
                                    <div className="flex">
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            @
                                        </div>
                                        <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="flex">
                                        <input type="text" placeholder="Recipient's username" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            @example.com
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="url">Your vanity URL</label>
                                    <div className="flex">
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            https://
                                        </div>
                                        <input id="url" type="text" placeholder="example.com/users/" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="flex">
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            $
                                        </div>
                                        <input type="text" placeholder="" className="form-input rounded-none" />
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            .00
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex">
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] whitespace-nowrap">
                                            With textarea
                                        </div>
                                        <textarea rows={4} className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {codeArr.includes('code1') && (
                            <CodeHighlight>
                                <pre className="language-xml">{`<form>
    <div className="mb-5">
        <div className="flex">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                @
            </div>
            <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
        </div>
    </div>
    <div className="mb-5">
        <div className="flex">
            <input type="text" placeholder="Recipient's username" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                @example.com
            </div>
        </div>
    </div>
    <div className="mb-5">
        <label htmlFor="url">Your vanity URL</label>
        <div className="flex">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                https://
            </div>
            <input id="url" type="text" placeholder="example.com/users/" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
        </div>
    </div>
    <div className="mb-5">
        <div className="flex">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                $
            </div>
            <input type="text" placeholder="" className="form-input rounded-none" />
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                .00
            </div>
        </div>
    </div>
    <div>
        <div className="flex">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] whitespace-nowrap">
                With textarea
            </div>
            <textarea rows={4} className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"></textarea>
        </div>
    </div>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* simple icon */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Simple Icon</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="mb-5">
                                <label htmlFor="iconLeft">Left</label>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <IconBellBing className="text-white-dark" />
                                    </div>
                                    <input id="iconLeft" type="text" placeholder="Notification" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="iconRight">Right</label>
                                <div className="flex">
                                    <input id="iconRight" type="text" placeholder="Notification" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <IconBellBing className="text-white-dark" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code2') && (
                            <CodeHighlight>
                                <pre className="language-xml">{`{/*left*/}
<div className="flex">
    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
        <svg> ... </svg>
    </div>
    <input id="iconLeft" type="text" placeholder="Notification" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
</div>

{/*right*/}
<div className="flex">
    <input id="iconRight" type="text" placeholder="Notification" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
        <svg> ... </svg>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/*  spinning Icon  */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Spinning Icon</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="mb-5">
                                <label htmlFor="spiLeft">Left</label>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <IconLoader className="text-white-dark animate-spin" />
                                    </div>
                                    <input id="spiLeft" type="text" placeholder="Spinners" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="spiRight">Right</label>
                                <div className="flex">
                                    <input id="spiRight" type="text" placeholder="Spinners" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <IconLoader className="text-white-dark animate-spin" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code3') && (
                            <CodeHighlight>
                                <pre className="language-xml">{`{/*left*/}
<div className="flex">
    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
        <svg> ... </svg>
    </div>
    <input id="spiLeft" type="text" placeholder="Spinners" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
</div>

{/*right*/}
<div className="flex">
    <input id="spiRight" type="text" placeholder="Spinners" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
        <svg> ... </svg>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/*  dropdown icon */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Dropdown Icon</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div>
                                <label htmlFor="dropdownLeft">Left</label>
                                <div className="flex">
                                    <div className="dropdown">
                                        <Dropdown
                                            offset={[0, 5]}
                                            placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                            btnClassName="bg-primary flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] cursor-pointer pt-2 pb-2"
                                            button={<IconSettings className="w-5 h-5 text-white" />}
                                        >
                                            <ul className="!min-w-[170px]">
                                                <li>
                                                    <button type="button">Action</button>
                                                </li>
                                                <li>
                                                    <button type="button">Another action</button>
                                                </li>
                                                <li>
                                                    <button type="button">Something else here</button>
                                                </li>
                                                <li>
                                                    <button type="button">Separated link</button>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                    <input id="dropdownLeft" type="text" placeholder="Dropdown" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                            </div>
                            <div className="mt-5">
                                <label htmlFor="dropdownRight">Right</label>
                                <div className="flex">
                                    <input id="dropdownLeft" type="text" placeholder="Dropdown" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                    <div className="dropdown">
                                        <Dropdown
                                            offset={[0, 5]}
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="bg-success flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] cursor-pointer pt-2 pb-2"
                                            button={<IconSettings className="w-5 h-5 text-white" />}
                                        >
                                            <ul className="!min-w-[170px]">
                                                <li>
                                                    <button type="button">Action</button>
                                                </li>
                                                <li>
                                                    <button type="button">Another action</button>
                                                </li>
                                                <li>
                                                    <button type="button">Something else here</button>
                                                </li>
                                                <li>
                                                    <button type="button">Separated link</button>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code4') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import Dropdown from '../../components/Dropdown';
<div className="flex">
    <div className="dropdown">
        <Dropdown
            offset={[0, 5]}
            placement={\`\${isRtl ? 'bottom-end' : 'bottom-start'}\`}
            btnClassName="bg-primary flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] cursor-pointer pt-2 pb-2"
            button={
                <svg> ... </svg>
            }
        >
            <ul className="!min-w-[170px]">
                <li>
                    <button type="button">Action</button>
                </li>
                <li>
                    <button type="button">Another action</button>
                </li>
                <li>
                    <button type="button">Something else here</button>
                </li>
                <li>
                    <button type="button">Separated link</button>
                </li>
            </ul>
        </Dropdown>
    </div>
    <input id="dropdownLeft" type="text" placeholder="Dropdown" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
</div>

<div className="flex">
    <input id="dropdownLeft" type="text" placeholder="Dropdown" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
    <div className="dropdown">
        <Dropdown
            offset={[0, 5]}
            placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
            btnClassName="bg-success flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] cursor-pointer pt-2 pb-2"
            button={
                <svg> ... </svg>
            }
        >
            <ul className="!min-w-[170px]">
                <li>
                    <button type="button">Action</button>
                </li>
                <li>
                    <button type="button">Another action</button>
                </li>
                <li>
                    <button type="button">Something else here</button>
                </li>
                <li>
                    <button type="button">Separated link</button>
                </li>
            </ul>
        </Dropdown>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* checkboxes */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Checkboxes</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code5')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="mb-5">
                                <label htmlFor="checkLeft">Left</label>
                                <div className="flex">
                                    <div className="bg-[#f1f2f3] dark:bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c]">
                                        <input type="checkbox" className="form-checkbox border-white-light dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked />
                                    </div>
                                    <input id="checkLeft" type="text" placeholder="Checkbox" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                            </div>
                            <label htmlFor="checkRight">Right</label>
                            <div className="flex">
                                <input id="checkRight" type="text" placeholder="Checkbox" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                <div className="bg-[#f1f2f3] dark:bg-[#1b2e4b] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c]">
                                    <input type="checkbox" className="form-checkbox text-warning border-white-light dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked />
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code5') && (
                            <CodeHighlight>
                                <pre className="language-xml">{`{/*left*/}
<div className="flex">
    <div className="bg-[#f1f2f3] dark:bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c]">
        <input type="checkbox" className="form-checkbox border-white-light dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked />
    </div>
    <input id="checkLeft" type="text" placeholder="Checkbox" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
</div>

{/*right*/}
<div className="flex">
    <input id="checkRight" type="text" placeholder="Checkbox" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
    <div className="bg-[#f1f2f3] dark:bg-[#1b2e4b] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c]">
        <input type="checkbox" className="form-checkbox text-warning border-white-light dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked />
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Radio */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Radios</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code6')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="mb-5">
                                <label htmlFor="radioLeft">Left</label>
                                <div className="flex">
                                    <div className="bg-[#f1f2f3] dark:bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c]">
                                        <input type="radio" className="form-radio text-info border-white-light dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked />
                                    </div>
                                    <input id="radioLeft" type="text" placeholder="Radio" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="radioRight">Right</label>
                                <div className="flex">
                                    <input id="radioRight" type="text" placeholder="Radio" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                    <div className="bg-[#f1f2f3] dark:bg-[#1b2e4b] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c]">
                                        <input type="radio" className="form-radio text-danger border-white-light dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code6') && (
                            <CodeHighlight>
                                <pre className="language-xml">{`{/*left*/}
<div className="flex">
    <div className="bg-[#f1f2f3] dark:bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c]">
        <input type="radio" className="form-radio text-info border-white-light dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked />
    </div>
    <input id="radioLeft" type="text" placeholder="Radio" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
</div>

{/*right*/}
<div className="flex">
    <input id="radioRight" type="text" placeholder="Radio" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
    <div className="bg-[#f1f2f3] dark:bg-[#1b2e4b] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c]">
        <input type="radio" className="form-radio text-danger border-white-light dark:border-white-dark ltr:mr-0 rtl:ml-0" defaultChecked />
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* switch */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Switch</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code7')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="mb-5">
                                <label htmlFor="switchLeft">Left</label>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <label className="w-7 h-4 relative cursor-pointer mb-0">
                                            <input type="checkbox" className="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer" id="custom_switch_checkbox1" />
                                            <span className="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                    <input id="switchLeft" type="text" placeholder="Switch" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="switchRight">Right</label>
                                <div className="flex">
                                    <input id="switchRight" type="text" placeholder="Switch" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <label className="w-7 h-4 relative cursor-pointer mb-0">
                                            <input type="checkbox" className="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer" id="custom_switch_checkbox2" />
                                            <span className="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code7') && (
                            <CodeHighlight>
                                <pre className="language-xml">{`{/*left*/}
<div className="flex">
    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
        <label className="w-7 h-4 relative cursor-pointer mb-0">
            <input type="checkbox" className="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer" id="custom_switch_checkbox1" />
            <span className="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
        </label>
    </div>
    <input id="switchLeft" type="text" placeholder="Switch" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
</div>

{/*right*/}
<div className="flex">
    <input id="switchRight" type="text" placeholder="Switch" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
        <label className="w-7 h-4 relative cursor-pointer mb-0">
            <input type="checkbox" className="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer" id="custom_switch_checkbox2" />
            <span className="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
        </label>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
                {/* Sizes */}
                <div className="panel" id="sizes">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Sizes</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code8')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <form>
                            <div className="mb-5">
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        Large
                                    </div>
                                    <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none py-2.5 text-base" />
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        Default
                                    </div>
                                    <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        Small
                                    </div>
                                    <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none py-1.5 text-xs" />
                                </div>
                            </div>
                        </form>
                    </div>
                    {codeArr.includes('code8') && (
                        <CodeHighlight>
                            <pre className="language-xml">{`<form>
    <div className="mb-5">
        <div className="flex">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                Small
            </div>
            <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none py-2.5 text-base" />
        </div>
    </div>
    <div className="mb-5">
        <div className="flex">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                Small
            </div>
            <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
        </div>
    </div>
    <div>
        <div className="flex">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                Small
            </div>
            <input type="text" placeholder="Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none py-1.5 text-xs" />
        </div>
    </div>
</form>`}</pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* <!-- Multiple --> */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" id="multiple">
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Multiple inputs</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code9')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <form>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        First and last name
                                    </div>
                                    <input type="text" placeholder="First Name" className="form-input ltr:border-r-0 rtl:border-l-0 focus:!border-r rounded-none flex-1" />
                                    <input type="text" placeholder="Last Name" className="form-input ltr:rounded-l-none rtl:rounded-r-none flex-1" />
                                </div>
                            </form>
                        </div>
                        {codeArr.includes('code9') && (
                            <CodeHighlight>
                                <pre className="language-xml">{`<form>
    <div className="flex">
        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
            First and last name
        </div>
        <input type="text" placeholder="First Name" className="form-input ltr:border-r-0 rtl:border-l-0 focus:!border-r rounded-none flex-1" />
        <input type="text" placeholder="Last Name" className="form-input ltr:rounded-l-none rtl:rounded-r-none flex-1" />
    </div>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Multiple addons</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code10')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <form>
                                <div className="mb-5">
                                    <div className="flex">
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            $
                                        </div>
                                        <div className="bg-[#eee] flex justify-center items-center rounded-none px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            0.00
                                        </div>
                                        <input type="text" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none flex-1" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex">
                                        <input type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none flex-1 ltr:rounded-l-md rtl:rounded-r-md" />
                                        <div className="bg-[#eee] flex justify-center items-center rounded-none px-3 font-semibold border border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            0.00
                                        </div>
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            $
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {codeArr.includes('code10') && (
                            <CodeHighlight>
                                <pre className="language-xml">{`<form>
    <div className="mb-5">
        <div className="flex">
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                $
            </div>
            <div className="bg-[#eee] flex justify-center items-center rounded-none px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                0.00
            </div>
            <input type="text" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none flex-1" />
        </div>
    </div>
    <div>
        <div className="flex">
            <input type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none flex-1 ltr:rounded-l-md rtl:rounded-r-md" />
            <div className="bg-[#eee] flex justify-center items-center rounded-none px-3 font-semibold border border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                0.00
            </div>
            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                $
            </div>
        </div>
    </div>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" id="with_action">
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Buttons with dropdowns</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code11')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <form>
                                <div className="mb-5 dropdown">
                                    <label htmlFor="dropdownLeftButton">Left</label>
                                    <div className="flex">
                                        <div className="dropdown">
                                            <Dropdown
                                                offset={[0, 5]}
                                                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                                btnClassName="bg-primary text-white flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] cursor-pointer pt-2 pb-2"
                                                button={<span>Dropdown</span>}
                                            >
                                                <ul className="!min-w-[170px]">
                                                    <li>
                                                        <button type="button">Action</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Another action</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Something else here</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Separated link</button>
                                                    </li>
                                                </ul>
                                            </Dropdown>
                                        </div>
                                        <input id="dropdownLeftButton" type="text" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                    </div>
                                </div>

                                <div className="dropdown">
                                    <label htmlFor="dropdownRightButton">Right</label>
                                    <div className="flex">
                                        <input id="dropdownRightButton" type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                        <div className="dropdown">
                                            <Dropdown
                                                offset={[0, 5]}
                                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                btnClassName="bg-danger text-white flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] cursor-pointer pt-2 pb-2"
                                                button={<span>Dropdown</span>}
                                            >
                                                <ul className="!min-w-[170px]">
                                                    <li>
                                                        <button type="button">Action</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Another action</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Something else here</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Separated link</button>
                                                    </li>
                                                </ul>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {codeArr.includes('code11') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import Dropdown from '../../components/Dropdown';
<form>
    <div className="mb-5 dropdown">
        <label htmlFor="dropdownLeftButton">Left</label>
        <div className="flex">
            <div className="dropdown">
                <Dropdown
                    offset={[0, 5]}
                    placement={\`\${isRtl ? 'bottom-end' : 'bottom-start'}\`}
                    btnClassName="bg-primary text-white flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] cursor-pointer pt-2 pb-2"
                    button={<span>Dropdown</span>}
                >
                    <ul className="!min-w-[170px]">
                        <li>
                            <button type="button">Action</button>
                        </li>
                        <li>
                            <button type="button">Another action</button>
                        </li>
                        <li>
                            <button type="button">Something else here</button>
                        </li>
                        <li>
                            <button type="button">Separated link</button>
                        </li>
                    </ul>
                </Dropdown>
            </div>
            <input id="dropdownLeftButton" type="text" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
        </div>
    </div>

    <div className="dropdown">
        <label htmlFor="dropdownRightButton">Right</label>
        <div className="flex">
            <input id="dropdownRightButton" type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
            <div className="dropdown">
                <Dropdown
                    offset={[0, 5]}
                    placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
                    btnClassName="bg-danger text-white flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] cursor-pointer pt-2 pb-2"
                    button={<span>Dropdown</span>}
                >
                    <ul className="!min-w-[170px]">
                        <li>
                            <button type="button">Action</button>
                        </li>
                        <li>
                            <button type="button">Another action</button>
                        </li>
                        <li>
                            <button type="button">Something else here</button>
                        </li>
                        <li>
                            <button type="button">Separated link</button>
                        </li>
                    </ul>
                </Dropdown>
            </div>
        </div>
    </div>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Segmented buttons</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code12')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <form>
                                <div className="mb-5 dropdown">
                                    <label htmlFor="btnLeft">Left</label>
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className="bg-info text-white flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-info"
                                        >
                                            Action
                                        </button>
                                        <div className="dropdown">
                                            <Dropdown
                                                offset={[0, 5]}
                                                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                                btnClassName="bg-white dark:bg-[#1b2e4b] text-info flex justify-center items-center rounded-none px-3 font-semibold border border-info cursor-pointer pt-2 pb-2"
                                                button={<IconCaretDown className="w-5 h-5" />}
                                            >
                                                <ul className="!min-w-[170px]">
                                                    <li>
                                                        <button type="button">Action</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Another action</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Something else here</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Separated link</button>
                                                    </li>
                                                </ul>
                                            </Dropdown>
                                        </div>

                                        <input id="btnLeft" type="text" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none ltr:border-l-0 rtl:border-r-0" />
                                    </div>
                                </div>
                                <div className="dropdown">
                                    <label htmlFor="btnLeft">Right</label>
                                    <div className="flex">
                                        <input id="btnRight" type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none ltr:border-r-0 rtl:border-l-0" />
                                        <div className="dropdown">
                                            <Dropdown
                                                offset={[0, 5]}
                                                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                                btnClassName="bg-white dark:bg-[#1b2e4b] text-secondary flex justify-center items-center rounded-none px-3 font-semibold border border-secondary pt-2 pb-2"
                                                button={<IconCaretDown className="w-5 h-5" />}
                                            >
                                                <ul className="!min-w-[170px]">
                                                    <li>
                                                        <button type="button">Action</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Another action</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Something else here</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Separated link</button>
                                                    </li>
                                                </ul>
                                            </Dropdown>
                                        </div>
                                        <button
                                            type="button"
                                            className="bg-secondary text-white flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-secondary cursor-pointer"
                                        >
                                            Action
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {codeArr.includes('code12') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import Dropdown from '../../components/Dropdown';
<form>
    <div className="mb-5 dropdown">
        <label htmlFor="btnLeft">Left</label>
        <div className="flex">
            <button
                type="button"
                className="bg-info text-white flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-info"
            >
                Action
            </button>
            <div className="dropdown">
                <Dropdown
                    offset={[0, 5]}
                    placement={\`\${isRtl ? 'bottom-end' : 'bottom-start'}\`}
                    btnClassName="bg-white dark:bg-[#1b2e4b] text-info flex justify-center items-center rounded-none px-3 font-semibold border border-info cursor-pointer pt-2 pb-2"
                    button={
                        <svg> ... </svg>
                    }
                >
                    <ul className="!min-w-[170px]">
                        <li>
                            <button type="button">Action</button>
                        </li>
                        <li>
                            <button type="button">Another action</button>
                        </li>
                        <li>
                            <button type="button">Something else here</button>
                        </li>
                        <li>
                            <button type="button">Separated link</button>
                        </li>
                    </ul>
                </Dropdown>
            </div>

            <input id="btnLeft" type="text" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none ltr:border-l-0 rtl:border-r-0" />
        </div>
    </div>
    <div className="dropdown">
        <label htmlFor="btnLeft">Right</label>
        <div className="flex">
            <input id="btnRight" type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none ltr:border-r-0 rtl:border-l-0" />
            <div className="dropdown">
                <Dropdown
                    offset={[0, 5]}
                    placement={\`\${isRtl ? 'bottom-end' : 'bottom-start'}\`}
                    btnClassName="bg-white dark:bg-[#1b2e4b] text-secondary flex justify-center items-center rounded-none px-3 font-semibold border border-secondary pt-2 pb-2"
                    button={
                        <svg> ... </svg>
                    }
                >
                    <ul className="!min-w-[170px]">
                        <li>
                            <button type="button">Action</button>
                        </li>
                        <li>
                            <button type="button">Another action</button>
                        </li>
                        <li>
                            <button type="button">Something else here</button>
                        </li>
                        <li>
                            <button type="button">Separated link</button>
                        </li>
                    </ul>
                </Dropdown>
            </div>
            <button
                type="button"
                className="bg-secondary text-white flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-secondary cursor-pointer"
            >
                Action
            </button>
        </div>
    </div>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    <div className="panel lg:col-span-2">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Button addons</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code13')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <form>
                                <div className="mb-5">
                                    <label htmlFor="addonsLeft">Left</label>
                                    <div className="flex">
                                        <button type="button" className="btn btn-info ltr:rounded-r-none rtl:rounded-l-none">
                                            Button
                                        </button>
                                        <input id="addonsLeft" type="text" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="addonsRight">Right</label>
                                    <div className="flex">
                                        <input id="addonsRight" type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                        <button type="button" className="btn btn-secondary ltr:rounded-l-none rtl:rounded-r-none">
                                            Button
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="addonsLeftoutline">Left</label>
                                    <div className="flex">
                                        <button type="button" className="btn btn-outline-info ltr:rounded-r-none rtl:rounded-l-none">
                                            Button
                                        </button>
                                        <button type="button" className="btn btn-outline-info rounded-none ltr:border-l-0 rtl:border-r-0">
                                            Button
                                        </button>
                                        <input id="addonsLeftoutline" type="text" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="addonsRightoutline">Right</label>
                                    <div className="flex">
                                        <input id="addonsRightoutline" type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                        <button type="button" className="btn btn-outline-secondary rounded-none ltr:border-r-0 rtl:border-l-0">
                                            Button
                                        </button>
                                        <button type="button" className="btn btn-outline-secondary ltr:rounded-l-none rtl:rounded-r-none">
                                            Button
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {codeArr.includes('code13') && (
                            <CodeHighlight>
                                <pre className="language-xml">{`<form>
    <div className="mb-5">
        <label htmlFor="addonsLeft">Left</label>
        <div className="flex">
            <button type="button" className="btn btn-info ltr:rounded-r-none rtl:rounded-l-none">
                Button
            </button>
            <input id="addonsLeft" type="text" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
        </div>
    </div>
    <div className="mb-5">
        <label htmlFor="addonsRight">Right</label>
        <div className="flex">
            <input id="addonsRight" type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
            <button type="button" className="btn btn-secondary ltr:rounded-l-none rtl:rounded-r-none">
                Button
            </button>
        </div>
    </div>
    <div className="mb-5">
        <label htmlFor="addonsLeftoutline">Left</label>
        <div className="flex">
            <button type="button" className="btn btn-outline-info ltr:rounded-r-none rtl:rounded-l-none">
                Button
            </button>
            <button type="button" className="btn btn-outline-info rounded-none ltr:border-l-0 rtl:border-r-0">
                Button
            </button>
            <input id="addonsLeftoutline" type="text" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
        </div>
    </div>
    <div>
        <label htmlFor="addonsRightoutline">Right</label>
        <div className="flex">
            <input id="addonsRightoutline" type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
            <button type="button" className="btn btn-outline-secondary rounded-none ltr:border-r-0 rtl:border-l-0">
                Button
            </button>
            <button type="button" className="btn btn-outline-secondary ltr:rounded-l-none rtl:rounded-r-none">
                Button
            </button>
        </div>
    </div>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputGroup;
