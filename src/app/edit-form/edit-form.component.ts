import { Component, Input,EventEmitter,Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
// import { Room } from '../room.models';
import { Room } from '../models/room.model';
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent    {
  // @Input() room!: Room;
  @Output() onSave: EventEmitter<Room> = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  
  @Input() room: Room | undefined;
  editRoomForm: FormGroup;
  availableRooms: Room[] = []; 

  constructor(private formBuilder: FormBuilder, private commonService: CommonServiceService) {
    this.editRoomForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  ngOnChanges(): void {
    if (this.room) {
      this.editRoomForm.patchValue({
        name: this.room.name,
        description: this.room.description,
        price: this.room.price,
      });
    }
  }

  onSubmit(): void {
    if (this.editRoomForm.valid && this.room) {
      const updatedRoom: Room = {
        ...this.room,
        name: this.editRoomForm.value.name,
        description: this.editRoomForm.value.description,
        price: this.editRoomForm.value.price,
      };

     


      this.commonService.updateRoom(this.room._id, updatedRoom).subscribe(
        () => {
          // Update the room details in the availableRooms array
          const index = this.availableRooms.findIndex((r) => r._id === updatedRoom._id);
          if (index !== -1) {
            this.availableRooms[index] = { ...updatedRoom };
          
          }
          alert("update Succssfully")
          window.location.reload();
          
        },
        (error) => {
          console.error('Error updating room:', error);
        }
      );
      this.onSave.emit(updatedRoom);
    }
  }
  onCancelEdit(): void {
    this.onCancel.emit();
  }

}
