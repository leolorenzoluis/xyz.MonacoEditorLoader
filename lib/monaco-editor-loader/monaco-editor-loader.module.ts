import { NgModule, NgZone } from '@angular/core';
import { MonacoEditorLoaderService } from './monaco-editor-loader.service';
@NgModule({
  providers: [
    {
      provide: MonacoEditorLoaderService,
      deps: [NgZone],
      useFactory: (ngZone: NgZone) => {
        return new MonacoEditorLoaderService(ngZone);
      }
    }
  ]
})
export class MonacoEditorLoaderModule { }
