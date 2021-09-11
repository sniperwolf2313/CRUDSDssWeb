const express = require('express');
const router = express.Router()

const controller = require('../controllers/tiporeto.controller')

router.post('/tiporeto', async (req, res) => {
    let tiporeto = req.body
    try {
        let respuesta_db = await controller.crearTipoReto(tiporeto)
        let info = respuesta_db.rowCount == 1 ? `Tipo_reto creado: ${tiporeto.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Tipo_reto creado correctamente' : 'No se creo el usuario.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `El tipo reto (${tiporeto.id}) ya esta creado.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }
})

router.put('/tiporeto', async (req, res) => {
    let tiporeto = req.body
    try {
        let respuesta_db = await controller.modificarTipoReto(tiporeto)
        let info = respuesta_db.rowCount == 1 ? `Tipo reto modificado: ${tiporeto.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Tipo reto modificado correctamente' : 'No se modifico el tipo reto.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

router.delete('/tiporeto/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarTipoReto(id)
        let info = respuesta_db.rowCount == 1 ? `Tipo reto eliminado: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Tipo reto eliminado correctamente' : 'No se eliminado el tipo reto.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }

})

router.get('/tiporeto/:id?', (req, res) => {
    let id = req.params.id
    controller.consultarTipoRetos(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Tipos retos consultados', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })

})


module.exports = router