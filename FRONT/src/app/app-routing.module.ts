import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'board',
        loadChildren: () => import('./ui/board/board.module').then((m) => m.BoardModule)
    },
    {
        path: '',
        redirectTo: '/board',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/board',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
