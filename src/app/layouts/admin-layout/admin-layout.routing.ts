import { Routes } from '@angular/router';
import { EtudiantsComponent } from 'app/etudiants/etudiants.component';
import { MatieresComponent } from 'app/matieres/matieres.component';
import { NotesComponent } from 'app/notes/notes.component';

import { DashboardComponent } from '../../dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'accueil',      component: DashboardComponent },
    { path: 'matieres',   component: MatieresComponent },
    { path: 'etudiants',     component: EtudiantsComponent },
    { path: 'notes',     component: NotesComponent },

];
