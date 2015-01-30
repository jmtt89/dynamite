var mocha         = require('mocha')
  , chai          = require('chai')
  , sut           = require('../lib/ddb')
  , expect        = chai.expect;


describe('ddb', function() {

  describe('#test', function() {
    it('should return 1', function() {
      var result = sut.test();
      expect(result).to.equal(1);
    });
  });

});