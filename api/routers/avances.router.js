const express = require('express');
const router = express.Router()

const controller = require('../controllers/avances.controller')

router.post('/avances', async (req, res) => {
    let avance = req.body
    try {
        let respuesta_db = await controller.crearAvance(avance)
        let info = respuesta_db.rowCount == 1 ? `Avance creado: ${avance.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Avance creado correctamente' : 'No se creo el avance.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `El Avance (${avance.id}) ya esta creado.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }
})

router.put('/avances', async (req, res) => {
    let avance = req.body
    try {
        let respuesta_db = await controller.modificarAvance(avance)
        let info = respuesta_db.rowCount == 1 ? `Avance modificado: ${avance.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Avance modificado correctamente' : 'No se modifico el avance.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

router.delete('/avances/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarAvance(id)
        let info = respuesta_db.rowCount == 1 ? `Avance eliminado: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Avance eliminado correctamente' : 'No se eliminado el avance.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }

})

router.get('/avances/:id?', (req, res) => {
    let id = req.params.id
    controller.consultarAvances(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Avances consultados', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })

})


module.exports = router