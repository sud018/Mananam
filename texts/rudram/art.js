// Original line-art illustrations for each anuvakam of Sri Rudram.
// Each scene is drawn from symbols of Shiva that match the anuvakam's meaning.
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
var ART = {
 'namakam-1': { cap:'ఆయుధాలు దించి, శాంతించిన రుద్రుడు – మమ్మల్ని రక్షించు',
   svg: frame(mountains(150)+moon(160,40,13)+linga(160,150,1.1)+bow(70,118,0.9,true)+quiver(250,128)+arrow(214,170,262,170)) },
 'namakam-2': { cap:'చెట్లు, పశువులు, దారులు, దిక్కులకు అధిపతి',
   svg: frame(sun(270,40,14)+tree(60,170,1.1)+tree(104,172,0.8)+cow(200,160,1)+'<path d="M120 196 Q170 150 300 140" '+st(1.8)+' stroke-dasharray="6 6"/>'+text(160,34,'ॐ',22)) },
 'namakam-3': { cap:'అడవులు, కొండలు, దారుల్లో – అందరిలో ఉన్నవాడు',
   svg: frame(stars()+moon(262,40,12)+mountains(160)+tree(40,180,0.9)+tree(280,182,1)+tree(240,184,0.7)+trishula(160,120,1)) },
 'namakam-4': { cap:'కుమ్మరి, రథకారుడు, వేటగాడు – అందరి రూపం నీవే',
   svg: frame(wheel(80,110,32)+pot(160,150)+'<circle cx="160" cy="162" r="34" fill="none" stroke="'+S+'" stroke-width="3"/>'+bow(250,110,0.7)+dog(256,170)+text(160,40,'గణాలకు నమస్కారం',14)) },
 'namakam-5': { cap:'భవుడు, శర్వుడు, నీలకంఠుడు – ప్రవాహాల్లో, ద్వీపాల్లో ఉన్నవాడు',
   svg: frame(river(140)+'<ellipse cx="230" cy="150" rx="40" ry="10" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+tree(230,150,0.6)+
     '<circle cx="110" cy="80" r="40" fill="none" stroke="'+G+'" stroke-width="2.2"/><path d="M80 96 Q110 112 140 96" stroke="#3b6ea5" stroke-width="5" fill="none" stroke-linecap="round"/>'+moon(124,52,9)+eye3(110,66)) },
 'namakam-6': { cap:'ముందు పుట్టినవాడు, తర్వాత పుట్టినవాడు; కవచధారి; ధ్వని–ప్రతిధ్వని',
   svg: frame(shield(110,110)+trishula(170,110,0.9)+soundRings(214,96)+mountains(186)+text(110,174,'జ్యేష్ఠ',12)+text(250,174,'కనిష్ఠ',12)) },
 'namakam-7': { cap:'దుందుభి నాదం, మేఘం, మెరుపు, వర్షం, బావుల్లో ఉన్నవాడు',
   svg: frame(cloud(120,52,1.1)+cloud(220,44,0.9)+bolt(180,64)+rain(96,78,6)+rain(206,70,4)+drum(80,170)+
     '<ellipse cx="240" cy="168" rx="34" ry="9" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+waves(168,2).replace('M0','M206')) },
 'namakam-8': { cap:'నమః శివాయ చ శివతరాయ చ – నదీ తీర్థాల్లో ఉన్నవాడు',
   svg: frame(river(150)+linga(160,128,1)+bilva(80,120,1)+bilva(240,120,1)+text(160,40,'నమః శివాయ',18)) },
 'namakam-9': { cap:'ఇళ్ళు, గోశాలలు, గుహలు, ఆకుల్లో – అంతటా ఉన్నవాడు',
   svg: frame(mountains(170)+house(90,170)+'<path d="M200 170 q30 -50 60 0" fill="'+B+'" stroke="'+G+'" stroke-width="2"/>'+cow(150,168,0.7)+bilva(270,80,0.9)+bilva(50,70,0.8)+moon(160,42,10)) },
 'namakam-10': { cap:'మా పిల్లలను, పశువులను, వీరులను కాపాడు',
   svg: frame(flame(160,150,1.2)+'<path d="M60 170 q20 -40 40 0 M220 170 q20 -40 40 0" '+st(2)+'/>'+'<circle cx="80" cy="118" r="10" '+st(2)+'/><circle cx="240" cy="118" r="10" '+st(2)+'/>'+cow(160,70,0.6)+bow(286,96,0.5,true)) },
 'namakam-11': { cap:'భూమి, ఆకాశాల్లో వేలాది రుద్రులు – త్ర్యంబకం యజామహే',
   svg: frame(stars()+mountains(178)+trishula(70,120,0.8)+damaru(250,110,1.1)+eye3(160,70)+moon(160,46,9)+snake(120,150)+text(160,124,'ॐ',26)) },

 'chamakam-1': { cap:'అన్నం, ప్రాణం, వాక్కు, మనస్సు, బలం, ఆయువు – నాకు',
   svg: frame(sun(160,52,16)+kalasha(80,150,1.1)+'<path d="M140 176 q20 -50 40 0" '+st(2.2)+'/><circle cx="160" cy="116" r="12" '+st(2.2)+'/>'+lotus(240,166,1.3)) },
 'chamakam-2': { cap:'శ్రేష్ఠత్వం, సంపద, సత్యం, శ్రద్ధ, కీర్తి – నాకు',
   svg: frame('<path d="M110 160 h100 l-10 -70 h-80z" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+'<path d="M126 90 l8 -24 l14 16 l12 -22 l12 22 l14 -16 l8 24" fill="'+A+'" stroke="'+G+'" stroke-width="2"/>'+flame(260,160,0.9)+lotus(60,166,1.1)) },
 'chamakam-3': { cap:'సుఖం, శుభం, జ్ఞానం, ఆరోగ్యం, నిర్భయం – నాకు',
   svg: frame(moon(250,44,12)+stars()+lotus(160,150,2)+'<path d="M40 176 h240" '+st(1.6)+'/>'+text(160,44,'శం చ మే',18)) },
 'chamakam-4': { cap:'పాలు, నెయ్యి, తేనె, వర్షం, వరి, గోధుమ, నువ్వులు – నాకు',
   svg: frame(cloud(250,50,0.8)+rain(232,72,4)+grains(50,170)+grains(110,174)+kalasha(200,160,0.9)+cow(270,168,0.6)) },
 'chamakam-5': { cap:'రాళ్ళు, మట్టి, కొండలు, బంగారం, లోహాలు, ఓషధులు – నాకు',
   svg: frame(mountains(160)+'<rect x="196" y="150" width="34" height="14" rx="2" fill="'+A+'" stroke="'+G+'" stroke-width="1.6"/><rect x="214" y="138" width="34" height="14" rx="2" fill="'+A+'" stroke="'+G+'" stroke-width="1.6"/>'+tree(70,178,0.8)+bilva(130,176,0.8)+'<circle cx="290" cy="170" r="8" fill="'+S+'" stroke="'+G+'"/><circle cx="276" cy="176" r="6" fill="'+S+'" stroke="'+G+'"/>') },
 'chamakam-6': { cap:'అగ్ని, సోముడు, సూర్యుడు, సరస్వతి… దేవతలు ఇంద్రునితో – నాకు',
   svg: frame(sun(80,60,14)+moon(240,58,13)+flame(160,150,1.3)+bolt(160,40)+waves(180,3)) },
 'chamakam-7': { cap:'సోమయాగ పాత్రలు (గ్రహాలు) – యజ్ఞం ద్వారా నాకు',
   svg: frame(flame(160,150,1.1)+'<path d="M70 150 h40 l-6 22 h-28z M210 150 h40 l-6 22 h-28z M120 118 h28 l-4 16 h-20z M172 118 h28 l-4 16 h-20z" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+moon(160,46,10)) },
 'chamakam-8': { cap:'సమిధలు, దర్భలు, వేదిక, స్రుక్కులు – యజ్ఞ సామగ్రి నాకు',
   svg: frame('<path d="M100 170 h120 l-14 -20 h-92z" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+flame(160,140,1.1)+
     '<path d="M50 170 l30 -60 M60 172 l30 -56 M70 174 l26 -50" '+st(1.8)+'/><path d="M240 120 l40 40 M236 124 a10 10 0 1 1 8 -8" '+st(2.2)+'/>') },
 'chamakam-9': { cap:'యజ్ఞాలు, వేదాలు (ఋక్, సామ, యజుస్సు), ఋతువులు – నాకు',
   svg: frame(sun(160,50,14)+flame(160,160,1)+'<rect x="56" y="110" width="44" height="54" rx="4" fill="'+S+'" stroke="'+G+'" stroke-width="2"/><rect x="220" y="110" width="44" height="54" rx="4" fill="'+S+'" stroke="'+G+'" stroke-width="2"/>'+text(78,142,'ఋక్',13)+text(242,142,'సామ',13)) },
 'chamakam-10': { cap:'దూడలు, ఆవులు, ఎద్దులు – అన్ని వయసుల పశువులు నాకు',
   svg: frame(mountains(150)+cow(110,166,1.1)+cow(220,170,0.7)+sun(270,44,10)) },
 'chamakam-11': { cap:'ఒకటి, మూడు, ఐదు… నాలుగు, ఎనిమిది… – సంపూర్ణత్వం నాకు',
   svg: frame(text(160,62,'౧ · ౩ · ౫ · ౭ · ౯',20)+text(160,96,'౪ · ౮ · ౧౨ · ౧౬',20)+linga(160,170,0.75)+lotus(60,170,1)+lotus(260,170,1)) }
};
window.MANANAM_ART = window.MANANAM_ART || {};
ART['dhyanam-1']={cap:'శుద్ధ స్ఫటికం వలె ప్రకాశించే, త్రినేత్రుడు, నీలకంఠుడు అయిన రుద్రుని ధ్యానం',svg:frame(stars()+moon(160,40,12)+mountains(176)+eye3(160,92)+'<path d="M110 120 h100" stroke="'+A+'" stroke-width="3"/><path d="M116 128 h88" stroke="'+A+'" stroke-width="3"/><path d="M122 136 h76" stroke="'+A+'" stroke-width="3"/>'+trishula(60,130,0.7)+damaru(262,124,0.9))};
window.MANANAM_ART['rudram'] = ART;
})();
