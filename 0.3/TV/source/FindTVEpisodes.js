//http://api.tvmaze.com/search/episodes?q=star+trek+discovery

// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

defineParticle(({DomParticle, resolver}) => {

  importScripts(resolver('FindTVEpisodes/TvMaze.js'));

  const host = "find-tv-episodes";

  return class extends DomParticle {
    _onInput(e, state) {
      this._setState({query: e.data.value || '', count: 0});
    }
    _update({episodes,show}, {count}) {
      if (episodes && show && !count) {
        this._fetchEpisodes(show);
      }
    }
    async _fetchEpisodes(show) {
      this._setState({count: -1});
      const response = await fetch(`${service}/shows/${show.showid}/episodes`);
      const episodes = await response.json();
      this._receiveEpisodes(episodes);
    }
    async _receiveEpisodes(episodes) {
      console.log('TVEpisodes', episodes);
      const episodesView = this._views.get('episodes');
      // clear old data
      //let entities = await episodesView.toList();
      //entities.forEach(e => episodesView.remove(e));
      // add new data
      const Episode = episodesView.entityClass;
      episodes.forEach(episode => {
        let entity = new Episode({
          name: episode.name,
          season: episode.season,
          number: episode.number,
          airdate: episode.airdate,
          runtime: episode.runtime,
          image: episode.image && episode.image.medium,
          summary: episode.summary
        });
        console.log('TVEpisodes', JSON.stringify(entity.dataClone(), null, '  '));
        episodesView.store(entity);
      });
    }
  };
});