const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearDocumento = async (documento) => {
    const sql = 'INSERT INTO public.documentos (id, id_reto, id_usuario, informacion) VALUES($1, $2, $3, $4);'
    const datos = [documento.id, documento.id_reto, documento.id_usuario, documento.informacion]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarDocumentos = async (id) => {
    let sql = 'SELECT id, id_reto, id_usuario, informacion FROM documentos'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarDocumento = async (id) => {
    const sql = 'DELETE FROM public.documentos WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarDocumento = async (documento) => {
    const sql = `UPDATE public.documentos SET id_reto=$1, id_usuario=$2, informacion=$3 WHERE id=$4;`
    const datos = [ documento.id_reto, documento.id_usuario, documento.informacion, documento.id]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = { crearDocumento, consultarDocumentos, eliminarDocumento, modificarDocumento }