import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
  Input,
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-map-modal",
  templateUrl: "./map-modal.component.html",
  styleUrls: ["./map-modal.component.scss"],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) {}

  @ViewChild("map") mapElement: ElementRef;
  @Input() center = { lat: -34.397, lng: 150.644 };
  @Input() selectable = true;
  @Input() closeButtonText = "Cancel";
  @Input() title = "Pick Location";
  clickListener: any;
  googlemaps: any;
  ngOnInit() {}

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then((googleMaps) => {
        this.googlemaps = googleMaps;
        const mapEle = this.mapElement.nativeElement;
        const map = new googleMaps.Map(mapEle, {
          center: this.center,
          zoom: 16,
        });
        this.googlemaps = googleMaps.event.addListenerOnce(map, "idle", () => {
          this.renderer.addClass(mapEle, "visible");
        });

        if (this.selectable) {
          this.clickListener = map.addListener("click", (event) => {
            const selectedCoords = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };
            this.modalCtrl.dismiss(selectedCoords);
          });
        } else {
          const marker = new googleMaps.marker({
            position: this.center,
            map: map,
            title: "Picked Location",
          });
          marker.setMap(map);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  oncancel() {
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;

    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        environment.googleMapsAPIKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject("Google maps SDK not available");
        }
      };
    });
  }

  ngOnDestroy() {
    if (this.clickListener) {
      this.googlemaps.event.removeListener(this.clickListener);
    }
  }
}
