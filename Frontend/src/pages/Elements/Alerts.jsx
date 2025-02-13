import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconX from '../../components/Icon/IconX';
import IconInfoTriangle from '../../components/Icon/IconInfoTriangle';
import IconSettings from '../../components/Icon/IconSettings';
import IconBellBing from '../../components/Icon/IconBellBing';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';

const Alerts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Alerts'));
    });

    const [codeArr, setCodeArr] = useState([]);
    const toggleCode = (name) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/elements/alerts" className="text-primary hover:underline">
                        Elements
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Alerts</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                {/* Default Alerts  */}
                <div className="panel" id="default">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Default Alerts</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-5 mb-5">
                        <div className="flex items-center p-3.5 rounded text-primary bg-primary-light dark:bg-primary-dark-light">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Primary!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center p-3.5 rounded text-secondary bg-secondary-light dark:bg-secondary-dark-light">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Secondary!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center p-3.5 rounded text-success bg-success-light dark:bg-success-dark-light">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Success!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center p-3.5 rounded text-warning bg-warning-light dark:bg-warning-dark-light">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Danger!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center p-3.5 rounded text-info bg-info-light dark:bg-info-dark-light">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Info!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre>{`<div className="flex items-center p-3.5 rounded text-primary bg-primary-light dark:bg-primary-dark-light">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Primary!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
    <svg>... </svg>
    </button>
</div>

<div className="flex items-center p-3.5 rounded text-secondary bg-secondary-light dark:bg-secondary-dark-light">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Secondary!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
    <svg>... </svg>
    </button>
</div>

<div className="flex items-center p-3.5 rounded text-success bg-success-light dark:bg-success-dark-light">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Success!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
    <svg>... </svg>
    </button>
</div>

<div className="flex items-center p-3.5 rounded text-warning bg-warning-light dark:bg-warning-dark-light">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
    <svg>... </svg>
    </button>
</div>

<div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Danger!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
    <svg>... </svg>
    </button>
</div>

<div className="flex items-center p-3.5 rounded text-info bg-info-light dark:bg-info-dark-light">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Info!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
    <svg>... </svg>
    </button>
</div>
                                `}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Outline Alerts */}
                <div className="panel" id="outline">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Outline Alerts</h5>
                        <button
                            type="button"
                            onClick={() => {
                                toggleCode('code2');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-5 mb-5">
                        <div className="flex items-center p-3.5 rounded text-white-dark border border-primary">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-2 rtl:ml-2">Primary!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center border p-3.5 rounded text-white-dark border-danger">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-2 rtl:ml-2">Danger!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre>
                                {`<div className="flex items-center p-3.5 rounded text-white-dark border border-primary">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-2 rtl:ml-2">Primary!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
        <svg>...</svg>
    </button>
</div>
<div className="flex items-center border p-3.5 rounded text-white-dark border-danger">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-2 rtl:ml-2">Danger!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
        <svg>...</svg>
    </button>
</div>
                                `}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Solid Alerts */}
                <div className="panel" id="solid">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Solid Alerts</h5>
                        <button
                            type="button"
                            onClick={() => {
                                toggleCode('code3');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-5 mb-5">
                        <div className="flex items-center p-3.5 rounded text-white bg-primary">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center p-3.5 rounded text-white bg-warning">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Info!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    {codeArr.includes('code3') && (
                        <CodeHighlight>
                            <pre>
                                {`<div className="flex items-center p-3.5 rounded text-white bg-primary">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
        <svg>...</svg>
    </button>
</div>
<div className="flex items-center p-3.5 rounded text-white bg-warning">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Info!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
        <svg>...</svg>
    </button>
</div>
                                   `}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Alerts with icon */}
                <div className="panel" id="icon">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Alerts with icon</h5>
                        <button
                            type="button"
                            onClick={() => {
                                toggleCode('code4');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-5 mb-5">
                        <div className="relative flex items-center border p-3.5 rounded text-success bg-success-light border-success ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-success-dark-light">
                            <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                                <IconInfoTriangle />
                            </span>
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="relative flex items-center border p-3.5 rounded text-dark bg-dark-light border-dark ltr:border-r-[64px] rtl:border-l-[64px] dark:bg-dark-dark-light dark:text-white-light dark:border-white-light/20">
                            <span className="absolute ltr:-right-11 rtl:-left-11 inset-y-0 text-white w-6 h-6 m-auto">
                                <IconSettings />
                            </span>
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    {codeArr.includes('code4') && (
                        <CodeHighlight>
                            <pre>
                                {`<div className="relative flex items-center border p-3.5 rounded text-success bg-success-light border-success ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-success-dark-light">
    <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
        <svg>...</svg>
    </span>
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
        <svg>...</svg>
    </button>
</div>
<div className="relative flex items-center border p-3.5 rounded text-dark bg-dark-light border-dark ltr:border-r-[64px] rtl:border-l-[64px] dark:bg-dark-dark-light dark:text-white-light dark:border-white-light/20">
    <span className="absolute ltr:-right-11 rtl:-left-11 inset-y-0 text-white w-6 h-6 m-auto">
        <svg>...</svg>
    </span>
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
        <svg>...</svg>
    </button>
</div>
                                   `}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Arrowed Alerts */}
                <div className="panel" id="arrowed">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Arrowed Alerts</h5>
                        <button
                            type="button"
                            onClick={() => {
                                toggleCode('code5');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-5 mb-5">
                        <div className="relative flex items-center border p-3.5 rounded before:absolute before:top-1/2 ltr:before:left-0 rtl:before:right-0 rtl:before:rotate-180 before:-mt-2 before:border-l-8 before:border-t-8 before:border-b-8 before:border-t-transparent before:border-b-transparent before:border-l-inherit text-primary bg-primary-light !border-primary ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-primary-dark-light">
                            <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                                <IconBellBing className="w-6 h-6" />
                            </span>
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="relative flex items-center border p-3.5 rounded before:inline-block before:absolute before:top-1/2 ltr:before:right-0 rtl:before:left-0 rtl:before:rotate-180 before:-mt-2 before:border-r-8 before:border-t-8 before:border-b-8 before:border-t-transparent before:border-b-transparent before:border-r-inherit text-danger bg-danger-light border-danger ltr:border-r-[64px] rtl:border-l-[64px] dark:bg-danger-dark-light">
                            <span className="absolute ltr:-right-11 rtl:-left-11 inset-y-0 text-white w-6 h-6 m-auto">
                                <IconInfoCircle />
                            </span>
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    {codeArr.includes('code5') && (
                        <CodeHighlight>
                            <pre>
                                {`<div className="relative flex items-center border p-3.5 rounded before:absolute before:top-1/2 ltr:before:left-0 rtl:before:right-0 rtl:before:rotate-180 before:-mt-2 before:border-l-8 before:border-t-8 before:border-b-8 before:border-t-transparent before:border-b-transparent before:border-l-inherit text-primary bg-primary-light !border-primary ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-primary-dark-light">
    <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
        <svg>...</svg>
    </span>
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
        <svg>...</svg>
    </button>
</div>
<div className="relative flex items-center border p-3.5 rounded before:inline-block before:absolute before:top-1/2 ltr:before:right-0 rtl:before:left-0 rtl:before:rotate-180 before:-mt-2 before:border-r-8 before:border-t-8 before:border-b-8 before:border-t-transparent before:border-b-transparent before:border-r-inherit text-danger bg-danger-light border-danger ltr:border-r-[64px] rtl:border-l-[64px] dark:bg-danger-dark-light">
    <span className="absolute ltr:-right-11 rtl:-left-11 inset-y-0 text-white w-6 h-6 m-auto">
        <svg>...</svg>
    </span>
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
        <svg>...</svg>
    </button>
</div>
                                   `}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Custom Alerts */}
                <div className="panel" id="custom">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Custom Alerts</h5>
                        <button
                            type="button"
                            onClick={() => {
                                toggleCode('code6');
                            }}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-5 mb-5">
                        <div className="flex items-center p-3.5 rounded text-white bg-info">
                            <span className="text-white w-6 h-6 ltr:mr-4 rtl:ml-4">
                                <IconBellBing className="w-6 h-6" />
                            </span>
                            <span>
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="btn btn-sm bg-white text-black ltr:ml-auto rtl:mr-auto">
                                Accept
                            </button>
                            <button type="button" className="ltr:ml-4 rtl:mr-4">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center p-3.5 rounded text-white bg-gradient-to-r from-[#BD194D] to-[#004fe6]">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center p-3.5 rounded text-white bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url("/assets/images/menu-heade.jpg")` }}>
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    {codeArr.includes('code6') && (
                        <CodeHighlight>
                            <pre>{`<div className="flex items-center p-3.5 rounded text-white bg-info">
    <span className="text-white w-6 h-6 ltr:mr-4 rtl:ml-4">
        <svg>...</svg>
    </span>
    <span>
        <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="btn btn-sm bg-white text-black ltr:ml-auto rtl:mr-auto">
        Accept
    </button>
    <button type="button" className="ltr:ml-4 rtl:mr-4">
        <svg>...</svg>
    </button>
</div>

<div className="flex items-center p-3.5 rounded text-white bg-gradient-to-r from-[#BD194D] to-[#004fe6]">
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
        <svg>...</svg>
    </button>
</div>

<div className="flex items-center p-3.5 rounded text-white bg-no-repeat bg-center bg-cover" style={{ backgroundImage: \`url("/assets/images/menu-heade.jpg")\`}}>
    <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Lorem Ipsum is simply dummy text of the printing.
    </span>
    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
        <svg>...</svg>
    </button>
</div>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Alerts;
