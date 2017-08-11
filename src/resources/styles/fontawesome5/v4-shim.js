(function () {
'use strict';

var _window$navigator$use = window.navigator.userAgent;
var userAgent = _window$navigator$use === undefined ? '' : _window$navigator$use;


var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');



var RESERVED_CLASSES = ['xs', 'sm', 'lg', 'fw', 'ul', 'li', 'border', 'pull-left', 'pull-right', 'spin', 'pulse', 'rotate-90', 'rotate-180', 'rotate-270', 'flip-horizontal', 'flip-vertical', 'stack', 'stack-1x', 'stack-2x', 'inverse', 'layers', 'layers-text', 'layers-counter'].concat(oneToTen.map(function (n) {
  return n + 'x';
})).concat(oneToTwenty.map(function (n) {
  return 'w-' + n;
}));

function bunker(fn) {
  try {
    fn();
  } catch (e) {
    if (undefined !== 'production') {
      throw e;
    }
  }
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var config = _extends({
  namespace: '___FONT_AWESOME___',
  familyPrefix: 'fa',
  replacementClass: 'svg-inline--fa',
  autoReplaceSvg: true,
  autoA11y: true,
  observeMutations: true,
  keepOriginalSource: true,
  measurePerformance: false
}, window.FontAwesomeConfig || {});

if (!config.autoReplaceSvg) config.observeMutations = false;

if (!window[config.namespace]) window[config.namespace] = {};
if (!window[config.namespace].packs) window[config.namespace].packs = {};
if (!window[config.namespace].hooks) window[config.namespace].hooks = {};
if (!window[config.namespace].shims) window[config.namespace].shims = [];

var namespace = window[config.namespace];

var shims = [["area-chart", null, "chart-area"], ["meetup", "fab", null], ["arrow-circle-o-left", "far", "arrow-circle-left"], ["arrow-circle-o-right", "far", "arrow-circle-right"], ["arrow-circle-o-up", "far", "arrow-circle-up"], ["arrows-alt", null, "expand-arrows"], ["bar-chart", null, "chart-bar"], ["calendar", null, "calendar-alt"], ["calendar-o", "far", "calendar"], ["caret-square-o-down", "far", "caret-square-down"], ["caret-square-o-left", "far", "caret-square-left"], ["caret-square-o-right", "far", "caret-square-right"], ["caret-square-o-up", "far", "caret-square-up"], ["cc", null, "closed-captioning"], ["chain-broken", null, "unlink"], ["circle-o-notch", null, "circle-notch"], ["circle-thin", "fal", "circle"], ["clipboard", null, "paste"], ["commenting", null, "comment-alt"], ["creative-commons", "fab", "creative-commons"], ["credit-card", "far", "credit-card"], ["credit-card-alt", null, "credit-card"], ["cutlery", null, "utensils"], ["diamond", null, "gem"], ["eur", null, "euro-sign"], ["facebook", "fab", "facebook-f"], ["facebook-official", "fab", "facebook"], ["file-text", null, "file-alt"], ["files-o", "far", "copy"], ["floppy-o", "far", "save"], ["gbp", null, "pound-sign"], ["glass", null, "glass-martini"], ["google-plus", "fab", "google-plus-g"], ["google-plus-official", "fab", "google-plus"], ["header", null, "heading"], ["ils", null, "shekel-sign"], ["inr", null, "rupee-sign"], ["intersex", null, "transgender"], ["jpy", null, "yen-sign"], ["krw", null, "won-sign"], ["line-chart", null, "chart-line"], ["linkedin", "fab", "linkedin-in"], ["linkedin-square", "fab", "linkedin"], ["list-alt", "far", "list-alt"], ["meanpath", "fab", "font-awesome"], ["money", "far", "money-bill-alt"], ["pencil", null, "pencil-alt"], ["pencil-square", null, "pen-square"], ["pencil-square-o", null, "edit"], ["picture", null, "image"], ["pie-chart", null, "chart-pie"], ["refresh", null, "sync"], ["registered", "far", "registered"], ["repeat", null, "redo"], ["rub", null, "ruble-sign"], ["scissors", null, "cut"], ["shield", null, "shield-alt"], ["sort-alpha-asc", null, "sort-alpha-down"], ["sort-alpha-desc", null, "sort-alpha-up"], ["sort-amount-asc", null, "sort-amount-down"], ["sort-amount-desc", null, "sort-amount-up"], ["sort-asc", null, "sort-up"], ["sort-desc", null, "sort-down"], ["sort-numeric-asc", null, "sort-numeric-down"], ["sort-numeric-desc", null, "sort-numeric-up"], ["spoon", null, "utensil-spoon"], ["thumbs-o-down", "far", "thumbs-down"], ["thumbs-o-up", "far", "thumbs-up"], ["ticket", null, "ticket-alt"], ["try", null, "lira-sign"], ["usd", null, "dollar-sign"], ["video-camera", null, "video"], ["vimeo", "fab", "vimeo-v"], ["volume-control-phone", null, "phone-volume"], ["wheelchair-alt", "fab", "accessible-icon"], ["youtube-square", "fab", "youtube-play"], ["envelope-o", "far", "envelope"], ["star-o", "far", "star"], ["trash-o", "far", "trash"], ["file-o", "far", "file"], ["clock-o", "far", "clock"], ["play-circle-o", "far", "play-circle"], ["picture-o", "far", "image"], ["share-square-o", "far", "share-square"], ["check-square-o", "far", "check-square"], ["times-circle-o", "far", "times-circle"], ["check-circle-o", "far", "check-circle"], ["twitter-square", "fab", null], ["facebook-square", "fab", null], ["heart-o", "far", "heart"], ["github-square", "fab", null], ["lemon-o", "far", "lemon"], ["square-o", "far", "square"], ["bookmark-o", "far", "bookmark"], ["twitter", "fab", null], ["github", "fab", null], ["hdd-o", "far", "hdd"], ["pinterest", "fab", null], ["pinterest-square", "fab", null], ["google-plus-square", "fab", null], ["comment-o", "far", "comment"], ["comments-o", "far", "comments"], ["lightbulb-o", "far", "lightbulb"], ["bell-o", "far", "bell"], ["file-text-o", "far", "file-alt"], ["building-o", "far", "building"], ["hospital-o", "far", "hospital"], ["circle-o", "far", "circle"], ["github-alt", "fab", null], ["folder-o", "far", "folder"], ["folder-open-o", "far", "folder-open"], ["smile-o", "far", "smile"], ["frown-o", "far", "frown"], ["meh-o", "far", "meh"], ["keyboard-o", "far", "keyboard"], ["flag-o", "far", "flag"], ["star-half-o", "far", "star-half"], ["maxcdn", "fab", null], ["html5", "fab", null], ["css3", "fab", null], ["minus-square-o", "far", "minus-square"], ["btc", "fab", null], ["youtube", "fab", null], ["xing", "fab", null], ["xing-square", "fab", null], ["youtube-play", "fab", null], ["dropbox", "fab", null], ["stack-overflow", "fab", null], ["instagram", "fab", null], ["flickr", "fab", null], ["adn", "fab", null], ["bitbucket", "fab", null], ["bitbucket-square", "fab", null], ["tumblr", "fab", null], ["tumblr-square", "fab", null], ["apple", "fab", null], ["windows", "fab", null], ["android", "fab", null], ["linux", "fab", null], ["dribbble", "fab", null], ["skype", "fab", null], ["foursquare", "fab", null], ["trello", "fab", null], ["gratipay", "fab", null], ["sun-o", "far", "sun"], ["moon-o", "far", "moon"], ["vk", "fab", null], ["weibo", "fab", null], ["renren", "fab", null], ["pagelines", "fab", null], ["stack-exchange", "fab", null], ["dot-circle-o", "far", "dot-circle"], ["vimeo-square", "fab", null], ["plus-square-o", "far", "plus-square"], ["slack", "fab", null], ["wordpress", "fab", null], ["openid", "fab", null], ["yahoo", "fab", null], ["google", "fab", null], ["arrow-circle-o-down", "far", "arrow-circle-down"], ["reddit-square", "fab", null], ["stumbleupon-circle", "fab", null], ["stumbleupon", "fab", null], ["delicious", "fab", null], ["digg", "fab", null], ["pied-piper-pp", "fab", null], ["pied-piper-alt", "fab", null], ["drupal", "fab", null], ["joomla", "fab", null], ["behance", "fab", null], ["behance-square", "fab", null], ["steam", "fab", null], ["steam-square", "fab", null], ["spotify", "fab", null], ["deviantart", "fab", null], ["soundcloud", "fab", null], ["file-pdf-o", "far", "file-pdf"], ["file-word-o", "far", "file-word"], ["file-excel-o", "far", "file-excel"], ["file-powerpoint-o", "far", "file-powerpoint"], ["file-image-o", "far", "file-image"], ["file-archive-o", "far", "file-archive"], ["file-audio-o", "far", "file-audio"], ["file-video-o", "far", "file-video"], ["file-code-o", "far", "file-code"], ["vine", "fab", null], ["codepen", "fab", null], ["jsfiddle", "fab", null], ["rebel", "fab", null], ["empire", "fab", null], ["git-square", "fab", null], ["git", "fab", null], ["hacker-news", "fab", null], ["tencent-weibo", "fab", null], ["qq", "fab", null], ["weixin", "fab", null], ["paper-plane-o", "far", "paper-plane"], ["futbol-o", "far", "futbol"], ["slideshare", "fab", null], ["twitch", "fab", null], ["yelp", "fab", null], ["newspaper-o", "far", "newspaper"], ["paypal", "fab", null], ["google-wallet", "fab", null], ["cc-visa", "fab", null], ["cc-mastercard", "fab", null], ["cc-discover", "fab", null], ["cc-amex", "fab", null], ["cc-paypal", "fab", null], ["cc-stripe", "fab", null], ["bell-slash-o", "far", "bell-slash"], ["lastfm", "fab", null], ["lastfm-square", "fab", null], ["ioxhost", "fab", null], ["angellist", "fab", null], ["buysellads", "fab", null], ["connectdevelop", "fab", null], ["dashcube", "fab", null], ["forumbee", "fab", null], ["leanpub", "fab", null], ["sellsy", "fab", null], ["shirtsinbulk", "fab", null], ["simplybuilt", "fab", null], ["skyatlas", "fab", null], ["pinterest-p", "fab", null], ["whatsapp", "fab", null], ["viacoin", "fab", null], ["medium", "fab", null], ["y-combinator", "fab", null], ["optin-monster", "fab", null], ["opencart", "fab", null], ["expeditedssl", "fab", null], ["sticky-note-o", "far", "sticky-note"], ["cc-jcb", "fab", null], ["cc-diners-club", "fab", null], ["hourglass-o", "far", "hourglass"], ["hand-rock-o", "far", "hand-rock"], ["hand-paper-o", "far", "hand-paper"], ["hand-scissors-o", "far", "hand-scissors"], ["hand-lizard-o", "far", "hand-lizard"], ["hand-spock-o", "far", "hand-spock"], ["hand-pointer-o", "far", "hand-pointer"], ["hand-peace-o", "far", "hand-peace"], ["gg", "fab", null], ["gg-circle", "fab", null], ["tripadvisor", "fab", null], ["odnoklassniki", "fab", null], ["odnoklassniki-square", "fab", null], ["get-pocket", "fab", null], ["wikipedia-w", "fab", null], ["safari", "fab", null], ["chrome", "fab", null], ["firefox", "fab", null], ["opera", "fab", null], ["internet-explorer", "fab", null], ["contao", "fab", null], ["500px", "fab", null], ["amazon", "fab", null], ["calendar-plus-o", "far", "calendar-plus"], ["calendar-minus-o", "far", "calendar-minus"], ["calendar-times-o", "far", "calendar-times"], ["calendar-check-o", "far", "calendar-check"], ["map-o", "far", "map"], ["commenting-o", "far", "comment-alt"], ["houzz", "fab", null], ["black-tie", "fab", null], ["fonticons", "fab", null], ["reddit-alien", "fab", null], ["edge", "fab", null], ["codiepie", "fab", null], ["modx", "fab", null], ["fort-awesome", "fab", null], ["usb", "fab", null], ["product-hunt", "fab", null], ["mixcloud", "fab", null], ["scribd", "fab", null], ["pause-circle-o", "far", "pause-circle"], ["stop-circle-o", "far", "stop-circle"], ["bluetooth", "fab", null], ["bluetooth-b", "fab", null], ["gitlab", "fab", null], ["wpbeginner", "fab", null], ["wpforms", "fab", null], ["envira", "fab", null], ["question-circle-o", "far", "question-circle"], ["glide", "fab", null], ["glide-g", "fab", null], ["viadeo", "fab", null], ["viadeo-square", "fab", null], ["snapchat", "fab", null], ["snapchat-ghost", "fab", null], ["snapchat-square", "fab", null], ["pied-piper", "fab", null], ["first-order", "fab", null], ["yoast", "fab", null], ["themeisle", "fab", null], ["font-awesome", "fab", null], ["handshake-o", "far", "handshake"], ["envelope-open-o", "far", "envelope-open"], ["linode", "fab", null], ["address-book-o", "far", "address-book"], ["address-card-o", "far", "address-card"], ["user-circle-o", "far", "user-circle"], ["user-o", "far", "user"], ["id-card-o", "far", "id-card"], ["quora", "fab", null], ["free-code-camp", "fab", null], ["telegram", "fab", null], ["window-close-o", "far", "window-close"], ["bandcamp", "fab", null], ["grav", "fab", null], ["etsy", "fab", null], ["imdb", "fab", null], ["ravelry", "fab", null], ["eercast", "fab", null], ["snowflake-o", "far", "snowflake"], ["superpowers", "fab", null], ["wpexplorer", "fab", null], ["reddit", "fab", null]]; // eslint-disable-line no-undef

bunker(function () {
  if (typeof namespace.hooks.addShims === 'function') {
    namespace.hooks.addShims(shims);
  } else {
    var _namespace$shims;

    (_namespace$shims = namespace.shims).push.apply(_namespace$shims, shims);
  }
});

}());
