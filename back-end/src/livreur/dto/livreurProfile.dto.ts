export class LivreurProfileDTO {
  id: string;
  name?: string;
  phone?: string;
  transportType?: string;
  vehicleRegistration?: string;
  vehicleImages?: string[];
  averageRating?: number;
  totalReviews?: number;
  totalDeliveries?: number;
  successRate?: number;
  responseTime?: number;
  totalDistance?: number;
}
