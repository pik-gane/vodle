import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-with-md',
  templateUrl: './text-with-md.component.html',
  styleUrls: ['./text-with-md.component.scss'],
})
export class TextWithMDComponent implements OnInit {
  @Input() text:string ='';
  @Input() language:string ='';
  @Input() color:string ='primary';
  @Input() showTextInline:boolean =false;
  constructor() { }

  ngOnInit() {
    this.text = this.simpleMarkdownTransform(this.text);
  }

  // from stackoverflow.com/questions/73002812/regex-accurately-match-bold-and-italics-items-from-the-input
  simpleMarkdownTransform(markdown) {
    return markdown
      .replace(/</g, '&lt') // disallow tags
      .replace(/>/g, '&gt')
      .replace(
        /(\*{1,3})(.+?)\1(?!\*)/g,
        (match, { length: length }, text) => {
          if (length !== 2)
            text = `<i>${text}</i>`;
          return length === 1 ? text : `<b>${text}</b>`;
        }
      )
      .replace(/\n/g, '<br>') // new line
  }
}
