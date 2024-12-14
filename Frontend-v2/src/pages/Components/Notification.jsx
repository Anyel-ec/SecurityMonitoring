import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';

const Notification = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Notifications'));
    });
    const [codeArr, setCodeArr] = useState([]);

    const toggleCode = (name) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const MySwal = withReactContent(Swal);

    const showMessage = () => {
        MySwal.fire({
            title: 'Hello, world! This is a toast message.',
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const showMessage1 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: isRtl ? 'top-end' : 'top-start',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };
    const showMessage2 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const showMessage3 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: isRtl ? 'top-start' : 'top-end',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const showMessage4 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: isRtl ? 'bottom-end' : 'bottom-start',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const showMessage5 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const showMessage6 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: isRtl ? 'bottom-start' : 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const showMessage7 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: false,
        });
    };

    const showMessage8 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
        });
    };

    const clickCallable = () => {
        Swal.fire({
            toast: true,
            position: 'bottom-start',
            text: 'Custom callback when action button is clicked.',
            showCloseButton: true,
            showConfirmButton: false,
        }).then((result) => {
            Swal.fire({
                toast: true,
                position: 'bottom-start',
                text: 'Thanks for clicking the Dismiss button!',
                showCloseButton: true,
                showConfirmButton: false,
            });
        });
    };

    const coloredToast = (color) => {
        const toast = Swal.mixin({
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            customClass: {
                popup: `color-${color}`,
            },
        });
        toast.fire({
            title: 'Example notification text.',
        });
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
                    <span>Notifications</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                <div className="panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap">
                    <div className="ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://www.npmjs.com/package/sweetalert2" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://www.npmjs.com/package/sweetalert2
                    </a>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    {/* basic */}
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
                            <div className="flex items-center justify-center">
                                <button type="button" className="btn btn-primary" onClick={showMessage}>
                                    Open Toast
                                </button>
                            </div>
                        </div>
                        {codeArr.includes('code1') && (
                            <CodeHighlight>
                                <pre className="language-typescript">
                                    {`import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const showMessage = () => {
    MySwal.fire({
        title: 'Hello, world! This is a toast message.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
    });
};
<div className="mb-5">
    <div className="flex items-center justify-center">
        <button type="button" className="btn btn-primary" onClick={showMessage}>
            Open Toast
        </button>
    </div>
</div>`}
                                </pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Position */}
                    <div className="panel lg:row-span-2">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Position</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <h6 className="font-semibold text-base dark:text-white-light mb-3 text-center">Top Position</h6>
                            <div className="flex items-center justify-center mb-10 gap-2">
                                <button type="button" className="btn btn-success" onClick={showMessage1}>
                                    Top Left
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={showMessage2}>
                                    Top Center
                                </button>
                                <button type="button" className="btn btn-info" onClick={showMessage3}>
                                    Top Right
                                </button>
                            </div>
                            <h6 className="font-semibold text-base dark:text-white-light mb-3 text-center">Bottom Position</h6>
                            <div className="flex items-center justify-center gap-2">
                                <button type="button" className="btn btn-dark" onClick={showMessage4}>
                                    Bottom Left
                                </button>
                                <button type="button" className="btn btn-primary" onClick={showMessage5}>
                                    Bottom Center
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={showMessage6}>
                                    Bottom Right
                                </button>
                            </div>
                        </div>
                        {codeArr.includes('code2') && (
                            <CodeHighlight>
                                <pre className="language-typescript">
                                    {`import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

    const showMessage1 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: isRtl ? 'top-end' : 'top-start',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };
    const showMessage2 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const showMessage3 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: isRtl ? 'top-start' : 'top-end',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const showMessage4 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: isRtl ? 'bottom-end' : 'bottom-start',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const showMessage5 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const showMessage6 = () => {
        MySwal.fire({
            title: 'Example notification text.',
            toast: true,
            position: isRtl ? 'bottom-start' : 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

<div className="mb-5">
    <h6 className="font-semibold text-base dark:text-white-light mb-3 text-center">Top Position</h6>
    <div className="flex items-center justify-center mb-10 gap-2">
        <button type="button" className="btn btn-success" onClick={showMessage1}>
            Top Left
        </button>
        <button type="button" className="btn btn-secondary" onClick={showMessage2}>
            Top Center
        </button>
        <button type="button" className="btn btn-info" onClick={showMessage3}>
            Top Right
        </button>
    </div>
    <h6 className="font-semibold text-base dark:text-white-light mb-3 text-center">Bottom Position</h6>
    <div className="flex items-center justify-center gap-2">
        <button type="button" className="btn btn-dark" onClick={showMessage4}>
            Bottom Left
        </button>
        <button type="button" className="btn btn-primary" onClick={showMessage5}>
            Bottom Center
        </button>
        <button type="button" className="btn btn-secondary" onClick={showMessage6}>
            Bottom Right
        </button>
    </div>
</div>`}
                                </pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* No Action */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">No Action</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="flex items-center justify-center">
                                <button type="button" className="btn btn-success" onClick={showMessage7}>
                                    No Action
                                </button>
                            </div>
                        </div>
                        {codeArr.includes('code3') && (
                            <CodeHighlight>
                                <pre className="language-typescript">
                                    {`import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const showMessage7 = () => {
    MySwal.fire({
        title: 'Example notification text.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: false,
    });
};

<div className="mb-5">
    <div className="flex items-center justify-center">
        <button type="button" className="btn btn-success" onClick={showMessage7}>
            No Action
        </button>
    </div>
</div>`}
                                </pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/*  Click Callback */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Click Callback</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="flex items-center justify-center">
                                <button type="button" className="btn btn-info" onClick={clickCallable}>
                                    Click Callback
                                </button>
                            </div>
                        </div>
                        {codeArr.includes('code4') && (
                            <CodeHighlight>
                                <pre className="language-typescript">
                                    {`import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const clickCallable = () => {
    Swal.fire({
        toast: true,
        position: 'bottom-start',
        text: 'Custom callback when action button is clicked.',
        showCloseButton: true,
        showConfirmButton: false,
    }).then((result) => {
        Swal.fire({
            toast: true,
            position: 'bottom-start',
            text: 'Thanks for clicking the Dismiss button!',
            showCloseButton: true,
            showConfirmButton: false,
        });
    });
};

<div className="mb-5">
    <div className="flex items-center justify-center">
        <button type="button" className="btn btn-info" onClick={clickCallable}>
            Click Callback
        </button>
    </div>
</div>`}
                                </pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Duration */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Duration</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code5')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="flex items-center justify-center">
                                <button type="button" className="btn btn-dark" onClick={showMessage8}>
                                    Duration
                                </button>
                            </div>
                        </div>
                        {codeArr.includes('code5') && (
                            <CodeHighlight>
                                <pre className="language-typescript">
                                    {`import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const showMessage8 = () => {
    MySwal.fire({
        title: 'Example notification text.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 5000,
        showCloseButton: true,
    });
};

<div className="mb-5">
    <div className="flex items-center justify-center">
        <button type="button" className="btn btn-dark" onClick={showMessage8}>
            Duration
        </button>
    </div>
</div>`}
                                </pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Background Color */}
                    <div className="panel lg:col-span-2">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Background Color</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code6')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="grid grid-cols-2 sm:grid-cols-1 sm:flex items-center justify-center gap-2 colored-toast">
                                <div>
                                    <button type="button" className="btn btn-primary" onClick={() => coloredToast('primary')}>
                                        Primary
                                    </button>
                                    <div id="primary-toast"></div>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-secondary" onClick={() => coloredToast('secondary')}>
                                        Secondary
                                    </button>
                                    <div id="secondary-toast"></div>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-success" onClick={() => coloredToast('success')}>
                                        Success
                                    </button>
                                    <div id="success-toast"></div>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-danger" onClick={() => coloredToast('danger')}>
                                        Danger
                                    </button>
                                    <div id="danger-toast"></div>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-warning" onClick={() => coloredToast('warning')}>
                                        Warning
                                    </button>
                                    <div id="warning-toast"></div>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-info" onClick={() => coloredToast('info')}>
                                        Info
                                    </button>
                                    <div id="info-toast"></div>
                                </div>
                            </div>
                        </div>
                        {codeArr.includes('code6') && (
                            <CodeHighlight>
                                <pre className="language-typescript">
                                    {`import Swal from 'sweetalert2';

const coloredToast = (color) => {
    const toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        customClass: {
            popup: \`color-\${color}\`,
        },
    });
    toast.fire({
        title: 'Example notification text.',
    });
};

<div className="mb-5">
    <div className="grid grid-cols-2 sm:grid-cols-1 sm:flex items-center justify-center gap-2 colored-toast">
        <div>
            <button type="button" className="btn btn-primary" onClick={() => coloredToast('primary')}>
                Primary
            </button>
            <div id="primary-toast"></div>
        </div>
        <div>
            <button type="button" className="btn btn-secondary" onClick={() => coloredToast('secondary')}>
                Secondary
            </button>
            <div id="secondary-toast"></div>
        </div>
        <div>
            <button type="button" className="btn btn-success" onClick={() => coloredToast('success')}>
                Success
            </button>
            <div id="success-toast"></div>
        </div>
        <div>
            <button type="button" className="btn btn-danger" onClick={() => coloredToast('danger')}>
                Danger
            </button>
            <div id="danger-toast"></div>
        </div>
        <div>
            <button type="button" className="btn btn-warning" onClick={() => coloredToast('warning')}>
                Warning
            </button>
            <div id="warning-toast"></div>
        </div>
        <div>
            <button type="button" className="btn btn-info" onClick={() => coloredToast('info')}>
                Info
            </button>
            <div id="info-toast"></div>
        </div>
    </div>
</div>`}
                                </pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
