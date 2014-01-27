sinon = require("sinon");
describe("sureal.rest.request.delete", function() {
  it("should be a function", function() {
    sureal.rest.request.delete.should.be.type('function');
  });
  it("should accept a path string as the first param", function() {
    (function() {
      sureal.rest.request.delete("bob/name");
    }).should.not.throw();
  });
  describe("'s return object", function() {
    it("should have a execute method", function() {
      var request = sureal.rest.request.delete("bob");
      request.execute.should.be.type("function");
    });
    describe("when created with a subject only path then its execute method, called with a store object as its argument,", function() {
      it("should throw an error");
    });
    describe("when created with a subject/attribute only path then its execute method, called with a store object as its argument,", function() {
      it("should throw an error");
    });
    describe("when created with a subject/attribute/identifier only path then its execute method, called with a store object as its argument,", function() {
      var request = sureal.rest.request.delete("sam/address/123", "baseball");
      var matchInstFunc = function (value) {
        if(
          value.type == 'LOOKUP' &&
          value.subject.final === false &&
          value.predicate.final === false &&
          value.object.final === false &&
          value.identifier.variable.final === true &&
          value.identifier.operator === "=" &&
          value.identifier.value === "123"
        ) { return true;}
      };
      var matchInst = sinon.match(matchInstFunc);
      var store = { 
        update: function(inst, to) {
          if(matchInstFunc(inst)){
            return {
              results: [
                { 
                  from: {subject:"sam", predicate:"address", object:"home",  identifier:"123", order:"1"},
                  to: null
                }
              ]
            };
          }
       //   throw "Called query with incorrect instruction";
        }
      };
      var updateSpy = sinon.spy(store, "update");
      var restResponse = request.execute(store);
      it("it should call the stored objects update method with the correct instruction and to object", function() {
        store.update.calledWith(matchInst).should.be.true;
      });
      it("should return a restResponse with correct uri ", function() {
        restResponse.uri.should.equal("sam/address/123");
      });
      it("should return a restResponse with correct value ", function() {
        restResponse.value.should.equal("");
      });
      it("should return a restResponse with correct children", function() {
        restResponse.children.should.eql([]);
      });
      it("should return a restResponse with correct methods", function() {
        restResponse.methods.should.eql(["DELETE", "GET", "POST", "PUT"]);
      });
    });
  });
});
