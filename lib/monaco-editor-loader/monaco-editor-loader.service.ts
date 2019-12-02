import { Injectable, NgZone } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MonacoEditorLoaderService {
    isMonacoLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _monacoPath = 'assets/monaco-editor/vs';
    set monacoPath(value: any) {
        if (value) {
            this._monacoPath = value;
            this.load();
        }
    }

    constructor(private ngZone: NgZone) {
        // Load AMD loader if necessary
        if (!(<any>window).require) {
            const loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = `${this._monacoPath}/loader.js`;
            loaderScript.addEventListener('load', this.load);
            document.body.appendChild(loaderScript);
        }
    }

    load = () => {
        // Load monaco
        console.log(this._monacoPath);
        (<any>window).require.config({ paths: { 'vs': this._monacoPath } });
        (<any>window).require(['vs/editor/editor.main'], () => {
            this.ngZone.run(() => this.isMonacoLoaded.next(true));
        });
    };
}
