const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/grafico/:indice', async (req, res) => {
    const time = new Date();
    const day = time.getDate();
    time.setDate(day+15);
    const month = time.getMonth() + 1;
    const timeQuery = time.getFullYear() + '-' + month + '-' + time.getDate();
    const { indice } = req.params;
    const datos = await pool.query('SELECT * FROM datos WHERE indice = ? AND fecha <= ?', [indice, timeQuery]);
    const datosExtraidos = JSON.stringify(datos);
    res.send(datosExtraidos);
});

module.exports = router;