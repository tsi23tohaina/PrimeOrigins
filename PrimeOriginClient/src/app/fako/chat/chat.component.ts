import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  loading = false;
  fileName: string | null = null;
  formData = new FormData();
  responseMessage: string = ''; 
  questionState = true;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      // Ajoutez les autres champs
      this.formData.append('file', file);
      this.formData.append('sms', 'Donner une deuxime vie à cette image en proposant 3 ideé en forme ');
      // this.formData.append('iteration', '1'); // ou autre valeur
    } else {
      this.fileName = null;
    }
  }
  

  analyse(): void {
    console.log(this.formData);
    
    if (this.formData.has('file')) {  // Vérifier que le fichier est bien ajouté à formData
      this.loading = true;
      this.http.post('http://10.166.2.156:8000/upload', this.formData).subscribe(
        (response:any) => {

          console.log('Upload réussi', response);
          this.loading = false;
          this.responseMessage = response.response;
          this.questionState=false;
        },
        error => {
          console.error('Erreur lors de l\'upload', error);
          this.loading = false;
        }
      );
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }
}
