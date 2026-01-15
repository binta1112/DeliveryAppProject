export default interface SubscribeData {
  fullName: string;
  email: string;
  password: string;
  role: 'customer' | 'courier';
  vehicleType?: 'bike' | 'car' | 'truck';
  vehicleMatricule?:string;
  vehicleImages?:File[]

}
