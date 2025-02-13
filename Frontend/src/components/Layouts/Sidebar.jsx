import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconMinus from '../Icon/IconMinus';
import { useLogoutService } from '../../hooks/services/system/Auth.service';
import { hasRole } from '../../hooks/services/system/AuthUtils';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state) => state.themeConfig);
    const semidark = useSelector((state) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul = selector.closest('ul.sub-menu');
            if (ul) {
                let ele = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    // Cerrar sesion
    const { content, loading, error } = useLogoutService();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await content();

        if (result.httpCode === 200) {
            window.location.href = '/';
            navigate('/');
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/inicio" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" />
                            <span className="text-lg ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('Security Monitoring')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <i className="fa-solid fa-bars-sort m-auto"></i>
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative flex flex-col h-full font-semibold space-y-0.5 p-4 py-0">

                            {/* Separadores */}
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('system')}</span>
                            </h2>

                            {/* Items */}
                            <li className="menu nav-item">
                                <NavLink to="/inicio" className="group">
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-house group-hover:!text-primary shrink-0"></i>
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('home')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/activacion" className="group">
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-square-check group-hover:!text-primary shrink-0"></i>
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Activación</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/alertas" className="group">
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-gears group-hover:!text-primary shrink-0"></i>
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Alertas</span>
                                    </div>
                                </NavLink>
                            </li>


                            {/* Cerrar sesion */}
                            <li className="menu nav-item !mt-auto w-full">
                                <button className="group" onClick={handleLogout}>
                                    <div className="flex justify-center items-center w-full text-danger dark:text-red-400 dark:group-hover:text-red-dark">
                                        <i className="fa-solid fa-arrow-up-left-from-circle"></i>
                                        <span className="ltr:pl-3 rtl:pr-3 text-center text-danger dark:text-red-400 dark:group-hover:text-red-dark">Cerrar Sesión</span>
                                    </div>
                                </button>
                            </li>

                            {hasRole(['admin', 'superadmin']) && (
                                <li className="menu relative">
                                    <ul className="nav-link">
                                        <NavLink to="/gestion-usuarios" className="flex items-center">
                                            <i className="fa-solid fa-users"></i>
                                            <span className="px-1">{t('Gestionar usuarios')}</span>
                                        </NavLink>
                                    </ul>
                                </li>
                            )}



                            {/* Listas */}
                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard
                                            className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>

                                    <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('sales')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/analytics">{t('analytics')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/finance">{t('finance')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/crypto">{t('crypto')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
