import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import Select from 'react-select';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';

const Select2 = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Select2'));
    });
    const [codeArr, setCodeArr] = useState([]);

    const toggleCode = (name) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const options = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

    const options1 = [
        { value: 'group1', label: 'Group 1', isDisabled: 'option--is-disabled' },
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
        { value: 'group2', label: 'Group 2', isDisabled: 'option--is-disabled' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'green', label: 'Green' },
        { value: 'red', label: 'Red' },
        { value: 'group3', label: 'Group 3', isDisabled: 'option--is-disabled' },
        { value: 'aqua', label: 'Aqua' },
        { value: 'black', label: 'Black' },
        { value: 'blue', label: 'Blue' },
    ];

    const options2 = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White', isDisabled: 'option--is-disabled' },
        { value: 'purple', label: 'Purple' },
    ];

    const options3 = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

    const options4 = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

    const options5 = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Select2</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                <div className="panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap">
                    <div className="ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://www.npmjs.com/package/react-select" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://www.npmjs.com/package/react-select
                    </a>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 custom-select">
                    {/* <!-- Basic --> */}
                    <div className="panel" id="basic">
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
                            <Select defaultValue={options[0]} options={options} isSearchable={false} />
                        </div>
                        {codeArr.includes('code1') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import Select from 'react-select';

const options = [
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
];

<Select defaultValue={options[0]} options={options} isSearchable={false} />`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/*  Nested */}
                    <div className="panel" id="nested">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Nested</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code2')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <Select defaultValue={options1[1]} options={options1} isSearchable={false} />
                        </div>
                        {codeArr.includes('code2') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import Select from 'react-select';

const options1 = [
    { value: 'group1', label: 'Group 1', isDisabled: 'option--is-disabled' },
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
    { value: 'group2', label: 'Group 2', isDisabled: 'option--is-disabled' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'green', label: 'Green' },
    { value: 'red', label: 'Red' },
    { value: 'group3', label: 'Group 3', isDisabled: 'option--is-disabled' },
    { value: 'aqua', label: 'Aqua' },
    { value: 'black', label: 'Black' },
    { value: 'blue', label: 'Blue' },
];

<Select defaultValue={options1[1]} options={options1} isSearchable={false}/>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Disabling options */}
                    <div className="panel" id="disabling_options">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Disabling options</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code3')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <Select defaultValue={options2[0]} options={options2} isSearchable={false} />
                        </div>
                        {codeArr.includes('code3') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import Select from 'react-select';

const options2 = [
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White', isDisabled: 'option--is-disabled' },
    { value: 'purple', label: 'Purple' },
];

<Select defaultValue={options2[0]} options={options2} isSearchable={false}/>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Searchable */}
                    <div className="panel" id="tagging">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Searchable</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code5')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <Select placeholder="Select an option" options={options4} />
                        </div>
                        {codeArr.includes('code5') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import Select from 'react-select';

const options3 = [
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
];

<Select placeholder="Select an option" options={options4} />`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/*  Placeholder */}
                    <div className="panel" id="placeholder">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Placeholder</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code4')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <Select placeholder="Choose..." options={options3} isSearchable={false} />
                        </div>
                        {codeArr.includes('code4') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import Select from 'react-select';

const options4 = [
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
];

<Select placeholder="Choose..." options={options3} isSearchable={false}/>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>

                    {/* Multiple */}
                    <div className="panel" id="limit_tagging">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Multiple select</h5>
                            <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code6')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button>
                        </div>
                        <div className="mb-5">
                            <Select placeholder="Select an option" options={options5} isMulti isSearchable={false} />
                        </div>
                        {codeArr.includes('code6') && (
                            <CodeHighlight>
                                <pre className="language-typescript">{`import Select from 'react-select';

const options5 = [
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
];

<Select placeholder="Select an option" options={options5} isMulti isSearchable={false}/>`}</pre>
                            </CodeHighlight>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Select2;
