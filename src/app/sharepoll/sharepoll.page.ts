import { Component, OnInit } from '@angular/core';

/* TODO
- replace hand-coded web share api with https://capacitorjs.com/docs/apis/share?
*/

@Component({
  selector: 'app-sharepoll',
  templateUrl: './sharepoll.page.html',
  styleUrls: ['./sharepoll.page.scss'],
})
export class SharepollPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /*
  shareButton.addEventListener("click", async () => {
    try {
      await navigator.share({ title: "Example Page", url: "THE MAGIC LINK!" });
      console.log("Data was shared successfully");
    } catch (err) {
      console.error("Share failed:", err.message);
    }
  });
  */
}
