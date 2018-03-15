// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

defineParticle(({DomParticle, html, log}) => {

  let host = `favorite-food-picker`;

  let styles = html`
<style>
  [${host}] {
    padding: 28px;
  }
</style>
  `;

  let template = html`
${styles}
<div ${host}>
  <cx-input value="{{name}}">
    <input slot="input" id="GitHubHandleInput" on-change="onNameChange">
    <label slot="label" for="GitHubHandleInput">GitHub user name</label>
  </cx-input>
</div>
    `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    render({ghHandle}) {
      if (ghHandle) {
        return {
          name: ghHandle.name
        };
      }
    }
    onNameChange(e) {
      const name = e.data.value;
      if (this.setState({name})) {
        this.setName(name);
      }
    }
    setName(name) {
      const ghHandle = this._views.get('ghHandle');
      ghHandle.set(new ghHandle.entityClass({name}));
    }
  };

});
