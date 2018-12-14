$(document).ready(function(){function e(){g=new google.maps.Map(document.getElementById("map"),{center:new google.maps.LatLng(44.979972,(-93.277818)),zoom:14,scrollwheel:!1,styles:[{featureType:"administrative.land_parcel",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels",stylers:[{visibility:"off"}]}]});for(var e=0;e<t(L);e++){var a=L[e];v[e]=new google.maps.Marker({position:{lat:a.lat,lng:a.lng},title:a.name,animation:google.maps.Animation.DROP,icon:x,label:{text:(e+1).toString(),color:"white"}}),v[e].index=e,u[e]=new MapLabel({text:a.name,position:new google.maps.LatLng(a.lat,a.lng),fontSize:14,align:"bottom"}),b[e]='\n        <p class="color-blue-base bold text-medium margin-extra-small">'+v[e].title+" - "+a.distance+' mi</p>\n        <p class="margin-none">'+a.address1+'</p>\n        <p class="margin-none">$'+a.cost+' total annual drug cost</p>\n        <a href="#" class="map-select-'+e+'">Select</a>\n      ',f[e]=new google.maps.InfoWindow({content:b[e]}),v[e].addListener("click",function(){o(f),r(v),v[this.index].get("selected")?v[this.index].setIcon(P):v[this.index].setIcon(M),f[this.index].open(g,v[this.index]),g.panTo(v[this.index].position)}),f[e].addListener("closeclick",function(){r(v)})}for(var e=0;e<t(T);e++){var a=T[e];y[e]=new google.maps.Marker({position:{lat:a.lat,lng:a.lng},title:a.name,animation:google.maps.Animation.DROP,icon:x,label:{text:(e+1).toString(),color:"white"}}),y[e].index=e,w[e]=new MapLabel({text:a.name,position:new google.maps.LatLng(a.lat,a.lng),fontSize:14,align:"bottom"}),S[e]='\n        <p class="color-blue-base bold text-medium margin-extra-small">'+y[e].title+" - "+a.distance+' mi</p>\n        <p class="margin-none">'+a.address1+'</p>\n        <a href="#" class="map-select-'+e+'">Select</a>\n      ',k[e]=new google.maps.InfoWindow({content:S[e]}),y[e].addListener("click",function(){o(k),r(y),y[this.index].get("selected")?y[this.index].setIcon(P):y[this.index].setIcon(M),k[this.index].open(g,y[this.index]),g.panTo(y[this.index].position)}),k[e].addListener("closeclick",function(){r(y)})}g.addListener("click",function(){o(f),o(k),r(v),r(y)}),google.maps.event.addDomListener(window,"resize",function(){var e=g.getCenter();google.maps.event.trigger(g,"resize"),g.setCenter(e)})}function a(e){var a,t,s,o;"saver"===e?(a=$(".pharmacy-saver-block").find("li"),s=v,o=f):"standard"===e&&(a=$(".pharmacy-standard-block").find("li"),s=y,o=k),a.on("mouseover",function(e){e.preventDefault(),$(this).hasClass("selected")||p(o)||(t=$(this).index(),void 0!==v[t]&&s[t].setIcon(M))}),a.on("mouseout",function(e){e.preventDefault(),$(this).hasClass("selected")||p(o)||(t=$(this).index(),void 0!==v[t]&&s[t].setIcon(x))}),$("a.show-on-map").on("click",function(e){e.preventDefault();var a=d();t=void 0===a?$(this).closest("li").index():a,google.maps.event.trigger(g,"click"),google.maps.event.trigger(s[t],"click"),g.panTo(s[t].position),$("html, body").animate({scrollTop:$(".map-toggle").offset().top},300),$("#collapseMap").collapse("show")}),$("a.select-pharmacy",a).on("click",function(a){a.preventDefault(),t=$(this).parents("li").index(),m($(this),t,e)})}function t(e){var a=0;for(var t in e)e.hasOwnProperty(t)&&++a;return a}function s(e,a){for(var t=0;t<e.length;t++)e[t].get("selected")?(e[t].setMap(a),e[t].setIcon(C)):e[t].setMap(a)}function o(e){for(var a=0;a<e.length;a++)e[a].close()}function r(e){for(var a=0;a<e.length;a++)e[a].get("selected")?e[a].setIcon(C):(e[a].setIcon(x),e[a].set("label",{text:a+1,color:"white"}))}function n(){for(var e=0;e<v.length;e++)v[e].get("selected")||(v[e].setMap(null),v[e].setIcon(x));for(var e=0;e<y.length;e++)y[e].get("selected")||(y[e].setMap(null),y[e].setIcon(x))}function l(e){var t=e,o=$(".pharmacy-saver-block"),r=$(".pharmacy-standard-block"),l=$(".mail-service-block"),i=$(".pharmacy-retail-block"),p=$("#collapseMap"),d=$(".map-toggle");"saver"===t?(l.hide(),r.hide(),i.hide(),n(),s(v,g),a(t),c(v),o.show(),p.collapse("show"),d.show()):"mail-service"===t?(o.hide(),r.hide(),i.hide(),n(),l.show(),p.collapse("hide"),d.hide()):"standard"===t?(l.hide(),o.hide(),i.hide(),n(),s(y,g),a(t),c(y),r.show(),p.collapse("show"),d.show()):"retail"===t&&(l.hide(),o.hide(),n(),s(y,g),a("standard"),c(y),r.show(),i.show(),p.collapse("show"),d.show())}function i(){function e(){D.html(z.cost.toFixed(2))}TweenLite.to(z,1,{cost:1234.56,onUpdate:e}),$(".drug-tiers").html("12.34")}function c(e){for(var a=new google.maps.LatLngBounds,t=0;t<e.length;t++)a.extend(e[t].getPosition());g.fitBounds(a)}function p(e){for(var a=0;a<e.length;a++)if(e[a].getMap())return!0}function d(){for(var e,a=[v,y],t=0;a.length>t;t++)for(var s=a[t],o=0;s.length>o;o++)s[o].get("selected")&&(e=o);return e}function m(e,a,t){var s,o,n,l,c,p=$("#pharmacy-results").children().filter(":visible").attr("class");switch("saver"===t?(n=$(".pharmacy-saver-block").find("li"),l=v,c=f):"standard"===t&&(n=$(".pharmacy-standard-block").find("li"),l=y,c=k),p){case"pharmacy-standard-block":s=T,o="pharmacyStandard";break;case"pharmacy-saver-block":s=L,o="pharmacySaver";break;case"mail-service-block":alert("mail")}for(var d=Store.ref(["DCE",o]).data.length,m=0;m<d;m++)Store.set(["DCE",o,m],{visible:!0});Store.set(["DCE",o,a],{visible:!1});var h=n.find(".selected");h.removeClass("selected"),r(l),0!==$("#drugs-tab .drug-container").length&&i(),google.maps.event.trigger(l[a],"click"),g.panTo(l[a].position);for(var m=0;m<y.length;m++)y[m].setIcon(x),y[m].set("selected",!1),y[m].set("label",{text:m+1,color:"white"});for(var m=0;m<v.length;m++)v[m].setIcon(x),v[m].set("selected",!1),v[m].set("label",{text:m+1,color:"white"});l[a].setIcon(P),l[a].set("selected",!0);var u=c[a].getContent(),b=/(?=Select)\w+/g,w=/(\$1234\.56)+/g;b.test(u)&&(u=u.replace('<a href="#">Select</a>',""),c[a].setContent(u)),w.test(u)&&(u=u.replace('<p class="margin-none">$1234.56 total annual drug cost</p>',""),c[a].setContent(u)),l[a].set("label",{text:" ",color:"white"});e.parents("li").find(".pharmacy-name").text();Store.set(["DCE","savedPharmacy"],s[a]),Store.set(["DCE","savedPharmacy"],{savingsAvail:!0}),Store.ref(["DCE","savedDrugs","drugs"]).data.length>0&&Store.set(["DCE"],{savingsAvail:!0}),$(".selected-pharmacy").show(),$(".map-wrapper").attr("pharmacy-selected","true"),$("html,body").animate({scrollTop:$("ul.map-toggle").offset().top})}function h(e,a,t){var s;return function(){var o=this,r=arguments,n=function(){s=null,t||e.apply(o,r)},l=t&&!s;clearTimeout(s),s=setTimeout(n,a),l&&e.apply(o,r)}}for(var g,v=[],u=[],f=[],b=[],y=[],w=[],k=[],S=[],x={url:"/images/icon-svgs/mapmarker-pill-blue.svg",size:new google.maps.Size(40,40),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(20,20),scaledSize:new google.maps.Size(40,40)},C={url:"/images/icon-svgs/mapmarker-pill-star.svg",size:new google.maps.Size(40,40),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(20,20),scaledSize:new google.maps.Size(40,40)},M={url:"/images/icon-svgs/mapmarker-pin-blue.svg",size:new google.maps.Size(40,40),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(20,40),scaledSize:new google.maps.Size(40,40)},P={url:"/images/icon-svgs/mapmarker-pin-star.svg",size:new google.maps.Size(40,40),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(20,40),scaledSize:new google.maps.Size(40,40)},D=$(".total-cost"),z={cost:0},T=[{lat:44.976856,lng:-93.271771,name:"Standard Pharmacy",markerNumber:"0",address1:"985 Universal Ave",address2:"Minneapolis, MN 55403",phone:"(612) 555-5555",distance:"0.76",type:"Standard Network",visible:!0},{lat:44.972161,lng:-93.277306,name:"Hershey's Pharmacy",markerNumber:"1",address1:"795 Chocolate Street",address2:"Minneapolis, MN 55403",phone:"(612) 555-5555",distance:"1.56",type:"Standard Network",visible:!0}],I=0;I<T.length;I++)Store.push(["DCE","pharmacyStandard"],T[I]);for(var L=[{lat:44.981672,lng:-93.283818,name:"CVS Pharmacy",markerNumber:"0",address1:"795 Oglethorpe Ave",address2:"Minneapolis, MN 55403",phone:"(612) 555-5555",cost:"1,000.00",savings:"5.00",distance:"0.81",type:"Pharmacy Saver",visible:!0},{lat:44.980445,lng:-93.275313,name:"Bob's Club Pharmacy",markerNumber:"1",address1:"347 Mirum Circle",address2:"Minneapolis, MN 55403",phone:"(612) 555-5555",cost:"950.00",savings:"10.00",distance:"0.93",type:"Pharmacy Saver",visible:!0},{lat:44.976645,lng:-93.259813,name:"Walblues Pharmacy",markerNumber:"2",address1:"965 Snapple Drive",address2:"Minneapolis, MN 55403",phone:"(612) 555-5555",cost:"940.00",savings:"20.00",distance:"1.36",type:"Pharmacy Saver",visible:!0},{lat:44.975702,lng:-93.273759,name:"UHCMR Pharmacy",markerNumber:"3",address1:"123 Health Street",address2:"Minneapolis, MN 55403",phone:"(612) 555-5555",cost:"935.00",savings:"25.00",distance:"1.72",type:"Pharmacy Saver",visible:!0}],I=0;I<L.length;I++)Store.push(["DCE","pharmacySaver"],L[I]);$('li[href="#pharmacy-tab"], a[data-toggle="tab"][href="#pharmacy-tab"]').one("shown.bs.tab",function(a){e(),s(v,g),c(v),s(u,g)}),$('a[data-toggle="tab"][href="#drugs-tab"]').on("show.bs.tab",function(e){$("ul.arrow-tabs li.arrow-tab-item").removeClass("active"),$("ul.arrow-tabs li.arrow-tab-item:first-child").addClass("active"),$("html, body").animate({scrollTop:$("ul.arrow-tabs").offset().top},300)}),$('a[data-toggle="tab"][href="#pharmacy-tab"]').on("show.bs.tab",function(e){$("ul.arrow-tabs li.arrow-tab-item").removeClass("active"),$("ul.arrow-tabs li.arrow-tab-item:nth-child(2)").addClass("active"),$("html, body").animate({scrollTop:$("ul.arrow-tabs").offset().top},300)}),$('a[data-toggle="tab"][href="#costs-tab"]').on("show.bs.tab",function(e){$("ul.arrow-tabs li.arrow-tab-item").removeClass("active"),$("ul.arrow-tabs li.arrow-tab-item:nth-child(3)").addClass("active"),$("html, body").animate({scrollTop:$("ul.arrow-tabs").offset().top},300)});var N=$('input[name="pharmacy-type"]');N.on("change",function(e){l($(this).val())}),a("saver"),$("#mail-service-select").click(function(e){e.preventDefault();var a={name:"Preferred Mail Service",address1:"Delivered to your home",address2:"",phone:"",type:"Mail Service"};Store.set(["DCE","savedPharmacy"],a),Store.set(["DCE","savedPharmacy"],{savingsAvail:!1}),$("#mail-service-select").addClass("select-pharmacy"),$(".selected-pharmacy").show(),$(".map-wrapper").attr("pharmacy-selected","true"),$("html,body").scrollTop($("#pharmacy-header").offset().top)}),$(".card-body").on("click",".search-new-pharmacy",function(e){e.preventDefault(),google.maps.event.trigger(g,"click");var a='\n        <a href="#pharmacy-header">Choose a Pharmacy to see your drug costs</a>\n    ';n(),$("#pharmacy-sidebar").html(a),s(v,g),l("saver"),$(".selected-pharmacy").hide(),$("#pharmacy-form").show(),$("#pharmacy-results").show(),$(".pharmacy-saver-block").show(),$("#collapseMap").collapse("show"),$(".map-wrapper").removeAttr("pharmacy-selected"),$("#drug-pharmacy-sidebar-table").hide()}),$("#pharmacy-type input[type=radio]").change(function(e){e.preventDefault(),l($(this).val())}),$("#zipcode-button").click(function(e){e.preventDefault();var a=$("#zipcode").val();"90210"===a?($(".pharmacy-listing").show(),$(".pharmacy-error").hide()):($(".pharmacy-listing").hide(),$(".pharmacy-error").show())});var E=$(window).width();h(function(){E=$(window).width(),E<768&&$("#collapseMap").collapse("hide")},250);E<768&&$("#collapseMap").collapse("hide"),$("#collapseMap").on("shown.bs.collapse",function(){google.maps.event.trigger(g,"resize"),"block"===$(".pharmacy-standard-block").css("display")?c(y):"block"===$(".pharmacy-saver-block").css("display")&&c(v)}),$("#map").on("click","[class*=map-select]",function(e){e.preventDefault();var a,t=$(this).attr("class").match(/\d+/)[0],s=$("#pharmacy-results").children().filter(":visible").attr("class");switch(s){case"pharmacy-standard-block":a="standard";break;case"pharmacy-saver-block":a="saver"}m($(this),t,a)})});