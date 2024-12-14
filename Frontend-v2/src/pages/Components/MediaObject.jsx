import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconMessageDots from '../../components/Icon/IconMessageDots';
import IconPencil from '../../components/Icon/IconPencil';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconChatDot from '../../components/Icon/IconChatDot';
import IconPhone from '../../components/Icon/IconPhone';
import IconBarChart from '../../components/Icon/IconBarChart';
import IconXCircle from '../../components/Icon/IconXCircle';
import IconInfoTriangle from '../../components/Icon/IconInfoTriangle';

const MediaObject = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Media Object'));
    });
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

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
                        Components
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Media Object</span>
                </li>
            </ul>
            <div className="pt-5 grid xl:grid-cols-2 grid-cols-1 gap-6">
                {/* Simple */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Simple</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Order */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Order</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex">
                            <div className="flex-1 ltr:mr-4 rtl:ml-4">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                            <div>
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex">
        <div className="flex-1 ltr:mr-4 rtl:ml-4">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
        <div>
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Alignment */}

                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Top-aligned media</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex items-start">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque. Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus
                                    nulla elementum, rutrum neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code3') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex items-start">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque. Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus
                nulla elementum, rutrum neque eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Center-aligned media</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex items-center">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque. Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus
                                    nulla elementum, rutrum neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code4') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex items-center">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque. Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus
                nulla elementum, rutrum neque eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Bottom-aligned media</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code5')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex items-end">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque. Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus
                                    nulla elementum, rutrum neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code5') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex items-end">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque. Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus
                nulla elementum, rutrum neque eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Right Aligned</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code6')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex">
                            <div className="flex-1 ltr:mr-4 rtl:ml-4 ltr:text-right rtl:text-left">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque. Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus
                                    nulla elementum, rutrum neque eu, gravida neque.
                                </p>
                            </div>
                            <div>
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code6') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex">
        <div className="flex-1 ltr:mr-4 rtl:ml-4 ltr:text-right rtl:text-left">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque. Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus
                nulla elementum, rutrum neque eu, gravida neque.
            </p>
        </div>
        <div>
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* List */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Media list</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code7')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex mb-5">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                        <div className="flex mb-5">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code7') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex mb-5">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
    <div className="flex mb-5">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
    <div className="flex">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Nesting */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Nesting</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code8')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text mb-5">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                                <div className="flex">
                                    <div className="ltr:mr-4 rtl:ml-4">
                                        <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                        <p className="media-text">
                                            Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum,
                                            rutrum neque eu, gravida neque.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code8') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text mb-5">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
            <div className="flex">
                <div className="ltr:mr-4 rtl:ml-4">
                    <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                    <p className="media-text">
                        Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum,
                        rutrum neque eu, gravida neque.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Notation Text */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Notation Text</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code9')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text mb-4">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                                <ul className="flex space-x-4 rtl:space-x-reverse font-bold">
                                    <li>
                                        <button type="button" className="hover:text-primary">
                                            Reply
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="hover:text-primary">
                                            Edit
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="hover:text-primary">
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code9') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text mb-4">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
            <ul className="flex space-x-4 rtl:space-x-reverse font-bold">
                <li>
                    <button type="button" className="hover:text-primary">
                        Reply
                    </button>
                </li>
                <li>
                    <button type="button" className="hover:text-primary">
                        Edit
                    </button>
                </li>
                <li>
                    <button type="button" className="hover:text-primary">
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Notation Icon */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Notation Icon</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code10')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
                                <p className="media-text mb-4">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                                <ul className="flex space-x-4 rtl:space-x-reverse font-bold">
                                    <li>
                                        <button type="button" className="flex items-center hover:text-primary">
                                            <IconMessageDots className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                                            Reply
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="flex items-center hover:text-primary">
                                            <IconPencil className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1" />
                                            Edit
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="flex items-center hover:text-primary">
                                            <IconTrashLines className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code10') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">Heading</h4>
            <p className="media-text mb-4">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
            <ul className="flex space-x-4 rtl:space-x-reverse font-bold">
                <li>
                    <button type="button" className="flex items-center hover:text-primary">
                        <svg>...</svg>
                        Reply
                    </button>
                </li>
                <li>
                    <button type="button" className="flex items-center hover:text-primary">
                        <svg>...</svg>
                        Edit
                    </button>
                </li>
                <li>
                    <button type="button" className="flex items-center hover:text-primary">
                        <svg>...</svg>
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Badge */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Badge</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code11')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2 text-primary">
                                    Heading
                                    <span className="badge bg-primary ltr:float-right rtl:float-left">Web Designer</span>
                                </h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code11') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-primary">
                Heading
                <span className="badge bg-primary ltr:float-right rtl:float-left">Web Designer</span>
            </h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Dropdown */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Dropdown List</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code12')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5 dropdown">
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-semibold text-lg text-primary">Heading </h4>
                                    <div className="dropdown">
                                        <Dropdown
                                            offset={[0, 5]}
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="text-white-dark"
                                            button={<IconHorizontalDots className="opacity-70 text-white-dark" />}
                                        >
                                            <ul className="!min-w-[130px]">
                                                <li>
                                                    <button type="button">
                                                        <IconChatDot className="ltr:mr-1 rtl:ml-1" />
                                                        Start chat
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button">
                                                        <IconPhone className="ltr:mr-1 rtl:ml-1" />
                                                        Make a call
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button">
                                                        <IconBarChart className="ltr:mr-1 rtl:ml-1" />
                                                        Statistics
                                                    </button>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code12') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`import Dropdown from '../../components/Dropdown';

