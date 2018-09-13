(function(){
    'use strict';
    
    function loadSVG(){
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'js/svgAmoebas.json');
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
        
        var $body = document.getElementsByTagName('body');
        var fragment = document.createDocumentFragment();
        var bgWrapper = document.createElement('div');

        bgWrapper.setAttribute('id', 'bg-wrapper');
        
        for (var i=0; i<myJson.length; i++){

                var div = document.createElement('div');
                div.setAttribute('class', 'amoeba');
                
                var svg = document.createElement('svg');
                svg.setAttribute('viewbox', myJson[i].viewbox);

                var path = document.createElement('path');
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