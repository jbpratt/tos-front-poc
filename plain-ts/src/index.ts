import { Empty, Menu, Category } from '../_proto/mookies_pb';
import { MenuServiceClient, ServiceError } from '../_proto/mookies_pb_service';
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
    console.log(_menu);
    this.menu = _menu.getCategoriesList();
  }

  load() {
    this.requestMenu();
  }
}

const menuService = new MenuServiceClient(host);
const menuApp = new MenuApp(menuService);
menuApp.load();