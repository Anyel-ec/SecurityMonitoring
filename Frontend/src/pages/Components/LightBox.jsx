import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';

const getItems = [
    {
        id: '1',
        src: '/assets/images/lightbox1.jpg',
        title: 'This is dummy caption. It has been placed here solely to demonstrate the look and feel of finished, typeset text.',
        description: 'Photo: Samuel Rohl',
    },
    {
        id: '2',
        src: '/assets/images/lightbox2.jpeg',
        title: 'This is dummy caption. It has been placed here solely to demonstrate the look and feel of finished, typeset text.',
        description: 'Photo: Samuel Rohl',
    },
    {
        id: '3',
        src: '/assets/images/lightbox3.jpeg',
        title: "Dummy caption. It's Greek to you. Unless, of course, you're Greek, in which case, it really makes no sense.",
        description: 'Photo: Michael Hull',
    },
    {
        id: '4',
        src: '/assets/images/lightbox4.jpeg',
        title: 'This is dummy caption.',
        description: 'Photo: Folkert Gorter',
    },
    {
        id: '5',
        src: '/assets/images/lightbox5.jpeg',
        title: "It's a dummy caption. He who searches for meaning here will be sorely disappointed.",
        description: 'Photo: Thomas Lefebvre',
    },
    {
        id: '6',
        src: '/assets/images/lightbox6.jpeg',
        title: "It's a dummy caption. He who searches for meaning here will be sorely disappointed.",
        description: 'Photo: Thomas Lefebvre',
    },
];

const LightBox = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('LightBox'));
    });
    const [value, setValue] = useState('all controls');
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const handleChange = (e) => setValue(e.target.value);
    const [tabs] = useState('All controls');
    const [tabs1] = useState('All controls');
    useEffect(() => {
        window['global'] = window;
    }, []);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Components
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Lightbox</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                <div className="panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap">
                    <div className="ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://www.npmjs.com/package/react-image-lightbox" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://www.npmjs.com/package/react-image-lightbox
                    </a>
                </div>

                {/* Lightbox */}
                <div className="panel">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Lightbox</h5>
                    <div className="mb-5">
                        <div className="flex mb-5">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <input type="radio" value="all controls" onChange={handleChange} name="allcontrols" className="form-radio mt-1.5" checked={value === 'all controls'} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-primary">All controls</h4>
                                <p className="media-text">Caption, slideshow, thumbnails and fullscreen buttons, tap to toggle controls</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <input type="radio" value="minimal" onChange={handleChange} name="allcontrols" className="form-radio mt-1.5" checked={value === 'minimal'} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-primary">Minimal</h4>
                                <p className="media-text">No caption, no slideshow, no thumbnails, no fullscreen, tap to close</p>
                            </div>
                        </div>
                        {value === 'all controls' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
                                {tabs === 'All controls' && (
                                    <>
                                        {getItems.map((item, index) => {
                                            return (
                                                <button
                                                    type="button"
                                                    key={item.id}
                                                    className={`${index === 3 ? 'md:row-span-2 md:col-span-2' : ''}`}
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                        setPhotoIndex(index);
                                                    }}
                                                >
                                                    <img src={item.src} alt="gallery" data-fancybox="gallery" className="rounded-md w-full h-full object-cover" data-caption={item.title} />
                                                </button>
                                            );
                                        })}
                                    </>
                                )}

                                {isOpen && (
                                    <Lightbox
                                        mainSrc={`${getItems[photoIndex]?.src}`}
                                        nextSrc={`${getItems[photoIndex + (1 % getItems.length)]?.src}`}
                                        prevSrc={`${setTimeout(() => {
                                            return getItems[(photoIndex + getItems.length - 1) % getItems.length]?.src;
                                        })}`}
                                        onCloseRequest={() => setIsOpen(false)}
                                        onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % getItems.length)}
                                        onMovePrevRequest={() => setPhotoIndex((photoIndex + getItems.length - 1) % getItems.length)}
                                        imageTitle={getItems[photoIndex]?.title}
                                        imageCaption={getItems[photoIndex]?.description}
                                        animationDuration={300}
                                        keyRepeatLimit={180}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
                                {tabs1 === 'All controls' && (
                                    <>
                                        {getItems.map((item, index) => {
                                            return (
                                                <button
                                                    type="button"
                                                    key={item.id}
                                                    className={`${index === 3 ? 'md:row-span-2 md:col-span-2' : ''}`}
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                        setPhotoIndex(index);
                                                    }}
                                                >
                                                    <img src={item.src} alt="gallery" data-fancybox="gallery" className="rounded-md w-full h-full object-cover" data-caption={item.title} />
                                                </button>
                                            );
                                        })}
                                    </>
                                )}
                                {isOpen && (
                                    <Lightbox
                                        mainSrc={`${getItems[photoIndex]?.src}`}
                                        nextSrc={`${getItems[photoIndex + (1 % getItems.length)]?.src}`}
                                        prevSrc={`${setTimeout(() => {
                                            return getItems[(photoIndex + getItems.length - 1) % getItems.length]?.src;
                                        })}`}
                                        onCloseRequest={() => setIsOpen(false)}
                                        onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % getItems.length)}
                                        onMovePrevRequest={() => setPhotoIndex((photoIndex + getItems.length - 1) % getItems.length)}
                                        enableZoom={false}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LightBox;
