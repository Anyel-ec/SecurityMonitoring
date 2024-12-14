import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconGlobe from '../../components/Icon/IconGlobe';
import IconGallery from '../../components/Icon/IconGallery';
import IconTxtFile from '../../components/Icon/IconTxtFile';

const Timeline = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Timeline'));
    });
    const [tabs, setTabs] = useState([]);

    const toggleCode = (name) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Components
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Timeline</span>
                </li>
            </ul>
            <div className="pt-5 grid xl:grid-cols-2 grid-cols-1 gap-6">
                {/* profile */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
                        <button onClick={() => toggleCode('code1')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <p className="text-white-dark font-bold mb-5 text-base">Today</p>
                        <div className="sm:flex">
                            <div className="relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] dark:before:border-[#191e3a] before:hidden sm:before:block">
                                <img src="/assets/images/profile-16.jpeg" alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">Laurie Fox</h4>
                                <p className="text-center ltr:sm:text-left rtl:sm:text-right">5 sec</p>
                                <div className="mt-4 sm:mt-7 mb-16">
                                    <IconGlobe className="w-5 h-5 text-white-dark ltr:mr-2.5 rtl:ml-2.5 inline-block align-text-bottom" />
                                    <h6 className="inline-block font-bold mb-2 text-lg">Trending Style</h6>
                                    <p className="ltr:pl-8 rtl:pr-8 text-white-dark font-semibold">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <div className="ltr:pl-8 rtl:pr-8 flex space-x-1 rtl:space-x-reverse mt-6">
                                        <img
                                            src="/assets/images/profile-16.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-1.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-2.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/profile-16.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-4.jpg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:flex">
                            <div className="relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] dark:before:border-[#191e3a] before:hidden sm:before:block">
                                <img src="/assets/images/profile-7.jpeg" alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">Justin Cross</h4>
                                <p className="text-center ltr:sm:text-left rtl:sm:text-right">45 min</p>
                                <div className="mt-4 sm:mt-7 mb-16">
                                    <IconGallery className="text-white-dark ltr:mr-2.5 rtl:ml-2.5 inline-block align-text-bottom" />
                                    <h6 className="inline-block font-bold mb-2 text-lg">Nature Photography</h6>
                                    <p className="ltr:pl-8 rtl:pr-8 text-white-dark font-semibold">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <div className="ltr:pl-8 rtl:pr-8 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3 mt-6">
                                        <img
                                            src="/assets/images/drag-1.jpeg"
                                            alt="img"
                                            className="w-full rounded-md shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/profile-16.jpeg"
                                            alt="img"
                                            className="w-full rounded-md shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-4.jpg"
                                            alt="img"
                                            className="w-full rounded-md shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:flex">
                            <div className="relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] dark:before:border-[#191e3a] before:hidden sm:before:block">
                                <img src="/assets/images/profile-16.jpeg" alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">Laurie Fox</h4>
                                <p className="text-center ltr:sm:text-left rtl:sm:text-right">5 sec</p>
                                <div className="mt-4 sm:mt-7 mb-16">
                                    <IconTxtFile className="w-4.5 h-4.5 text-white-dark ltr:mr-2.5 rtl:ml-2.5 inline-block align-text-bottom" />
                                    <h6 className="inline-block font-bold mb-2 text-lg">Create new Project</h6>
                                    <p className="ltr:pl-8 rtl:pr-8 text-white-dark font-semibold">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <div className="ltr:pl-8 rtl:pr-8 flex space-x-1 rtl:space-x-reverse mt-6">
                                        <img
                                            src="/assets/images/profile-16.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-1.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-2.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/profile-16.jpeg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                        <img
                                            src="/assets/images/drag-4.jpg"
                                            alt="img"
                                            className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code1') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <p className="text-white-dark font-bold mb-5 text-base">Today</p>
    <div className="sm:flex">
        <div className="relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] dark:before:border-[#191e3a] before:hidden sm:before:block">
            <img src="/assets/images/profile-16.jpeg" alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
        </div>
        <div className="flex-1">
            <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">Laurie Fox</h4>
            <p className="text-center ltr:sm:text-left rtl:sm:text-right">5 sec</p>
            <div className="mt-4 sm:mt-7 mb-16">
                <svg>...</svg>
                <h6 className="inline-block font-bold mb-2 text-lg">Trending Style</h6>
                <p className="ltr:pl-8 rtl:pr-8 text-white-dark font-semibold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="ltr:pl-8 rtl:pr-8 flex space-x-1 rtl:space-x-reverse mt-6">
                    <img
                        src="/assets/images/profile-16.jpeg"
                        alt="img"
                        className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                    <img
                        src="/assets/images/drag-1.jpeg"
                        alt="img"
                        className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                    <img
                        src="/assets/images/drag-2.jpeg"
                        alt="img"
                        className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                    <img
                        src="/assets/images/profile-16.jpeg"
                        alt="img"
                        className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                    <img
                        src="/assets/images/drag-4.jpg"
                        alt="img"
                        className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                </div>
            </div>
        </div>
    </div>
    <div className="sm:flex">
        <div className="relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] dark:before:border-[#191e3a] before:hidden sm:before:block">
            <img src="/assets/images/profile-7.jpeg" alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
        </div>
        <div className="flex-1">
            <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">Justin Cross</h4>
            <p className="text-center ltr:sm:text-left rtl:sm:text-right">45 min</p>
            <div className="mt-4 sm:mt-7 mb-16">
                <svg>...</svg>
                <h6 className="inline-block font-bold mb-2 text-lg">Nature Photography</h6>
                <p className="ltr:pl-8 rtl:pr-8 text-white-dark font-semibold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="ltr:pl-8 rtl:pr-8 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3 mt-6">
                    <img
                        src="/assets/images/drag-1.jpeg"
                        alt="img"
                        className="w-full rounded-md shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                    <img
                        src="/assets/images/profile-16.jpeg"
                        alt="img"
                        className="w-full rounded-md shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                    <img
                        src="/assets/images/drag-4.jpg"
                        alt="img"
                        className="w-full rounded-md shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                </div>
            </div>
        </div>
    </div>
    <div className="sm:flex">
        <div className="relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] dark:before:border-[#191e3a] before:hidden sm:before:block">
            <img src="/assets/images/profile-16.jpeg" alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
        </div>
        <div className="flex-1">
            <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">Laurie Fox</h4>
            <p className="text-center ltr:sm:text-left rtl:sm:text-right">5 sec</p>
            <div className="mt-4 sm:mt-7 mb-16">
                <svg>...</svg>
                <h6 className="inline-block font-bold mb-2 text-lg">Create new Project</h6>
                <p className="ltr:pl-8 rtl:pr-8 text-white-dark font-semibold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="ltr:pl-8 rtl:pr-8 flex space-x-1 rtl:space-x-reverse mt-6">
                    <img
                        src="/assets/images/profile-16.jpeg"
                        alt="img"
                        className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                    <img
                        src="/assets/images/drag-1.jpeg"
                        alt="img"
                        className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                    <img
                        src="/assets/images/drag-2.jpeg"
                        alt="img"
                        className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                    <img
                        src="/assets/images/profile-16.jpeg"
                        alt="img"
                        className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                    <img
                        src="/assets/images/drag-4.jpg"
                        alt="img"
                        className="w-10 h-10 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] relative top-0 transition-all duration-300 hover:-top-0.5 hover:shadow-none"
                    />
                </div>
            </div>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* modern */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Modern</h5>
                        <button onClick={() => toggleCode('code2')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 inline-block w-full">
                        <ul className="relative py-12 before:absolute before:bg-[#ebedf2] dark:before:bg-[#191e3a] before:bottom-0 before:left-1/2 before:top-0 before:w-[3px] before:-ml-[1.5px] max-w-[900px] mx-auto table">
                            <li className="relative mb-12 before:clear-both before:table after:clear-both after:table">
                                <div className="hidden sm:block absolute bg-info border-[3px] border-[#ebedf2] dark:border-[#191e3a] w-5 h-5 rounded-full left-1/2 top-[32px] -ml-2.5 z-[1]"></div>
                                <div className="relative border border-[#ebedf2] dark:border-[#191e3a] max-w-[320px] mx-auto sm:max-w-full w-full sm:w-[46%] shadow-[0_20px_20px_rgba(126,142,177,0.12)] rounded-md bg-white dark:bg-[#191e3a] ltr:sm:float-left rtl:sm:float-right before:absolute before:bg-[#ebedf2] dark:before:bg-[#191e3a] before:w-[37px] before:h-[3px] before:rounded-full ltr:before:-right-[37px] rtl:before:-left-[37px] before:top-10 sm:before:block before:hidden">
                                    <div>
                                        <img src="/assets/images/carousel1.jpeg" alt="timeline" className="w-full rounded-t-md" />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="mb-3 text-info text-lg font-semibold">Front-End Framework</h4>
                                        <p className="mb-3 text-white-dark">
                                            Map where your photos were taken and discover local points of interest. Map where your photos. Map where your photos were taken and discover.
                                        </p>
                                        <p>
                                            <button type="button" className="btn btn-info">
                                                Read more
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="relative mb-12 before:clear-both before:table after:clear-both after:table">
                                <div className="hidden sm:block absolute bg-primary border-[3px] border-[#ebedf2] dark:border-[#191e3a] w-5 h-5 rounded-full left-1/2 top-[32px] -ml-2.5 z-[1]"></div>
                                <div className="relative border border-[#ebedf2] dark:border-[#191e3a] max-w-[320px] mx-auto sm:max-w-full w-full sm:w-[46%] shadow-[0_20px_20px_rgba(126,142,177,0.12)] rounded-md bg-white dark:bg-[#191e3a] ltr:sm:float-right rtl:sm:float-left before:absolute before:bg-[#ebedf2] dark:before:bg-[#191e3a] before:w-[37px] before:h-[3px] before:rounded-full  ltr:before:-left-[37px] rtl:before:-right-[37px] before:top-10 sm:before:block before:hidden">
                                    <div>
                                        <img src="/assets/images/menu-heade.jpg" alt="timeline" className="w-full rounded-t-md" />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="mb-3 text-primary text-lg font-semibold">Web Development</h4>
                                        <p className="mb-3 text-white-dark">
                                            Map where your photos were taken and discover local points of interest. Map where your photos. Map where your photos were taken and discover.
                                        </p>
                                        <p>
                                            <button type="button" className="btn btn-primary">
                                                Read more
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="relative mb-12 before:clear-both before:table after:clear-both after:table">
                                <div className="hidden sm:block absolute bg-success border-[3px] border-[#ebedf2] dark:border-[#191e3a] w-5 h-5 rounded-full left-1/2 top-[32px] -ml-2.5 z-[1]"></div>
                                <div className="relative border border-[#ebedf2] dark:border-[#191e3a] max-w-[320px] mx-auto sm:max-w-full w-full sm:w-[46%] shadow-[0_20px_20px_rgba(126,142,177,0.12)] rounded-md bg-white dark:bg-[#191e3a] ltr:sm:float-left rtl:sm:float-right before:absolute before:bg-[#ebedf2] dark:before:bg-[#191e3a] before:w-[37px] before:h-[3px] before:rounded-full ltr:before:-right-[37px] rtl:before:-left-[37px] before:top-10 sm:before:block before:hidden">
                                    <div>
                                        <img src="/assets/images/carousel1.jpeg" alt="timeline" className="w-full rounded-t-md" />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="mb-3 text-success text-lg font-semibold">Theme Development</h4>
                                        <p className="mb-3 text-white-dark">
                                            Map where your photos were taken and discover local points of interest. Map where your photos. Map where your photos were taken and discover.
                                        </p>
                                        <p>
                                            <button type="button" className="btn btn-success">
                                                Read more
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="relative mb-12 before:clear-both before:table after:clear-both after:table">
                                <div className="hidden sm:block absolute bg-danger border-[3px] border-[#ebedf2] dark:border-[#191e3a] w-5 h-5 rounded-full left-1/2 top-[32px] -ml-2.5 z-[1]"></div>
                                <div className="relative border border-[#ebedf2] dark:border-[#191e3a] max-w-[320px] mx-auto sm:max-w-full w-full sm:w-[46%] shadow-[0_20px_20px_rgba(126,142,177,0.12)] rounded-md bg-white dark:bg-[#191e3a] ltr:sm:float-right rtl:sm:float-left before:absolute before:bg-[#ebedf2] dark:before:bg-[#191e3a] before:w-[37px] before:h-[3px] before:rounded-full  ltr:before:-left-[37px] rtl:before:-right-[37px] before:top-10 sm:before:block before:hidden">
                                    <div>
                                        <img src="/assets/images/menu-heade.jpg" alt="timeline" className="w-full rounded-t-md" />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="mb-3 text-danger text-lg font-semibold">Plugin Development</h4>
                                        <p className="mb-3 text-white-dark">
                                            Map where your photos were taken and discover local points of interest. Map where your photos. Map where your photos were taken and discover.
                                        </p>
                                        <p>
                                            <button type="button" className="btn btn-danger">
                                                Read more
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {tabs.includes('code2') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5 inline-block w-full">
<ul className="relative py-12 before:absolute before:bg-[#ebedf2] dark:before:bg-[#191e3a] before:bottom-0 before:left-1/2 before:top-0 before:w-[3px] before:-ml-[1.5px] max-w-[900px] mx-auto table">
    <li className="relative mb-12 before:clear-both before:table after:clear-both after:table">
        <div className="hidden sm:block absolute bg-info border-[3px] border-[#ebedf2] dark:border-[#191e3a] w-5 h-5 rounded-full left-1/2 top-[32px] -ml-2.5 z-[1]"></div>
        <div className="relative border border-[#ebedf2] dark:border-[#191e3a] max-w-[320px] mx-auto sm:max-w-full w-full sm:w-[46%] shadow-[0_20px_20px_rgba(126,142,177,0.12)] rounded-md bg-white dark:bg-[#191e3a] ltr:sm:float-left rtl:sm:float-right before:absolute before:bg-[#ebedf2] dark:before:bg-[#191e3a] before:w-[37px] before:h-[3px] before:rounded-full ltr:before:-right-[37px] rtl:before:-left-[37px] before:top-10 sm:before:block before:hidden">
            <div>
                <img src="/assets/images/carousel1.jpeg" alt="timeline" className="w-full rounded-t-md" />
            </div>
            <div className="p-5">
                <h4 className="mb-3 text-info text-lg font-semibold">Front-End Framework</h4>
                <p className="mb-3 text-white-dark">
                    Map where your photos were taken and discover local points of interest. Map where your photos. Map where your photos were taken and discover.
                </p>
                <p>
                    <button type="button" className="btn btn-info">
                        Read more
                    </button>
                </p>
            </div>
        </div>
    </li>
    <li className="relative mb-12 before:clear-both before:table after:clear-both after:table">
        <div className="hidden sm:block absolute bg-primary border-[3px] border-[#ebedf2] dark:border-[#191e3a] w-5 h-5 rounded-full left-1/2 top-[32px] -ml-2.5 z-[1]"></div>
        <div className="relative border border-[#ebedf2] dark:border-[#191e3a] max-w-[320px] mx-auto sm:max-w-full w-full sm:w-[46%] shadow-[0_20px_20px_rgba(126,142,177,0.12)] rounded-md bg-white dark:bg-[#191e3a] ltr:sm:float-right rtl:sm:float-left before:absolute before:bg-[#ebedf2] dark:before:bg-[#191e3a] before:w-[37px] before:h-[3px] before:rounded-full  ltr:before:-left-[37px] rtl:before:-right-[37px] before:top-10 sm:before:block before:hidden">
            <div>
                <img src="/assets/images/menu-heade.jpg" alt="timeline" className="w-full rounded-t-md" />
            </div>
            <div className="p-5">
                <h4 className="mb-3 text-primary text-lg font-semibold">Web Development</h4>
                <p className="mb-3 text-white-dark">
                    Map where your photos were taken and discover local points of interest. Map where your photos. Map where your photos were taken and discover.
                </p>
                <p>
                    <button type="button" className="btn btn-primary">
                        Read more
                    </button>
                </p>
            </div>
        </div>
    </li>
    <li className="relative mb-12 before:clear-both before:table after:clear-both after:table">
        <div className="hidden sm:block absolute bg-success border-[3px] border-[#ebedf2] dark:border-[#191e3a] w-5 h-5 rounded-full left-1/2 top-[32px] -ml-2.5 z-[1]"></div>
        <div className="relative border border-[#ebedf2] dark:border-[#191e3a] max-w-[320px] mx-auto sm:max-w-full w-full sm:w-[46%] shadow-[0_20px_20px_rgba(126,142,177,0.12)] rounded-md bg-white dark:bg-[#191e3a] ltr:sm:float-left rtl:sm:float-right before:absolute before:bg-[#ebedf2] dark:before:bg-[#191e3a] before:w-[37px] before:h-[3px] before:rounded-full ltr:before:-right-[37px] rtl:before:-left-[37px] before:top-10 sm:before:block before:hidden">
            <div>
                <img src="/assets/images/carousel1.jpeg" alt="timeline" className="w-full rounded-t-md" />
            </div>
            <div className="p-5">
                <h4 className="mb-3 text-success text-lg font-semibold">Theme Development</h4>
                <p className="mb-3 text-white-dark">
                    Map where your photos were taken and discover local points of interest. Map where your photos. Map where your photos were taken and discover.
                </p>
                <p>
                    <button type="button" className="btn btn-success">
                        Read more
                    </button>
                </p>
            </div>
        </div>
    </li>
    <li className="relative mb-12 before:clear-both before:table after:clear-both after:table">
        <div className="hidden sm:block absolute bg-danger border-[3px] border-[#ebedf2] dark:border-[#191e3a] w-5 h-5 rounded-full left-1/2 top-[32px] -ml-2.5 z-[1]"></div>
        <div className="relative border border-[#ebedf2] dark:border-[#191e3a] max-w-[320px] mx-auto sm:max-w-full w-full sm:w-[46%] shadow-[0_20px_20px_rgba(126,142,177,0.12)] rounded-md bg-white dark:bg-[#191e3a] ltr:sm:float-right rtl:sm:float-left before:absolute before:bg-[#ebedf2] dark:before:bg-[#191e3a] before:w-[37px] before:h-[3px] before:rounded-full  ltr:before:-left-[37px] rtl:before:-right-[37px] before:top-10 sm:before:block before:hidden">
            <div>
                <img src="/assets/images/menu-heade.jpg" alt="timeline" className="w-full rounded-t-md" />
            </div>
            <div className="p-5">
                <h4 className="mb-3 text-danger text-lg font-semibold">Plugin Development</h4>
                <p className="mb-3 text-white-dark">
                    Map where your photos were taken and discover local points of interest. Map where your photos. Map where your photos were taken and discover.
                </p>
                <p>
                    <button type="button" className="btn btn-danger">
                        Read more
                    </button>
                </p>
            </div>
        </div>
    </li>
</ul>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* basic */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Basic</h5>
                        <button onClick={() => toggleCode('code3')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="max-w-[900px] mx-auto">
                            <div className="flex">
                                <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">10:00</p>
                                <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-primary before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-primary after:rounded-full"></div>
                                <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                    <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Updated Server Logs</p>
                                    <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">25 mins ago</p>
                                </div>
                            </div>
                            <div className="flex">
                                <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">12:45</p>
                                <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-secondary before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-secondary after:rounded-full"></div>
                                <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                    <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Backup Files EOD</p>
                                    <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">2 hrs ago</p>
                                </div>
                            </div>
                            <div className="flex">
                                <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">14:00</p>
                                <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-success before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-success after:rounded-full"></div>
                                <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                    <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Send Mail to HR and Admin</p>
                                    <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">4 hrs ago</p>
                                </div>
                            </div>
                            <div className="flex">
                                <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">16:00</p>
                                <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-danger before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-danger after:rounded-full"></div>
                                <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                    <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Conference call with Marketing Manager.</p>
                                    <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">6 hrs ago</p>
                                </div>
                            </div>
                            <div className="flex">
                                <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">17:00</p>
                                <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-warning before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-warning after:rounded-full"></div>
                                <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                    <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">
                                        Collected documents from <button type="button">Sara</button>
                                    </p>
                                    <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">9 hrs ago</p>
                                </div>
                            </div>
                            <div className="flex">
                                <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">16:00</p>
                                <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-info before:rounded-full"></div>
                                <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                    <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Server rebooted successfully</p>
                                    <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">8 hrs ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code3') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="max-w-[900px] mx-auto">
        <div className="flex">
            <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">10:00</p>
            <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-primary before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-primary after:rounded-full"></div>
            <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Updated Server Logs</p>
                <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">25 mins ago</p>
            </div>
        </div>
        <div className="flex">
            <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">12:45</p>
            <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-secondary before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-secondary after:rounded-full"></div>
            <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Backup Files EOD</p>
                <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">2 hrs ago</p>
            </div>
        </div>
        <div className="flex">
            <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">14:00</p>
            <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-success before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-success after:rounded-full"></div>
            <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Send Mail to HR and Admin</p>
                <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">4 hrs ago</p>
            </div>
        </div>
        <div className="flex">
            <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">16:00</p>
            <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-danger before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-danger after:rounded-full"></div>
            <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Conference call with Marketing Manager.</p>
                <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">6 hrs ago</p>
            </div>
        </div>
        <div className="flex">
            <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">17:00</p>
            <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-warning before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-warning after:rounded-full"></div>
            <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">
                    Collected documents from <button type="button">Sara</button>
                </p>
                <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">9 hrs ago</p>
            </div>
        </div>
        <div className="flex">
            <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-base font-semibold py-2.5">16:00</p>
            <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-info before:rounded-full"></div>
            <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Server rebooted successfully</p>
                <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">8 hrs ago</p>
            </div>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* with images */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">With Images</h5>
                        <button onClick={() => toggleCode('code4')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="max-w-[900px] mx-auto text-center ltr:sm:text-left rtl:sm:text-right space-y-3 sm:space-y-0">
                            <div className="sm:flex items-center">
                                <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">09:00</p>
                                <div className="p-2.5 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-white-dark/20 after:rounded-full">
                                    <img src="/assets/images/profile-16.jpeg" alt="img" className="w-11 h-11 rounded-full relative z-[1] mx-auto" />
                                </div>
                                <p className="text-white-dark text-xs font-bold self-center sm:min-w-[100px] sm:max-w-[100px] p-2.5 mt-5 sm:mt-0">25 mins ago</p>
                                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">Conference call with Marketing Manager.</p>
                            </div>
                            <div className="sm:flex items-center">
                                <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">10:00</p>
                                <div className="p-2.5 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-white-dark/20 after:rounded-full">
                                    <img src="/assets/images/profile-1.jpeg" alt="img" className="w-11 h-11 rounded-full relative z-[1] mx-auto" />
                                </div>
                                <p className="text-white-dark text-xs font-bold self-center sm:min-w-[100px] sm:max-w-[100px] p-2.5 mt-5 sm:mt-0">2 hrs ago</p>
                                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">Server rebooted successfully</p>
                            </div>
                            <div className="sm:flex items-center">
                                <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">11:00</p>
                                <div className="p-2.5 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-white-dark/20 after:rounded-full">
                                    <img src="/assets/images/profile-2.jpeg" alt="img" className="w-11 h-11 rounded-full relative z-[1] mx-auto" />
                                </div>
                                <p className="text-white-dark text-xs font-bold self-center sm:min-w-[100px] sm:max-w-[100px] p-2.5 mt-5 sm:mt-0">4 hrs ago</p>
                                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">Backup Files EOD</p>
                            </div>
                            <div className="sm:flex items-center">
                                <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">12:00</p>
                                <div className="p-2.5 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-white-dark/20 after:rounded-full">
                                    <img src="/assets/images/profile-3.jpeg" alt="img" className="w-11 h-11 rounded-full relative z-[1] mx-auto" />
                                </div>
                                <p className="text-white-dark text-xs font-bold self-center sm:min-w-[100px] sm:max-w-[100px] p-2.5 mt-5 sm:mt-0">6 hrs ago</p>
                                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">Collected documents from Sara</p>
                            </div>
                            <div className="sm:flex items-center">
                                <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">01:00</p>
                                <div className="p-2.5 relative">
                                    <img src="/assets/images/profile-4.jpeg" alt="img" className="w-11 h-11 rounded-full relative z-[1] mx-auto" />
                                </div>
                                <p className="text-white-dark text-xs font-bold self-center sm:min-w-[100px] sm:max-w-[100px] p-2.5 mt-5 sm:mt-0">9 hrs ago</p>
                                <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">PDF file Download</p>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code4') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="max-w-[900px] mx-auto text-center ltr:sm:text-left rtl:sm:text-right space-y-3 sm:space-y-0">
        <div className="sm:flex items-center">
            <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">09:00</p>
            <div className="p-2.5 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-white-dark/20 after:rounded-full">
                <img src="/assets/images/profile-16.jpeg" alt="img" className="w-11 h-11 rounded-full relative z-[1] mx-auto" />
            </div>
            <p className="text-white-dark text-xs font-bold self-center sm:min-w-[100px] sm:max-w-[100px] p-2.5 mt-5 sm:mt-0">25 mins ago</p>
            <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">Conference call with Marketing Manager.</p>
        </div>
        <div className="sm:flex items-center">
            <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">10:00</p>
            <div className="p-2.5 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-white-dark/20 after:rounded-full">
                <img src="/assets/images/profile-1.jpeg" alt="img" className="w-11 h-11 rounded-full relative z-[1] mx-auto" />
            </div>
            <p className="text-white-dark text-xs font-bold self-center sm:min-w-[100px] sm:max-w-[100px] p-2.5 mt-5 sm:mt-0">2 hrs ago</p>
            <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">Server rebooted successfully</p>
        </div>
        <div className="sm:flex items-center">
            <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">11:00</p>
            <div className="p-2.5 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-white-dark/20 after:rounded-full">
                <img src="/assets/images/profile-2.jpeg" alt="img" className="w-11 h-11 rounded-full relative z-[1] mx-auto" />
            </div>
            <p className="text-white-dark text-xs font-bold self-center sm:min-w-[100px] sm:max-w-[100px] p-2.5 mt-5 sm:mt-0">4 hrs ago</p>
            <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">Backup Files EOD</p>
        </div>
        <div className="sm:flex items-center">
            <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">12:00</p>
            <div className="p-2.5 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-white-dark/20 after:rounded-full">
                <img src="/assets/images/profile-3.jpeg" alt="img" className="w-11 h-11 rounded-full relative z-[1] mx-auto" />
            </div>
            <p className="text-white-dark text-xs font-bold self-center sm:min-w-[100px] sm:max-w-[100px] p-2.5 mt-5 sm:mt-0">6 hrs ago</p>
            <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">Collected documents from Sara</p>
        </div>
        <div className="sm:flex items-center">
            <p className="text-[#3b3f5c] dark:text-white-light text-base font-semibold p-2.5">01:00</p>
            <div className="p-2.5 relative">
                <img src="/assets/images/profile-4.jpeg" alt="img" className="w-11 h-11 rounded-full relative z-[1] mx-auto" />
            </div>
            <p className="text-white-dark text-xs font-bold self-center sm:min-w-[100px] sm:max-w-[100px] p-2.5 mt-5 sm:mt-0">9 hrs ago</p>
            <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">PDF file Download</p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
