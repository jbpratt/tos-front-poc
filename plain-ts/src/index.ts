import { Empty, Menu, Category } from '../../tos-front/_proto/mookies_pb';
import { MenuServiceClient, ServiceError } from '../../tos-front/_proto/mookies_pb_service';
import * as $ from 'jquery';
import { grpc } from '@improbable-eng/grpc-web';

const host = 'http://localhost:9090';

class MenuApp {
  menu: Category[];
  constructor(public menuService: MenuServiceClient) { }

  requestMenu() {
    this.menuService.getMenu(new Empty(),
      (err: ServiceError | null, res: Menu | null) => {
        if (err) {
          if (err.code === grpc.Code.OK) {
            console.log(res)
          }
        } else {
          if (res) {
            this.setMenu(res);
          }
        }
      })
  }

  setMenu(_menu: Menu) {
    this.menu = _menu.getCategoriesList();
    console.log(this.menu);
    this.build();
  }

  load() {
    this.requestMenu();
  }

  build() {
    $(document).ready(function () {
      var elem = document.createElement('div');
      var list = document.createElement('li');

      this.menu.map(function(i: Category) {
        var p = document.createElement('p');
        p.innerText = i.getName();
        list.appendChild(p);
      });

      elem.appendChild(list);
      document.appendChild(elem);
    });
  }
}

const menuService = new MenuServiceClient(host);
const menuApp = new MenuApp(menuService);
menuApp.load();
