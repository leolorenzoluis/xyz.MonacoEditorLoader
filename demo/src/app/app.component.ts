import { Component, OnInit } from '@angular/core';
import { MonacoEditorLoaderService } from '@abc.xyz/angular-monaco-editor-loader';

declare const monaco: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'xyz.MonacoEditorLoader';

  ngOnInit() {
  }
}

