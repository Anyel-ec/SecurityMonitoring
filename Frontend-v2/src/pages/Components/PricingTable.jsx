import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';

const PricingTable = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Pricing Tables'));
    });
    const [codeArr, setCodeArr] = useState([]);

    const toggleCode = (name) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const [yearlyPrice, setYearlyPrice] = useState(false);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Components
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Pricing Table</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                {/* Basic */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Basic</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="max-w-[320px] md:max-w-[990px] mx-auto">
                            <div className="md:flex justify-between space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
                                <div className="p-3 lg:p-5 border border-black dark:border-[#1b2e4b] text-center rounded group hover:border-primary">
                                    <h3 className="text-xl lg:text-2xl">Beginner Savers</h3>
                                    <div className="border-t border-black dark:border-white-dark w-1/5 mx-auto my-6 group-hover:border-primary"></div>
                                    <p className="text-[15px]">For people who are starting out in the water saving business</p>
                                    <div className="my-7 p-2.5 text-center text-lg group-hover:text-primary">
                                        <strong className="text-[#3b3f5c] dark:text-white-dark text-3xl lg:text-5xl group-hover:text-primary">$19</strong> / monthly
                                    </div>
                                    <ul className="space-y-2.5 mb-5 font-semibold group-hover:text-primary">
                                        <li className="flex justify-center items-center">
                                            <IconArrowLeft className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1 rtl:rotate-180 shrink-0" />
                                            Free water saving e-book
                                        </li>
                                        <li className="flex justify-center items-center">
                                            <IconArrowLeft className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1 rtl:rotate-180 shrink-0" />
                                            Free access to forums
                                        </li>
                                        <li className="flex justify-center items-center">
                                            <IconArrowLeft className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1 rtl:rotate-180 shrink-0" />
                                            Beginners tips
                                        </li>
                                    </ul>
                                    <button
                                        type="button"
                                        className="btn text-black shadow-none group-hover:text-primary group-hover:border-primary group-hover:bg-primary/10 dark:text-white-dark dark:border-white-dark/50 w-full"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                                <div className="p-3 lg:p-5 border border-black dark:border-[#1b2e4b] text-center rounded group hover:border-primary">
                                    <h3 className="text-xl lg:text-2xl">Advanced Savers</h3>
                                    <div className="border-t border-black dark:border-white-dark w-1/5 mx-auto my-6 group-hover:border-primary"></div>
                                    <p className="text-[15px] ">For experienced water savers who'd like to push their limits</p>
                                    <div className="my-7 p-2.5 text-center text-lg group-hover:text-primary">
                                        <strong className="text-[#3b3f5c] dark:text-white-dark text-3xl lg:text-5xl group-hover:text-primary">$29</strong> / monthly
                                    </div>
                                    <ul className="space-y-2.5 mb-5 font-semibold group-hover:text-primary">
                                        <li className="flex justify-center items-center">
                                            <IconArrowLeft className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1 rtl:rotate-180 shrink-0" />
                                            Free water saving e-book
                                        </li>
                                        <li className="flex justify-center items-center">
                                            <IconArrowLeft className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1 rtl:rotate-180 shrink-0" />
                                            Free access to forums
                                        </li>
                                        <li className="flex justify-center items-center">
                                            <IconArrowLeft className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1 rtl:rotate-180 shrink-0" />
                                            Advanced saving tips
                                        </li>
                                    </ul>
                                    <button
                                        type="button"
                                        className="btn text-black shadow-none group-hover:text-primary group-hover:border-primary group-hover:bg-primary/10 dark:text-white-dark dark:border-white-dark/50 w-full"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                                <div className="p-3 lg:p-5 border border-black dark:border-[#1b2e4b] text-center rounded group hover:border-primary">
                                    <h3 className="text-xl lg:text-2xl">Pro Savers</h3>
                                    <div className="border-t border-black dark:border-white-dark w-1/5 mx-auto my-6 group-hover:border-primary"></div>
                                    <p className="text-[15px] ">For all the professionals who'd like to educate others, too</p>
                                    <div className="my-7 p-2.5 text-center text-lg group-hover:text-primary">
                                        <strong className="text-[#3b3f5c] dark:text-white-dark text-3xl lg:text-5xl group-hover:text-primary">$79</strong> / monthly
                                    </div>
                                    <ul className="space-y-2.5 mb-5 font-semibold group-hover:text-primary">
                                        <li className="flex justify-center items-center">
                                            <IconArrowLeft className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1 rtl:rotate-180 shrink-0" />
                                            Access to all books
                                        </li>
                                        <li className="flex justify-center items-center">
                                            <IconArrowLeft className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1 rtl:rotate-180 shrink-0" />
                                            Unlimited board topics
                                        </li>
                                        <li className="flex justify-center items-center">
                                            <IconArrowLeft className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1 rtl:rotate-180 shrink-0" />
                                            Beginners tips
                                        </li>
                                    </ul>
                                    <button
                                        type="button"
                                        className="btn text-black shadow-none group-hover:text-primary group-hover:border-primary group-hover:bg-primary/10 dark:text-white-dark dark:border-white-dark/50 w-full"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="max-w-[320px] md:max-w-[990px] mx-auto">
        <div className="md:flex justify-between space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
            <div className="p-3 lg:p-5 border border-black dark:border-[#1b2e4b] text-center rounded group hover:border-primary">
                <h3 className="text-xl lg:text-2xl">Beginner Savers</h3>
                <div className="border-t border-black dark:border-white-dark w-1/5 mx-auto my-6 group-hover:border-primary"></div>
                <p className="text-[15px]">For people who are starting out in the water saving business</p>
                <div className="my-7 p-2.5 text-center text-lg group-hover:text-primary">
                    <strong className="text-[#3b3f5c] dark:text-white-dark text-3xl lg:text-5xl group-hover:text-primary">$19</strong> / monthly
                </div>
                <ul className="space-y-2.5 mb-5 font-semibold group-hover:text-primary">
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Free water saving e-book
                    </li>
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Free access to forums
                    </li>
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Beginners tips
                    </li>
                </ul>
                <button
                    type="button"
                    className="btn text-black shadow-none group-hover:text-primary group-hover:border-primary group-hover:bg-primary/10 dark:text-white-dark dark:border-white-dark/50 w-full"
                >
                    Buy Now
                </button>
            </div>
            <div className="p-3 lg:p-5 border border-black dark:border-[#1b2e4b] text-center rounded group hover:border-primary">
                <h3 className="text-xl lg:text-2xl">Advanced Savers</h3>
                <div className="border-t border-black dark:border-white-dark w-1/5 mx-auto my-6 group-hover:border-primary"></div>
                <p className="text-[15px] ">For experienced water savers who'd like to push their limits</p>
                <div className="my-7 p-2.5 text-center text-lg group-hover:text-primary">
                    <strong className="text-[#3b3f5c] dark:text-white-dark text-3xl lg:text-5xl group-hover:text-primary">$29</strong> / monthly
                </div>
                <ul className="space-y-2.5 mb-5 font-semibold group-hover:text-primary">
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Free water saving e-book
                    </li>
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Free access to forums
                    </li>
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Advanced saving tips
                    </li>
                </ul>
                <button
                    type="button"
                    className="btn text-black shadow-none group-hover:text-primary group-hover:border-primary group-hover:bg-primary/10 dark:text-white-dark dark:border-white-dark/50 w-full"
                >
                    Buy Now
                </button>
            </div>
            <div className="p-3 lg:p-5 border border-black dark:border-[#1b2e4b] text-center rounded group hover:border-primary">
                <h3 className="text-xl lg:text-2xl">Pro Savers</h3>
                <div className="border-t border-black dark:border-white-dark w-1/5 mx-auto my-6 group-hover:border-primary"></div>
                <p className="text-[15px] ">For all the professionals who'd like to educate others, too</p>
                <div className="my-7 p-2.5 text-center text-lg group-hover:text-primary">
                    <strong className="text-[#3b3f5c] dark:text-white-dark text-3xl lg:text-5xl group-hover:text-primary">$79</strong> / monthly
                </div>
                <ul className="space-y-2.5 mb-5 font-semibold group-hover:text-primary">
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Access to all books
                    </li>
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Unlimited board topics
                    </li>
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Beginners tips
                    </li>
                </ul>
                <button type="button"
                    className="btn text-black shadow-none group-hover:text-primary group-hover:border-primary group-hover:bg-primary/10 dark:text-white-dark dark:border-white-dark/50 w-full"
                >
                    Buy Now
                </button>
            </div>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/*  Toggle */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Toggle</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="max-w-[320px] md:max-w-[1140px] mx-auto dark:text-white-dark">
                            <div className="mt-5 md:mt-10 text-center flex justify-center space-x-4 rtl:space-x-reverse font-semibold text-base">
                                <span className={`${!yearlyPrice ? 'text-primary' : 'text-white-dark'}`}>Monthly</span>

                                <label className="w-12 h-6 relative">
                                    <input
                                        id="custom_switch_checkbox1"
                                        type="checkbox"
                                        className="custom_switch absolute ltr:left-0 rtl:right-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer peer"
                                        onChange={() => setYearlyPrice(!yearlyPrice)}
                                    />
                                    <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute ltr:before:left-1 rtl:before:right-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center ltr:peer-checked:before:left-7 rtl:peer-checked:before:right-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                                <span className={`relative ${yearlyPrice ? 'text-primary' : ' text-white-dark'}  `}>
                                    Yearly
                                    <span className="badge bg-success rounded-full absolute ltr:left-full rtl:right-full whitespace-nowrap ltr:ml-2 rtl:mr-2 my-auto hidden">20% Off</span>
                                </span>
                            </div>
                            <div className="md:flex space-y-4 md:space-y-0 mt-5 md:mt-16 text-white-dark">
                                <div className="p-4 lg:p-9 border ltr:md:border-r-0 rtl:md:border-l-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-r-none rtl:md:rounded-l-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                                    <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Cloud Hosting</h3>
                                    <p>cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM.</p>
                                    <div className="my-7 p-2.5 text-center text-lg">
                                        <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$25</strong> / monthly
                                    </div>
                                    <div className="mb-6">
                                        <strong className="text-black dark:text-white-light text-[15px] mb-3 inline-block">Cloud Hosting Features</strong>
                                        <ul className="space-y-3">
                                            <li>Single Domain</li>
                                            <li>50 GB SSD</li>
                                            <li>1 TB Premium Bandwidth</li>
                                        </ul>
                                    </div>
                                    <button type="button" className="btn btn-dark w-full">
                                        Buy Now
                                    </button>
                                </div>
                                <div className="relative p-4 pt-14 lg:p-9 border border-white-light dark:border-[#1b2e4b] transition-all duration-300 rounded-t-md">
                                    <div className="absolute top-0 md:-top-[30px] inset-x-0 bg-primary text-white h-10 flex items-center justify-center text-base rounded-t-md">Most Popular</div>
                                    <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">VPS Hosting</h3>
                                    <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 4GB RAM.</p>
                                    <div className="my-7 p-2.5 text-center text-lg">
                                        <strong className="text-primary text-xl lg:text-4xl">$70</strong> / monthly
                                    </div>
                                    <div className="mb-6">
                                        <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">VPS Hosting Features</strong>
                                        <ul className="space-y-3">
                                            <li>5 Domains</li>
                                            <li>100 GB SSD</li>
                                            <li>2 TB Premium Bandwidth</li>
                                        </ul>
                                    </div>
                                    <button type="button" className="btn btn-primary w-full">
                                        Buy Now
                                    </button>
                                </div>
                                <div className="p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                                    <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Business Hosting</h3>
                                    <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 8GB RAM.</p>
                                    <div className="my-7 p-2.5 text-center text-lg">
                                        <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$115</strong> / monthly
                                    </div>
                                    <div className="mb-6">
                                        <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">Business Hosting Features</strong>
                                        <ul className="space-y-3">
                                            <li>Unlimited Domains</li>
                                            <li>1 TB SSD</li>
                                            <li>5 TB Premium Bandwidth</li>
                                        </ul>
                                    </div>
                                    <button type="button" className="btn btn-dark w-full">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="max-w-[320px] md:max-w-[1140px] mx-auto dark:text-white-dark">
        <div className="mt-5 md:mt-10 text-center flex justify-center space-x-4 rtl:space-x-reverse font-semibold text-base">
            <span className={\`\${!yearlyPrice ? 'text-primary' : 'text-white-dark'}\`}>Monthly</span>

            <label className="w-12 h-6 relative">
                <input
                    id="custom_switch_checkbox1"
                    type="checkbox"
                    className="custom_switch absolute ltr:left-0 rtl:right-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer peer"
                    onChange={() => setYearlyPrice(!yearlyPrice)}
                />
                <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute ltr:before:left-1 rtl:before:right-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center ltr:peer-checked:before:left-7 rtl:peer-checked:before:right-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
            </label>
            <span className={\`\relative ${yearlyPrice ? 'text-primary' : ' text-white-dark'}\`}>
                Yearly
                <span className="badge bg-success rounded-full absolute ltr:left-full rtl:right-full whitespace-nowrap ltr:ml-2 rtl:mr-2 my-auto hidden">20% Off</span>
            </span>
        </div>
        <div className="md:flex space-y-4 md:space-y-0 mt-5 md:mt-16 text-white-dark">
            <div className="p-4 lg:p-9 border ltr:md:border-r-0 rtl:md:border-l-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-r-none rtl:md:rounded-l-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Cloud Hosting</h3>
                <p>cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM.</p>
                <div className="my-7 p-2.5 text-center text-lg">
                    <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$25</strong> / monthly
                </div>
                <div className="mb-6">
                    <strong className="text-black dark:text-white-light text-[15px] mb-3 inline-block">Cloud Hosting Features</strong>
                    <ul className="space-y-3">
                        <li>Single Domain</li>
                        <li>50 GB SSD</li>
                        <li>1 TB Premium Bandwidth</li>
                    </ul>
                </div>
                <button type="button" className="btn btn-dark w-full">
                    Buy Now
                </button>
            </div>
            <div className="relative p-4 pt-14 lg:p-9 border border-white-light dark:border-[#1b2e4b] transition-all duration-300 rounded-t-md">
                <div className="absolute top-0 md:-top-[30px] inset-x-0 bg-primary text-white h-10 flex items-center justify-center text-base rounded-t-md">Most Popular</div>
                <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">VPS Hosting</h3>
                <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 4GB RAM.</p>
                <div className="my-7 p-2.5 text-center text-lg">
                    <strong className="text-primary text-xl lg:text-4xl">$70</strong> / monthly
                </div>
                <div className="mb-6">
                    <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">VPS Hosting Features</strong>
                    <ul className="space-y-3">
                        <li>5 Domains</li>
                        <li>100 GB SSD</li>
                        <li>2 TB Premium Bandwidth</li>
                    </ul>
                </div>
                <button type="button" className="btn btn-primary w-full">
                    Buy Now
                </button>
            </div>
            <div className="p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">Business Hosting</h3>
                <p>cPanel/WHM included. Intel Xeon E5 with guaranteed 8GB RAM.</p>
                <div className="my-7 p-2.5 text-center text-lg">
                    <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">$115</strong> / monthly
                </div>
                <div className="mb-6">
                    <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">Business Hosting Features</strong>
                    <ul className="space-y-3">
                        <li>Unlimited Domains</li>
                        <li>1 TB SSD</li>
                        <li>5 TB Premium Bandwidth</li>
                    </ul>
                </div>
                <button type="button" className="btn btn-dark w-full">
                    Buy Now
                </button>
            </div>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Animated */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Animated</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="max-w-[1140px] mx-auto mt-20 dark:text-white-dark">
                            <div className="md:flex justify-between space-y-14 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
                                <div className="border border-white-light dark:border-[#1b2e4b] rounded transition-all duration-300 group">
                                    <div className="border-b border-white-light dark:border-[#1b2e4b] p-5 pt-0">
                                        <span className="bg-white dark:bg-black text-[#3b3f5c] dark:text-white-light border-2 border-primary w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded flex justify-center items-center text-xl lg:text-3xl font-bold -mt-[30px] shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] transition-all duration-300 group-hover:-translate-y-[10px]">
                                            $49
                                        </span>
                                        <h3 className="text-xl lg:text-2xl mt-4 mb-2.5">Freelancer</h3>
                                        <p className="text-[15px] ">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </div>
                                    <div className="p-5">
                                        <ul className="space-y-2.5 mb-5 font-semibold">
                                            <li>Support forum</li>
                                            <li>Free hosting</li>
                                            <li>2 hours of support</li>
                                            <li>5GB of storage space</li>
                                        </ul>
                                        <button type="button" className="btn btn-primary w-full">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                                <div className="border border-white-light dark:border-[#1b2e4b] rounded transition-all duration-300 group">
                                    <div className="border-b border-white-light dark:border-[#1b2e4b] p-5 pt-0">
                                        <span className="bg-white dark:bg-black text-[#3b3f5c] dark:text-white-light border-2 border-primary w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded flex justify-center items-center text-xl lg:text-3xl font-bold -mt-[30px] shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] transition-all duration-300 group-hover:-translate-y-[10px]">
                                            $89
                                        </span>
                                        <h3 className="text-xl lg:text-2xl mt-4 mb-2.5">Small business</h3>
                                        <p className="text-[15px] ">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </div>
                                    <div className="p-5">
                                        <ul className="space-y-2.5 mb-5 font-semibold">
                                            <li>Unlimited calls</li>
                                            <li>Free hosting</li>
                                            <li>10 hours of support</li>
                                            <li>10GB of storage space</li>
                                        </ul>
                                        <button type="button" className="btn btn-primary w-full">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                                <div className="border border-white-light dark:border-[#1b2e4b] rounded transition-all duration-300 group">
                                    <div className="border-b border-white-light dark:border-[#1b2e4b] p-5 pt-0">
                                        <span className="bg-white dark:bg-black text-[#3b3f5c] dark:text-white-light border-2 border-primary w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded flex justify-center items-center text-xl lg:text-3xl font-bold -mt-[30px] shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] transition-all duration-300 group-hover:-translate-y-[10px]">
                                            $129
                                        </span>
                                        <h3 className="text-xl lg:text-2xl mt-4 mb-2.5">Larger business</h3>
                                        <p className="text-[15px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </div>
                                    <div className="p-5">
                                        <ul className="space-y-2.5 mb-5 font-semibold">
                                            <li>Unlimited calls</li>
                                            <li>Free hosting</li>
                                            <li>Unlimited hours of support</li>
                                            <li>1TB of storage space</li>
                                        </ul>
                                        <button type="button" className="btn btn-primary w-full">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code3') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="max-w-[1140px] mx-auto mt-20 dark:text-white-dark">
        <div className="md:flex justify-between space-y-14 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
            <div className="border border-white-light dark:border-[#1b2e4b] rounded transition-all duration-300 group">
                <div className="border-b border-white-light dark:border-[#1b2e4b] p-5 pt-0">
                    <span className="bg-white dark:bg-black text-[#3b3f5c] dark:text-white-light border-2 border-primary w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded flex justify-center items-center text-xl lg:text-3xl font-bold -mt-[30px] shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] transition-all duration-300 group-hover:-translate-y-[10px]">
                        $49
                    </span>
                    <h3 className="text-xl lg:text-2xl mt-4 mb-2.5">Freelancer</h3>
                    <p className="text-[15px] ">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
                <div className="p-5">
                    <ul className="space-y-2.5 mb-5 font-semibold">
                        <li>Support forum</li>
                        <li>Free hosting</li>
                        <li>2 hours of support</li>
                        <li>5GB of storage space</li>
                    </ul>
                    <button type="button" className="btn btn-primary w-full">
                        Buy Now
                    </button>
                </div>
            </div>
            <div className="border border-white-light dark:border-[#1b2e4b] rounded transition-all duration-300 group">
                <div className="border-b border-white-light dark:border-[#1b2e4b] p-5 pt-0">
                    <span className="bg-white dark:bg-black text-[#3b3f5c] dark:text-white-light border-2 border-primary w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded flex justify-center items-center text-xl lg:text-3xl font-bold -mt-[30px] shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] transition-all duration-300 group-hover:-translate-y-[10px]">
                        $89
                    </span>
                    <h3 className="text-xl lg:text-2xl mt-4 mb-2.5">Small business</h3>
                    <p className="text-[15px] ">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
                <div className="p-5">
                    <ul className="space-y-2.5 mb-5 font-semibold">
                        <li>Unlimited calls</li>
                        <li>Free hosting</li>
                        <li>10 hours of support</li>
                        <li>10GB of storage space</li>
                    </ul>
                    <button type="button" className="btn btn-primary w-full">
                        Buy Now
                    </button>
                </div>
            </div>
            <div className="border border-white-light dark:border-[#1b2e4b] rounded transition-all duration-300 group">
                <div className="border-b border-white-light dark:border-[#1b2e4b] p-5 pt-0">
                    <span className="bg-white dark:bg-black text-[#3b3f5c] dark:text-white-light border-2 border-primary w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded flex justify-center items-center text-xl lg:text-3xl font-bold -mt-[30px] shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] transition-all duration-300 group-hover:-translate-y-[10px]">
                        $129
                    </span>
                    <h3 className="text-xl lg:text-2xl mt-4 mb-2.5">Larger business</h3>
                    <p className="text-[15px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
                <div className="p-5">
                    <ul className="space-y-2.5 mb-5 font-semibold">
                        <li>Unlimited calls</li>
                        <li>Free hosting</li>
                        <li>Unlimited hours of support</li>
                        <li>1TB of storage space</li>
                    </ul>
                    <button type="button" className="btn btn-primary w-full">
                        Buy Now
                    </button>
                </div>
            </div>
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

export default PricingTable;
