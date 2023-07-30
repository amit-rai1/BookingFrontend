import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommonServiceService } from '../services/common-service.service';
import { CommonServiceService } from '../common-service.service';
import { Router } from '@angular/router';
// import { Room } from '../room.model';
import { Room } from '../models/room.model';
import { Booking } from '../models/booking.model';
import Swal from 'sweetalert2';
import { EditFormComponent } from '../edit-form/edit-form.component';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  bookings: any[]= [];
  addRoomForm: FormGroup = new FormGroup({});
  availableRooms: any[] = [];
  selectedRoom: Room | undefined;
  showTable: boolean = false;

  constructor(private formBuilder: FormBuilder, private commonService: CommonServiceService,private router: Router) {
    this.availableRooms = [];
    this.bookings= []

  }

  ngOnInit(): void {
    this.addRoomForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.getAvailableRooms();
    this.getBookings();
  }

  getAvailableRooms() {
    this.commonService.getAvailableRooms().subscribe(
      (response: { rooms: any[] }) => {
        this.availableRooms = response.rooms;
      },
      (error) => {
        console.error('Error getting available rooms', error);
      }
    );
  }
  getBookings() {
    this.commonService.getBookings().subscribe(
      (response: { bookingRequests: any[] }) => {
        console.log(response, "abc");
        this.bookings = response.bookingRequests;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }


  onAddRoomSubmit() {
    if (this.addRoomForm.valid) {
      this.commonService.addRoom(this.addRoomForm.value).subscribe(
        (response: { message: string; room: any }) => {
          Swal.fire('Room added successfully!', response.message);
          this.addRoomForm.reset();
          this.getAvailableRooms(); // Refresh the list of available rooms
        },
        (error) => {
          console.error('Error adding room', error);
        }
      );
    } else {
      console.log('Invalid form');
    }
  }

  onEditRoom(room: Room): void {
    this.selectedRoom = room;
  }

  onModalClose(): void {
    this.selectedRoom = undefined;
  }

  onSaveRoom(updatedRoom: Room): void {
    this.commonService.updateRoom(updatedRoom._id, updatedRoom).subscribe(
      () => {
        const index = this.availableRooms.findIndex((room) => room._id === updatedRoom._id);
        if (index !== -1) {
          this.availableRooms[index] = { ...updatedRoom };
        }
        this.selectedRoom = undefined; // Close the modal after successful update
       
      },
      (error) => {
        console.error('Error updating room:', error);
      }
    );
  }
  

  onDeleteRoom(roomId: string) {
    this.commonService.deleteRoom(roomId).subscribe(
      (response: { message: string }) => {
        Swal.fire('Room deleted successfully!', response.message);
        this.getAvailableRooms(); // Refresh the list of available rooms after deletion
      },
      (error) => {
        console.error('Error deleting room', error);
      }
    );
  }
  
  acceptBooking(bookingId: string): void {
    this.commonService.acceptBooking(bookingId).subscribe(
      () => {
        // Refresh the bookings after accepting
        this.getBookings();
      },
      (error) => {
        console.error('Error accepting booking:', error);
      }
    );
  }
  rejectBooking(bookingId: string): void {
    this.commonService.rejectBooking(bookingId).subscribe(
      () => {
        // Refresh the bookings after rejecting
        this.getBookings();
      },
      (error) => {
        console.error('Error rejecting booking:', error);
      }
    );
  }

  cancelBooking(bookingId: string): void {
    this.commonService.cancelBooking(bookingId).subscribe(
      () => {
        // Refresh the bookings after cancelling
        this.getBookings();
      },
      (error) => {
        console.error('Error cancelling booking:', error);
      }
    );
  }
  
  toggleTable(): void {
    this.getBookings()
    this.showTable = !this.showTable;
  }
}
