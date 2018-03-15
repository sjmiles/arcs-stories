// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

defineParticle(({DomParticle, html, log}) => {

  let host = 'github-dash';

  let template = html`
<style>
  [${host}] {
    padding: 28px;
  }
  [${host}] [pr] {
    font-size: 1.05em;
    border-bottom: 2px solid whitesmoke;
    margin-bottom: 16px;
  }
</style>

<div ${host}>

  <h3>GitHub Dashboard</h3>
  <div pr>Pull Requests Pending Review by <b>{{name}}</b></div>
  <div>{{requests}}</div>

  <template request>
    <div style="border-bottom: 1px solid whitesmoke; padding: 8px 0;">
      <div style="font-size: 1em; padding-bottom: 4px;">#<b>{{no}}</b> <span>{{title}}</span></div>
      <div style="font-size: 0.8em">{{reviewers}}</div>
    </div>
  </template>

</div>
    `.trim();

  const service = `http://xenonjs.com/services/http/php/github.php`;

  return class extends DomParticle {
    get template() {
      return template;
    }
    // constructor() {
    //   super();
    //   this._invalidate();
    // }
    // shouldRender() {
    //   console.warn('shouldRender is called!');
    //   return true;
    // }
    // setViews(...args) {
    //   console.warn('setViews is called!');
    //   super.setViews(...args);
    // }
    render({ghHandle}, {data}) {
      if (!data) {
        this.fetchData();
      } else if (ghHandle) {
        let requests;
        const name = ghHandle.name;
        const models = this.dataToModels(data, name);
        if (models.length) {
          requests = {
            $template: 'request',
            models
          };
        } else {
          requests = 'All caught up!';
        }
        return {
          name,
          requests
        };
      }
    }
    async fetchData() {
      const response = await fetch(`${service}`);
      const data = await response.json();
      this.setState({data});
    }
    dataToModels(data, user) {
      log(user, data);
      const needReview = data.filter(request => request.requested_reviewers);
      const byUser = needReview.filter(request =>
        request.requested_reviewers.some(
          reviewer => reviewer.login === user
        )
      );
      return byUser.map(request => this.renderRequest(request));
    }
    renderRequest(request) {
      log(request);
      const reviewers = request.requested_reviewers.map(r => r.login);
      return {
        title: request.title,
        no: request.number,
        reviewers: reviewers.join(', ')
      };
    }
  };

});
