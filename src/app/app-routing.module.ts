import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { AdminGuard } from './auth/admin.guard';
import { AccountComponent } from './components/account/account.component';
import { AuthguardGuard } from './auth/authguard.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gamesection',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  { path: 'account', component: AccountComponent, canActivate:[AuthguardGuard] },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  {path : 'gamesection',
   loadChildren: () => import('./gamesection/gamesection.module').then( m =>
     m.GamesectionPageModule)  , canActivate:[AuthguardGuard]},
  { path: 'leaderboard',
   loadChildren: './leaderboard/leaderboard.module#LeaderboardPageModule'  , canActivate:[AuthguardGuard] },
  { path: 'playdemo',
   loadChildren: './playdemo/playdemo.module#PlaydemoPageModule' , canActivate:[AuthguardGuard] },
  { path: 'profile',
   loadChildren: './profile/profile.module#ProfilePageModule'  , canActivate:[AuthguardGuard] },
  { path: 'myrecord',
   loadChildren: './myrecord/myrecord.module#MyrecordPageModule' , canActivate:[AuthguardGuard]},
  { path: 'playsection',
   loadChildren: './playsection/playsection.module#PlaysectionPageModule',canActivate:[AuthguardGuard] },
 

  //  admin routes
  { path: 'admin-upload',
   loadChildren: './admin-upload/admin-upload.module#AdminUploadPageModule',
   canActivate:[AuthguardGuard, AdminGuard] },
  { path: 'manage-users',
   loadChildren: './manage-users/manage-users.module#ManageUsersPageModule',
    canActivate:[AuthguardGuard, AdminGuard] },
  { path: 'manage-questions',
   loadChildren: './manage-questions/manage-questions.module#ManageQuestionsPageModule',
    canActivate:[AuthguardGuard, AdminGuard] },
  { path: 'payouts',
   loadChildren: './payouts/payouts.module#PayoutsPageModule',
    canActivate:[AuthguardGuard, AdminGuard] },
  { path: 'admin-account',
   loadChildren: './admin-account/admin-account.module#AdminAccountPageModule',
    canActivate:[AuthguardGuard, AdminGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
