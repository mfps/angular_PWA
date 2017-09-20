import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private snackBar: MdSnackBar) { }

  ngOnInit() {
    if ((navigator as any).standalone === false) {
      // iOS device in the browser
      this.snackBar.open('You can add this App as PWA to your home screen', null, { duration: 3000 })
    }
    if ((navigator as any).standalone === undefined) {
      // all the others
      if (window.matchMedia('display-mode: browser').matches) {
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();
          const sb = this.snackBar.open('Do You want install this App.', 'install', { duration: 5000 })
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then(result => {
              if (result.outcome === 'dismissed') {
                //TODO: tracking stuff
              } else {
                //TODO: tracking stuff
              }
            });
          })
          return false;
        })
      }
    }
  }
}
