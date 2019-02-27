(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{185:function(e,t){},187:function(e,t){},225:function(e,t,a){"use strict";a.r(t);var n=a(21),r=a.n(n),l=a(222),c=a(221),s=a(31),o=a(17),u=a(0),m=a.n(u),i=a(54),d=a.n(i),f=a(124),E=a(125),h=a(97),p=a(178),b=a.n(p),g=a(47),N=a(2),v=a.n(N),y=a(224),k=a(226),x=a(128),w=function(e){for(var t=e.stats.gameRounds,a=e.feeds,n=e.handleStartGame,r=e.handleRoundSetting,l=[],c=a.reduce(function(e,t){return e+t.items.length},0),s=10;s<=c;s+=10)l.push(s);return m.a.createElement(y.a,{onSubmit:n},m.a.createElement(k.a,{className:"text-center"},m.a.createElement(k.a.Body,null,m.a.createElement(k.a.Title,{"aria-label":"Article title"},m.a.createElement("b",null,"FAKE NOOZ")),"Can you tell what's real news and what's fake news? Take a look at these articles and see how good you are at finding fact from fiction.",m.a.createElement(y.a.Group,{as:E.a,controlId:"number-of-rounds-form",className:v()("mt-3","text-left")},m.a.createElement(y.a.Label,{column:!0,xs:{span:6,offset:1},sm:{span:5,offset:2},lg:{span:4,offset:3}},"Number of Rounds"),m.a.createElement(h.a,{xs:4,sm:3,lg:2},m.a.createElement(y.a.Control,{as:"select",value:t,onChange:r},l.map(function(e){return m.a.createElement("option",{key:e,value:e},e)}),m.a.createElement("option",{value:c},c," (Max)")))))),m.a.createElement("div",{className:v()("d-flex","justify-content-center","mt-4")},m.a.createElement(x.a,{type:"submit",variant:"light",size:"lg"},"Start")))},R=a(14),j=a(11),O=function(e){var t=e.article,a=t.title,n=t.content,r=e.handleRealButton,l=e.handleFakeButton,c=n.replace(/<img[^>]*>/g,"").replace(/<a[^>]*>.*<\/a>/g,"").replace(/<\/?p[^>]*>/g,"").replace(/<table[^>]*>.*<\/table>/g,"").replace(/submitted by.*/g,"").replace(/<br[^>]*>.*/g,"").replace(/\s*makeamericathebest.com Your Trusted Source for Faux News\./g,"");return m.a.createElement(m.a.Fragment,null,m.a.createElement("h3",{className:v()("text-center","mb-4","mb-md-5")},"Is it real or fake?"),m.a.createElement(k.a,null,m.a.createElement(k.a.Body,null,m.a.createElement(k.a.Title,{"aria-label":"Article title"},a),c&&""!==c?m.a.createElement("article",{dangerouslySetInnerHTML:{__html:c}}):m.a.createElement("span",{className:"text-muted"},"No feed content"))),m.a.createElement("div",{className:v()("d-flex","align-items-center","justify-content-center","mt-4")},m.a.createElement(x.a,{variant:"success",size:"lg",className:"mr-3","aria-label":"It's real",onClick:r},m.a.createElement(R.a,{icon:j.a,className:"mr-2"}),"Real"),m.a.createElement(x.a,{variant:"primary",size:"lg",className:"ml-3","aria-label":"It's fake",onClick:l},m.a.createElement(R.a,{icon:j.j,className:"mr-2"}),"Fake")))},S=function(e){var t=e.article,a=t.source,n=t.isReal,r=t.title,l=t.link,c=e.win,s=e.handleNextRound,o=c?"success":"primary";return m.a.createElement(m.a.Fragment,null,m.a.createElement("h3",{className:v()("text-center","text-".concat(o),"mb-4","mb-md-5")},c?"Correct!":"Incorrect"),m.a.createElement(k.a,{bg:o,border:o,className:"text-center"},m.a.createElement(k.a.Body,null,m.a.createElement(k.a.Title,null,m.a.createElement(R.a,{icon:n?j.a:j.j,className:"mr-2"}),n?"Real News":"Fake News"),m.a.createElement("h6",null,a),m.a.createElement("a",{href:l,target:"_blank",rel:"noopener noreferrer",className:"text-white"},r,m.a.createElement(R.a,{icon:j.d,className:"ml-2"})))),m.a.createElement("div",{className:v()("d-flex","justify-content-center","mt-4")},m.a.createElement(x.a,{variant:"light",size:"lg",onClick:s},m.a.createElement(R.a,{icon:j.b,className:"mr-2"}),"Next")))},G=function(e){var t=e.stats,a=t.gameRounds,n=t.score,r=t.accuracy,l=e.handleNewGame,c=Number(r.replace(/%/g,"")),s="Was that your best shot?",o="dark";return 100===c?s="Perfect!":c>=90?s="Almost Perfect":c>=80?s="Very Nice":c>=70?s="Good Job":c>=60?s="Not Bad":c>=50?s="It's the effort that counts.":c>=33?s="Looks like you got fooled.":c>=10&&(s="Well\u2026 you tried."),c>=66?o="success":c<=33&&(o="danger"),m.a.createElement(m.a.Fragment,null,m.a.createElement("h3",{className:v()("text-center","mb-4","mb-md-5")},"Game Over"),m.a.createElement(k.a,{bg:o,border:o,className:"text-center"},m.a.createElement(k.a.Body,null,m.a.createElement(k.a.Title,{"aria-label":"Article title"},s),m.a.createElement("div",{className:v()("text-center","mx-auto","d-flex","align-items-center","justify-content-center")},m.a.createElement("h6",null,"Rounds",m.a.createElement("br",null),m.a.createElement("small",null,a)),m.a.createElement("h6",{className:"mx-2 mx-md-3"},"Score",m.a.createElement("br",null),m.a.createElement("small",null,n)),m.a.createElement("h6",null,"Accuracy",m.a.createElement("br",null),m.a.createElement("small",null,r))))),m.a.createElement("div",{className:v()("d-flex","justify-content-center","mt-4")},m.a.createElement(x.a,{variant:"light",size:"lg",onClick:l},m.a.createElement(R.a,{icon:j.f,className:"mr-2"}),"New Game")))},B=function(e){var t,a=e.stats,n=e.feeds,r=e.article,l=e.realPlay,c=e.handleStartGame,s=e.handleRoundSetting,o=e.handleNextRound,u=e.handleRealButton,i=e.handleFakeButton,d=e.handleNewGame,f=r&&r.isReal===l;switch(a.stage){case"start-game":t=function(){return m.a.createElement(w,{stats:a,feeds:n,handleStartGame:c,handleRoundSetting:s})};break;case"round":t=function(){return m.a.createElement(O,{article:r,handleRealButton:u,handleFakeButton:i})};break;case"result":t=function(){return m.a.createElement(S,{article:r,win:f,handleNextRound:o})};break;case"end-game":t=function(){return m.a.createElement(G,{stats:a,handleNewGame:d})};break;default:t=function(){return null}}return m.a.createElement("div",{className:"py-4 py-md-5","aria-live":"polite"},m.a.createElement(t,null))};B.defaultProps={feeds:void 0,realPlay:void 0};var F=B,P=a(58),C=new b.a,A=function(e){return e?e[Math.floor(Math.random()*e.length)]:null},H=function(e){try{var t=A(e),a=t.source,n=t.isReal,r=t.items,l=A(r);return{source:a,isReal:n,title:l.title,content:l.content,link:l.link}}catch(c){return null}},I=function(e){var t=e.stats,a=e.setScore,n=e.setRound,i=e.setGameRounds,p=e.setLoading,b=e.setStage,N=e.playHandler,v=e.newGameHandler,y=e.setHandlePlay,k=e.setHandleNewGame,x=Object(u.useState)([]),w=Object(o.a)(x,2),R=w[0],j=w[1],O=Object(u.useState)(),S=Object(o.a)(O,2),G=S[0],B=S[1],A=Object(u.useState)(),I=Object(o.a)(A,2),T=I[0],L=I[1],z=t.round,M=t.gameRounds,J=t.score,_=t.loading,D=function(){var e=Object(s.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=j,e.t1=[],e.t2=Object(c.a)(t?[]:R),e.t3=c.a,e.next=6,Promise.all(P.a.map(function(){var e=Object(s.a)(r.a.mark(function e(t){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.parseURL("https://cors-anywhere.herokuapp.com/"+t.rss);case 3:return a=e.sent,e.abrupt("return",Object(l.a)({},a,t));case 7:return e.prev=7,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",{});case 11:case"end":return e.stop()}},e,null,[[0,7]])}));return function(t){return e.apply(this,arguments)}}()));case 6:e.t4=e.sent,e.t5=(0,e.t3)(e.t4),e.t6=e.t1.concat.call(e.t1,e.t2,e.t5),(0,e.t0)(e.t6);case 10:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),K=function(e){a(G.isReal===e?J+1:Math.max(J-1,0)),L(e),b("result")},W=function(){return K},Z=function(e){if(z<M){e&&n(z+1),j(R.map(function(e){return Object(l.a)({items:e.items.filter(function(e){return e.link!==G.link})},e)}));var t=H(R);t?(B(t),b("round")):b("end-game")}else b("end-game")},U=function(){var e=Object(s.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return p(!0),e.next=3,D(!0);case 3:Z(!1),b("start-game"),n(1),a(0),p(!1);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),V=function(){return U};return Object(u.useEffect)(function(){R.length?G?p(!1):B(H(R)):D(),N||y(W),v||k(V)},[R,G,N,v]),m.a.createElement(f.a,{role:"main"},m.a.createElement(d.a,{title:"FAKE NOOZ"}),m.a.createElement(E.a,null,m.a.createElement(h.a,{sm:{span:10,offset:1},lg:{span:8,offset:2},xl:{span:6,offset:3}},_?m.a.createElement(g.a,{isLoading:!0,pastDelay:!0}):m.a.createElement(F,{stats:t,feeds:R,article:G,realPlay:T,handleStartGame:function(e){e.preventDefault(),b("round")},handleRoundSetting:function(e){return i(e.target.value)},handleNextRound:Z,handleRealButton:function(){return K(!0)},handleFakeButton:function(){return K(!1)},handleNewGame:U}))))};I.defaultProps={playHandler:void 0,newGameHandler:void 0};t.default=I}}]);
//# sourceMappingURL=4.92299112.chunk.js.map