var promise = require("promise");
var contaCorrenteService = require("../services/contaCorrenteService");

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


exports.get = (req, res, next) => {
    var banco = "";

        if (req.query.banco !== undefined)
        {
                banco = req.query.banco;
                options.formData.banco = buscarCodigoBancoFake(banco);
                if(options.formData.banco == '000')
                {
                  res.status(412).send({codigo: "999", descricao: "Código banco inválido!"});
                }
        } 
        
        console.log(options);
        request.post(options, function (error, response, body) {
        if (error)
        {
          res.status(500).send(error);
        } else
        {
          res.status(200).send(consultarContaCorrente(body));
        }
      });
};
 

function consultarContaCorrente(body)
{
    var documento = JSON.stringify(body);
    var banco = {};
    const documentFragment = parse5.parseFragment('<table>' + documento + '</table>');
    banco.nome = documentFragment.childNodes[1].childNodes[3].childNodes[1].attrs[3].value;
    conta.agencia = documentFragment.childNodes[7].childNodes[3].childNodes[1].attrs[3].value;
    conta.codigo = documentFragment.childNodes[9].childNodes[3].childNodes[1].attrs[4].value;
    
    if(banco.nome!= undefined)
    {
      banco.nome = banco.nome.replace('\\\"', '').replace('\\\"', '');
      banco.codigo = buscarCodigoBanco(banco.nome);
      conta.banco = banco;
    }
    if (conta.codigo !== undefined) {
      conta.codigo = conta.codigo.replace('-', '');
    }
    if(conta.codigo!= undefined)
    {
      conta.codigo = conta.codigo.replace('\\\"', '').replace('\\\"', '');
    }
    if (conta.agencia != undefined)
    {
      conta.agencia = conta.agencia.replace('\\\"', '').replace('\\\"', '');
    }
   return conta;   
}

function buscarCodigoBancoFake(codigo)
{
  switch (codigo) {
      case "237": //bradesco
        return "121";
      case "001": //Banco do Brasil
        return "2";      
      case "104"://Caixa
        return "5";      
      case "477"://Citibank
        return "85";      
     case "399": //HSBC
        return "14";
    case "341"://Itaú
        return "120";
    case "033": //Santander
        return "151";
    default:
        return "000";
  }
}

function buscarCodigoBanco(nomeBanco)
{
  switch (nomeBanco) {
      case "Bradesco":
        return "237";
      case "Banco do Brasil":
        return "001";      
      case "Caixa":
        return "104";      
      case "Citibank":
        return "477";      
     case "HSBC":
        return "399";
    case "Itaú":
        return "341";
    case "Santander":
        return "033";
    default:
        return "001";
  }
}