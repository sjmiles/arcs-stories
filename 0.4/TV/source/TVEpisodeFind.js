// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

/* global defineParticle, importScripts */
defineParticle(({DomParticle, resolver}) => {

  importScripts(resolver('TVEpisodeFind/TvMaze.js'));
  /* global service */

  return class extends DomParticle {
    update({episodes,show}, state) {
      // If we are asynchronously populating episodes, wait until this is done before
      // handling additional updates.
      // TODO(sjmiles): Maybe generalize this notion into DomParticle?
      if (!state.recieving) {
        if (show && show.showid !== state.showid) {
          state.count = 0;
          state.showid = show.showid;
        }
        if (episodes && show && !state.count) {
          this.fetchEpisodes(show);
        }
      }
    }
    async fetchEpisodes(show) {
      this.setState({count: -1});
      const response = await fetch(`${service}/shows/${show.showid}/episodes`);
      const episodes = await response.json();
      this.receiveEpisodes(episodes);
    }
    async receiveEpisodes(episodes) {
      // TODO(sjmiles): clip for performance
      // ... switch to Season/Episode view instead when possible
      episodes = episodes.slice(0, 30);
      console.log('TVEpisodes', episodes);
      const episodesView = this.handles.get('episodes');
      // semaphore to protect await block below
      this.setState({receiving: true});
      // clear old data
      let entities = await episodesView.toList();
      entities.forEach(e => episodesView.remove(e));
      // add new data
      const Episode = episodesView.entityClass;
      episodes.forEach(episode => {
        let entity = new Episode({
          name: episode.name,
          season: episode.season,
          number: episode.number,
          airdate: episode.airdate,
          runtime: episode.runtime,
          image: episode.image && episode.image.medium.replace('http:', 'https:'),
          summary: episode.summary
        });
        //console.log('TVEpisodes', JSON.stringify(entity.dataClone(), null, '  '));
        episodesView.store(entity);
      });
      this.setState({receiving: false});
    }
  };
});