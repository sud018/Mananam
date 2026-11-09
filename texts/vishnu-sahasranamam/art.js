// Original line-art illustrations for each section of Sri Vishnu Sahasranamam.
// Each scene is drawn from Vishnu's symbols that match the section's names and meaning.
// Colours come from CSS variables, so the pictures follow light / dark mode.
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

/* ---------- Vishnu's symbols ---------- */
var R = '#c0392b';
function namam(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')">'+
  '<path d="M-16 -30 L-10 14 Q0 24 10 14 L16 -30 L9 -30 L5 8 Q0 13 -5 8 L-9 -30 Z" fill="'+B+'" stroke="'+G+'" stroke-width="2"/>'+
  '<path d="M0 -28 L0 6" stroke="'+R+'" stroke-width="4" stroke-linecap="round"/><path d="M-18 22 Q0 32 18 22" '+st(2)+'/></g>'; }
function shankha(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="2" stroke-linejoin="round">'+
  '<path d="M-6 -28 Q14 -26 16 -6 Q18 14 4 24 Q-2 28 -6 22 Q-16 10 -16 -6 Q-16 -22 -6 -28 Z" fill="'+B+'"/>'+
  '<path d="M-6 -28 Q-2 -36 4 -34 Q2 -28 -6 -28" fill="'+A+'"/><path d="M-10 -10 Q0 -18 10 -8 M-12 2 Q0 -6 12 4 M-8 14 Q0 8 8 16" fill="none"/>'+
  '<path d="M4 24 Q8 30 14 28" fill="none"/></g>'; }
function chakra(x,y,r){ var s='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+B+'" stroke="'+G+'" stroke-width="2.4"/><circle cx="'+x+'" cy="'+y+'" r="'+(r*0.28)+'" fill="'+A+'"/>';
  for(var i=0;i<8;i++){ var a=i*Math.PI/4, c=Math.cos(a), d=Math.sin(a);
    s+='<line x1="'+(x+c*r*0.3)+'" y1="'+(y+d*r*0.3)+'" x2="'+(x+c*r*0.95)+'" y2="'+(y+d*r*0.95)+'" stroke="'+G+'" stroke-width="1.8"/>';
    var a2=a+Math.PI/8; s+='<path d="M'+(x+Math.cos(a2-0.18)*r)+' '+(y+Math.sin(a2-0.18)*r)+' L'+(x+Math.cos(a2)*(r+9))+' '+(y+Math.sin(a2)*(r+9))+' L'+(x+Math.cos(a2+0.18)*r)+' '+(y+Math.sin(a2+0.18)*r)+'Z" fill="'+A+'"/>'; }
  return s; }
function gada(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="2.2">'+
  '<line x1="0" y1="-8" x2="0" y2="40" stroke-linecap="round"/><ellipse cx="0" cy="-22" rx="12" ry="16" fill="'+A+'"/>'+
  '<path d="M-12 -22 h24 M-9 -32 h18 M-9 -12 h18" fill="none"/><circle cx="0" cy="-40" r="3" fill="'+G+'"/><rect x="-4" y="30" width="8" height="10" rx="2" fill="'+S+'"/></g>'; }
function sword(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="2">'+
  '<path d="M0 -42 L6 -32 L6 22 L-6 22 L-6 -32 Z" fill="'+B+'"/><path d="M-14 22 h28" stroke-width="3" stroke-linecap="round"/><path d="M-3 24 h6 v14 h-6z" fill="'+A+'"/></g>'; }
function dhanus(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')"'+st(2.4)+'>'+
  '<path d="M-6 -44 Q22 0 -6 44"/><line x1="-6" y1="-44" x2="-6" y2="44" stroke-width="1.4"/><path d="M-12 -46 q6 -2 6 2 M-12 46 q6 2 6 -2"/></g>'; }
