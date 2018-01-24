// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

defineParticle(({DomParticle, resolver}) => {

  let host = `list`;

  const template = `
<style>
  [${host}] p {
    margin: 0;
  }
</style>

<div ${host} style="padding: 8px;">
  <div items>{{items}}</div>
  <hr>
  <!-- only here so _onFavorite makes it into 'handlers' list -->
  <div on-click="_onFavorite"></div>
</div>
    `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _shouldRender(props) {
      return props.items;
    }
    _willReceiveProps(props, state) {
      if (props.items && props.items.length) {
        const type = this._views.get('items').entityClass;
        importScripts(resolver(`List/../orts/${type.name}.js`));
        state.ortTemplate = ortTemplate;
      }
    }
    _render(props, state) {
      return {
        items: {
          template: state.ortTemplate,
          models: props.items.map(item => {
            return Object.assign(item.dataClone(), {
              id: item.id,
              favorite: props.favorites && props.favorites.find(fave => fave.id === item.id)
            });
          })
        }
      };
    }
    _onFavorite(e) {
      console.warn('FAVORITE!', e.data.key);
      const props = this._props;
      if (props.favorites) {
        let item = props.items.find(item => item.id === e.data.key);
        if (item) {
          console.log(item);
          this._views.get('favorites').store(item);
        }
      }
    }
  };
  
});