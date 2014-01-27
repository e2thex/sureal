sinon = require("sinon");
describe("Sureal Global", function() {
  describe("Object.prototype.surealValidate", function() {
    it("should add a new surealValidate method to all objects", function() {
      var obj = {};
      obj.surealValidate.should.be.type('function');
    });
    it("new method surealValidate should return self", function() {
      var obj = {"bob" : "sam"};
      obj.surealValidate(function () {}).should.equal(obj);
    });
    it("new method surealValidate should call the validator with this as the parameter", function() {
      var obj = {"bob" : "sam"};
      var cb = sinon.spy();
      obj.surealValidate(cb);
      cb.calledWith(obj);
    });
  });
});
