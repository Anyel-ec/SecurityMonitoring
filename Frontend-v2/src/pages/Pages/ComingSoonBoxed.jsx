import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';

const ComingSoonBoxed = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Coming Soon Boxed'));
    });
    const [demo1, setDemo1] = useState({ days: null, hours: null, minutes: null, seconds: null });
    const [timer1, setTimer1] = useState(null);

    const setTimerDemo1 = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        const countDownDate = date.getTime();

        let updatedValue = {};
        setTimer1(
            setInterval(() => {
                const now = new Date().getTime();

                const distance = countDownDate - now;

                updatedValue.days = Math.floor(distance / (1000 * 60 * 60 * 24));
                updatedValue.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                updatedValue.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                updatedValue.seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setDemo1((demo1) => ({
                    ...demo1,
                    ...updatedValue,
                }));

                if (distance < 0) {
                    clearInterval(timer1);
                }
            }, 1000)
        );
    };

    useEffect(() => {
        setTimerDemo1();
        return () => {
            clearInterval(timer1);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigate = useNavigate();

    const submitForm = () => {
        navigate('/');
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 text-center dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="rounded-md bg-white/60 p-4 backdrop-blur-lg dark:bg-black/50 sm:p-6">
                        <div className="mx-auto mt-5 w-full max-w-[550px] md:mt-16">
                            <div className="mb-12">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Coming Soon</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">We will be here in a shortwhile.....</p>
                            </div>
                            <div className="mb-16 flex items-center justify-center gap-2 text-xl font-bold leading-none text-primary sm:text-2xl md:mb-24 md:gap-4 md:text-[50px]">
                                <div className="relative inline-flex h-12 w-14 items-center justify-center rounded-md bg-primary-light p-2 sm:h-16 sm:w-16 md:h-24 md:min-w-[120px]">
                                    <div className="absolute inset-1 flex flex-col gap-1">
                                        <span className="h-full w-full rounded-md bg-primary/[12%]"></span>
                                        <span className="h-full w-full rounded-md bg-white"></span>
                                    </div>
                                    <span className="relative">{demo1.days}</span>
                                </div>
                                <span>:</span>
                                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-light p-2 sm:h-16 sm:w-16 md:h-24 md:min-w-[96px]">
                                    <div className="absolute inset-1 flex flex-col gap-1">
                                        <span className="h-full w-full rounded-md bg-primary/[12%]"></span>
                                        <span className="h-full w-full rounded-md bg-white"></span>
                                    </div>
                                    <span className="relative">{demo1.hours}</span>
                                </div>
                                <span>:</span>
                                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-light p-2 sm:h-16 sm:w-16 md:h-24 md:min-w-[96px]">
                                    <div className="absolute inset-1 flex flex-col gap-1">
                                        <span className="h-full w-full rounded-md bg-primary/[12%]"></span>
                                        <span className="h-full w-full rounded-md bg-white"></span>
                                    </div>
                                    <span className="relative">{demo1.minutes}</span>
                                </div>
                                <span>:</span>
                                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-light p-2 sm:h-16 sm:w-16 md:h-24 md:min-w-[96px]">
                                    <div className="absolute inset-1 flex flex-col gap-1">
                                        <span className="h-full w-full rounded-md bg-primary/[12%]"></span>
                                        <span className="h-full w-full rounded-md bg-white"></span>
                                    </div>
                                    <span className="relative">{demo1.seconds}</span>
                                </div>
                            </div>
                            <div className="mb-20 md:mb-32">
                                <h2 className="text-lg font-bold uppercase dark:text-white sm:text-xl">Subscribe to get notified!</h2>
                                <div className="relative mb-10 mt-8">
                                    <input type="email" placeholder="mail@gmail.com" className="form-input mb-5 py-3.5 placeholder:text-base placeholder:text-white-dark sm:mb-0 sm:pe-32" />
                                    <button
                                        type="button"
                                        className="btn btn-gradient end-1.5 top-1/2 inline-flex border-0 px-4 py-1.5 text-base shadow-none sm:absolute sm:-translate-y-1/2"
                                        onClick={() => navigate('/')}
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <ul className="flex justify-center gap-3.5 text-white">
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconInstagram />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconFacebookCircle />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconTwitter fill={true} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconGoogle />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <p className="dark:text-white">© {new Date().getFullYear()}. VRISTO All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoonBoxed;
