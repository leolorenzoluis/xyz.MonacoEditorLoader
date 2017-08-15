import { NgModule, NgZone } from '@angular/core';
import { MonacoEditorLoaderService } from './monaco-editor-loader.service';

export const factory = (ngZone: NgZone) => {
  return new MonacoEditorLoaderService(ngZone);
};

@NgModule({
  providers: [
    {
      provide: MonacoEditorLoaderService,
      deps: [NgZone],
      useFactory: factory
    }
  ]
})
export class MonacoEditorLoaderModule { }
