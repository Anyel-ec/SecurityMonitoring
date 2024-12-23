import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect } from 'react';
import IconCoffee from '../../components/Icon/IconCoffee';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconMapPin from '../../components/Icon/IconMapPin';
import IconMail from '../../components/Icon/IconMail';
import IconPhone from '../../components/Icon/IconPhone';

const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Perfil'));
    });
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>
            <div className="pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Perfil</h5>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                <img src="/assets/images/user-profile.jpg" alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                <p className="font-semibold text-primary text-xl">Angel Patiño</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <IconCoffee className="shrink-0" />
                                    Desarrollador web
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconCalendar className="shrink-0" />
                                    20 Ene, 2000
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconMapPin className="shrink-0" />
                                    Santo Domingo, Ecuador
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <span className="text-primary truncate">angel@gmail.com</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconPhone />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        +593 93 947 0232
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="mb-5">
                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">


                                <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                                    <h6 className="text-lg font-bold mb-5">Información General</h6>
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="name">Nombre completo</label>
                                                <input id="name" type="text" placeholder="Ingrese su nombre" className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="profession">Profesión</label>
                                                <input id="profession" type="text" placeholder="Ingrese su profesión" className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="country">País</label>
                                                <select defaultValue="Todos" id="country" className="form-select text-white-dark">
                                                    <option value="Todos">Todos los paises</option>
                                                    <option value="Ecuador">Ecuador</option>
                                                    <option value="Colombia">Colombia</option>
                                                    <option value="Perú">Perú</option>
                                                    <option value="Chile">Chile</option>
                                                    <option value="Mexico">Mexico</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="address">Ciudad</label>
                                                <input id="address" type="text" placeholder="Ingrese su ciudad" className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="location">Dirección</label>
                                                <input id="location" type="text" placeholder="Ingrese su ubicación" className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="phone">Teléfono</label>
                                                <input id="phone" type="text" placeholder="Ingrese su teléfono" className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="email">Correo electrónico</label>
                                                <input id="email" type="email" placeholder="Ingrese su correo electronico" className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="web">Sitio web</label>
                                                <input id="web" type="text" placeholder="Ingrese el enlace" className="form-input" />
                                            </div>

                                            <div className="sm:col-span-2 mt-3">
                                                <button type="button" className="btn btn-primary">
                                                    Guardar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
