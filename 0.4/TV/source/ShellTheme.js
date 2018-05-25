// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

/* global defineParticle */

defineParticle(({DomParticle}) => {
  return class extends DomParticle {
    update({theme}, state) {
      if (theme && !state.initialized) {
        state.initialized = true;
        theme.mainBackground = '#333333';
        theme.mainColor = 'white';
        this.handles.get('theme').set(theme);
      }
    }
  };
});