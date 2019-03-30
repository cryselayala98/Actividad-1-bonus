const {listado_de_cursos, buscar_curso, mostrar_cursos} = require('./listacursos');
const fs = require('fs');
const express = require('express')
const app = express()

const opciones={
  id:{
    default:5,
    alias:'i'
  },
  nombre_est:{
    default:'sin nombre',
    alias:'n'
  },
  identificacion_estudiante:{
    default:0,
    alias:'c'
  }
}

let matricularse = (opcion)=>{

  texto ='<h3>*****NUEVA PREMATRICULA*****</h3>'+'<strong>Id Curso: </strong>'+opcion['id']+
  '<br><strong>Curso Preinscrito: </strong>'+opcion['nombre']+
  '<br><strong>Numero de horas: </strong>'+opcion['duracion']+
  '<br><strong>Valor: </strong>'+opcion['valor']+
  '<br><strong>Nombre del estudiante: </strong>'+argv.nombre_est+
  '<br><strong>Identificacion del Estudiante: </strong>'+argv.identificacion_estudiante+'\n';

  fs.writeFile("./matriculas.txt", texto, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("Se ha Generado la Matrícula");
});

}

const argv = require('yargs')
            .command('inscribir', 'inscribir un curso', opciones)
            .argv

if(argv._[0]=='inscribir'){//modulo inscribir curso
  let opcion = buscar_curso(argv.id);
  if(!opcion || argv.nombre_est=='sin nombre' || argv.identificacion_estudiante==0){ //digitar todos los datos
    console.log('Opción Incorrecta.\n\n');
    mostrar_cursos();
  }else {
    matricularse(opcion);
  }

}else{
  mostrar_cursos();
}

/*creando servidor*/
app.get('/', function (req, res) {
  res.send(texto)
})

app.listen(3000)
