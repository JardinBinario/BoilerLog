
//recibe el objeto model y la clase Schema de la libreria mongoose
import {model, Schema} from 'mongoose'

//recibe los estados validos de nuestro archivo de constantes
import {estadosValidos} from '../constants/constants'


//nuestro modelo o clase del objeto cita para guardar en base de datos
const Cita = new Schema({
    estado:{
        type: String,
        default: 'SIN_REVISAR',
        enum: estadosValidos
    },
    email:{
        type: String,
        default: false,
        required: [true, 'El email es requerido']
    },
    numeroTelefonico:{
        type: String,
        default:false,
        required:[true, 'El numero telefonico es requerido']
    },
    nombre:{
        type:String,
        default:false,
        required: [true, 'El nombre es requerido']
    },
    apellido:{
        type:String,
        default:false,
        required: [true, 'El apellido es requerido']
    },
    fechaDeseada:{
        type: Date,
        //TODO create datepicker input in /home
        default: Date.now(), 
        // required: [true, 'El apellido es requerido']
    },
    fechaCreada: {
        type: Date, 
        default: Date.now() 
    },

    // "start": "nodemon src/index --exec babel-node",

})


//métodos de Cita
Cita.methods.cambiarEstado = (estado) => {
    //TODO change estado de cita
    // Cita.find
}

//exportando el modelo para que sea visible en otros lugares donde necesitemos instanciarlo
export default model('citas', Cita)