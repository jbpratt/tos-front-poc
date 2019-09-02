import { Injectable } from '@angular/core';
import { Empty, Menu, Category } from '../../_proto/mookies_pb';
import { MenuServiceClient, ServiceError } from '../../_proto/mookies_pb_service';
import { grpc } from '@improbable-eng/grpc-web';

const host = 'http://localhost:9090';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menu: Category[];
  constructor(public menuService: MenuServiceClient) { }

  getMenu(): Menu | null {
    this.menuService.getMenu(new Empty(),
      (err: ServiceError | null, res: Menu | null) => {
        if (err) {
          if (err.code === grpc.Code.OK) {
            return res;
          } else {
            console.log("failed to get menu:" + err);
            return null;
          }
        } else {
          if (res) {
            return res;
          }
          return null;
        }
      })
    return null;
  }
}
