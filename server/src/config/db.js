const mongoose = require('mongoose');

async function main() {
    mongoose.connect("mongodb+srv://rishi_solanki:Indore%40123@rishiserver.kdybcms.mongodb.net/Internship",{
     useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: true
    });
}
module.exports = main;
