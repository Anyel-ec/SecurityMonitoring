import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../components/Icon/IconCode';

const CheckboxRadio = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Checkbox & Radio'));
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
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Checkbox and Radio</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                <div className="space-y-8" id="checkbox">
                    {/* Checkbox */}
                    <h4 className="badge bg-primary inline-block hover:top-0 text-base mb-0">Checkbox</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Default</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-2">
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox" defaultChecked />
                                            <span>Primary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-success" />
                                            <span>Success</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-secondary" />
                                            <span>Secondary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-danger" />
                                            <span>Danger</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-warning" />
                                            <span>Warning</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-info" />
                                            <span>Info</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-dark" />
                                            <span>Dark</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code1') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="inline-flex">
    <input type="checkbox" className="form-checkbox" defaultChecked />
    <span>Primary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-success" />
    <span>Success</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-secondary" />
    <span>Secondary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-danger" />
    <span>Danger</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-warning" />
    <span>Warning</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-info" />
    <span>Info</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-dark" />
    <span>Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Default Rounded</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-2">
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox rounded-full" defaultChecked />
                                            <span>Primary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-success rounded-full" />
                                            <span>Success</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-secondary rounded-full" />
                                            <span>Secondary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-danger rounded-full" />
                                            <span>Danger</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-warning rounded-full" />
                                            <span>Warning</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-info rounded-full" />
                                            <span>Info</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox text-dark rounded-full" />
                                            <span>Dark</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code2') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="inline-flex">
    <input type="checkbox" className="form-checkbox rounded-full" defaultChecked />
    <span>Primary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-success rounded-full" />
    <span>Success</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-secondary rounded-full" />
    <span>Secondary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-danger rounded-full" />
    <span>Danger</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-warning rounded-full" />
    <span>Warning</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-info rounded-full" />
    <span>Info</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-dark rounded-full" />
    <span>Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Outline</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-2">
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-primary" defaultChecked />
                                            <span>Primary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-success" />
                                            <span>Success</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-secondary" />
                                            <span>Secondary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-danger" />
                                            <span>Danger</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-warning" />
                                            <span>Warning</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-info" />
                                            <span>Info</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-dark" />
                                            <span>Dark</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code3') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-primary" defaultChecked />
    <span>Primary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-success" />
    <span>Success</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-secondary" />
    <span>Secondary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-danger" />
    <span>Danger</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-warning" />
    <span>Warning</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-info" />
    <span>Info</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-dark" />
    <span>Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Outline Rounded</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-2">
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-primary rounded-full" defaultChecked />
                                            <span>Primary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-success rounded-full" />
                                            <span>Success</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-secondary rounded-full" />
                                            <span>Secondary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-danger rounded-full" />
                                            <span>Danger</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-warning rounded-full" />
                                            <span>Warning</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-info rounded-full" />
                                            <span>Info</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="checkbox" className="form-checkbox outline-dark rounded-full" />
                                            <span>Dark</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code4') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-primary rounded-full" defaultChecked />
    <span>Primary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-success rounded-full" />
    <span>Success</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-secondary rounded-full" />
    <span>Secondary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-danger rounded-full" />
    <span>Danger</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-warning rounded-full" />
    <span>Warning</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-info rounded-full" />
    <span>Info</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-dark rounded-full" />
    <span>Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Default Text Color</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code5')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox peer" defaultChecked />
                                                <span className="peer-checked:text-primary">Primary</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-success peer" />
                                                <span className="peer-checked:text-success">Success</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-secondary peer" />
                                                <span className="peer-checked:text-secondary">Secondary</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-danger peer" />
                                                <span className="peer-checked:text-danger">Danger</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-warning peer" />
                                                <span className="peer-checked:text-warning">Warning</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-info peer" />
                                                <span className="peer-checked:text-info">Info</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-dark peer" />
                                                <span className="peer-checked:text-dark">Dark</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-primary peer" defaultChecked />
                                                <span className="peer-checked:text-primary">Primary</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-success peer" />
                                                <span className="peer-checked:text-success">Success</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-secondary peer" />
                                                <span className="peer-checked:text-secondary">Secondary</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-danger peer" />
                                                <span className="peer-checked:text-danger">Danger</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-warning peer" />
                                                <span className="peer-checked:text-warning">Warning</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-info peer" />
                                                <span className="peer-checked:text-info">Info</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-dark peer" />
                                                <span className="peer-checked:text-dark">Dark</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code5') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`{/*default*/}
