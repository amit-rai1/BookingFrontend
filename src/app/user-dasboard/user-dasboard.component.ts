import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { Room } from '../models/room.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user-dasboard',
  templateUrl: './user-dasboard.component.html',
  styleUrls: ['./user-dasboard.component.css']
})
export class UserDasboardComponent implements OnInit {

  availableRooms: Room[] = [];
  selectedRoomId: string = '';
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null

  constructor(private commonService: CommonServiceService) { }

  ngOnInit(): void {
    // Call the service methods here or in any other lifecycle hook as needed
    this.getAvailableRooms();
  }

  getAvailableRooms(): void {
    this.commonService.getAvailableRooms().subscribe(
      (response: { rooms: Room[] }) => {
        this.availableRooms = response.rooms;
      },
      (error) => {
        console.error('Error getting available rooms:', error);
        // Handle the error here, e.g., show an error message
      }
    );

}
openBookingForm(roomId: string): void {
  this.selectedRoomId = roomId;
  this.checkInDate = null;
  this.checkOutDate = null;
}

closeBookingForm(): void {
  this.selectedRoomId = '';
  this.checkInDate = null;
  this.checkOutDate = null;
}

bookRoom(): void {
  if (this.selectedRoomId && this.checkInDate && this.checkOutDate) {
    const bookingData = {
      roomId: this.selectedRoomId,
      userId: 'user_id_here', // Replace with the actual user ID
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate
    };

    this.commonService.bookRoom(bookingData).subscribe(
      (response) => {
        console.log('Booking successful:', response);
        Swal.fire('Success', 'Bokking successful!', 'success');
        
        // Handle the success message or any further actions here
      },
      (error) => {
        console.error('Error booking room:', error);
        // Handle the error message or any error-related actions here
      }
    );
  } else {
    console.log('Invalid booking data');
  }
}
}