import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { setPageTitle } from '../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconBell from '../components/Icon/IconBell';
import IconStar from '../components/Icon/IconStar';
import IconHeart from '../components/Icon/IconHeart';
// import { MultiDrag } from 'sortablejs';
// import Sortable from 'sortablejs';

const items1 = [
    {
        id: 1,
        text: 'Need to be approved',
        name: 'Kelly Young',
    },
    {
        id: 2,
        text: 'Meeting with client',
        name: 'Andy King',
    },
    {
        id: 3,
        text: 'Project Detail',
        name: 'Judy Holmes',
    },
    {
        id: 4,
        text: 'Edited Post Apporval',
        name: 'Vincent Carpenter',
    },
    {
        id: 5,
        text: 'Project Lead Pickup',
        name: 'Mary McDonald',
    },
];
const items2 = [
    {
        id: 6,
        text: 'Need to be approved',
        name: 'Kelly Young',
    },
    {
        id: 7,
        text: 'Meeting with client',
        name: 'Andy King',
    },
    {
        id: 8,
        text: 'Project Detail',
        name: 'Judy Holmes',
    },
    {
        id: 9,
        text: 'Edited Post Apporval',
        name: 'Vincent Carpenter',
    },
    {
        id: 10,
        text: 'Project Lead Pickup',
        name: 'Mary McDonald',
    },
];
const items3 = [
    {
        id: 2,
        text: 'Meeting with client',
        name: 'Andy King',
    },
    {
        id: 1,
        text: 'Need to be approved',
        name: 'Kelly Young',
    },
    {
        id: 3,
        text: 'Project Detail',
        name: 'Judy Holmes',
    },
    {
        id: 4,
        text: 'Edited Post Apporval',
        name: 'Vincent Carpenter',
    },
];
const items4 = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 6, name: 'Item 6' },
    { id: 7, name: 'Item 7' },
    { id: 8, name: 'Item 8' },
    { id: 9, name: 'Item 9' },
    { id: 10, name: 'Item 10' },
    { id: 11, name: 'Item 11' },
    { id: 12, name: 'Item 12' },
];