<label className="inline-flex">
    <input type="checkbox" className="form-checkbox peer" defaultChecked />
    <span className="peer-checked:text-primary">Primary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-success peer" />
    <span className="peer-checked:text-success">Success</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-secondary peer" />
    <span className="peer-checked:text-secondary">Secondary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-danger peer" />
    <span className="peer-checked:text-danger">Danger</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-warning peer" />
    <span className="peer-checked:text-warning">Warning</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-info peer" />
    <span className="peer-checked:text-info">Info</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-dark peer" />
    <span className="peer-checked:text-dark">Dark</span>
</label>

{/*outline*/}
<div>
<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-primary peer" defaultChecked />
    <span className="peer-checked:text-primary">Primary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-success peer" />
    <span className="peer-checked:text-success">Success</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-secondary peer" />
    <span className="peer-checked:text-secondary">Secondary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-danger peer" />
    <span className="peer-checked:text-danger">Danger</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-warning peer" />
    <span className="peer-checked:text-warning">Warning</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-info peer" />
    <span className="peer-checked:text-info">Info</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-dark peer" />
    <span className="peer-checked:text-dark">Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Rounded Text Color</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code6')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox rounded-full peer" defaultChecked />
                                                <span className="peer-checked:text-primary">Primary</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-success rounded-full peer" />
                                                <span className="peer-checked:text-success">Success</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-secondary rounded-full peer" />
                                                <span className="peer-checked:text-secondary">Secondary</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-danger rounded-full peer" />
                                                <span className="peer-checked:text-danger">Danger</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-warning rounded-full peer" />
                                                <span className="peer-checked:text-warning">Warning</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-info rounded-full peer" />
                                                <span className="peer-checked:text-info">Info</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox text-dark rounded-full peer" />
                                                <span className="peer-checked:text-dark">Dark</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-primary rounded-full peer" defaultChecked />
                                                <span className="peer-checked:text-primary">Primary</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-success rounded-full peer" />
                                                <span className="peer-checked:text-success">Success</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-secondary rounded-full peer" />
                                                <span className="peer-checked:text-secondary">Secondary</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-danger rounded-full peer" />
                                                <span className="peer-checked:text-danger">Danger</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-warning rounded-full peer" />
                                                <span className="peer-checked:text-warning">Warning</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-info rounded-full peer" />
                                                <span className="peer-checked:text-info">Info</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex">
                                                <input type="checkbox" className="form-checkbox outline-dark rounded-full peer" />
                                                <span className="peer-checked:text-dark">Dark</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code6') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`{/*default*/}
<label className="inline-flex">
    <input type="checkbox" className="form-checkbox rounded-full peer" defaultChecked />
    <span className="peer-checked:text-primary">Primary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-success rounded-full peer" />
    <span className="peer-checked:text-success">Success</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-secondary rounded-full peer" />
    <span className="peer-checked:text-secondary">Secondary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-danger rounded-full peer" />
    <span className="peer-checked:text-danger">Danger</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-warning rounded-full peer" />
    <span className="peer-checked:text-warning">Warning</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-info rounded-full peer" />
    <span className="peer-checked:text-info">Info</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox text-dark rounded-full peer" />
    <span className="peer-checked:text-dark">Dark</span>
</label>

{/*outline*/}
<div>
<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-primary rounded-full peer" defaultChecked />
    <span className="peer-checked:text-primary">Primary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-success rounded-full peer" />
    <span className="peer-checked:text-success">Success</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-secondary rounded-full peer" />
    <span className="peer-checked:text-secondary">Secondary</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-danger rounded-full peer" />
    <span className="peer-checked:text-danger">Danger</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-warning rounded-full peer" />
    <span className="peer-checked:text-warning">Warning</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-info rounded-full peer" />
    <span className="peer-checked:text-info">Info</span>
</label>

