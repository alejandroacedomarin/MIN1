import * as mongoose from 'mongoose';

export interface IPlace {
    _id?: mongoose.Types.ObjectId; // Optional _id field
    title: string;
    content: string;
    author: mongoose.Types.ObjectId; // Reference to the User collection
    reviews?: mongoose.Types.ObjectId[];
    rating: number;
    coords: {
        latitude: number;
        longitude: number;
    };
    photo: string;
    //location: string;
    typeOfPlace: {
        bankito: boolean;
        public: boolean; //false = private true = public
        covered: boolean;
    };
    schedule: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    address: string;
    place_deactivated:boolean;
    creation_date: Date;
    modified_date: Date;


}