(function(e){function t(t){for(var n,s,o=t[0],u=t[1],c=t[2],d=0,p=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&p.push(r[s][0]),r[s]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);l&&l(t);while(p.length)p.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,o=1;o<a.length;o++){var u=a[o];0!==r[u]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=a[0]))}return e}var n={},r={app:0},i=[];function s(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=n,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/PitchPerception/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var l=u;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var n=a("85ec"),r=a.n(n);r.a},"18d9":function(e,t,a){"use strict";var n=a("9b15"),r=a.n(n);r.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("img",{attrs:{id:"pp-logo",alt:"Vue logo",src:a("f9c3")}}),n("router-view")],1)},i=[],s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v(e._s(e.msg))]),a("br"),a("button",{staticClass:"btn btn-primary",attrs:{id:"login"},on:{click:e.loginButton}},[e._v("Log in with Spotify")]),e._m(0)])},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"credits"}},[a("p",[a("b",[e._v("Logo font:")]),a("br"),e._v("Streamster by Youssef Habchi "),a("br"),a("br"),a("b",[e._v("Vue components:")]),a("br"),a("a",{attrs:{href:"https://deviavir.github.io/vue-bar/?ref=madewithvuejs.com"}},[e._v("Vue Bars")]),a("br"),a("a",{attrs:{href:"https://cinwell.com/vue-trend/"}},[e._v("Vue Trend")])])])}],u={name:"PitchLanding",data:function(){return{stateKey:"spotify_auth_state"}},props:{msg:String},methods:{loginButton:function(){this.login()},login:function(){var e="183f77aa2d88476fb7e593ce69ef1471",t="https://sclowbird.github.io/PitchPerception/#/",a="user-read-private playlist-read-private playlist-read-collaborative user-library-read user-read-email",n=this.generateRandomString(16);sessionStorage.setItem(this.stateKey,n);var r="https://accounts.spotify.com/authorize";r+="?response_type=token",r+="&client_id="+encodeURIComponent(e),r+="&scope="+encodeURIComponent(a),r+="&redirect_uri="+encodeURIComponent(t),r+="&state="+encodeURIComponent(n),window.location=r},generateRandomString:function(e){for(var t="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<e;n++)t+=a.charAt(Math.floor(Math.random()*a.length));return t}}},c=u,l=(a("18d9"),a("2877")),d=Object(l["a"])(c,s,o,!1,null,"42362fdc",null),p=d.exports,f=(a("f9e3"),a("2dd8"),{name:"app",data:function(){return{}}}),h=f,v=(a("034f"),Object(l["a"])(h,r,i,!1,null,null,null)),m=v.exports,g=a("8c4f"),y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"container"}},[a("div",{attrs:{id:"playlistDropDown"}},[a("b-form-select",{staticClass:"mb-3",attrs:{options:e.playLists,size:"sm"},on:{change:e.getPlaylistTrackIds},scopedSlots:e._u([{key:"first",fn:function(){return[a("option",{attrs:{disabled:""},domProps:{value:null}},[e._v("Please select a playlist")])]},proxy:!0}]),model:{value:e.playlistSelection,callback:function(t){e.playlistSelection=t},expression:"playlistSelection"}})],1),e.audioFeatures.length>0?a("div",{attrs:{id:"audioFeatureDropDown"}},[a("b-form-select",{staticClass:"mb-3",attrs:{options:e.featureDropDown,size:"sm"},scopedSlots:e._u([{key:"first",fn:function(){return[a("option",{attrs:{disabled:""},domProps:{value:null}},[e._v("Please select an audio feature")])]},proxy:!0}],null,!1,2032135222),model:{value:e.selectedAf,callback:function(t){e.selectedAf=t},expression:"selectedAf"}}),null!==e.selectedAf?a("div",{attrs:{id:"trend-diagram-container"}},["duration"!=e.featureDropDown[e.selectedAf]?a("div",{attrs:{id:"description"}},[a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-1",modifiers:{"modal-1":!0}}]},[e._v("What does "+e._s(e.featureDropDown[e.selectedAf])+" mean?")]),a("b-modal",{attrs:{"hide-footer":"",id:"modal-1",title:e.featureDropDown[e.selectedAf]}},["danceability"==e.featureDropDown[e.selectedAf]?a("div",{attrs:{id:"danceability"}},[a("p",{staticClass:"my-4"},[e._v(" Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable. ")])]):e._e(),"energy"==e.featureDropDown[e.selectedAf]?a("div",{attrs:{id:"energy"}},[a("p",{staticClass:"my-4"},[e._v(" Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy. ")])]):e._e(),"speechiness"==e.featureDropDown[e.selectedAf]?a("div",{attrs:{id:"speechiness"}},[a("p",{staticClass:"my-4"},[e._v(" Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks. ")])]):e._e(),"acousticness"==e.featureDropDown[e.selectedAf]?a("div",{attrs:{id:"acousticness"}},[a("p",{staticClass:"my-4"},[e._v(" A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic. ")])]):e._e(),"liveness"==e.featureDropDown[e.selectedAf]?a("div",{attrs:{id:"liveness"}},[a("p",{staticClass:"my-4"},[e._v(" Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live. ")])]):e._e(),"valence"==e.featureDropDown[e.selectedAf]?a("div",{attrs:{id:"valence"}},[a("p",{staticClass:"my-4"},[e._v(" A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry). ")])]):e._e(),"instrumentalness"==e.featureDropDown[e.selectedAf]?a("div",{attrs:{id:"instrumentalness"}},[a("p",{staticClass:"my-4"},[e._v(" Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0. ")])]):e._e(),"tempo"==e.featureDropDown[e.selectedAf]?a("div",{attrs:{id:"tempo"}},[a("p",{staticClass:"my-4"},[e._v(" The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration. ")])]):e._e()])],1):e._e(),a("div",{attrs:{id:"min-max-value"}},[a("p",[a("b",[e._v("minimum: "+e._s(e.selectedAfMinValue))])]),a("p",[a("b",[e._v("maximum: "+e._s(e.selectedAfMaxValue))])])]),a("div",{attrs:{id:"trend-diagram"}},[a("trend",{attrs:{data:e.audioFeatures[e.selectedAf].value[0],gradient:["#7EC1FF","#51CB68","#7091BA"],"auto-draw":"",smooth:""}})],1)]):e._e()],1):e._e(),e.averageAf.length>0?a("div",{attrs:{id:"bar-diagram-container"}},[e._m(0),a("div",{attrs:{id:"bar-diagram"}},[a("bars",{attrs:{data:e.averageAf,gradient:["#7EC1FF","#51CB68","#7091BA"],barWidth:35,growDuration:1}})],1)]):e._e(),""!==e.authenticationError?a("h4",[e._v(" Sorry! An error ocurred: "),a("br"),a("font",{attrs:{color:"red"}},[e._v(e._s(e.authenticationError))])],1):e._e()])},b=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"average-af-title"}},[a("p",[a("b",[e._v("average values of all audio features")])])])}],w=(a("4160"),a("13d5"),a("4e82"),a("284c")),_=(a("96cf"),a("89ba")),A=(a("a4d3"),a("e01a"),a("d28b"),a("b680"),a("d3b7"),a("ac1f"),a("3ca3"),a("ddb0"),function(){var e,t={},a=/([^&;=]+)=?([^&;]*)/g,n=window.location.hash.substring(2);while(e=a.exec(n))t[e[1]]=decodeURIComponent(e[2]);return t}),k=function(e,t){var a=Math.pow(10,t||0);return Math.round(e*a)/a},x=function(e){var t=Math.floor(e/6e4),a=(e%6e4/1e3).toFixed(0);return t+":"+(a<10?"0":"")+a},D=function(e,t){for(var a=[],n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];for(var s=0;s<r.length;s++){var o=[],u=!0,c=!1,l=void 0;try{for(var d,p=e[t][Symbol.iterator]();!(u=(d=p.next()).done);u=!0){var f=d.value;null!==f&&o.push(f[r[s]])}}catch(h){c=!0,l=h}finally{try{u||null==p.return||p.return()}finally{if(c)throw l}}a.push(o)}return a},P=[{value:[],title:"danceability"},{value:[],title:"energy"},{value:[],title:"speechiness"},{value:[],title:"acousticness"},{value:[],title:"liveness"},{value:[],title:"valence"},{value:[],title:"instrumentalness"},{value:[],title:"tempo"},{value:[],title:"duration_ms"}],M=[{title:"danceability",unit:""},{title:"energy",unit:""},{title:"speechiness",unit:""},{title:"acousticness",unit:""},{title:"liveness",unit:""},{title:"valence",unit:""},{title:"instrumentalness",unit:""},{title:"tempo",unit:"bpm"},{title:"duration",unit:"min"}],S=function(e){for(var t={},a=0;a<e.length;a++)t[a]=e[a].title;return t},R=S(M),O=function(e,t){var a=new Headers;a.append("Authorization","Bearer "+e),a.append("Content-Type","application/json");var n={method:"GET",headers:a,mode:"cors",cache:"default"};function r(e,t){return i.apply(this,arguments)}function i(){return i=Object(_["a"])(regeneratorRuntime.mark((function e(t,a){var n,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=new Request(a,t),e.next=3,fetch(n);case 3:return r=e.sent,e.next=6,r.json();case 6:return i=e.sent,e.abrupt("return",i);case 8:case"end":return e.stop()}}),e)}))),i.apply(this,arguments)}return r(n,t)},T=function(e){var t="https://api.spotify.com/v1/me";function a(){return n.apply(this,arguments)}function n(){return n=Object(_["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,O(e,t);case 2:return n=a.sent,a.abrupt("return",n.id);case 4:case"end":return a.stop()}}),a)}))),n.apply(this,arguments)}return a()},j=function(e,t){var a=50,n="https://api.spotify.com/v1/users/".concat(t,"/playlists");function r(){return i.apply(this,arguments)}function i(){return i=Object(_["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,O(e,n);case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)}))),i.apply(this,arguments)}return n+="?limit="+encodeURIComponent(a),r()},C=function(e,t){var a="items(track(id,name,href,artists))",n="https://api.spotify.com/v1/playlists/".concat(t,"/tracks");function r(){return i.apply(this,arguments)}function i(){return i=Object(_["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,O(e,n);case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)}))),i.apply(this,arguments)}return n+="?fields="+encodeURIComponent(a),r()},V=function(e,t){for(var a="",n=0;n<t.length;n++)n===t.length-1?a+=t[n]:a+=t[n]+",";var r="https://api.spotify.com/v1/audio-features";function i(){return s.apply(this,arguments)}function s(){return s=Object(_["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,O(e,r);case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)}))),s.apply(this,arguments)}return r+="?ids="+encodeURIComponent(a),i()},F={name:"PitchPerception",data:function(){return{oAuthToken:"",authenticationError:"",playLists:{},playListTracks:{},playlistSelection:null,audioFeatures:[],featureDropDown:R,averageAf:[],selectedAf:null,selectedAfMinValue:0,selectedAfMaxValue:0}},created:function(){var e=A();this.getAuthToken(e)},updated:function(){null!==this.selectedAf&&this.getMinMaxValue()},methods:{getAuthToken:function(e){var t=e.access_token,a=e.state,n=sessionStorage.getItem("spotify_auth_state");!t||null!=a&&a===n?(this.oAuthToken=t,localStorage.removeItem("spotify_auth_state"),this.getDataFromSpotify(t)):this.authenticationError="There was an error during authentication."},getDataFromSpotify:function(){var e=this;Object(_["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,T(e.oAuthToken);case 2:return a=t.sent,t.next=5,j(e.oAuthToken,a);case 5:n=t.sent,e.getPlaylistSelection(n);case 7:case"end":return t.stop()}}),t)})))()},getPlaylistSelection:function(e){for(var t=D(e,"items","name","id"),a=t[0],n=t[1],r={},i=[],s=0;s<t[0].length;s++){var o={};o["playlistId"]=n[s],o["playlistName"]=a[s],i.push(o)}i.sort((function(e,t){return e.playlistName>t.playlistName?1:-1})),i.forEach((function(e,t){r[e.playlistId]=e.playlistName})),this.playLists=r},getPlaylistTrackIds:function(){var e=this;this.averageAf=[],Object(_["a"])(regeneratorRuntime.mark((function t(){var a,n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=[],null===e.playlistSelection){t.next=17;break}return t.next=4,C(e.oAuthToken,e.playlistSelection);case 4:n=t.sent,r=D(n,"items","track"),i=0;case 7:if(!(i<r[0].length)){t.next=16;break}if(null===r[0][i]){t.next=12;break}a.push(r[0][i].id),t.next=13;break;case 12:return t.abrupt("continue",13);case 13:i++,t.next=7;break;case 16:e.getTracksAudioFeatures(a);case 17:case"end":return t.stop()}}),t)})))()},getTracksAudioFeatures:function(e){var t=this;Object(_["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e;case 2:return n=a.sent,a.next=5,V(t.oAuthToken,n);case 5:r=a.sent,t.playlistAudioFeatures(r);case 7:case"end":return a.stop()}}),a)})))()},playlistAudioFeatures:function(e){for(var t=P,a=0;a<t.length;a++)t[a].value=D(e,"audio_features",t[a].title);this.audioFeatures=t,this.displayAverageAudioFeatures()},displayAverageAudioFeatures:function(){var e=this.calculateAverage(),t=1;e.unshift({value:[t],title:"Y-Max-Value = 1"}),this.averageAf=e},calculateAverage:function(){for(var e=JSON.parse(JSON.stringify(this.audioFeatures)),t=7,a=[],n=0;n<t;n++)a.push(e[n]);for(var r=function(e,t){return e+t},i=0;i<a.length;i++)length=a[i].value[0].length,a[i].value=a[i].value[0].reduce(r)/length,a[i].title+=" "+k(a[i].value,2);return a},getMinMaxValue:function(){this.featureMinValue(),this.featureMaxValue()},featureMinValue:function(){var e=8;if(null!==this.selectedAf){var t=Math.min.apply(Math,Object(w["a"])(this.audioFeatures[this.selectedAf].value[0]));this.selectedAf==e?this.selectedAfMinValue=x(t)+" "+M[this.selectedAf].unit:this.selectedAfMinValue=k(t,2)+" "+M[this.selectedAf].unit}},featureMaxValue:function(){var e=8;if(null!==this.selectedAf){var t=Math.max.apply(Math,Object(w["a"])(this.audioFeatures[this.selectedAf].value[0]));this.selectedAf==e?this.selectedAfMaxValue=x(t)+" "+M[this.selectedAf].unit:this.selectedAfMaxValue=k(t,2)+" "+M[this.selectedAf].unit}}}},I=F,E=(a("72e5"),Object(l["a"])(I,y,b,!1,null,"c98bdd0c",null)),L=E.exports;n["default"].use(g["a"]);var B=new g["a"]({routes:[{path:"/",redirect:{name:"PitchLanding"}},{path:"/PitchLanding",name:"PitchLanding",component:p},{path:"/:accessToken",name:"PitchPerception",component:L}]}),U=a("5f5b"),N=a("75fb"),$=a("da19");n["default"].use(U["a"]),n["default"].use(N["a"]),n["default"].use($["a"]),n["default"].config.productionTip=!1,new n["default"]({router:B,render:function(e){return e(m)}}).$mount("#app")},"72e5":function(e,t,a){"use strict";var n=a("87f2"),r=a.n(n);r.a},"85ec":function(e,t,a){},"87f2":function(e,t,a){},"9b15":function(e,t,a){},f9c3:function(e,t,a){e.exports=a.p+"img/Logo2_PitchPerception.61987d52.svg"}});
//# sourceMappingURL=app.d49cf9fc.js.map