import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Category, Menu } from '_proto/mookies_pb';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: Menu.AsObject;
  public collapsed: boolean[]
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.get().then((data: Menu.AsObject) => {
      this.menu = data;
      this.collapsed = new Array<boolean>(this.menu.categoriesList.length).fill(false);
    })
  }
}
