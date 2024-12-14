import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import CodeHighlight from '../../components/Highlight';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
const Progressbar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Progressbar'));
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
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link to="#" className="text-primary hover:underline">
                            Elements
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Progress Bar</span>
                    </li>
                </ul>
                <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
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
                        <div className="mb-5 space-y-5">
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-primary h-4 rounded-full w-3/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-secondary h-4 rounded-full w-4/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-success h-4 rounded-full w-5/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-warning h-4 rounded-full w-6/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-danger h-4 rounded-full w-7/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-info h-4 rounded-full w-8/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-black dark:bg-dark h-4 rounded-full w-9/12"></div>
                            </div>
                        </div>
                        {codeArr.includes('code1') && (
                            <CodeHighlight>
                                <pre>{`<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-primary h-4 rounded-full w-3/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-secondary h-4 rounded-full w-4/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-success h-4 rounded-full w-5/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-warning h-4 rounded-full w-6/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-danger h-4 rounded-full w-7/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-info h-4 rounded-full w-8/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-black dark:bg-dark h-4 rounded-full w-9/12"></div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    <div className="panel" id="gradient">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Gradient</h5>
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
                        <div className="mb-5 space-y-5">
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-gradient-to-r from-[#0081ff] to-[#0045ff] h-4 rounded-full w-3/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-gradient-to-r from-[#04befe] to-[#4481eb] h-4 rounded-full w-4/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-gradient-to-r from-[#3cba92] to-[#0ba360] h-4 rounded-full w-5/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-gradient-to-r from-[#f09819] to-[#ff5858] h-4 rounded-full w-6/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-gradient-to-r from-[#d09693] to-[#c71d6f] h-4 rounded-full w-7/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-gradient-to-r from-[#7579ff] to-[#b224ef] h-4 rounded-full w-8/12"></div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-gradient-to-r from-[#2b5876] to-[#4e4376] h-4 rounded-full w-9/12"></div>
                            </div>
                        </div>
                        {codeArr.includes('code2') && (
                            <CodeHighlight>
                                <pre>{`<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-gradient-to-r from-[#0081ff] to-[#0045ff] h-4 rounded-full w-3/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-gradient-to-r from-[#04befe] to-[#4481eb] h-4 rounded-full w-4/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-gradient-to-r from-[#3cba92] to-[#0ba360] h-4 rounded-full w-5/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-gradient-to-r from-[#f09819] to-[#ff5858] h-4 rounded-full w-6/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-gradient-to-r from-[#d09693] to-[#c71d6f] h-4 rounded-full w-7/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-gradient-to-r from-[#7579ff] to-[#b224ef] h-4 rounded-full w-8/12"></div>
</div>

<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div className="bg-gradient-to-r from-[#2b5876] to-[#4e4376] h-4 rounded-full w-9/12"></div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    <div className="panel" id="striped">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Striped</h5>
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
                        <div className="mb-5 space-y-5">
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div
                                    className="bg-primary h-4 rounded-full w-3/12"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                                        backgroundSize: '1rem 1rem',
                                    }}
                                ></div>
                            </div>
                        </div>
                        {codeArr.includes('code3') && (
                            <CodeHighlight>
                                <pre>{`<div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
    <div
        className="bg-primary h-4 rounded-full w-3/12"
        style={{
            backgroundImage:
                'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
            backgroundSize: '1rem 1rem',
        }}
    ></div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    <div className="panel" id="animated">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Animated</h5>
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
                        <div className="mb-5 space-y-5">
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div
                                    className="bg-primary h-4 rounded-full w-6/12 animated-progress"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                                        backgroundSize: '1rem 1rem',
                                    }}
                                ></div>
                            </div>
                        </div>
                        {codeArr.includes('code4') && (
                            <CodeHighlight>
                                <pre>{`<div
    className="bg-primary h-4 rounded-full w-6/12 animated-progress"
    style={{
        backgroundImage:
            'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
        backgroundSize: '1rem 1rem',
    }}
></div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    <div className="panel" id="labeled">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Labels</h5>
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
                        <div className="mb-5 space-y-5">
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-info h-4 rounded-full w-4/5 text-center text-white text-xs">80%</div>
                            </div>
                            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                                <div className="bg-danger h-4 rounded-full w-11/12 text-center text-white flex justify-between items-center px-2 text-xs">
                                    <span>PHP</span>
                                    <span>90%</span>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code5') && (
                            <CodeHighlight>
                                <pre>{`<div className="mb-5 space-y-5">
    <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
        <div className="bg-info h-4 rounded-full w-4/5 text-center text-white text-xs">80%</div>
    </div>
    <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
        <div className="bg-danger h-4 rounded-full w-11/12 text-center text-white flex justify-between items-center px-2 text-xs">
            <span>PHP</span>
            <span>90%</span>
        </div>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    <div className="panel" id="stacked">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Stacked</h5>
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
                        <div className="mb-5 space-y-5">
                            <div className="space-y-2">
                                <h3 className="text-base">Basic</h3>
                                <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                    <div className="bg-success h-4 ltr:rounded-l-full rtl:rounded-r-full w-2/12 text-center text-white text-xs"></div>
                                    <div className="bg-warning h-4 w-4/12 text-center text-white text-xs"></div>
                                    <div className="bg-danger h-4 ltr:rounded-r-full rtl:rounded-l-full w-3/12 text-center text-white text-xs"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-base">Striped</h3>
                                <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                    <div
                                        className="bg-primary h-4 ltr:rounded-l-full rtl:rounded-r-full w-2/12 text-center text-white text-xs"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                                            backgroundSize: '1rem 1rem',
                                        }}
                                    ></div>
                                    <div
                                        className="bg-success h-4 w-4/12 text-center text-white text-xs"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                                            backgroundSize: '1rem 1rem',
                                        }}
                                    ></div>
                                    <div
                                        className="bg-info h-4 ltr:rounded-r-full rtl:rounded-l-full w-3/12 text-center text-white text-xs"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                                            backgroundSize: '1rem 1rem',
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-base">Animated</h3>
                                <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                    <div
                                        className="bg-info h-4 ltr:rounded-l-full rtl:rounded-r-full w-2/12 animated-progress text-center text-white text-xs"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                                            backgroundSize: '1rem 1rem',
                                        }}
                                    ></div>
                                    <div
                                        className="bg-secondary h-4 w-4/12 animated-progress text-center text-white text-xs"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                                            backgroundSize: '1rem 1rem',
                                        }}
                                    ></div>
                                    <div
                                        className="bg-primary h-4 ltr:rounded-r-full rtl:rounded-l-full w-3/12 animated-progress text-center text-white text-xs"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                                            backgroundSize: '1rem 1rem',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code6') && (
                            <CodeHighlight>
                                <pre>{`<div className="space-y-2">
    <h3 className="text-base">Basic</h3>
    <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
        <div className="bg-success h-4 ltr:rounded-l-full rtl:rounded-r-full w-2/12 text-center text-white text-xs"></div>
        <div className="bg-warning h-4 w-4/12 text-center text-white text-xs"></div>
        <div className="bg-danger h-4 ltr:rounded-r-full rtl:rounded-l-full w-3/12 text-center text-white text-xs"></div>
    </div>
</div>

<div className="space-y-2">
    <h3 className="text-base">Striped</h3>
    <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
        <div
            className="bg-primary h-4 ltr:rounded-l-full rtl:rounded-r-full w-2/12 text-center text-white text-xs"
            style={{
                backgroundImage:
                    'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                backgroundSize: '1rem 1rem',
            }}
        ></div>
        <div
            className="bg-success h-4 w-4/12 text-center text-white text-xs"
            style={{
                backgroundImage:
                    'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                backgroundSize: '1rem 1rem',
            }}
        ></div>
        <div
            className="bg-info h-4 ltr:rounded-r-full rtl:rounded-l-full w-3/12 text-center text-white text-xs"
            style={{
                backgroundImage:
                    'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                backgroundSize: '1rem 1rem',
            }}
        ></div>
    </div>
</div>

<div className="space-y-2">
    <h3 className="text-base">Animated</h3>
    <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
        <div
            className="bg-info h-4 ltr:rounded-l-full rtl:rounded-r-full w-2/12 animated-progress text-center text-white text-xs"
            style={{
                backgroundImage:
                    'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                backgroundSize: '1rem 1rem',
            }}
        ></div>
        <div
            className="bg-secondary h-4 w-4/12 animated-progress text-center text-white text-xs"
            style={{
                backgroundImage:
                    'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                backgroundSize: '1rem 1rem',
            }}
        ></div>
        <div
            className="bg-primary h-4 ltr:rounded-r-full rtl:rounded-l-full w-3/12 animated-progress text-center text-white text-xs"
            style={{
                backgroundImage:
                    'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                backgroundSize: '1rem 1rem',
            }}
        ></div>
    </div>
</div>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    <div className="panel lg:row-span-2 lg:row-start-3" id="sizes">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Progress Bars Different Sizes</h5>
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
                        <div className="mb-5 space-y-5">
                            <div className="space-y-1">
                                <h3 className="text-primary">Default Progress Bar Size</h3>
                                <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                    <div className="bg-primary h-4 rounded-full rounded-bl-full w-3/12 text-center text-white text-xs"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-base text-success">Progress-sm</h3>
                                <div className="w-full h-1 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                    <div className="bg-success h-1 rounded-full rounded-bl-full w-5/12 text-center text-white text-xs"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-base text-warning">Progress-md</h3>
                                <div className="w-full h-2.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                    <div className="bg-warning h-2.5 rounded-full rounded-bl-full w-7/12 text-center text-white text-xs"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-base text-info">Progress-lg</h3>
                                <div className="w-full h-5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                    <div className="bg-info h-5 rounded-full rounded-bl-full w-8/12 text-center text-white text-xs"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-base text-danger">Progress-xl</h3>
                                <div className="w-full h-6 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                    <div className="bg-danger h-6 rounded-full rounded-bl-full w-10/12 text-center text-white text-xs"></div>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code7') && (
                            <CodeHighlight>
                                <pre>{`<div className="space-y-1">
    <h3 className="text-primary">Default Progress Bar Size</h3>
    <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
        <div className="bg-primary h-4 rounded-full rounded-bl-full w-3/12 text-center text-white text-xs"></div>
    </div>
</div>

<div className="space-y-2">
    <h3 className="text-base text-success">Progress-sm</h3>
    <div className="w-full h-1 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
        <div className="bg-success h-1 rounded-full rounded-bl-full w-5/12 text-center text-white text-xs"></div>
    </div>
</div>

<div className="space-y-2">
    <h3 className="text-base text-warning">Progress-md</h3>
    <div className="w-full h-2.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
        <div className="bg-warning h-2.5 rounded-full rounded-bl-full w-7/12 text-center text-white text-xs"></div>
    </div>
</div>

<div className="space-y-2">
    <h3 className="text-base text-info">Progress-lg</h3>
    <div className="w-full h-5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
        <div className="bg-info h-5 rounded-full rounded-bl-full w-8/12 text-center text-white text-xs"></div>
    </div>
</div>

<div className="space-y-2">
    <h3 className="text-base text-danger">Progress-xl</h3>
    <div className="w-full h-6 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
        <div className="bg-danger h-6 rounded-full rounded-bl-full w-10/12 text-center text-white text-xs"></div>
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

export default Progressbar;
