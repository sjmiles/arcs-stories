// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
/* global defineParticle */

"use strict";

defineParticle(({DomParticle, html}) => {

  const host = 'plaid-account';

  const styleSheet = html`
<style>
  [${host}] {
    border-bottom: 1px dotted silver;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  [${host}] [section] {
    padding: 8px;
  }
  [${host}] > [balance] {
    font-size: 1.4em;
    color: green;
  }
</style>
  `;

  const template = html`
${styleSheet}
<div ${host} section>
  <span style="flex: 1;"><i class="material-icons">{{icon}}</i>&nbsp;<span style="vertical-align:middle;">{{name}}</span></span>
  <div balance section style="{{balanceStyle}}">$<span>{{balance}}</span></div>
</div>
    `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _shouldRender({account}) {
      return Boolean(account);
    }
    _render({account}) {
      return {
        name: account.metaName,
        icon: account.type == "credit" ? `credit_card` : `account_balance`,
        balance: account.balanceCurrent,
        balanceStyle: (account.type=="credit" ? -1 : 1) * account.balanceCurrent < 0 ? 'color: #CC0000' : 'color: green'
      };
    }
  };

});