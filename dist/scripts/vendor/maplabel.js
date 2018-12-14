function MapLabel(t){this.set("fontFamily","sans-serif"),this.set("fontSize",12),this.set("fontColor","#000000"),this.set("strokeWeight",4),this.set("strokeColor","#ffffff"),this.set("align","center"),this.set("zIndex",1e3),this.setValues(t)}MapLabel.prototype=new google.maps.OverlayView,window.MapLabel=MapLabel,MapLabel.prototype.changed=function(t){switch(t){case"fontFamily":case"fontSize":case"fontColor":case"strokeWeight":case"strokeColor":case"align":case"text":return this.drawCanvas_();case"maxZoom":case"minZoom":case"position":return this.draw()}},MapLabel.prototype.drawCanvas_=function(){var t=this.canvas_;if(t){var e=t.style;e.zIndex=this.get("zIndex");var a=t.getContext("2d");a.clearRect(0,0,t.width,t.height),a.strokeStyle=this.get("strokeColor"),a.fillStyle=this.get("fontColor"),a.font=this.get("fontSize")+"px "+this.get("fontFamily");var o=Number(this.get("strokeWeight")),i=this.get("text");if(i){o&&(a.lineWidth=o,a.strokeText(i,o,o)),a.fillText(i,o,o);var s=a.measureText(i),n=s.width+o;e.marginLeft=this.getMarginLeft_(n)+"px",e.marginTop="1em"}}},MapLabel.prototype.onAdd=function(){var t=this.canvas_=document.createElement("canvas"),e=t.style;e.position="absolute";var a=t.getContext("2d");a.lineJoin="round",a.textBaseline="top",this.drawCanvas_();var o=this.getPanes();o&&o.mapPane.appendChild(t)},MapLabel.prototype.onAdd=MapLabel.prototype.onAdd,MapLabel.prototype.getMarginLeft_=function(t){switch(this.get("align")){case"left":return 0;case"right":return-t}return t/-2},MapLabel.prototype.draw=function(){var t=this.getProjection();if(t&&this.canvas_){var e=this.get("position");if(e){var a=t.fromLatLngToDivPixel(e),o=this.canvas_.style;o.top=a.y+"px",o.left=a.x+"px",o.visibility=this.getVisible_()}}},MapLabel.prototype.draw=MapLabel.prototype.draw,MapLabel.prototype.getVisible_=function(){var t=this.get("minZoom"),e=this.get("maxZoom");if(void 0===t&&void 0===e)return"";var a=this.getMap();if(!a)return"";var o=a.getZoom();return o<t||o>e?"hidden":""},MapLabel.prototype.onRemove=function(){var t=this.canvas_;t&&t.parentNode&&t.parentNode.removeChild(t)},MapLabel.prototype.onRemove=MapLabel.prototype.onRemove;