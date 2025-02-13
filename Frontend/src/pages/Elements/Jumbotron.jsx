import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';

const Jumbotron = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Jumbotron'));
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
                    <span>Jumbotron</span>
                </li>
            </ul>
            <div className="pt-5 grid xl:grid-cols-2 grid-cols-1 gap-6">
                {/* basic */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Basic</h5>
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
                    <div className="prose bg-[#f1f2f3] px-4 py-9 sm:px-8 sm:py-16 rounded max-w-full dark:bg-[#1b2e4b] dark:text-white-light w-full mb-5">
                        <h2 className="text-dark mb-5  mt-4 text-center text-5xl dark:text-white-light">Hello, world!</h2>
                        <p className="lead mt-3 mb-4 dark:text-white-light">
                            This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
                        </p>
                        <hr className="my-4 dark:border-[#191e3a]" />
                        <p className="mb-5">It uses utility classes for typography and spacing to space content out within the larger container.</p>
                        <p className="lead">
                            <button type="button" className="btn btn-dark">
                                Learn more
                            </button>
                        </p>
                    </div>

                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre>{`<div className="prose bg-[#f1f2f3] px-4 py-9 sm:px-8 sm:py-16 rounded max-w-full dark:bg-[#1b2e4b] dark:text-white-light w-full mb-5">
    <h2 className="text-dark mb-5  mt-4 text-center text-5xl dark:text-white-light">Hello, world!</h2>
    <p className="lead mt-3 mb-4 dark:text-white-light">
        This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
    </p>
    <hr className="my-4 dark:border-[#191e3a]" />
    <p className="mb-5">It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <p className="lead">
        <button type="button" className="btn btn-dark">
            Learn more
        </button>
    </p>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* fluid */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Jumbotron Fluid</h5>
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
                    <div className="prose bg-[#f1f2f3] px-4 py-9 sm:px-8 sm:py-16 rounded max-w-full dark:bg-[#1b2e4b] dark:text-white-light w-full mb-5">
                        <h2 className="text-dark mb-5  mt-4 text-center text-5xl dark:text-white-light">Fluid Jumbotron</h2>
                        <p className="lead mt-3 mb-4 dark:text-white-light">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                        <blockquote className="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]">
                            <div className="flex items-start">
                                <div className="w-14 h-14 ltr:mr-5 rtl:ml-5 flex-none">
                                    <img src="/assets/images/profile-34.jpeg" alt="img" className="w-14 h-14 rounded-full object-cover m-auto" />
                                </div>
                                <p className="not-italic text-[#515365] text-sm dark:text-white-light m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            </div>
                            <small className="ltr:text-right rtl:text-left w-full not-italic text-xs text-[#777] block before:w-3 before:h-[1px] before:bg-[#777] before:inline-block before:opacity-50 before:relative before:-top-1 before:ltr:mr-1 rtl:before:ml-1">
                                Someone famous <cite className="italic">Source Title</cite>
                            </small>
                        </blockquote>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre>{`<div className="prose bg-[#f1f2f3] px-4 py-9 sm:px-8 sm:py-16 rounded max-w-full dark:bg-[#1b2e4b] dark:text-white-light w-full mb-5">
    <h2 className="text-dark mb-5  mt-4 text-center text-5xl dark:text-white-light">Fluid Jumbotron</h2>
    <p className="lead mt-3 mb-4 dark:text-white-light">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
    <blockquote className="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]">
        <div className="flex items-start">
            <div className="w-14 h-14 ltr:mr-5 rtl:ml-5 flex-none">
                <img src="/assets/images/profile-34.jpeg" alt="img" className="w-14 h-14 rounded-full object-cover m-auto" />
            </div>
            <p className="not-italic text-[#515365] text-sm dark:text-white-light m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        </div>
        <small className="ltr:text-right rtl:text-left w-full not-italic text-xs text-[#777] block before:w-3 before:h-[1px] before:bg-[#777] before:inline-block before:opacity-50 before:relative before:-top-1 before:ltr:mr-1 rtl:before:ml-1">
            Someone famous <cite className="italic">Source Title</cite>
        </small>
    </blockquote>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jumbotron;
