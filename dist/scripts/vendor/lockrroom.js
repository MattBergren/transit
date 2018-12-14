var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(){return window.lockrRoom={data:null,loaded:!1,getInitialStore:function(e){var t=void 0;return e.initialState?(t=e.initialState,this.data=t):console.error("Initial state not passed to getInitialStore"),this.loaded=!0,t},ref:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=this.data,r=!1,n=void 0,a=0;a<e.length;a++)if(t)if(void 0!==o[e[a]])o=o[e[a]];else{if(a+1!==e.length){console.error("When using set(), you can only create a branch one level deeper than an already created branch. \nYour path fails because it contains more than one uncreated branch: \n--"+e);break}n=e[a],r=!0}else o=o[e[a]];return void 0===o&&console.error("Tried to update the store in a location that does not exist: \n--"+e),{data:void 0!==o?o:void 0,keyToCreate:void 0!==n?n:null,create:void 0!==r?r:null}},persist:function(){},set:function(e,t){var o=this.ref(e,!0);return void 0===o.data?(console.error("Set failed."),!1):(o.create?o.data[o.keyToCreate]=t:"object"===_typeof(o.data)?o.data=_extends(o.data,t):o.data=t,void this.persist())},push:function(e,t){var o=this.ref(e).data;return void 0===o?(console.error("Push failed."),!1):void(Array.isArray(o)?(o.push(t),this.persist()):console.error("'Push' can only be used on an array."))},unshift:function(e,t){var o=this.ref(e).data;return void 0===o?(console.error("Unshift failed."),!1):void(Array.isArray(o)?(o.unshift(t),this.persist()):console.error("'Unshift' can only be used on an array."))},remove:function(e){var t=this;return function(o){var r=t.ref(o).data;return void 0===r?(console.error("Remove failed."),!1):void 0===r[e]?(console.error("Remove failed. Key not present in data path."),!1):(Array.isArray(r)?r.splice(e,1):delete r[e],void t.persist())}}},lockrRoom}();