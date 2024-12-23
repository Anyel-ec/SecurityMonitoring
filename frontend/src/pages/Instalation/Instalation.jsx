import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

const Instalation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Instalación'));
    });

    return (
        <div>
            <div className="pt-5">


            </div>
        </div>
    );
};

export default Instalation;
