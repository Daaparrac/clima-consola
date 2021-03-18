require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {

    let opt;
    const busquedas = new Busquedas();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //mostrar mensaje
                const lugar = await leerInput('Ciudad: ');

                // Buscar los lugares 
                const lugares = await busquedas.ciudad(lugar);

                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === '0') continue;

                // guardar en DB

                const lugarsel = lugares.find(l => l.id === id)

                busquedas.agregarHistorial(lugarsel.nombre);

                //Clima
                const clima = await busquedas.climaLugar(lugarsel.lat, lugarsel.lng);

                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad: ', lugarsel.nombre.green)
                console.log('Lat: ', lugarsel.lat)
                console.log('Lng: ', lugarsel.lng)
                console.log('Temperatura: ', clima.temp)
                console.log('Maxima: ', clima.max)
                console.log('Minima: ', clima.min)
                console.log('Como está el clima: ', clima.desc.green)
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i+1}`.green;
                    console.log(`${idx}. ${lugar}`)
                });
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0);


}

main();