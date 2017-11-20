window.appConfig = { 
    apiRoot: "http://localhost:3000/api/", debug: 0 
}; 

window.appConfig = { 
    app_name: "WebRestaurante", 
    app_version: "1.0", 
    api_url: "http://localhost:5000/sireis/api/v1/", 
    headers: { headers: { "Content-Type": "application/json; charset=utf-8", Accept: "application/json" } } 
}; 
    
window.notify = function (n, t) { t === undefined && (t = "inverse"); $.growl({ message: n }, { type: t, allow_dismiss: !1, label: "Cancel", className: "btn-xs btn-inverse", placement: { from: "bottom", align: "center" }, delay: 2500, animate: { enter: "animated fadeIn", exit: "animated fadeOut" }, offset: { x: 20, y: 85 } }) 
}, 

function () { 
    var n = angular.module("webRestApp", []); 
    n.constant("appConfig", window.appConfig) 
}()