const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearUsuario = async (user) => {
    const sql = 'INSERT INTO public.usuarios (id, nombre_completo, cargo, clave,usuario, telefono, correo) VALUES($1, $2, $3, md5($4), $5, $6, $7);'
    const datos = [user.id, user.nombre_completo, user.cargo, user.contraseña, user.usuario, user.telefono, user.correo]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarUsuarios = async (id) => {
    let sql = 'SELECT id, nombre_completo, cargo, usuario, telefono, correo  FROM usuarios'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarUsuario = async (id) => {
    const sql = 'DELETE FROM public.usuarios WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarUsuario = async (usuario) => {
    const sql = `UPDATE public.usuarios SET nombre_completo=$1, cargo=$2, usuario=$3, telefono=$4, correo=$5  WHERE id=$6;`
    const datos = [usuario.nombre_completo, usuario.cargo, usuario.usuario, usuario.telefono, usuario.correo, usuario.id]
    return await _pg.ejecutarQuery(sql, datos)
}

const login = async (credenciales) => {
    let sql = 'SELECT id, nombre_completo, cargo, usuario, telefono, correo FROM usuarios WHERE id=$1 and clave=md5($2)'
    const datos = [credenciales.id, credenciales.clave]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = {crearUsuario, consultarUsuarios, eliminarUsuario, modificarUsuario, login }