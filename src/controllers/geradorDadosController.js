var casual = require("casual");
casual.register_locale("pt_BR");
//casual.register_provider(casual.pro);

var data = {}

exports.get = (req, res, next) => {

  casual.define('data', function () {
    var data = {};  
    var user = {
      email: casual.email,
      firstname: casual.first_name,
      lastname: casual.last_name,
      password: casual.password
    };
    var endereco = 
    {
      country : casual.country,
      zip: casual.zip, 
      city : casual.city,
      street: casual.street,
      address: casual.address,
      address1: casual.address1,
      address2: casual.address2,
      state: casual.state,
      state_abbr: casual.state_abbr,
      latitude: casual.latitude,
      longitude: casual.longitude,
      building_number: casual.building_number
    };

    var internet = 
    {
      ip: casual.ip,
      domain: casual.domain,
      url: casual.url,
      email: casual.email,
      user_agent: casual.user_agent
    };

    data.user = user;
    data.endereco = endereco;
    data.internet = internet;

    return data;
  });


  data = casual.data;

  res.status(200).send(data);
};


