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
    padding: 0 28px;
  }
  [${host}] [pr] {
    font-size: 1.05em;
    border-bottom: 2px solid whitesmoke;
    margin-bottom: 16px;
  }
</style>

<div ${host}>

  <h3>GitHub Dashboard</h3>
  <h4>PolymerLabs/Arcs</h4>
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
    render({ghHandle}, {prs, issues}) {
      if (!prs) {
        this.fetchPRs();
      }
      if (!issues) {
        //this.fetchIssues();
      }
      const model = {
      };
      if (ghHandle) {
        model.name = ghHandle.name;
        if (prs) {
          const name = ghHandle.name;
          const models = this.dataToModels(prs, name);
          if (models.length) {
            model.requests = {
              $template: 'request',
              models
            };
          } else {
            model.requests = 'All caught up!';
          }
        }
      }
      return model;
    }
    async fetchPRs() {
      const response = await fetch(`${service}/repos/PolymerLabs/arcs/pulls`);
      const prs = await response.json();
      this.setState({prs});
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
