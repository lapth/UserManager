var config = require('./config.json');
var fs = require('fs');

class AppConfig {
    getConfig() {
        return config;
    }

    getMongoURL() {
        var mongoURL = "mongodb://" + config.db.user + ":" + config.db.pw + "@" + config.db.url;
        return mongoURL;
    }

    getAllowedSites() {
        return config.allowedSites;
    }

    getTokenPrivateKey() {
        return fs.readFileSync('./config/token_pri_key', 'utf8');
    }

    getTokenPubKey() {
        return fs.readFileSync('./config/token_pub_key', 'utf8');
    }
}

var appConfig = new AppConfig;

module.exports = appConfig;