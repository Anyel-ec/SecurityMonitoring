import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';

const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Inicio'));
    });

    return (
        <div>
            <div className="pt-5">


            </div>
        </div>
    );
};

export default Index;