const DragAndDrop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Drag & Drop'));
    });
    // ReactSortable.mount(new MultiDrag());

    const [sortable1, setSortable1] = useState(items1);
    const [sortable2, setSortable2] = useState(items2);
    const [iconChange1, setIconChange1] = useState(items1);
    const [iconChange2, setIconChange2] = useState(items2);
    const [handler1, setHandler1] = useState(items1);
    const [handler2, setHandler2] = useState(items2);
    // const [multipleDrag1, setMultipleDrag1] = useState(items1);
    // const [multipleDrag2, setMultipleDrag2] = useState(items2);
    const [newsFeed, setNewsFeed] = useState(items3);
    const [delete1, setDelete1] = useState(items1);
    const [delete2, setDelete2] = useState(items2);
    const [gridDrag, setGridDrag] = useState(items4);
    const [swap, setSwap] = useState([...items1, ...items2]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-6">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Drag & Drop</span>
                </li>
            </ul>

            <div className="dragndrop space-y-8">
                <div className="panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap">
                    <div className="ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://www.npmjs.com/package/react-sortablejs" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://www.npmjs.com/package/react-sortablejs
                    </a>
                </div>
                {/* Sortable */}
                <div className="panel">
                    <div className="font-semibold text-lg mb-5">Sortable</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                        <div>
                            <ul id="example1">
                                <ReactSortable list={sortable1} setList={setSortable1} animation={200} delay={2} ghostClass="gu-transit" group="shared">
                                    {sortable1.map((item) => {
                                        return (
                                            <li key={item.id} className="mb-2.5 cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full mx-auto" />
                                                    </div>
                                                    <div className="flex md:flex-row flex-col justify-between items-center flex-1">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                        <div>
                                                            <button type="button" className="btn btn-secondary btn-sm px-5 py-2">
                                                                View
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ReactSortable>
                            </ul>
                        </div>
                        <div>
                            <ul id="example2">
                                <ReactSortable list={sortable2} setList={setSortable2} animation={200} delay={2} ghostClass="gu-transit" group="shared">
                                    {sortable2.map((item) => {
                                        return (
                                            <li key={item.id} className="mb-2.5 cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full mx-auto" />
                                                    </div>
                                                    <div className="flex md:flex-row flex-col justify-between items-center flex-1">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                        <div>
                                                            <button type="button" className="btn btn-secondary btn-sm px-5 py-2">
                                                                View
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ReactSortable>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Icon change */}
                <div className="panel">
                    <div className="font-semibold text-lg dark:text-white mb-5">Icon Change</div>
                    <div className="icon-change grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                        <div>
                            <ul id="example3" className="left">
                                <ReactSortable list={iconChange1} setList={setIconChange1} animation={200} ghostClass="gu-transit" group="icon">
                                    {iconChange1.map((item) => {
                                        return (
                                            <li key={item.id} className="mb-2.5 cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full" />
                                                    </div>
                                                    <div className="flex justify-between items-center flex-1">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                        <div className="text-white-dark">
                                                            <IconStar className="w-6 h-6" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ReactSortable>
                            </ul>
                        </div>

                        <div>
                            <ul id="example4" className="right">
                                <ReactSortable list={iconChange2} setList={setIconChange2} animation={200} ghostClass="gu-transit" group="icon">
                                    {iconChange2.map((item) => {
                                        return (
                                            <li key={item.id} className="mb-2.5 cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full" />
                                                    </div>
                                                    <div className="flex justify-between items-center flex-1">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                        <div className="text-white-dark">
                                                            <IconHeart />
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ReactSortable>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Handler */}
                <div className="panel">
                    <div className="font-semibold text-lg dark:text-white mb-5">Handler</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                        <div>
                            <ul id="example5">
                                <ReactSortable list={handler1} setList={setHandler1} animation={200} handle=".handle" group="handler" ghostClass="gu-transit">
                                    {handler1.map((item) => {
                                        return (
                                            <li key={item.id} className="mb-2.5 cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full mx-auto" />
                                                    </div>
                                                    <div className="flex md:flex-row flex-col justify-between items-center flex-1 text-center md:text-left">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                        <div className="text-white-dark">
                                                            <span className="handle px-2 ltr:mr-1 rtl:ml-1 bg-[#ebedf2] dark:bg-black rounded cursor-move">+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ReactSortable>
                            </ul>
                        </div>

                        <div>
                            <ul id="example6">
                                <ReactSortable list={handler2} setList={setHandler2} animation={200} handle=".handle" group="handler" ghostClass="gu-transit">
                                    {handler2.map((item) => {
                                        return (
                                            <li key={item.id} className="mb-2.5 cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full mx-auto" />
                                                    </div>
                                                    <div className="sm:flex block justify-between items-center flex-1 text-center md:text-left">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                        <div className="text-white-dark">
                                                            <span className="handle px-2 ltr:mr-1 rtl:ml-1 bg-[#ebedf2] dark:bg-black rounded cursor-move">+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ReactSortable>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Multiple drag */}
                {/* <div className="panel">
                <div className="font-semibold text-lg dark:text-white mb-5">Multiple Drag</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                    <div>
                        <ul id="example7">
                            <ReactSortable
                                list={multipleDrag1}
                                setList={setMultipleDrag1}
                                animation={200}
                                group="multiple"
                                multiDrag={true}
                                selectedClass="selected"
                                fallbackTolerance={3}
                                ghostClass="gu-transit"

                            >
                                {multipleDrag1.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <li className="mb-2.5 cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img
                                                            alt="avatar"
                                                            src={`/assets/images/profile-${item.id}.jpeg`}
                                                            className="w-11 h-11 rounded-full mx-auto"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center flex-1">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">
                                                                {item.text}
                                                            </div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    );
                                })}
                            </ReactSortable>
                        </ul>
                    </div>

                    <div>
                        <ul id="example8">
                            <ReactSortable
                                list={multipleDrag2}
                                setList={setMultipleDrag2}
                                animation={200}
                                group="multiple"
                                multiDrag={true}
                                selectedClass="selected"
                                fallbackTolerance={3}
                                ghostClass="gu-transit"

                            >
                                {multipleDrag2.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <li className="mb-2.5 cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img
                                                            alt="avatar"
                                                            src={`/assets/images/profile-${item.id}.jpeg`}
                                                            className="w-11 h-11 rounded-full mx-auto"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center flex-1">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">
                                                                {item.text}
                                                            </div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    );
                                })}
                            </ReactSortable>
                        </ul>
                    </div>
                </div>
            </div>  */}

                {/* News Feed */}
                <div className="panel">
                    <div className="font-semibold text-lg dark:text-white mb-5">News Feed</div>
                    <div>
                        <div id="example12">
                            <ReactSortable list={newsFeed} setList={setNewsFeed} animation={200} className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                                {newsFeed.map((item) => {
                                    return (
                                        <div className="mb-2.5" key={item.id}>
                                            <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5">
                                                <div className="py-sm-2.5 sm:flex block ltr:md:text-left rtl:md:text-right text-center items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img alt="avatar" src={`/assets/images/profile-${item.id + 1}.jpeg`} className="w-11 h-11 rounded-lg mx-auto" />
                                                    </div>
                                                    <div className="flex md:flex-row flex-col justify-between items-center flex-1">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">{item.name}</div>
                                                            <div className="text-white-dark text-xs">11 hours ago</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="py-5 border-b border-b-[#f1f2f3] dark:border-b-dark mb-4">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                    veniam, quis nostrud exercitation.
                                                </div>
                                                <div className="md:flex items-center flex-wrap">
                                                    <div className="ltr:md:text-left rtl:md:text-right text-center xl:flex-1">
                                                        <div className="flex md:justify-start justify-center -space-x-2 rtl:space-x-reverse text-white">
                                                            <img
                                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-white-dark"
                                                                src="/assets/images/profile-6.jpeg"
                                                                alt="avatar"
                                                            />
                                                            <img
                                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-white-dark"
                                                                src="/assets/images/profile-7.jpeg"
                                                                alt="avatar"
                                                            />
                                                            <img
                                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-white-dark"
                                                                src="/assets/images/profile-8.jpeg"
                                                                alt="avatar"
                                                            />
                                                            <img
                                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-white-dark"
                                                                src="/assets/images/profile-10.jpeg"
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="ltr:md:text-right rtl:md:text-left text-center">
                                                        <span className="text-xs text-white-dark lg:pt-0 pt-2 block">
                                                            <button className="text-danger dark:text-primary font-semibold text-sm mr-1">Vincent, Mary</button>
                                                            and 19 other like this
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </ReactSortable>
                        </div>
                    </div>
                </div>
                {/* Delete */}
                <div className="panel">
                    <div className="font-semibold text-lg dark:text-white mb-5">Delete User</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                        <div>
                            <ul id="example7">
                                <ReactSortable
                                    list={delete1}
                                    setList={setDelete1}
                                    animation={200}
                                    group="delete"
                                    removeOnSpill={true}
                                    //
                                    onSpill={(evt) => {
                                        const toRemoved = delete1[evt.oldIndex];
                                        setDelete1(delete1.filter((item) => item !== toRemoved));
                                    }}
                                    className="min-h-[200px]"
                                >
                                    {delete1.map((item) => {
                                        return (
                                            <li key={item.id} className="mb-2.5 cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full mx-auto" />
                                                    </div>
                                                    <div className="flex md:flex-row flex-col justify-between items-center flex-1 text-center md:text-left">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ReactSortable>
                            </ul>
                        </div>

                        <div>
                            <ul id="example8">
                                <ReactSortable
                                    list={delete2}
                                    setList={setDelete2}
                                    animation={200}
                                    group="delete"
                                    removeOnSpill={true}
                                    onSpill={(evt) => {
                                        const toRemoved = delete2[evt.oldIndex];
                                        setDelete2(delete2.filter((item) => item !== toRemoved));
                                    }}
                                    className="min-h-[200px]"
                                >
                                    {delete2.map((item) => {
                                        return (
                                            <li key={item.id} className="mb-2.5 cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full mx-auto" />
                                                    </div>
                                                    <div className="flex md:flex-row flex-col justify-between items-center flex-1 text-center md:text-left">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ReactSortable>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Grid drag */}
                <div className="dragndrop space-y-8">
                    <div className="panel">
                        <div className="font-semibold text-lg dark:text-white mb-5">Grid drag</div>
                        <div id="example11">
                            <ReactSortable list={gridDrag} setList={setGridDrag} animation={200} className="grid grid-cols-2 xs sm:grid-cols-4 md:grid-cols-8 gap-8 place-items-center">
                                {gridDrag.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className="w-24 h-24 border border-white-light rounded-md shadow dark:border-dark flex items-center justify-center font-semibold cursor-grab"
                                        >
                                            {item.name}
                                        </div>
                                    );
                                })}
                            </ReactSortable>
                        </div>
                    </div>
                </div>
                {/* Swap */}
                <div className="panel">
                    <div className="font-semibold text-lg dark:text-white mb-5">Swap</div>
                    <div>
                        <div>
                            <ul id="example7">
                                <ReactSortable list={swap} setList={setSwap} animation={200} swap={true} swapThreshold={1} className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2.5">
                                    {swap.map((item) => {
                                        return (
                                            <li key={item.id} className=" cursor-grab">
                                                <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                    <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                        <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full mx-auto" />
                                                    </div>
                                                    <div className="flex md:flex-row flex-col justify-between items-center flex-1 text-center md:text-left">
                                                        <div className="font-semibold md:my-0 my-3">
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                            <div className="text-white-dark text-xs">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ReactSortable>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DragAndDrop;
