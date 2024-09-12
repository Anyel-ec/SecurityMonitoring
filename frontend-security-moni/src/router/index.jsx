import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import { Suspense } from 'react';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                {route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : route.element}
            </Suspense>
        ),
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
