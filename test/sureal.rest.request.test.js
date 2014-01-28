sinon = require("sinon");
describe("sureal.rest.request.validate", function() {
  it('should be a function', function() {
    sureal.rest.request.validate.should.be.type("function");
  });
  it('should not throw an error if there is a valid request', function() {
    var request = sureal.rest.request.delete("bob/sam/123");
    (function() {
      sureal.rest.request.validate(request);
    }).should.not.throw();
  });
  it('should throw an exception if is no execute method', function() {
    var request = {};
    (function() {
      sureal.rest.request.validate(request);
    }).should.throw();
  });
});
