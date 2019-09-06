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

  whatTimeIsIt() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    $(".time").html(t);
  }

  buildMenu() {
    this.menu.map(function (cat: Category) {
      var catDiv: HTMLDivElement = document.createElement('div');
      catDiv.className = "grid-item";
      var catH4: HTMLHeadingElement = document.createElement('h4');
      catH4.innerText = cat.getName();
      catDiv.appendChild(catH4);
      var itemList: HTMLUListElement = document.createElement('ul');
      cat.getItemsList().map((i: Item) => {
        var ili: HTMLLIElement = document.createElement('li');
        var btn: HTMLButtonElement = document.createElement('button');
        btn.className = "menuItemBtn";
        btn.textContent = i.getName();
        ili.appendChild(btn);
        itemList.appendChild(ili);
      });
      catDiv.appendChild(itemList);
      $('#menu').append(catDiv);
    });

  }

  build() {
    $(() => {
      setInterval(this.whatTimeIsIt, 1000);
      // this should be called based on the current 
      // setting (which side of the meun)
      this.buildMenu();
    })
  }
}

const menuApp = new MenuApp();
menuApp.load();
