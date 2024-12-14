import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../components/Icon/IconCode';

const Switches = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Switches'));
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
                    <span>Switches</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                <div className="space-y-8" id="icons">
                    <h4 className="badge bg-primary inline-block hover:top-0 text-base">Icon</h4>
                    {/* Icons */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="panel">
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
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />

                                    <span
                                        className={`outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4
                                    before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300`}
                                    ></span>
                                </label>
                            </div>
                            {codeArr.includes('code1') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />

    <span
        className={\`outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4
    before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300\`}
    ></span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Rounded</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            {codeArr.includes('code2') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                    </div>
                </div>
                <div className="space-y-8" id="solid">
                    <h4 className="badge bg-primary inline-block hover:top-0 text-base">Solid</h4>
                    {/* Solid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Default</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300 "></span>
                                </label>
                            </div>
                            {codeArr.includes('code3') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="bg-[#ebedf2] dark:bg-dark block h-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300 "></span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Rounded</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            {codeArr.includes('code4') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                    </div>
                </div>
                <div className="space-y-8" id="outline">
                    <h4 className="badge bg-primary inline-block hover:top-0 text-base">Outline</h4>
                    {/* Outline */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Default</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code5')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 peer-checked:before:left-7 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            {codeArr.includes('code5') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 peer-checked:before:left-7 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Rounded</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code6')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            {codeArr.includes('code6') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Switches;
