import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card"
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatFabAnchor} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

@NgModule({
    imports: [
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatInputModule,
        
    ],
    exports: [
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatInputModule,
        
    ]
    
})
export class MaterialModules{}