const express = require('express');
const router = express.Router()

const controller = require('../controllers/documentos.controller')

router.post('/documentos', async (req, res) => {
    let documento = req.body
    try {
        let respuesta_db = await controller.crearDocumento(documento)
        let info = respuesta_db.rowCount == 1 ? `Documento creado: ${documento.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Documento creado correctamente' : 'No se creo el documento.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `El documento (${documento.id}) ya esta creado.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }
})

router.put('/documentos', async (req, res) => {
    let documento = req.body
    try {
        let respuesta_db = await controller.modificarDocumento(documento)
        let info = respuesta_db.rowCount == 1 ? `Documento modificado: ${documento.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Documento modificado correctamente' : 'No se modifico el documento.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

router.delete('/documentos/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarDocumento(id)
        let info = respuesta_db.rowCount == 1 ? `Reto eliminado: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Reto eliminado correctamente' : 'No se eliminado el retp.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }

})

router.get('/documentos/:id?', (req, res) => {
    let id = req.params.id
    controller.consultarDocumentos(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Documentos consultados', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })

})


module.exports = router