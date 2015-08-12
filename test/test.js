var http = require('http');
var assert = require('assert');
var sampleRequest = JSON.stringify(require('./sample_request.json'));
var sampleResponse = JSON.stringify(require('./sample_response.json'));

require('../server');

describe('Filter shows', function () {
  it('filters shows which have DRM enabled and which have at least one episode', function (done) {
    var postResponseHandler = function (res) {
      var responseBuffer = [];
      res.on('data', function (chunk) {
        responseBuffer.push(chunk);
      });
      res.on('end', function () {
        var responseString = responseBuffer.join('');
        assert.equal(responseString, sampleResponse);
        done();
      });
    };

    sampleRequest = 'aa';

    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': sampleRequest.length
      }
    };

    var postRequest = http.request(requestOptions, postResponseHandler);
    postRequest.write(sampleRequest);
    postRequest.end();
  });
});