<div className="mb-5 dropdown">
    <div className="flex">
        <div className="ltr:mr-4 rtl:ml-4">
            <img src="/assets/images/profile-5.jpeg" alt="img" className="w-14 h-14 rounded" />
        </div>
        <div className="flex-1">
            <div className="flex justify-between mb-2">
                <h4 className="font-semibold text-lg text-primary">Heading </h4>
                <div className="dropdown">
                    <Dropdown
                        offset={[0, 5]}
                        placement={\`${isRtl ? 'bottom-start' : 'bottom-end'}\`}
                        btnClassName="text-white-dark"
                        button={
                            <svg>...</svg>
                        }
                    >
                        <ul className="!min-w-[130px]">
                            <li>
                                <button type="button">
                                    <svg>...</svg>
                                    Start chat
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <svg>...</svg>
                                    Make a call
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <svg>...</svg>
                                    Statistics
                                </button>
                            </li>
                        </ul>
                    </Dropdown>
                </div>
            </div>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Labels */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Labels</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code13')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex items-center mb-5">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <IconXCircle className="w-7 h-7 text-danger" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-primary">Heading </h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <IconInfoTriangle className="w-7 h-7 text-warning" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-primary">Heading </h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code13') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex items-center mb-5">
        <div className="ltr:mr-4 rtl:ml-4">
            <svg>...</svg>
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg text-primary">Heading </h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
    <div className="flex items-center">
        <div className="ltr:mr-4 rtl:ml-4">
            <svg>...</svg>
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg text-primary">Heading </h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/* Checkbox */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Checkbox</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code14')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex mb-5">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <input type="checkbox" className="form-checkbox mt-1.5" defaultChecked />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-primary">Heading </h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <input type="checkbox" className="form-checkbox mt-1.5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-primary">Heading </h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code14') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex mb-5">
        <div className="ltr:mr-4 rtl:ml-4">
            <input type="checkbox" className="form-checkbox mt-1.5" defaultChecked />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg text-primary">Heading </h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
    <div className="flex">
        <div className="ltr:mr-4 rtl:ml-4">
            <input type="checkbox" className="form-checkbox mt-1.5" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg text-primary">Heading </h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>

                {/*  Radio */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Radio</h5>
                        <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code15')}>
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button>
                    </div>
                    <div className="mb-5">
                        <div className="flex mb-5">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <input type="radio" className="form-radio mt-1.5" name="radio" defaultChecked />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-primary">Heading </h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <input type="radio" className="form-radio mt-1.5" name="radio" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-primary">Heading </h4>
                                <p className="media-text">
                                    Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                                    neque eu, gravida neque.
                                </p>
                            </div>
                        </div>
                    </div>
                    {codeArr.includes('code15') && (
                        <CodeHighlight>
                            <pre className="language-xml">
                                {`<div className="mb-5">
    <div className="flex mb-5">
        <div className="ltr:mr-4 rtl:ml-4">
            <input type="radio" className="form-radio mt-1.5" name="radio" defaultChecked />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg text-primary">Heading </h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
    <div className="flex">
        <div className="ltr:mr-4 rtl:ml-4">
            <input type="radio" className="form-radio mt-1.5" name="radio" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-lg text-primary">Heading </h4>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum
                neque eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
                            </pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MediaObject;
