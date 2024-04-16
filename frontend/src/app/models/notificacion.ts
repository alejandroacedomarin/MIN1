import * as mongoose from 'mongoose';

export interface Notificacion {
    _id?: mongoose.Types.ObjectId; // Optional _id field
    user?: mongoose.Types.ObjectId; // Reference to the User collection
    content: string;
    importancia: number;
    
}