//Importa as dependencias que acabamos de instalar
const express = require('express');
const path = require('path');

const app = express();

// Serve os arquivos estaticos da pasta dist (gerada pelo ng build)
app.use(express.static(__dirname + '/dist/pedido-medico-front'));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/pedido-medico-front/index.html'));
});

// Inicia a aplicacao pela porta configurada
app.listen(process.env.PORT || 8080);
