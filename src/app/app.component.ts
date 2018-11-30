import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuItem } from 'primeng/api';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFirestore]
})

export class AppComponent implements OnInit {
  title = 'Heimdall';
  private map: any;

  public _items: MenuItem[];

  public _options: any;
  public _overlays: any[];

  public _errorMessage;
  public _ocurrence: any;
  public _ocurrences: any[];

  constructor(db: AngularFirestore) {
    this._ocurrences = [];

    db.collection('/ocurrences').valueChanges().subscribe(
      ocurrences => this.initMap(ocurrences),
      error => this._errorMessage = <any>error
    );
  }

  private normalizeOcurrences(ocurrences) {
    ocurrences.forEach(ocurrence => {
      if ((ocurrence.location_name === undefined) || (ocurrence.location_name === null)) {
        ocurrence.location_name = 'UNDEFINED';
      }
      if ((ocurrence.url === undefined) || (ocurrence.url === null)) {
        ocurrence.url = 'UNDEFINED';
      }
    });
  }

  private initMap(ocurrences) {
    this.normalizeOcurrences(ocurrences);

    this._overlays = [];
    this._ocurrences = ocurrences;

    // Add first ocurrence to center
    this.map.setCenter({lat: this._ocurrences[0].location._lat, lng: this._ocurrences[0].location._long});

    // Mark ocurrences on map
    this._ocurrences.forEach(ocurrence => {
      this._overlays.push(new google.maps.Marker({
        position: {lat: ocurrence.location._lat, lng: ocurrence.location._long}, title: ocurrence.location_name})
      );
    });
  }

  ngOnInit() {
      // Add Natal/RN as a Center of map
      this._options = {
          center: {lat: -5.7999146, lng: -35.2922841},
          zoom: 16
      };

      this._items = [
        {
            label: 'File',
            items: [{
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
    ];
  }

  public setMap(event) {
    this.map = event.map;
  }

}
