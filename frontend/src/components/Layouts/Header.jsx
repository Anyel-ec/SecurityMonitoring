import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import IconSearch from '../Icon/IconSearch';
import IconSun from '../Icon/IconSun';
import IconMoon from '../Icon/IconMoon';
import IconLaptop from '../Icon/IconLaptop';
import IconUser from '../Icon/IconUser';
import IconLogout from '../Icon/IconLogout';
import { useLogoutService } from '../../hooks/services/system/auth.service';
import { useGlobalContext } from '../../hooks/contexts/global.context';
import { hasRole } from '../../hooks/services/system/authUtils';

const Header = () => {
    const location = useLocation();
    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul = selector.closest('ul.sub-menu');
            if (ul) {
                let ele = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [location]);

    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state) => state.themeConfig);
    const dispatch = useDispatch();

    const [search, setSearch] = useState(false);

    const { t } = useTranslation();


    // Contexto global para obtener los datos del usuario
    const { globalVariables, loading: loading_user } = useGlobalContext();

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
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                        <Link to="/inicio" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.png" alt="logo" />
                            <span className="text-xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">Security Monitoring</span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>

                    <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
                            <button
                                type="button"
                                onClick={() => setSearch(!search)}
                                className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                            </button>
                        </div>
                        <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${themeConfig.theme === 'light' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('dark'));
                                    }}
                                >
                                    <IconSun />
                                </button>
                            ) : (
                                ''
                            )}
                            {themeConfig.theme === 'dark' && (
                                <button
                                    className={`${themeConfig.theme === 'dark' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('system'));
                                    }}
                                >
                                    <IconMoon />
                                </button>
                            )}
                            {themeConfig.theme === 'system' && (
                                <button
                                    className={`${themeConfig.theme === 'system' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('light'));
                                    }}
                                >
                                    <IconLaptop />
                                </button>
                            )}
                        </div>

                        <div className="dropdown shrink-0 flex">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={<img className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src="/assets/images/user-profile.jpg" alt="userProfile" />}
                            >
                                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img className="rounded-md w-10 h-10 object-cover" src="/assets/images/user-profile.jpg" alt="userProfile" />
                                            <div className="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 className="text-base">
                                                    {globalVariables.username}
                                                </h4>
                                                <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                    {globalVariables.email}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to="/perfil" className="dark:hover:text-white">
                                            <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            Perfil
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <button className="text-danger !py-3" onClick={handleLogout}>
                                            <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {/* horizontal menu */}
                <ul className="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-black dark:text-white-dark">

                    <li className="menu relative">
                        <ul className="nav-link">
                            <NavLink to="/inicio" className="flex items-center">
                                <i className="fa-solid fa-house"></i>
                                <span className="px-1">{t('Inicio')}</span>
                            </NavLink>
                        </ul>
                    </li>

                    <li className="menu relative">
                        <ul className="nav-link">
                            <NavLink to="/activacion" className="flex items-center">
                                <i className="fa-solid fa-square-check"></i>
                                <span className="px-1">{t('Activación de Alertas')}</span>
                            </NavLink>
                        </ul>
                    </li>

                    <li className="menu relative">
                        <ul className="nav-link">
                            <NavLink to="/alertas" className="flex items-center">
                                <i className="fa-solid fa-gears"></i>
                                <span className="px-1">{t('Modificar alertas')}</span>
                            </NavLink>
                        </ul>
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

                </ul>

            </div>
        </header>
    );
};

export default Header;
