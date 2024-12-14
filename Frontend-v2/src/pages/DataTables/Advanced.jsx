import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import ReactApexChart from 'react-apexcharts';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconStar from '../../components/Icon/IconStar';

const Basic = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Advanced Table'));
    });

    const rowData = [
        {
            id: 1,
            firstName: 'Caroline',
            lastName: 'Jensen',
            email: 'carolinejensen@zidant.com',
            dob: '2004-05-28',
            address: {
                street: '529 Scholes Street',
                city: 'Temperanceville',
                zipcode: 5235,
                geo: {
                    lat: 23.806115,
                    lng: 164.677197,
                },
            },
            phone: '+1 (821) 447-3782',
            isActive: true,
            age: 39,
            company: 'POLARAX',
        },
        {
            id: 2,
            firstName: 'Celeste',
            lastName: 'Grant',
            email: 'celestegrant@polarax.com',
            dob: '1989-11-19',
            address: {
                street: '639 Kimball Street',
                city: 'Bascom',
                zipcode: 8907,
                geo: {
                    lat: 65.954483,
                    lng: 98.906478,
                },
            },
            phone: '+1 (838) 515-3408',
            isActive: false,
            age: 32,
            company: 'MANGLO',
        },
        {
            id: 3,
            firstName: 'Tillman',
            lastName: 'Forbes',
            email: 'tillmanforbes@manglo.com',
            dob: '2016-09-05',
            address: {
                street: '240 Vandalia Avenue',
                city: 'Thynedale',
                zipcode: 8994,
                geo: {
                    lat: -34.949388,
                    lng: -82.958111,
                },
            },
            phone: '+1 (969) 496-2892',
            isActive: false,
            age: 26,
            company: 'APPLIDECK',
        },
        {
            id: 4,
            firstName: 'Daisy',
            lastName: 'Whitley',
            email: 'daisywhitley@applideck.com',
            dob: '1987-03-23',
            address: {
                street: '350 Pleasant Place',
                city: 'Idledale',
                zipcode: 9369,
                geo: {
                    lat: -54.458809,
                    lng: -127.476556,
                },
            },
            phone: '+1 (861) 564-2877',
            isActive: true,
            age: 21,
            company: 'VOLAX',
        },
        {
            id: 5,
            firstName: 'Weber',
            lastName: 'Bowman',
            email: 'weberbowman@volax.com',
            dob: '1983-02-24',
            address: {
                street: '154 Conway Street',
                city: 'Broadlands',
                zipcode: 8131,
                geo: {
                    lat: 54.501351,
                    lng: -167.47138,
                },
            },
            phone: '+1 (962) 466-3483',
            isActive: false,
            age: 26,
            company: 'ORBAXTER',
        },
        {
            id: 6,
            firstName: 'Buckley',
            lastName: 'Townsend',
            email: 'buckleytownsend@orbaxter.com',
            dob: '2011-05-29',
            address: {
                street: '131 Guernsey Street',
                city: 'Vallonia',
                zipcode: 6779,
                geo: {
                    lat: -2.681655,
                    lng: 3.528942,
                },
            },
            phone: '+1 (884) 595-2643',
            isActive: true,
            age: 40,
            company: 'OPPORTECH',
        },
        {
            id: 7,
            firstName: 'Latoya',
            lastName: 'Bradshaw',
            email: 'latoyabradshaw@opportech.com',
            dob: '2010-11-23',
            address: {
                street: '668 Lenox Road',
                city: 'Lowgap',
                zipcode: 992,
                geo: {
                    lat: 36.026423,
                    lng: 130.412198,
                },
            },
            phone: '+1 (906) 474-3155',
            isActive: true,
            age: 24,
            company: 'GORGANIC',
        },
        {
            id: 8,
            firstName: 'Kate',
            lastName: 'Lindsay',
            email: 'katelindsay@gorganic.com',
            dob: '1987-07-02',
            address: {
                street: '773 Harrison Avenue',
                city: 'Carlton',
                zipcode: 5909,
                geo: {
                    lat: 42.464724,
                    lng: -12.948403,
                },
            },
            phone: '+1 (930) 546-2952',
            isActive: true,
            age: 24,
            company: 'AVIT',
        },
        {
            id: 9,
            firstName: 'Marva',
            lastName: 'Sandoval',
            email: 'marvasandoval@avit.com',
            dob: '2010-11-02',
            address: {
                street: '200 Malta Street',
                city: 'Tuskahoma',
                zipcode: 1292,
                geo: {
                    lat: -52.206169,
                    lng: 74.19452,
                },
            },
            phone: '+1 (927) 566-3600',
            isActive: false,
            age: 28,
            company: 'QUILCH',
        },
        {
            id: 10,
            firstName: 'Decker',
            lastName: 'Russell',
            email: 'deckerrussell@quilch.com',
            dob: '1994-04-21',
            address: {
                street: '708 Bath Avenue',
                city: 'Coultervillle',
                zipcode: 1268,
                geo: {
                    lat: -41.550295,
                    lng: -146.598075,
                },
            },
            phone: '+1 (846) 535-3283',
            isActive: false,
            age: 27,
            company: 'MEMORA',
        },
        {
            id: 11,
            firstName: 'Odom',
            lastName: 'Mills',
            email: 'odommills@memora.com',
            dob: '2010-01-24',
            address: {
                street: '907 Blake Avenue',
                city: 'Churchill',
                zipcode: 4400,
                geo: {
                    lat: -56.061694,
                    lng: -130.238523,
                },
            },
            phone: '+1 (995) 525-3402',
            isActive: true,
            age: 34,
            company: 'ZORROMOP',
        },
        {
            id: 12,
            firstName: 'Sellers',
            lastName: 'Walters',
            email: 'sellerswalters@zorromop.com',
            dob: '1975-11-12',
            address: {
                street: '978 Oakland Place',
                city: 'Gloucester',
                zipcode: 3802,
                geo: {
                    lat: 11.732587,
                    lng: 96.118099,
                },
            },
            phone: '+1 (830) 430-3157',
            isActive: true,
            age: 28,
            company: 'ORBOID',
        },
        {
            id: 13,
            firstName: 'Wendi',
            lastName: 'Powers',
            email: 'wendipowers@orboid.com',
            dob: '1979-06-02',
            address: {
                street: '376 Greenpoint Avenue',
                city: 'Elliott',
                zipcode: 9149,
                geo: {
                    lat: -78.159578,
                    lng: -9.835103,
                },
            },
            phone: '+1 (863) 457-2088',
            isActive: true,
            age: 31,
            company: 'SNORUS',
        },
        {
            id: 14,
            firstName: 'Sophie',
            lastName: 'Horn',
            email: 'sophiehorn@snorus.com',
            dob: '2018-09-20',
            address: {
                street: '343 Doughty Street',
                city: 'Homestead',
                zipcode: 330,
                geo: {
                    lat: 65.484087,
                    lng: 137.413998,
                },
            },
            phone: '+1 (885) 418-3948',
            isActive: true,
            age: 22,
            company: 'XTH',
        },
        {
            id: 15,
            firstName: 'Levine',
            lastName: 'Rodriquez',
            email: 'levinerodriquez@xth.com',
            dob: '1973-02-08',
            address: {
                street: '643 Allen Avenue',
                city: 'Weedville',
                zipcode: 8931,
                geo: {
                    lat: -63.185586,
                    lng: 117.327808,
                },
            },
            phone: '+1 (999) 565-3239',
            isActive: true,
            age: 27,
            company: 'COMTRACT',
        },
        {
            id: 16,
            firstName: 'Little',
            lastName: 'Hatfield',
            email: 'littlehatfield@comtract.com',
            dob: '2012-01-03',
            address: {
                street: '194 Anthony Street',
                city: 'Williston',
                zipcode: 7456,
                geo: {
                    lat: 47.480837,
                    lng: 6.085909,
                },
            },
            phone: '+1 (812) 488-3011',
            isActive: false,
            age: 33,
            company: 'ZIDANT',
        },
        {
            id: 17,
            firstName: 'Larson',
            lastName: 'Kelly',
            email: 'larsonkelly@zidant.com',
            dob: '2010-06-14',
            address: {
                street: '978 Indiana Place',
                city: 'Innsbrook',
                zipcode: 639,
                geo: {
                    lat: -71.766732,
                    lng: 150.854345,
                },
            },
            phone: '+1 (892) 484-2162',
            isActive: true,
            age: 20,
            company: 'SUREPLEX',
        },
        {
            id: 18,
            firstName: 'Kendra',
            lastName: 'Molina',
            email: 'kendramolina@sureplex.com',
            dob: '2002-07-19',
            address: {
                street: '567 Charles Place',
                city: 'Kimmell',
                zipcode: 1966,
                geo: {
                    lat: 50.765816,
                    lng: -117.106499,
                },
            },
            phone: '+1 (920) 528-3330',
            isActive: false,
            age: 31,
            company: 'DANJA',
        },
        {
            id: 19,
            firstName: 'Ebony',
            lastName: 'Livingston',
            email: 'ebonylivingston@danja.com',
            dob: '1994-10-18',
            address: {
                street: '284 Cass Place',
                city: 'Navarre',
                zipcode: 948,
                geo: {
                    lat: 65.271256,
                    lng: -83.064729,
                },
            },
            phone: '+1 (970) 591-3039',
            isActive: false,
            age: 33,
            company: 'EURON',
        },
        {
            id: 20,
            firstName: 'Kaufman',
            lastName: 'Rush',
            email: 'kaufmanrush@euron.com',
            dob: '2011-07-10',
            address: {
                street: '408 Kingsland Avenue',
                city: 'Beaulieu',
                zipcode: 7911,
                geo: {
                    lat: 41.513153,
                    lng: 54.821641,
                },
            },
            phone: '+1 (924) 463-2934',
            isActive: false,
            age: 39,
            company: 'ILLUMITY',
        },
        {
            id: 21,
            firstName: 'Frank',
            lastName: 'Hays',
            email: 'frankhays@illumity.com',
            dob: '2005-06-15',
            address: {
                street: '973 Caton Place',
                city: 'Dargan',
                zipcode: 4104,
                geo: {
                    lat: 63.314988,
                    lng: -138.771323,
                },
            },
            phone: '+1 (930) 577-2670',
            isActive: false,
            age: 31,
            company: 'SYBIXTEX',
        },
        {
            id: 22,
            firstName: 'Carmella',
            lastName: 'Mccarty',
            email: 'carmellamccarty@sybixtex.com',
            dob: '1980-03-06',
            address: {
                street: '919 Judge Street',
                city: 'Canby',
                zipcode: 8283,
                geo: {
                    lat: 9.198597,
                    lng: -138.809971,
                },
            },
            phone: '+1 (876) 456-3218',
            isActive: true,
            age: 21,
            company: 'ZEDALIS',
        },
        {
            id: 23,
            firstName: 'Massey',
            lastName: 'Owen',
            email: 'masseyowen@zedalis.com',
            dob: '2012-03-01',
            address: {
                street: '108 Seaview Avenue',
                city: 'Slovan',
                zipcode: 3599,
                geo: {
                    lat: -74.648318,
                    lng: 99.620699,
                },
            },
            phone: '+1 (917) 567-3786',
            isActive: false,
            age: 40,
            company: 'DYNO',
        },
        {
            id: 24,
            firstName: 'Lottie',
            lastName: 'Lowery',
            email: 'lottielowery@dyno.com',
            dob: '1982-10-10',
            address: {
                street: '557 Meserole Avenue',
                city: 'Fowlerville',
                zipcode: 4991,
                geo: {
                    lat: 54.811546,
                    lng: -20.996515,
                },
            },
            phone: '+1 (912) 539-3498',
            isActive: true,
            age: 36,
            company: 'MULTIFLEX',
        },
        {
            id: 25,
            firstName: 'Addie',
            lastName: 'Luna',
            email: 'addieluna@multiflex.com',
            dob: '1988-05-01',
            address: {
                street: '688 Bulwer Place',
                city: 'Harmon',
                zipcode: 7664,
                geo: {
                    lat: -12.762766,
                    lng: -39.924497,
                },
            },
            phone: '+1 (962) 537-2981',
            isActive: true,
            age: 32,
            company: 'PHARMACON',
        },
    ];

    const countryList = [
        { code: 'AE', name: 'United Arab Emirates' },
        { code: 'AR', name: 'Argentina' },
        { code: 'AT', name: 'Austria' },
        { code: 'AU', name: 'Australia' },
        { code: 'BE', name: 'Belgium' },
        { code: 'BG', name: 'Bulgaria' },
        { code: 'BN', name: 'Brunei' },
        { code: 'BR', name: 'Brazil' },
        { code: 'BY', name: 'Belarus' },
        { code: 'CA', name: 'Canada' },
        { code: 'CH', name: 'Switzerland' },
        { code: 'CL', name: 'Chile' },
        { code: 'CN', name: 'China' },
        { code: 'CO', name: 'Colombia' },
        { code: 'CZ', name: 'Czech Republic' },
        { code: 'DE', name: 'Germany' },
        { code: 'DK', name: 'Denmark' },
        { code: 'DZ', name: 'Algeria' },
        { code: 'EC', name: 'Ecuador' },
        { code: 'EG', name: 'Egypt' },
        { code: 'ES', name: 'Spain' },
        { code: 'FI', name: 'Finland' },
        { code: 'FR', name: 'France' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'GR', name: 'Greece' },
        { code: 'HK', name: 'Hong Kong' },
        { code: 'HR', name: 'Croatia' },
        { code: 'HU', name: 'Hungary' },
        { code: 'ID', name: 'Indonesia' },
        { code: 'IE', name: 'Ireland' },
        { code: 'IL', name: 'Israel' },
        { code: 'IN', name: 'India' },
        { code: 'IT', name: 'Italy' },
        { code: 'JO', name: 'Jordan' },
        { code: 'JP', name: 'Japan' },
        { code: 'KE', name: 'Kenya' },
        { code: 'KH', name: 'Cambodia' },
        { code: 'KR', name: 'South Korea' },
        { code: 'KZ', name: 'Kazakhstan' },
        { code: 'LA', name: 'Laos' },
        { code: 'LK', name: 'Sri Lanka' },
        { code: 'MA', name: 'Morocco' },
        { code: 'MM', name: 'Myanmar' },
        { code: 'MO', name: 'Macau' },
        { code: 'MX', name: 'Mexico' },
        { code: 'MY', name: 'Malaysia' },
        { code: 'NG', name: 'Nigeria' },
        { code: 'NL', name: 'Netherlands' },
        { code: 'NO', name: 'Norway' },
        { code: 'NZ', name: 'New Zealand' },
        { code: 'PE', name: 'Peru' },
        { code: 'PH', name: 'Philippines' },
        { code: 'PK', name: 'Pakistan' },
        { code: 'PL', name: 'Poland' },
        { code: 'PT', name: 'Portugal' },
        { code: 'QA', name: 'Qatar' },
        { code: 'RO', name: 'Romania' },
        { code: 'RS', name: 'Serbia' },
        { code: 'RU', name: 'Russia' },
        { code: 'SA', name: 'Saudi Arabia' },
        { code: 'SE', name: 'Sweden' },
        { code: 'SG', name: 'Singapore' },
        { code: 'SK', name: 'Slovakia' },
        { code: 'TH', name: 'Thailand' },
        { code: 'TN', name: 'Tunisia' },
        { code: 'TR', name: 'Turkey' },
        { code: 'TW', name: 'Taiwan' },
        { code: 'UK', name: 'Ukraine' },
        { code: 'UG', name: 'Uganda' },
        { code: 'US', name: 'United States' },
        { code: 'VN', name: 'Vietnam' },
        { code: 'ZA', name: 'South Africa' },
        { code: 'BA', name: 'Bosnia and Herzegovina' },
        { code: 'BD', name: 'Bangladesh' },
        { code: 'EE', name: 'Estonia' },
        { code: 'IQ', name: 'Iraq' },
        { code: 'LU', name: 'Luxembourg' },
        { code: 'LV', name: 'Latvia' },
        { code: 'MK', name: 'North Macedonia' },
        { code: 'SI', name: 'Slovenia' },
        { code: 'PA', name: 'Panama' },
    ];

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [sortStatus, setSortStatus] = useState({ columnAccessor: 'id', direction: 'asc' });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    const randomColor = () => {
        const color = ['#4361ee', '#805dca', '#00ab55', '#e7515a', '#e2a03f', '#2196f3'];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };

    const randomStatusColor = () => {
        const color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };

    const randomStatus = () => {
        const status = ['PAID', 'APPROVED', 'FAILED', 'CANCEL', 'SUCCESS', 'PENDING', 'COMPLETE'];
        const random = Math.floor(Math.random() * status.length);
        return status[random];
    };
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getCountry = () => {
        const random = Math.floor(Math.random() * countryList.length);
        return countryList[random];
    };

    const chart_options = () => {
        let option = {
            chart: { sparkline: { enabled: true } },
            stroke: { curve: 'smooth', width: 2 },
            markers: { size: [4, 7], strokeWidth: 0 },
            colors: [randomColor()],
            grid: { padding: { top: 5, bottom: 5 } },
            tooltip: {
                x: { show: false },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        };
        return option;
    };

    return (
        <div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div>
                <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline">
                    https://www.npmjs.com/package/mantine-datatable
                </a>
            </div>
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Advanced</h5>
                <div className="datatables">
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true, render: ({ id }) => <strong className="text-info">#{id}</strong> },
                            {
                                accessor: 'firstName',
                                title: 'User',
                                sortable: true,
                                render: ({ firstName, lastName }) => (
                                    <div className="flex items-center gap-2">
                                        <img src={`/assets/images/profile-${getRandomNumber(1, 34)}.jpeg`} className="w-9 h-9 rounded-full max-w-none" alt="user-profile" />
                                        <div className="font-semibold">{firstName + ' ' + lastName}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'country',
                                title: 'Country',
                                render: () => (
                                    <div className="flex items-center gap-2">
                                        <img width="24" src={`/assets/images/flags/${getCountry().code}.svg`} className="max-w-none" alt="flag" />
                                        <div>{getCountry().name}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'email',
                                title: 'Email',
                                sortable: true,
                                render: ({ email }) => (
                                    <a href={`mailto:${email}`} className="text-primary hover:underline">
                                        {email}
                                    </a>
                                ),
                            },
                            {
                                accessor: 'age',
                                title: 'Progress',
                                render: () => (
                                    <div className="w-4/5 min-w-[100px] h-2.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                        <div
                                            className={`h-2.5 rounded-full rounded-bl-full text-center text-white text-xs bg-${randomStatusColor()}`}
                                            style={{ width: `${getRandomNumber(15, 100)}%` }}
                                        ></div>
                                    </div>
                                ),
                            },
                            { accessor: 'phone', title: 'Phone', sortable: true },
                            {
                                accessor: 'rating',
                                title: 'Rate',
                                titleClassName: '!text-center',
                                render: ({ id }) => (
                                    <div className="flex items-center justify-center text-warning">
                                        {Array.from(Array(getRandomNumber(1, 5)).keys()).map((i) => {
                                            return <IconStar key={i + id} className=" fill-warning" />;
                                        })}
                                    </div>
                                ),
                            },
                            {
                                accessor: 'series',
                                title: 'Progress',
                                render: ({ id }) => (
                                    <ReactApexChart
                                        key={id}
                                        type="line"
                                        series={[{ data: [21, 9, 36, 12, 44, 25, 59] }]}
                                        // @ts-ignore
                                        options={chart_options()}
                                        height={30}
                                        width={150}
                                    />
                                ),
                            },
                            {
                                accessor: 'status',
                                title: 'Status',
                                render: () => <span className={`badge badge-outline-${randomStatusColor()} `}>{randomStatus()}</span>,
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Basic;
