import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  showNotification(type: 'noti-error' | 'noti-success', message: string): void {
    // const notification = document.getElementById(type);
    // if (notification) {
    //   notification.innerHTML = message;
    //   notification.style.display = 'block';
    //   setTimeout(() => { notification.style.display = 'none' }, 3500);
    // }

    const notiParent = document.getElementById(type);
    if (notiParent) {
      const notiChild = document.createElement("div");
      notiChild.setAttribute('class', type == 'noti-error' ? 'notification is-danger' : 'notification is-success');
      notiChild.innerHTML = message;
      notiParent.appendChild(notiChild);
      notiChild.style.display = 'block';
      setTimeout(() => { notiChild.style.display = 'none' }, 5000);
    }
  }
}
