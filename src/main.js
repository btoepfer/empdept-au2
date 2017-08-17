import environment from './environment';
import $ from 'jquery';
import 'tether';
import 'bootstrap';
import './resources/styles/fontawesome5/packs/light'
import './resources/styles/fontawesome5/packs/regular'
import './resources/styles/fontawesome5/packs/solid'
import fontawesome from './resources/styles/fontawesome5/fontawesome';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature('resources')
        .plugin('aurelia-animator-css')
        .plugin('aurelia-validation');

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot());
}
