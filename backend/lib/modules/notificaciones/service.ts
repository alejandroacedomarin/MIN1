import { INotificacion } from './model';
import notificaciones from './schema';
import { FilterQuery } from 'mongoose';

export default class NotificacionService {
    
    public async createNoti(post_params: INotificacion): Promise<INotificacion> {
        try {
            const session = new notificaciones(post_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterOneNoti(query: any): Promise<INotificacion | null> {
        try {
            return await notificaciones.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async filterNoti(query: any, page: number, pageSize: number): Promise<INotificacion[] | null> {
        try {
            const skipCount = (page - 1) * pageSize;
            const updatedQuery = { ...query, place_deactivated: { $ne: true } };
            return await notificaciones.find(updatedQuery).skip(skipCount).limit(pageSize);
        } catch (error) {
            throw error;
        }
    }
    
    

    public async updateNoti(noti_params: INotificacion): Promise<void> {
        try {
            const query = { _id: noti_params._id };
            await notificaciones.findOneAndUpdate(query, noti_params);
        } catch (error) {
            throw error;
        }
    }

    public async deleteNoti(_id: string): Promise<{ deletedCount: number }>{
        
        try {
            const query = { _id: _id };
            return await notificaciones.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }

}