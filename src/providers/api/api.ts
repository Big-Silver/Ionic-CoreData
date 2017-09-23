import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { SERVER_API, MAPS_API } from '../../theme/share';

@Injectable()
export class ApiProvider {

  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }

  getReferenceTypes() {
    let url = SERVER_API + 'Reference/objectType';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(data => {
        resolve(data.json());
      });
    });
  }

  getReferenceBoroughs() {
    let url = SERVER_API + 'Reference/borough';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(data => {
        resolve(data.json());
      });
    });
  }

  getReferenceNeighborhoods() {
    let url = MAPS_API + 'Neighborhoods';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(data => {
        resolve(data.json());
      });
    });
  }

  getReferences(reference, pageNum) {
    let url = SERVER_API + 'LPCReport/5/' + pageNum;
    let params = new URLSearchParams();
    params.set('Borough', reference.borough);
    params.set('ObjectType', reference.type);
    params.set('Neighborhood', reference.neighborhood);
    return new Promise((resolve, reject) => {
      this.http.get(url, {search: params}).subscribe(data => {
        resolve(data.json());
      });
    });
  }
}
