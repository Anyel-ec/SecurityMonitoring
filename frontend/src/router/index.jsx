import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                {route.element}
            </Suspense>
        ),
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
