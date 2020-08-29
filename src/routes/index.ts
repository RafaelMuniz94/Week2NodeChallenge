import { Router,Request,Response, NextFunction} from 'express';
import transactionRouter from './transaction.routes';

const routes = Router();

function Log(request: Request,response: Response, next: NextFunction) {
    let message = `[${request.method}] - ${request.url}`
    console.time(message)

    next()

    console.timeEnd(message)
}
routes.use(Log)
routes.use('/transactions', transactionRouter);

export default routes;
