import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';

const Typography = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Typography'));
    });
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Elements
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Typography</span>
                </li>
            </ul>
            <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div className="panel">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Heading</h5>
                    <div className="flex items-center justify-center mb-5">
                        <div className="border border-white-dark/20 dark:border-[#191e3a] rounded-md overflow-hidden w-full max-w-xs">
                            <div className="p-4 bg-white dark:bg-[#191e3a]">
                                <p className="text-4xl text-[#515365] leading-[60px] dark:text-white-light">The quick brown fox</p>
                            </div>
                            <div className="p-4 bg-dark-light dark:bg-[#191e3a] border-t border-border-white-dark/20 dark:border-black">
                                <h5 className="text-base dark:text-white-light">Nunito</h5>
                                <button className="text-primary text-[13px]">Google Fonts</button>
                                <div className="flex justify-center mt-7">
                                    <button className="btn btn-primary">View Family</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Heading</h5>
                    <div className="flex items-center justify-center mb-5">
                        <div className="border border-white-dark/20 rounded-md w-full max-w-xs prose p-5">
                            <h1 className="m-0 dark:text-white-dark">H1. Heading</h1>
                            <h2 className="m-0 dark:text-white-dark">H2. Heading</h2>
                            <h3 className="m-0 dark:text-white-dark">H3. Heading</h3>
                            <h4 className="m-0 dark:text-white-dark">H4. Heading</h4>
                            <h5 className="m-0 dark:text-white-dark">H5. Heading</h5>
                            <h6 className="m-0 dark:text-white-dark">H6. Heading</h6>
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Heading Colored</h5>
                    <div className="flex items-center justify-center mb-5">
                        <div className="border border-white-dark/20 rounded-md w-full max-w-xs prose p-5">
                            <h1 className="text-primary m-0">H1. Heading</h1>
                            <h2 className="text-info m-0">H2. Heading</h2>
                            <h3 className="text-success m-0">H3. Heading</h3>
                            <h4 className="text-warning m-0">H4. Heading</h4>
                            <h5 className="text-danger m-0">H5. Heading</h5>
                            <h6 className="text-secondary m-0">H6. Heading</h6>
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Icon List</h5>
                    <div className="flex items-center justify-center mb-5">
                        <div className="border border-white-dark/20 rounded-md w-full max-w-xs p-5">
                            <ul className="space-y-3 font-semibold">
                                <li>
                                    <IconArrowLeft className="inline text-primary rtl:rotate-180 ltr:mr-2 rtl:ml-2" />
                                    <span className="list-text">Aliquam et eros vehicula.</span>
                                </li>
                                <li>
                                    <IconArrowLeft className="inline text-primary rtl:rotate-180 ltr:mr-2 rtl:ml-2" />
                                    <span className="list-text">Vivamus lacus suscipit.</span>
                                </li>
                                <li>
                                    <IconArrowLeft className="inline text-primary rtl:rotate-180 ltr:mr-2 rtl:ml-2" />
                                    <span className="list-text">Morbi luctus tincidunt.</span>
                                </li>
                                <li>
                                    <IconArrowLeft className="inline text-primary rtl:rotate-180 ltr:mr-2 rtl:ml-2" />
                                    <span className="list-text">Nulla metus dolor.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Unordered list</h5>
                    <div className="flex items-center justify-center mb-5">
                        <div className="border border-white-dark/20 rounded-md w-full max-w-xs p-5 text-white-dark">
                            <ul className="space-y-3 list-inside list-disc font-semibold">
                                <li className="mb-1">Consectetur adipiscing elit</li>
                                <li className="mb-1">Integer molestie lorem at massa</li>
                                <li className="mb-1">Facilisis in pretium nisl aliquet</li>
                                <li className="inline">
                                    <ul className="list-inside ltr:pl-5 rtl:pr-5 space-y-3">
                                        <li className="mb-1 mt-1">Phasellus iaculis neque</li>
                                        <li className="mb-1">Purus sodales ultricies</li>
                                        <li className="mb-1">Ac tristique libero volutpat at</li>
                                    </ul>
                                </li>
                                <li className="mb-1 mt-1">Faucibus porta lacus fringilla vel</li>
                                <li className="mb-1">Aenean sit amet erat nunc</li>
                                <li className="mb-1">Eget porttitor lorem</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Ordered list</h5>
                    <div className="flex items-center justify-center mb-5">
                        <div className="border border-white-dark/20 rounded-md w-full max-w-xs p-5 text-white-dark">
                            <ol className="space-y-3 list-inside list-decimal font-semibold">
                                <li className="mb-1">Consectetur adipiscing elit</li>
                                <li className="mb-1">Integer molestie lorem at massa</li>
                                <li className="mb-1">Facilisis in pretium nisl aliquet</li>
                                <li className="inline">
                                    <ol className="list-inside list-decimal ltr:pl-5 rtl:pr-5 space-y-3">
                                        <li className="mb-1 mt-1">Phasellus iaculis neque</li>
                                        <li className="mb-1">Purus sodales ultricies</li>
                                        <li className="mb-1">Ac tristique libero volutpat at</li>
                                    </ol>
                                </li>
                                <li className="mb-1 mt-1">Faucibus porta lacus fringilla vel</li>
                                <li className="mb-1">Aenean sit amet erat nunc</li>
                                <li className="mb-1">Eget porttitor lorem</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Blockquote</h5>
                    <div className="flex items-center justify-center mb-5">
                        <blockquote className="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]">
                            <div className="flex items-start">
                                <p className="not-italic text-[#515365] text-sm dark:text-white-light m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            </div>
                            <small className="w-full not-italic text-xs text-[#777] block before:w-3 before:h-[1px] before:bg-[#777] before:inline-block before:opacity-50 before:relative before:-top-1 ltr:before:mr-1 rtl:before:ml-1">
                                Someone famous <cite className="italic">Source Title</cite>
                            </small>
                        </blockquote>
                    </div>
                </div>

                <div className="panel">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Blockquote with profile</h5>
                    <div className="flex items-center justify-center mb-5">
                        <blockquote className="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]">
                            <div className="flex items-start">
                                <div className="w-14 h-14 ltr:mr-5 rtl:ml-5 flex-none">
                                    <img src="/assets/images/profile-34.jpeg" alt="img" className="w-14 h-14 rounded-full object-cover m-auto" />
                                </div>
                                <p className="not-italic text-[#515365] text-sm dark:text-white-light m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            </div>
                            <small className="ltr:text-right rtl:text-left w-full not-italic text-xs text-[#777] block before:w-3 before:h-[1px] before:bg-[#777] before:inline-block before:opacity-50 before:relative before:-top-1 ltr:before:mr-1 rtl:before:ml-1">
                                Someone famous <cite className="italic">Source Title</cite>
                            </small>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Typography;
