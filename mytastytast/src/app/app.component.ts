import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { NgServiceWorker, NgPushRegistration } from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private snackBar: MdSnackBar, private ngsw: NgServiceWorker) { }

  updateNetworkStatusUI() {

    if (navigator.onLine) {
      (document.querySelector('body') as any).style = "";
    } else {
      (document.querySelector('body') as any).style = "filter: grayscale(1)";
    }
  }

  subscribeToPush() {

    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        this.ngsw
          .registerForPush({ applicationServerKey: "replace-with-your-public-key" })
          .subscribe((registration: NgPushRegistration) => console.log(registration));
      }
    })
  }

  ngOnInit() {

    this.checkServiceWorkerStatus();
    this.checkNetworkStatus();
    this.checkInstallStatus();
  }

  private checkNetworkStatus() {
    this.updateNetworkStatusUI();
    window.addEventListener("online", this.updateNetworkStatusUI);
    window.addEventListener("offline", this.updateNetworkStatusUI);
  }

  private checkInstallStatus() {
    if ((navigator as any).standalone === false) {
      // iOS device in the browser
      this.snackBar
        .open('You can add this App as PWA to your home screen', null, { duration: 3000 });
    }
    if ((navigator as any).standalone === undefined) {
      // all the others
      if (window.matchMedia('display-mode: browser').matches) {
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();
          const sb = this.snackBar.open('Do You want install this App.', 'install', { duration: 5000 });
          sb.onAction()
            .subscribe(() => {
              (event as any).prompt();
              (event as any).userChoice.then(result => {
                if (result.outcome === 'dismissed') {
                  //TODO: tracking stuff
                }
                else {
                  //TODO: tracking stuff
                }
              });
            });
          return false;
        });
      }
    }
  }

  private checkServiceWorkerStatus() {
    this.ngsw.updates.subscribe(update => {
      if (update.type === 'pending') {
        const sb = this.snackBar.open('There is an update do you should update now?', "Update Now", { duration: 4000 });
        sb.onAction().subscribe(() => {
          this.ngsw
            .activateUpdate(update.version)
            .subscribe(e => {
              console.log("App is updated!");
              location.reload();
            });
        });
      }
    });
    this.ngsw.checkForUpdate();
  }
}
