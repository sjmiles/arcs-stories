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

  const host = `tvshow-action-bar`;

  const template = `
    <div [${host}] style="margin: 4px 0; text-align: right; font-size: 24px;">
      <icon on-click="onFavorite">{{favorite}}</icon>
      <!--
      <i class="material-icons">share</i>
      <i class="material-icons">playlist_play</i>
      -->
      <icon class="material-icons" on-click="onDelete">delete</icon>
    </div>
  `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    render({show}) {
      return {
        favorite: show && show.favorite ? `favorite` : `favorite_border`
      };
    }
    setShowFlags(flags) {
      const show = this._props.show;
      for (let flag in flags) {
        show[flag] = flags[flag];
      }
      //
      this.handles.get('show').set(show);
      //
      /*
      const showHandle = this.handles.get('show');
      let Show = showHandle.entityClass;
      let entity = new Show(show.rawData);
      showHandle.set(entity);
      */
    }
    onDelete() {
      this.setShowFlags({delete: true});
    }
    onFavorite() {
      console.log("TVShowActionBar: toggle favorite to ", !this._props.show.favorite);
      this.setShowFlags({favorite: !this._props.show.favorite});
    }
  };
});
