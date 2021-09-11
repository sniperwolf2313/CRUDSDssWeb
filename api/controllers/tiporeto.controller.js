const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearTipoReto= async (tipo_reto) => {
    const sql = 'INSERT INTO public.tipo_reto (id, nombre, descripcion) VALUES($1, $2, $3);'
    const datos = [tipo_reto.id, tipo_reto.nombre, tipo_reto.descripcion]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarTipoRetos = async (id) => {
    let sql = 'SELECT id, nombre, descripcion FROM tipo_reto'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarTipoReto = async (id) => {
    const sql = 'DELETE FROM public.tipo_reto WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarTipoReto = async (tipo_reto) => {
    const sql = `UPDATE public.tipo_reto SET nombre=$1, descripcion=$2 WHERE id=$3;`
    const datos = [ tipo_reto.nombre, tipo_reto.descripcion, tipo_reto.id]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = { crearTipoReto, consultarTipoRetos, eliminarTipoReto, modificarTipoReto}