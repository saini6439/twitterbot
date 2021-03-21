var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'Yijp56CQO0mPIRFhagTMq6vbN',
    consumer_secret: 'XCNjqVguR8CIdpPQMDIqNfhjlP6f8jljQdrFOXKJ8t29oUVuXD',
    access_token_key: '597394873-6ezXBzn277a8pUF0CnLCBruAJLtd9uJ0Q94Vlsh9',
    access_token_secret: 'neJI8gJbuLOZGwgNrLIJxC09kRxN09RkKfqD1EnuGgkpm',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })
  
  //
  //  tweet 'hello world!'
  //
 