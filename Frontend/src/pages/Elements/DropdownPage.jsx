import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';

const DropdownPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dropdowns'));
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
                    <span>Dropdowns</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                <div className="panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap">
                    <div className="ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://popper.js.org/docs/v2/" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://popper.js.org/docs/v2/
                    </a>
                </div>
                {/* Basic */}
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
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
                            <div className="flex flex-wrap w-full gap-7 justify-around">
                                <div className="flex items-center justify-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="btn btn-primary dropdown-toggle"
                                            button={
                                                <>
                                                    Action
                                                    <span>
                                                        <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                    </span>
                                                </>
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
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="btn btn-outline-primary dropdown-toggle"
                                            button={
                                                <>
                                                    Action
                                                    <span>
                                                        <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                    </span>
                                                </>
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
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code1') && (
                            <CodeHighlight>
                                <pre>{`import Dropdown from '../../components/Dropdown';

const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
        btnClassName="btn btn-primary dropdown-toggle"
        button={
            <>
                Action
                <span>
                    <svg>...</svg>
                </span>
            </>
        }
    >
    <ul className="!min-w-[170px]">
        <li>
            <button type="button">
                Action
            </button>
        </li>
        <li>
            <button type="button">
                Another action
            </button>
        </li>
        <li>
            <button type="button">
                Something else here
            </button>
        </li>
        <li>
            <button type="button">
                Separated link
            </button>
        </li>
    </ul>
    </Dropdown>
</div>
<div className="dropdown">
    <Dropdown
            placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
            btnClassName="btn btn-outline-primary dropdown-toggle"
            button={
                <>
                    Action
                    <span>
                        <svg>...</svg>
                    </span>
                </>
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
`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Dropup */}
                    <div className="space-y-8">
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Dropup</h5>
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
                                <div className="flex flex-wrap w-full gap-7 justify-around">
                                    <div className="flex items-center justify-center">
                                        <div className="dropdown">
                                            <Dropdown
                                                placement={`${isRtl ? 'top-start' : 'top-end'}`}
                                                btnClassName="btn btn-info dropdown-toggle inline-flex"
                                                button={
                                                    <>
                                                        Up
                                                        <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block rotate-180" />
                                                    </>
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
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="dropdown">
                                            <Dropdown
                                                placement={`${isRtl ? 'top-start' : 'top-end'}`}
                                                btnClassName="btn btn-outline-info dropdown-toggle inline-flex"
                                                button={
                                                    <>
                                                        Up
                                                        <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block rotate-180" />
                                                    </>
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
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code2') && (
                                <CodeHighlight>
                                    <pre>{`import Dropdown from '../../components/Dropdown';

const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'top-start' : 'top-end'}\`}
        btnClassName="btn btn-info dropdown-toggle inline-flex"
        button={
            <>
                Up
                <svg>...</svg>
            </>
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

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'top-start' : 'top-end'}\`}
        btnClassName="btn btn-outline-info dropdown-toggle inline-flex"
        button={
            <>
                Up
                <svg>...</svg>
            </>
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
</div>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                    </div>
                    {/* Dropright */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Dropright</h5>
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
                            <div className="flex flex-wrap w-full gap-7 justify-around">
                                <div className="flex items-center justify-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'right-end' : 'right-start'}`}
                                            btnClassName="btn btn-warning dropdown-toggle !flex"
                                            button={
                                                <>
                                                    Right
                                                    <IconCaretDown className="ltr:ml-1 rtl:mr-1 rtl:rotate-90 -rotate-90 inline-block" />
                                                </>
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
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'right-end' : 'right-start'}`}
                                            btnClassName="btn btn-outline-warning dropdown-toggle !flex"
                                            button={
                                                <>
                                                    Right
                                                    <IconCaretDown className="ltr:ml-1 rtl:mr-1 rtl:rotate-90 -rotate-90 inline-block" />
                                                </>
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
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code3') && (
                            <CodeHighlight>
                                <pre>{`import Dropdown from '../../components/Dropdown';

const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'right-end' : 'right-start'}\`}
        btnClassName="btn btn-warning dropdown-toggle !flex"
        button={
            <>
                Right
                <svg>...</svg>
            </>
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

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'right-end' : 'right-start'}\`}
        btnClassName="btn btn-outline-warning dropdown-toggle !flex"
        button={
            <>
                Right
                <svg>...</svg>
            </>
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
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Dropleft */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Dropleft</h5>
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
                            <div className="flex flex-wrap w-full gap-7 justify-around">
                                <div className="flex items-center justify-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'left-end' : 'left-start'}`}
                                            btnClassName="btn btn-danger dropdown-toggle !flex"
                                            button={
                                                <>
                                                    <IconCaretDown className="ltr:mr-1 rtl:ml-1 rtl:-rotate-90 rotate-90 inline-block" />
                                                    Left
                                                </>
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
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'left-end' : 'left-start'}`}
                                            btnClassName="btn btn-outline-danger dropdown-toggle !flex"
                                            button={
                                                <>
                                                    <IconCaretDown className="ltr:mr-1 rtl:ml-1 rtl:-rotate-90 rotate-90 inline-block" />
                                                    Left
                                                </>
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
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code4') && (
                            <CodeHighlight>
                                <pre>{`import Dropdown from '../../components/Dropdown';

const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'left-end' : 'left-start'}\`}
        btnClassName="btn btn-danger dropdown-toggle !flex"
        button={
            <>
                <svg>...</svg>
                Left
            </>
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

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'left-end' : 'left-start'}\`}
        btnClassName="btn btn-outline-danger dropdown-toggle !flex"
        button={
            <>
                <svg>...</svg>
                Left
            </>
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
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Small Button */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Small Button</h5>
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
                        <div className="mb-5">
                            <div className="flex flex-wrap w-full gap-7 justify-around">
                                <div className="flex items-center justify-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="btn btn-dark btn-sm dropdown-toggle"
                                            button={
                                                <>
                                                    Small Button
                                                    <span>
                                                        <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                    </span>
                                                </>
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
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="btn btn-outline-dark btn-sm dropdown-toggle"
                                            button={
                                                <>
                                                    Small Button
                                                    <span>
                                                        <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                    </span>
                                                </>
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
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code5') && (
                            <CodeHighlight>
                                <pre>{`import Dropdown from '../../components/Dropdown';

const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
        btnClassName="btn btn-dark btn-sm dropdown-toggle"
        button={
            <>
                Small Button
                <span>
                    <svg>...</svg>
                </span>
            </>
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

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
        btnClassName="btn btn-outline-dark btn-sm dropdown-toggle"
        button={
            <>
                Small Button
                <span>
                    <svg>...</svg>
                </span>
            </>
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
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Large Button */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Large Button</h5>
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
                            <div className="flex flex-wrap w-full gap-7 justify-around">
                                <div className="flex items-center justify-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="btn btn-success btn-lg dropdown-toggle"
                                            button={
                                                <>
                                                    Large Button
                                                    <span>
                                                        <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                    </span>
                                                </>
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
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="btn btn-outline-success btn-lg dropdown-toggle"
                                            button={
                                                <>
                                                    Large Button
                                                    <span>
                                                        <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                    </span>
                                                </>
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
                                </div>
                            </div>
                        </div>

                        {codeArr.includes('code6') && (
                            <CodeHighlight>
                                <pre>{`import Dropdown from '../../components/Dropdown';

const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
        btnClassName="btn btn-success btn-lg dropdown-toggle"
        button={
            <>
                Large Button
                <span>
                    <svg>...</svg>
                </span>
            </>
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

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
        btnClassName="btn btn-outline-success btn-lg dropdown-toggle"
        button={
            <>
                Large Button
                <span>
                    <svg>...</svg>
                </span>
            </>
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
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Grouped Dropdown Buttons */}
                    <div className="panel" id="grouped">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Grouped Dropdown Buttons</h5>
                            <button
                                onClick={() => {
                                    toggleCode('code7');
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
                            <div className="flex flex-wrap w-full gap-7 justify-around">
                                <div className="flex items-center justify-center">
                                    <div className="relative inline-flex align-middle">
                                        <button type="button" className="btn btn-secondary ltr:rounded-r-none rtl:rounded-l-none">
                                            1
                                        </button>
                                        <button type="button" className="btn btn-secondary rounded-none">
                                            2
                                        </button>
                                        <div className="relative inline-flex align-middle">
                                            <div className="dropdown">
                                                <Dropdown
                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                    btnClassName="btn dropdown-toggle btn-secondary flex ltr:rounded-l-none rtl:rounded-r-none"
                                                    button={
                                                        <>
                                                            Dropdown
                                                            <span>
                                                                <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                            </span>
                                                        </>
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
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="relative inline-flex align-middle">
                                        <button type="button" className="btn btn-outline-secondary ltr:border-r-0 rtl:border-l-0 ltr:rounded-r-none rtl:rounded-l-none">
                                            1
                                        </button>
                                        <button type="button" className="btn btn-outline-secondary ltr:border-r-0 rtl:border-l-0 rounded-none">
                                            2
                                        </button>
                                        <div className="dropdown">
                                            <Dropdown
                                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                btnClassName="btn dropdown-toggle btn-outline-secondary flex ltr:rounded-l-none rtl:rounded-r-none"
                                                button={
                                                    <>
                                                        Dropdown
                                                        <span>
                                                            <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                        </span>
                                                    </>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code7') && (
                            <CodeHighlight>
                                <pre>{`import Dropdown from '../../components/Dropdown';

const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

<div className="relative inline-flex align-middle">
    <button type="button" className="btn btn-secondary ltr:rounded-r-none rtl:rounded-l-none">
        1
    </button>
    <button type="button" className="btn btn-secondary rounded-none">
        2
    </button>
    <div className="relative inline-flex align-middle">
        <div className="dropdown">
            <Dropdown
                placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
                btnClassName="btn dropdown-toggle btn-secondary flex ltr:rounded-l-none rtl:rounded-r-none"
                button={
                    <>
                        Dropdown
                        <span>
                            <svg>...</svg>
                        </span>
                    </>
                }
            >
                <ul className="!min-w-[170px]">
                    <li>
                        <button type="button">        Action</button>
                    </li>
                    <li>
                        <button type="button">        Another action</button>
                    </li>
                    <li>
                        <button type="button">        Something else here</button>
                    </li>
                    <li>
                        <button type="button">        Separated link</button>
                    </li>
                </ul>
            </Dropdown>
        </div>
    </div>
</div>
<div className="relative inline-flex align-middle">
    <button type="button" className="btn btn-outline-secondary ltr:border-r-0 rtl:border-l-0 ltr:rounded-r-none rtl:rounded-l-none">
        1
    </button>
    <button type="button" className="btn btn-outline-secondary ltr:border-r-0 rtl:border-l-0 rounded-none">
        2
    </button>
    <div className="dropdown">
        <Dropdown
            placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
            btnClassName="btn dropdown-toggle btn-outline-secondary flex ltr:rounded-l-none rtl:rounded-r-none"
            button={
                <>
                    Dropdown
                    <span>
                        <svg>...</svg>
                    </span>
                </>
            }
        >
            <ul className="!min-w-[170px]">
                <li>
                    <button type="button">    Action</button>
                </li>
                <li>
                    <button type="button">    Another action</button>
                </li>
                <li>
                    <button type="button">    Something else here</button>
                </li>
                <li>
                    <button type="button">    Separated link</button>
                </li>
            </ul>
        </Dropdown>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Split */}
                    <div className="panel" id="split">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Split</h5>
                            <button
                                onClick={() => {
                                    toggleCode('code8');
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
                            <div className="flex flex-wrap w-full gap-7 justify-around">
                                <div className="flex items-center justify-center">
                                    <div className="inline-flex">
                                        <button className="btn btn-primary ltr:rounded-r-none rtl:rounded-l-none">Action</button>
                                        <div className="dropdown">
                                            <Dropdown
                                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                btnClassName="btn dropdown-toggle btn-primary ltr:rounded-l-none rtl:rounded-r-none border-l-[#4468fd] before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block before:border-t-white-light h-full"
                                                button={<span className="sr-only">Toggle dropdown</span>}
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
                                <div className="flex items-center justify-center">
                                    <div className="inline-flex">
                                        <button className="btn btn-outline-primary ltr:rounded-r-none rtl:rounded-l-none">Action</button>
                                        <div className="dropdown">
                                            <Dropdown
                                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                btnClassName="btn btn-outline-primary ltr:rounded-l-none rtl:rounded-r-none dropdown-toggle before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block hover:before:border-t-white-light h-full"
                                                button={<span className="sr-only">Toggle dropdown</span>}
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
                        </div>
                        {codeArr.includes('code8') && (
                            <CodeHighlight>
                                <pre>{`import Dropdown from '../../components/Dropdown';

const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

<div className="inline-flex">
    <button className="btn btn-primary ltr:rounded-r-none rtl:rounded-l-none">Action</button>
    <div className="dropdown">
        <Dropdown
            placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
            btnClassName="btn dropdown-toggle btn-primary ltr:rounded-l-none rtl:rounded-r-none border-l-[#4468fd] before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block before:border-t-white-light h-full"
            button={<span className="sr-only">Toggle dropdown</span>}
        >
            <ul className="!min-w-[170px]">
                <li>
                    <button type="button">    Action</button>
                </li>
                <li>
                    <button type="button">    Another action</button>
                </li>
                <li>
                    <button type="button">    Something else here</button>
                </li>
                <li>
                    <button type="button">    Separated link</button>
                </li>
            </ul>
        </Dropdown>
    </div>
</div>
<div className="inline-flex">
    <button className="btn btn-outline-primary ltr:rounded-r-none rtl:rounded-l-none">Action</button>
    <div className="dropdown">
        <Dropdown
            placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
            btnClassName="btn btn-outline-primary ltr:rounded-l-none rtl:rounded-r-none dropdown-toggle before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block hover:before:border-t-white-light h-full"
            button={<span className="sr-only">Toggle dropdown</span>}
        >
            <ul className="!min-w-[170px]">
                <li>
                    <button type="button">    Action</button>
                </li>
                <li>
                    <button type="button">    Another action</button>
                </li>
                <li>
                    <button type="button">    Something else here</button>
                </li>
                <li>
                    <button type="button">    Separated link</button>
                </li>
            </ul>
        </Dropdown>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Custom Dropdown */}
                    <div className="panel" id="custom">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Custom Dropdown</h5>
                            <button
                                onClick={() => {
                                    toggleCode('code9');
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
                                <div className="flex items-center justify-center w-1/4">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'top-end' : 'top-start'}`}
                                            btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
                                            button={
                                                <IconHorizontalDots className="w-6 h-6 rotate-90 opacity-70" />
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
                                </div>
                                <div className="flex items-center justify-center w-1/4">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'top-end' : 'top-start'}`}
                                            btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
                                            button={
                                                <IconHorizontalDots className="w-6 h-6 opacity-70" />
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
                                </div>
                                <div className="flex items-center justify-center w-1/4">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'top-end' : 'top-start'}`}
                                            btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
                                            button={
                                                <IconHorizontalDots className="w-6 h-6 rotate-90 opacity-70" />
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
                                </div>
                                <div className="flex items-center justify-center w-1/4">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'top-start' : 'top-end'}`}
                                            btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
                                            button={
                                                <IconHorizontalDots className="w-6 h-6 opacity-70" />
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
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code9') && (
                            <CodeHighlight>
                                <pre>{`import Dropdown from '../../components/Dropdown';

const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'top-end' : 'top-start'}\`}
        btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
        button={
            <svg>...</svg>
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

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'top-end' : 'top-start'}\`}
        btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
        button={
            <svg>...</svg>
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

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'top-end' : 'top-start'}\`}
        btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
        button={
            <svg>...</svg>
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

<div className="dropdown">
    <Dropdown
        placement={\`\${isRtl ? 'top-start' : 'top-end'}\`}
        btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
        button={
            <svg>...</svg>
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
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropdownPage;
