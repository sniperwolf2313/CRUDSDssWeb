const express = require('express');
const router = express.Router()

const controller = require('../controllers/postulaciones.controller')

router.post('/postulaciones', async (req, res) => {
    let postulacion = req.body
    try {
        let respuesta_db = await controller.crearPostulacion(postulacion)
        let info = respuesta_db.rowCount == 1 ? `Postulacion creada: ${postulacion.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Postulacion creada correctamente' : 'No se creo la postulacion.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `El reto (${reto.id}) ya esta creado.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }
})

router.put('/postulaciones', async (req, res) => {
    let postulacion = req.body
    try {
        let respuesta_db = await controller.modificarPostulacion(postulacion)
        let info = respuesta_db.rowCount == 1 ? `Postulacion modificada: ${postulacion.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Postulacion modificada correctamente' : 'No se modifico la postulacion.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

router.delete('/postulaciones/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarPostulacion(id)
        let info = respuesta_db.rowCount == 1 ? `Postulacion eliminada: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Postulacion eliminada correctamente' : 'No se eliminado la Postulacion.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }

})

router.get('/postulaciones/:id?', (req, res) => {
    let id = req.params.id
    controller.consultarPostulaciones(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Postulaciones consultadas', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })

})


module.exports = router