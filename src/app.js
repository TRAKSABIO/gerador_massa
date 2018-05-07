const express = require('express');
const app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index');
const cpf = require('./routes/cpf');
const cpnj = require('./routes/cpnj');
const contaBancaria = require('./routes/contaBancaria');
const geradorDados = require('./routes/geradorDados');


app.use('/', index);
app.use('/cremosinha', index);
app.use('/cremosinha/contas-bancarias', contaBancaria)
app.use('/cremosinha/cpf', cpf)
app.use('/cremosinha/cnpj', cpnj)
app.use('/cremosinha/gerar-massa', geradorDados)

module.exports = app;