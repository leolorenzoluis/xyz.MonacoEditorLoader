import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MonacoEditorLoaderService {
    isMonacoLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _monacoPath = 'assets/monaco-editor/vs';
    set monacoPath(value) {
        if (value) {
            this._monacoPath = value;
        }
    }

    constructor(ngZone: NgZone) {
        var onGotAmdLoader = () => {
            // Load monaco
            console.log(this._monacoPath);
            (<any>window).require.config({ paths: { 'vs': this._monacoPath } });
            (<any>window).require(['vs/editor/editor.main'], () => {
                ngZone.run(() => this.isMonacoLoaded.next(true));
            });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
            var loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = `${this._monacoPath}/loader.js`;
            loaderScript.addEventListener('load', onGotAmdLoader);
            document.body.appendChild(loaderScript);
        } else {
            onGotAmdLoader();
        }
    }
}
