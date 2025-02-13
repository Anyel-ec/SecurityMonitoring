import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import CountUp from 'react-countup';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconUsers from '../../components/Icon/IconUsers';
import IconCloudDownload from '../../components/Icon/IconCloudDownload';
import IconAward from '../../components/Icon/IconAward';

const Counter = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Counter'));
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
                    <span>Counter</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                <div className="panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap">
                    <div className="ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://www.npmjs.com/package/react-countup" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://www.npmjs.com/package/react-countup
                    </a>
                </div>
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
                    {/* Simple Counter */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Simple Counter</h5>
                            <button onClick={() => toggleCode('code1')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5 grid grid-cols-3 justify-items-center gap-3 max-w-[900px] mx-auto">
                            <div>
                                <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
                                    <CountUp start={0} end={710} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
                                </div>
                                <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">HOURS</h4>
                            </div>
                            <div>
                                <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
                                    <CountUp start={0} end={915} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
                                </div>
                                <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">TICKETS</h4>
                            </div>
                            <div>
                                <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
                                    <CountUp start={0} end={580} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
                                </div>
                                <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">CUSTOMERS</h4>
                            </div>
                        </div>
                        {tabs.includes('code1') && (
                            <CodeHighlight>
                                <pre className="language-typescript">
                                    {`import CountUp from 'react-countup';

<div className="mb-5 grid grid-cols-3 justify-items-center gap-3 max-w-[900px] mx-auto">
    <div>
        <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
            <CountUp start={0} end={710} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
        </div>
        <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">HOURS</h4>
    </div>
    <div>
        <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
            <CountUp start={0} end={915} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
        </div>
        <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">TICKETS</h4>
    </div>
    <div>
        <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
            <CountUp start={0} end={580} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
        </div>
        <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">CUSTOMERS</h4>
    </div>
</div>
`}
                                </pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* With icon */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">With Icon</h5>
                            <button onClick={() => toggleCode('code2')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5 grid grid-cols-3 justify-items-center gap-3 max-w-[900px] mx-auto">
                            <div>
                                <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded-full border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
                                    <CountUp start={0} end={105} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
                                </div>
                                <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">
                                    <IconUsers className="sm:w-6 sm:h-6 text-primary mx-auto mb-2" />
                                    Clients
                                </h4>
                            </div>
                            <div>
                                <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded-full border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
                                    <CountUp start={0} end={300} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
                                </div>
                                <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">
                                    <IconCloudDownload className="sm:w-6 sm:h-6 text-primary mx-auto mb-2" />
                                    Downloads
                                </h4>
                            </div>
                            <div>
                                <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded-full border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
                                    <CountUp start={0} end={58} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
                                </div>
                                <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">
                                    <IconAward className="sm:w-6 sm:h-6 text-primary mx-auto mb-2" />
                                    Awards
                                </h4>
                            </div>
                        </div>
                        {tabs.includes('code2') && (
                            <CodeHighlight>
                                <pre className="language-typescript">
                                    {`import CountUp from 'react-countup';

<div className="mb-5 grid grid-cols-3 justify-items-center gap-3 max-w-[900px] mx-auto">
    <div>
        <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded-full border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
            <CountUp start={0} end={105} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
        </div>
        <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">
            <svg>...</svg>
            Clients
        </h4>
    </div>
    <div>
        <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded-full border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
            <CountUp start={0} end={300} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
        </div>
        <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">
        <svg>...</svg>
            Downloads
        </h4>
    </div>
    <div>
        <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded-full border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
            <CountUp start={0} end={58} duration={7} className="text-primary text-xl sm:text-3xl text-center"></CountUp>
        </div>
        <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">
        <svg>...</svg>
            Awards
        </h4>
    </div>
</div>

`}
                                </pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counter;
