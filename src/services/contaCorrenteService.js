var request = require("request");
const parse5 = require('parse5');
var conta = {};

var options = {
  method: 'POST',
  url: 'https://www.4devs.com.br/ferramentas_online.php',
  qs: { acao: 'gerar_conta_bancaria', estado: '', banco: '' },
  headers:
    {
      'Postman-Token': '80919f84-f1c4-436c-b27b-89ee57c7fa97',
      'Cache-Control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
  formData: { acao: 'gerar_conta_bancaria', estado: '', banco: '' }
};

exports.execute = function (conta) 
{
   request.post(options, function (error, response, body) {
    if (error) throw new Error(error);

    var a = consultarContaCorrente(body);
    return a;
  });
}


function consultarContaCorrente(body)
{

    var documento = JSON.stringify(body);

    const documentFragment = parse5.parseFragment('<table>' + documento + '</table>');

    var div = documentFragment.childNodes[1];
    conta.banco = documentFragment.childNodes[1].childNodes[3].childNodes[1].attrs[3].value;
    conta.agencia = documentFragment.childNodes[7].childNodes[3].childNodes[1].attrs[3].value;
    conta.contaCorrente = documentFragment.childNodes[9].childNodes[3].childNodes[1].attrs[4].value;
    if (conta.contaCorrente !== undefined) {
      conta.contaCorrente = conta.contaCorrente.replace('-', '');
    }
    console.log(conta);
     return conta;   
}
