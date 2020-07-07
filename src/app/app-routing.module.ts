import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "./auth/auth-guard.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "owner",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((m) => m.AuthPageModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./user/user.module").then((m) => m.UserPageModule),
    canLoad: [AuthGuardGuard],
  },
  {
    path: "owner",
    loadChildren: () =>
      import("./owner/owner.module").then((m) => m.OwnerPageModule),
    canLoad: [AuthGuardGuard],
  },
  {
    path: 'popover-component',
    loadChildren: () => import('./popover-component/popover-component.module').then( m => m.PopoverComponentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
