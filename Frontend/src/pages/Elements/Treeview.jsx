import { Link } from 'react-router-dom';
import CodeHighlight from '../../components/Highlight';
import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../components/Icon/IconCode';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconFolder from '../../components/Icon/IconFolder';
import IconTxtFile from '../../components/Icon/IconTxtFile';
import IconFolderPlus from '../../components/Icon/IconFolderPlus';
import IconFolderMinus from '../../components/Icon/IconFolderMinus';
const Treeview = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Treeview'));
    });
    const [codeArr, setCodeArr] = useState([]);

    const toggleCode = (name) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const [treeview1, setTreeview1] = useState(['images']);
    const [pagesSubMenu, setPagesSubMenu] = useState(false);

    const toggleTreeview1 = (name) => {
        if (treeview1.includes(name)) {
            setTreeview1((value) => value.filter((d) => d !== name));
        } else {
            setTreeview1([...treeview1, name]);
        }
    };

    const [treeview2, setTreeview2] = useState(['parent']);

    const toggleTreeview2 = (name) => {
        if (treeview2.includes(name)) {
            setTreeview2((value) => value.filter((d) => d !== name));
        } else {
            setTreeview2([...treeview2, name]);
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
                    <span>Treeview</span>
                </li>
            </ul>
            <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
                {/* Animated */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Animated</h5>
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
                        <ul className="font-semibold">
                            <li className="py-[5px]">
                                <button type="button" className={`${treeview1.includes('css') ? 'active' : ''}`} onClick={() => toggleTreeview1('css')}>
                                    <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('css') && 'rotate-180'}`} />
                                    <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                    CSS
                                </button>
                                <AnimateHeight duration={300} height={treeview1.includes('css') ? 'auto' : 0}>
                                    <ul className="ltr:pl-14 rtl:pr-14">
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            style.css
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="py-[5px]">
                                <button type="button" className={`${treeview1.includes('images') ? 'active' : ''}`} onClick={() => toggleTreeview1('images')}>
                                    <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('images') && 'rotate-180'}`} />
                                    <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                    Images
                                </button>
                                <AnimateHeight duration={300} height={treeview1.includes('images') ? 'auto' : 0}>
                                    <ul className="ltr:pl-14 rtl:pr-14">
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            profile-16.jpeg
                                        </li>
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            background.png
                                        </li>
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            gallery.jpg
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="py-[5px]">
                                <button type="button" className={`${treeview1.includes('html') ? 'active' : ''}`} onClick={() => toggleTreeview1('html')}>
                                    <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('html') && 'rotate-180'}`} />
                                    <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                    HTML
                                </button>
                                <AnimateHeight duration={300} height={treeview1.includes('html') ? 'auto' : 0}>
                                    <ul className="ltr:pl-14 rtl:pr-14">
                                        <li className="py-[5px]">
                                            <button type="button" className={`${pagesSubMenu ? 'open' : ''} `} onClick={() => setPagesSubMenu(!pagesSubMenu)}>
                                                <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('pages') && 'rotate-180'}`} />
                                                <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                                PAGES
                                            </button>
                                            <AnimateHeight duration={300} height={pagesSubMenu ? 'auto' : 0}>
                                                <ul className="ltr:pl-14 rtl:pr-14">
                                                    <li className="py-[5px]">
                                                        <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                                        file name
                                                    </li>
                                                    <li className="py-[5px]">
                                                        <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                                        file name
                                                    </li>
                                                    <li className="py-[5px]">
                                                        <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                                        file name
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="py-[5px] ltr:pl-8 rtl:pr-8">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            file name
                                        </li>
                                        <li className="py-[5px] ltr:pl-8 rtl:pr-8">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            file name
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="py-[5px] ltr:pl-7 rtl:pr-7">
                                <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                index.html
                            </li>
                            <li className="py-[5px] ltr:pl-7 rtl:pr-7">
                                <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                components.html
                            </li>
                        </ul>
                    </div>
                    {codeArr.includes('code1') && (
                        <CodeHighlight>
                            <pre>{`import { useState } from 'react';
import AnimateHeight from 'react-animate-height';

const [treeview1, setTreeview1] = useState(['images']);
const [pagesSubMenu, setPagesSubMenu] = useState(false);

const toggleTreeview1 = (name) => {
    if (treeview1.includes(name)) {
        setTreeview1((value) => value.filter((d) => d !== name));
    } else {
        setTreeview1([...treeview1, name]);
    }
};

<ul className="font-semibold">
    <li className="py-[5px]">
        <button type="button" className={\`${treeview1.includes('css') ? 'active' : ''}\`} onClick={() => toggleTreeview1('css')}>
            <svg>...</svg>
            <svg>...</svg>
            CSS
        </button>
        <AnimateHeight duration={300} height={treeview1.includes('css') ? 'auto' : 0}>
            <ul className="ltr:pl-14 rtl:pr-14">
                <li className="py-[5px]">
                    <svg>...</svg>
                    style.css
                </li>
            </ul>
        </AnimateHeight>
    </li>
    <li className="py-[5px]">
        <button type="button" className={\`${treeview1.includes('images') ? 'active' : ''}\`} onClick={() => toggleTreeview1('images')}>
            <svg>...</svg>
            <svg>...</svg>
            Images
        </button>
        <AnimateHeight duration={300} height={treeview1.includes('images') ? 'auto' : 0}>
            <ul className="ltr:pl-14 rtl:pr-14">
                <li className="py-[5px]">
                    <svg>...</svg>
                    profile-16.jpeg
                </li>
                <li className="py-[5px]">
                    <svg>...</svg>
                    background.png
                </li>
                <li className="py-[5px]">
                    <svg>...</svg>
                    gallery.jpg
                </li>
            </ul>
        </AnimateHeight>
    </li>
    <li className="py-[5px]">
        <button type="button" className={\`${treeview1.includes('html') ? 'active' : ''}\`} onClick={() => toggleTreeview1('html')}>
            <svg>...</svg>
            <svg>...</svg>
            HTML
        </button>
        <AnimateHeight duration={300} height={treeview1.includes('html') ? 'auto' : 0}>
            <ul className="ltr:pl-14 rtl:pr-14">
                <li className="py-[5px]">
                    <button type="button" className={\`${pagesSubMenu ? 'open' : ''}\`} onClick={() => setPagesSubMenu(!pagesSubMenu)}>
                        <svg>...</svg>
                        <svg>...</svg>
                        PAGES
                    </button>
                    <AnimateHeight duration={300} height={pagesSubMenu ? 'auto' : 0}>
                        <ul className="ltr:pl-14 rtl:pr-14">
                            <li className="py-[5px]">
                                <svg>...</svg>
                                file name
                            </li>
                            <li className="py-[5px]">
                                <svg>...</svg>
                                file name
                            </li>
                            <li className="py-[5px]">
                                <svg>...</svg>
                                file name
                            </li>
                        </ul>
                    </AnimateHeight>
                </li>
                <li className="py-[5px] ltr:pl-8 rtl:pr-8">
                    <svg>...</svg>
                    file name
                </li>
                <li className="py-[5px] ltr:pl-8 rtl:pr-8">
                    <svg>...</svg>
                    file name
                </li>
            </ul>
        </AnimateHeight>
    </li>
    <li className="py-[5px] ltr:pl-7 rtl:pr-7">
        <svg>...</svg>
        index.html
    </li>
    <li className="py-[5px] ltr:pl-7 rtl:pr-7">
        <svg>...</svg>
        components.html
    </li>
</ul>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
                {/* Basic */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Basic</h5>
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
                        <ul className="font-semibold">
                            <li>
                                <button type="button" className={`${treeview2.includes('parent') ? 'active' : ''}`} onClick={() => toggleTreeview2('parent')}>
                                    {treeview2.includes('parent') ? (
                                        <IconFolderPlus className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                    ) : (
                                        <IconFolderMinus className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                    )}
                                    Parent Node
                                </button>
                                <AnimateHeight duration={300} height={treeview2.includes('parent') ? 'auto' : 0} easing="none">
                                    <ul>
                                        <li className="py-[5px] ltr:pl-7 rtl:pr-7">
                                            <button type="button" className={`${treeview2.includes('img') ? 'open' : ''} `} onClick={() => toggleTreeview2('img')}>
                                                {treeview2.includes('img') ? (
                                                    <IconFolderPlus className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                                ) : (
                                                    <IconFolderMinus className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                                )}
                                                img
                                            </button>
                                            <ul></ul>
                                        </li>
                                        <li className="py-[5px] ltr:pl-7 rtl:pr-7">
                                            <button type="button" className={`${treeview2.includes('css') ? 'open' : ''} `} onClick={() => toggleTreeview2('css')}>
                                                {treeview2.includes('css') ? (
                                                    <IconFolderPlus className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                                ) : (
                                                    <IconFolderMinus className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                                )}
                                                css
                                            </button>
                                            <AnimateHeight duration={300} height={treeview2.includes('css') ? 'auto' : 0} easing="none">
                                                <ul>
                                                    <li className="py-[5px] ltr:pl-7 rtl:pr-7 text-secondary">style.css</li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="py-[5px] ltr:pl-7 rtl:pr-7">
                                            <button type="button" className={`${treeview2.includes('js') ? 'open' : ''} `} onClick={() => toggleTreeview2('js')}>
                                                {treeview2.includes('js') ? (
                                                    <IconFolderPlus className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                                ) : (
                                                    <IconFolderMinus className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                                )}
                                                js
                                            </button>
                                            <AnimateHeight duration={300} height={treeview2.includes('js') ? 'auto' : 0} easing="none">
                                                <ul>
                                                    <li className="py-[5px] ltr:pl-7 rtl:pr-7 text-secondary">script.js</li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="py-[5px] ltr:pl-7 rtl:pr-7 text-secondary">index.html</li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>
                    </div>
                    {codeArr.includes('code2') && (
                        <CodeHighlight>
                            <pre>{`import { useState } from 'react';
import AnimateHeight from 'react-animate-height';

const [pagesSubMenu, setPagesSubMenu] = useState(false);

const [treeview2, setTreeview2] = useState(['parent']);

const toggleTreeview2 = (name) => {
    if (treeview2.includes(name)) {
        setTreeview2((value) => value.filter((d) => d !== name));
    } else {
        setTreeview2([...treeview2, name]);
    }
};

<ul className="font-semibold">
    <li>
        <button type="button" className={\`${treeview2.includes('parent') ? 'active' : ''}\`} onClick={() => toggleTreeview2('parent')}>
            {treeview2.includes('parent') ? (
                <svg>...</svg>
            ) : (
                <svg>...</svg>
            )}
            Parent Node
        </button>
        <AnimateHeight duration={300} height={treeview2.includes('parent') ? 'auto' : 0} easing="none">
            <ul>
                <li className="py-[5px] ltr:pl-7 rtl:pr-7">
                    <button type="button" className={\`${treeview2.includes('img') ? 'open' : ''}\`} onClick={() => toggleTreeview2('img')}>
                        {treeview2.includes('img') ? (
                            <svg>...</svg>
                        ) : (
                            <svg>...</svg>
                        )}
                        img
                    </button>
                    <ul></ul>
                </li>
                <li className="py-[5px] ltr:pl-7 rtl:pr-7">
                    <button type="button" className={\`${treeview2.includes('css') ? 'open' : ''}\`} onClick={() => toggleTreeview2('css')}>
                        {treeview2.includes('css') ? (
                            <svg>...</svg>
                        ) : (
                            <svg>...</svg>
                        )}
                        css
                    </button>
                    <AnimateHeight duration={300} height={treeview2.includes('css') ? 'auto' : 0} easing="none">
                        <ul>
                            <li className="py-[5px] ltr:pl-7 rtl:pr-7 text-secondary">style.css</li>
                        </ul>
                    </AnimateHeight>
                </li>
                <li className="py-[5px] ltr:pl-7 rtl:pr-7">
                    <button type="button" className={\`${treeview2.includes('js') ? 'open' : ''}\`} onClick={() => toggleTreeview2('js')}>
                        {treeview2.includes('js') ? (
                            <svg>...</svg>
                        ) : (
                            <svg>...</svg>
                        )}
                        js
                    </button>
                    <AnimateHeight duration={300} height={treeview2.includes('js') ? 'auto' : 0} easing="none">
                        <ul>
                            <li className="py-[5px] ltr:pl-7 rtl:pr-7 text-secondary">script.js</li>
                        </ul>
                    </AnimateHeight>
                </li>
                <li className="py-[5px] ltr:pl-7 rtl:pr-7 text-secondary">index.html</li>
            </ul>
        </AnimateHeight>
    </li>
</ul>`}</pre>
                        </CodeHighlight>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Treeview;