<label className="inline-flex">
    <input type="checkbox" className="form-checkbox outline-dark rounded-full peer" />
    <span className="peer-checked:text-dark">Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                    </div>
                </div>
                <div className="space-y-8" id="radio">
                    {/* Radio */}
                    <h4 className="badge bg-primary inline-block hover:top-0 text-base mb-0">Radio</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Default</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code7')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-2">
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_radio" className="form-radio" defaultChecked />
                                            <span>Primary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_radio" className="form-radio text-success" />
                                            <span>Success</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_radio" className="form-radio text-secondary" />
                                            <span>Secondary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_radio" className="form-radio text-danger" />
                                            <span>Danger</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_radio" className="form-radio text-warning" />
                                            <span>Warning</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_radio" className="form-radio text-info" />
                                            <span>Info</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_radio" className="form-radio text-dark" />
                                            <span>Dark</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code7') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="inline-flex">
    <input type="radio" name="default_radio" className="form-radio" defaultChecked />
    <span>Primary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_radio" className="form-radio text-success" />
    <span>Success</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_radio" className="form-radio text-secondary" />
    <span>Secondary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_radio" className="form-radio text-danger" />
    <span>Danger</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_radio" className="form-radio text-warning" />
    <span>Warning</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_radio" className="form-radio text-info" />
    <span>Info</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_radio" className="form-radio text-dark" />
    <span>Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Square</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code8')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-2">
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_radio" className="form-radio rounded-none" defaultChecked />
                                            <span>Primary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_radio" className="form-radio text-success rounded-none" />
                                            <span>Success</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_radio" className="form-radio text-secondary rounded-none" />
                                            <span>Secondary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_radio" className="form-radio text-danger rounded-none" />
                                            <span>Danger</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_radio" className="form-radio text-warning rounded-none" />
                                            <span>Warning</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_radio" className="form-radio text-info rounded-none" />
                                            <span>Info</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_radio" className="form-radio text-dark rounded-none" />
                                            <span>Dark</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code8') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="inline-flex">
    <input type="radio" name="square_radio" className="form-radio rounded-none" defaultChecked />
    <span>Primary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_radio" className="form-radio text-success rounded-none" />
    <span>Success</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_radio" className="form-radio text-secondary rounded-none" />
    <span>Secondary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_radio" className="form-radio text-danger rounded-none" />
    <span>Danger</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_radio" className="form-radio text-warning rounded-none" />
    <span>Warning</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_radio" className="form-radio text-info rounded-none" />
    <span>Info</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_radio" className="form-radio text-dark rounded-none" />
    <span>Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Outline</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code9')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-2">
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="outline_radio" className="form-radio outline-primary" defaultChecked />
                                            <span>Primary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="outline_radio" className="form-radio outline-success" />
                                            <span>Success</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="outline_radio" className="form-radio outline-secondary" />
                                            <span>Secondary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="outline_radio" className="form-radio outline-danger" />
                                            <span>Danger</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="outline_radio" className="form-radio outline-warning" />
                                            <span>Warning</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="outline_radio" className="form-radio outline-info" />
                                            <span>Info</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="outline_radio" className="form-radio outline-dark" />
                                            <span>Dark</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code9') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="inline-flex">
    <input type="radio" name="outline_radio" className="form-radio outline-primary" defaultChecked />
    <span>Primary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="outline_radio" className="form-radio outline-success" />
    <span>Success</span>
</label>

<label className="inline-flex">
    <input type="radio" name="outline_radio" className="form-radio outline-secondary" />
    <span>Secondary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="outline_radio" className="form-radio outline-danger" />
    <span>Danger</span>
</label>

<label className="inline-flex">
    <input type="radio" name="outline_radio" className="form-radio outline-warning" />
    <span>Warning</span>
</label>

<label className="inline-flex">
    <input type="radio" name="outline_radio" className="form-radio outline-info" />
    <span>Info</span>
</label>

<label className="inline-flex">
    <input type="radio" name="outline_radio" className="form-radio outline-dark" />
    <span>Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Default Text Color</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code10')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-2">
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                                            <span className="peer-checked:text-primary">Primary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_text_color" className="form-radio text-success peer" />
                                            <span className="peer-checked:text-success">Success</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_text_color" className="form-radio text-secondary peer" />
                                            <span className="peer-checked:text-secondary">Secondary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_text_color" className="form-radio text-danger peer" />
                                            <span className="peer-checked:text-danger">Danger</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_text_color" className="form-radio text-warning peer" />
                                            <span className="peer-checked:text-warning">Warning</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_text_color" className="form-radio text-info peer" />
                                            <span className="peer-checked:text-info">Info</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="default_text_color" className="form-radio text-dark peer" />
                                            <span className="peer-checked:text-dark">Dark</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code10') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="inline-flex">
    <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
    <span className="peer-checked:text-primary">Primary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_text_color" className="form-radio text-success peer" />
    <span className="peer-checked:text-success">Success</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_text_color" className="form-radio text-secondary peer" />
    <span className="peer-checked:text-secondary">Secondary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_text_color" className="form-radio text-danger peer" />
    <span className="peer-checked:text-danger">Danger</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_text_color" className="form-radio text-warning peer" />
    <span className="peer-checked:text-warning">Warning</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_text_color" className="form-radio text-info peer" />
    <span className="peer-checked:text-info">Info</span>
