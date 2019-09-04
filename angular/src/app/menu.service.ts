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
  client: MenuServiceClient;

  constructor() {
    this.client = new MenuServiceClient(host);
  }

  get(): Promise <object> {
    return new Promise((resolve, reject) => {
      const req = new Empty();
      this.client.getMenu(req, null, (err, response: Menu) => {
        if (err) {
          return reject(err);;
        }
        resolve(response.toObject());
      });
    });
  }
}
