import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// import { Room } from '../models/room.model';
import { Room } from './models/room.model';
import { Booking } from './models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  apiURL: any = environment.apiUrl;

  constructor(private http: HttpClient) {}

  userRegister(data: any) {
    console.log("amit", data)
    return this.http.post(`${this.apiURL}/user/signup`, data);
  }
  users(data: any) {
    return this.http.post(`${this.apiURL}/user/login`, data);
  }
  adminLogin(data: any) {
    return this.http.post(`${this.apiURL}/admin/login`, data);
  }
  getAvailableRooms(): Observable<{ rooms: Room[] }> {
    return this.http.get<{ rooms: Room[] }>(`${this.apiURL}/rooms`);
  }
  getBookings(): Observable<{bookingRequests: Booking[]}> {
    return this.http.get<{bookingRequests: Booking[]}>(`${this.apiURL}/bookings/requests`);
  }
  bookRoom(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiURL}/bookings/room`, bookingData);
  }
  addRoom(roomData: any) {
    return this.http.post<any>(`${this.apiURL}/admin/rooms`, roomData);
  }

  updateRoom(roomId: string, roomData: any): Observable<Room> {
    return this.http.put<Room>(`${this.apiURL}/rooms/${roomId}`, roomData);
  }

  deleteRoom(roomId: string) {
    return this.http.delete<any>(`${this.apiURL}/rooms/${roomId}`);
  }

 

  acceptBooking(bookingId: string): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/bookings/accept/${bookingId}`, null);
    }

  rejectBooking(bookingId: string): Observable<any> {
    return this.http.post(`${this.apiURL}/bookings/reject/${bookingId}`, null);
  }

  cancelBooking(bookingId: string): Observable<any> {
    return this.http.post(`${this.apiURL}/bookings/cancel`, { bookingId });
  }

}
