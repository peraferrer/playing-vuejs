/**
 * Created by german.peraferrer on 7/18/2015.
 */

// En la pagina que se utiliza el componente mete el estilo en el header
require('insert-css')(require('./nf-component.css'));

Vue.component('nf-component', {
    name: 'nf-component',
    props: ['title', 'list', 'onClick', 'filter'],
    template: require('./nf-component.html'),

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
            // Escuchamos si algun dato de un objeto cambio, para este ejemplo no sería necesario
            deep: true
        }

    },

    // Inicialización de datos por default
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