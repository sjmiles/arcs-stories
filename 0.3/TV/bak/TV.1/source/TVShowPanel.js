// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

defineParticle(({DomParticle, resolver}) => {

  let host = `show-panel`;

  const template = `
<style>
  [${host}] p {
    margin: 0;
  }
</style>
<div style="display: flex; align-items: start; padding-bottom: 8px;">
  <img src="{{image}}" style="vertical-align: middle; padding-right: 8px;">
  <div>
    <div unsafe-html="{{description}}"></div>
    <br>
    <div><b>{{network}}</b> <span>{{day}}</span> <span>{{time}}</span></div>
  </div>
</div>
<div slotid="action" subid$="{{id}}"></div>
    `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _shouldRender(props) {
      return props.show;
    }
    _render({show}, state) {
      return {
        image: show.image,
        description: show.description,
        network: show.network,
        day: `${show.day}s`,
        time: show.time,
        id: show.id
      };
    }
  };
});