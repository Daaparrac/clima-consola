const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [{
        value: 1,
        name: `${ '1.'.green } Buscar ciudad`
    }, {
        value: 2,
        name: `${ '2.'.green } Historial`
    }, {
        value: 0,
        name: `${ '0.'.green } Salir \n`
    }, ]
}];

const inquirerMenu = async() => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una Opcion'.white);
    console.log('========================='.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;

}
const pausa = async() => {
    const enter = [{
        type: 'input',
        name: 'pausa',
        message: `\nPresione ${ 'ENTER'.green } para continuar\n`,
    }];
    await inquirer.prompt(enter);
}

const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'Ciudad',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'por favor ingrese un valor';
            }
            return true;
        }
    }];
    const { Ciudad } = await inquirer.prompt(question);
    return Ciudad
}

const listarLugares = async(lugares = []) => {

    const choices = lugares.map((lugar, i) => {
        const idx = `${i+1}`.green;

        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione Lugar: ',
        choices
    }];

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const pregunta = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoChecklist = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i+1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'borrarSeleccione',
        choices
    }];

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}