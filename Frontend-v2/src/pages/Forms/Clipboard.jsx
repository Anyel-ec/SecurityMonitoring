import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconCopy from '../../components/Icon/IconCopy';
import IconPencil from '../../components/Icon/IconPencil';

const Clipboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Clipboard'));
    });
    const [codeArr, setCodeArr] = useState([]);

    const toggleCode = (name) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const [message1, setMessage1] = useState('http://www.admin-dashboard.com');
    const [message2, setMessage2] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit...');
    const message3 = '22991';
    const message4 = 'http://www.admin-dashboard.com/code';

    const showMessage = (message = '') => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: message || 'Copied successfully.',
            padding: '10px 20px',
        });
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Clipboard</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                <div className="panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap">
                    <div className="ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://www.npmjs.com/package/react-copy-to-clipboard" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://www.npmjs.com/package/react-copy-to-clipboard
                    </a>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    {/* Copy from input */}
                    <div className="panel" id="copy_from_input">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Copy from input</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>

                        <div className="mb-5">
                            <div className="bg-[#f1f2f3] p-5 rounded dark:bg-[#060818]">
                                <form>
                                    <input type="text" value={message1} className="form-input" onChange={(e) => setMessage1(e.target.value)} />
                                    <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse mt-5">
                                        <CopyToClipboard
                                            text={message1}
                                            onCopy={(text, result) => {
                                                if (result) {
                                                    showMessage();
                                                }
                                            }}
                                        >
                                            <button type="button" className="btn btn-primary">
                                                <IconCopy className="ltr:mr-2 rtl:ml-2" />
                                                Copy from Input
                                            </button>
                                        </CopyToClipboard>
                                        <CopyToClipboard
                                            text={message1}
                                            onCopy={(text, result) => {
                                                if (result) {
                                                    showMessage('Cut successfully.');
                                                }
                                            }}
                                        >
                                            <button type="button" className="btn btn-dark" value={message1} onClick={() => setMessage1('')}>
                                                <IconPencil className="ltr:mr-2 rtl:ml-2" />
                                                Cut from Input
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {codeArr.includes('code1') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const [message1, setMessage1] = useState('http://www.admin-dashboard.com');

<form>
    <input type="text" value={message1} className="form-input" onChange={(e) => setMessage1(e.target.value)} />
    <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse mt-5">
        <CopyToClipboard
            text={message1}
            onCopy={(text, result) => {
                if (result) {
                    showMessage();
                }
            }}
        >
            <button type="button" className="btn btn-primary">
                <svg>...</svg>
                Copy from Input
            </button>
        </CopyToClipboard>
        <CopyToClipboard
            text={message1}
            onCopy={(text, result) => {
                if (result) {
                    showMessage('Cut successfully.');
                }
            }}
        >
            <button type="button" className="btn btn-dark" value={message1} onClick={() => setMessage1('')}>
                <svg>...</svg>
                Cut from Input
            </button>
        </CopyToClipboard>
    </div>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Copy form Textarea */}
                    <div className="panel" id="copy_from_textarea">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Copy form Textarea</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="bg-[#f1f2f3] p-5 rounded dark:bg-[#060818]">
                                <form>
                                    <textarea rows={3} wrap="soft" className="form-textarea" value={message2} id="message2" onChange={(e) => setMessage2(e.target.value)}></textarea>
                                    <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse mt-5">
                                        <CopyToClipboard
                                            text={message2}
                                            onCopy={(text, result) => {
                                                if (result) {
                                                    showMessage();
                                                }
                                            }}
                                        >
                                            <button type="button" className="btn btn-primary" data-clipboard-target="#message2">
                                                <IconCopy className="ltr:mr-2 rtl:ml-2" />
                                                Copy from Input
                                            </button>
                                        </CopyToClipboard>
                                        <CopyToClipboard
                                            text={message2}
                                            onCopy={(text, result) => {
                                                if (result) {
                                                    showMessage('Cut successfully.');
                                                }
                                            }}
                                        >
                                            <button type="button" className="btn btn-dark " onClick={() => setMessage2('')}>
                                                <IconPencil className="ltr:mr-2 rtl:ml-2" />
                                                Cut from Input
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {codeArr.includes('code2') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const [message2, setMessage2] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit...');

<form>
    <textarea rows={3} wrap="soft" className="form-textarea" value={message2} id="message2" onChange={(e) => setMessage2(e.target.value)}></textarea>
    <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse mt-5">
        <CopyToClipboard
            text={message2}
            onCopy={(text, result) => {
                if (result) {
                    showMessage();
                }
            }}
        >
            <button type="button" className="btn btn-primary" data-clipboard-target="#message2">
                <svg>...</svg>
                Copy from Input
            </button>
        </CopyToClipboard>
        <CopyToClipboard
            text={message2}
            onCopy={(text, result) => {
                if (result) {
                    showMessage('Cut successfully.');
                }
            }}
        >
            <button type="button" className="btn btn-dark " onClick={() => setMessage2('')}>
                <svg>...</svg>
                Cut from Input
            </button>
        </CopyToClipboard>
    </div>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* <!-- Copy Text from Paragraph --> */}
                    <div className="panel" id="copy_from_paragraph">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Copy Text from Paragraph</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="bg-[#f1f2f3] p-5 rounded dark:bg-[#060818]">
                                <form>
                                    <p className="mb-3 font-semibold">
                                        Here is your OTP
                                        <span className="text-2xl" id="copyOTP" defaultValue={message3}>
                                            22991
                                        </span>
                                        .
                                    </p>
                                    <p className="font-semibold">Please do not share it to anyone</p>
                                    <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse mt-5">
                                        <CopyToClipboard
                                            text={message3}
                                            onCopy={(text, result) => {
                                                if (result) {
                                                    showMessage();
                                                }
                                            }}
                                        >
                                            <button type="button" className="btn btn-primary" data-clipboard-target="#copyOTP">
                                                <IconCopy className="ltr:mr-2 rtl:ml-2" />
                                                Copy from Paragraph
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {codeArr.includes('code3') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const message3 = '22991';

<form>
    <p className="mb-3 font-semibold">
        Here is your OTP
        <span className="text-2xl" id="copyOTP" defaultValue={message3}>
            22991
        </span>
        .
    </p>
    <p className="font-semibold">Please do not share it to anyone</p>
    <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse mt-5">
        <CopyToClipboard
            text={message3}
            onCopy={(text, result) => {
                if (result) {
                    showMessage();
                }
            }}
        >
            <button type="button" className="btn btn-primary" data-clipboard-target="#copyOTP">
                <svg>...</svg>
                Copy from Paragraph
            </button>
        </CopyToClipboard>
    </div>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Advanced */}
                    <div className="panel" id="advanced">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Copy Hidden Text (Advanced)</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <div className="bg-[#f1f2f3] p-5 rounded dark:bg-[#060818]">
                                <form>
                                    <p className="mb-3 font-semibold">
                                        <span> {'Link -> '} </span>
                                        <span id="copyLink"> http://www.admin-dashboard.com/code</span>
                                    </p>
                                    <span className="absolute opacity-0" id="copyHiddenCode">
                                        2291
                                    </span>
                                    <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse mt-5">
                                        <CopyToClipboard
                                            text={message4}
                                            onCopy={(text, result) => {
                                                if (result) {
                                                    showMessage();
                                                }
                                            }}
                                        >
                                            <button type="button" className="btn btn-primary">
                                                <IconCopy className="ltr:mr-2 rtl:ml-2" />
                                                Copy Link
                                            </button>
                                        </CopyToClipboard>
                                        <CopyToClipboard
                                            text={'2291'}
                                            onCopy={(text, result) => {
                                                if (result) {
                                                    showMessage();
                                                }
                                            }}
                                        >
                                            <button type="button" className="btn btn-dark ">
                                                <IconCopy className="ltr:mr-2 rtl:ml-2" />
                                                Copy Hidden Code
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {codeArr.includes('code4') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const message4 = 'http://www.admin-dashboard.com/code';

<form>
    <p className="mb-3 font-semibold">
        <span> {'Link -> '} </span>
        <span id="copyLink"> http://www.admin-dashboard.com/code</span>
    </p>
    <span className="absolute opacity-0" id="copyHiddenCode">
        2291
    </span>
    <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse mt-5">
        <CopyToClipboard
            text={message4}
            onCopy={(text, result) => {
                if (result) {
                    showMessage();
                }
            }}
        >
            <button type="button" className="btn btn-primary">
                <svg>...</svg>
                Copy Link
            </button>
        </CopyToClipboard>
        <CopyToClipboard
            text={'2291'}
            onCopy={(text, result) => {
                if (result) {
                    showMessage();
                }
            }}
        >
            <button type="button" className="btn btn-dark ">
                <svg>...</svg>
                Copy Hidden Code
            </button>
        </CopyToClipboard>
    </div>
</form>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clipboard;
