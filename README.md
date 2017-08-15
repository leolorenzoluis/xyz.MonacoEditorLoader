# 🎉🎉🎉 Angular Monaco Editor Loader 🎉🎉🎉
[![npm](https://img.shields.io/badge/awesome-∞-brightgreen.svg)](https://www.npmjs.com/package/@abc.xyz/angular-monaco-editor-loader)
[![Build Status](https://travis-ci.org/leolorenzoluis/xyz.MonacoEditorLoader.svg?branch=master)](https://travis-ci.org/leolorenzoluis/xyz.MonacoEditorLoader)

An easy to use Monaco Editor Loader Service for Angular 2 and 4! Just add `*loadMonacoEditor` in your HTML Element, and you don't have to worry about timing issues!

```
<div *loadMonacoEditor id="container"></div> 
```

# Usage

Easy to install with the following command:
 
```
npm i @abc.xyz/angular-monaco-editor-loader
```

In your component's module or app module. Import the following:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MonacoEditorLoaderModule, MonacoEditorLoaderService } from '@abc.xyz/angular-monaco-editor-loader';

import { AppComponent } from './app.component';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    MonacoEditorComponent
  ],
  imports: [
    BrowserModule,
    MonacoEditorLoaderModule <-- Insert this>
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
Just add `*loadMonacoEditor`, so with your custom component where you plan to create your own monaco component. Just add the following:

```
<monaco-editor *loadMonacoEditor></monaco-editor>
```

And in my custom component where I want to host `Monaco Editor` I just do the following like I expect the Monaco library to be loaded at this point:

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.css']
})
export class MonacoEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    });

    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true
    });

    // extra libraries
    monaco.languages.typescript.javascriptDefaults.addExtraLib([
      'declare class Facts {',
      '    /**',
      '     * Returns the next fact',
      '     */',
      '    static next():string',
      '}',
    ].join('\n'), 'filename/facts.d.ts');

    var jsCode = [
      '"use strict";',
      '',
      "class Chuck {",
      "    greet() {",
      "        return Facts.next();",
      "    }",
      "}"
    ].join('\n');

    monaco.editor.create(document.getElementById("container"), {
      value: jsCode,
      language: "javascript"
    });
  }

}
```

And that's it! No `timeouts`! No `then`! It just goes with the correct flow in Angular!

# Running the demo app
Make sure you have **Angular CLI** installed!

1. Clone this repository
2. `cd demo`
3. `ng serve`

# Motivation

I did not want to clutter my component or code with `timeouts` or `then` to determine if Monaco has loaded! I also wanna utilize `ReactiveJS` when dealing with these kind of stuff.

Most of the code that was found [here](https://github.com/Microsoft/monaco-editor/issues/18) just wasn't the right timing when to check if Monaco is already loaded. 

Sometimes I see hacks from [Covalent](https://github.com/Teradata/covalent-code-editor/blob/develop/src/platform/code-editor/code-editor.component.ts) such as adding `timeouts`. So many timeouts everywhere!

```
        if (this._webview) {
            if (this._webview.send !== undefined) {
                // don't want to keep sending content if event came from IPC, infinite loop
                if (!this._fromEditor) {
                    this._webview.send('setEditorContent', value);
                }
                this.onEditorValueChange.emit(undefined);
                this.onChange.emit(undefined);
                this.propagateChange(this._value);
                this._fromEditor = false;
            } else {
                // Editor is not loaded yet, try again in half a second
                setTimeout(() => {
                    this.value = value;
                }, 500);
            }
        }
```

