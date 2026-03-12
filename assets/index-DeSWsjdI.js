(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const J="pocket-app-v2",O={isSetupComplete:!1,microIncomeLedger:[],nextIncomeDate:null,cashOnHand:0,tier1Bills:[],tier2Config:{categories:["food","transport"]},transactions:[],setupDate:null,utangLedger:[],emergencyVault:0,nutritionLog:[],lastProcessedDate:null},ce=[{value:1,label:"Junk",emoji:"🍜"},{value:2,label:"Low",emoji:"🍞"},{value:3,label:"Fair",emoji:"👌"},{value:4,label:"Good",emoji:"🥩"},{value:5,label:"Superb",emoji:"🥗"}],ue={food:"🍚",transport:"🚌"};function p(t){return"₱"+(t/100).toFixed(2)}function M(t){const e=parseFloat(String(t).replace(/[^0-9.]/g,""));return!e||e<=0||isNaN(e)?0:Math.round(e*100)}function B(){return K(new Date)}function K(t){const e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${e}-${n}-${i}`}function F(t){if(!t)return"";const[e,n,i]=t.split("-").map(Number);return new Date(e,n-1,i).toLocaleDateString("en-PH",{month:"short",day:"numeric"})}function D(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function X(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Q(t,e){const n=new Date(t+"T00:00:00").getTime(),i=new Date(e+"T00:00:00").getTime();return Math.max(1,Math.ceil((i-n)/864e5))}let s={...O};function fe(t){s=t}function xe(){try{const t=localStorage.getItem(J);return t?{...O,...JSON.parse(t)}:{...O}}catch{return{...O}}}function A(t){try{localStorage.setItem(J,JSON.stringify(t))}catch{}}function Ee(){localStorage.removeItem(J),s={...O}}function me(){const t=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download=`pocket-app-${B()}.json`,e.click(),URL.revokeObjectURL(e.href)}const Ie=["view-loading","view-welcome","view-setup","view-dashboard"];function V(t,e){Ie.forEach(i=>{const a=document.getElementById(i);a&&(a.style.display="none")});const n=document.getElementById(t);n&&(n.style.display=t==="view-loading"||t==="view-welcome"?"flex":"block")}function P(t){const e=document.getElementById(t);e&&(e.style.display="flex")}function g(t){const e=document.getElementById(t);e&&(e.style.display="none")}function Z(t,e="block"){const n=document.getElementById(t);n&&(n.style.display=e)}function S(t){const e=document.getElementById(t);e&&(e.style.display="none")}function Be(t){const e=B(),n=new Date(e+"T00:00:00");n.setDate(n.getDate()-3);const i=K(n),a=t.nutritionLog.filter(l=>l.date>=i);if(a.length<3)return null;const o=a.reduce((l,h)=>l+h.score,0)/a.length,r=a.reduce((l,h)=>l+h.cost,0)/a.length;return o<=2&&r>3e3?{avgScore:o.toFixed(1),avgCost:Math.round(r),meals:a.length}:null}function ke(t){const e=B();if(!t.setupDate||!t.lastProcessedDate)return 0;const n=t.lastProcessedDate;if(n>=e)return 0;const i=t.tier1Bills.filter(v=>!v.isPaid).reduce((v,d)=>v+d.amount,0),a=t.cashOnHand-i,o=t.nextIncomeDate?Q(e,t.nextIncomeDate):30,r=a/Math.max(1,o);let l=0;const h=new Date(n+"T00:00:00"),k=new Date(e+"T00:00:00");for(let v=new Date(h);v<k;v.setDate(v.getDate()+1)){const d=K(v);if(d===e)break;const y=t.transactions.filter(m=>m.date===d&&m.tier===2).reduce((m,E)=>m+E.amount,0),u=r-y;if(u>0){const m=Math.floor(u/2);l+=m,t.emergencyVault+=u-m}}return t.lastProcessedDate=e,l}function ee(t){const e=B(),n=t.tier1Bills.filter(f=>!f.isPaid).reduce((f,w)=>f+w.amount,0),i=t.utangLedger.filter(f=>!f.isPaid).reduce((f,w)=>f+w.amount,0),a=t.cashOnHand-n,o=t.nextIncomeDate?Q(e,t.nextIncomeDate):30,r=a/Math.max(1,o),l=r<=0,h=ke(t),k=t.transactions.filter(f=>f.date===e&&f.tier===2).reduce((f,w)=>f+w.amount,0),v={allowance:Math.max(0,r),spent:k,rollover:h},d=t.tier1Bills.filter(f=>!f.isPaid),y=d.reduce((f,w)=>f+w.amount,0);let u=null;const m=new Date(e+"T00:00:00").getTime();for(const f of d){if(!f.dueDate)continue;const w=Math.ceil((new Date(f.dueDate+"T00:00:00").getTime()-m)/864e5);w>=0&&(u===null||w<u)&&(u=w)}const E=Be(t);return{dailyAllowance:Math.max(0,r),isDeficit:l,todayState:v,unpaidBillsTotal:y,nextBillDays:u,buffer:h,emergencyVault:t.emergencyVault,utangOwed:i,healthWarning:E,daysToNext:o,availableCash:a}}function L(t){const e=document.getElementById(t);e&&(e.classList.remove("animate-shake"),e.offsetWidth,e.classList.add("animate-shake"),e.style.borderColor="#ff4b4b",setTimeout(()=>{e.classList.remove("animate-shake"),e.style.borderColor="#ede8df"},650))}function ge(t,e="#1cb0f6",n="#ede8df"){const i=document.getElementById(t);i&&(i.addEventListener("focus",()=>i.style.borderColor=e),i.addEventListener("blur",()=>i.style.borderColor=n))}function I(t){let e=document.getElementById("toast");e||(e=document.createElement("div"),e.id="toast",e.style.cssText="position:fixed; bottom:90px; left:50%; transform:translateX(-50%); z-index:999; background:linear-gradient(135deg,#2e2e2e,#1a1a2e); color:white; padding:12px 20px; border-radius:16px; font-size:13px; font-weight:700; box-shadow:0 8px 32px rgba(0,0,0,0.3); max-width:340px; text-align:center; opacity:0; transition:opacity 0.3s ease;",document.body.appendChild(e)),e.textContent=t,e.style.opacity="1",setTimeout(()=>{e.style.opacity="0"},3e3)}const b={ctx:null,_init(){if(!this.ctx)try{this.ctx=new(window.AudioContext||window.webkitAudioContext)}catch{}},play(t){if(this._init(),!this.ctx)return;const e=this.ctx.currentTime;try{switch(t){case"pop":{const n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(600,e),n.frequency.exponentialRampToValueAtTime(1200,e+.08),n.frequency.exponentialRampToValueAtTime(800,e+.15),i.gain.setValueAtTime(.15,e),i.gain.exponentialRampToValueAtTime(.001,e+.2),n.connect(i).connect(this.ctx.destination),n.start(e),n.stop(e+.2);break}case"chaching":{[0,.08,.16].forEach((n,i)=>{const a=this.ctx.createOscillator(),o=this.ctx.createGain();a.type="triangle",a.frequency.setValueAtTime([1200,1600,2e3][i],e+n),o.gain.setValueAtTime(.12,e+n),o.gain.exponentialRampToValueAtTime(.001,e+n+.15),a.connect(o).connect(this.ctx.destination),a.start(e+n),a.stop(e+n+.15)});break}case"error":{const n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sawtooth",n.frequency.setValueAtTime(150,e),n.frequency.linearRampToValueAtTime(80,e+.25),i.gain.setValueAtTime(.08,e),i.gain.linearRampToValueAtTime(0,e+.3),n.connect(i).connect(this.ctx.destination),n.start(e),n.stop(e+.3);break}case"coin":{[0,.06].forEach((n,i)=>{const a=this.ctx.createOscillator(),o=this.ctx.createGain();a.type="sine",a.frequency.setValueAtTime([1400,1800][i],e+n),o.gain.setValueAtTime(.1,e+n),o.gain.exponentialRampToValueAtTime(.001,e+n+.12),a.connect(o).connect(this.ctx.destination),a.start(e+n),a.stop(e+n+.12)});break}case"bridge":{const n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(300,e),n.frequency.linearRampToValueAtTime(500,e+.3),i.gain.setValueAtTime(.1,e),i.gain.exponentialRampToValueAtTime(.001,e+.35),n.connect(i).connect(this.ctx.destination),n.start(e),n.stop(e+.35);break}}}catch{}}};function x(t="light"){if(navigator.vibrate)try{switch(t){case"light":navigator.vibrate(10);break;case"medium":navigator.vibrate(25);break;case"heavy":navigator.vibrate([15,30,15]);break;case"error":navigator.vibrate([40,20,40]);break}}catch{}}function we(t){const e=document.getElementById("buffer-fund-container");if(e){if(t<=0){e.innerHTML="";return}e.innerHTML=`
    <div class="card-green-glow rounded-2xl p-4 relative overflow-hidden animate-fade-in">
      <div class="shimmer-bg" style="position:absolute; inset:0; pointer-events:none; border-radius:16px;"></div>
      <div style="position:relative; display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="animate-float" style="width:44px; height:44px; border-radius:16px; display:flex;
                 align-items:center; justify-content:center; font-size:24px;
                 background:rgba(88,204,2,0.15);">🐷</div>
          <div>
            <div class="font-display" style="font-size:15px; color:#2e2e2e;">Savings Fund</div>
            <div style="font-size:11px; font-weight:700; color:#58cc02;">50% of yesterday's leftover ✓</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="font-nums" style="font-size:20px; color:#58cc02;">${p(t)}</div>
          <div style="font-size:10px; font-weight:700; color:#58cc02; opacity:0.7;">spendable</div>
        </div>
      </div>
    </div>`}}function Le(t){const e=document.getElementById("emergency-vault-container");if(!e)return;if(t<=0){e.innerHTML="";return}e.innerHTML=`
    <div class="rounded-2xl p-4 relative overflow-hidden animate-fade-in"
         style="background:linear-gradient(145deg,#1a1040,#2d1b69,#3d2580);
                border:1px solid rgba(255,215,0,0.2); box-shadow:0 8px 32px rgba(45,27,105,0.4);">
      <div class="shimmer-bg" style="position:absolute; inset:0; pointer-events:none; border-radius:16px; opacity:0.3;"></div>
      <div style="position:relative; display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:44px; height:44px; border-radius:16px; display:flex;
                 align-items:center; justify-content:center; font-size:24px;
                 background:rgba(255,215,0,0.15);">🏦</div>
          <div>
            <div class="font-display" style="font-size:15px; color:#ffd700;">Emergency Vault</div>
            <div style="font-size:11px; font-weight:700; color:rgba(255,215,0,0.7);">Auto-Saved • Locked & protected 🔒</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="font-nums" style="font-size:20px; color:#ffd700;">${p(t)}</div>
          <div style="font-size:10px; font-weight:700; color:rgba(255,215,0,0.6);">secured</div>
        </div>
      </div>
      <button id="vault-withdraw-btn" class="btn-squishy" style="width:100%; margin-top:12px; padding:10px 16px;
              border-radius:12px; font-size:12px; font-weight:700; background:rgba(255,215,0,0.12);
              border:1.5px solid rgba(255,215,0,0.3); color:#ffd700; cursor:pointer;">
        🚨 Break Glass — Withdraw
      </button>
    </div>`;const n=document.getElementById("vault-withdraw-btn");n&&(n.onclick=()=>{document.getElementById("breakglass-amount").value="",document.getElementById("breakglass-reason").value="",P("modal-breakglass")})}function Te(){const t=document.getElementById("utang-status-container");if(!t)return;const e=s.utangLedger.filter(a=>!a.isPaid),n=s.utangLedger.filter(a=>a.isPaid);if(e.length===0&&n.length===0){t.innerHTML="";return}const i=e.reduce((a,o)=>a+o.amount,0);t.innerHTML=`
    <div class="rounded-2xl p-4 animate-fade-in"
         style="background:linear-gradient(135deg,#fff8f0,#fff0e0); border:2px solid #ffc80022;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:20px;">📝</span>
          <span class="font-display" style="font-size:15px; color:#2e2e2e;">Advances / Loans</span>
        </div>
        <span style="font-size:11px; font-weight:700; border-radius:9999px; padding:4px 12px;
               background:${e.length>0?"rgba(255,75,75,0.1)":"rgba(88,204,2,0.15)"};
               color:${e.length>0?"#ff4b4b":"#58cc02"}; border:1px solid ${e.length>0?"#ff4b4b22":"#58cc0222"};">
          ${e.length>0?`${e.length} active`:"✓ All cleared!"}
        </span>
      </div>
      ${e.length>0?`
        <div class="font-nums" style="font-size:20px; color:#ff4b4b; margin-bottom:4px;">${p(i)}</div>
        <div style="font-size:11px; font-weight:600; color:#7a7a7a;">Auto-deducts from your next income 🔄</div>
      `:`<div style="font-size:12px; font-weight:600; color:#58cc02;">You cleared ${n.length} loan${n.length!==1?"s":""}! 🎉</div>`}
    </div>`}function $e(t){const e=document.getElementById("health-warning-container");if(e){if(!t){e.innerHTML="";return}e.innerHTML=`
    <div class="rounded-2xl p-4 animate-fade-in"
         style="background:linear-gradient(135deg,#fff5f0,#ffe8e0); border:2px solid #ff8c4222;">
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="width:44px; height:44px; border-radius:16px; display:flex;
               align-items:center; justify-content:center; font-size:24px;
               background:rgba(255,140,66,0.12);">💪</div>
        <div>
          <div class="font-display" style="font-size:14px; color:#cc5500;">Nutrition Investment Alert</div>
          <div style="font-size:11px; font-weight:700; color:#7a7a7a; margin-top:2px;">
            Your last ${t.meals} meals averaged <b>${t.avgScore}/5</b> nutrition at
            <b>${p(t.avgCost)}</b> each. Your body is your most expensive asset —
            cheap fuel now = costly repairs later. 🩺
          </div>
        </div>
      </div>
    </div>`}}let _=null;function Se(t,e,n){const i=document.getElementById("vault-status-container");if(!i)return;const a=t.filter(d=>d.isPaid).length,o=t.length>0&&a===t.length,r=o?"rgba(88,204,2,0.2)":"rgba(255,255,255,0.1)",l=o?"#58cc02":"#7a7a7a",h=o?"rgba(88,204,2,0.35)":"rgba(255,255,255,0.08)",k=e>0?"#ff6b6b":"#58cc02";i.innerHTML=`
    <div class="card-vault rounded-2xl p-5 animate-fade-in">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:20px;">${o?"🔓":"🔒"}</span>
          <span class="font-display" style="font-size:15px; color:white;">Bills Vault</span>
        </div>
        <span style="font-size:11px; font-weight:700; border-radius:9999px; padding:4px 12px;
               background:${r}; color:${l}; border:1px solid ${h};">
          ${a}/${t.length} paid
        </span>
      </div>
      <div class="font-nums" style="font-size:30px; color:${k};">${p(e)}</div>
      <div style="font-size:12px; font-weight:600; margin-top:2px; margin-bottom:16px; color:#7a7a7a;">
        ${n!==null?`⏰ Next due in ${n} day${n!==1?"s":""}`:"🎉 No upcoming bills"}
      </div>
      ${t.length>0?`<div style="display:flex; flex-direction:column; gap:8px;">
        ${t.map(d=>{const y=d.isPaid?"rgba(88,204,2,0.12)":"rgba(255,255,255,0.06)",u=d.isPaid?"rgba(88,204,2,0.4)":"rgba(255,255,255,0.1)",m=d.isPaid?"#58cc02":"#e0e0e0",E=d.isPaid?"rgba(88,204,2,0.2)":"rgba(255,255,255,0.08)",f=d.isPaid?"text-decoration:line-through; opacity:0.65;":"";return`<button class="btn-squishy vault-bill-btn" data-bill-id="${d.id}"
                  style="width:100%; display:flex; align-items:center; justify-content:space-between;
                         padding:12px 16px; min-height:52px; border-radius:12px; font-weight:600;
                         font-size:13px; text-align:left; cursor:pointer; background:${y};
                         border:1.5px solid ${u}; color:${m};">
            <span style="display:flex; align-items:center; gap:10px;">
              <span style="width:24px; height:24px; border-radius:50%; display:flex;
                           align-items:center; justify-content:center; font-size:13px;
                           background:${E};">${d.isPaid?"✓":"○"}</span>
              <span style="${f}">${X(d.label)}</span>
            </span>
            <span style="display:flex; align-items:center; gap:8px;">
              <span class="font-nums" style="font-size:13px;">${p(d.amount)}</span>
              <span style="font-size:10px; font-weight:700; border-radius:8px; padding:3px 8px;
                           background:rgba(255,255,255,0.08); color:#7a7a7a;">${F(d.dueDate)}</span>
              <span class="bill-edit-icon" data-edit-bill="${d.id}"
                    style="font-size:10px; opacity:0.5; cursor:pointer; padding:2px;">✏️</span>
            </span>
          </button>`}).join("")}
      </div>`:""}
      <div class="bill-action-row">
        <button class="btn-squishy bill-add-btn" id="vault-add-bill-btn">
          + Add New Bill
        </button>
      </div>
    </div>`,i.querySelectorAll(".bill-edit-icon").forEach(d=>{d.addEventListener("click",y=>{y.stopPropagation(),y.preventDefault();const u=s.tier1Bills.find(m=>m.id===d.dataset.editBill);u&&ie(u)})});const v=document.getElementById("vault-add-bill-btn");v&&v.addEventListener("click",d=>{d.stopPropagation(),ie(null)})}function ie(t){_=t?t.id:null;const e=document.getElementById("editbill-title"),n=document.getElementById("editbill-label"),i=document.getElementById("editbill-amount"),a=document.getElementById("editbill-due"),o=document.getElementById("editbill-delete");t?(e.textContent="Edit Bill",n.value=t.label,i.value=(t.amount/100).toFixed(2),a.value=t.dueDate,o.style.display="block"):(e.textContent="Add New Bill",n.value="",i.value="",a.value=B(),o.style.display="none"),P("modal-editbill"),setTimeout(()=>n.focus(),120)}function Ae(){const t=document.getElementById("editbill-label").value.trim(),e=M(document.getElementById("editbill-amount").value),n=document.getElementById("editbill-due").value||B();if(!t){L("editbill-label");return}if(e<=0){L("editbill-amount");return}if(_){const i=s.tier1Bills.find(a=>a.id===_);i&&(i.label=t,i.amount=e,i.dueDate=n),I("📋 Bill updated!")}else s.tier1Bills.push({id:D(),label:t,amount:e,dueDate:n,isPaid:!1}),I("✅ New bill added!");A(s),b.play("pop"),x("light"),g("modal-editbill")}function De(){if(!_)return;const t=s.tier1Bills.find(e=>e.id===_);t&&(t.isPaid&&(s.cashOnHand+=t.amount),s.tier1Bills=s.tier1Bills.filter(e=>e.id!==_),A(s),b.play("pop"),x("medium"),g("modal-editbill"),I("🗑️ Bill deleted"))}function ae(t,e=!1){if(!e){const i=ee(s),a=i.todayState.allowance+i.buffer;if(i.todayState.spent+t.amount>a)return{blocked:!0}}const n={...t,id:D()};return s.transactions.push(n),t.category==="food"&&t.satietyScore&&s.nutritionLog.push({date:t.date,score:t.satietyScore,cost:t.amount}),e||(s.cashOnHand=Math.max(0,s.cashOnHand-t.amount)),A(s),{blocked:!1,txId:n.id}}function Me(t,e){const n={id:D(),amount:t,label:e,date:B()};s.microIncomeLedger.push(n);let i=t;for(const a of s.utangLedger)a.isPaid||i<=0||(i>=a.amount?(i-=a.amount,a.isPaid=!0):(a.amount-=i,i=0));return s.cashOnHand+=i,A(s),{deducted:t-i,credited:i}}function Pe(t,e){s.utangLedger.push({id:D(),amount:t,label:e,date:B(),isPaid:!1}),s.cashOnHand+=t,A(s)}function Ce(t){const e=s.tier1Bills.find(n=>n.id===t);if(!e)return{blocked:!1};if(e.isPaid)e.isPaid=!1,s.cashOnHand+=e.amount;else{if(s.cashOnHand<e.amount)return{blocked:!0,shortfall:e.amount-s.cashOnHand};e.isPaid=!0,s.cashOnHand-=e.amount}return A(s),{blocked:!1}}function Oe(t,e){return t<=0||t>s.emergencyVault?!1:(s.emergencyVault-=t,s.cashOnHand+=t,s.transactions.push({id:D(),date:B(),amount:0,tier:0,category:"vault-withdraw",note:`🚨 Emergency: ${e} (+${p(t)})`,isVaultWithdraw:!0,vaultAmount:t}),A(s),!0)}function _e(t){const e=s.transactions.findIndex(i=>i.id===t);if(e===-1)return;const n=s.transactions[e];if(!n.isVaultWithdraw&&!n.paidViaUtang&&n.tier===2&&(s.cashOnHand+=n.amount),n.paidViaUtang&&n.linkedUtangId){const i=s.utangLedger.findIndex(a=>a.id===n.linkedUtangId);i!==-1&&s.utangLedger.splice(i,1)}if(n.category==="food"&&n.satietyScore){const i=s.nutritionLog.findIndex(a=>a.date===n.date&&a.score===n.satietyScore&&a.cost===n.amount);i!==-1&&s.nutritionLog.splice(i,1)}s.transactions.splice(e,1),A(s)}function ze(){const t=document.getElementById("transactions-container");if(!t)return;const e=[...s.transactions].reverse();if(e.length===0){t.innerHTML="";return}t.innerHTML=`
    <div class="rounded-2xl p-4 animate-fade-in"
         style="background:#fff; border:2px solid #ede8df; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:18px;">📜</span>
          <span class="font-display" style="font-size:14px; color:#2e2e2e;">Recent Transactions</span>
        </div>
        <span style="font-size:10px; font-weight:700; border-radius:9999px; padding:3px 10px;
               background:rgba(28,176,246,0.1); color:#1cb0f6; border:1px solid #1cb0f622;">
          ${e.length} total
        </span>
      </div>
      <div class="transactions-scroll" style="display:flex; flex-direction:column; gap:6px;">
        ${e.map(n=>{var v;const i=n.isVaultWithdraw?"🚨":ue[n.category]||"📦",a=n.isVaultWithdraw?"+":"-",o=n.isVaultWithdraw?"#58cc02":"#ff4b4b",r=n.note?X(n.note):n.category||"expense",l=n.paidViaUtang?'<span style="font-size:9px; font-weight:700; padding:2px 6px; border-radius:6px; background:#ffc80022; color:#8a6d00; margin-left:4px;">lista</span>':"",h=n.satietyScore?`<span style="font-size:9px; font-weight:700; padding:2px 6px; border-radius:6px; background:#ffc80022; color:#8a6d00; margin-left:4px;">${((v=ce.find(d=>d.value===n.satietyScore))==null?void 0:v.emoji)||""}</span>`:"",k=!n.isVaultWithdraw;return`<div class="tx-item">
            <div style="display:flex; align-items:center; gap:10px; min-width:0; flex:1;">
              <span style="font-size:18px; flex-shrink:0;">${i}</span>
              <div style="min-width:0;">
                <div style="font-size:12px; font-weight:700; color:#2e2e2e; white-space:nowrap;
                     overflow:hidden; text-overflow:ellipsis; max-width:160px;">${r}${l}${h}</div>
                <div style="font-size:10px; font-weight:600; color:#7a7a7a;">${F(n.date)}</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
              <span class="font-nums" style="font-size:13px; color:${o};">${a}${n.isVaultWithdraw?p(n.vaultAmount):p(n.amount)}</span>
              ${k?`<button class="tx-undo-btn" data-undo-tx="${n.id}" title="Undo">↩</button>`:""}
            </div>
          </div>`}).join("")}
      </div>
    </div>`,t.addEventListener("click",function n(i){const a=i.target.closest("[data-undo-tx]");if(!a)return;const o=a.dataset.undoTx;a.classList.contains("confirming")?(_e(o),b.play("pop"),x("light"),I("↩ Transaction undone — cash refunded!"),T(),t.removeEventListener("click",n)):(a.classList.add("confirming"),a.innerHTML="Sure?",b.play("pop"),x("light"),setTimeout(()=>{a&&a.classList.contains("confirming")&&(a.classList.remove("confirming"),a.innerHTML="↩")},3e3))})}function T(){const t=ee(s);if(He(t),qe(t.todayState),we(t.buffer),Le(t.emergencyVault),Te(),Se(s.tier1Bills,t.unpaidBillsTotal,t.nextBillDays),$e(t.healthWarning),Ve(t),ze(),!s.hasSeenCashTip){const e=document.getElementById("add-cash-tooltip");e&&(e.style.display="block",setTimeout(()=>{e.style.display="none",s.hasSeenCashTip=!0,A(s)},8e3))}}function He(t){const e=document.getElementById("deficit-alert");if(!e)return;if(!t.isDeficit){e.style.display="none";return}e.style.display="block";const n=Math.abs(t.availableCash);e.innerHTML=`
    <div class="rounded-2xl p-4 relative overflow-hidden animate-shake"
         style="background:linear-gradient(135deg,#fff8e0,#fff0e0);
                border:2px solid #ffc800; box-shadow:0 6px 20px rgba(255,200,0,0.2);">
      <div style="position:absolute; top:-24px; right:-24px; width:80px; height:80px;
                  border-radius:50%; background:#ffc800; opacity:0.1;"></div>
      <div style="position:relative; display:flex; align-items:center; gap:12px;">
        <div class="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
             style="background:rgba(255,200,0,0.15);">🛡️</div>
        <div style="flex:1;">
          <div class="font-display" style="font-size:14px; color:#8a6d00;">Need a Bridge?</div>
          <div style="font-size:10px; font-weight:700; color:#8a6d00; opacity:0.7; margin-top:1px;">Borrow now, auto-pay later</div>
          <div style="font-size:11px; font-weight:700; color:#7a7a7a; margin-top:2px;">
          You're ${n>0?`₱${(n/100).toFixed(0)} short for bills.`:"out of daily budget."} Activate the bridge to keep moving forward.
        </div>
        </div>
        <button id="trigger-crisis-btn" class="btn-squishy px-4 py-2 rounded-xl text-xs font-bold text-white"
                style="background:linear-gradient(135deg,#ffc800,#e0a000); box-shadow:0 3px 0 #c89000; white-space:nowrap;">
          Bridge It 🌉
        </button>
      </div>
    </div>`;const i=document.getElementById("trigger-crisis-btn");i&&(i.onclick=()=>{document.getElementById("utang-amount").value=(n/100).toFixed(2),P("modal-crisis")})}function Ve(t){const e=document.getElementById("cash-status-container");if(!e)return;const n=s.nextIncomeDate?F(s.nextIncomeDate):"—";e.innerHTML=`
    <div class="rounded-2xl p-4 animate-fade-in"
         style="background:linear-gradient(135deg,#e8f6ff,#d4efff); border:2px solid #1cb0f622;">
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:22px;">💰</span>
          <div>
            <div style="font-size:11px; font-weight:700; color:#1899d6;">CASH ON HAND</div>
            <div class="font-nums" style="font-size:20px; color:#1cb0f6;">${p(s.cashOnHand)}</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:10px; font-weight:700; color:#7a7a7a;">NEXT INCOME</div>
          <div style="font-size:13px; font-weight:700; color:#2e2e2e;">${n}</div>
          <div style="font-size:10px; font-weight:600; color:#7a7a7a;">${t.daysToNext} day${t.daysToNext!==1?"s":""} left</div>
        </div>
      </div>
    </div>`}function qe({allowance:t,spent:e,rollover:n}){const i=t+n,a=i-e,o=i>0?Math.min(e/i,1):e>0?1:0,r=a<0,l=!r&&o>.8,h=74,k=2*Math.PI*h,v=k*(1-o),d=r?"#ff4b4b":l?"#ffc800":"#58cc02",y=r?"gradRed":l?"gradYellow":"gradGreen",u=r?"#fff0f0":l?"#fff8e0":"#e8ffe8",m=r?"😰 over budget":l?"⚠️ almost gone":"✨ left today",E=document.getElementById("budget-ring-container");if(!E)return;E.innerHTML=`
    <div style="position:relative; filter:drop-shadow(0 8px 24px ${d}44);">
      <svg width="210" height="210" viewBox="0 0 210 210" aria-hidden="true">
        <defs>
          <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#78e820"/><stop offset="100%" stop-color="#46a302"/>
          </linearGradient>
          <linearGradient id="gradYellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffd940"/><stop offset="100%" stop-color="#e0a000"/>
          </linearGradient>
          <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff7070"/><stop offset="100%" stop-color="#cc1c1c"/>
          </linearGradient>
        </defs>
        <circle cx="105" cy="105" r="${h}" fill="none" stroke="#ede8df" stroke-width="16" stroke-linecap="round"/>
        ${o>0?`
          <circle cx="105" cy="105" r="${h}" fill="none" stroke="${d}"
                  stroke-width="16" stroke-linecap="round" stroke-dasharray="${k.toFixed(4)}"
                  stroke-dashoffset="${v.toFixed(4)}" transform="rotate(-90 105 105)" opacity="0.15"/>
          <circle class="ring-progress" cx="105" cy="105" r="${h}" fill="none" stroke="url(#${y})"
                  stroke-width="16" stroke-linecap="round" stroke-dasharray="${k.toFixed(4)}"
                  stroke-dashoffset="${v.toFixed(4)}" transform="rotate(-90 105 105)"/>
          <text x="105" y="21" text-anchor="middle" font-size="11" font-weight="800"
                font-family="Nunito" fill="${d}" opacity="0.85">${Math.round(o*100)}% used</text>
        `:""}
      </svg>
      <div style="position:absolute; inset:0; display:flex; flex-direction:column;
                  align-items:center; justify-content:center; gap:4px; pointer-events:none;">
        <span class="font-nums" style="font-size:2.1rem; line-height:1;
              color:${r?"#ff4b4b":"#2e2e2e"};">${p(Math.abs(a))}</span>
        <span class="font-display" style="font-size:13px; margin-top:4px; padding:3px 14px;
                     border-radius:9999px; color:${d}; background:${u};">${m}</span>
      </div>
    </div>
    <div style="display:flex; gap:10px; margin-top:10px; width:100%; max-width:310px;">
      ${U("Spent",p(e),"#ff4b4b","#fff0f0")}
      ${U("Budget",p(i),"#1cb0f6","#e8f6ff")}
      ${n>0?U("Leftover","+"+p(n),"#58cc02","#e8ffe8"):""}
    </div>`;const f=E.querySelector(".ring-progress");f&&(f.classList.remove("ring-animated"),f.offsetWidth,f.classList.add("ring-animated"))}function U(t,e,n,i){return`<div style="flex:1; border-radius:16px; padding:10px 12px; text-align:center;
                background:${i}; border:1.5px solid ${n}22;">
      <div class="font-nums" style="font-size:14px; line-height:1.3; color:${n};">${e}</div>
      <div style="font-size:10px; font-weight:700; margin-top:2px; color:#7a7a7a;">${t}</div>
    </div>`}let $=[];function H(t){[1,2,3].forEach(e=>{const n=document.getElementById(`setup-step-${e}`);n&&(n.style.display=e===t?"block":"none")}),document.querySelectorAll(".setup-step-dot").forEach((e,n)=>{const i=n+1;e.classList.toggle("active",i===t),e.classList.toggle("done",i<t)})}function N(){const t=document.getElementById("bills-list");if(t){if($.length===0){t.innerHTML='<p class="text-center text-sm py-3" style="color:#7a7a7a">No bills added yet — tap below to add one</p>';return}t.innerHTML=$.map((e,n)=>`
    <div class="flex items-center justify-between rounded-xl px-4 py-3 animate-fade-in"
         style="background:#f7f4f0; border:2px solid #ede8df;">
      <div>
        <div class="text-sm font-bold" style="color:#2e2e2e">${X(e.label)}</div>
        <div style="font-size:11px; font-weight:600; color:#7a7a7a">${F(e.dueDate)}</div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="font-nums text-sm" style="color:#ff4b4b;">${p(e.amount)}</span>
        <button class="btn-squishy w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style="background:#fff0f0; color:#ff4b4b;"
                data-remove-bill="${n}" aria-label="Remove bill">✕</button>
      </div>
    </div>`).join("")}}function je(){const t=M(document.getElementById("income-input").value),e=document.getElementById("next-income-date").value||"",n=$.reduce((h,k)=>h+k.amount,0),i=e?Q(B(),e):30,o=(t-n)/Math.max(1,i),r=o<=0,l=document.getElementById("setup-summary");l&&(l.innerHTML=`
    <div class="space-y-3">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="text-sm font-bold" style="color:#7a7a7a;">Initial Funds</span>
        <span class="font-nums text-sm" style="color:#1cb0f6;">${p(t)}</span>
      </div>
      ${$.length>0?`
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="text-sm font-bold" style="color:#7a7a7a;">Total Bills</span>
        <span class="font-nums text-sm" style="color:#ff4b4b;">−${p(n)}</span>
      </div>`:""}
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="text-sm font-bold" style="color:#7a7a7a;">Days Until Next Income</span>
        <span class="font-nums text-sm" style="color:#7a7a7a;">${i} days</span>
      </div>
      <div style="height:1px; background:#ede8df;"></div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="font-bold" style="font-size:13px; color:#7a7a7a;">Daily Budget</span>
        <span class="font-nums" style="font-size:22px; font-weight:900; color:${r?"#ff4b4b":"#58cc02"};">
          ${r?"😟 Over Budget!":p(Math.max(0,o))}
        </span>
      </div>
      <div class="text-xs font-semibold text-center" style="color:#7a7a7a;">
        ${$.length} bill${$.length!==1?"s":""} tracked •
        ${r?"Consider an Advance to bridge the gap 🛡️":`${p(Math.max(0,o))}/day for ${i} days`}
      </div>
    </div>`)}let C="",z=0,te=!1;function Ne(t){C=t}function oe(t){z=t}function Fe(t){te=t}function Re(){document.getElementById("tx-amount").value="",document.getElementById("tx-note").value="",C=s.tier2Config.categories[0]||"food",z=0,te=!1,S("blocked-warning");const t=document.getElementById("tx-lista-check");t&&(t.checked=!1);const e=document.getElementById("tx-lista-toggle");e&&e.classList.remove("lista-toggle-active"),ye(),W(),pe(),P("modal-quickadd"),setTimeout(()=>document.getElementById("tx-amount").focus(),120)}function pe(){const t=document.getElementById("tx-note");t&&(C==="food"?t.placeholder="e.g. rice + egg 🍳":C==="transport"?t.placeholder="e.g. Jeepney or LRT 🚌":t.placeholder="e.g. describe your expense")}function ye(){const t=document.getElementById("category-btns");t&&(t.innerHTML=s.tier2Config.categories.map(e=>{const n=C===e;return`<button type="button" class="btn-squishy tx-cat-btn" data-cat="${e}"
              style="flex:1; padding:12px 8px; font-size:14px; font-weight:700;
                     border-radius:16px; min-height:52px; text-transform:capitalize;
                     background:${n?"#1cb0f6":"#f7f4f0"};
                     color:${n?"#ffffff":"#7a7a7a"};
                     border:2px solid ${n?"#1899d6":"#ede8df"};
                     box-shadow:${n?"0 4px 0 #1899d6":"none"};">
        ${ue[e]||"📦"} ${e}
      </button>`}).join(""))}function W(){const t=document.getElementById("nutrition-section"),e=document.getElementById("nutrition-btns");!t||!e||(t.style.display=C==="food"?"block":"none",e.innerHTML=ce.map(n=>{const i=z===n.value;return`<button type="button" class="btn-squishy tx-nut-btn" data-nut="${n.value}"
              style="flex:1; padding:8px 4px; font-size:11px; font-weight:700;
                     border-radius:16px; min-height:52px; line-height:1.4;
                     background:${i?"#ffc800":"#f7f4f0"};
                     color:${i?"#2e2e2e":"#7a7a7a"};
                     border:2px solid ${i?"#e0b000":"#ede8df"};
                     box-shadow:${i?"0 3px 0 #e0b000":"none"};">
        ${n.emoji}<br>${n.label}
      </button>`}).join(""))}function q(){const t=document.getElementById("confetti-canvas");if(!t)return;t.width=window.innerWidth,t.height=window.innerHeight;const e=t.getContext("2d");if(!e)return;const n=["#58cc02","#ffc800","#1cb0f6","#ff4b4b","#ff9600","#ce82ff","#78e820"],i=[];for(let r=0;r<80;r++)i.push({x:t.width/2+(Math.random()-.5)*200,y:t.height*.4,vx:(Math.random()-.5)*12,vy:-Math.random()*14-4,w:Math.random()*8+4,h:Math.random()*6+2,color:n[Math.floor(Math.random()*n.length)],rotation:Math.random()*360,rotSpeed:(Math.random()-.5)*12,gravity:.18+Math.random()*.08,opacity:1,decay:.008+Math.random()*.008});let a;function o(){e.clearRect(0,0,t.width,t.height);let r=!1;for(const l of i)l.opacity<=0||(r=!0,l.x+=l.vx,l.vy+=l.gravity,l.y+=l.vy,l.vx*=.99,l.rotation+=l.rotSpeed,l.opacity-=l.decay,e.save(),e.translate(l.x,l.y),e.rotate(l.rotation*Math.PI/180),e.globalAlpha=Math.max(0,l.opacity),e.fillStyle=l.color,e.fillRect(-l.w/2,-l.h/2,l.w,l.h),e.restore());r?a=requestAnimationFrame(o):(cancelAnimationFrame(a),e.clearRect(0,0,t.width,t.height))}o()}const se="pocket-auth-v1",c={_state:null,_pendingAction:null,_otpTimer:null,_mockOTPCode:"123456",_loadAuth(){if(this._state)return this._state;try{const t=localStorage.getItem(se);this._state=t?JSON.parse(t):{isLoggedIn:!1,token:null,user:null,nudgeDismissed:!1}}catch{this._state={isLoggedIn:!1,token:null,user:null,nudgeDismissed:!1}}return this._state},_saveAuth(){try{localStorage.setItem(se,JSON.stringify(this._state))}catch{}},isLoggedIn(){return this._loadAuth().isLoggedIn===!0},getUser(){return this._loadAuth().user},logout(){this._state={isLoggedIn:!1,token:null,user:null,nudgeDismissed:!1},this._saveAuth()},sendOTP(t){return new Promise(e=>{setTimeout(()=>{this._mockOTPCode=String(Math.floor(1e5+Math.random()*9e5)),console.log(`%c[Auth Mock] OTP code: ${this._mockOTPCode}`,"color:#58cc02; font-weight:bold;"),e({success:!0,message:`Code sent to ${t}`})},1200)})},verifyOTP(t){return new Promise(e=>{setTimeout(()=>{var n;if(t===this._mockOTPCode){const i="mock_token_"+Date.now(),a={id:D(),name:"Pocket User",identifier:((n=document.getElementById("auth-identifier"))==null?void 0:n.value)||"user@email.com",provider:"otp",avatarEmoji:"👤"};this._state={isLoggedIn:!0,token:i,user:a,nudgeDismissed:!0},this._saveAuth(),e({success:!0,token:i,user:a})}else e({success:!1,message:"Invalid verification code"})},800)})},socialLogin(t){return new Promise(e=>{setTimeout(()=>{const n=`mock_${t}_token_`+Date.now(),i={id:D(),name:"Pocket User",identifier:`user@${t}.com`,provider:t,avatarEmoji:t==="google"?"🔵":t==="apple"?"⚫":"🔷"};this._state={isLoggedIn:!0,token:n,user:i,nudgeDismissed:!0},this._saveAuth(),e({success:!0,token:n,user:i})},1500)})},initCaptcha(){return console.log("[Auth Mock] Captcha initialized (invisible — no user interaction needed)"),Promise.resolve({token:"captcha_mock_token"})}};function Y(){j(1),document.getElementById("auth-identifier").value="",ne(),S("otp-error"),P("modal-auth"),setTimeout(()=>{var t;return(t=document.getElementById("auth-identifier"))==null?void 0:t.focus()},200)}function j(t){[1,2,3].forEach(e=>{const n=document.getElementById(`auth-step-${e}`);n&&(n.style.display=e===t?"block":"none")}),document.querySelectorAll(".auth-step-dot").forEach((e,n)=>{const i=n+1;e.classList.toggle("active",i===t),e.classList.toggle("done",i<t)})}function ne(){document.querySelectorAll(".auth-otp-digit").forEach(t=>{t.value="",t.classList.remove("filled","error")})}function he(){return Array.from(document.querySelectorAll(".auth-otp-digit")).map(t=>t.value).join("")}function ve(){let t=60;const e=document.getElementById("otp-timer"),n=document.getElementById("otp-countdown"),i=document.getElementById("otp-resend");e&&(e.style.display="block"),i&&(i.style.display="none"),n&&(n.textContent=t),c._otpTimer&&clearInterval(c._otpTimer),c._otpTimer=setInterval(()=>{t--,n&&(n.textContent=t),t<=0&&(clearInterval(c._otpTimer),c._otpTimer=null,e&&(e.style.display="none"),i&&(i.style.display="inline-block"))},1e3)}async function le(){var i;const t=(i=document.getElementById("auth-identifier"))==null?void 0:i.value.trim();if(!t){L("auth-identifier");return}const e=document.getElementById("auth-send-otp"),n=e.innerHTML;e.innerHTML='<span class="auth-spinner"></span> Sending...',e.disabled=!0;try{await c.initCaptcha(),(await c.sendOTP(t)).success&&(b.play("coin"),x("medium"),document.getElementById("auth-sent-to").textContent=t,j(2),ve(),ne(),setTimeout(()=>{var o;return(o=document.querySelector(".auth-otp-digit"))==null?void 0:o.focus()},200))}catch{I("❌ Failed to send code. Please try again.")}finally{e.innerHTML=n,e.disabled=!1}}async function G(){const t=he();if(t.length<6){document.querySelectorAll(".auth-otp-digit").forEach(i=>{i.value||i.classList.add("error")}),b.play("error"),x("error");return}const e=document.getElementById("auth-verify-otp"),n=e.innerHTML;e.innerHTML='<span class="auth-spinner"></span> Verifying...',e.disabled=!0;try{const i=await c.verifyOTP(t);i.success?(b.play("chaching"),x("heavy"),q(),S("otp-error"),document.getElementById("auth-display-name").textContent=i.user.name,document.getElementById("auth-display-id").textContent=i.user.identifier,j(3),S("auth-nudge-banner"),c._otpTimer&&(clearInterval(c._otpTimer),c._otpTimer=null)):(Z("otp-error"),document.querySelectorAll(".auth-otp-digit").forEach(a=>a.classList.add("error")),b.play("error"),x("error"),setTimeout(()=>{document.querySelectorAll(".auth-otp-digit").forEach(a=>a.classList.remove("error")),S("otp-error")},2500))}catch{I("❌ Verification failed. Try again.")}finally{e.innerHTML=n,e.disabled=!1}}async function Ue(t){const e=document.querySelector(`[data-provider="${t}"]`);if(!e)return;const n=e.innerHTML;e.innerHTML='<span class="auth-spinner"></span> Connecting...',e.disabled=!0;try{await c.initCaptcha();const i=await c.socialLogin(t);i.success&&(b.play("chaching"),x("heavy"),q(),document.getElementById("auth-display-name").textContent=i.user.name,document.getElementById("auth-display-id").textContent=i.user.identifier,j(3),S("auth-nudge-banner"))}catch{I("❌ Connection failed. Please try again.")}finally{e.innerHTML=n,e.disabled=!1}}function Ge(){const t=c._loadAuth();if(t.isLoggedIn||t.nudgeDismissed||!s.setupDate)return;const e=new Date(s.setupDate+"T00:00:00").getTime();(Date.now()-e)/864e5>=3&&Z("auth-nudge-banner")}function We(){S("auth-nudge-banner");const t=c._loadAuth();t.nudgeDismissed=!0,c._saveAuth()}function Ye(){var t,e,n,i,a,o,r,l,h,k,v;(t=document.getElementById("auth-close"))==null||t.addEventListener("click",()=>{g("modal-auth"),c._otpTimer&&(clearInterval(c._otpTimer),c._otpTimer=null)}),(e=document.getElementById("modal-auth"))==null||e.addEventListener("click",d=>{d.target===document.getElementById("modal-auth")&&(g("modal-auth"),c._otpTimer&&(clearInterval(c._otpTimer),c._otpTimer=null))}),(n=document.getElementById("cloud-sync-btn"))==null||n.addEventListener("click",()=>{g("modal-settings"),c.isLoggedIn()?I("☁️ Already synced! Your data is backed up."):(c._pendingAction="sync",Y())}),(i=document.getElementById("nudge-dismiss"))==null||i.addEventListener("click",We),(a=document.getElementById("nudge-signin-btn"))==null||a.addEventListener("click",()=>{S("auth-nudge-banner"),Y()}),document.querySelectorAll(".auth-social-btn").forEach(d=>{d.addEventListener("click",()=>{const y=d.dataset.provider;y&&Ue(y)})}),(o=document.getElementById("auth-send-otp"))==null||o.addEventListener("click",le),(r=document.getElementById("auth-identifier"))==null||r.addEventListener("keydown",d=>{d.key==="Enter"&&le()}),document.querySelectorAll(".auth-otp-digit").forEach((d,y,u)=>{d.addEventListener("input",m=>{const E=m.target.value.replace(/[^0-9]/g,"");m.target.value=E.slice(0,1),E?(m.target.classList.add("filled"),m.target.classList.remove("error"),b.play("pop"),y<u.length-1&&u[y+1].focus(),he().length===6&&setTimeout(()=>G(),200)):m.target.classList.remove("filled")}),d.addEventListener("keydown",m=>{m.key==="Backspace"&&!m.target.value&&y>0&&(u[y-1].focus(),u[y-1].value="",u[y-1].classList.remove("filled"))}),d.addEventListener("paste",m=>{var f;m.preventDefault();const E=(((f=m.clipboardData)==null?void 0:f.getData("text"))||"").replace(/[^0-9]/g,"").slice(0,6);E.split("").forEach((w,R)=>{u[R]&&(u[R].value=w,u[R].classList.add("filled"))}),E.length===6?(u[5].focus(),setTimeout(()=>G(),300)):E.length>0&&(u[E.length]||u[E.length-1]).focus()})}),(l=document.getElementById("auth-verify-otp"))==null||l.addEventListener("click",G),(h=document.getElementById("otp-resend"))==null||h.addEventListener("click",()=>{var y;const d=(y=document.getElementById("auth-sent-to"))==null?void 0:y.textContent;d&&c.sendOTP(d).then(()=>{var u;ve(),ne(),I("🔑 New code sent!"),(u=document.querySelector(".auth-otp-digit"))==null||u.focus()})}),(k=document.getElementById("auth-back-to-step1"))==null||k.addEventListener("click",()=>{j(1),c._otpTimer&&(clearInterval(c._otpTimer),c._otpTimer=null)}),(v=document.getElementById("auth-done"))==null||v.addEventListener("click",()=>{g("modal-auth"),c._pendingAction==="export"?(me(),I("📤 Data exported successfully!")):c._pendingAction==="sync"&&I("☁️ Cloud sync activated! Your data is safe."),c._pendingAction=null}),ge("auth-identifier")}function Je(){document.getElementById("btn-get-started").addEventListener("click",()=>{$.length=0,V("view-setup"),H(1),N()}),document.getElementById("step1-next").addEventListener("click",()=>{if(M(document.getElementById("income-input").value)<=0){L("income-input");return}if(!document.getElementById("next-income-date").value){L("next-income-date");return}H(2),N()}),document.getElementById("income-input").addEventListener("keydown",e=>{e.key==="Enter"&&document.getElementById("step1-next").click()}),document.getElementById("step2-back").addEventListener("click",()=>H(1)),document.getElementById("add-bill-btn").addEventListener("click",()=>{Z("add-bill-form"),document.getElementById("bill-label").focus(),document.getElementById("bill-due").value||(document.getElementById("bill-due").value=B())}),document.getElementById("bill-cancel").addEventListener("click",()=>{S("add-bill-form"),be()}),document.getElementById("bill-save").addEventListener("click",de),document.getElementById("bill-due").addEventListener("keydown",e=>{e.key==="Enter"&&de()}),document.getElementById("bills-list").addEventListener("click",e=>{const n=e.target.closest("[data-remove-bill]");n&&($.splice(parseInt(n.dataset.removeBill,10),1),N())}),document.getElementById("step2-next").addEventListener("click",()=>{S("add-bill-form"),H(3),je()}),document.getElementById("step3-back").addEventListener("click",()=>H(2)),document.getElementById("finish-setup").addEventListener("click",()=>{const e=M(document.getElementById("income-input").value),n=document.getElementById("next-income-date").value||null;fe({...O,isSetupComplete:!0,cashOnHand:e,nextIncomeDate:n,microIncomeLedger:[{id:D(),amount:e,label:"Initial funds",date:B()}],tier1Bills:$.map(i=>({...i})),tier2Config:{categories:["food","transport"]},setupDate:B(),lastProcessedDate:B()}),A(s),$.length=0,V("view-dashboard"),T()}),document.getElementById("fab-add").addEventListener("click",Re),document.getElementById("modal-close").addEventListener("click",()=>g("modal-quickadd")),document.getElementById("modal-quickadd").addEventListener("click",e=>{e.target===document.getElementById("modal-quickadd")&&g("modal-quickadd")}),document.getElementById("category-btns").addEventListener("click",e=>{const n=e.target.closest(".tx-cat-btn");n&&(Ne(n.dataset.cat),oe(0),ye(),W(),pe())}),document.getElementById("nutrition-btns").addEventListener("click",e=>{const n=e.target.closest(".tx-nut-btn");if(!n)return;const i=parseInt(n.dataset.nut,10);oe(z===i?0:i),W()}),document.getElementById("tx-submit").addEventListener("click",re),document.getElementById("tx-amount").addEventListener("keydown",e=>{e.key==="Enter"&&re()}),document.getElementById("vault-status-container").addEventListener("click",e=>{const n=e.target.closest(".vault-bill-btn");if(!n)return;const i=s.tier1Bills.find(r=>r.id===n.dataset.billId),a=i?i.isPaid:!1,o=Ce(n.dataset.billId);if(o.blocked){b.play("error"),x("error"),I(`⚠️ Not enough cash! You're ₱${(o.shortfall/100).toFixed(0)} short.`),document.getElementById("utang-amount").value=(o.shortfall/100).toFixed(2),document.getElementById("utang-label").value=`Bridge for: ${i.label}`,P("modal-crisis");return}a?x("light"):(b.play("chaching"),x("heavy"),q()),T()});const t=document.querySelector("#utang-lista-section label");t&&t.addEventListener("click",e=>{e.preventDefault();const n=document.getElementById("tx-lista-check"),i=document.getElementById("tx-lista-toggle");!n||!i||(n.checked=!n.checked,Fe(n.checked),i.classList.toggle("lista-toggle-active",n.checked))}),document.getElementById("settings-btn").addEventListener("click",()=>P("modal-settings")),document.getElementById("settings-close").addEventListener("click",()=>g("modal-settings")),document.getElementById("modal-settings").addEventListener("click",e=>{e.target===document.getElementById("modal-settings")&&g("modal-settings")}),document.getElementById("export-btn").addEventListener("click",()=>{c.isLoggedIn()?(me(),g("modal-settings")):(c._pendingAction="export",g("modal-settings"),Y())}),document.getElementById("reset-app-btn").addEventListener("click",()=>{confirm("⚠️  This will permanently delete ALL your data. Are you sure?")&&(Ee(),g("modal-settings"),V("view-welcome"))}),document.getElementById("add-funds-btn").addEventListener("click",()=>{const e=document.getElementById("add-cash-tooltip");e&&(e.style.display="none"),s.hasSeenCashTip=!0,A(s),P("modal-addfunds")}),document.getElementById("addfunds-close").addEventListener("click",()=>g("modal-addfunds")),document.getElementById("modal-addfunds").addEventListener("click",e=>{e.target===document.getElementById("modal-addfunds")&&g("modal-addfunds")}),document.getElementById("addfunds-submit").addEventListener("click",Ke),document.getElementById("crisis-close").addEventListener("click",()=>g("modal-crisis")),document.getElementById("modal-crisis").addEventListener("click",e=>{e.target===document.getElementById("modal-crisis")&&g("modal-crisis")}),document.getElementById("utang-submit").addEventListener("click",Xe),document.getElementById("breakglass-close").addEventListener("click",()=>g("modal-breakglass")),document.getElementById("modal-breakglass").addEventListener("click",e=>{e.target===document.getElementById("modal-breakglass")&&g("modal-breakglass")}),document.getElementById("breakglass-submit").addEventListener("click",Qe),document.getElementById("editbill-close").addEventListener("click",()=>g("modal-editbill")),document.getElementById("modal-editbill").addEventListener("click",e=>{e.target===document.getElementById("modal-editbill")&&g("modal-editbill")}),document.getElementById("editbill-save").addEventListener("click",()=>{Ae(),T()}),document.getElementById("editbill-delete").addEventListener("click",()=>{confirm("Delete this bill? This cannot be undone.")&&(De(),T())}),["income-input","next-income-date","bill-label","bill-amount","bill-due","tx-amount","tx-note","funds-amount","funds-label","utang-amount","utang-label","breakglass-amount","breakglass-reason","editbill-label","editbill-amount","editbill-due"].forEach(e=>ge(e))}function de(){const t=document.getElementById("bill-label").value.trim(),e=M(document.getElementById("bill-amount").value),n=document.getElementById("bill-due").value||B();if(!t){L("bill-label");return}if(e<=0){L("bill-amount");return}$.push({id:D(),label:t,amount:e,dueDate:n,isPaid:!1}),S("add-bill-form"),be(),N()}function be(){document.getElementById("bill-label").value="",document.getElementById("bill-amount").value="",document.getElementById("bill-due").value=""}function re(){const t=M(document.getElementById("tx-amount").value);if(t<=0){L("tx-amount");return}const e=document.getElementById("tx-note").value.trim(),n=te,i={date:B(),amount:t,tier:2,category:C,...z?{satietyScore:z}:{},...e?{note:e}:{},...n?{paidViaUtang:!0}:{}};if(n){const o={id:D(),amount:t,label:e||`Lista: ${C}`,date:B(),isPaid:!1};s.utangLedger.push(o),i.linkedUtangId=o.id,ae(i,!0),b.play("bridge"),x("medium"),g("modal-quickadd"),I("📝 Logged as lista/utang — no cash deducted"),T();return}if(ae(i).blocked){b.play("error"),x("error");const o=document.getElementById("blocked-warning");o.style.display="block",o.classList.remove("animate-shake"),o.offsetWidth,o.classList.add("animate-shake"),setTimeout(()=>{o.style.display="none"},3e3)}else{b.play("pop"),x("light"),g("modal-quickadd");const o=document.getElementById("fab-add");o.classList.add("animate-pop"),setTimeout(()=>o.classList.remove("animate-pop"),400);const r=ee(s);r.todayState.spent<=r.todayState.allowance*.5&&q(),T()}}function Ke(){const t=M(document.getElementById("funds-amount").value);if(t<=0){L("funds-amount");return}const e=document.getElementById("funds-label").value.trim()||"Funds added",n=document.getElementById("next-income-date-update").value;n&&(s.nextIncomeDate=n);const i=Me(t,e);b.play("coin"),x("medium"),g("modal-addfunds"),document.getElementById("funds-amount").value="",document.getElementById("funds-label").value="",i.deducted>0?(I(`💰 +${p(i.credited)} added • ${p(i.deducted)} auto-paid utang ✓`),q()):I(`💰 +${p(i.credited)} added to your funds!`),T()}function Xe(){const t=M(document.getElementById("utang-amount").value);if(t<=0){L("utang-amount");return}const e=document.getElementById("utang-label").value.trim()||"Bridge loan";Pe(t,e),b.play("bridge"),x("medium"),g("modal-crisis"),document.getElementById("utang-amount").value="",document.getElementById("utang-label").value="",I(`🛡️ Bridge activated! ₱${(t/100).toFixed(0)} borrowed. Auto-pays when you add cash.`),T()}function Qe(){const t=M(document.getElementById("breakglass-amount").value),e=document.getElementById("breakglass-reason").value.trim();if(t<=0){L("breakglass-amount");return}if(!e){L("breakglass-reason");return}if(t>s.emergencyVault){I(`⚠️ Maximum available: ${p(s.emergencyVault)}`),L("breakglass-amount");return}Oe(t,e),b.play("coin"),x("heavy"),g("modal-breakglass"),I(`🚨 ${p(t)} withdrawn from Emergency Vault`),T()}document.addEventListener("DOMContentLoaded",()=>{fe(xe()),Je(),Ye();const t=()=>{b._init(),b.ctx&&b.ctx.state==="suspended"&&b.ctx.resume(),document.removeEventListener("pointerdown",t)};document.addEventListener("pointerdown",t,{once:!0}),document.addEventListener("pointerdown",e=>{e.target.closest(".btn-squishy")&&x("light")},{passive:!0}),setTimeout(()=>{s.isSetupComplete?(V("view-dashboard"),T(),Ge()):V("view-welcome")},450)});
