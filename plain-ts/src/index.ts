import { Empty, Menu, Category, Item } from '../../_proto/mookies_pb';
import { MenuServiceClient, ServiceError } from '../../_proto/mookies_pb_service';
import * as $ from 'jquery';

const host = 'http://localhost:9090';

class MenuApp {
  menu: Category[];
  client: MenuServiceClient;
  constructor() {
    this.client = new MenuServiceClient(host);
  }

  getMenuAsync(): Promise<Menu> {
    return new Promise((resolve, reject) => {
      const req = new Empty();
      this.client.getMenu(req, (err: ServiceError, response: Menu) => {
        if (err) {
          return reject(err);;
        };
        resolve(response);
      });
    });
  }

  setMenu(_menu: Menu) {
    this.menu = _menu.getCategoriesList();
  }

  load() {
    this.getMenuAsync().then((val) => 
      this.setMenu(val)).then(() => this.build());
  }

  build() {
    $(document).ready(() => {
      var menu: HTMLDivElement = document.createElement('div');
      var ulist: HTMLUListElement = document.createElement('ul');

      this.menu.map(function (cat: Category) {
        var li: HTMLLIElement = document.createElement('li');
        var div: HTMLDivElement = document.createElement('div');
        var h4: HTMLHeadingElement = document.createElement('h4');
        h4.innerText = cat.getName();
        div.appendChild(h4);
        var itemList: HTMLUListElement = document.createElement('ul');
        cat.getItemsList().map((i: Item) => {
          var p: HTMLParagraphElement = document.createElement('p');
          p.innerText = i.getName();
          itemList.appendChild(p);
        });
        div.appendChild(itemList);
        li.appendChild(div);
        ulist.appendChild(li);
      });
      menu.appendChild(ulist);
      $('#menu').append(menu);
    })
  }
}

const menuApp = new MenuApp();
menuApp.load();
