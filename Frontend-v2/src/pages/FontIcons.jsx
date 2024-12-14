import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import IconAirplay from '../components/Icon/IconAirplay';
import IconArchive from '../components/Icon/IconArchive';
import IconArrowBackward from '../components/Icon/IconArrowBackward';
import IconArrowForward from '../components/Icon/IconArrowForward';
import IconArrowLeft from '../components/Icon/IconArrowLeft';
import IconAt from '../components/Icon/IconAt';
import IconAward from '../components/Icon/IconAward';
import IconBarChart from '../components/Icon/IconBarChart';
import IconBellBing from '../components/Icon/IconBellBing';
import IconBolt from '../components/Icon/IconBolt';
import IconBook from '../components/Icon/IconBook';
import IconBookmark from '../components/Icon/IconBookmark';
import IconBox from '../components/Icon/IconBox';
import IconCalendar from '../components/Icon/IconCalendar';
import IconCamera from '../components/Icon/IconCamera';
import IconCaretDown from '../components/Icon/IconCaretDown';
import IconCaretsDown from '../components/Icon/IconCaretsDown';
import IconCashBanknotes from '../components/Icon/IconCashBanknotes';
import IconChartSquare from '../components/Icon/IconChartSquare';
import IconChatDot from '../components/Icon/IconChatDot';
import IconChatDots from '../components/Icon/IconChatDots';
import IconChatNotification from '../components/Icon/IconChatNotification';
import IconChecks from '../components/Icon/IconChecks';
import IconChrome from '../components/Icon/IconChrome';
import IconCircleCheck from '../components/Icon/IconCircleCheck';
import IconClipboardText from '../components/Icon/IconClipboardText';
import IconClock from '../components/Icon/IconClock';
import IconCloudDownload from '../components/Icon/IconCloudDownload';
import IconCode from '../components/Icon/IconCode';
import IconCoffee from '../components/Icon/IconCoffee';
import IconCopy from '../components/Icon/IconCopy';
import IconCpuBolt from '../components/Icon/IconCpuBolt';
import IconCreditCard from '../components/Icon/IconCreditCard';
import IconDesktop from '../components/Icon/IconDesktop';
import IconDollarSign from '../components/Icon/IconDollarSign';
import IconDollarSignCircle from '../components/Icon/IconDollarSignCircle';
import IconDownload from '../components/Icon/IconDownload';
import IconDribbble from '../components/Icon/IconDribbble';
import IconDroplet from '../components/Icon/IconDroplet';
import IconEdit from '../components/Icon/IconEdit';
import IconInfoCircle from '../components/Icon/IconInfoCircle';
import IconEye from '../components/Icon/IconEye';
import IconFacebook from '../components/Icon/IconFacebook';
import IconFile from '../components/Icon/IconFile';
import IconFolder from '../components/Icon/IconFolder';
import IconFolderMinus from '../components/Icon/IconFolderMinus';
import IconFolderPlus from '../components/Icon/IconFolderPlus';
import IconGallery from '../components/Icon/IconGallery';
import IconGithub from '../components/Icon/IconGithub';
import IconGlobe from '../components/Icon/IconGlobe';
import IconHeart from '../components/Icon/IconHeart';
import IconHelpCircle from '../components/Icon/IconHelpCircle';
import IconHome from '../components/Icon/IconHome';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconInbox from '../components/Icon/IconInbox';
import IconInfoHexagon from '../components/Icon/IconInfoHexagon';
import IconInfoTriangle from '../components/Icon/IconInfoTriangle';
import IconInstagram from '../components/Icon/IconInstagram';
import IconLaptop from '../components/Icon/IconLaptop';
import IconLayout from '../components/Icon/IconLayout';
import IconLayoutGrid from '../components/Icon/IconLayoutGrid';
import IconLink from '../components/Icon/IconLink';
import IconLinkedin from '../components/Icon/IconLinkedin';
import IconListCheck from '../components/Icon/IconListCheck';
import IconLoader from '../components/Icon/IconLoader';
import IconLock from '../components/Icon/IconLock';
import IconLockDots from '../components/Icon/IconLockDots';
import IconLogin from '../components/Icon/IconLogin';
import IconLogout from '../components/Icon/IconLogout';
import IconMail from '../components/Icon/IconMail';
import IconMailDot from '../components/Icon/IconMailDot';
import IconMapPin from '../components/Icon/IconMapPin';
import IconMenu from '../components/Icon/IconMenu';
import IconMessage from '../components/Icon/IconMessage';
import IconMessage2 from '../components/Icon/IconMessage2';
import IconMessageDots from '../components/Icon/IconMessageDots';
import IconMessagesDot from '../components/Icon/IconMessagesDot';
import IconMicrophoneOff from '../components/Icon/IconMicrophoneOff';
import IconMinus from '../components/Icon/IconMinus';
import IconMinusCircle from '../components/Icon/IconMinusCircle';
import IconMoodSmile from '../components/Icon/IconMoodSmile';
import IconMoon from '../components/Icon/IconMoon';
import IconMultipleForwardRight from '../components/Icon/IconMultipleForwardRight';
import IconNotes from '../components/Icon/IconNotes';
import IconNotesEdit from '../components/Icon/IconNotesEdit';
import IconOpenBook from '../components/Icon/IconOpenBook';
import IconPaperclip from '../components/Icon/IconPaperclip';
import IconPencil from '../components/Icon/IconPencil';
import IconPencilPaper from '../components/Icon/IconPencilPaper';
import IconPhone from '../components/Icon/IconPhone';
import IconPhoneCall from '../components/Icon/IconPhoneCall';
import IconPlayCircle from '../components/Icon/IconPlayCircle';
import IconPlus from '../components/Icon/IconPlus';
import IconPlusCircle from '../components/Icon/IconPlusCircle';
import IconPrinter from '../components/Icon/IconPrinter';
import IconRefresh from '../components/Icon/IconRefresh';
import IconRestore from '../components/Icon/IconRestore';
import IconRouter from '../components/Icon/IconRouter';
import IconSafari from '../components/Icon/IconSafari';
import IconSave from '../components/Icon/IconSave';
import IconSearch from '../components/Icon/IconSearch';
import IconSend from '../components/Icon/IconSend';
import IconServer from '../components/Icon/IconServer';
import IconSettings from '../components/Icon/IconSettings';
import IconShare from '../components/Icon/IconShare';
import IconShoppingBag from '../components/Icon/IconShoppingBag';
import IconShoppingCart from '../components/Icon/IconShoppingCart';
import IconSquareCheck from '../components/Icon/IconSquareCheck';
import IconSquareRotated from '../components/Icon/IconSquareRotated';
import IconStar from '../components/Icon/IconStar';
import IconSun from '../components/Icon/IconSun';
import IconTag from '../components/Icon/IconTag';
import IconThumbUp from '../components/Icon/IconThumbUp';
import IconTrash from '../components/Icon/IconTrash';
import IconTrashLines from '../components/Icon/IconTrashLines';
import IconTrendingUp from '../components/Icon/IconTrendingUp';
import IconTwitter from '../components/Icon/IconTwitter';
import IconUser from '../components/Icon/IconUser';
import IconUserPlus from '../components/Icon/IconUserPlus';
import IconUsers from '../components/Icon/IconUsers';
import IconUsersGroup from '../components/Icon/IconUsersGroup';
import IconVideo from '../components/Icon/IconVideo';
import IconWheel from '../components/Icon/IconWheel';
import IconX from '../components/Icon/IconX';
import IconXCircle from '../components/Icon/IconXCircle';
import IconZipFile from '../components/Icon/IconZipFile';
import IconMenuApps from '../components/Icon/Menu/IconMenuApps';
import IconMenuAuthentication from '../components/Icon/Menu/IconMenuAuthentication';
import IconMenuCalendar from '../components/Icon/Menu/IconMenuCalendar';
import IconMenuCharts from '../components/Icon/Menu/IconMenuCharts';
import IconMenuChat from '../components/Icon/Menu/IconMenuChat';
import IconMenuComponents from '../components/Icon/Menu/IconMenuComponents';
import IconMenuContacts from '../components/Icon/Menu/IconMenuContacts';
import IconMenuDashboard from '../components/Icon/Menu/IconMenuDashboard';
import IconMenuDatatables from '../components/Icon/Menu/IconMenuDatatables';
import IconMenuDocumentation from '../components/Icon/Menu/IconMenuDocumentation';
import IconMenuDragAndDrop from '../components/Icon/Menu/IconMenuDragAndDrop';
import IconMenuElements from '../components/Icon/Menu/IconMenuElements';
import IconMenuFontIcons from '../components/Icon/Menu/IconMenuFontIcons';
import IconMenuForms from '../components/Icon/Menu/IconMenuForms';
import IconMenuInvoice from '../components/Icon/Menu/IconMenuInvoice';
import IconMenuMailbox from '../components/Icon/Menu/IconMenuMailbox';
import IconMenuMore from '../components/Icon/Menu/IconMenuMore';
import IconMenuNotes from '../components/Icon/Menu/IconMenuNotes';
import IconMenuPages from '../components/Icon/Menu/IconMenuPages';
import IconMenuScrumboard from '../components/Icon/Menu/IconMenuScrumboard';
import IconMenuTables from '../components/Icon/Menu/IconMenuTables';
import IconMenuTodo from '../components/Icon/Menu/IconMenuTodo';
import IconMenuUsers from '../components/Icon/Menu/IconMenuUsers';
import IconMenuWidgets from '../components/Icon/Menu/IconMenuWidgets';
import IconBell from '../components/Icon/IconBell';
const FontIcons = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Font Icons'));
    });

    return (
        <div>
            <div className="space-y-8">
                <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary lg:col-span-2">
                    <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a
                        href="https://www.figma.com/file/agsPUbJSO4OcokUIxJRZvw/Solar-Icon-Set-(Community)?node-id=0%3A1&t=Xr5s4CqZbVgAQU9X-0"
                        target="_blank"
                        className="block hover:underline"
                        rel="noreferrer"
                    >
                        https://www.figma.com/file/agsPUbJSO4OcokUIxJRZvw/Solar-Icon-Set-(Community)?node-id=0%3A1&t=Xr5s4CqZbVgAQU9X-0
                    </a>
                </div>

                <div className="panel">
                    <h5 className="mb-5 text-lg font-semibold dark:text-white-light">Solar Icon</h5>
                    <div className="mb-5">
                        <p className="mb-5">
                            Solar is a collection of simply beautiful open source icons. Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and usability.
                        </p>
                        <div className="mb-5 inline-block rounded bg-[#009688]/[.26] py-1 px-2 text-base text-[#009688]">Line Duotone</div>
                        <div className="flex items-center flex-wrap gap-10 mb-5">
                            
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconAirplay className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconArchive className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconArrowBackward className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconArrowForward className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconArrowLeft className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconAt className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconAward className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconBarChart className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconBell className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconBellBing className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconBolt className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconBook className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconBookmark className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconBox className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCalendar className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCamera className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCaretDown className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCaretsDown className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCashBanknotes className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconChartSquare className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconChatDot className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconChatDots className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconChatNotification className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconChecks className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconChrome className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCircleCheck className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconClipboardText className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconClock className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCloudDownload className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCode className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCoffee className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCopy className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCpuBolt className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconCreditCard className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconDesktop className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconDollarSign className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconDollarSignCircle className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconDownload className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconDribbble className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconDroplet className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconEdit className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconInfoCircle className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconEye className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconFacebook className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconFile className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconFolder className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconFolderMinus className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconFolderPlus className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconGallery className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconGithub className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconGlobe className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconHeart className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconHelpCircle className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconHome className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconHorizontalDots className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconInbox className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconInfoHexagon className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconInfoTriangle className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconInstagram className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLaptop className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLayout className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLayoutGrid className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLink className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLinkedin className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconListCheck className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLoader className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLock className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLockDots className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLogin className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLogout className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMail className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMailDot className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMapPin className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenu className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMessage className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMessage2 className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMessageDots className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMessagesDot className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMicrophoneOff className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMinus className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMinusCircle className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMoodSmile className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMoon className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMultipleForwardRight className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconNotes className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconNotesEdit className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconOpenBook className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPaperclip className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPencil className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPencilPaper className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPhone className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPhoneCall className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPlayCircle className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPlus className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPlusCircle className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPrinter className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconRefresh className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconRestore className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconRouter className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconSafari className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconSave className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconSearch className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconSend className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconServer className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconSettings className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconShare className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconShoppingBag className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconShoppingCart className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconSquareCheck className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconSquareRotated className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconStar className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconSun className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconTag className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconThumbUp className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconTrash className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconTrashLines className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconTrendingUp className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconTwitter className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconUser className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconUserPlus className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconUsers className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconUsersGroup className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconVideo className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconWheel className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconX className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconXCircle className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconZipFile className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="bg-[#009688]/[.26] text-[#009688] py-1 px-2 rounded inline-block text-base mb-5">Bold Duotone</div>
                        <div className="flex items-center flex-wrap gap-10 mb-5">
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuApps className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuAuthentication className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuCalendar className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuCharts className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuChat className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuComponents className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuContacts className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuDashboard className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuDatatables className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuDocumentation className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuDragAndDrop className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuElements className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuFontIcons className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuForms className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuInvoice className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuMailbox className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuMore className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuNotes className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuPages className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuScrumboard className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuTables className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuTodo className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuUsers className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMenuWidgets className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconAirplay fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconBox fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconDesktop fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconDollarSignCircle fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconInfoCircle fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLayout fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconLockDots fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMail fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMessageDots fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconMinusCircle fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPencil fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPhoneCall fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconPlayCircle fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconRouter fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconTwitter fill={true} className="w-6 h-6" />
                            </div>
                            <div className="grid place-content-center w-14 h-14 border border-white-dark/20 dark:border-[#191e3a] rounded-md">
                                <IconUser fill={true} className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FontIcons;
