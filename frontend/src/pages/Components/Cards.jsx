import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconDroplet from '../../components/Icon/IconDroplet';
import IconStar from '../../components/Icon/IconStar';
import IconEye from '../../components/Icon/IconEye';
import IconHeart from '../../components/Icon/IconHeart';

const Cards = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Cards'));
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
                    <span>Cards</span>
                </li>
            </ul>
            <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
                {/* card 1 */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Card 1</h5>
                        <button type="button" onClick={() => toggleCode('code1')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 flex items-center justify-center">
                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="py-7 px-6">
                                <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                                    <IconDroplet />
                                </div>
                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Simple</h5>
                                <p className="text-white-dark">Mauris nisi felis, placerat in volutpat id, varius et sapien.</p>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code1') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5 flex items-center justify-center">
    <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <div className="py-7 px-6">
            <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                <svg>...</svg>
            </div>
            <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Simple</h5>
            <p className="text-white-dark">Mauris nisi felis, placerat in volutpat id, varius et sapien.</p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* card 2 */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Card 2</h5>
                        <button type="button" onClick={() => toggleCode('code2')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 flex items-center justify-center">
                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="py-7 px-6">
                                <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[215px] overflow-hidden">
                                    <img src="/assets/images/profile-28.jpeg" alt="cover" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">CLI Based</h5>
                                <p className="text-white-dark">Etiam sed augue ac justo tincidunt posuere. Vivamus euismod eros, nec risus malesuada.</p>
                                <button type="button" className="btn btn-primary mt-6">
                                    Explore More
                                </button>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code2') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5 flex items-center justify-center">
    <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <div className="py-7 px-6">
            <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[215px] overflow-hidden">
                <img src="/assets/images/profile-28.jpeg" alt="cover" className="w-full h-full object-cover" />
            </div>
            <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">CLI Based</h5>
            <p className="text-white-dark">Etiam sed augue ac justo tincidunt posuere. Vivamus euismod eros, nec risus malesuada.</p>
            <button type="button" className="btn btn-primary mt-6">
                Explore More
            </button>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* card 3 */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Card 3</h5>
                        <button type="button" onClick={() => toggleCode('code3')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 flex items-center justify-center">
                        <div className="max-w-[18rem] w-full bg-[#3b3f5c] shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5">
                            <div className="text-center text-black-light">
                                <div className="mb-5 w-20 h-20 rounded-full overflow-hidden mx-auto">
                                    <img src="/assets/images/profile-34.jpeg" alt="profile" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="text-white text-[15px] font-semibold mb-2">Luke Ivory</h5>
                                <p>Manager</p>
                                <div className="flex justify-center items-center text-[#e2a03f] my-4">
                                    <IconStar className="fill-warning" />
                                    <IconStar className="fill-warning" />
                                    <IconStar className="fill-warning" />
                                    <IconStar className="fill-warning" />
                                    <IconStar />
                                </div>
                                <p className="font-semibold italic">Maecenas nec mi vel lacus condimentum rhoncus dignissim egestas orci. Integer blandit porta placerat. Vestibulum in ultricies.</p>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code3') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5 flex items-center justify-center">
    <div className="max-w-[18rem] w-full bg-[#3b3f5c] shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5">
        <div className="text-center text-black-light">
            <div className="mb-5 w-20 h-20 rounded-full overflow-hidden mx-auto">
                <img src="/assets/images/profile-34.jpeg" alt="profile" className="w-full h-full object-cover" />
            </div>
            <h5 className="text-white text-[15px] font-semibold mb-2">Luke Ivory</h5>
            <p>Manager</p>
            <div className="flex justify-center items-center text-[#e2a03f] my-4">
                <svg>...</svg>
                <svg>...</svg>
                <svg>...</svg>
                <svg>...</svg>
                <svg>...</svg>
            </div>
            <p className="font-semibold italic">Maecenas nec mi vel lacus condimentum rhoncus dignissim egestas orci. Integer blandit porta placerat. Vestibulum in ultricies.</p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* card 4 */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Card 4</h5>
                        <button type="button" onClick={() => toggleCode('code4')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 flex items-center justify-center">
                        <div className="max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="p-5 flex items-center flex-col sm:flex-row">
                                <div className="mb-5 w-20 h-20 rounded-full overflow-hidden">
                                    <img src="/assets/images/profile-34.jpeg" alt="profile" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                                    <h5 className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">Luke Ivory</h5>
                                    <p className="mb-2 text-white-dark">Manager</p>
                                    <span className="badge bg-primary rounded-full">4.5</span>
                                    <p className="font-semibold text-white-dark mt-4 sm:mt-8">
                                        Maecenas nec mi vel lacus condimentum rhoncus dignissim egestas orci. Integer blandit porta placerat. Vestibulum in ultricies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code4') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5 flex items-center justify-center">
    <div className="max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <div className="p-5 flex items-center flex-col sm:flex-row">
            <div className="mb-5 w-20 h-20 rounded-full overflow-hidden">
                <img src="/assets/images/profile-34.jpeg" alt="profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                <h5 className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">Luke Ivory</h5>
                <p className="mb-2 text-white-dark">Manager</p>
                <span className="badge bg-primary rounded-full">4.5</span>
                <p className="font-semibold text-white-dark mt-4 sm:mt-8">
                    Maecenas nec mi vel lacus condimentum rhoncus dignissim egestas orci. Integer blandit porta placerat. Vestibulum in ultricies.
                </p>
            </div>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* card 5 */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Card 5</h5>
                        <button type="button" onClick={() => toggleCode('code5')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 flex items-center justify-center">
                        <div className="max-w-[20rem] w-full bg-secondary shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-0 dark:bg-secondary-dark-light dark:shadow-none p-5">
                            <div className="text-black-light">
                                <p className="font-semibold mb-5">Maecenas nec mi vel lacus condimentum rhoncus dignissim egestas orci. Integer blandit porta placerat. Vestibulum in ultricies.</p>
                                <div className="flex">
                                    <div className="mb-5 w-14 h-14 rounded-full overflow-hidden mx-auto">
                                        <img src="/assets/images/profile-34.jpeg" alt="profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 ltr:pl-4 rtl:pr-4">
                                        <h5 className="text-white text-[15px] font-semibold mb-1">Luke Ivory</h5>
                                        <p>Manager</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code5') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5 flex items-center justify-center">
    <div className="max-w-[20rem] w-full bg-secondary shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-0 dark:bg-secondary-dark-light dark:shadow-none p-5">
        <div className="text-black-light">
            <p className="font-semibold mb-5">Maecenas nec mi vel lacus condimentum rhoncus dignissim egestas orci. Integer blandit porta placerat. Vestibulum in ultricies.</p>
            <div className="flex">
                <div className="mb-5 w-14 h-14 rounded-full overflow-hidden mx-auto">
                    <img src="/assets/images/profile-34.jpeg" alt="profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 ltr:pl-4 rtl:pr-4">
                    <h5 className="text-white text-[15px] font-semibold mb-1">Luke Ivory</h5>
                    <p>Manager</p>
                </div>
            </div>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* card 6 */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Card 6</h5>
                        <button type="button" onClick={() => toggleCode('code6')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 flex items-center justify-center">
                        <div className="max-w-[20rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5 ">
                            <div className="text-[#515365] dark:text-white-light">
                                <p className="font-semibold italic mb-5">
                                    Maecenas nec mi vel lacus condimentum rhoncus dignissim egestas orci. Integer blandit porta placerat. Vestibulum in ultricies.
                                </p>
                                <div className="flex">
                                    <div className="flex-1">
                                        <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-1.5 dark:text-white-light">Luke Ivory</h5>
                                        <p className="text-white-dark mb-1.5">Manager</p>
                                        <div className="flex justify-start items-center text-[#e2a03f]">
                                            <IconStar className="w-3 h-3 fill-warning" />
                                            <IconStar className="w-3 h-3 fill-warning" />
                                            <IconStar className="w-3 h-3 fill-warning" />
                                            <IconStar className="w-3 h-3 fill-warning" />
                                            <IconStar className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code6') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5 flex items-center justify-center">
    <div className="max-w-[20rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5 ">
        <div className="text-[#515365] dark:text-white-light">
            <p className="font-semibold italic mb-5">
                Maecenas nec mi vel lacus condimentum rhoncus dignissim egestas orci. Integer blandit porta placerat. Vestibulum in ultricies.
            </p>
            <div className="flex">
                <div className="flex-1">
                    <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-1.5 dark:text-white-light">Luke Ivory</h5>
                    <p className="text-white-dark mb-1.5">Manager</p>
                    <div className="flex justify-start items-center text-[#e2a03f]">
                        <svg>...</svg>
                        <svg>...</svg>
                        <svg>...</svg>
                        <svg>...</svg>
                        <svg>...</svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* card 7 */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Card 7</h5>
                        <button type="button" onClick={() => toggleCode('code7')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 flex items-center justify-center">
                        <div className="max-w-[20rem] w-full bg-primary shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-0 dark:bg-primary-dark-light dark:shadow-none p-5">
                            <div className="text-center font-semibold">
                                <h5 className="text-white text-xl font-bold mb-5 dark:text-white-light">Rating</h5>
                                <p className="text-white mb-5 text-base">(4.3)</p>
                                <div className="flex justify-center items-center gap-1 text-[#e2a03f]">
                                    <IconStar className="w-4.5 h-4.5 fill-warning" />
                                    <IconStar className="w-4.5 h-4.5 fill-warning" />
                                    <IconStar className="w-4.5 h-4.5 fill-warning" />
                                    <IconStar className="w-4.5 h-4.5 fill-warning" />
                                    <IconStar className="w-4.5 h-4.5" />
                                    <span className="text-white ltr:ml-1 rtl:mr-1">(94)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code7') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5 flex items-center justify-center">
    <div className="max-w-[20rem] w-full bg-primary shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-0 dark:bg-primary-dark-light dark:shadow-none p-5">
        <div className="text-center font-semibold">
            <h5 className="text-white text-xl font-bold mb-5 dark:text-white-light">Rating</h5>
            <p className="text-white mb-5 text-base">(4.3)</p>
            <div className="flex justify-center items-center gap-1 text-[#e2a03f]">
                <svg>...</svg>
                <svg>...</svg>
                <svg>...</svg>
                <svg>...</svg>
                <svg>...</svg>
                <span className="text-white ltr:ml-1 rtl:mr-1">(94)</span>
            </div>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* card 8 */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Card 8</h5>
                        <button type="button" onClick={() => toggleCode('code8')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 flex items-center justify-center">
                        <div className="max-w-[24rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5">
                            <div className="flex justify-between mb-5">
                                <h6 className="text-black font-semibold text-base dark:text-white-light">Placed Order</h6>
                                <span className="badge bg-primary/10 text-primary py-1.5 dark:bg-primary dark:text-white">IN PROGRESS</span>
                            </div>
                            <div className="flex items-center justify-start -space-x-3 rtl:space-x-reverse mb-5">
                                <img
                                    className="w-9 h-9 rounded-full overflow-hidden object-cover ring-2 ring-white dark:ring-[#515365] shadow-[0_0_15px_1px_rgba(113,106,202,0.30)] dark:shadow-none"
                                    src="/assets/images/profile-34.jpeg"
                                    alt="profile"
                                />
                                <img
                                    className="w-9 h-9 rounded-full overflow-hidden object-cover ring-2 ring-white dark:ring-[#515365] shadow-[0_0_15px_1px_rgba(113,106,202,0.30)] dark:shadow-none"
                                    src="/assets/images/profile-34.jpeg"
                                    alt="profile"
                                />
                                <img
                                    className="w-9 h-9 rounded-full overflow-hidden object-cover ring-2 ring-white dark:ring-[#515365] shadow-[0_0_15px_1px_rgba(113,106,202,0.30)] dark:shadow-none"
                                    src="/assets/images/profile-34.jpeg"
                                    alt="profile"
                                />
                                <span className="bg-white rounded-full px-2 py-1 text-primary text-xs shadow-[0_0_20px_0_#d0d0d0] dark:shadow-none dark:bg-black dark:text-white">+5 more</span>
                            </div>
                            <div className="text-right">
                                <span className="text-primary font-semibold">60%</span>
                                <div className="bg-[#ebedf2] dark:bg-black rounded-full w-full h-1.5 mt-1.5">
                                    <div className="rounded-full bg-primary h-full" style={{ width: '60%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code8') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5 flex items-center justify-center">
<div className="max-w-[24rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5">
    <div className="flex justify-between mb-5">
        <h6 className="text-black font-semibold text-base dark:text-white-light">Placed Order</h6>
        <span className="badge bg-primary/10 text-primary py-1.5 dark:bg-primary dark:text-white">IN PROGRESS</span>
    </div>
    <div className="flex items-center justify-start -space-x-3 rtl:space-x-reverse mb-5">
        <img
            className="w-9 h-9 rounded-full overflow-hidden object-cover ring-2 ring-white dark:ring-[#515365] shadow-[0_0_15px_1px_rgba(113,106,202,0.30)] dark:shadow-none"
            src="/assets/images/profile-34.jpeg"
            alt="profile"
        />
        <img
            className="w-9 h-9 rounded-full overflow-hidden object-cover ring-2 ring-white dark:ring-[#515365] shadow-[0_0_15px_1px_rgba(113,106,202,0.30)] dark:shadow-none"
            src="/assets/images/profile-34.jpeg"
            alt="profile"
        />
        <img
            className="w-9 h-9 rounded-full overflow-hidden object-cover ring-2 ring-white dark:ring-[#515365] shadow-[0_0_15px_1px_rgba(113,106,202,0.30)] dark:shadow-none"
            src="/assets/images/profile-34.jpeg"
            alt="profile"
        />
        <span className="bg-white rounded-full px-2 py-1 text-primary text-xs shadow-[0_0_20px_0_#d0d0d0] dark:shadow-none dark:bg-black dark:text-white">+5 more</span>
    </div>
    <div className="text-right">
        <span className="text-primary font-semibold">60%</span>
        <div className="bg-[#ebedf2] dark:bg-black rounded-full w-full h-1.5 mt-1.5">
            <div className="rounded-full bg-primary h-full" style={{ width: '60%' }}></div>
        </div>
    </div>
</div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* card 9 */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Card 9</h5>
                        <button type="button" onClick={() => toggleCode('code9')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 flex items-center justify-center">
                        <div className="max-w-[22rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="py-7 px-6">
                                <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[260px] overflow-hidden">
                                    <img src="/assets/images/profile-28.jpeg" alt="profile" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-primary text-xs mb-1.5 font-bold">25 Sep 2020</p>
                                <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-4 dark:text-white-light">How to Start a Blog in 5 Easy Steps.</h5>
                                <p className="text-white-dark ">Vestibulum vestibulum tortor ut eros tincidunt, ut rutrum elit volutpat.</p>
                                <div className="relative flex justify-between mt-6 pt-4 before:w-[250px] before:h-[1px] before:bg-white-light before:inset-x-0 before:top-0 before:absolute before:mx-auto dark:before:bg-[#1b2e4b]">
                                    <div className="flex items-center font-semibold">
                                        <div className="w-9 h-9 rounded-full overflow-hidden inline-block ltr:mr-2 rtl:ml-2.5">
                                            <span className="flex w-full h-full items-center justify-center bg-[#515365] text-white-light shrink-0">AG</span>
                                        </div>
                                        <div className="text-[#515365] dark:text-white-dark">Luke Ivory</div>
                                    </div>
                                    <div className="flex font-semibold">
                                        <div className="text-primary flex items-center ltr:mr-3 rtl:ml-3">
                                            <IconHeart className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                                            51
                                        </div>
                                        <div className="text-primary flex items-center">
                                            <IconEye className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                                            250
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tabs.includes('code9') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5 flex items-center justify-center">
    <div className="max-w-[22rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <div className="py-7 px-6">
            <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[260px] overflow-hidden">
                <img src="/assets/images/profile-28.jpeg" alt="profile" className="w-full h-full object-cover" />
            </div>
            <p className="text-primary text-xs mb-1.5 font-bold">25 Sep 2020</p>
            <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-4 dark:text-white-light">How to Start a Blog in 5 Easy Steps.</h5>
            <p className="text-white-dark ">Vestibulum vestibulum tortor ut eros tincidunt, ut rutrum elit volutpat.</p>
            <div className="relative flex justify-between mt-6 pt-4 before:w-[250px] before:h-[1px] before:bg-white-light before:inset-x-0 before:top-0 before:absolute before:mx-auto dark:before:bg-[#1b2e4b]">
                <div className="flex items-center font-semibold">
                    <div className="w-9 h-9 rounded-full overflow-hidden inline-block ltr:mr-2 rtl:ml-2.5">
                        <span className="flex w-full h-full items-center justify-center bg-[#515365] text-white-light">AG</span>
                    </div>
                    <div className="text-[#515365] dark:text-white-dark">Luke Ivory</div>
                </div>
                <div className="flex font-semibold">
                    <div className="text-primary flex items-center ltr:mr-3 rtl:ml-3">
                        <svg>...</svg>
                        51
                    </div>
                    <div className="text-primary flex items-center">
                        <svg>...</svg>
                        250
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>  `}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cards;
