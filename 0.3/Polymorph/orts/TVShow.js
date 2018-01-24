var ortTemplate = `
<div style="display: flex; align-items: start; padding-bottom: 8px;">
  <img src="{{image}}" style="vertical-align: middle; padding-right: 8px;">
  <div>
    <div unsafe-html="{{description}}"></div>
    <br>
    <div><b>{{network}}</b> <span>{{day}}</span> <span>{{time}}</span></div>
  </div>
  <div>
    <i class="material-icons" key="{{id}}" on-click="_onFavorite">favorite_border</i>
    <i class="material-icons">share</i>
    <i class="material-icons">playlist_play</i>
  </div>
</div>
`;