import { Application, Request, Response, NextFunction } from 'express';
import { NotiController } from '../controllers/notificacionController';



export class NotiRoutes {

    private noti_controller: NotiController = new NotiController();
    


    public route(app: Application) {
        
        app.post('/noti', (req: Request, res: Response) => {
            this.noti_controller.create_noti(req, res);
        });

        app.get('/noti/:id', (req: Request, res: Response) => {
            this.noti_controller.get_noti(req, res);
        });

        app.get('/notis', (req: Request, res: Response) => {
            this.noti_controller.get_notis(req, res);
        });

        app.put('/noti/:id', (req: Request, res: Response) => {
            this.noti_controller.update_noti(req, res);
        });

        
        app.delete('/noti/:id', (req: Request, res: Response) => {
            this.noti_controller.delete_noti(req, res);
        });


    }
}