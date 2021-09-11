const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearAvance = async (avance) => {
    const sql = 'INSERT INTO public.avances (id, id_usuario, id_reto, descripcion, fecha) VALUES($1, $2, $3, $4, $5);'
    const datos = [avance.id, avance.id_usuario, avance.id_reto, avance.descripcion, avance.fecha]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarAvances = async (id) => {
    let sql = 'SELECT id, id_usuario, id_reto, descripcion, fecha FROM avances'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarAvance = async (id) => {
    const sql = 'DELETE FROM public.avances WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarAvance = async (avance) => {
    const sql = `UPDATE public.avances SET id_usuario=$1, id_reto=$2, descripcion=$3, fecha=$4  WHERE id=$5;`
    const datos = [avance.id_usuario, avance.id_reto, avance.descripcion, avance.fecha, avance.id]
    return await _pg.ejecutarQuery(sql, datos)
}


module.exports = { crearAvance, consultarAvances, eliminarAvance, modificarAvance }