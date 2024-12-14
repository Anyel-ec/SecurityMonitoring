import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import IconArrowWaveLeftUp from '../../components/Icon/IconArrowWaveLeftUp';
import IconDesktop from '../../components/Icon/IconDesktop';
import IconUser from '../../components/Icon/IconUser';
import IconBox from '../../components/Icon/IconBox';
import IconDollarSignCircle from '../../components/Icon/IconDollarSignCircle';
import IconRouter from '../../components/Icon/IconRouter';
import IconPlusCircle from '../../components/Icon/IconPlusCircle';
import IconMinusCircle from '../../components/Icon/IconMinusCircle';
import IconPlayCircle from '../../components/Icon/IconPlayCircle';
import IconX from '../../components/Icon/IconX';

const KnowledgeBase = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Knowledge Base'));
    });
    const [activeTab, setActiveTab] = useState('general');
    const [active1, setActive1] = useState(1);
    const [active2, setActive2] = useState(1);
    const [modal, setModal] = useState(false);
    const items = [
        {
            src: '/assets/images/knowledge/image-5.jpg',
            title: 'Excessive sugar is harmful',
        },
        {
            src: '/assets/images/knowledge/image-6.jpg',
            title: 'Creative Photography',
        },
        {
            src: '/assets/images/knowledge/image-7.jpg',
            title: 'Plan your next trip',
        },
        {
            src: '/assets/images/knowledge/image-8.jpg',
            title: 'My latest Vlog',
        },
    ];

    return (
        <div>
            <div className="relative rounded-t-md bg-primary-light bg-[url('/assets/images/knowledge/pattern.png')] bg-contain bg-left-top bg-no-repeat px-5 py-10 dark:bg-black md:px-10">
                <div className="absolute -bottom-1 -end-6 hidden text-[#DBE7FF] rtl:rotate-y-180 dark:text-[#1B2E4B] lg:block xl:end-0">
                    <svg width="375" height="185" viewBox="0 0 375 185" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-72 max-w-xs xl:w-full">
                        <g clipPath="url(#clip0_1109_89938)">
                            <path
                                d="M215.023 181.044C212.702 181.042 210.477 180.122 208.836 178.487C207.196 176.851 206.274 174.633 206.274 172.321C206.274 170.008 207.196 167.79 208.836 166.155C210.477 164.519 212.702 163.599 215.023 163.598H345.07C344.415 162.401 343.45 161.403 342.275 160.707C341.099 160.01 339.757 159.643 338.39 159.642H79.8922C76.5197 159.645 73.2866 160.983 70.9034 163.36C68.5202 165.738 67.1817 168.961 67.1821 172.321C67.1838 175.68 68.523 178.902 70.9058 181.279C73.2885 183.656 76.5204 184.994 79.8922 185H338.39C339.757 184.999 341.099 184.631 342.275 183.935C343.45 183.239 344.415 182.24 345.069 181.044L215.023 181.044Z"
                                fill="currentColor"
                            />
                            <path
                                d="M345.242 168.405H221.598C221.409 168.404 221.228 168.329 221.094 168.195C220.96 168.062 220.885 167.881 220.885 167.693C220.885 167.504 220.96 167.323 221.094 167.19C221.228 167.056 221.409 166.981 221.598 166.98H345.242C345.431 166.981 345.613 167.056 345.746 167.19C345.88 167.323 345.955 167.504 345.955 167.693C345.955 167.881 345.88 168.062 345.746 168.195C345.613 168.329 345.431 168.404 345.242 168.405Z"
                                fill="currentColor"
                            />
                            <path
                                d="M345.242 173.033H221.598C221.409 173.033 221.227 172.958 221.093 172.824C220.959 172.691 220.884 172.51 220.884 172.321C220.884 172.132 220.959 171.951 221.093 171.817C221.227 171.684 221.409 171.609 221.598 171.609H345.242C345.432 171.609 345.614 171.684 345.748 171.817C345.882 171.951 345.957 172.132 345.957 172.321C345.957 172.51 345.882 172.691 345.748 172.824C345.614 172.958 345.432 173.033 345.242 173.033Z"
                                fill="currentColor"
                            />
                            <path
                                d="M345.242 177.661H221.598C221.409 177.661 221.228 177.586 221.094 177.452C220.96 177.319 220.885 177.138 220.885 176.949C220.885 176.761 220.96 176.58 221.094 176.446C221.228 176.313 221.409 176.238 221.598 176.237H345.242C345.431 176.238 345.613 176.313 345.746 176.446C345.88 176.58 345.955 176.761 345.955 176.949C345.955 177.138 345.88 177.319 345.746 177.452C345.613 177.586 345.431 177.661 345.242 177.661Z"
                                fill="currentColor"
                            />
                            <path
                                d="M181.432 156.477C179.111 156.476 176.885 155.556 175.245 153.92C173.604 152.285 172.683 150.067 172.683 147.754C172.683 145.442 173.604 143.224 175.245 141.588C176.885 139.953 179.111 139.033 181.432 139.031H311.478C310.824 137.835 309.859 136.836 308.683 136.14C307.508 135.444 306.166 135.076 304.799 135.075H46.3011C42.9286 135.079 39.6955 136.417 37.3123 138.794C34.929 141.171 33.5905 144.394 33.5908 147.754C33.5926 151.114 34.9318 154.335 37.3146 156.712C39.6974 159.089 42.9293 160.428 46.3011 160.433H304.799C306.166 160.432 307.508 160.065 308.683 159.368C309.859 158.672 310.824 157.674 311.478 156.477L181.432 156.477Z"
                                fill="#4361EE"
                            />
                            <path
                                d="M311.651 143.838H188.007C187.818 143.837 187.637 143.762 187.503 143.629C187.37 143.495 187.294 143.314 187.294 143.126C187.294 142.937 187.37 142.756 187.503 142.623C187.637 142.489 187.818 142.414 188.007 142.414H311.651C311.841 142.414 312.023 142.489 312.157 142.622C312.291 142.756 312.366 142.937 312.366 143.126C312.366 143.314 312.291 143.496 312.157 143.629C312.023 143.763 311.841 143.838 311.651 143.838Z"
                                fill="currentColor"
                            />
                            <path
                                d="M311.651 148.466H188.007C187.818 148.466 187.636 148.391 187.502 148.258C187.368 148.124 187.292 147.943 187.292 147.754C187.292 147.565 187.368 147.384 187.502 147.251C187.636 147.117 187.818 147.042 188.007 147.042H311.651C311.841 147.042 312.022 147.117 312.156 147.251C312.291 147.384 312.366 147.565 312.366 147.754C312.366 147.943 312.291 148.124 312.156 148.258C312.022 148.391 311.841 148.466 311.651 148.466Z"
                                fill="currentColor"
                            />
                            <path
                                d="M311.651 153.095H188.007C187.818 153.095 187.637 153.019 187.503 152.886C187.37 152.752 187.294 152.572 187.294 152.383C187.294 152.194 187.37 152.014 187.503 151.88C187.637 151.747 187.818 151.671 188.007 151.671H311.651C311.745 151.671 311.838 151.689 311.925 151.725C312.012 151.76 312.091 151.813 312.158 151.879C312.224 151.945 312.277 152.024 312.313 152.11C312.349 152.197 312.368 152.289 312.368 152.383C312.368 152.477 312.349 152.569 312.313 152.656C312.277 152.742 312.224 152.821 312.158 152.887C312.091 152.953 312.012 153.006 311.925 153.041C311.838 153.077 311.745 153.095 311.651 153.095Z"
                                fill="currentColor"
                            />
                            <path
                                d="M147.841 131.091C145.52 131.089 143.295 130.17 141.654 128.534C140.013 126.898 139.092 124.681 139.092 122.368C139.092 120.056 140.013 117.838 141.654 116.202C143.295 114.567 145.52 113.647 147.841 113.645H277.887C277.233 112.449 276.268 111.45 275.093 110.754C273.917 110.058 272.575 109.69 271.208 109.689H12.7101C9.33759 109.693 6.10452 111.03 3.72128 113.408C1.33804 115.785 -0.000419607 119.008 9.86767e-08 122.368C0.00170636 125.728 1.34085 128.949 3.72363 131.326C6.10641 133.703 9.33824 135.041 12.7101 135.047H271.208C272.575 135.046 273.917 134.678 275.093 133.982C276.268 133.286 277.233 132.287 277.887 131.091L147.841 131.091Z"
                                fill="currentColor"
                            />
                            <path
                                d="M278.06 118.452H154.416C154.227 118.451 154.046 118.376 153.912 118.242C153.778 118.109 153.703 117.928 153.703 117.739C153.703 117.551 153.778 117.37 153.912 117.237C154.046 117.103 154.227 117.028 154.416 117.027H278.06C278.25 117.027 278.431 117.102 278.565 117.236C278.699 117.369 278.775 117.551 278.775 117.739C278.775 117.928 278.699 118.109 278.565 118.243C278.431 118.376 278.25 118.452 278.06 118.452Z"
                                fill="currentColor"
                            />
                            <path
                                d="M278.06 123.08H154.416C154.323 123.08 154.23 123.062 154.143 123.026C154.056 122.99 153.977 122.937 153.911 122.871C153.845 122.805 153.792 122.727 153.756 122.64C153.72 122.554 153.702 122.461 153.702 122.368C153.702 122.274 153.72 122.182 153.756 122.095C153.792 122.009 153.845 121.93 153.911 121.864C153.977 121.798 154.056 121.746 154.143 121.71C154.23 121.674 154.323 121.656 154.416 121.656H278.06C278.154 121.656 278.247 121.674 278.334 121.71C278.42 121.746 278.499 121.798 278.566 121.864C278.632 121.93 278.685 122.009 278.721 122.095C278.756 122.182 278.775 122.274 278.775 122.368C278.775 122.461 278.756 122.554 278.721 122.64C278.685 122.727 278.632 122.805 278.566 122.871C278.499 122.937 278.42 122.99 278.334 123.026C278.247 123.062 278.154 123.08 278.06 123.08Z"
                                fill="currentColor"
                            />
                            <path
                                d="M278.06 127.708H154.416C154.227 127.708 154.045 127.633 153.911 127.5C153.777 127.366 153.702 127.185 153.702 126.996C153.702 126.807 153.777 126.626 153.911 126.493C154.045 126.359 154.227 126.284 154.416 126.284H278.06C278.154 126.284 278.247 126.303 278.334 126.338C278.42 126.374 278.499 126.427 278.566 126.493C278.632 126.559 278.685 126.637 278.721 126.724C278.756 126.81 278.775 126.903 278.775 126.996C278.775 127.09 278.756 127.182 278.721 127.269C278.685 127.355 278.632 127.434 278.566 127.5C278.499 127.566 278.42 127.618 278.334 127.654C278.247 127.69 278.154 127.708 278.06 127.708Z"
                                fill="currentColor"
                            />
                            <path
                                d="M280.915 76.9348C280.237 76.9337 279.585 76.676 279.09 76.2137C278.595 75.7514 278.296 75.1191 278.251 74.4449L277.854 68.4086C277.808 67.7035 278.045 67.009 278.512 66.4778C278.98 65.9466 279.64 65.6222 280.348 65.576L327.814 62.479C328.562 62.4301 329.313 62.5286 330.023 62.7688C330.733 63.009 331.388 63.3861 331.952 63.8787C332.516 64.3713 332.977 64.9697 333.308 65.6398C333.64 66.3098 333.836 67.0383 333.885 67.7838C333.934 68.5292 333.835 69.277 333.594 69.9844C333.353 70.6918 332.974 71.345 332.48 71.9066C331.985 72.4682 331.385 72.9274 330.712 73.2577C330.04 73.5881 329.308 73.7833 328.56 73.8321L281.094 76.929C281.034 76.9328 280.975 76.9347 280.915 76.9348Z"
                                fill="#4361EE"
                            />
                            <path
                                d="M290.275 77.713C289.583 77.7119 288.919 77.4442 288.421 76.9662C287.924 76.4881 287.631 75.8366 287.604 75.1482L287.266 66.1324C287.253 65.7828 287.309 65.434 287.431 65.106C287.553 64.778 287.739 64.4772 287.978 64.2208C288.217 63.9644 288.504 63.7573 288.823 63.6115C289.142 63.4657 289.487 63.3839 289.838 63.3709L328.871 61.9174C329.579 61.891 330.27 62.1462 330.789 62.6268C331.309 63.1074 331.616 63.7741 331.643 64.4801L331.981 73.496C331.994 73.8456 331.938 74.1944 331.816 74.5224C331.694 74.8504 331.508 75.1512 331.269 75.4076C331.03 75.664 330.743 75.8711 330.424 76.0169C330.104 76.1627 329.76 76.2445 329.409 76.2575L290.376 77.711C290.342 77.7124 290.308 77.713 290.275 77.713Z"
                                fill="#2F2E41"
                            />
                            <path
                                d="M336.015 160.823H329.943C329.234 160.822 328.555 160.541 328.054 160.041C327.552 159.542 327.27 158.865 327.27 158.159V107.741C327.27 107.035 327.552 106.358 328.054 105.858C328.555 105.359 329.234 105.078 329.943 105.077H336.015C336.724 105.078 337.404 105.359 337.905 105.858C338.406 106.358 338.688 107.035 338.689 107.741V158.159C338.688 158.865 338.406 159.542 337.905 160.041C337.404 160.541 336.724 160.822 336.015 160.823Z"
                                fill="#2F2E41"
                            />
                            <path
                                d="M309.066 134.173L303.873 131.037C303.268 130.67 302.833 130.079 302.664 129.393C302.495 128.707 302.606 127.982 302.973 127.378L329.203 84.2625C329.571 83.6589 330.165 83.2254 330.853 83.0572C331.542 82.889 332.269 82.9998 332.876 83.3652L338.068 86.5008C338.674 86.8676 339.109 87.4588 339.278 88.1448C339.446 88.8308 339.335 89.5554 338.969 90.1599L312.738 133.275C312.37 133.879 311.777 134.312 311.088 134.481C310.4 134.649 309.672 134.538 309.066 134.173Z"
                                fill="#2F2E41"
                            />
                            <path
                                d="M326.794 52.4612C338.38 52.4612 347.773 43.1029 347.773 31.5589C347.773 20.0148 338.38 10.6565 326.794 10.6565C315.207 10.6565 305.814 20.0148 305.814 31.5589C305.814 43.1029 315.207 52.4612 326.794 52.4612Z"
                                fill="#4361EE"
                            />
                            <path
                                d="M315.438 38.6956C314.763 38.4746 314.143 38.1123 313.621 37.6329C313.274 37.2907 313.007 36.8771 312.838 36.4212C312.67 35.9654 312.603 35.4782 312.643 34.9939C312.665 34.6488 312.766 34.3135 312.94 34.0141C313.113 33.7147 313.354 33.4593 313.643 33.268C314.393 32.7885 315.397 32.7871 316.419 33.2357L316.38 25.0757L317.203 25.0718L317.248 34.6647L316.614 34.2674C315.879 33.8075 314.829 33.4838 314.088 33.958C313.904 34.0833 313.752 34.249 313.644 34.4423C313.535 34.6355 313.473 34.8511 313.462 35.0723C313.434 35.4331 313.484 35.7956 313.61 36.1351C313.735 36.4747 313.933 36.7833 314.189 37.04C315.097 37.9046 316.423 38.175 317.934 38.4166L317.804 39.2258C317.001 39.1199 316.209 38.9424 315.438 38.6956Z"
                                fill="#2F2E41"
                            />
                            <path d="M307.899 24.6635L307.791 25.4761L312.184 26.0541L312.292 25.2415L307.899 24.6635Z" fill="#2F2E41" />
                            <path d="M321.765 26.4873L321.657 27.2998L326.05 27.8778L326.158 27.0653L321.765 26.4873Z" fill="#2F2E41" />
                            <path
                                d="M344.312 121.268H308.934C308.007 121.267 307.119 120.9 306.463 120.247C305.808 119.593 305.439 118.708 305.438 117.784L312.844 61.1985C312.85 60.2791 313.221 59.3994 313.876 58.7516C314.531 58.1038 315.416 57.7405 316.339 57.7412H328.894C333.908 57.7469 338.716 59.7341 342.262 63.267C345.808 66.7999 347.803 71.5899 347.808 76.5861V117.784C347.807 118.708 347.438 119.593 346.783 120.247C346.127 120.9 345.239 121.267 344.312 121.268Z"
                                fill="#2F2E41"
                            />
                            <path
                                d="M374.749 98.9713C374.967 99.4372 375.046 99.9562 374.975 100.466C374.905 100.975 374.688 101.453 374.351 101.843L370.381 106.42C370.152 106.685 369.872 106.902 369.558 107.059C369.245 107.216 368.903 107.31 368.553 107.336C368.202 107.361 367.851 107.318 367.517 107.208C367.184 107.098 366.876 106.923 366.61 106.695L330.615 75.7111C330.048 75.2228 329.582 74.6279 329.246 73.9603C328.909 73.2928 328.707 72.5657 328.653 71.8205C328.598 71.0754 328.691 70.3268 328.927 69.6175C329.163 68.9083 329.536 68.2522 330.027 67.6869C330.517 67.1215 331.114 66.6579 331.784 66.3226C332.454 65.9872 333.184 65.7866 333.932 65.7323C334.68 65.678 335.431 65.7711 336.143 66.0061C336.855 66.2411 337.513 66.6136 338.081 67.1021L374.075 98.0854C374.36 98.33 374.59 98.6319 374.749 98.9713Z"
                                fill="#4361EE"
                            />
                            <path
                                d="M366.804 88.7464C367.023 89.2124 367.101 89.7313 367.031 90.2408C366.96 90.7503 366.743 91.2286 366.406 91.6181L359.626 99.4367C359.162 99.9706 358.505 100.299 357.798 100.351C357.091 100.402 356.392 100.172 355.855 99.7109L326.298 74.2689C326.032 74.0402 325.815 73.7616 325.657 73.449C325.499 73.1364 325.405 72.7959 325.379 72.447C325.354 72.0981 325.398 71.7475 325.508 71.4154C325.618 71.0833 325.793 70.7761 326.023 70.5114L332.803 62.6929C333.032 62.4282 333.312 62.2111 333.626 62.054C333.939 61.897 334.281 61.803 334.631 61.7776C334.982 61.7521 335.333 61.7956 335.667 61.9056C336 62.0157 336.308 62.19 336.574 62.4187L366.131 87.8606C366.416 88.1052 366.645 88.4071 366.804 88.7464Z"
                                fill="#2F2E41"
                            />
                            <path
                                d="M327.186 19.1616C324.381 16.8493 320.632 19.0362 317.461 18.7258C314.426 18.4289 311.984 15.7684 311.319 12.9054C310.542 9.56531 312.225 6.1724 314.761 4.03273C317.537 1.68928 321.265 0.961046 324.818 1.31764C328.89 1.72635 332.641 3.54275 336.019 5.76177C339.277 7.83543 342.284 10.2778 344.979 13.0401C347.394 15.5981 349.457 18.6626 350.164 22.1529C350.806 25.3248 350.43 28.8604 348.593 31.5925C347.617 32.9935 346.296 34.1205 344.757 34.8647C343.153 35.6876 341.436 36.2867 339.884 37.2122C337.538 38.6116 335.286 41.4636 336.084 44.3721C336.256 45.0075 336.582 45.5912 337.033 46.0718C337.575 46.6488 338.517 45.8549 337.974 45.2763C337.019 44.2601 337.03 42.8806 337.505 41.6368C338.071 40.2346 339.098 39.0655 340.418 38.321C342.042 37.3544 343.844 36.7426 345.511 35.8587C347.107 35.0498 348.484 33.8686 349.523 32.4156C351.485 29.5881 352.018 25.9466 351.497 22.5971C350.934 18.9723 348.996 15.7055 346.594 12.9827C343.98 10.0194 340.791 7.52961 337.539 5.30018C334.05 2.90798 330.207 0.902431 325.984 0.230686C322.323 -0.351613 318.377 0.124257 315.224 2.16544C312.282 4.07076 310.059 7.29454 309.899 10.8528C309.849 12.4714 310.232 14.0742 311.009 15.4963C311.787 16.9184 312.931 18.1084 314.323 18.9438C315.751 19.7588 317.4 20.1066 319.036 19.9381C320.787 19.7932 322.531 19.2252 324.298 19.3403C325.097 19.3735 325.864 19.6653 326.481 20.1715C327.094 20.6767 327.794 19.6626 327.186 19.1616Z"
                                fill="#2F2E41"
                            />
                            <path
                                d="M302.517 128.106C302.524 128.06 302.533 128.014 302.543 127.968C302.616 127.625 302.757 127.301 302.957 127.013C303.157 126.725 303.412 126.48 303.708 126.291L308.81 123.012C309.406 122.63 310.13 122.499 310.823 122.648C311.516 122.797 312.121 123.214 312.506 123.807L328.245 148.119C328.63 148.713 328.762 149.434 328.612 150.125C328.462 150.815 328.044 151.419 327.448 151.802L322.345 155.08C321.749 155.463 321.025 155.594 320.332 155.445C319.639 155.296 319.034 154.879 318.649 154.286L302.91 129.974C302.55 129.421 302.41 128.756 302.517 128.106Z"
                                fill="#2F2E41"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_1109_89938">
                                <rect width="375" height="185" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className="relative">
                    <div className="flex flex-col items-center justify-center sm:-ms-32 sm:flex-row xl:-ms-60">
                        <div className="mb-2 flex gap-1 text-end text-base leading-5 sm:flex-col xl:text-xl">
                            <span>It's free </span>
                            <span>For everyone</span>
                        </div>
                        <div className="me-4 ms-2 hidden sm:block text-[#0E1726] dark:text-white rtl:rotate-y-180">
                            <IconArrowWaveLeftUp className="w-16 xl:w-28" />
                        </div>
                        <div className="mb-2 text-center text-2xl font-bold dark:text-white md:text-5xl">Knowledge Base</div>
                    </div>
                    <p className="mb-9 text-center text-base font-semibold">Search instant answers & questions asked by popular users</p>
                    <form action="" method="" className="mb-6">
                        <div className="relative mx-auto max-w-[580px]">
                            <input type="text" placeholder="Ask a question" className="form-input py-3 ltr:pr-[100px] rtl:pl-[100px]" />
                            <button type="button" className="btn btn-primary absolute top-1 shadow-none ltr:right-1 rtl:left-1">
                                Search
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-wrap items-center justify-center gap-2 font-semibold text-[#2196F3] sm:gap-5">
                        <div className="whitespace-nowrap font-medium text-black dark:text-white">Popular topics :</div>
                        <div className="flex items-center justify-center gap-2 sm:gap-5">
                            <Link to="#" className="duration-300 hover:underline">
                                Sales
                            </Link>
                            <Link to="#" className="duration-300 hover:underline">
                                Charts
                            </Link>
                            <Link to="#" className="duration-300 hover:underline">
                                Finance
                            </Link>
                            <Link to="#" className="duration-300 hover:underline">
                                Trending
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-12 flex items-center rounded-b-md bg-[#DBE7FF] dark:bg-[#141F31]">
                <ul className="mx-auto flex items-center gap-5 overflow-auto whitespace-nowrap px-3 py-4.5 xl:gap-8">
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'general' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <IconDesktop fill={true} />

                        <h5 className="font-bold text-black dark:text-white">General</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'quick-support' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('quick-support')}
                    >
                        <IconUser fill={true} className="w-8 h-8" />

                        <h5 className="font-bold text-black dark:text-white">Quick Support</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'free-updates' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('free-updates')}
                    >
                        <IconBox fill={true} />

                        <h5 className="font-bold text-black dark:text-white">Free Updates</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'pricing' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('pricing')}
                    >
                        <IconDollarSignCircle fill={true} />

                        <h5 className="font-bold text-black dark:text-white">Pricing</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'hosting' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('hosting')}
                    >
                        <IconRouter fill={true} />

                        <h5 className="font-bold text-black dark:text-white">Hosting</h5>
                    </li>
                </ul>
            </div>
            <h3 className="mb-8 text-center text-xl font-semibold md:text-2xl">
                Some common <span className="text-primary">questions</span>
            </h3>
            <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="rounded-md bg-white dark:bg-black">
                    <div className="border-b border-white-light p-6 text-[22px] font-bold dark:border-dark dark:text-white">General topics?</div>
                    <div className="divide-y divide-white-light px-6 py-4.5 dark:divide-dark">
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active1 === 1 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive1(active1 === 1 ? null : 1)}
                            >
                                <span>How to install VRISTO Admin</span>
                                {active1 !== 1 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 1 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active1 === 2 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive1(active1 === 2 ? null : 2)}
                            >
                                <span> Where can I subscribe to your newsletter?</span>
                                {active1 !== 2 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 2 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active1 === 3 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive1(active1 === 3 ? null : 3)}
                            >
                                <span>How to install VRISTO Admin</span>
                                {active1 !== 3 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 3 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active1 === 5 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive1(active1 === 5 ? null : 5)}
                            >
                                <span>How to install VRISTO Admin</span>
                                {active1 !== 5 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 5 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                    </div>
                </div>
                <div className="rounded-md bg-white dark:bg-black">
                    <div className="border-b border-white-light p-6 text-[22px] font-bold dark:border-dark dark:text-white">Quick support & Free update</div>
                    <div className="divide-y divide-white-light px-6 py-4.5 dark:divide-dark">
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active2 === 1 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive2(active2 === 1 ? null : 1)}
                            >
                                <span>How to use Browser Sync</span>
                                {active2 !== 1 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 1 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active2 === 2 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive2(active2 === 2 ? null : 2)}
                            >
                                <span> Sidebar not rendering CSS</span>
                                {active2 !== 2 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 2 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active2 === 3 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive2(active2 === 3 ? null : 3)}
                            >
                                <span>Connect with us Personally</span>
                                {active2 !== 3 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 3 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active2 === 5 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive2(active2 === 5 ? null : 5)}
                            >
                                <span>Compilation Issue</span>
                                {active2 !== 5 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 5 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel mt-10 text-center md:mt-20">
                <h3 className="mb-2 text-xl font-bold dark:text-white md:text-2xl">Still need help?</h3>
                <div className="text-lg font-medium text-white-dark">
                    Our specialists are always happy to help. Contact us during standard business hours or email us24/7 and we'll get back to you.
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button type="button" className="btn btn-primary">
                        Contact Us
                    </button>
                    <button type="button" className="btn btn-primary">
                        Visit our community
                    </button>
                </div>
            </div>
            <div className="mt-10 flex flex-col-reverse items-center justify-between gap-5 rounded-md bg-gradient-to-tl from-[rgba(234,241,255,0.44)] to-[rgba(234,241,255,0.96)] px-6 py-2.5 dark:from-[rgba(14,23,38,0.44)] dark:to-[#0E1726] md:flex-row lg:mt-20 xl:px-16">
                <div className="flex-1 py-3.5 text-center md:text-start">
                    <h3 className="mb-2 text-xl font-bold dark:text-white md:text-2xl">Didn’t find any solutions?</h3>
                    <div className="text-lg font-medium text-white-dark">Loaded with awesome features like documentation, knowledge base forum, domain transfer, affiliates etc.</div>
                    <div className="mt-8 flex justify-center md:justify-start lg:mt-16">
                        <button type="button" className="btn btn-primary">
                            Raise support tickets
                        </button>
                    </div>
                </div>
                <div className="w-52 max-w-xs lg:w-full">
                    <img src="/assets/images/knowledge/find-solution.svg" alt="find-solution" className="w-full object-cover rtl:rotate-y-180 dark:brightness-[2.59] dark:grayscale-[83%]" />
                </div>
            </div>
            <div className="mt-10">
                <h3 className="mb-6 text-xl font-bold md:text-3xl">Popular Topics</h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-5 rounded-md border border-white-light bg-white p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),0px_12px_24px_-4px_rgba(145,158,171,0.12)] dark:border-[#1B2E4B] dark:bg-black">
                        <div className="max-h-56 overflow-hidden rounded-md">
                            <img src="/assets/images/knowledge/image-1.jpg" alt="..." className="w-full object-cover" />
                        </div>
                        <h5 className="text-xl dark:text-white">Excessive sugar is harmful</h5>
                        <div className="flex">
                            <div className="me-4 overflow-hidden rounded-full bg-white-dark">
                                <img src="/assets/images/profile-1.jpeg" className="h-11 w-11 object-cover" alt="profile1" />
                            </div>
                            <div className="flex-1">
                                <h4 className="mb-1.5 font-semibold dark:text-white">Alma Clark</h4>
                                <p>06 May</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5 rounded-md border border-white-light bg-white p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),0px_12px_24px_-4px_rgba(145,158,171,0.12)] dark:border-[#1B2E4B] dark:bg-black">
                        <div className="max-h-56 overflow-hidden rounded-md">
                            <img src="/assets/images/knowledge/image-2.jpg" alt="..." className="w-full object-cover" />
                        </div>
                        <h5 className="text-xl dark:text-white">Creative Photography</h5>
                        <div className="flex">
                            <div className="me-4 overflow-hidden rounded-full bg-white-dark">
                                <img src="/assets/images/profile-2.jpeg" className="h-11 w-11 object-cover" alt="profile1" />
                            </div>
                            <div className="flex-1">
                                <h4 className="mb-1.5 font-semibold dark:text-white">Alma Clark</h4>
                                <p>06 May</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5 rounded-md border border-white-light bg-white p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),0px_12px_24px_-4px_rgba(145,158,171,0.12)] dark:border-[#1B2E4B] dark:bg-black">
                        <div className="max-h-56 overflow-hidden rounded-md">
                            <img src="/assets/images/knowledge/image-3.jpg" alt="..." className="w-full object-cover" />
                        </div>
                        <h5 className="text-xl dark:text-white">Plan your next trip</h5>
                        <div className="flex">
                            <div className="me-4 overflow-hidden rounded-full bg-white-dark">
                                <img src="/assets/images/profile-3.jpeg" className="h-11 w-11 object-cover" alt="profile1" />
                            </div>
                            <div className="flex-1">
                                <h4 className="mb-1.5 font-semibold dark:text-white">Alma Clark</h4>
                                <p>06 May</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5 rounded-md border border-white-light bg-white p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),0px_12px_24px_-4px_rgba(145,158,171,0.12)] dark:border-[#1B2E4B] dark:bg-black">
                        <div className="max-h-56 overflow-hidden rounded-md">
                            <img src="/assets/images/knowledge/image-4.jpg" alt="..." className="w-full object-cover" />
                        </div>
                        <h5 className="text-xl dark:text-white">My latest Vlog</h5>
                        <div className="flex">
                            <div className="me-4 overflow-hidden rounded-full bg-white-dark">
                                <img src="/assets/images/profile-4.jpeg" className="h-11 w-11 object-cover" alt="profile1" />
                            </div>
                            <div className="flex-1">
                                <h4 className="mb-1.5 font-semibold dark:text-white">Alma Clark</h4>
                                <p>06 May</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 lg:mt-16">
                <h3 className="mb-6 text-xl font-bold md:text-3xl">Popular Video Tutorial</h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {items.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className="space-y-5 rounded-md border border-white-light bg-white p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),0px_12px_24px_-4px_rgba(145,158,171,0.12)] dark:border-[#1B2E4B] dark:bg-black"
                            >
                                <div className="relative h-[340px] overflow-hidden rounded-md group">
                                    <img src={item.src} alt="video tutorial" className="h-full w-full object-cover cursor-pointer" onClick={() => setModal(true)} />
                                    <button
                                        type="button"
                                        className="absolute left-1/2 top-1/2 grid h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full text-white duration-300 group-hover:scale-110"
                                        onClick={() => setModal(true)}
                                    >
                                        <IconPlayCircle className="h-[62px] w-[62px]" fill={true} />
                                    </button>
                                    <div className="absolute bottom-0 left-0 w-full bg-white/30 px-5 py-[22px] text-center text-xl text-white backdrop-blur-[5px]">Excessive sugar is harmful</div>
                                </div>
                            </div>
                        );
                    })}
                    ;
                </div>
                <Transition appear show={modal} as={Fragment}>
                    <Dialog as="div" open={modal} onClose={() => setModal(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="my-8 w-full max-w-3xl overflow-hidden">
                                        <div className="text-right">
                                            <button onClick={() => setModal(false)} type="button" className="text-white-dark hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                        <iframe title="youtube-video" src="https://www.youtube.com/embed/tgbNymZ7vqY" className="h-[250px] w-full md:h-[550px]"></iframe>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default KnowledgeBase;
