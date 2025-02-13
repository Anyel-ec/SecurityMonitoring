import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect } from 'react';

const Colorlibrary = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Color Library'));
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
                    <span>Color Library</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                {/* main */}
                <div>
                    <div className="w-fit mb-5">
                        <h5 className="font-semibold text-base text-success bg-success/20 rounded px-3 py-1">
                            Main Colors
                        </h5>
                    </div>
                    <div className="mb-5">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-7 font-semibold dark:text-white-dark mb-7">
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-primary"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Primary</h5>
                                    <span className="text-white-dark">#4361ee</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-info"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Info</h5>
                                    <span className="text-white-dark">#2196f3</span>
                                </div>
                            </div>

                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-success"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Success</h5>
                                    <span className="text-white-dark">#00ab55</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-warning"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Warning</h5>
                                    <span className="text-white-dark">#e2a03f</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-danger"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Danger</h5>
                                    <span className="text-white-dark">#e7515a</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-secondary"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Secondry</h5>
                                    <span className="text-white-dark">#805dca</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-dark"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Dark</h5>
                                    <span className="text-white-dark">#3b3f5c</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-white"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">White</h5>
                                    <span className="text-white-dark">#ffffff</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-black"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Black</h5>
                                    <span className="text-white-dark">#0e1726</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-7 font-semibold dark:text-white-dark">
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-primary-light"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Primary-Light</h5>
                                    <span className="text-white-dark">#eaf1ff</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-info-light"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Info-Light</h5>
                                    <span className="text-white-dark">#e7f7ff</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-success-light"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Success-Light</h5>
                                    <span className="text-white-dark">#ddf5f0</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-warning-light"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Warning-Light</h5>
                                    <span className="text-white-dark">#fff9ed</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-danger-light"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Danger-Light</h5>
                                    <span className="text-white-dark">#fff5f5</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-secondary-light"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Secondry-Light</h5>
                                    <span className="text-white-dark">#ebe4f7</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-dark-light"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Dark-Light</h5>
                                    <span className="text-white-dark">#eaeaec</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-white-light"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">White-Light</h5>
                                    <span className="text-white-dark">#e0e6ed</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-black-light"></div>
                                <div>
                                    <h5 className="text-sm sm:text-base">Black-Light</h5>
                                    <span className="text-white-dark">#e3e4eb</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* more */}
                <div>
                    <div className="w-fit mb-5">
                        <h5 className="font-semibold text-sm sm:text-base text-success bg-success/20 rounded px-3 py-1">
                            More Colors
                        </h5>
                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-7 font-semibold dark:text-white-dark">
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-[#e3e7fc]"></div>
                                <div>
                                    <span className="text-white-dark">#e3e7fc</span>
                                </div>
                            </div>

                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-[#deeffd]"></div>
                                <div>
                                    <span className="text-white-dark">#deeffd</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-[#d9f2e6]"></div>
                                <div>
                                    <span className="text-white-dark">#d9f2e6</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-[#fbf1e2]"></div>
                                <div>
                                    <span className="text-white-dark">#fbf1e2</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-[#fbe5e6]"></div>
                                <div>
                                    <span className="text-white-dark">#fbe5e6</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-[#ece7f7]"></div>
                                <div>
                                    <span className="text-white-dark">#ece7f7</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-[#e2e2e7]"></div>
                                <div>
                                    <span className="text-white-dark">#e2e2e7</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-[#888ea8]"></div>
                                <div>
                                    <span className="text-white-dark">#888ea8</span>
                                </div>
                            </div>
                            <div className="panel p-2.5 rounded-md flex items-center group">
                                <div className="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110 bg-[#dbdcdf]"></div>
                                <div>
                                    <span className="text-white-dark">#dbdcdf</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Colorlibrary;
