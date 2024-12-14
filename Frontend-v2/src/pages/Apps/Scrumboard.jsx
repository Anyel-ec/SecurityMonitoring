import Dropdown from '../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';
import IconPlusCircle from '../../components/Icon/IconPlusCircle';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconTag from '../../components/Icon/IconTag';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconEdit from '../../components/Icon/IconEdit';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconX from '../../components/Icon/IconX';

const Scrumboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Scrumboard'));
    });
    const [projectList, setProjectList] = useState([
        {
            id: 1,
            title: 'In Progress',
            tasks: [
                {
                    projectId: 1,
                    id: 1,
                    title: 'Creating a new Portfolio on Dribble',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    image: true,
                    date: ' 08 Aug, 2020',
                    tags: ['designing'],
                },
                {
                    projectId: 1,
                    id: 2,
                    title: 'Singapore Team Meet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    date: ' 09 Aug, 2020',
                    tags: ['meeting'],
                },
            ],
        },
        {
            id: 2,
            title: 'Pending',
            tasks: [
                {
                    projectId: 2,
                    id: 3,
                    title: 'Plan a trip to another country',
                    description: '',
                    date: ' 10 Sep, 2020',
                },
            ],
        },
        {
            id: 3,
            title: 'Complete',
            tasks: [
                {
                    projectId: 3,
                    id: 4,
                    title: 'Dinner with Kelly Young',
                    description: '',
                    date: ' 08 Aug, 2020',
                },
                {
                    projectId: 3,
                    id: 5,
                    title: 'Launch New SEO Wordpress Theme ',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    date: ' 09 Aug, 2020',
                },
            ],
        },
        {
            id: 4,
            title: 'Working',
            tasks: [],
        },
    ]);
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const changeValue = (e) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };
    const [params, setParams] = useState({
        id: null,
        title: '',
    });
    const [paramsTask, setParamsTask] = useState({
        projectId: null,
        id: null,
        title: '',
        description: '',
        tags: '',
        date: '',
    });

    const [selectedTask, setSelectedTask] = useState(null);
    const [isAddProjectModal, setIsAddProjectModal] = useState(false);
    const [isAddTaskModal, setIsAddTaskModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const addEditProject = (project = null) => {
        setTimeout(() => {
            setParams({
                id: null,
                title: '',
            });
            if (project) {
                let projectData = JSON.parse(JSON.stringify(project));
                setParams(projectData);
            }
            setIsAddProjectModal(true);
        });
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const saveProject = () => {
        if (!params.title) {
            showMessage('Title is required.', 'error');
            return false;
        }

        if (params.id) {
            //update project
            const project = projectList.find((d) => d.id === params.id);
            project.title = params.title;
        } else {
            //add project
            const lastId = projectList.reduce((max, obj) => (obj.id > max ? obj.id : max), projectList[0].id) || 0;

            const project = {
                id: lastId + 1,
                title: params.title,
                tasks: [],
            };
            projectList.push(project);
        }

        showMessage('Project has been saved successfully.');
        setIsAddProjectModal(false);
    };

    const deleteProject = (project) => {
        setProjectList(projectList.filter((d) => d.id !== project.id));
        showMessage('Project has been deleted successfully.');
    };

    const clearProjects = (project) => {
        setParamsTask((project.tasks = []));
    };

    const addTaskData = (e) => {
        const { value, id } = e.target;
        setParamsTask({ ...paramsTask, [id]: value });
    };

    const addEditTask = (projectId, task = null) => {
        setParamsTask({
            projectId: projectId,
            id: null,
            title: '',
            description: '',
            tags: '',
            date: '',
        });
        if (task) {
            let data = JSON.parse(JSON.stringify(task));
            data.projectId = projectId;
            data.tags = data.tags ? data.tags.toString() : '';
            setParamsTask(data);
        }
        setIsAddTaskModal(true);
    };

    const saveTask = () => {
        if (!paramsTask.title) {
            showMessage('Title is required.', 'error');
            return false;
        }
        const project = projectList.find((d) => d.id === paramsTask.projectId);
        if (paramsTask.id) {
            //update task
            const task = project.tasks.find((d) => d.id === paramsTask.id);
            task.title = paramsTask.title;
            task.description = paramsTask.description;
            task.tags = paramsTask.tags?.length > 0 ? paramsTask.tags.split(',') : [];
        } else {
            //add task
            let maxId = 0;
            maxId = project.tasks?.length ? project.tasks.reduce((max, obj) => (obj.id > max ? obj.id : max), project.tasks[0].id) : 0;

            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth()); //January is 0!
            const yyyy = today.getFullYear();
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const task = {
                projectId: paramsTask.projectId,
                id: maxId + 1,
                title: paramsTask.title,
                description: paramsTask.description,
                date: dd + ' ' + monthNames[mm] + ', ' + yyyy,
                tags: paramsTask.tags?.length > 0 ? paramsTask.tags.split(',') : [],
            };
            setParamsTask(project.tasks.push(task));
        }

        showMessage('Task has been saved successfully.');
        setIsAddTaskModal(false);
    };

    const deleteConfirmModal = (projectId, task = null) => {
        setSelectedTask(task);
        setTimeout(() => {
            setIsDeleteModal(true);
        }, 10);
    };
    const deleteTask = () => {
        let project = projectList.find((d) => d.id === selectedTask.projectId);
        project.tasks = project.tasks.filter((d) => d.id !== selectedTask.id);
        showMessage('Task has been deleted successfully.');
        setIsDeleteModal(false);
    };

    return (
        <div>
            <div>
                <button
                    type="button"
                    className="btn btn-primary flex"
                    onClick={() => {
                        addEditProject();
                    }}
                >
                    <IconPlus className="w-5 h-5 ltr:mr-3 rtl:ml-3" />
                    Add Project
                </button>
            </div>
            {/* project list  */}
            <div className="relative pt-5">
                <div className="perfect-scrollbar h-full -mx-2">
                    <div className="overflow-x-auto flex items-start flex-nowrap gap-5 pb-2 px-2">
                        {projectList.map((project) => {
                            return (
                                <div key={project.id} className="panel w-80 flex-none" data-group={project.id}>
                                    <div className="flex justify-between mb-5">
                                        <h4 className="text-base font-semibold">{project.title}</h4>

                                        <div className="flex items-center">
                                            <button onClick={() => addEditTask(project.id)} type="button" className="hover:text-primary ltr:mr-2 rtl:ml-2">
                                                <IconPlusCircle />
                                            </button>
                                            <div className="dropdown">
                                                <Dropdown
                                                    offset={[0, 5]}
                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                    button={<IconHorizontalDots className="opacity-70 hover:opacity-100" />}
                                                >
                                                    <ul>
                                                        <li>
                                                            <button type="button" onClick={() => addEditProject(project)}>
                                                                Edit
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={() => deleteProject(project)}>
                                                                Delete
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={() => clearProjects(project)}>
                                                                Clear All
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                    <ReactSortable
                                        list={project.tasks}
                                        setList={(newState, sortable) => {
                                            if (sortable) {
                                                const groupId = sortable.el.closest('[data-group]')?.getAttribute('data-group') || 0;
                                                const newList = projectList.map((task) => {
                                                    if (parseInt(task.id) === parseInt(groupId)) {
                                                        task.tasks = newState;
                                                    }

                                                    return task;
                                                });
                                                setProjectList(newList);
                                            }
                                        }}
                                        animation={200}
                                        group={{ name: 'shared', pull: true, put: true }}
                                        ghostClass="sortable-ghost"
                                        dragClass="sortable-drag"
                                        className="connect-sorting-content min-h-[150px]"
                                    >
                                        {project.tasks.map((task) => {
                                            return (
                                                <div className="sortable-list " key={project.id + '' + task.id}>
                                                    <div className="shadow bg-[#f4f4f4] dark:bg-white-dark/20 p-3 pb-5 rounded-md mb-5 space-y-3 cursor-move">
                                                        {task.image ? <img src="/assets/images/carousel1.jpeg" alt="images" className="h-32 w-full object-cover rounded-md" /> : ''}
                                                        <div className="text-base font-medium">{task.title}</div>
                                                        <p className="break-all">{task.description}</p>
                                                        <div className="flex gap-2 items-center flex-wrap">
                                                            {task.tags?.length ? (
                                                                task.tags.map((tag, i) => {
                                                                    return (
                                                                        <div key={i} className="btn px-2 py-1 flex btn-outline-primary">
                                                                            <IconTag className="shrink-0" />
                                                                            <span className="ltr:ml-2 rtl:mr-2">{tag}</span>
                                                                        </div>
                                                                    );
                                                                })
                                                            ) : (
                                                                <div className="btn px-2 py-1 flex text-white-dark dark:border-white-dark/50 shadow-none">
                                                                    <IconTag className="shrink-0" />
                                                                    <span className="ltr:ml-2 rtl:mr-2">No Tags</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="font-medium flex items-center hover:text-primary">
                                                                <IconCalendar className="ltr:mr-3 rtl:ml-3 shrink-0" />
                                                                <span>{task.date}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <button onClick={() => addEditTask(project.id, task)} type="button" className="hover:text-info">
                                                                    <IconEdit className="ltr:mr-3 rtl:ml-3" />
                                                                </button>
                                                                <button onClick={() => deleteConfirmModal(project.id, task)} type="button" className="hover:text-danger">
                                                                    <IconTrashLines />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </ReactSortable>
                                    <div className="pt-3">
                                        <button type="button" className="btn btn-primary mx-auto" onClick={() => addEditTask(project.id)}>
                                            <IconPlus />
                                            Add Task
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* add project modal */}
            <Transition appear show={isAddProjectModal} as={Fragment}>
                <Dialog as="div" open={isAddProjectModal} onClose={() => setIsAddProjectModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] px-4 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddProjectModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Project' : 'Add Project'}
                                    </div>
                                    <div className="p-5">
                                        <form onSubmit={saveProject}>
                                            <div className="grid gap-5">
                                                <div>
                                                    <label htmlFor="title">Name</label>
                                                    <input id="title" value={params.title} onChange={changeValue} type="text" className="form-input mt-1" placeholder="Enter Name" />
                                                </div>
                                            </div>

                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddProjectModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    {params.id ? 'Update' : 'Add'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* add task modal */}
            <Transition appear show={isAddTaskModal} as={Fragment}>
                <Dialog as="div" open={isAddTaskModal} onClose={() => setIsAddTaskModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                <button onClick={() => setIsAddTaskModal(false)} type="button" className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark hover:text-dark">
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{paramsTask.id ? 'Edit Task' : 'Add Task'}</div>
                                <div className="p-5">
                                    <form onSubmit={saveTask}>
                                        <div className="grid gap-5">
                                            <div>
                                                <label htmlFor="taskTitle">Name</label>
                                                <input id="title" value={paramsTask.title} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Name" />
                                            </div>
                                            <div>
                                                <label htmlFor="taskTag">Tag</label>
                                                <input id="tags" value={paramsTask.tags} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Tag" />
                                            </div>
                                            <div>
                                                <label htmlFor="taskdesc">Description</label>
                                                <textarea
                                                    id="description"
                                                    value={paramsTask.description}
                                                    onChange={addTaskData}
                                                    className="form-textarea min-h-[130px]"
                                                    placeholder="Enter Description"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button onClick={() => setIsAddTaskModal(false)} type="button" className="btn btn-outline-danger">
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                {paramsTask.id ? 'Update' : 'Add'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* delete task modal */}
            <Transition appear show={isDeleteModal} as={Fragment}>
                <Dialog as="div" open={isDeleteModal} onClose={() => setIsDeleteModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden md:w-full max-w-lg w-[90%] my-8">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsDeleteModal(false);
                                        }}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Delete Task</div>
                                    <div className="p-5 text-center">
                                        <div className="text-white bg-danger ring-4 ring-danger/30 p-4 rounded-full w-fit mx-auto">
                                            <IconTrashLines />
                                        </div>
                                        <div className="text-base sm:w-3/4 mx-auto mt-5">Are you sure you want to delete Task?</div>

                                        <div className="flex justify-center items-center mt-8">
                                            <button
                                                onClick={() => {
                                                    setIsDeleteModal(false);
                                                }}
                                                type="button"
                                                className="btn btn-outline-danger"
                                            >
                                                Cancel
                                            </button>
                                            <button onClick={deleteTask} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};
export default Scrumboard;
