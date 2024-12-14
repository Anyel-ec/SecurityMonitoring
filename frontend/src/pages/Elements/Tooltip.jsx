import { Link } from 'react-router-dom';
import CodeHighlight from '../../components/Highlight';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';

const Tooltip = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tooltips'));
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
                                <Tippy content="Popover using ANCHOR tag">
                                    <button type="button" className="btn bg-primary btn-primary">
                                        Link
                                    </button>
                                </Tippy>
                                <Tippy content="Popover using BUTTON tag">
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

<Tippy content="Popover using ANCHOR tag">
    <button type="button" className="btn bg-primary btn-primary">
        Link
    </button>
</Tippy>

<Tippy content="Popover using BUTTON tag">
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
                                <Tippy content="Popover on top" placement="top">
                                    <button type="button" className="btn btn-info">
                                        Tooltip on top
                                    </button>
                                </Tippy>
                                <Tippy content="Popover on left" placement="left">
                                    <button type="button" className="btn btn-secondary">
                                        Tooltip on left
                                    </button>
                                </Tippy>
                                <Tippy content="Popover on bottom" placement="bottom">
                                    <button type="button" className="btn btn-warning">
                                        Tooltip on bottom
                                    </button>
                                </Tippy>
                                <Tippy content="Popover on right" placement="right">
                                    <button type="button" className="btn btn-danger">
                                        Tooltip on right
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                        {codeArr.includes('code2') && (
                            <CodeHighlight>
                                <pre>{`import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

<Tippy content="Popover on top" placement="top">
    <button type="button" className="btn btn-info">
        Tooltip on top
    </button>
</Tippy>

<Tippy content="Popover on left" placement="left">
    <button type="button" className="btn btn-secondary">
        Tooltip on left
    </button>
</Tippy>

<Tippy content="Popover on right" placement="right">
    <button type="button" className="btn btn-danger">
        Tooltip on right
    </button>
</Tippy>

<Tippy content="Popover on bottom" placement="bottom">
    <button type="button" className="btn btn-warning">
        Tooltip on bottom
    </button>
</Tippy>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                    {/* Html popover */}
                    <div className="panel lg:row-start-1 lg:col-start-2" id="dismissible">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">HTML</h5>
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
                                <Tippy content={<strong>Bolded content</strong>}>
                                    <button type="button" data-dismissable="true" className="btn btn-dark">
                                        Tooltip on HTML
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                        {codeArr.includes('code3') && (
                            <CodeHighlight>
                                <pre>{`import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

<Tippy content="Bolded content">
    <button type="button" data-dismissable="true" className="btn btn-dark">
        Tooltip on HTML
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
                                <Tippy trigger="click" content="On Click">
                                    <button type="button" data-trigger="mouseenter" className="btn btn-primary">
                                        On Click
                                    </button>
                                </Tippy>
                                <Tippy trigger="focusin" content="On Focus">
                                    <button type="button" data-trigger="focus" className="btn btn-secondary">
                                        On Focus
                                    </button>
                                </Tippy>
                                <Tippy content="Delay 1s" delay={1000}>
                                    <button type="button" data-delay="1000" className="btn btn-info">
                                        Delay
                                    </button>
                                </Tippy>
                                <Tippy content="Disabled Animation">
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

<Tippy trigger="click" content="On Click">
    <button type="button" data-trigger="mouseenter" className="btn btn-primary">
        On Click
    </button>
</Tippy>

<Tippy trigger="focusin" content="On Focus">
    <button type="button" data-trigger="focus" className="btn btn-secondary">
        On Focus
    </button>
</Tippy>

<Tippy content="Delay 1s" delay={1000}>
    <button type="button" data-delay="1000" className="btn btn-info">
        Delay
    </button>
</Tippy>

<Tippy content="Disabled Animation">
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
                                <Tippy content="Primary" theme="primary">
                                    <button type="button" className="btn btn-primary">
                                        Primary
                                    </button>
                                </Tippy>
                                <Tippy content="Success" theme="success">
                                    <button type="button" className="btn btn-success">
                                        Success
                                    </button>
                                </Tippy>
                                <Tippy content="info" theme="info">
                                    <button type="button" className="btn btn-info">
                                        Info
                                    </button>
                                </Tippy>
                                <Tippy content="danger" theme="danger">
                                    <button type="button" className="btn btn-danger">
                                        Danger
                                    </button>
                                </Tippy>
                                <Tippy content="warning" theme="warning">
                                    <button type="button" className="btn btn-warning">
                                        Warning
                                    </button>
                                </Tippy>
                                <Tippy content="secondary" theme="secondary">
                                    <button type="button" className="btn btn-secondary">
                                        Secondary
                                    </button>
                                </Tippy>
                                <Tippy content="dark" theme="dark">
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

<Tippy content="Primary" theme="primary">
    <button type="button" className="btn btn-primary">
        Primary
    </button>
</Tippy>

<Tippy content="Success" theme="success">
    <button type="button" className="btn btn-success">
        Success
    </button>
</Tippy>

<Tippy content="info" theme="info">
    <button type="button" className="btn btn-info">
        Info
    </button>
</Tippy>

<Tippy content="danger" theme="danger">
    <button type="button" className="btn btn-danger">
        Danger
    </button>
</Tippy>

<Tippy content="warning" theme="warning">
    <button type="button" className="btn btn-warning">
        Warning
    </button>
</Tippy>

<Tippy content="secondary" theme="secondary">
    <button type="button" className="btn btn-secondary">
        Secondary
    </button>
</Tippy>

<Tippy content="dark" theme="dark">
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

export default Tooltip;
