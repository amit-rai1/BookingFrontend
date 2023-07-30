// booking.model.ts

export interface Booking {
    _id: string;
    roomId: string;
    userId: string;
    checkInDate: Date;
    checkOutDate: Date;
    status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  }
  
  // Additional properties can be added based on your specific requirements
  