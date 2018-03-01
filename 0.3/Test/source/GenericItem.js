// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
/* global defineParticle */

"use strict";

defineParticle(({DomParticle, html}) => {

  const host = 'generic-item';

  const styleSheet = html`
<style>
  [${host}] {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
</style>
  `;

  const template = html`
${styleSheet}
<pre ${host}>{{json}}</pre>
    `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _shouldRender({item}) {
      return Boolean(item);
    }
    _render({item}) {
      let json;
      if (item.length) {
        json = item.map(i => JSON.stringify(i.dataClone(), null, '  ')).join('\n')
      } else {
        json = JSON.stringify(item.dataClone(), null, '  ')
      }
      return {json};
    }
  };

});
