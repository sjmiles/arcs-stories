/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

defineParticle(({DomParticle}) => {

  const template = `
    <div style="margin: 4px 0; text-align: right;">
      <i class="material-icons" style="font-size: 16px;" on-click="_onFavorite">{{favorite}}</i>
      <i class="material-icons" style="font-size: 16px;">share</i>
      <i class="material-icons" style="font-size: 16px;">playlist_play</i>
      <i class="material-icons" style="font-size: 16px;" on-click="_onDelete">delete</i>
    </div>
  `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _render({show}) {
      return {
        favorite: show && show.favorite ? `favorite` : `favorite_border`
      };
    }
    _setShowFlags(flags) {
      const show = this._props.show;
      for (let flag in flags) {
        show[flag] = flags[flag];
      }
      this._views.get('show').set(show);
    }
    _onDelete() {
      this._setShowFlags({delete: true});
    }
    _onFavorite() {
      console.log("TVShowActionBar: toggle favorite to ", !this._props.show.favorite);
      this._setShowFlags({favorite: !this._props.show.favorite});
    }
  };
});
