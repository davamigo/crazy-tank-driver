var API = require('claudia-api-builder'),
	api = new API(),
	tank = require('./tank');

module.exports = api;

api.get('/', function () {
	'use strict';
	return 'OK';
});

api.get('/info', function () {
	'use strict';
	return {
		name: 'crazy-tank-driver',
		owner: 'crazy-tank-driver'
	};
});

api.post('/command', function (request) {
	'use strict';
	var map = request.body;
	return {
		command: tank(map)
	};
});

