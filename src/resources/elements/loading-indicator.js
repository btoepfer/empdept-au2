import nprogress from 'nprogress';
import { bindable, noView } from 'aurelia-framework';

nprogress.configure({ showSpinner: true }); // diese Anweisung wird genau einmal aufgerufen, nicht für jede Instanz

@noView(['nprogress/nprogress.css']) // wir benötigen keine View
export class LoadingIndicator {
    @bindable loading = false;

    loadingChanged(newValue) {
        if (newValue) {
            nprogress.start();
        } else {
            nprogress.done();
        }
    }
}