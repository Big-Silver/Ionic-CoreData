import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api'

@IonicPage()
@Component({
  selector: 'page-lpcreport',
  templateUrl: 'lpcreport.html',
})
export class LpcreportPage {
  title = '';
  reference = {type: '', borough: '', neighborhood: ''};

  origin_types: any;
  origin_boroughs: any;
  origin_neighborhoods: any;

  types: any;
  boroughs: any;
  neighborhoods: any;
  tempNeighborhoods: any;
  references: any;

  pageNum: number = 1;

  showTypes: boolean = false;
  showBorough: boolean = false;
  showNeighborhood: boolean = false;
  keyString: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private apiProvider: ApiProvider,
    public loadingCtrl: LoadingController
  ) {
    this.title = typeof this.navParams.get('title') === 'undefined' ? 'LPC Report' : this.navParams.get('title');
    this.apiProvider.getReferenceTypes().then((res: any) => {
      this.origin_types = res;
      this.types = res;
    });
    this.apiProvider.getReferenceBoroughs().then((res: any) => {
      this.origin_boroughs = res;
      this.boroughs = res;
    });
    this.apiProvider.getReferenceNeighborhoods().then((res: any) => {
      this.tempNeighborhoods = res;
    });

    this.getReferences();
  }

  doInfinite(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.pageNum ++; 
        this.apiProvider.getReferences(this.reference, this.pageNum).then((res: any) => {
          res.map(r => {
            this.references.push(r);
          });
        });
        resolve();
      }, 1000);
    })
  }

  ionViewDidLoad() {}

  getReferences() {
    this.apiProvider.getReferences(this.reference, 1).then(res => {
      this.references = res;
    });
  }

  setType(type) {
    this.reference.type = type;
    this.showTypes = false;
    this.getReferences();
  }

  setBorough(borough) {
    this.neighborhoods = [];
    this.origin_neighborhoods = [];
    this.reference.borough = borough;
    this.showBorough = false;
    if (borough == "Manhattan") {
      this.tempNeighborhoods.map(t => {
        if (t.location.search("Manhattan") != -1) {
          this.origin_neighborhoods.push(t.name);
          this.neighborhoods.push(t.name);
        }
      })
    } else {
      this.tempNeighborhoods.map(t => {
        if (t.location === borough) {
          this.origin_neighborhoods.push(t.name);
          this.neighborhoods.push(t.name);
        }
      });
    }
    this.getReferences();
  }

  setNeighborhood(neighborhood) {
    this.reference.neighborhood = neighborhood;
    this.showNeighborhood = false;
    this.getReferences();
  }
  
  focus(type) {
    this.keyString = '';
    this.showTypes = false;
    this.showBorough = false;
    this.showNeighborhood = false;
    if (type == 'showType') this.showTypes = true;
    else if (type == 'showBorough') this.showBorough = true;
    else this.showNeighborhood = true;
  }

  clearInput(type) {
    this.keyString = '';
    this.types = this.origin_types;
    this.boroughs = this.origin_boroughs;
    this.neighborhoods = this.origin_neighborhoods;
    if (type == 'showType') this.reference.type = '';
    else if (type == 'showBorough') this.reference.borough = '';
    else this.reference.neighborhood = '';
    this.getReferences();
    this.showTypes = false;
    this.showBorough = false;
    this.showNeighborhood = false;
  }

  keyup(event, type) {
    let temp = [];
    if (type == "showType") {
      temp  = this.origin_types;
      this.types = [];
      temp.map(t => {
        if (t.toLowerCase().search(event.target.value.toLowerCase()) != -1) {
          this.types.push(t);
        }          
      });
    } else if (type == "showBorough") {
      temp = this.origin_boroughs;
      this.boroughs = [];
      temp.map(t => {
        if (t.toLowerCase().search(event.target.value.toLowerCase()) != -1) {
          this.boroughs.push(t);
        }          
      });
    } else {
      if (typeof this.origin_neighborhoods != 'undefined') {
        temp = this.origin_neighborhoods;
        this.neighborhoods = [];
        temp.map(t => {
          if (t.toLowerCase().search(event.target.value.toLowerCase()) != -1) {
            this.neighborhoods.push(t);
          }          
        });
      }      
    }
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }  
}
