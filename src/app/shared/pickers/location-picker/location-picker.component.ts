import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import {
  ModalController,
  ActionSheetController,
  AlertController,
} from "@ionic/angular";
import { MapModalComponent } from "../../map-modal/map-modal.component";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../../environments/environment";
import { map, switchMap } from "rxjs/operators";
import { ShopLocationI, CoordinatesI } from "../../../../model/Location.model";
import { of } from "rxjs";
import { Plugins, Capacitor } from "@capacitor/core";

@Component({
  selector: "app-location-picker",
  templateUrl: "./location-picker.component.html",
  styleUrls: ["./location-picker.component.scss"],
})
export class LocationPickerComponent implements OnInit {
  selectedLocationImage: string;
  isLoading = false;
  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private actionSheet: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  @Output() locationPick = new EventEmitter<ShopLocationI>();
  @Input() showPrevioew = false;
  ngOnInit() {}

  onPickLocation() {
    this.actionSheet
      .create({
        header: "Please choose",
        buttons: [
          {
            text: "Auto-Locatie",
            handler: () => {
              this.locateUser();
            },
          },
          {
            text: "Pick on Map",
            handler: () => {
              this.openMap();
            },
          },
          { text: "Cancel", role: "cancel" },
        ],
      })
      .then((sheetEle) => {
        sheetEle.present();
      });
  }

  private locateUser() {
    if (!Capacitor.isPluginAvailable("Geolocation")) {
      this.createErrorAlert();
      return;
    }
    this.isLoading = true;
    Plugins.Geolocation.getCurrentPosition()
      .then((geoPosition) => {
        const coordinates: CoordinatesI = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        };

        this.createPlace(coordinates.lat, coordinates.lng);
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.createErrorAlert();
      });
  }

  private createPlace(lat: number, lng: number) {
    const pickedLocation: ShopLocationI = {
      lat: lat,
      lng: lng,
      address: null,
      staticMapImageUrl: null,
    };

    this.getAddress(lat, lng)
      .pipe(
        switchMap((address) => {
          pickedLocation.address = address;
          return of(
            this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14)
          );
        })
      )
      .subscribe((staticMapUrl) => {
        pickedLocation.staticMapImageUrl = staticMapUrl;
        this.selectedLocationImage = staticMapUrl;
        this.locationPick.next(pickedLocation);
      });
  }

  private openMap() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
      })
      .then((modelEl) => {
        modelEl.onDidDismiss().then((modalData) => {
          if (!modalData.data) {
            return;
          }
          const coordinates: CoordinatesI = {
            lat: modalData.data.lat,
            lng: modalData.data.lng,
          };

          this.createPlace(coordinates.lat, coordinates.lng);
        });
        modelEl.present();
      });
  }

  private getAddress(lat: number, lng: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`,
        {
          headers: {
            skip: "true",
          },
        }
      )
      .pipe(
        map((geoData) => {
          console.log(geoData);
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap&markers=color:red%7Clabel:Shop%7C${lat},${lng}&key=${environment.googleMapsAPIKey}`;
  }

  private createErrorAlert() {
    this.alertCtrl
      .create({
        header: "Could Not Fetch Location",
        message: "please use Map to pick the Location",
        buttons: ["Okay"],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
