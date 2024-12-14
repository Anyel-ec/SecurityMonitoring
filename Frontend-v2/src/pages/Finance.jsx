import { Link } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import { useEffect } from 'react';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconEye from '../components/Icon/IconEye';
import IconBitcoin from '../components/Icon/IconBitcoin';
import IconEthereum from '../components/Icon/IconEthereum';
import IconLitecoin from '../components/Icon/IconLitecoin';
import IconBinance from '../components/Icon/IconBinance';
import IconTether from '../components/Icon/IconTether';
import IconSolana from '../components/Icon/IconSolana';
import IconCircleCheck from '../components/Icon/IconCircleCheck';
import IconInfoCircle from '../components/Icon/IconInfoCircle';

const Finance = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Finance'));
    });
    //bitcoinoption
    const bitcoin = {
        series: [
            {
                data: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //ethereumoption
    const ethereum = {
        series: [
            {
                data: [44, 25, 59, 41, 66, 25, 21, 9, 36, 12],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //litecoinoption
    const litecoin = {
        series: [
            {
                data: [9, 21, 36, 12, 66, 25, 44, 25, 41, 59],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //binanceoption
    const binance = {
        series: [
            {
                data: [25, 44, 25, 59, 41, 21, 36, 12, 19, 9],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //tetheroption
    const tether = {
        series: [
            {
                data: [21, 59, 41, 44, 25, 66, 9, 36, 25, 12],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //solanaoption
    const solana = {
        series: [
            {
                data: [21, -9, 36, -12, 44, 25, 59, -41, 66, -25],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Finance</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Users Visit</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">View Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Report</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> $170.46 </div>
                            <div className="badge bg-white/30">+ 2.35% </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 44,700
                        </div>
                    </div>

                    {/* Sessions */}
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Sessions</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">View Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Report</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 74,137 </div>
                            <div className="badge bg-white/30">- 2.35% </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 84,709
                        </div>
                    </div>

                    {/*  Time On-Site */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Time On-Site</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">View Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Report</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 38,085 </div>
                            <div className="badge bg-white/30">+ 1.35% </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 37,894
                        </div>
                    </div>

                    {/* Bounce Rate */}
                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Bounce Rate</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">View Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Report</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 49.10% </div>
                            <div className="badge bg-white/30">- 0.35% </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 50.01%
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/*  Favorites  */}
                    <div>
                        <div className="flex items-center mb-5 font-bold">
                            <span className="text-lg">Favorites</span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto text-primary hover:text-black dark:hover:text-white-dark">
                                See All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:mb-5">
                            {/*  Bitcoin  */}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                        <IconBitcoin />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">BTC</h6>
                                        <p className="text-white-dark text-xs">Bitcoin</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={bitcoin.series} options={bitcoin.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $20,000 <span className="text-success font-normal text-sm">+0.25%</span>
                                </div>
                            </div>
                            {/*  Ethereum*/}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 bg-warning rounded-full grid place-content-center p-2">
                                        <IconEthereum />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">ETH</h6>
                                        <p className="text-white-dark text-xs">Ethereum</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={ethereum.series} options={ethereum.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $21,000 <span className="text-danger font-normal text-sm">-1.25%</span>
                                </div>
                            </div>
                            {/*  Litecoin*/}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                        <IconLitecoin />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">LTC</h6>
                                        <p className="text-white-dark text-xs">Litecoin</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={litecoin.series} options={litecoin.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $11,657 <span className="text-success font-normal text-sm">+0.25%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  Prices  */}
                    <div>
                        <div className="flex items-center mb-5 font-bold">
                            <span className="text-lg">Live Prices</span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto text-primary hover:text-black dark:hover:text-white-dark">
                                See All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                            {/*  Binance */}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                        <IconBinance />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">BNB</h6>
                                        <p className="text-white-dark text-xs">Binance</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={binance.series} options={binance.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $21,000 <span className="text-danger font-normal text-sm">-1.25%</span>
                                </div>
                            </div>
                            {/*  Tether  */}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                        <IconTether />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">USDT</h6>
                                        <p className="text-white-dark text-xs">Tether</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={tether.series} options={tether.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $20,000 <span className="text-success font-normal text-sm">+0.25%</span>
                                </div>
                            </div>
                            {/*  Solana */}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 bg-warning rounded-full p-2 grid place-content-center">
                                        <IconSolana />
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">SOL</h6>
                                        <p className="text-white-dark text-xs">Solana</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={solana.series} options={solana.options} type="line" height={45} />
                                </div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    $21,000 <span className="text-danger font-normal text-sm">-1.25%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="grid gap-6 xl:grid-flow-row">
                        {/*  Previous Statement  */}
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Previous Statement</div>
                                    <div className="text-success"> Paid on June 27, 2022 </div>
                                </div>
                                <div className="dropdown">
                                    <Dropdown
                                        offset={[0, 5]}
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="hover:opacity-80"
                                        button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                    >
                                        <ul>
                                            <li>
                                                <button type="button">View Report</button>
                                            </li>
                                            <li>
                                                <button type="button">Edit Report</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                    <IconCircleCheck className="text-success opacity-20 w-full h-full" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-primary">Card Limit</div>
                                        <div className="mt-2 font-semibold text-2xl">$50,000.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Spent</div>
                                        <div className="mt-2 font-semibold text-2xl">$15,000.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Minimum</div>
                                        <div className="mt-2 font-semibold text-2xl">$2,500.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Current Statement */}
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Current Statement</div>
                                    <div className="text-danger"> Must be paid before July 27, 2022 </div>
                                </div>
                                <div className="dropdown">
                                    <Dropdown offset={[0, 5]} placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}>
                                        <ul>
                                            <li>
                                                <button type="button">View Report</button>
                                            </li>
                                            <li>
                                                <button type="button">Edit Report</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                    <IconInfoCircle className="text-danger opacity-20 w-24 h-full" />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-primary">Card Limit</div>
                                        <div className="mt-2 font-semibold text-2xl">$50,000.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Spent</div>
                                        <div className="mt-2 font-semibold text-2xl">$30,500.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Minimum</div>
                                        <div className="mt-2 font-semibold text-2xl">$8,000.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Recent Transactions  */}
                    <div className="panel">
                        <div className="mb-5 text-lg font-bold">Recent Transactions</div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                                        <th>DATE</th>
                                        <th>NAME</th>
                                        <th>AMOUNT</th>
                                        <th className="text-center ltr:rounded-r-md rtl:rounded-l-md">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-semibold">#01</td>
                                        <td className="whitespace-nowrap">Oct 08, 2021</td>
                                        <td className="whitespace-nowrap">Eric Page</td>
                                        <td>$1,358.75</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#02</td>
                                        <td className="whitespace-nowrap">Dec 18, 2021</td>
                                        <td className="whitespace-nowrap">Nita Parr</td>
                                        <td>-$1,042.82</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#03</td>
                                        <td className="whitespace-nowrap">Dec 25, 2021</td>
                                        <td className="whitespace-nowrap">Carl Bell</td>
                                        <td>$1,828.16</td>
                                        <td className="text-center">
                                            <span className="badge bg-danger/20 text-danger rounded-full hover:top-0">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#04</td>
                                        <td className="whitespace-nowrap">Nov 29, 2021</td>
                                        <td className="whitespace-nowrap">Dan Hart</td>
                                        <td>$1,647.55</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#05</td>
                                        <td className="whitespace-nowrap">Nov 24, 2021</td>
                                        <td className="whitespace-nowrap">Jake Ross</td>
                                        <td>$927.43</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#06</td>
                                        <td className="whitespace-nowrap">Jan 26, 2022</td>
                                        <td className="whitespace-nowrap">Anna Bell</td>
                                        <td>$250.00</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Finance;
