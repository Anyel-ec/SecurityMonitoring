import { lazy } from "react";

const DatabaseConnectionForm = lazy(() => import("../pages/DatabaseConnectionForm"));

const routes = [
    {
        path: "/", 
        element: <DatabaseConnectionForm />,
    }
];

export { routes };
