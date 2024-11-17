import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent {
  registryForm: FormGroup;

  // URL de l'API Flask (modifiez selon votre serveur distant)
  private apiUrl = 'http://127.0.0.1:5000/api/register';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Ajoutez Router ici
  ) { 
    // Initialisation du formulaire
    this.registryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Fonction pour soumettre les données du formulaire
  onSubmit() {
    if (this.registryForm.valid) {
      const formData = this.registryForm.value;
  
      this.http.post(this.apiUrl, formData).subscribe({
        next: (response) => {
          console.log('Enregistré avec succès :', response);
          alert('Compte créé avec succès !');
  
          // Redirection vers la page de connexion
          this.router.navigate(['/login']); // Remplacez '/login' par le chemin de votre page de connexion
        },
        error: (err) => {
          console.error('Erreur lors de l\'enregistrement :', err);
          alert('Une erreur s\'est produite. Veuillez réessayer.');
        },
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
  
}
