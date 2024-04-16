import { Request, Response } from 'express';
import { INotificacion } from '../modules/notificaciones/model';
import NotificacionService from '../modules/notificaciones/service';
import UserService from '../modules/users/service';
import * as mongoose from 'mongoose';

export class NotiController {

  private noti_service: NotificacionService = new NotificacionService();
  private user_service: UserService = new UserService();

  public async create_noti(req: Request, res: Response) {
      try {
        // this check whether all the fields were sent through the request or not
        if (
          req.body.user&&
          req.body.content &&
          req.body.importancia 
        ) {
          const noti_params: INotificacion = {
            user: req.body.user,
            content: req.body.content,
            importancia: req.body.importancia,
            
          };
          console.log(noti_params);
          const noti_data = await this.noti_service.createNoti(noti_params);
          console.log(noti_data);
          await this.user_service.addNotiToUser(req.body.user, noti_data._id);
          return res.status(201).json(noti_data);
        } else {
            
          return res.status(400).json({ error: 'Missing fields' });
        }
      } catch (error) {
        
        return res.status(500).json({ error: 'Internal server error' });
      }
  }

  public async get_noti(req: Request, res: Response) {
      try{
          if (req.params.id) {
              const noti_filter = { _id: req.params.id };
              
              const noti_data = await this.noti_service.filterOneNoti(noti_filter);
              // Send success response
              return res.status(200).json(noti_data);
          } else {
              return res.status(400).json({ error: 'Missing fields' });
          }
      }catch(error){
          return res.status(500).json({ error: 'Internal server error' });
      }
  }
  
  public async get_notis(req: Request, res: Response) {
    try {
        // Extract pagination parameters from query string or use default values
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;

        // Fetch users based on pagination parameters
        const place_data = await this.noti_service.filterNoti({}, page, pageSize);

        // Send success response
        return res.status(200).json(place_data);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

 
  
  public async update_noti(req: Request, res: Response) {
    try {
        if (req.params.id) {
            const noti_filter = { _id: req.params.id };
            
            const noti_data = await this.noti_service.filterOneNoti(noti_filter);
            
            const objectid = new mongoose.Types.ObjectId(req.params.id);
            
            const review_params: INotificacion = {
                _id: objectid, 
                user: req.body.user || noti_data.user,
                content: req.body.content || noti_data.content,
                importancia: req.body.importancia || noti_data.importancia,
                
            };
            
            await this.noti_service.updateNoti(review_params);
            
            const new_noti_data = await this.noti_service.filterOneNoti(noti_filter);
            // Send success response
            return res.status(200).json(new_noti_data);
        } else {
            // Send error response if ID parameter is missing
            return res.status(400).json({ error: 'Missing ID parameter' });
        }
    } catch (error) {
        // Catch and handle any errors
        console.error("Error updating:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async delete_noti(req: Request, res: Response) {
    try {
        if (req.params.id) {
            // Delete noti
            const noti_details = await this.noti_service.deleteNoti(req.params.id);
            if (noti_details.deletedCount !== 0) {
                // Send success response if noti deleted
                return res.status(200).json({ message: 'Successful'});
            } else {
                // Send failure response if user not found
                return res.status(400).json({ error: 'Post not found' });
            }
        } else {
            // Send error response if ID parameter is missing
            return res.status(400).json({ error: 'Missing Id' });
        }
    } catch (error) {
        // Catch and handle any errors
        return res.status(500).json({ error: 'Internal server error' });
    }
}
     
}