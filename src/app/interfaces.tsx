import { Timestamp } from "firebase/firestore";

export interface Player {
    address: string;
    allergies: string;
    bloodtype: string;
    carnetId?: string;
    dob: Timestamp;
    email: string;
    emergencycontact: string;
    idnumber: string;
    idpicture: string;
    names: string;
    lastnames: string;
    pantsize: string;
    phone: string;
    playingposition: string;
    portraitpicture: string;
    bannerpicture: string;
    position: string;
    ranking: string;
    sex: string;
    shirtsize: string;    
}
