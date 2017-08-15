import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MonacoEditorLoaderService {
    isMonacoLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        var onGotAmdLoader = () => {
            // Load monaco
            (<any>window).require.config({ paths: { 'vs': 'assets/monaco/vs' } });
            (<any>window).require(['vs/editor/editor.main'], () => {
                this.isMonacoLoaded.next(true);
            });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
            var loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = 'assets/monaco/vs/loader.js';
            loaderScript.addEventListener('load', onGotAmdLoader);
            document.body.appendChild(loaderScript);
        } else {
            onGotAmdLoader();
        }
    }
}
