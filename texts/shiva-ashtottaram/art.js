// Original line-art illustration for Sri Shiva Ashtottara Shatanamavali.
// Colours come from CSS variables, so the picture follows light / dark mode.
(function(){
var G = 'var(--art-line)', A = 'var(--art-accent)', S = 'var(--art-soft)', B = 'var(--art-bg)';
function st(w){ return ' fill="none" stroke="'+G+'" stroke-width="'+(w||2.2)+'" stroke-linecap="round" stroke-linejoin="round"'; }

/* ---------- building blocks ---------- */
function moon(x,y,r){ return '<path d="M'+x+' '+(y-r)+' A'+r+' '+r+' 0 1 0 '+x+' '+(y+r)+' A'+(r*0.62)+' '+r+' 0 1 1 '+x+' '+(y-r)+' Z" fill="'+A+'"/>'; }
function sun(x,y,r){ var s='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+A+'"/>';
  for(var i=0;i<12;i++){ var a=i*Math.PI/6, c=Math.cos(a), d=Math.sin(a);
    s+='<line x1="'+(x+c*(r+4))+'" y1="'+(y+d*(r+4))+'" x2="'+(x+c*(r+12))+'" y2="'+(y+d*(r+12))+'" stroke="'+A+'" stroke-width="2.4" stroke-linecap="round"/>'; }
  return s; }
function mountains(y){ return '<path d="M0 '+y+' L48 '+(y-46)+' L78 '+(y-22)+' L120 '+(y-70)+' L162 '+(y-30)+' L200 '+(y-58)+' L246 '+(y-18)+' L282 '+(y-44)+' L320 '+(y-10)+' L320 200 L0 200z" fill="'+S+'" opacity=".55"/>'+
  '<path d="M108 '+(y-58)+' L120 '+(y-70)+' L132 '+(y-56)+'" '+st(2)+'/>'; }
function trishula(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')"'+st(2.4)+'>'+
  '<line x1="0" y1="-40" x2="0" y2="46"/><path d="M-16 -30 Q-16 -6 0 -4 Q16 -6 16 -30"/><path d="M0 -40 l-5 9 M0 -40 l5 9"/>'+
  '<path d="M-16 -30 l-4 7 M16 -30 l4 7"/><circle cx="0" cy="2" r="3" fill="'+A+'" stroke="none"/></g>'; }
function damaru(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')"'+st(2.2)+'>'+
  '<path d="M-14 -16 L14 -16 L2 0 L14 16 L-14 16 L-2 0 Z" fill="'+S+'"/><path d="M-2 0 q-12 6 -16 16 M2 0 q12 -6 16 -14"/>'+
  '<circle cx="-18" cy="17" r="2.5" fill="'+A+'" stroke="none"/><circle cx="18" cy="-15" r="2.5" fill="'+A+'" stroke="none"/></g>'; }
function linga(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')">'+
  '<path d="M-44 20 Q0 34 44 20 L52 26 Q0 44 -52 26 Z" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+
  '<path d="M-30 20 L-30 -18 Q-30 -46 0 -46 Q30 -46 30 -18 L30 20" fill="'+B+'" stroke="'+G+'" stroke-width="2.4"/>'+
  '<path d="M-16 -22 h32 M-16 -16 h32 M-16 -10 h32" stroke="'+A+'" stroke-width="2.4"/><circle cx="0" cy="-16" r="3.4" fill="#c0392b"/>'+
  '<path d="M52 26 Q62 30 66 38" '+st(2)+'/></g>'; }
function bow(x,y,s,unstrung){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')"'+st(2.6)+'>'+
  '<path d="M-10 -48 Q22 0 -10 48"/>'+(unstrung? '<path d="M-10 -48 q-6 20 -2 34" stroke-dasharray="3 4"/>' : '<line x1="-10" y1="-48" x2="-10" y2="48" stroke-width="1.4"/>')+'</g>'; }
function arrow(x1,y1,x2,y2){ var a=Math.atan2(y2-y1,x2-x1), l=9;
  return '<g'+st(2)+'><line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"/>'+
  '<path d="M'+(x2-l*Math.cos(a-0.45))+' '+(y2-l*Math.sin(a-0.45))+' L'+x2+' '+y2+' L'+(x2-l*Math.cos(a+0.45))+' '+(y2-l*Math.sin(a+0.45))+'"/></g>'; }
function quiver(x,y){ return '<g'+st(2)+'><path d="M'+(x-9)+' '+(y-30)+' h18 l-3 52 h-12 z" fill="'+S+'"/>'+
  '<path d="M'+(x-5)+' '+(y-30)+' l-3 -14 M'+x+' '+(y-30)+' v-16 M'+(x+5)+' '+(y-30)+' l3 -14"/></g>'; }
function tree(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')">'+
  '<path d="M0 0 V-34 M0 -18 l-10 -8 M0 -24 l9 -7" '+st(2.4)+'/>'+
  '<circle cx="0" cy="-48" r="20" fill="'+S+'" stroke="'+G+'" stroke-width="2"/><circle cx="-14" cy="-36" r="12" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+
  '<circle cx="14" cy="-38" r="12" fill="'+S+'" stroke="'+G+'" stroke-width="2"/></g>'; }
function cow(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')"'+st(2.2)+'>'+
  '<path d="M-26 -10 Q-26 -22 -10 -22 L18 -22 Q26 -22 28 -14 L34 -16 L36 -8 L30 -6 Q28 4 22 4 L22 18 M14 4 L14 18 M-14 4 L-14 18 M-22 2 L-22 18 M-26 -10 Q-34 -6 -32 6"/>'+
  '<path d="M30 -18 l-2 -8 M34 -16 l4 -7"/><path d="M-6 -22 q4 -8 10 0" fill="'+A+'"/></g>'; }
function cloud(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-30 10 Q-34 -6 -18 -8 Q-14 -24 4 -20 Q14 -32 28 -18 Q42 -16 38 0 Q44 10 30 12 Z" fill="'+S+'" stroke="'+G+'" stroke-width="2"/></g>'; }
function rain(x,y,n){ var s=''; for(var i=0;i<n;i++) s+='<line x1="'+(x+i*12)+'" y1="'+(y+(i%2)*6)+'" x2="'+(x+i*12-5)+'" y2="'+(y+14+(i%2)*6)+'" stroke="'+G+'" stroke-width="1.8" stroke-linecap="round"/>'; return s; }
function bolt(x,y){ return '<path d="M'+x+' '+y+' l-10 22 h9 l-7 20 l18 -26 h-9 l7 -16 z" fill="'+A+'"/>'; }
function waves(y,amp){ amp=amp||5; var d='M0 '+y; for(var i=0;i<=16;i++) d+=' q10 '+(i%2?amp:-amp)+' 20 0'; return '<path d="'+d+'" '+st(2)+'/>'; }
function river(y){ return '<path d="M0 '+y+' Q80 '+(y-12)+' 160 '+y+' T320 '+y+' V200 H0 Z" fill="'+S+'" opacity=".6"/>'+waves(y+12,4)+waves(y+26,3); }
function lotus(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="1.8">'+
  '<path d="M0 0 Q-8 -14 0 -28 Q8 -14 0 0Z" fill="'+A+'"/><path d="M0 0 Q-18 -8 -20 -22 Q-6 -16 0 0Z" fill="'+S+'"/>'+
  '<path d="M0 0 Q18 -8 20 -22 Q6 -16 0 0Z" fill="'+S+'"/><path d="M-24 2 Q0 10 24 2" fill="none"/></g>'; }
function bilva(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" fill="'+S+'" stroke="'+G+'" stroke-width="1.8">'+
  '<path d="M0 0 Q-6 -16 0 -30 Q6 -16 0 0Z"/><path d="M0 0 Q-18 -6 -26 -18 Q-10 -16 0 0Z"/><path d="M0 0 Q18 -6 26 -18 Q10 -16 0 0Z"/><path d="M0 0 v10" fill="none"/></g>'; }
function flame(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M0 -26 Q14 -10 8 2 Q4 10 0 10 Q-4 10 -8 2 Q-14 -10 0 -26Z" fill="'+A+'"/>'+
  '<path d="M0 -10 Q5 -2 2 4 Q0 6 -2 4 Q-5 -2 0 -10Z" fill="'+B+'"/><path d="M-14 12 h28 l-4 8 h-20z" fill="'+S+'" stroke="'+G+'" stroke-width="1.8"/></g>'; }
function kalasha(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="2">'+
  '<path d="M-16 -8 Q-26 10 -12 22 H12 Q26 10 16 -8 Z" fill="'+S+'"/><path d="M-10 -8 h20 v-6 h-20z" fill="'+B+'"/>'+
  '<path d="M-10 -14 q-10 -10 -4 -18 q6 6 4 18 M10 -14 q10 -10 4 -18 q-6 6 -4 18 M0 -14 v-14" fill="'+A+'"/>'+
  '<circle cx="0" cy="-30" r="6" fill="'+A+'"/></g>'; }
function wheel(x,y,r){ var s='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" '+st(2.4)+'/><circle cx="'+x+'" cy="'+y+'" r="4" fill="'+A+'"/>';
  for(var i=0;i<8;i++){ var a=i*Math.PI/4; s+='<line x1="'+x+'" y1="'+y+'" x2="'+(x+r*Math.cos(a))+'" y2="'+(y+r*Math.sin(a))+'" stroke="'+G+'" stroke-width="1.8"/>'; } return s; }
function pot(x,y){ return '<g stroke="'+G+'" stroke-width="2"><path d="M'+(x-18)+' '+(y-24)+' Q'+(x-30)+' '+(y-4)+' '+(x-14)+' '+(y+6)+' H'+(x+14)+' Q'+(x+30)+' '+(y-4)+' '+(x+18)+' '+(y-24)+' Z" fill="'+S+'"/>'+
  '<path d="M'+(x-12)+' '+(y-24)+' h24" /><ellipse cx="'+x+'" cy="'+(y+12)+'" rx="30" ry="5" fill="'+B+'"/></g>'; }
function dog(x,y){ return '<g'+st(2)+'><path d="M'+(x-20)+' '+y+' l4 -14 h20 l6 -8 l6 2 l-2 6 l-4 2 v14 M'+(x-16)+' '+(y-14)+' l-8 -6 M'+(x-6)+' '+(y-14)+' v14"/></g>'; }
function house(x,y){ return '<g'+st(2)+'><path d="M'+(x-22)+' '+y+' v-24 l22 -18 l22 18 v24 z" fill="'+S+'"/><path d="M'+(x-6)+' '+y+' v-14 h12 v14"/></g>'; }
function drum(x,y){ return '<g stroke="'+G+'" stroke-width="2"><ellipse cx="'+x+'" cy="'+(y-16)+'" rx="22" ry="7" fill="'+B+'"/>'+
  '<path d="M'+(x-22)+' '+(y-16)+' v26 q22 12 44 0 v-26" fill="'+S+'"/><path d="M'+(x-22)+' '+(y-16)+' l44 26 M'+(x+22)+' '+(y-16)+' l-44 26" fill="none"/>'+
  '<line x1="'+(x+26)+'" y1="'+(y-40)+'" x2="'+(x+8)+'" y2="'+(y-22)+'" stroke-width="2.6" stroke-linecap="round"/></g>'; }
function shield(x,y){ return '<g stroke="'+G+'" stroke-width="2.2"><path d="M'+x+' '+(y-30)+' l24 8 q0 30 -24 44 q-24 -14 -24 -44 z" fill="'+S+'"/><path d="M'+x+' '+(y-18)+' v30 M'+(x-12)+' '+(y-6)+' h24" fill="none"/></g>'; }
function soundRings(x,y){ var s=''; for(var i=1;i<=3;i++) s+='<path d="M'+(x+i*9)+' '+(y-i*9)+' q'+(i*6)+' '+(i*9)+' 0 '+(i*18)+'" '+st(1.8)+' opacity="'+(1-i*0.22)+'"/>'; return s; }
function snake(x,y){ return '<path d="M'+x+' '+y+' q10 -12 20 0 t20 0 t20 0 q8 -2 10 -10" '+st(2.4)+'/><circle cx="'+(x+70)+'" cy="'+(y-10)+'" r="3" fill="'+A+'"/>'; }
function eye3(x,y){ return '<g><path d="M'+(x-10)+' '+y+' Q'+x+' '+(y-9)+' '+(x+10)+' '+y+' Q'+x+' '+(y+9)+' '+(x-10)+' '+y+'Z" fill="'+B+'" stroke="'+G+'" stroke-width="2"/><circle cx="'+x+'" cy="'+y+'" r="3.4" fill="#c0392b"/></g>'; }
function grains(x,y){ var s=''; for(var i=0;i<5;i++){ var gx=x+i*7; s+='<path d="M'+gx+' '+y+' q'+(i-2)*3+' -20 '+(i-2)*5+' -38" '+st(1.6)+'/>';
  for(var k=0;k<4;k++) s+='<ellipse cx="'+(gx+(i-2)*(1.2+k))+'" cy="'+(y-16-k*7)+'" rx="2.4" ry="4.2" fill="'+A+'" transform="rotate('+((i-2)*8)+' '+(gx)+' '+(y-16-k*7)+')"/>'; }
  return s; }
function text(x,y,t,size){ return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="'+(size||14)+'" fill="'+G+'" font-family="inherit">'+t+'</text>'; }
function stars(){ var p=[[30,24],[70,40],[260,30],[292,54],[210,18],[110,22]], s=''; p.forEach(function(q){ s+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="1.6" fill="'+A+'"/>'; }); return s; }

function frame(inner){
  return '<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img">'+
    '<rect x="1" y="1" width="318" height="198" rx="16" fill="'+B+'"/>'+inner+
    '<rect x="5" y="5" width="310" height="190" rx="13" fill="none" stroke="'+A+'" stroke-width="1.6" stroke-dasharray="1 5" stroke-linecap="round"/>'+
    '<rect x="1" y="1" width="318" height="198" rx="16" fill="none" stroke="'+G+'" stroke-width="2"/></svg>';
}

/* ---------- one scene per anuvakam ---------- */
var ART = {
 'namavali-1': { cap:'బిల్వపత్రాలతో శివలింగార్చన – ప్రతి నామానికి ఒక పత్రం సమర్పిస్తూ "ఓం … నమః"',
   svg: frame(stars()+moon(160,34,11)+'<path d="M160 46 Q150 70 162 96" fill="none" stroke="#5aa0c8" stroke-width="3" stroke-linecap="round" opacity=".8"/>'+
     linga(160,138,1)+bilva(104,178,0.8)+bilva(130,186,0.7)+bilva(192,186,0.7)+bilva(218,178,0.8)+
     trishula(52,120,0.9)+damaru(268,118,1)+flame(270,176,0.7)+flame(50,176,0.7)) }
};
window.MANANAM_ART = window.MANANAM_ART || {};
window.MANANAM_ART['shiva-ashtottaram'] = ART;
})();
