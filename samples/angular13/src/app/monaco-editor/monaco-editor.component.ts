import { Component, OnInit } from '@angular/core';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as monaco from 'monaco-editor';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.css'],
})
export class MonacoEditorComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });

    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    });

    // extra libraries
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      [
        'declare class Facts {',
        '    /**',
        '     * Returns the next fact',
        '     */',
        '    static next():string',
        '}',
      ].join('\n'),
      'filename/facts.d.ts'
    );

    const jsCode = [
      '"use strict";',
      '',
      'class Chuck {',
      '    greet() {',
      '        return Facts.next();',
      '    }',
      '}',
    ].join('\n');

    monaco.editor.create(document.getElementById('container')!, {
      value: jsCode,
      language: 'javascript',
    });
  }
}
