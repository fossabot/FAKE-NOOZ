(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{153:function(e,t){},155:function(e,t){},191:function(e,t,a){"use strict";a.r(t);var n=a(12),r=a.n(n),l=a(190),c=a(189),s=a(23),o=a(24),i=a(0),u=a.n(i),m=a(2),f=a.n(m),d=a(41),p=a.n(d),h=a(193),w=a(188),E=a(92),b=a(93),k=a(94),N=a(18),g=a(21),v=a(145),x=a(146),y=new(a.n(x).a),j=[{link:"https://www.theonion.com/rss",real:!1},{link:"http://makeamericathebest.com/feed/",real:!1},{link:"https://babylonbee.com/feed",real:!1},{link:"https://www.wsj.com/xml/rss/3_7085.xml",real:!0},{link:"http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",real:!0},{link:"https://www.npr.org/rss/rss.php?id=1001",real:!0}],O=function(e){return e?e[Math.floor(Math.random()*e.length)]:null},H=function e(t){try{var a=O(t),n=a.title,r=a.real,l=a.items,c=O(l);return{source:n,real:r,title:c.title,content:c.content,link:c.link}}catch(s){return e(t)}},P=function(){return u.a.createElement("p",{className:f()("d-flex","align-items-center","justify-content-center")},u.a.createElement(N.a,{icon:v.a,size:"2x",spin:!0,className:f()("mr-3","text-primary")}),"Loading news feeds...")},R=function(e){var t=e.article,a=t.source,n=t.real,r=t.title,l=t.link,c=e.win,s=e.handleNextArticle,o=c?"success":"danger";return u.a.createElement(u.a.Fragment,null,u.a.createElement(h.a,{bg:o,border:o,className:"text-center"},u.a.createElement(h.a.Body,null,u.a.createElement(h.a.Title,{as:"h4"},c?"Correct!":"Incorrect"),u.a.createElement("h5",null,u.a.createElement(N.a,{icon:n?g.a:g.h,className:"mr-2"}),n?"Real News":"Fake News"),u.a.createElement("h6",null,a),u.a.createElement("a",{href:l,target:"_blank",rel:"noopener noreferrer",className:"text-white"},r,u.a.createElement(N.a,{icon:g.d,className:"ml-2"})))),u.a.createElement("div",{className:f()("d-flex","justify-content-center","mt-4")},u.a.createElement(w.a,{variant:"light",size:"lg",onClick:s},u.a.createElement(N.a,{icon:g.b,className:"mr-2"}),"Next")))},F=function(e){var t=e.article,a=e.realPlay,n=e.showResult,r=e.handleNextArticle,l=e.handleRealButton,c=e.handleFakeButton,s=t&&t.real===a;return n?u.a.createElement(R,{article:t,win:s,handleNextArticle:r}):u.a.createElement(u.a.Fragment,null,u.a.createElement(h.a,{bg:"dark",border:"dark"},u.a.createElement(h.a.Body,null,u.a.createElement(h.a.Title,null,t.title),u.a.createElement("article",{dangerouslySetInnerHTML:{__html:t.content.replace(/<img[^>]*>/g,"").replace(/<a[^>]*>.*<\/a>/g,"")}}))),u.a.createElement("div",{className:f()("d-flex","align-items-center","justify-content-center","mt-4")},u.a.createElement(w.a,{variant:"success",size:"lg",className:"mr-3",onClick:l},u.a.createElement(N.a,{icon:g.a,className:"mr-2"}),"Real"),u.a.createElement(w.a,{variant:"danger",size:"lg",className:"ml-3",onClick:c},u.a.createElement(N.a,{icon:g.h,className:"mr-2"}),"Fake")))};F.defaultProps={realPlay:void 0};var B=function(e){var t=e.round,a=e.score,n=e.setScore,m=e.setRound,f=e.playHandler,d=e.newGameHandler,h=e.setHandlePlay,w=e.setHandleNewGame,N=Object(i.useState)([]),g=Object(o.a)(N,2),v=g[0],x=g[1],O=Object(i.useState)(),R=Object(o.a)(O,2),B=R[0],S=R[1],z=Object(i.useState)(),A=Object(o.a)(z,2),C=A[0],M=A[1],_=Object(i.useState)(!1),G=Object(o.a)(_,2),I=G[0],L=G[1],T=function(){var e=Object(s.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=x,e.t1=[],e.t2=Object(c.a)(v),e.t3=c.a,e.next=6,Promise.all(j.map(function(){var e=Object(s.a)(r.a.mark(function e(t){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.parseURL("".concat("https://cors-anywhere.herokuapp.com/").concat(t.link));case 3:return a=e.sent,e.abrupt("return",Object(l.a)({},a,t));case 7:return e.prev=7,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",[]);case 11:case"end":return e.stop()}},e,null,[[0,7]])}));return function(t){return e.apply(this,arguments)}}()));case 6:e.t4=e.sent,e.t5=(0,e.t3)(e.t4),e.t6=e.t1.concat.call(e.t1,e.t2,e.t5),(0,e.t0)(e.t6);case 10:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),J=function(e){n(B.real===e?a+1:Math.max(a-1,0)),M(e),L(!0)},U=function(){return function(e){return J(e)}},q=function(e){e&&m(t+1),S(H(v)),L(!1)},D=function(){return function(){n(0),m(1),q(!1)}};return Object(i.useEffect)(function(){v.length?B||S(H(v)):T(),f||h(U),d||w(D)},[v,B,f,d]),u.a.createElement(E.a,{className:"py-5"},u.a.createElement(p.a,{title:"Fake Nooz"}),u.a.createElement("h3",{className:"text-center mb-5"},"Is it real or fake?"),u.a.createElement(b.a,null,u.a.createElement(k.a,{sm:{span:8,offset:2},md:{span:6,offset:3}},B?u.a.createElement(F,{article:B,realPlay:C,showResult:I,handleNextArticle:q,handleRealButton:function(){return J(!0)},handleFakeButton:function(){return J(!1)}}):u.a.createElement(P,null))))};B.defaultProps={playHandler:void 0,newGameHandler:void 0},t.default=B}}]);
//# sourceMappingURL=4.2afe3225.chunk.js.map