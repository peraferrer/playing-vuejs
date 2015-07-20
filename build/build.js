(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}],2:[function(require,module,exports){
/**
 * Created by german.peraferrer on 7/18/2015.
 */

// En la pagina que se utiliza el componente mete el estilo en el header
require('insert-css')(require('./style.css'));

Vue.component('nf-component', {
    name: 'nf-component',
    props: ['title', 'list', 'onClick', 'filter'],
    template: require('./tmpl-nf-component.html'),

    // Metodos internos del componente
    methods: {
        remove: function(e) {
            this.list.splice(e.targetVM.$index, 1);
        },
        isEmpty: function() {
            this.empty = !(this.list.length > 0);
            return this.empty;
        },
        click: function(e) {
            // Verificamos si han definido evento on-click
            if (this.onClick !== undefined) {
                // Invocamos el metodo asociado al evento
                this.onClick(this.list[e.targetVM.$index]);
            }
        }
    },

    // Escuchamos los cambios el las propiedades que necsitamos
    watch: {
        list: {
            handler: function (val, oldVal) {
                // Una vez que se compilo verificamos si hay datos para actualizar el estado
                this.isEmpty();
            },
            // Escuchamos si algun dato de un objeto cambio, para este ejemplo no ser�a necesario
            deep: true
        }

    },

    // Inicializaci�n de datos por default
    data: function() {
        return {
            // Creamos una propiedad interna del componente
            empty: true,
            emptyMessage: 'No hay datos ..',
            search: ''
        };
    },

    // Eventos que se ejecuta cuando se termina de compilar el componente
    compiled: function() {
        // Una vez que se compilo verificamos si hay datos para actualizar el estado
        this.isEmpty();
    }
});
},{"./style.css":3,"./tmpl-nf-component.html":4,"insert-css":1}],3:[function(require,module,exports){
module.exports = '.hide {\n    display: none;\n}\n\nul {\n    margin: 0;\n    padding: 0;\n}\n\nli > div.done, .demo li > div.done {\n    color: #7f8c8d;\n    text-decoration: line-through;\n}\n\nli > div {\n    display: inline-flex;\n    width: 90%;\n    cursor: pointer;\n    padding-left: 10px;\n}\n\n.filter {\n    background-color: #e0e0e0;\n    height: 20px;\n    padding: 10px;\n}\n\n.list {\n    border: 1px solid #acacac;\n    margin: 5px;\n}\n\n.expand-transition {\n    transition: all .3s ease;\n    height: 20px;\n    padding: 10px;\n    background-color: #eee;\n    overflow: hidden;\n    border-top: 1px solid rgb(217, 217, 217);\n}\n\n.expand-enter, .expand-leave {\n    height: 0;\n    padding: 0 10px;\n    opacity: 0;\n}';
},{}],4:[function(require,module,exports){
module.exports = '<div class="list">\n    <div class="filter" nf-show="filter">\n        <label for="search">Filtrar:</label>\n        <input id="search" nf-model="search" type="text"/>\n    </div>\n    <div>\n        <ul>\n            <li nf-if="empty"\n                nf-transition="expand">\n                <div nf-text="emptyMessage"></div>\n            </li>\n\n            <li nf-repeat="list | filterBy search"\n                nf-transition="expand">\n                <button nf-on="click: remove">X</button>\n                <div nf-text="content"\n                     nf-class="done: done"\n                     nf-on="\n                    click: done = !done,\n                    click: click\n                 "></div>\n            </li>\n        </ul>\n    </div>\n</div>\n';
},{}]},{},[2]);
