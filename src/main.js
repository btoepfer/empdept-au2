import environment from './environment';
import $ from 'jquery';
import 'tether';
import 'bootstrap';
import './resources/elements/fontawesome5/packs/light'
import './resources/elements/fontawesome5/packs/regular'
import './resources/elements/fontawesome5/packs/solid'
import fontawesome from './resources/elements/fontawesome5/fontawesome';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
