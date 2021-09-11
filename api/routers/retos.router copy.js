const express = require('express');
const router = express.Router()

const controller = require('../controllers/retos.controller')

router.post('/retos', async (req, res) => {
    let reto = req.body
    try {
        let respuesta_db = await controller.crearReto(reto)
        let info = respuesta_db.rowCount == 1 ? `Reto creado: ${reto.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Reto creado correctamente' : 'No se creo el reto.'
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

router.put('/retos', async (req, res) => {
    let reto = req.body
    try {
        let respuesta_db = await controller.modificarReto(reto)
        let info = respuesta_db.rowCount == 1 ? `Reto modificado: ${reto.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Reto modificado correctamente' : 'No se modifico el reto.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

router.delete('/retos/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarReto(id)
        let info = respuesta_db.rowCount == 1 ? `Reto eliminado: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Reto eliminado correctamente' : 'No se eliminado el reto.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }

})

router.get('/retos/:id?', (req, res) => {
    let id = req.params.id
    controller.consultarRetos(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Retos consultados', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })

})

module.exports = router