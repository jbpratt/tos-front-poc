import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Category, Menu } from '_proto/mookies_pb';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: Menu;
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.menu = this.menuService.getMenu();
  }
}
