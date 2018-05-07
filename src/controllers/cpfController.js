var request = require("request");

var cpf = {};
var options = {
  method: 'POST',
  url: 'https://www.4devs.com.br/ferramentas_online.php',
  qs: { acao: 'gerar_cpf', pontuacao: 'N', cpf_estado: '' },
  headers:
    {
      'Postman-Token': '53cf840b-0e54-4574-a1a7-8344c6b6732b',
      'Cache-Control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
  formData: { acao: 'gerar_cpf', pontuacao: 'N', cpf_estado: '' }
};


exports.get = (req, res, next) => {
  request(options, function (error, response, body) {
    if (error) {
      res.status(200).send(error);
    } else {
      cpf.codigo = body;
      res.status(200).send(cpf);
      console.log(body);
    }

  });

};


