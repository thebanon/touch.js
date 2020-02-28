if('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) { registration.unregister(); }
    navigator.serviceWorker.register('sw.js');
  });
}
window.touch = {
    local: {dbl: null, press: null, type: null},
    handler: (event,type=event.type) => {
        if(type === 'touchstart') {
            if(touch.local.dbl) { clearTimeout(touch.local.dbl); touch.local.dbl = null;  touch.local.type = 'dbltap'; touch.events(event.target,touch.local.type); } 
            else { touch.local.type = 'press'; touch.local.dbl = setTimeout(() => { touch.local.dbl = null;  touch.events(event.target,touch.local.type); },300); }
        }
        else if (type === "touchmove") { clearTimeout(touch.local.dbl); touch.local.dbl = null; touch.local.type = 'drag'; touch.events(event.target,'drag'); }
        else if (type === "touchend") { clearTimeout(touch.local.press); touch.local.press = null; touch.local.type = null; }
    },
    events: (target,t,touch=t?t:'tap') => { document.body.dataset.touch = touch; console.log({target,touch}); }
}
function init(url) { TouchEmulator();
  document.body.addEventListener("touchstart",touch.handler,{passive:true});
  document.body.addEventListener("touchmove",touch.handler,{passive:true});
  document.body.addEventListener("touchcancel",touch.handler,false);
  document.body.addEventListener("touchend",touch.handler,false);
}