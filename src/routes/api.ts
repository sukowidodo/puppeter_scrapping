import { Router } from 'express';

// import UserRoutes from './UserRoutes';

import AdzanRoutes from './AdzanRoutes';


// **** Variables **** //

const apiRouter = Router();


// ** Add UserRouter ** //

const adzanRoute = Router();
adzanRoute.get("/",AdzanRoutes.getAll)

// Add UserRouter
apiRouter.use("adzan", adzanRoute);


// **** Export default **** //

export default apiRouter;
