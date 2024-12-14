import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconSend from '../../../components/Icon/IconSend';
import IconPrinter from '../../../components/Icon/IconPrinter';
import IconDownload from '../../../components/Icon/IconDownload';
import IconEdit from '../../../components/Icon/IconEdit';
import IconPlus from '../../../components/Icon/IconPlus';

const Preview = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
    });
    const exportTable = () => {
        window.print();
    };

    const items = [
        {
            id: 1,
            title: 'Calendar App Customization',
            quantity: 1,
            price: '120',
            amount: '120',
        },
        {
            id: 2,
            title: 'Chat App Customization',
            quantity: 1,
            price: '230',
            amount: '230',
        },
        {
            id: 3,
            title: 'Laravel Integration',
            quantity: 1,
            price: '405',
            amount: '405',
        },
        {
            id: 4,
            title: 'Backend UI Design',
            quantity: 1,
            price: '2500',
            amount: '2500',
        },
    ];

    const columns = [
        {
            key: 'id',
            label: 'S.NO',
        },
        {
            key: 'title',
            label: 'ITEMS',
        },
        {
            key: 'quantity',
            label: 'QTY',
        },
        {
            key: 'price',
            label: 'PRICE',
            class: 'ltr:text-right rtl:text-left',
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            class: 'ltr:text-right rtl:text-left',
        },
    ];

    return (
        <div>
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                <button type="button" className="btn btn-info gap-2">
                    <IconSend />
                    Send Invoice
                </button>

                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    Print
                </button>

                <button type="button" className="btn btn-success gap-2">
                    <IconDownload />
                    Download
                </button>

                <Link to="/apps/invoice/add" className="btn btn-secondary gap-2">
                    <IconPlus />
                    Create
                </Link>

                <Link to="/apps/invoice/edit" className="btn btn-warning gap-2">
                    <IconEdit />
                    Edit
                </Link>
            </div>
            <div className="panel">
                <div className="flex justify-between flex-wrap gap-4 px-4">
                    <div className="text-2xl font-semibold uppercase">Invoice</div>
                    <div className="shrink-0">
                        <img src="/assets/images/logo.svg" alt="img" className="w-14 ltr:ml-auto rtl:mr-auto" />
                    </div>
                </div>
                <div className="ltr:text-right rtl:text-left px-4">
                    <div className="space-y-1 mt-6 text-white-dark">
                        <div>13 Tetrick Road, Cypress Gardens, Florida, 33884, US</div>
                        <div>vristo@gmail.com</div>
                        <div>+1 (070) 123-4567</div>
                    </div>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap">
                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark">
                            <div>Issue For:</div>
                            <div className="text-black dark:text-white font-semibold">John Doe</div>
                            <div>405 Mulberry Rd. Mc Grady, NC, 28649</div>
                            <div>redq@company.com</div>
                            <div>(128) 666 070</div>
                        </div>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Invoice :</div>
                                <div>#8701</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Issue Date :</div>
                                <div>13 Sep 2022</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Order ID :</div>
                                <div>#OD-85794</div>
                            </div>
                            <div className="flex items-center w-full justify-between">
                                <div className="text-white-dark">Shipment ID :</div>
                                <div>#SHP-8594</div>
                            </div>
                        </div>
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Bank Name:</div>
                                <div className="whitespace-nowrap">Bank Of America</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Account Number:</div>
                                <div>1234567890</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">SWIFT Code:</div>
                                <div>S58K796</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">IBAN:</div>
                                <div>L5698445485</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Country:</div>
                                <div>United States</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive mt-6">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                {columns.map((column) => {
                                    return (
                                        <th key={column.key} className={column?.class}>
                                            {column.label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td className="ltr:text-right rtl:text-left">${item.price}</td>
                                        <td className="ltr:text-right rtl:text-left">${item.amount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                    <div></div>
                    <div className="ltr:text-right rtl:text-left space-y-2">
                        <div className="flex items-center">
                            <div className="flex-1">Subtotal</div>
                            <div className="w-[37%]">$3255</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Tax</div>
                            <div className="w-[37%]">$700</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Shipping Rate</div>
                            <div className="w-[37%]">$0</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Discount</div>
                            <div className="w-[37%]">$10</div>
                        </div>
                        <div className="flex items-center font-semibold text-lg">
                            <div className="flex-1">Grand Total</div>
                            <div className="w-[37%]">$3945</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