function arrowV(x1,y1,x2,y2){ var a=Math.atan2(y2-y1,x2-x1), l=9;
  return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" '+st(2)+'/><path d="M'+x2+' '+y2+' L'+(x2-l*Math.cos(a-0.4))+' '+(y2-l*Math.sin(a-0.4))+' L'+(x2-l*Math.cos(a+0.4))+' '+(y2-l*Math.sin(a+0.4))+'Z" fill="'+G+'"/>'; }
function serpentBed(x,y,s){ s=s||1; var h='';
  for(var i=-2;i<=2;i++) h+='<path d="M'+(i*11)+' -52 q-7 -10 0 -18 q7 8 0 18" fill="'+S+'" stroke="'+G+'" stroke-width="1.8"/><circle cx="'+(i*11-2)+'" cy="-62" r="1.2" fill="'+R+'"/>';
  return '<g transform="translate('+x+' '+y+') scale('+s+')">'+
  '<path d="M-90 4 Q-90 -14 -60 -14 L60 -14 Q86 -14 86 0 Q86 14 60 14 L-60 14 Q-90 14 -90 4 Z" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+
  '<path d="M-70 -6 Q0 2 70 -6 M-74 6 Q0 14 74 6" '+st(1.6)+'/>'+
  '<path d="M-60 -14 Q-74 -30 -60 -48 Q-46 -60 -28 -54" fill="none" stroke="'+G+'" stroke-width="5" stroke-linecap="round"/>'+
  '<path d="M-60 -14 Q-74 -30 -60 -48 Q-46 -60 -28 -54" fill="none" stroke="'+S+'" stroke-width="2.4" stroke-linecap="round"/>'+
  '<g transform="translate(-40 6)">'+h+'</g></g>'; }
function garuda(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="2" stroke-linejoin="round">'+
  '<path d="M0 -6 Q-20 -30 -46 -26 Q-30 -16 -34 -4 Q-20 -10 -8 6 Z" fill="'+A+'"/><path d="M0 -6 Q20 -30 46 -26 Q30 -16 34 -4 Q20 -10 8 6 Z" fill="'+A+'"/>'+
  '<path d="M-8 6 Q0 26 8 6 Q4 -6 0 -6 Q-4 -6 -8 6 Z" fill="'+S+'"/><circle cx="0" cy="-14" r="7" fill="'+S+'"/><path d="M5 -14 l8 3 l-8 2" fill="'+A+'"/>'+
  '<path d="M-6 26 l-4 8 M6 26 l4 8" fill="none"/></g>'; }
function foot(x,y,s,r){ s=s||1; return '<g transform="translate('+x+' '+y+') rotate('+(r||0)+') scale('+s+')" fill="'+A+'">'+
  '<ellipse cx="0" cy="0" rx="9" ry="15"/><circle cx="-7" cy="-19" r="2.6"/><circle cx="-2.5" cy="-21.5" r="2.8"/><circle cx="2.5" cy="-21" r="2.6"/><circle cx="6.5" cy="-18.5" r="2.3"/><circle cx="9" cy="-14" r="2"/></g>'; }
function chhatra(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="2">'+
  '<path d="M-34 0 Q0 -34 34 0 Q22 -4 11 0 Q0 -4 -11 0 Q-22 -4 -34 0 Z" fill="'+S+'"/><path d="M0 -17 V44 q0 6 6 6" fill="none" stroke-linecap="round"/></g>'; }
function kamandalu(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="2">'+
  '<path d="M-14 -6 Q-18 16 0 18 Q18 16 14 -6 Z" fill="'+S+'"/><path d="M-10 -6 Q0 -26 10 -6" fill="none"/><path d="M14 0 q10 -2 14 -10" fill="none" stroke-linecap="round"/></g>'; }
function boar(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="2.2" stroke-linejoin="round">'+
  '<path d="M-44 10 Q-46 -16 -20 -22 Q4 -30 22 -16 L40 -12 Q48 -8 44 0 L30 4 Q26 14 16 14 L16 28 M6 14 L6 28 M-22 14 L-22 28 M-34 12 L-34 28" fill="'+S+'"/>'+
  '<path d="M38 -6 Q50 -14 52 -28" fill="none" stroke="'+B+'" stroke-width="4" stroke-linecap="round"/><path d="M38 -6 Q50 -14 52 -28" fill="none" stroke-width="1.4"/>'+
  '<circle cx="24" cy="-14" r="2" fill="'+G+'"/><path d="M-44 4 q-8 -2 -8 -10" fill="none"/></g>'; }
function earth(x,y,r){ return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#3f7f6a" stroke="'+G+'" stroke-width="2"/>'+
  '<path d="M'+(x-r*0.6)+' '+(y-r*0.2)+' q'+(r*0.3)+' '+(-r*0.5)+' '+(r*0.7)+' '+(-r*0.2)+' q'+(r*0.3)+' '+(r*0.4)+' '+(r*0.6)+' '+(r*0.1)+' M'+(x-r*0.4)+' '+(y+r*0.4)+' q'+(r*0.4)+' '+(-r*0.2)+' '+(r*0.8)+' 0" fill="none" stroke="'+B+'" stroke-width="2"/>'; }
function fish(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="2" stroke-linejoin="round">'+
  '<path d="M-34 0 Q-10 -22 22 -6 L40 -18 L34 0 L40 18 L22 6 Q-10 22 -34 0 Z" fill="'+A+'"/><circle cx="-20" cy="-3" r="2.4" fill="'+G+'"/>'+
  '<path d="M-26 -10 Q-30 -26 -20 -34" fill="none" stroke-width="2.6" stroke-linecap="round"/><path d="M-4 -12 q4 12 0 24 M8 -9 q3 9 0 18" fill="none" stroke-width="1.4"/></g>'; }
function feather(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')">'+
  '<path d="M0 30 Q-2 0 0 -30" '+st(1.8)+'/><path d="M0 -30 Q-16 -14 -10 6 Q-2 14 0 22 Q2 14 10 6 Q16 -14 0 -30Z" fill="#2c7a6b" stroke="'+G+'" stroke-width="1.6"/>'+
  '<ellipse cx="0" cy="-12" rx="7" ry="9" fill="'+A+'"/><ellipse cx="0" cy="-12" rx="3.4" ry="4.4" fill="#1e3a8a"/></g>'; }
function flute(x1,y1,x2,y2){ var s='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+A+'" stroke-width="7" stroke-linecap="round"/>';
  for(var i=1;i<=5;i++){ var t=0.2+i*0.12; s+='<circle cx="'+(x1+(x2-x1)*t)+'" cy="'+(y1+(y2-y1)*t)+'" r="1.6" fill="'+G+'"/>'; } return s; }
function book(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+G+'" stroke-width="2">'+
  '<rect x="-40" y="-9" width="80" height="18" rx="4" fill="'+S+'"/><path d="M-32 -2 h50 M-32 3 h40" stroke-width="1.4"/>'+
  '<circle cx="-24" cy="0" r="0" /><path d="M-44 0 h-6 M44 0 h6" stroke="'+R+'" stroke-width="2.4"/></g>'; }
function stand(x,y){ return '<path d="M'+(x-30)+' '+(y+26)+' L'+x+' '+y+' L'+(x+30)+' '+(y+26)+' M'+(x-30)+' '+(y)+' L'+(x+30)+' '+(y+26)+' M'+(x+30)+' '+y+' L'+(x-30)+' '+(y+26)+'" '+st(2.2)+'/>'; }
function lamp(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')">'+
  '<path d="M0 -40 Q10 -28 5 -20 Q2 -16 0 -16 Q-2 -16 -5 -20 Q-10 -28 0 -40Z" fill="'+A+'"/>'+
  '<path d="M-22 -14 Q0 0 22 -14 Q16 -4 0 -2 Q-16 -4 -22 -14Z" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+
  '<path d="M-3 -2 L-6 28 H6 L3 -2 M-16 28 h32 v6 h-32z" fill="'+S+'" stroke="'+G+'" stroke-width="2"/></g>'; }
function altar(x,y){ return '<g stroke="'+G+'" stroke-width="2"><path d="M'+(x-40)+' '+y+' h80 l-8 -14 h-64 z" fill="'+S+'"/><path d="M'+(x-48)+' '+(y+12)+' h96 l-8 -12 h-80 z" fill="'+B+'"/></g>'+
  '<path d="M'+x+' '+(y-56)+' Q'+(x+22)+' '+(y-30)+' '+(x+12)+' '+(y-14)+' L'+(x-12)+' '+(y-14)+' Q'+(x-22)+' '+(y-30)+' '+x+' '+(y-56)+'Z" fill="'+A+'"/>'+
  '<path d="M'+(x-20)+' '+(y-40)+' Q'+(x-30)+' '+(y-26)+' '+(x-18)+' '+(y-14)+' M'+(x+20)+' '+(y-40)+' Q'+(x+30)+' '+(y-26)+' '+(x+18)+' '+(y-14)+'" fill="none" stroke="'+A+'" stroke-width="3" stroke-linecap="round"/>'; }
function starWheel(x,y,r){ var s='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="none" stroke="'+G+'" stroke-width="1.4" stroke-dasharray="2 5"/>';
  for(var i=0;i<12;i++){ var a=i*Math.PI/6; s+='<circle cx="'+(x+Math.cos(a)*r)+'" cy="'+(y+Math.sin(a)*r)+'" r="2.4" fill="'+A+'"/>'; }
  return s+'<circle cx="'+x+'" cy="'+y+'" r="4" fill="'+G+'"/>'; }
function coins(x,y){ var s=''; [[0,0],[14,4],[-14,4],[7,-8],[-7,-8]].forEach(function(c){ s+='<ellipse cx="'+(x+c[0])+'" cy="'+(y+c[1])+'" rx="8" ry="4" fill="'+A+'" stroke="'+G+'" stroke-width="1.4"/>'; }); return s; }
function srivatsa(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')" fill="'+A+'" stroke="'+G+'" stroke-width="1.4">'+
  '<path d="M0 0 Q-14 -14 -6 -22 Q0 -18 0 -8 Q0 -18 6 -22 Q14 -14 0 0 Z"/><path d="M0 0 Q-14 14 -6 22 Q0 18 0 8 Q0 18 6 22 Q14 14 0 0 Z"/>'+
  '<path d="M0 0 Q-14 -14 -22 -6 Q-18 0 -8 0 Q-18 0 -22 6 Q-14 14 0 0Z"/><path d="M0 0 Q14 -14 22 -6 Q18 0 8 0 Q18 0 22 6 Q14 14 0 0Z"/></g>'; }
function cosmos(x,y){ var s='<circle cx="'+x+'" cy="'+y+'" r="70" fill="'+S+'" opacity=".45"/>'+
  '<ellipse cx="'+x+'" cy="'+y+'" rx="70" ry="22" fill="none" stroke="'+G+'" stroke-width="1.4"/><ellipse cx="'+x+'" cy="'+y+'" rx="22" ry="70" fill="none" stroke="'+G+'" stroke-width="1.4"/>'+
  '<circle cx="'+x+'" cy="'+y+'" r="70" fill="none" stroke="'+G+'" stroke-width="2"/>';
  [[-44,-30],[40,-40],[52,24],[-50,30],[-14,52],[18,-56],[-60,-6],[62,-6]].forEach(function(p){ s+='<circle cx="'+(x+p[0])+'" cy="'+(y+p[1])+'" r="2" fill="'+A+'"/>'; });
  return s; }
function bridge(y){ var s='<path d="M20 '+y+' Q160 '+(y-40)+' 300 '+y+'" '+st(3)+'/><path d="M20 '+(y+8)+' Q160 '+(y-32)+' 300 '+(y+8)+'" '+st(1.6)+'/>';
  for(var i=1;i<8;i++){ var x=20+i*35, yy=y-40*(1-Math.pow((x-160)/140,2)); s+='<line x1="'+x+'" y1="'+(yy+4)+'" x2="'+x+'" y2="'+(y+20)+'" '+st(1.6)+'/>'; } return s; }
function govardhana(x,y){ return '<path d="M'+(x-70)+' '+(y)+' Q'+(x-50)+' '+(y-46)+' '+(x-14)+' '+(y-40)+' Q'+(x+10)+' '+(y-62)+' '+(x+36)+' '+(y-40)+' Q'+(x+66)+' '+(y-38)+' '+(x+70)+' '+y+' Z" fill="'+S+'" stroke="'+G+'" stroke-width="2.2"/>'+
  tree(x-30,y-34,0.45)+tree(x+30,y-38,0.4)+'<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y+56)+'" stroke="'+A+'" stroke-width="4" stroke-linecap="round"/>'; }
function chariot(x,y){ return '<g stroke="'+G+'" stroke-width="2.2">'+
  '<path d="M'+(x-44)+' '+(y-14)+' h70 l10 -24 h-14 l-6 14 h-50 z" fill="'+S+'"/><line x1="'+(x+20)+'" y1="'+(y-38)+'" x2="'+(x+20)+'" y2="'+(y-86)+'" stroke-linecap="round"/>'+
  '<path d="M'+(x+20)+' '+(y-86)+' l30 8 l-30 8 z" fill="'+A+'"/><path d="M'+(x+36)+' '+(y-14)+' L'+(x+76)+' '+(y-22)+'" fill="none"/></g>'+wheel(x-14,y,18); }
function arrowBed(x,y){ var s='<path d="M'+(x-80)+' '+y+' h160" stroke="'+G+'" stroke-width="3" stroke-linecap="round"/>';
  for(var i=0;i<11;i++){ var ax=x-75+i*15; s+='<line x1="'+ax+'" y1="'+(y+2)+'" x2="'+(ax+(i%2?4:-4))+'" y2="'+(y+40)+'" stroke="'+G+'" stroke-width="1.8"/><path d="M'+(ax-3)+' '+(y+36)+' l3 6 l3 -6" fill="none" stroke="'+A+'" stroke-width="1.8"/>'; }
  return s+'<path d="M'+(x-84)+' '+(y-10)+' q-6 -14 6 -18 q12 0 10 14" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+
  '<path d="M'+(x-70)+' '+(y-8)+' Q'+x+' '+(y-20)+' '+(x+78)+' '+(y-6)+'" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'; }

/* ---------- one scene per section ---------- */
var ART = {
 'purva-1': { cap:'శుక్లాంబరధరుడైన విష్ణువు, విష్వక్సేనుడు, వ్యాసమహర్షి – విఘ్నాలు తొలగించే ప్రార్థన',
   svg: frame(moon(268,40,11)+stars()+namam(160,86,1.1)+shankha(92,92,1)+chakra(228,90,20)+book(160,160,1.1)+lotus(60,174,0.9)+lotus(262,174,0.9)) },
 'purva-2': { cap:'అంపశయ్యపై భీష్ముడు – ధర్మరాజు ప్రశ్నలు, "విష్ణు సహస్రనామమే పరమ ధర్మం" అనే సమాధానం',
   svg: frame(sun(262,48,13)+'<path d="M0 176 H320" stroke="'+G+'" stroke-width="1.6"/>'+arrowBed(150,118)+'<path d="M40 60 v40 M40 60 l18 6 l-18 6" fill="'+A+'" stroke="'+G+'" stroke-width="2"/>'+namam(268,128,0.7)) },
 'purva-3': { cap:'న్యాసం – ఋషి వేదవ్యాసుడు, ఛందస్సు అనుష్టుప్, దేవత దేవకీసుతుడైన శ్రీకృష్ణుడు',
   svg: frame(text(160,92,'ఓం',46)+flame(70,150,1.1)+flame(250,150,1.1)+kalasha(160,158,1)+text(70,60,'ఋషి',13)+text(250,60,'దేవత',13)+text(160,40,'ఛందస్సు',13)) },
 'purva-4': { cap:'పాలసముద్రంలో ఆదిశేషునిపై పవళించిన శాంతాకారుడు – అమృత వర్షం కురిపించే మేఘాలు',
   svg: frame(cloud(70,40,0.8)+cloud(250,36,0.8)+rain(52,52,4)+rain(234,48,4)+waves(176,5)+waves(188,4)+serpentBed(170,148,1)+lotus(166,108,0.9)+shankha(104,118,0.5)+chakra(232,118,10)) },
 'stotram-1': { cap:'విశ్వం విష్ణుః – విశ్వమంతా తానే, అంతటా వ్యాపించి అన్ని ప్రాణులకు అంతరాత్మ',
   svg: frame(stars()+cosmos(160,100)+namam(160,104,0.8)+sun(44,46,10)+moon(282,150,10)) },
 'stotram-2': { cap:'ఉపేంద్రుడు, వామనుడు – మూడు అడుగులతో లోకాలను కొలిచినవాడు, వేదస్వరూపుడు',
   svg: frame(stars()+chhatra(84,96,1)+kamandalu(124,150,0.9)+foot(196,158,0.9,-8)+foot(236,110,0.9,6)+foot(272,58,0.9,14)+'<path d="M180 176 Q240 120 290 40" fill="none" stroke="'+A+'" stroke-width="1.4" stroke-dasharray="2 6"/>') },
 'stotram-3': { cap:'మహాద్రిధృక్, గోవిందుడు – గోవర్ధనాన్ని ఎత్తి గోవులను, గోపాలురను కాపాడినవాడు',
   svg: frame(cloud(60,32,0.8)+cloud(260,30,0.8)+rain(44,46,4)+rain(244,44,4)+govardhana(160,104)+cow(96,180,0.8)+cow(226,182,0.8)+feather(160,174,0.6)) },
 'stotram-4': { cap:'మంత్రస్వరూపుడు, సూర్యచంద్రుల కాంతి గలవాడు, ఔషధం – "జగతః సేతుః", లోకాలకు వంతెన',
   svg: frame(sun(60,48,13)+moon(262,48,12)+text(160,78,'ఓం',40)+'<path d="M0 170 H320 V200 H0Z" fill="'+S+'" opacity=".5"/>'+waves(178,4)+bridge(160)) },
 'stotram-5': { cap:'పద్మనాభుడు, గరుడధ్వజుడు, సుదర్శనుడు – రాముడు, దామోదరుడు, వైకుంఠుడు',
   svg: frame(stars()+'<line x1="82" y1="176" x2="82" y2="64" stroke="'+G+'" stroke-width="2.4" stroke-linecap="round"/>'+garuda(82,58,0.8)+chakra(236,84,26)+lotus(160,176,1.4)+dhanus(160,104,0.7)) },
 'stotram-6': { cap:'యజ్ఞః, నక్షత్రనేమిః – యజ్ఞస్వరూపుడు, నక్షత్ర చక్రానికి కేంద్రమైనవాడు, సుహృత్తు',
   svg: frame(starWheel(160,56,34)+altar(160,170)+kalasha(62,166,0.9)+lotus(262,176,1)) },
 'stotram-7': { cap:'మహావరాహుడు, త్రివిక్రముడు, చక్రగదాధరుడు – సముద్రం నుండి భూమిని ఉద్ధరించినవాడు',
   svg: frame(stars()+'<path d="M0 156 H320 V200 H0Z" fill="'+S+'" opacity=".55"/>'+waves(162,5)+waves(178,4)+boar(150,128,1.1)+earth(204,82,18)+gada(268,110,0.8)+chakra(56,70,14)) },
 'stotram-8': { cap:'శ్రీవత్సవక్షాః, శ్రీపతిః, శ్రీనిధిః – లక్ష్మీపతి, సమస్త ఐశ్వర్యాలకు నిధి',
   svg: frame(lotus(160,156,2.1)+srivatsa(160,50,0.95)+coins(70,162)+coins(250,162)+kalasha(64,108,0.8)+kalasha(256,108,0.8)) },
 'stotram-9': { cap:'వాసుదేవుడు, సుయామునుడు – యమునా తీరంలో వేణువూదే గోపాలుడు, భక్తవత్సలుడు',
   svg: frame(moon(270,38,10)+stars()+river(150)+flute(96,92,212,62)+feather(232,74,0.9)+cow(78,148,0.8)+tree(280,150,0.8)) },
 'stotram-10': { cap:'శృంగీ (మత్స్యరూపుడు), న్యగ్రోధః, అశ్వత్థః – అణువు నుండి బృహత్ వరకు అన్నీ తానే',
   svg: frame('<path d="M0 140 H320 V200 H0Z" fill="'+S+'" opacity=".5"/>'+waves(146,5)+waves(162,4)+fish(110,172,1)+tree(236,128,1.3)+tree(286,132,0.8)+'<circle cx="60" cy="60" r="3" fill="'+A+'"/><circle cx="104" cy="60" r="18" fill="none" stroke="'+G+'" stroke-width="2"/>'+text(82,96,'అణు · బృహత్',12)) },
 'stotram-11': { cap:'ధనుర్ధరుడు, రవిలోచనుడు, స్వస్తిదుడు – సూర్యరూపుడు, దుఃస్వప్నాలను నశింపజేసే మంగళప్రదుడు',
   svg: frame(sun(196,70,26)+dhanus(78,100,1)+arrowV(72,100,140,100)+flame(270,160,1)+kalasha(196,162,0.9)+text(60,180,'స్వస్తి',14)) },
 'stotram-12': { cap:'శంఖ, చక్ర, గద, శార్ఙ్గ, నందక ధారి – వనమాలీ శ్రీమన్నారాయణుడు మమ్ము రక్షించుగాక',
   svg: frame(namam(160,96,1.1)+shankha(78,72,0.9)+chakra(242,70,20)+gada(64,150,0.8)+dhanus(256,146,0.65)+sword(160,166,0.6)+'<path d="M110 58 Q160 30 210 58" fill="none" stroke="'+A+'" stroke-width="2.4" stroke-dasharray="1 6" stroke-linecap="round"/>') },
 'uttara-1': { cap:'ఫలశ్రుతి – నిత్యం భక్తితో పఠించేవారికి భయం, రోగం, ఆపద లేవు; శ్రేయస్సు, శాంతి కలుగుతాయి',
   svg: frame(sun(160,58,18)+'<path d="M0 104 H320" stroke="'+G+'" stroke-width="1.4" stroke-dasharray="2 6"/>'+stand(160,148)+book(160,140,0.9)+lamp(64,154,1)+lamp(256,154,1)) },
 'uttara-2': { cap:'శ్రీరామ నామం, యోగేశ్వరుడైన కృష్ణుడు – చేసిన కర్మలన్నీ నారాయణునికే సమర్పణం',
   svg: frame(stars()+chariot(110,168)+text(236,74,'శ్రీరామ',24)+lotus(236,150,1.4)+flame(236,110,0.7)) }
};
window.MANANAM_ART = window.MANANAM_ART || {};
window.MANANAM_ART['vishnu-sahasranamam'] = ART;
})();
