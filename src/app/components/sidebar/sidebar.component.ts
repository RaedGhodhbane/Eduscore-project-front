import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/accueil', title: 'Accueil',  icon: 'dashboard', class: '' },
    { path: '/matieres', title: 'Matières',  icon:'library_books', class: '' },
    { path: '/etudiants', title: 'Eléves',  icon:'person', class: '' },
    { path: '/notes', title: 'Notes',  icon:'bubble_chart', class: '' },
   ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
