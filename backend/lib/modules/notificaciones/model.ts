import * as mongoose from 'mongoose';

export interface INotificacion {
    _id?: mongoose.Types.ObjectId; // Optional _id field
    user: mongoose.Types.ObjectId;
    content: string;
    importancia: number; 
    
}