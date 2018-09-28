/* *************************************************

    SVG FLOATING AMOEABAS BACKGROUND

    Version:    1.0
    Client:     Ginger Strategic Research
    Author:     Paulo Pamplona (www.paulopamplona.com)
    Date:       09/2018

**************************************************** */

(function(){
    'use strict';
    
    function loadSVG(){
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '../js/svgAmoebas.json');
        ajax.send();
        var response = '';
        ajax.addEventListener('readystatechange', function(){
            if ( isRequestOk() ){

                try {
                    response = JSON.parse(ajax.responseText);    
                }
                catch(e) {
                    response = ajax.responseText;    
                }

                buildAmoebas(response);
                
            } 
        }, false);  
        function isRequestOk(){
            return ajax.readyState === 4 && ajax.status === 200;
        }
    }
           
    function buildAmoebas(myJson){
        
        var xmlns = "http://www.w3.org/2000/svg";
        var fragment = document.createDocumentFragment();
        var bgWrapper = document.createElement('div');

        bgWrapper.setAttribute('id', 'bg-wrapper');
        
        for (var i=0; i<myJson.length; i++){

                var div = document.createElement('div');
                div.setAttribute('class', 'amoeba');
                            
                var svg = document.createElementNS (xmlns, 'svg');
                svg.setAttribute('viewbox', myJson[i].viewbox);

                var path = document.createElementNS (xmlns, "path");
                path.setAttribute('d', myJson[i].path);
            
                svg.appendChild(path);
                div.appendChild(svg);
                bgWrapper.appendChild(div);   
        }
        
        fragment.appendChild(bgWrapper);
        document.body.insertBefore(fragment, document.body.firstChild);
                
    }
    
    loadSVG();    
    
})();