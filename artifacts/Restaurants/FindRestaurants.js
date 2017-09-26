// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

defineParticle(({ DomParticle, resolver}) => {

  let host = `find-restaurants`;

  let template = `
<div ${host}>
  <div hidden="{{complete}}" style="padding: 10px 6px">Finding restaurants...</div>
  <div slotid="masterdetail"></div>
</div>

  `.trim();

  let service = `https://xenonjs.com/services/http/php`;
  let placesService =`${service}/places.php`;
  let photoService = `${service}/place-photo.php`;

  return class extends DomParticle {
    get template() {
      return template;
    }
    _willReceiveProps(props, state) {
      if (!state.places) {
        state.places = [];
        this._fetchPlaces();
      }
    }
    _fetchPlaces() {
      //let loc = `55.6711876,12.4537421`;
      //let loc = `55.6786282,12.3155385`;
      let loc = `37.7896927,-122.3890096`;
      let radius = `10000`;
      let type = `restaurant`;
      fetch(`${placesService}?location=${loc}&radius=${radius}&type=${type}`)
        .then(response => response.json())
        .then(json => this._receivePlaces(json))
        ;
    }
    _receivePlaces(json) {
      console.log("_receivePlaces = ", json.results);
      let list = this._views.get('list');
      let entity = list.entityClass;
      json.results.forEach((p, i) => {
        let photo = p.photos && p.photos.length
          ? `${photoService}?maxwidth=400&photoreference=${p.photos[0].photo_reference}`
          : p.icon;
        let e = new entity({
          id: p.id,
          reference: p.reference,
          name: p.name,
          icon: p.icon,
          photos: p.photos,
          address: p.vicinity,
          rating: p.rating,
          photo
        });
        list.store(e);
      });
      this._setState({count: json.results.length});
    }
    _render(props, state) {
      return {
        complete: state.count > 0
      };
    }
  };
});
