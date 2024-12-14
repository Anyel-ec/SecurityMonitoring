import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAnimation, toggleLayout, toggleMenu, toggleNavbar, toggleRTL, toggleTheme, toggleSemidark } from '../../store/themeConfigSlice';
import IconSettings from '../Icon/IconSettings';
import IconX from '../Icon/IconX';
import IconSun from '../Icon/IconSun';
import IconMoon from '../Icon/IconMoon';
import IconLaptop from '../Icon/IconLaptop';

const Setting = () => {
    const themeConfig = useSelector((state) => state.themeConfig);
    const dispatch = useDispatch();

    const [showCustomizer, setShowCustomizer] = useState(false);

    return (
        <div>
            <div className={`${(showCustomizer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} onClick={() => setShowCustomizer(false)}></div>

            <nav
                className={`${
                    (showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
                } bg-white fixed ltr:-right-[400px] rtl:-left-[400px] top-0 bottom-0 w-full max-w-[400px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
            >
                <button
                    type="button"
                    className="bg-primary ltr:rounded-tl-full rtl:rounded-tr-full ltr:rounded-bl-full rtl:rounded-br-full absolute ltr:-left-12 rtl:-right-12 top-0 bottom-0 my-auto w-12 h-10 flex justify-center items-center text-white cursor-pointer"
                    onClick={() => setShowCustomizer(!showCustomizer)}
                >
                    <IconSettings className="animate-[spin_3s_linear_infinite] w-5 h-5" />
                </button>

                <div className="overflow-y-auto overflow-x-hidden perfect-scrollbar h-full">
                    <div className="text-center relative pb-5">
                        <button type="button" className="absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowCustomizer(false)}>
                            <IconX className="w-5 h-5" />
                        </button>

                        <h4 className="mb-1 dark:text-white">TEMPLATE CUSTOMIZER</h4>
                        <p className="text-white-dark">Set preferences that will be cookied for your live preview demonstration.</p>
                    </div>

                    <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                        <h5 className="mb-1 text-base dark:text-white leading-none">Color Scheme</h5>
                        <p className="text-white-dark text-xs">Overall light or dark presentation.</p>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                            <button type="button" className={`${themeConfig.theme === 'light' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('light'))}>
                                <IconSun className="w-5 h-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                Light
                            </button>

                            <button type="button" className={`${themeConfig.theme === 'dark' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('dark'))}>
                                <IconMoon className="w-5 h-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                Dark
                            </button>

                            <button type="button" className={`${themeConfig.theme === 'system' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('system'))}>
                                <IconLaptop className="w-5 h-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                System
                            </button>
                        </div>
                    </div>

                    <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                        <h5 className="mb-1 text-base dark:text-white leading-none">Navigation Position</h5>
                        <p className="text-white-dark text-xs">Select the primary navigation paradigm for your app.</p>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                            <button type="button" className={`${themeConfig.menu === 'horizontal' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleMenu('horizontal'))}>
                                Horizontal
                            </button>

                            <button type="button" className={`${themeConfig.menu === 'vertical' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleMenu('vertical'))}>
                                Vertical
                            </button>

                            <button
                                type="button"
                                className={`${themeConfig.menu === 'collapsible-vertical' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                                onClick={() => dispatch(toggleMenu('collapsible-vertical'))}
                            >
                                Collapsible
                            </button>
                        </div>
                        <div className="mt-5 text-primary">
                            <label className="inline-flex mb-0">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={themeConfig.semidark === true || themeConfig.semidark === 'true'}
                                    onChange={(e) => dispatch(toggleSemidark(e.target.checked))}
                                />
                                <span>Semi Dark (Sidebar & Header)</span>
                            </label>
                        </div>
                    </div>

                    <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                        <h5 className="mb-1 text-base dark:text-white leading-none">Layout Style</h5>
                        <p className="text-white-dark text-xs">Select the primary layout style for your app.</p>
                        <div className="flex gap-2 mt-3">
                            <button
                                type="button"
                                className={`${themeConfig.layout === 'boxed-layout' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`}
                                onClick={() => dispatch(toggleLayout('boxed-layout'))}
                            >
                                Box
                            </button>

                            <button type="button" className={`${themeConfig.layout === 'full' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`} onClick={() => dispatch(toggleLayout('full'))}>
                                Full
                            </button>
                        </div>
                    </div>

                    <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                        <h5 className="mb-1 text-base dark:text-white leading-none">Direction</h5>
                        <p className="text-white-dark text-xs">Select the direction for your app.</p>
                        <div className="flex gap-2 mt-3">
                            <button type="button" className={`${themeConfig.rtlClass === 'ltr' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`} onClick={() => dispatch(toggleRTL('ltr'))}>
                                LTR
                            </button>

                            <button type="button" className={`${themeConfig.rtlClass === 'rtl' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`} onClick={() => dispatch(toggleRTL('rtl'))}>
                                RTL
                            </button>
                        </div>
                    </div>

                    <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                        <h5 className="mb-1 text-base dark:text-white leading-none">Navbar Type</h5>
                        <p className="text-white-dark text-xs">Sticky or Floating.</p>
                        <div className="mt-3 flex items-center gap-3 text-primary">
                            <label className="inline-flex mb-0">
                                <input
                                    type="radio"
                                    checked={themeConfig.navbar === 'navbar-sticky'}
                                    value="navbar-sticky"
                                    className="form-radio"
                                    onChange={() => dispatch(toggleNavbar('navbar-sticky'))}
                                />
                                <span>Sticky</span>
                            </label>
                            <label className="inline-flex mb-0">
                                <input
                                    type="radio"
                                    checked={themeConfig.navbar === 'navbar-floating'}
                                    value="navbar-floating"
                                    className="form-radio"
                                    onChange={() => dispatch(toggleNavbar('navbar-floating'))}
                                />
                                <span>Floating</span>
                            </label>
                            <label className="inline-flex mb-0">
                                <input
                                    type="radio"
                                    checked={themeConfig.navbar === 'navbar-static'}
                                    value="navbar-static"
                                    className="form-radio"
                                    onChange={() => dispatch(toggleNavbar('navbar-static'))}
                                />
                                <span>Static</span>
                            </label>
                        </div>
                    </div>

                    <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                        <h5 className="mb-1 text-base dark:text-white leading-none">Router Transition</h5>
                        <p className="text-white-dark text-xs">Animation of main content.</p>
                        <div className="mt-3">
                            <select className="form-select border-primary text-primary" value={themeConfig.animation} onChange={(e) => dispatch(toggleAnimation(e.target.value))}>
                                <option value=" ">None</option>
                                <option value="animate__fadeIn">Fade</option>
                                <option value="animate__fadeInDown">Fade Down</option>
                                <option value="animate__fadeInUp">Fade Up</option>
                                <option value="animate__fadeInLeft">Fade Left</option>
                                <option value="animate__fadeInRight">Fade Right</option>
                                <option value="animate__slideInDown">Slide Down</option>
                                <option value="animate__slideInLeft">Slide Left</option>
                                <option value="animate__slideInRight">Slide Right</option>
                                <option value="animate__zoomIn">Zoom In</option>
                            </select>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Setting;
