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
  [${host}] [description] p {
    margin: 0;
  }
</style>
<div ${host} style="padding-bottom: 8px; min-height: 500px;">
  <div slotid="action"></div>
  <div style="display: flex; align-items: start; padding-bottom: 8px;">
    <img src="{{image}}" style="vertical-align: middle; padding-right: 8px;">
    <div>
      <b>{{network}}</b>
      <br>
      <span>{{day}}</span> <span>{{time}}</span>
    </div>
  </div>
  <div description unsafe-html="{{description}}"></div>
</div>
    `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _willReceiveProps(props, state) {
      state.shows = props.shows;
    }
    _shouldRender(props) {
      return props.show;
    }
    _render({show}, state) {
      return {
        image: show.image,
        description: show.description,
        network: show.network,
        day: show.day ? `${show.day}s` : '(n/a)',
        time: show.time,
        id: show.id
      };
    }
  };
});