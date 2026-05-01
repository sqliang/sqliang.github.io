import{i as X}from"./chunk-353BL4L5-C1ZAb07r-BMNIXPVo.DuGBp3Vv.js";import{q as c,a6 as q,a5 as E,a7 as K,a8 as Y,ao as _,an as j,O as W,A as H,aA as J,aS as Q,aU as Z,aa as tt,at as et,aC as at,aV as w,aW as nt,aX as z}from"../app.DvuScpmA.js";import{I as rt}from"./treemap-75Q7IDZK-CjtfQE8u-DBGEKm3F.D-CPeQh6.js";import{d as L}from"./arc-CegaQWj_-yn6JxQT-.C76lGm7s.js";import{g as it}from"./ordinal-DfAQgscy-BEJTu10r.vTmdWN-q.js";import"./vitepress-theme-teek.DkOCGRPR.js";import"./baseUniq-BxlSXXQG-mwChZi-I.BZW41g5z.js";import"./basePickBy-CC-D1y2F-DXbJFnnh.D9FTpFBo.js";import"./clone-78XdctpQ-DP6jZ9da.bdWHVu3q.js";import"./init-DjUOC4st-C8Nwz6AJ.BTi8F14B.js";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function lt(t){return t}function st(){var t=lt,a=ot,o=null,m=w(0),g=w(z),S=w(0);function i(e){var n,s=(e=nt(e)).length,u,$,h=0,p=new Array(s),r=new Array(s),x=+m.apply(this,arguments),v=Math.min(z,Math.max(-z,g.apply(this,arguments)-x)),f,C=Math.min(Math.abs(v)/s,S.apply(this,arguments)),D=C*(v<0?-1:1),d;for(n=0;n<s;++n)(d=r[p[n]=n]=+t(e[n],n,e))>0&&(h+=d);for(a!=null?p.sort(function(y,A){return a(r[y],r[A])}):o!=null&&p.sort(function(y,A){return o(e[y],e[A])}),n=0,$=h?(v-s*D)/h:0;n<s;++n,x=f)u=p[n],d=r[u],f=x+(d>0?d*$:0)+D,r[u]={data:e[u],index:n,value:d,startAngle:x,endAngle:f,padAngle:C};return r}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:w(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,o=null,i):a},i.sort=function(e){return arguments.length?(o=e,a=null,i):o},i.startAngle=function(e){return arguments.length?(m=typeof e=="function"?e:w(+e),i):m},i.endAngle=function(e){return arguments.length?(g=typeof e=="function"?e:w(+e),i):g},i.padAngle=function(e){return arguments.length?(S=typeof e=="function"?e:w(+e),i):S},i}var pt=at.pie,R={sections:new Map,showData:!1},M=R.sections,V=R.showData,ct=structuredClone(pt),ut=c(()=>structuredClone(ct),"getConfig"),dt=c(()=>{M=new Map,V=R.showData,et()},"clear"),gt=c(({label:t,value:a})=>{M.has(t)||(M.set(t,a),W.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=c(()=>M,"getSections"),mt=c(t=>{V=t},"setShowData"),ht=c(()=>V,"getShowData"),U={getConfig:ut,clear:dt,setDiagramTitle:j,getDiagramTitle:_,setAccTitle:Y,getAccTitle:K,setAccDescription:E,getAccDescription:q,addSection:gt,getSections:ft,setShowData:mt,getShowData:ht},xt=c((t,a)=>{X(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:c(async t=>{const a=await rt("pie",t);W.debug(a),xt(a,U)},"parse")},wt=c(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),St=wt,$t=c(t=>{const a=[...t.entries()].map(o=>({label:o[0],value:o[1]})).sort((o,m)=>m.value-o.value);return st().value(o=>o.value)(a)},"createPieArcs"),vt=c((t,a,o,m)=>{W.debug(`rendering pie chart
`+t);const g=m.db,S=H(),i=J(g.getConfig(),S.pie),e=40,n=18,s=4,u=450,$=u,h=Q(a),p=h.append("g");p.attr("transform","translate("+$/2+","+u/2+")");const{themeVariables:r}=S;let[x]=Z(r.pieOuterStrokeWidth);x??=2;const v=i.textPosition,f=Math.min($,u)/2-e,C=L().innerRadius(0).outerRadius(f),D=L().innerRadius(f*v).outerRadius(f*v);p.append("circle").attr("cx",0).attr("cy",0).attr("r",f+x/2).attr("class","pieOuterCircle");const d=g.getSections(),y=$t(d),A=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],T=it(A);p.selectAll("mySlices").data(y).enter().append("path").attr("d",C).attr("fill",l=>T(l.data.label)).attr("class","pieCircle");let B=0;d.forEach(l=>{B+=l}),p.selectAll("mySlices").data(y).enter().append("text").text(l=>(l.data.value/B*100).toFixed(0)+"%").attr("transform",l=>"translate("+D.centroid(l)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(g.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const O=p.selectAll(".legend").data(T.domain()).enter().append("g").attr("class","legend").attr("transform",(l,b)=>{const k=n+s,N=k*T.domain().length/2,P=12*n,G=b*k-N;return"translate("+P+","+G+")"});O.append("rect").attr("width",n).attr("height",n).style("fill",T).style("stroke",T),O.data(y).append("text").attr("x",n+s).attr("y",n-s).text(l=>{const{label:b,value:k}=l.data;return g.getShowData()?`${b} [${k}]`:b});const I=Math.max(...O.selectAll("text").nodes().map(l=>l?.getBoundingClientRect().width??0)),F=$+e+n+s+I;h.attr("viewBox",`0 0 ${F} ${u}`),tt(h,u,F,i.useMaxWidth)},"draw"),At={draw:vt},Vt={parser:yt,db:U,renderer:At,styles:St};export{Vt as diagram};
