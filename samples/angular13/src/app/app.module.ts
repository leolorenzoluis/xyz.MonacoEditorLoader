import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MonacoEditorLoaderModule } from '@abc.xyz/angular-monaco-editor-loader';

import { AppComponent } from './app.component';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';

@NgModule({
  declarations: [AppComponent, MonacoEditorComponent],
  imports: [BrowserModule, MonacoEditorLoaderModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
