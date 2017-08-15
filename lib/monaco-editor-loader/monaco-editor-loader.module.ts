import { NgModule, NgZone } from '@angular/core';
import { MonacoEditorLoaderService } from './monaco-editor-loader.service';
import { MonacoEditorLoaderDirective } from './monaco-editor-loader.directive';

export const factory = (ngZone: NgZone) => {
  return new MonacoEditorLoaderService(ngZone);
};

@NgModule({
  declarations: [
    MonacoEditorLoaderDirective
  ],
  exports: [MonacoEditorLoaderDirective],
  providers: [
    {
      provide: MonacoEditorLoaderService,
      deps: [NgZone],
      useFactory: factory
    }
  ]
})
export class MonacoEditorLoaderModule { }
