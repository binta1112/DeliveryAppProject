
export class CreateUserDto {
    email: string;
    nom: string;
    prenom: string;
    password: string;
    telephone?: string;
    adresse?: string;
    role: 'seller' | 'courier';
    vehicule_type: 'SCOOTER' | 'CAR' | 'BIKE' | 'VAN';
    vehicule_matricule: string;
    vehicule_images?: string[]; // URLs des images du véhicule
}
