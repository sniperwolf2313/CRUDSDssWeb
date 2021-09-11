const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearPostulacion = async (postulacion) => {
    const sql = 'INSERT INTO public.postulaciones (id, id_usuario,id_reto, descripcion) VALUES($1, $2, $3, $4);'
    const datos = [postulacion.id, postulacion.id_usuario,postulacion.id_reto, postulacion.descipcion]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarPostulaciones = async (id) => {
    let sql = 'SELECT id, id_usuario,id_reto, descripcion  FROM postulaciones'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarPostulacion = async (id) => {
    const sql = 'DELETE FROM public.postulaciones WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarPostulacion = async (postulacion) => {
    const sql = `UPDATE public.postulaciones SET id_usuario=$1, id_reto=$2, descripcion=$3 WHERE id=$4;`
    const datos = [postulacion.id_usuario,postulacion.id_reto, postulacion.descipcion, postulacion.id]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = { crearPostulacion, consultarPostulaciones, eliminarPostulacion, modificarPostulacion}