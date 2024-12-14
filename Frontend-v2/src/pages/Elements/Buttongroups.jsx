import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconCaretDown from '../../components/Icon/IconCaretDown';

const Buttongroups = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Buttongroups'));
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
                        Elements
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Button Group</span>
                </li>
            </ul>
            <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
                {/* Horizontal */}
                <div className="panel" id="horizontal">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Horizontal</h5>
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
                    <div className="mb-5 text-center">
                        <div className="relative inline-flex align-middle">
                            <button type="button" className="btn btn-dark ltr:rounded-r-none rtl:rounded-l-none">
                                Left
                            </button>
                            <button type="button" className="btn btn-dark rounded-none">
                                Middle
                            </button>
                            <button type="button" className="btn btn-dark ltr:rounded-l-none rtl:rounded-r-none">
                                Right
                            </button>
                        </div>
                    </div>
                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre>{`<div className="relative inline-flex align-middle">
    <button type="button" className="btn btn-dark ltr:rounded-r-none rtl:rounded-l-none">
        Left
    </button>
    <button type="button" className="btn btn-dark rounded-none">
        Middle
    </button>
    <button type="button" className="btn btn-dark ltr:rounded-l-none rtl:rounded-r-none">
        Right
    </button>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Input Group */}
                <div className="panel" id="input_group">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Input Group</h5>
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
                        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-2 w-full">
                            <div className="relative inline-flex align-middle">
                                <button type="button" className="btn btn-dark ltr:rounded-r-none rtl:rounded-l-none">
                                    1
                                </button>
                                <button type="button" className="btn btn-dark rounded-none">
                                    2
                                </button>
                                <button type="button" className="btn btn-dark rounded-none">
                                    3
                                </button>
                                <button type="button" className="btn btn-dark ltr:rounded-l-none rtl:rounded-r-none">
                                    4
                                </button>
                            </div>
                            <div className="flex relative items-stretch flex-wrap">
                                <div className="ltr:-mr-px rtl:-ml-px flex">
                                    <span className="border border-white-light dark:border-[#17263c] ltr:rounded-l rtl:rounded-r bg-[#f1f2f3] flex items-center justify-center text-black px-4 py-1.5 dark:bg-[#1a1c2d] dark:text-white-dark">
                                        @
                                    </span>
                                </div>
                                <input type="text" placeholder="Input group example" className="flex-1 form-input ltr:rounded-l-none rtl:rounded-r-none" />
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre>{`<div className="flex flex-wrap justify-center sm:justify-between items-center gap-2 w-full">
    <div className="relative inline-flex align-middle">
        <button type="button" className="btn btn-dark ltr:rounded-r-none rtl:rounded-l-none">
            1
        </button>
        <button type="button" className="btn btn-dark rounded-none">
            2
        </button>
        <button type="button" className="btn btn-dark rounded-none">
            3
        </button>
        <button type="button" className="btn btn-dark ltr:rounded-l-none rtl:rounded-r-none">
            4
        </button>
    </div>
    <div className="flex relative items-stretch flex-wrap">
        <div className="ltr:-mr-px rtl:-ml-px flex">
            <span className="border border-white-light dark:border-[#17263c] ltr:rounded-l rtl:rounded-r bg-[#f1f2f3] flex items-center justify-center text-black px-4 py-1.5 dark:bg-[#1a1c2d] dark:text-white-dark">
                @
            </span>
        </div>
        <input type="text" placeholder="Input group example" className="flex-1 form-input ltr:rounded-l-none rtl:rounded-r-none" />
    </div>
</div>;
`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Vertical */}
                <div className="panel" id="vertical">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Vertical</h5>
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
                    <div className="mb-5 text-center">
                        <div className="relative inline-flex align-middle flex-col items-start justify-center">
                            <button type="button" className="btn btn-dark rounded-b-none w-full">
                                Button
                            </button>
                            <div className="relative">
                                <div className="dropdown">
                                    <Dropdown
                                        offset={[0, 5]}
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="btn dropdown-toggle btn-dark rounded-none"
                                        button={
                                            <>
                                                Dropdown
                                                <span className="shrink-0">
                                                    <IconCaretDown className="ltr:ml-2 rtl:mr-2 inline-block shrink-0" />
                                                </span>
                                            </>
                                        }
                                    >
                                        <ul>
                                            <li>
                                                <button type="button">Dropdown link</button>
                                            </li>
                                            <li>
                                                <button type="button">Dropdown link</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                            <button type="button" className="btn btn-dark rounded-none w-full">
                                Button
                            </button>
                            <button type="button" className="btn btn-dark rounded-none w-full">
                                Button
                            </button>
                            <div className="relative">
                                <div className="dropdown">
                                    <Dropdown
                                        offset={[0, 5]}
                                        placement={`${isRtl ? 'top-start' : 'top-end'}`}
                                        btnClassName="btn dropdown-toggle btn-dark rounded-t-none"
                                        button={
                                            <>
                                                Dropdown
                                                <span className="shrink-0">
                                                    <IconCaretDown className="ltr:ml-2 rtl:mr-2 inline-block shrink-0" />
                                                </span>
                                            </>
                                        }
                                    >
                                        <ul>
                                            <li>
                                                <button type="button">Dropdown link</button>
                                            </li>
                                            <li>
                                                <button type="button">Dropdown link</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code3') && (
                        <CodeHighlight>
                            <pre>{`import Dropdown from '../../components/Dropdown';

<div className="relative inline-flex align-middle flex-col items-start justify-center">
    <button type="button" className="btn btn-dark rounded-b-none w-full">
        Button
    </button>
    <div className="relative">
        <div className="dropdown">
            <Dropdown
                offset={[0, 5]}
                placement={\`${isRtl ? 'bottom-start' : 'bottom-end'}\`}
                btnClassName="btn dropdown-toggle btn-dark rounded-none"
                button={
                    <>
                        Dropdown
                        <span>
                            <svg>...</svg>
                        </span>
                    </>
                }
            >
                <ul>
                    <li>
                        <button type="button">Dropdown link</button>
                    </li>
                    <li>
                        <button type="button">Dropdown link</button>
                    </li>
                </ul>
            </Dropdown>
        </div>
    </div>
    <button type="button" className="btn btn-dark rounded-none w-full">
        Button
    </button>
    <button type="button" className="btn btn-dark rounded-none w-full">
        Button
    </button>
    <div className="relative">
        <div className="dropdown">
            <Dropdown
                offset={[0, 5]}
                placement={\`${isRtl ? 'top-start' : 'top-end'}\`}
                btnClassName="btn dropdown-toggle btn-dark rounded-t-none"
                button={
                    <>
                        Dropdown
                        <span>
                            <svg>...</svg>
                        </span>
                    </>
                }
            >
                <ul>
                    <li>
                        <button type="button">Dropdown link</button>
                    </li>
                    <li>
                        <button type="button">Dropdown link</button>
                    </li>
                </ul>
            </Dropdown>
        </div>
    </div>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Buttongroups;
