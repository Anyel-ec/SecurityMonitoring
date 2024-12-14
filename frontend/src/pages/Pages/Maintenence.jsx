import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';

const Maintenence = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Maintenance'));
    });
    const isDark = useSelector((state) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
                <div className="relative">
                    <img
                        src={isDark ? '/assets/images/error/maintenence-dark.svg' : '/assets/images/error/maintenence-light.svg'}
                        alt="maintenence"
                        className="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-20 md:max-w-lg"
                    />
                    <div className="-mt-8 font-semibold dark:text-white">
                        <h2 className="mb-5 text-3xl font-bold text-primary md:text-5xl">Under Maintenance</h2>
                        <h4 className="mb-7 text-xl sm:text-2xl">Thank you for visiting us.</h4>
                        <p className="text-base">
                            We are currently working on making some improvements <br className="hidden sm:block" />
                            to give you better user experience. <br />
                            <br />
                            Please visit us again shortly.
                        </p>
                    </div>
                    <Link to="/" className="btn btn-gradient mx-auto !mt-7 w-max border-0 uppercase shadow-none">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Maintenence;
