import { Link } from 'react-router-dom';
import CodeHighlight from '../../components/Highlight';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
const Popovers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Popovers'));
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
                    <Link to="#" className="text-primary hover:underline">
                        Elements
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Popovers</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                <div className="panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap">
                    <div className="ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://www.npmjs.com/package/@tippyjs/react" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://www.npmjs.com/package/@tippyjs/react
                    </a>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    {/* Default */}
                    <div className="panel" id="default">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Default</h5>
                            <button
                                onClick={() => {
                                    toggleCode('code1');
                                }}
                                className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                            >
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="flex justify-center w-full gap-4">
                                <Tippy trigger="click" content="Popover using ANCHOR tag">
                                    <button type="button" className="btn bg-primary btn-primary">
                                        Link
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="Popover using BUTTON tag">
                                    <button type="button" className="btn btn-success">
                                        Button
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                        {codeArr.includes('code1') && (
                            <CodeHighlight>
                                <pre>{`import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

<Tippy trigger="click" content="Popover using ANCHOR tag">
    <button type="button" className="btn bg-primary btn-primary">
        Link
    </button>
</Tippy>

<Tippy trigger="click" content="Popover using BUTTON tag">
    <button type="button" className="btn btn-success">
        Button
    </button>
</Tippy>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Placement */}
                    <div className="panel" id="directions">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Placement</h5>
                            <button
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
                        <div className="mb-5">
                            <div className="flex flex-wrap justify-center gap-4 w-full">
                                <Tippy trigger="click" content="Popover on top" placement="top">
                                    <button type="button" className="btn btn-info">
                                        Popover on top
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="Popover on left" placement="left">
                                    <button type="button" className="btn btn-secondary">
                                        Popover on left
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="Popover on right" placement="right">
                                    <button type="button" className="btn btn-danger">
                                        Popover on right
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="Popover on bottom" placement="bottom">
                                    <button type="button" className="btn btn-warning">
                                        Popover on bottom
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                        {codeArr.includes('code2') && (
                            <CodeHighlight>
                                <pre>{`import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

<Tippy trigger="click" content="Popover on top" placement="top">
    <button type="button" className="btn btn-info">
        Popover on top
    </button>
</Tippy>

<Tippy trigger="click" content="Popover on left" placement="left">
    <button type="button" className="btn btn-secondary">
        Popover on left
    </button>
</Tippy>

<Tippy trigger="click" content="Popover on right" placement="right">
    <button type="button" className="btn btn-danger">
        Popover on right
    </button>
</Tippy>

<Tippy trigger="click" content="Popover on bottom" placement="bottom">
    <button type="button" className="btn btn-warning">
        Popover on bottom
    </button>
</Tippy>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Dismissible popover */}
                    <div className="panel lg:row-start-1 lg:col-start-2" id="dismissible">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Dismissible popover</h5>
                            <button
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
                        <div className="mb-5">
                            <div className="flex justify-center gap-4 w-full">
                                <Tippy trigger="click" content="Popover on left" placement="left">
                                    <button type="button" data-dismissable="true" className="btn btn-dark">
                                        Popover on left
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                        {codeArr.includes('code3') && (
                            <CodeHighlight>
                                <pre>{`import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

<Tippy trigger="click" content="Popover on left" placement="left">
    <button type="button" data-dismissable="true" className="btn btn-dark">
        Popover on left
    </button>
</Tippy>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Options */}
                    <div className="panel" id="options">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Options</h5>
                            <button
                                className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                                onClick={() => {
                                    toggleCode('code4');
                                }}
                            >
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-wrap justify-center gap-4 w-full">
                                <Tippy trigger="mouseenter focus" content="On Hover">
                                    <button type="button" data-trigger="mouseenter" className="btn btn-primary">
                                        On Hover
                                    </button>
                                </Tippy>
                                <Tippy trigger="focusin" content="On Focus">
                                    <button type="button" data-trigger="focus" className="btn btn-secondary">
                                        On Focus
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="Delay 1s" delay={1000}>
                                    <button type="button" data-delay="1000" className="btn btn-info">
                                        Delay
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="Disabled Animation">
                                    <button type="button" data-animation="false" className="btn btn-dark">
                                        Disabled Animation
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                        {codeArr.includes('code4') && (
                            <CodeHighlight>
                                <pre>{`import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

<Tippy trigger="mouseenter focus" content="On Hover">
    <button type="button" data-trigger="mouseenter" className="btn btn-primary">
        On Hover
    </button>
</Tippy>

<Tippy trigger="focusin" content="On Focus">
    <button type="button" data-trigger="focus" className="btn btn-secondary">
        On Focus
    </button>
</Tippy>

<Tippy trigger="click" content="Delay 1s" delay={1000}>
    <button type="button" data-delay="1000" className="btn btn-info">
        Delay
    </button>
</Tippy>

<Tippy trigger="click" content="Disabled Animation">
    <button type="button" data-animation="false" className="btn btn-dark">
        Disabled Animation
    </button>
</Tippy>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Colors */}
                    <div className="panel lg:col-span-2" id="colors">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Colors</h5>
                            <button
                                className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                                onClick={() => {
                                    toggleCode('code5');
                                }}
                            >
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-wrap justify-center gap-4 w-full">
                                <Tippy trigger="click" content="Primary" theme="primary">
                                    <button type="button" className="btn btn-primary">
                                        Primary
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="Success" theme="success">
                                    <button type="button" className="btn btn-success">
                                        Success
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="info" theme="info">
                                    <button type="button" className="btn btn-info">
                                        Info
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="danger" theme="danger">
                                    <button type="button" className="btn btn-danger">
                                        Danger
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="warning" theme="warning">
                                    <button type="button" className="btn btn-warning">
                                        Warning
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="secondary" theme="secondary">
                                    <button type="button" className="btn btn-secondary">
                                        Secondary
                                    </button>
                                </Tippy>
                                <Tippy trigger="click" content="dark" theme="dark">
                                    <button type="button" className="btn btn-dark">
                                        Dark
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                        {codeArr.includes('code5') && (
                            <CodeHighlight>
                                <pre>{`import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

<Tippy trigger="click" content="Primary" theme="primary">
    <button type="button" className="btn btn-primary">
        Primary
    </button>
</Tippy>

<Tippy trigger="click" content="Success" theme="success">
    <button type="button" className="btn btn-success">
        Success
    </button>
</Tippy>

<Tippy trigger="click" content="info" theme="info">
    <button type="button" className="btn btn-info">
        Info
    </button>
</Tippy>

<Tippy trigger="click" content="danger" theme="danger">
    <button type="button" className="btn btn-danger">
        Danger
    </button>
</Tippy>

<Tippy trigger="click" content="warning" theme="warning">
    <button type="button" className="btn btn-warning">
        Warning
    </button>
</Tippy>

<Tippy trigger="click" content="secondary" theme="secondary">
    <button type="button" className="btn btn-secondary">
        Secondary
    </button>
</Tippy>

<Tippy trigger="click" content="dark" theme="dark">
    <button type="button" className="btn btn-dark">
        Dark
    </button>
</Tippy>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popovers;
