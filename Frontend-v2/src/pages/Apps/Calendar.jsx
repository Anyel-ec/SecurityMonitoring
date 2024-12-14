import FullCalendar from '@fullcalendar/react';
// import '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';
import IconX from '../../components/Icon/IconX';

const Calendar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Calendar'));
    });
    const now = new Date();
    const getMonth = (dt, add = 0) => {
        let month = dt.getMonth() + 1 + add;
        const str = (month < 10 ? '0' + month : month).toString();
        return str;
        // return dt.getMonth() < 10 ? '0' + month : month;
    };

    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'All Day Event',
            start: now.getFullYear() + '-' + getMonth(now) + '-01T14:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-02T14:30:00',
            className: 'danger',
            description: 'Aenean fermentum quam vel sapien rutrum cursus. Vestibulum imperdiet finibus odio, nec tincidunt felis facilisis eu.',
        },
        {
            id: 2,
            title: 'Site Visit',
            start: now.getFullYear() + '-' + getMonth(now) + '-07T19:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-08T14:30:00',
            className: 'primary',
            description: 'Etiam a odio eget enim aliquet laoreet. Vivamus auctor nunc ultrices varius lobortis.',
        },
        {
            id: 3,
            title: 'Product Lunching Event',
            start: now.getFullYear() + '-' + getMonth(now) + '-17T14:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-18T14:30:00',
            className: 'info',
            description: 'Proin et consectetur nibh. Mauris et mollis purus. Ut nec tincidunt lacus. Nam at rutrum justo, vitae egestas dolor.',
        },
        {
            id: 4,
            title: 'Meeting',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T10:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T10:30:00',
            className: 'danger',
            description: 'Mauris ut mauris aliquam, fringilla sapien et, dignissim nisl. Pellentesque ornare velit non mollis fringilla.',
        },
        {
            id: 5,
            title: 'Lunch',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T15:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T15:00:00',
            className: 'info',
            description: 'Integer fermentum bibendum elit in egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        },
        {
            id: 6,
            title: 'Conference',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T21:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T21:30:00',
            className: 'success',
            description:
                'Curabitur facilisis vel elit sed dapibus. Nunc sagittis ex nec ante facilisis, sed sodales purus rhoncus. Donec est sapien, porttitor et feugiat sed, eleifend quis sapien. Sed sit amet maximus dolor.',
        },
        {
            id: 7,
            title: 'Happy Hour',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T05:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T05:30:00',
            className: 'info',
            description: ' odio lectus, porttitor molestie scelerisque blandit, hendrerit sed ex. Aenean malesuada iaculis erat, vitae blandit nisl accumsan ut.',
        },
        {
            id: 8,
            title: 'Dinner',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T20:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T20:00:00',
            className: 'danger',
            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 9,
            title: 'Birthday Party',
            start: now.getFullYear() + '-' + getMonth(now) + '-27T20:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-28T20:00:00',
            className: 'success',
            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 10,
            title: 'New Talent Event',
            start: now.getFullYear() + '-' + getMonth(now, 1) + '-24T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, 1) + '-27T22:20:20',
            className: 'danger',
            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 11,
            title: 'Other new',
            start: now.getFullYear() + '-' + getMonth(now, -1) + '-13T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, -1) + '-16T22:20:20',
            className: 'primary',
            description: 'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 13,
            title: 'Upcoming Event',
            start: now.getFullYear() + '-' + getMonth(now, 1) + '-15T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, 1) + '-18T22:20:20',
            className: 'primary',
            description: 'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
    ]);
    const [isAddEventModal, setIsAddEventModal] = useState(false);
    const [minStartDate, setMinStartDate] = useState('');
    const [minEndDate, setMinEndDate] = useState('');
    const defaultParams = { id: null, title: '', start: '', end: '', description: '', type: 'primary' };
    const [params, setParams] = useState(defaultParams);
    const dateFormat = (dt) => {
        dt = new Date(dt);
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        const mins = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        dt = dt.getFullYear() + '-' + month + '-' + date + 'T' + hours + ':' + mins;
        return dt;
    };
    const editEvent = (data = null) => {
        let params = JSON.parse(JSON.stringify(defaultParams));
        setParams(params);
        if (data) {
            let obj = JSON.parse(JSON.stringify(data.event));
            setParams({
                id: obj.id ? obj.id : null,
                title: obj.title ? obj.title : null,
                start: dateFormat(obj.start),
                end: dateFormat(obj.end),
                type: obj.classNames ? obj.classNames[0] : 'primary',
                description: obj.extendedProps ? obj.extendedProps.description : '',
            });
            setMinStartDate(new Date());
            setMinEndDate(dateFormat(obj.start));
        } else {
            setMinStartDate(new Date());
            setMinEndDate(new Date());
        }
        setIsAddEventModal(true);
    };
    const editDate = (data) => {
        let obj = {
            event: {
                start: data.start,
                end: data.end,
            },
        };
        editEvent(obj);
    };

    const saveEvent = () => {
        if (!params.title) {
            return true;
        }
        if (!params.start) {
            return true;
        }
        if (!params.end) {
            return true;
        }
        if (params.id) {
            //update event
            let dataevent = events || [];
            let event = dataevent.find((d) => d.id === parseInt(params.id));
            event.title = params.title;
            event.start = params.start;
            event.end = params.end;
            event.description = params.description;
            event.className = params.type;

            setEvents([]);
            setTimeout(() => {
                setEvents(dataevent);
            });
        } else {
            //add event
            let maxEventId = 0;
            if (events) {
                maxEventId = events.reduce((max, character) => (character.id > max ? character.id : max), events[0].id);
            }
            maxEventId = maxEventId + 1;
            let event = {
                id: maxEventId,
                title: params.title,
                start: params.start,
                end: params.end,
                description: params.description,
                className: params.type,
            };
            let dataevent = events || [];
            dataevent = dataevent.concat([event]);
            setTimeout(() => {
                setEvents(dataevent);
            });
        }
        showMessage('Event has been saved successfully.');
        setIsAddEventModal(false);
    };
    const startDateChange = (event) => {
        const dateStr = event.target.value;
        if (dateStr) {
            setMinEndDate(dateFormat(dateStr));
            setParams({ ...params, start: dateStr, end: '' });
        }
    };
    const changeValue = (e) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
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

    return (
        <div>
            <div className="panel mb-5">
                <div className="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center">
                    <div className="sm:mb-0 mb-4">
                        <div className="text-lg font-semibold ltr:sm:text-left rtl:sm:text-right text-center">Calendar</div>
                        <div className="flex items-center mt-2 flex-wrap sm:justify-start justify-center">
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-primary"></div>
                                <div>Work</div>
                            </div>
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-info"></div>
                                <div>Travel</div>
                            </div>
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-success"></div>
                                <div>Personal</div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-danger"></div>
                                <div>Important</div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => editEvent()}>
                        <IconPlus className="ltr:mr-2 rtl:ml-2" />
                        Create Event
                    </button>
                </div>
                <div className="calendar-wrapper">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        editable={true}
                        dayMaxEvents={true}
                        selectable={true}
                        droppable={true}
                        eventClick={(event) => editEvent(event)}
                        select={(event) => editDate(event)}
                        events={events}
                    />
                </div>
            </div>

            {/* add event modal */}
            <Transition appear show={isAddEventModal} as={Fragment}>
                <Dialog as="div" onClose={() => setIsAddEventModal(false)} open={isAddEventModal} className="relative z-[51]">
                    <Transition.Child
                        as={Fragment}
                        enter="duration-300 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="duration-300 ease-out"
                                enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100"
                                leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100"
                                leave-to="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        onClick={() => setIsAddEventModal(false)}
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Event' : 'Add Event'}
                                    </div>
                                    <div className="p-5">
                                        <form className="space-y-5">
                                            <div>
                                                <label htmlFor="title">Event Title :</label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    name="title"
                                                    className="form-input"
                                                    placeholder="Enter Event Title"
                                                    value={params.title || ''}
                                                    onChange={(e) => changeValue(e)}
                                                    required
                                                />
                                                <div className="text-danger mt-2" id="titleErr"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="dateStart">From :</label>
                                                <input
                                                    id="start"
                                                    type="datetime-local"
                                                    name="start"
                                                    className="form-input"
                                                    placeholder="Event Start Date"
                                                    value={params.start || ''}
                                                    min={minStartDate}
                                                    onChange={(event) => startDateChange(event)}
                                                    required
                                                />
                                                <div className="text-danger mt-2" id="startDateErr"></div>
                                            </div>
                                            <div>
                                                <label htmlFor="dateEnd">To :</label>
                                                <input
                                                    id="end"
                                                    type="datetime-local"
                                                    name="end"
                                                    className="form-input"
                                                    placeholder="Event End Date"
                                                    value={params.end || ''}
                                                    min={minEndDate}
                                                    onChange={(e) => changeValue(e)}
                                                    required
                                                />
                                                <div className="text-danger mt-2" id="endDateErr"></div>
                                            </div>
                                            <div>
                                                <label htmlFor="description">Event Description :</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    className="form-textarea min-h-[130px]"
                                                    placeholder="Enter Event Description"
                                                    value={params.description || ''}
                                                    onChange={(e) => changeValue(e)}
                                                ></textarea>
                                            </div>
                                            <div>
                                                <label>Badge:</label>
                                                <div className="mt-3">
                                                    <label className="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                                                        <input
                                                            type="radio"
                                                            className="form-radio"
                                                            name="type"
                                                            value="primary"
                                                            checked={params.type === 'primary'}
                                                            onChange={(e) => setParams({ ...params, type: e.target.value })}
                                                        />
                                                        <span className="ltr:pl-2 rtl:pr-2">Work</span>
                                                    </label>
                                                    <label className="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-info"
                                                            name="type"
                                                            value="info"
                                                            checked={params.type === 'info'}
                                                            onChange={(e) => setParams({ ...params, type: e.target.value })}
                                                        />
                                                        <span className="ltr:pl-2 rtl:pr-2">Travel</span>
                                                    </label>
                                                    <label className="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-success"
                                                            name="type"
                                                            value="success"
                                                            checked={params.type === 'success'}
                                                            onChange={(e) => setParams({ ...params, type: e.target.value })}
                                                        />
                                                        <span className="ltr:pl-2 rtl:pr-2">Personal</span>
                                                    </label>
                                                    <label className="inline-flex cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-danger"
                                                            name="type"
                                                            value="danger"
                                                            checked={params.type === 'danger'}
                                                            onChange={(e) => setParams({ ...params, type: e.target.value })}
                                                        />
                                                        <span className="ltr:pl-2 rtl:pr-2">Important</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex justify-end items-center !mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddEventModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" onClick={() => saveEvent()} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    {params.id ? 'Update Event' : 'Create Event'}
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
        </div>
    );
};

export default Calendar;
