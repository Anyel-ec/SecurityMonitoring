import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../components/Icon/IconCode';
import IconBox from '../../components/Icon/IconBox';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';

const Infobox = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Infobox'));
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
                    <span>Infobox</span>
                </li>
            </ul>
            <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
                {/* Infobox-1 */}
                <div className="panel" id="infobox_1">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Infobox 1</h5>
                        <button
                            type="button"
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
                    <div className="flex flex-wrap w-full justify-center mb-5">
                        <div className="border border-gray-500/20 rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6">
                            <div className="text-primary mb-5">
                                <IconBox className="w-12 h-12" />
                            </div>
                            <h5 className="text-lg font-semibold mb-3.5 dark:text-white-light">Layout Package</h5>
                            <p className="text-white-dark text-[15px]  mb-3.5">Lorem ipsum dolor sit amet, labore et dolore magna aliqua.</p>
                            <button type="button" className="text-primary font-semibold hover:underline group">
                                Discover{' '}
                                <IconArrowLeft className="ltr:ml-1 rtl:mr-1 inline-block relative transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180" />
                            </button>
                        </div>
                    </div>

                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre>{`<div className="flex flex-wrap w-full justify-center mb-5">
    <div className="border border-gray-500/20 rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6">
        <div className="text-primary mb-5">
            <svg>...</svg>
        </div>
        <h5 className="text-lg font-semibold mb-3.5 dark:text-white-light">Layout Package</h5>
        <p className="text-white-dark text-[15px]  mb-3.5">Lorem ipsum dolor sit amet, labore et dolore magna aliqua.</p>
        <button type="button" className="text-primary font-semibold hover:underline group">
            Discover{' '}
            <svg>...</svg>
        </button>
    </div>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Infobox-2 */}
                <div className="panel" id="infobox_2">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Infobox 2</h5>
                        <button
                            type="button"
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
                    <div className="flex flex-wrap w-full justify-center mb-5">
                        <div className="bg-dark border border-gray-500/20 rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 text-center">
                            <div className="text-white-light bg1-white-dark w-20 h-20 rounded-full flex items-center justify-center mb-5 mx-auto">
                                <IconBox className="w-12 h-12" />
                            </div>
                            <h5 className="text-lg font-semibold mb-3.5 text-white-light">Layout Package</h5>
                            <p className="text-white-light text-[15px]  mb-3.5">Lorem ipsum dolor sit amet, labore et dolore magna aliqua.</p>
                            <button type="button" className="text-info font-semibold hover:underline group">
                                Discover{' '}
                                <IconArrowLeft className="ltr:ml-1 rtl:mr-1 inline-block relative transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180" />
                            </button>
                        </div>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre>{`<div className="flex flex-wrap w-full justify-center mb-5">
    <div className="bg-dark border border-gray-500/20 rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 text-center">
        <div className="text-white-light bg1-white-dark w-20 h-20 rounded-full flex items-center justify-center mb-5 mx-auto">
            <svg>...</svg>
        </div>
        <h5 className="text-lg font-semibold mb-3.5 text-white-light">Layout Package</h5>
        <p className="text-white-light text-[15px]  mb-3.5">Lorem ipsum dolor sit amet, labore et dolore magna aliqua.</p>
        <button type="button" className="text-info font-semibold hover:underline group">
            Discover{' '}
            <svg>...</svg>
        </button>
    </div>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Infobox-3 */}
                <div className="panel" id="infobox_3">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Infobox 3</h5>
                        <button
                            type="button"
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
                    <div className="flex flex-wrap w-full justify-center mb-5">
                        <div className="border border-gray-500/20 rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
                            <div className="bg-primary absolute text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                                <IconBox className="w-12 h-12" />
                            </div>
                            <h5 className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">Layout Package</h5>
                            <p className="text-white-dark text-[15px]  mb-3.5">Lorem ipsum dolor sit amet, labore et dolore magna aliqua.</p>
                            <button type="button" className="text-primary font-semibold hover:underline group">
                                Discover{' '}
                                <IconArrowLeft className="ltr:ml-1 rtl:mr-1 inline-block relative transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180" />
                            </button>
                        </div>
                    </div>
                    {codeArr.includes('code3') && (
                        <CodeHighlight>
                            <pre>{`<div className="flex flex-wrap w-full justify-center mb-5">
    <div className="border border-gray-500/20 rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
        <div className="bg-primary absolute text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
            <svg>...</svg>
        </div>
        <h5 className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">Layout Package</h5>
        <p className="text-white-dark text-[15px]  mb-3.5">Lorem ipsum dolor sit amet, labore et dolore magna aliqua.</p>
        <button type="button" className="text-primary font-semibold hover:underline group">
            Discover{' '}
            <svg>...</svg>
        </button>
    </div>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Infobox;