</label>

<label className="inline-flex">
    <input type="radio" name="default_text_color" className="form-radio text-dark peer" />
    <span className="peer-checked:text-dark">Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Square Text Color</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code11')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-2">
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_text_radio" className="form-radio rounded-none peer" defaultChecked />
                                            <span className="peer-checked:text-primary">Primary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_text_radio" className="form-radio text-success rounded-none peer" />
                                            <span className="peer-checked:text-success">Success</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_text_radio" className="form-radio text-secondary rounded-none peer" />
                                            <span className="peer-checked:text-secondary">Secondary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_text_radio" className="form-radio text-danger rounded-none peer" />
                                            <span className="peer-checked:text-danger">Danger</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_text_radio" className="form-radio text-warning rounded-none peer" />
                                            <span className="peer-checked:text-warning">Warning</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_text_radio" className="form-radio text-info rounded-none peer" />
                                            <span className="peer-checked:text-info">Info</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="square_text_radio" className="form-radio text-dark rounded-none peer" />
                                            <span className="peer-checked:text-dark">Dark</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code11') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="inline-flex">
    <input type="radio" name="square_text_radio" className="form-radio rounded-none peer" defaultChecked />
    <span className="peer-checked:text-primary">Primary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_text_radio" className="form-radio text-success rounded-none peer" />
    <span className="peer-checked:text-success">Success</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_text_radio" className="form-radio text-secondary rounded-none peer" />
    <span className="peer-checked:text-secondary">Secondary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_text_radio" className="form-radio text-danger rounded-none peer" />
    <span className="peer-checked:text-danger">Danger</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_text_radio" className="form-radio text-warning rounded-none peer" />
    <span className="peer-checked:text-warning">Warning</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_text_radio" className="form-radio text-info rounded-none peer" />
    <span className="peer-checked:text-info">Info</span>
</label>

<label className="inline-flex">
    <input type="radio" name="square_text_radio" className="form-radio text-dark rounded-none peer" />
    <span className="peer-checked:text-dark">Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Outline Text Color</h5>
                                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code12')}>
                                    <span className="flex items-center">
                                        <IconCode className="me-2" />
                                        Code
                                    </span>
                                </button>
                            </div>
                            <div className="mb-5">
                                <div className="space-y-2">
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="classic_text_radio" className="form-radio outline-primary peer" defaultChecked />
                                            <span className="peer-checked:text-primary">Primary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="classic_text_radio" className="form-radio outline-success peer" />
                                            <span className="peer-checked:text-success">Success</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="classic_text_radio" className="form-radio outline-secondary peer" />
                                            <span className="peer-checked:text-secondary">Secondary</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="classic_text_radio" className="form-radio outline-danger peer" />
                                            <span className="peer-checked:text-danger">Danger</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="classic_text_radio" className="form-radio outline-warning peer" />
                                            <span className="peer-checked:text-warning">Warning</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="classic_text_radio" className="form-radio outline-info peer" />
                                            <span className="peer-checked:text-info">Info</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" name="classic_text_radio" className="form-radio outline-dark peer" />
                                            <span className="peer-checked:text-dark">Dark</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {codeArr.includes('code12') && (
                                <CodeHighlight>
                                    <pre className="language-xml">{`<label className="inline-flex">
    <input type="radio" name="classic_text_radio" className="form-radio outline-primary peer" defaultChecked />
    <span className="peer-checked:text-primary">Primary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="classic_text_radio" className="form-radio outline-success peer" />
    <span className="peer-checked:text-success">Success</span>
</label>

<label className="inline-flex">
    <input type="radio" name="classic_text_radio" className="form-radio outline-secondary peer" />
    <span className="peer-checked:text-secondary">Secondary</span>
</label>

<label className="inline-flex">
    <input type="radio" name="classic_text_radio" className="form-radio outline-danger peer" />
    <span className="peer-checked:text-danger">Danger</span>
</label>

<label className="inline-flex">
    <input type="radio" name="classic_text_radio" className="form-radio outline-warning peer" />
    <span className="peer-checked:text-warning">Warning</span>
</label>

<label className="inline-flex">
    <input type="radio" name="classic_text_radio" className="form-radio outline-info peer" />
    <span className="peer-checked:text-info">Info</span>
</label>

<label className="inline-flex">
    <input type="radio" name="classic_text_radio" className="form-radio outline-dark peer" />
    <span className="peer-checked:text-dark">Dark</span>
</label>`}</pre>
                                </CodeHighlight>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckboxRadio;
