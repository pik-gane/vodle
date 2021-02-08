import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule",
  },
  {
    path: "mypolls",
    loadChildren: "./mypolls/mypolls.module#MypollsPageModule",
  },
  {
    path: "newpoll",
    loadChildren: "./newpoll/newpoll.module#NewpollPageModule",
  },
  {
    path: "openpoll",
    loadChildren: "./openpoll/openpoll.module#OpenpollPageModule",
  },
  {
    path: "closedpoll",
    loadChildren: "./closedpoll/closedpoll.module#ClosedpollPageModule",
  },
  { path: "about", loadChildren: "./about/about.module#AboutPageModule" },
  { path: "help", loadChildren: "./help/help.module#HelpPageModule" },
  {
    path: "addoption",
    loadChildren: "./addoption/addoption.module#AddoptionPageModule",
  },
  {
    path: "pollstats",
    loadChildren: "./pollstats/pollstats.module#PollstatsPageModule",
  },
  {
    path: "explainsupport/:oid",
    loadChildren:
      "./explainsupport/explainsupport.module#ExplainsupportPageModule",
  },  { path: 'register', loadChildren: './home/register/register.module#RegisterPageModule' },
  { path: 'new-group', loadChildren: './home/new-group/new-group.module#NewGroupPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
