function $(){}function H(t,n){for(const e in n)t[e]=n[e];return t}function B(t){return t()}function C(){return Object.create(null)}function y(t){t.forEach(B)}function L(t){return typeof t=="function"}function ut(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function I(t){return Object.keys(t).length===0}function G(t,...n){if(t==null)return $;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function lt(t,n,e){t.$$.on_destroy.push(G(n,e))}function ot(t,n,e,i){if(t){const r=O(t,n,e,i);return t[0](r)}}function O(t,n,e,i){return t[1]&&i?H(e.ctx.slice(),t[1](i(n))):e.ctx}function st(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const s=[],c=Math.max(n.dirty.length,r.length);for(let o=0;o<c;o+=1)s[o]=n.dirty[o]|r[o];return s}return n.dirty|r}return n.dirty}function ft(t,n,e,i,r,s){if(r){const c=O(n,e,i,s);t.p(c,r)}}function at(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let w=!1;function J(){w=!0}function K(){w=!1}function W(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function Q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const u=[];for(let l=0;l<n.length;l++){const a=n[l];a.claim_order!==void 0&&u.push(a)}n=u}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let u=0;u<n.length;u++){const l=n[u].claim_order,a=(r>0&&n[e[r]].claim_order<=l?r+1:W(1,r,g=>n[e[g]].claim_order,l))-1;i[u]=e[a]+1;const f=a+1;e[f]=u,r=Math.max(f,r)}const s=[],c=[];let o=n.length-1;for(let u=e[r]+1;u!=0;u=i[u-1]){for(s.push(n[u-1]);o>=u;o--)c.push(n[o]);o--}for(;o>=0;o--)c.push(n[o]);s.reverse(),c.sort((u,l)=>u.claim_order-l.claim_order);for(let u=0,l=0;u<c.length;u++){for(;l<s.length&&c[u].claim_order>=s[l].claim_order;)l++;const a=l<s.length?s[l]:null;t.insertBefore(c[u],a)}}function R(t,n){if(w){for(Q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function _t(t,n,e){w&&!e?R(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode&&t.parentNode.removeChild(t)}function dt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function V(t){return document.createElement(t)}function X(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S(t){return document.createTextNode(t)}function ht(){return S(" ")}function mt(){return S("")}function pt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function yt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function gt(t){return t===""?null:+t}function Y(t){return Array.from(t.childNodes)}function Z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function P(t,n,e,i,r=!1){Z(t);const s=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const o=t[c];if(n(o)){const u=e(o);return u===void 0?t.splice(c,1):t[c]=u,r||(t.claim_info.last_index=c),o}}for(let c=t.claim_info.last_index-1;c>=0;c--){const o=t[c];if(n(o)){const u=e(o);return u===void 0?t.splice(c,1):t[c]=u,r?u===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,o}}return i()})();return s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,s}function T(t,n,e,i){return P(t,r=>r.nodeName===n,r=>{const s=[];for(let c=0;c<r.attributes.length;c++){const o=r.attributes[c];e[o.name]||s.push(o.name)}s.forEach(c=>r.removeAttribute(c))},()=>i(n))}function xt(t,n,e){return T(t,n,e,V)}function bt(t,n,e){return T(t,n,e,X)}function tt(t,n){return P(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>S(n),!0)}function $t(t){return tt(t," ")}function wt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function vt(t,n){t.value=n??""}function Et(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function Nt(t,n){return new t(n)}let p;function m(t){p=t}function q(){if(!p)throw new Error("Function called outside component initialization");return p}function St(t){q().$$.on_mount.push(t)}function At(t){q().$$.after_update.push(t)}const h=[],M=[],x=[],k=[],z=Promise.resolve();let E=!1;function D(){E||(E=!0,z.then(F))}function jt(){return D(),z}function N(t){x.push(t)}const v=new Set;let d=0;function F(){if(d!==0)return;const t=p;do{try{for(;d<h.length;){const n=h[d];d++,m(n),nt(n.$$)}}catch(n){throw h.length=0,d=0,n}for(m(null),h.length=0,d=0;M.length;)M.pop()();for(let n=0;n<x.length;n+=1){const e=x[n];v.has(e)||(v.add(e),e())}x.length=0}while(h.length);for(;k.length;)k.pop()();E=!1,v.clear(),m(t)}function nt(t){if(t.fragment!==null){t.update(),y(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const b=new Set;let _;function Ct(){_={r:0,c:[],p:_}}function Mt(){_.r||y(_.c),_=_.p}function et(t,n){t&&t.i&&(b.delete(t),t.i(n))}function kt(t,n,e,i){if(t&&t.o){if(b.has(t))return;b.add(t),_.c.push(()=>{b.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Bt(t){t&&t.c()}function Lt(t,n){t&&t.l(n)}function it(t,n,e,i){const{fragment:r,after_update:s}=t.$$;r&&r.m(n,e),i||N(()=>{const c=t.$$.on_mount.map(B).filter(L);t.$$.on_destroy?t.$$.on_destroy.push(...c):y(c),t.$$.on_mount=[]}),s.forEach(N)}function rt(t,n){const e=t.$$;e.fragment!==null&&(y(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ct(t,n){t.$$.dirty[0]===-1&&(h.push(t),D(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Ot(t,n,e,i,r,s,c,o=[-1]){const u=p;m(t);const l=t.$$={fragment:null,ctx:[],props:s,update:$,not_equal:r,bound:C(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(u?u.$$.context:[])),callbacks:C(),dirty:o,skip_bound:!1,root:n.target||u.$$.root};c&&c(l.root);let a=!1;if(l.ctx=e?e(t,n.props||{},(f,g,...A)=>{const j=A.length?A[0]:g;return l.ctx&&r(l.ctx[f],l.ctx[f]=j)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](j),a&&ct(t,f)),g}):[],l.update(),a=!0,y(l.before_update),l.fragment=i?i(l.ctx):!1,n.target){if(n.hydrate){J();const f=Y(n.target);l.fragment&&l.fragment.l(f),f.forEach(U)}else l.fragment&&l.fragment.c();n.intro&&et(t.$$.fragment),it(t,n.target,n.anchor,n.customElement),K(),F()}m(u)}class Pt{$destroy(){rt(this,1),this.$destroy=$}$on(n,e){if(!L(e))return $;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!I(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{jt as A,$ as B,ot as C,ft as D,at as E,st as F,R as G,lt as H,pt as I,dt as J,vt as K,y as L,gt as M,X as N,bt as O,M as P,Pt as S,ht as a,_t as b,$t as c,Mt as d,mt as e,et as f,Ct as g,U as h,Ot as i,At as j,V as k,xt as l,Y as m,yt as n,St as o,Et as p,S as q,tt as r,ut as s,kt as t,wt as u,Nt as v,Bt as w,Lt as x,it as y,rt as z};
