const express = require('express')

const app = express()

app.use(express.json())

const router_usuario =  require('./routers/usuarios.router');
app.use(router_usuario)

const router_tiporeto =  require('./routers/tiporeto.router');
app.use(router_tiporeto)

const router_reto =  require('./routers/retos.router');
app.use(router_reto)

const router_postulacion =  require('./routers/postulaciones.router');
app.use(router_postulacion)

const router_documento =  require('./routers/documentos.router');
app.use(router_documento)

const router_avance =  require('./routers/avances.router');
app.use(router_avance)