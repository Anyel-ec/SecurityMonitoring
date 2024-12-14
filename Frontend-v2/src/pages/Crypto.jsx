import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import Dropdown from '../components/Dropdown';
import { setPageTitle } from '../store/themeConfigSlice';
import IconArrowLeft from '../components/Icon/IconArrowLeft';
import IconMenu from '../components/Icon/IconMenu';
import IconCaretDown from '../components/Icon/IconCaretDown';

const coins = [
    {
        id: 1,
        title: 'Bitcoin',
        alias: 'BTC',
        value: 170.46,
        perc: 2.35,
        marketcap: 148.75,
        volume: 22.9,
        supply: 18.17,
        highest: '19,891.00',
        isUp: true,
        series: [
            {
                data: [
                    {
                        x: new Date(1538778600000),
                        y: [6629.81, 6650.5, 6623.04, 6633.33],
                    },
                    {
                        x: new Date(1538780400000),
                        y: [6632.01, 6643.59, 6620, 6630.11],
                    },
                    {
                        x: new Date(1538782200000),
                        y: [6630.71, 6648.95, 6623.34, 6635.65],
                    },
                    {
                        x: new Date(1538784000000),
                        y: [6635.65, 6651, 6629.67, 6638.24],
                    },
                    {
                        x: new Date(1538785800000),
                        y: [6638.24, 6640, 6620, 6624.47],
                    },
                    {
                        x: new Date(1538787600000),
                        y: [6624.53, 6636.03, 6621.68, 6624.31],
                    },
                    {
                        x: new Date(1538789400000),
                        y: [6624.61, 6632.2, 6617, 6626.02],
                    },
                    {
                        x: new Date(1538791200000),
                        y: [6627, 6627.62, 6584.22, 6603.02],
                    },
                    {
                        x: new Date(1538793000000),
                        y: [6605, 6608.03, 6598.95, 6604.01],
                    },
                    {
                        x: new Date(1538794800000),
                        y: [6604.5, 6614.4, 6602.26, 6608.02],
                    },
                    {
                        x: new Date(1538796600000),
                        y: [6608.02, 6610.68, 6601.99, 6608.91],
                    },
                    {
                        x: new Date(1538798400000),
                        y: [6608.91, 6618.99, 6608.01, 6612],
                    },
                    {
                        x: new Date(1538800200000),
                        y: [6612, 6615.13, 6605.09, 6612],
                    },
                    {
                        x: new Date(1538802000000),
                        y: [6612, 6624.12, 6608.43, 6622.95],
                    },
                    {
                        x: new Date(1538803800000),
                        y: [6623.91, 6623.91, 6615, 6615.67],
                    },
                    {
                        x: new Date(1538805600000),
                        y: [6618.69, 6618.74, 6610, 6610.4],
                    },
                    {
                        x: new Date(1538807400000),
                        y: [6611, 6622.78, 6610.4, 6614.9],
                    },
                    {
                        x: new Date(1538809200000),
                        y: [6614.9, 6626.2, 6613.33, 6623.45],
                    },
                    {
                        x: new Date(1538811000000),
                        y: [6623.48, 6627, 6618.38, 6620.35],
                    },
                    {
                        x: new Date(1538812800000),
                        y: [6619.43, 6620.35, 6610.05, 6615.53],
                    },
                    {
                        x: new Date(1538814600000),
                        y: [6615.53, 6617.93, 6610, 6615.19],
                    },
                    {
                        x: new Date(1538816400000),
                        y: [6615.19, 6621.6, 6608.2, 6620],
                    },
                    {
                        x: new Date(1538818200000),
                        y: [6619.54, 6625.17, 6614.15, 6620],
                    },
                    {
                        x: new Date(1538820000000),
                        y: [6620.33, 6634.15, 6617.24, 6624.61],
                    },
                    {
                        x: new Date(1538821800000),
                        y: [6625.95, 6626, 6611.66, 6617.58],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        title: 'Ethereum',
        alias: 'ETH',
        value: 140.67,
        perc: 1.24,
        marketcap: 130.89,
        volume: 32.0,
        supply: 23.56,
        highest: '18,568.23',
        isUp: false,
        series: [
            {
                data: [
                    {
                        x: new Date(1538778600000),
                        y: [6624.61, 6632.2, 6617, 6626.02],
                    },
                    {
                        x: new Date(1538780400000),
                        y: [6627, 6627.62, 6584.22, 6603.02],
                    },
                    {
                        x: new Date(1538782200000),
                        y: [6605, 6608.03, 6598.95, 6604.01],
                    },
                    {
                        x: new Date(1538784000000),
                        y: [6635.65, 6651, 6629.67, 6638.24],
                    },
                    {
                        x: new Date(1538785800000),
                        y: [6638.24, 6640, 6620, 6624.47],
                    },
                    {
                        x: new Date(1538787600000),
                        y: [6612, 6615.13, 6605.09, 6612],
                    },
                    {
                        x: new Date(1538789400000),
                        y: [6612, 6624.12, 6608.43, 6622.95],
                    },
                    {
                        x: new Date(1538791200000),
                        y: [6623.91, 6623.91, 6615, 6615.67],
                    },
                    {
                        x: new Date(1538793000000),
                        y: [6618.69, 6618.74, 6610, 6610.4],
                    },
                    {
                        x: new Date(1538794800000),
                        y: [6611, 6622.78, 6610.4, 6614.9],
                    },
                    {
                        x: new Date(1538796600000),
                        y: [6600.55, 6605, 6589.14, 6593.01],
                    },
                    {
                        x: new Date(1538798400000),
                        y: [6593.15, 6605, 6592, 6603.06],
                    },
                    {
                        x: new Date(1538800200000),
                        y: [6603.07, 6604.5, 6599.09, 6603.89],
                    },
                    {
                        x: new Date(1538802000000),
                        y: [6604.44, 6604.44, 6600, 6603.5],
                    },
                    {
                        x: new Date(1538803800000),
                        y: [6603.5, 6603.99, 6597.5, 6603.86],
                    },
                    {
                        x: new Date(1538805600000),
                        y: [6635.65, 6651, 6629.67, 6638.24],
                    },
                    {
                        x: new Date(1538807400000),
                        y: [6638.24, 6640, 6620, 6624.47],
                    },
                    {
                        x: new Date(1538809200000),
                        y: [6612, 6615.13, 6605.09, 6612],
                    },
                    {
                        x: new Date(1538811000000),
                        y: [6612, 6624.12, 6608.43, 6622.95],
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        title: 'Zcash',
        alias: 'ZEC',
        value: 58.41,
        perc: 1.35,
        marketcap: 150.26,
        volume: 22.23,
        supply: 12.25,
        highest: '19,256.35',
        isUp: true,
        series: [
            {
                data: [
                    {
                        x: new Date(1538778600000),
                        y: [6623.91, 6623.91, 6615, 6615.67],
                    },
                    {
                        x: new Date(1538780400000),
                        y: [6618.69, 6618.74, 6610, 6610.4],
                    },
                    {
                        x: new Date(1538782200000),
                        y: [6611, 6622.78, 6610.4, 6614.9],
                    },
                    {
                        x: new Date(1538784000000),
                        y: [6614.9, 6626.2, 6613.33, 6623.45],
                    },
                    {
                        x: new Date(1538785800000),
                        y: [6623.48, 6627, 6618.38, 6620.35],
                    },
                    {
                        x: new Date(1538787600000),
                        y: [6619.43, 6620.35, 6610.05, 6615.53],
                    },
                    {
                        x: new Date(1538789400000),
                        y: [6615.53, 6617.93, 6610, 6615.19],
                    },
                    {
                        x: new Date(1538791200000),
                        y: [6615.19, 6621.6, 6608.2, 6620],
                    },
                    {
                        x: new Date(1538793000000),
                        y: [6619.54, 6625.17, 6614.15, 6620],
                    },
                    {
                        x: new Date(1538794800000),
                        y: [6620.33, 6634.15, 6617.24, 6624.61],
                    },
                    {
                        x: new Date(1538796600000),
                        y: [6625.95, 6626, 6611.66, 6617.58],
                    },
                    {
                        x: new Date(1538798400000),
                        y: [6619, 6625.97, 6595.27, 6598.86],
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        title: 'Litecoin',
        alias: 'LTC',
        value: 180.36,
        perc: 2.0,
        marketcap: 150.36,
        volume: 24.25,
        supply: 15.5,
        highest: '18,056.00',
        isUp: false,
        series: [
            {
                data: [
                    {
                        x: new Date(1538778600000),
                        y: [6598.03, 6600, 6588.73, 6595.97],
                    },
                    {
                        x: new Date(1538780400000),
                        y: [6595.97, 6602.01, 6588.17, 6602],
                    },
                    {
                        x: new Date(1538782200000),
                        y: [6602, 6607, 6596.51, 6599.95],
                    },
                    {
                        x: new Date(1538784000000),
                        y: [6600.63, 6601.21, 6590.39, 6591.02],
                    },
                    {
                        x: new Date(1538785800000),
                        y: [6591.02, 6603.08, 6591, 6591],
                    },
                    {
                        x: new Date(1538787600000),
                        y: [6591, 6601.32, 6585, 6592],
                    },
                    {
                        x: new Date(1538789400000),
                        y: [6593.13, 6596.01, 6610, 6608.34],
                    },
                    {
                        x: new Date(1538791200000),
                        y: [6612.34, 6604.76, 6582.63, 6593.86],
                    },
                    {
                        x: new Date(1538793000000),
                        y: [6593.86, 6604.28, 6586.57, 6600.01],
                    },
                    {
                        x: new Date(1538794800000),
                        y: [6601.81, 6603.21, 6592.78, 6596.25],
                    },
                    {
                        x: new Date(1538796600000),
                        y: [6596.25, 6604.2, 6590, 6602.99],
                    },
                    {
                        x: new Date(1538798400000),
                        y: [6602.99, 6606, 6584.99, 6587.81],
                    },
                    {
                        x: new Date(1538800200000),
                        y: [6587.81, 6595, 6583.27, 6591.96],
                    },
                    {
                        x: new Date(1538802000000),
                        y: [6591.97, 6596.07, 6585, 6588.39],
                    },
                    {
                        x: new Date(1538803800000),
                        y: [6587.6, 6598.21, 6587.6, 6594.27],
                    },
                    {
                        x: new Date(1538805600000),
                        y: [6596.44, 6601, 6590, 6596.55],
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        title: 'Binance',
        alias: 'BNB',
        value: 160.23,
        perc: 1.23,
        marketcap: 180.36,
        volume: 20.2,
        supply: 22.5,
        highest: '19,500.00',
        isUp: true,
        series: [
            {
                data: [
                    {
                        x: new Date(1538778600000),
                        y: [6612.34, 6604.76, 6582.63, 6593.86],
                    },
                    {
                        x: new Date(1538780400000),
                        y: [6593.86, 6604.28, 6586.57, 6600.01],
                    },
                    {
                        x: new Date(1538782200000),
                        y: [6601.81, 6603.21, 6592.78, 6596.25],
                    },
                    {
                        x: new Date(1538784000000),
                        y: [6596.25, 6604.2, 6590, 6602.99],
                    },
                    {
                        x: new Date(1538785800000),
                        y: [6602.99, 6606, 6584.99, 6587.81],
                    },
                    {
                        x: new Date(1538787600000),
                        y: [6587.81, 6595, 6583.27, 6591.96],
                    },
                    {
                        x: new Date(1538789400000),
                        y: [6591.97, 6596.07, 6585, 6588.39],
                    },
                    {
                        x: new Date(1538791200000),
                        y: [6587.6, 6598.21, 6587.6, 6594.27],
                    },
                    {
                        x: new Date(1538793000000),
                        y: [6596.44, 6601, 6590, 6596.55],
                    },
                    {
                        x: new Date(1538794800000),
                        y: [6598.91, 6605, 6596.61, 6600.02],
                    },
                    {
                        x: new Date(1538796600000),
                        y: [6600.55, 6605, 6589.14, 6593.01],
                    },
                ],
            },
        ],
    },
    {
        id: 6,
        title: 'Solana',
        alias: 'SOL',
        value: 150.89,
        perc: 2.0,
        marketcap: 180.45,
        volume: 23.0,
        supply: 20.22,
        highest: '18059.50',
        isUp: false,
        series: [
            {
                data: [
                    {
                        x: new Date(1538778600000),
                        y: [6596.25, 6604.2, 6590, 6602.99],
                    },
                    {
                        x: new Date(1538780400000),
                        y: [6602.99, 6606, 6584.99, 6587.81],
                    },
                    {
                        x: new Date(1538782200000),
                        y: [6587.81, 6595, 6583.27, 6591.96],
                    },
                    {
                        x: new Date(1538784000000),
                        y: [6591.97, 6596.07, 6585, 6588.39],
                    },
                    {
                        x: new Date(1538785800000),
                        y: [6587.6, 6598.21, 6587.6, 6594.27],
                    },
                    {
                        x: new Date(1538787600000),
                        y: [6593.15, 6605, 6592, 6603.06],
                    },
                    {
                        x: new Date(1538789400000),
                        y: [6608.91, 6618.99, 6608.01, 6612],
                    },
                    {
                        x: new Date(1538789400000),
                        y: [6635.65, 6651, 6629.67, 6638.24],
                    },
                    {
                        x: new Date(1538793000000),
                        y: [6638.24, 6640, 6620, 6624.47],
                    },
                    {
                        x: new Date(1538794800000),
                        y: [6612, 6615.13, 6605.09, 6612],
                    },
                    {
                        x: new Date(1538796600000),
                        y: [6612, 6624.12, 6608.43, 6622.95],
                    },
                    {
                        x: new Date(1538798400000),
                        y: [6623.91, 6623.91, 6615, 6615.67],
                    },
                    {
                        x: new Date(1538800200000),
                        y: [6603.5, 6603.99, 6597.5, 6603.86],
                    },
                    {
                        x: new Date(1538802000000),
                        y: [6603.85, 6605, 6600, 6604.07],
                    },
                    {
                        x: new Date(1538803800000),
                        y: [6604.98, 6606, 6604.07, 6606],
                    },
                ],
            },
        ],
    },
    {
        id: 7,
        title: 'Tether',
        alias: 'USDT',
        value: 170.84,
        perc: 1.9,
        marketcap: 185.25,
        volume: 25.25,
        supply: 20.47,
        highest: '19,800.00',
        isUp: true,
        series: [
            {
                data: [
                    {
                        x: new Date(1538778600000),
                        y: [6635.65, 6651, 6629.67, 6638.24],
                    },
                    {
                        x: new Date(1538780400000),
                        y: [6638.24, 6640, 6620, 6624.47],
                    },
                    {
                        x: new Date(1538782200000),
                        y: [6612, 6615.13, 6605.09, 6612],
                    },
                    {
                        x: new Date(1538784000000),
                        y: [6612, 6624.12, 6608.43, 6622.95],
                    },
                    {
                        x: new Date(1538785800000),
                        y: [6623.91, 6623.91, 6615, 6615.67],
                    },
                    {
                        x: new Date(1538787600000),
                        y: [6618.69, 6618.74, 6610, 6610.4],
                    },
                    {
                        x: new Date(1538789400000),
                        y: [6611, 6622.78, 6610.4, 6614.9],
                    },
                    {
                        x: new Date(1538791200000),
                        y: [6614.9, 6626.2, 6613.33, 6623.45],
                    },
                    {
                        x: new Date(1538793000000),
                        y: [6623.48, 6627, 6618.38, 6620.35],
                    },
                    {
                        x: new Date(1538794800000),
                        y: [6619.43, 6620.35, 6610.05, 6615.53],
                    },
                    {
                        x: new Date(1538796600000),
                        y: [6638.24, 6640, 6620, 6624.47],
                    },
                    {
                        x: new Date(1538798400000),
                        y: [6624.53, 6636.03, 6621.68, 6624.31],
                    },
                    {
                        x: new Date(1538800200000),
                        y: [6624.61, 6632.2, 6617, 6626.02],
                    },
                    {
                        x: new Date(1538802000000),
                        y: [6627, 6627.62, 6584.22, 6603.02],
                    },
                    {
                        x: new Date(1538803800000),
                        y: [6615.53, 6617.93, 6610, 6615.19],
                    },
                ],
            },
        ],
    },
];

const Crypto = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Crypto'));
    });
    const isDark = useSelector((state) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [currentCoin, setCurrentCoin] = useState(coins[0]);
    const [isShowCryptoMenu, setIsShowCryptoMenu] = useState(false);

    const profiteChartOption = {
        chart: {
            height: 45,
            width: 120,
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
                    formatter: (val) => {
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
    };
    const lossChartOption = {
        chart: {
            height: 45,
            width: 120,
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
                    formatter: (val) => {
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
    };
    const selectedBitCoinChart = {
        options: {
            chart: {
                height: 411,
                type: 'line',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#4361ee'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                xaxis: {
                    lines: {
                        show: false,
                    },
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
            xaxis: {
                type: 'datetime',
                labels: {
                    format: 'HH:mm',
                },

                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                type: 'currency',
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -40 : 0,
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
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Crypto</span>
                </li>
            </ul>
            <div className="flex flex-col xl:flex-row gap-5 relative mt-5">
                <div
                    className={`${
                        isShowCryptoMenu ? '!block h-full xl:h-auto' : ''
                    } panel absolute xl:relative p-0 flex-none w-80 border-0 overflow-y-auto z-10 xl:block divide-y divide-[#ebedf2] dark:divide-[#191e3a] hidden`}
                >
                    {coins.map((item) => {
                        return (
                            <div key={item.id}>
                                <button
                                    type="button"
                                    className={`${item.id === currentCoin.id ? 'bg-gray-100 dark:bg-[#192A3A]' : ''} w-full flex items-center p-4 hover:bg-gray-100 dark:hover:bg-[#192A3A]`}
                                    onClick={() => {
                                        setCurrentCoin(item);
                                        setIsShowCryptoMenu(!isShowCryptoMenu);
                                    }}
                                >
                                    <div className="ltr:pr-4 rtl:pl-4">
                                        <div className="flex items-baseline font-semibold">
                                            <div className="text-md ltr:mr-1 rtl:ml-1">{item.title}</div>
                                            <div className="text-xs text-white-dark uppercase">({item.alias})</div>
                                        </div>
                                        <div className={`flex items-center mt-2 ${item.isUp ? 'text-success' : 'text-danger'}`}>
                                            <div className="min-w-20 text-xl ltr:mr-3 rtl:ml-3">${item.value}</div>

                                            <div className="flex items-center font-normal">
                                                <IconArrowLeft className={item.isUp ? '-rotate-90' : 'rotate-90'} />
                                                <div className="font-medium text-sm">{item.perc}%</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <ReactApexChart series={item.series} options={item.isUp ? profiteChartOption : lossChartOption} type="line" height={45} />
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div
                    className={`bg-black/60 z-[5] w-full h-full absolute rounded-md hidden ${isShowCryptoMenu ? '!block xl:!hidden' : ''}`}
                    onClick={() => setIsShowCryptoMenu(!isShowCryptoMenu)}
                ></div>

                <div className="panel p-0 flex-1">
                    <div className="md:flex items-center flex-wrap p-4 border-b border-[#ebedf2] dark:border-[#191e3a]">
                        <div className="flex-1 flex items-start ltr:pr-4 rtl:pl-4">
                            <button onClick={() => setIsShowCryptoMenu(!isShowCryptoMenu)} type="button" className="xl:hidden hover:text-primary block ltr:mr-5 rtl:ml-5">
                                <IconMenu />
                            </button>
                            <div>
                                <div className="flex items-center">
                                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">{currentCoin.title}</div>
                                    <div className="font-semibold text-xs text-white-dark uppercase">({currentCoin.alias})</div>
                                </div>
                                <div className={`flex items-center mt-2 ${currentCoin.isUp ? 'text-success' : 'text-danger'}`}>
                                    <div className="min-w-20 text-2xl ltr:mr-3 rtl:ml-3">${currentCoin.value}</div>

                                    <IconArrowLeft className={`mb-px ${currentCoin.isUp ? '-rotate-90' : 'rotate-90'}`} />
                                    <div className="font-medium text-sm mb-px">{currentCoin.perc}%</div>
                                </div>
                            </div>
                        </div>
                        <ul className="ltr:md:ml-auto rtl:md:mr-auto grid grid-cols-2 sm:grid-cols-4 font-semibold sm:divide-x rtl:divide-x-reverse divide-[#ebedf2] dark:divide-[#253b5c] text-white-dark mt-5 sm:mt-0">
                            <li className="px-4 py-1">
                                Market Cap
                                <span className="text-lg mt-1.5 block text-black dark:text-white-light">${currentCoin.marketcap}B</span>
                            </li>
                            <li className="px-4 py-1">
                                Volume
                                <span className="text-lg mt-1.5 block text-black dark:text-white-light">${currentCoin.volume}B</span>
                            </li>
                            <li className="px-4 py-1">
                                Supply
                                <span className="text-lg mt-1.5 block text-black dark:text-white-light">{currentCoin.supply}M</span>
                            </li>
                            <li className="px-4 py-1">
                                All Time High
                                <span className="text-lg mt-1.5 block text-black dark:text-white-light">${currentCoin.highest}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-4 mb-5 border-b border-[#ebedf2] dark:border-[#253b5c] grid grid-rows-1 sm:grid-cols-4 gap-4">
                        <div>
                            <div className="font-semibold mb-1.5">Action</div>
                            <select className="form-select text-white-dark">
                                <option>Buy</option>
                                <option>Sell</option>
                            </select>
                        </div>
                        <div>
                            <div className="font-semibold mb-1.5">Wallet</div>
                            <select className="form-select text-white-dark">
                                <option>Bitcoin</option>
                                <option>Ethereum</option>
                                <option>Zcash</option>
                                <option>Litecoin</option>
                                <option>Binance</option>
                                <option>Solana</option>
                                <option>Tether</option>
                            </select>
                        </div>
                        <div>
                            <div className="font-semibold mb-1.5">Amount</div>
                            <div className="flex relative">
                                <input type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none ltr:border-r-0 rtl:border-l-0" />

                                <div className="dropdown">
                                    <Dropdown
                                        offset={[0, 5]}
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="bg-[#f1f2f3] dark:bg-[#1b2e4b] !flex justify-center gap-1 items-center rounded-none px-3 py-2 font-semibold border dark:border-[#253b5c] ltr:rounded-r-md rtl:rounded-l-md cursor-pointer"
                                        button={
                                            <>
                                                BTC
                                                <IconCaretDown />
                                            </>
                                        }
                                    >
                                        <ul>
                                            <li>
                                                <button type="button">BTC</button>
                                            </li>
                                            <li>
                                                <button type="button">ETH</button>
                                            </li>
                                            <li>
                                                <button type="button">ZEC</button>
                                            </li>
                                            <li>
                                                <button type="button">LTC</button>
                                            </li>
                                            <li>
                                                <button type="button">BNB</button>
                                            </li>
                                            <li>
                                                <button type="button">SOL</button>
                                            </li>
                                            <li>
                                                <button type="button">USDT</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary self-end">
                            Buy
                        </button>
                    </div>
                    {/*  selected chart  */}
                    <div className="flex-1 px-4 overflow-hidden">
                        <ReactApexChart series={currentCoin.series} options={selectedBitCoinChart.options} type="line" height={411} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Crypto;
