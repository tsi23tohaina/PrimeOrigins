import { Component } from '@angular/core';
import { FakoService } from '../fako.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  loading = false;
  data = new FormData();
  fileName: string | null = null;

  constructor(private fakoService: FakoService) {}
   formData = new FormData();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
  
      this.formData.append('file', file);
    } else {
      this.fileName = null;
    }
  }

  analyse(){
    this.loading = true;
    this.fakoService.analyseImage(this.formData).subscribe(
      (result: any) => {
        this.loading = false;
      },
      (error: any) => {
       console.log(error);
       this.loading = false;

      }
    )
  }

  }
