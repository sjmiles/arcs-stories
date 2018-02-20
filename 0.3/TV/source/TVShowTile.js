// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

defineParticle(({DomParticle, log}) => {

  let host = `show-tile`;

  // TODO(sjmiles): encode expected aspect-ratio using div-padding trick, this way the box will be properly sized
  // even if there is no image.
  // The old way: `<img ${host} src="{{image}}" style="width:100%;">`;
  const template = `<div ${host} style%="{{image}}" style="width: 100%; padding-bottom: 140%; background-repeat: no-repeat; background-size: contain;"></div>`;

  return class extends DomParticle {
    get template() {
      return template;
    }
    // TODO(sjmiles): bad things happen if _shouldRender is enabled, run this by @mmandlis
    //_shouldRender({show}) {
    //  return Boolean(show);
    //}
    _render({show}) {
      if (show) {
        log('rendering');
        //log(`[${show.image}]`);
        return {
          image: {backgroundImage: `url("${show.image}")`}
        };
      }
    }
  };
});