
export class CreateUserDto {
    email: string;
    nom: string;
    prenom: string;
    password: string;
    telephone?: string;
    adresse?: string;
    role: 'seller' | 'courier';
}
