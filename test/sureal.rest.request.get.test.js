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
describe("sureal.rest.request.get", function() {
  it('should be a function', function() {
    sureal.rest.request.get.should.be.type('function');
  });
  it('should accept path string as first param', function() {
    (function() {
      sureal.rest.request.get("bob/name");
    }).should.not.throw();
  });
  it('should accept query string as the second param', function() {
    (function() {
      sureal.rest.request.get("bob/name", '*[."name" = "bob"]');
    }).should.not.throw();
  });
  it('should return a sureal.rest.request Object', function() {
    (function() {
      sureal.rest.request.get("bob/name", '*[."name" = "bob"]').surealValidate(sureal.rest.request.validate);
    }).should.not.throw();
  });
  describe("Object", function() {
    it('should have a execute method', function() {
      var r = sureal.rest.request.get("bob");
      r.execute.should.be.type("function");
    });
    describe("when created with a subject only path then its execute method, called with a store object as its argument,", function() {
      //two different path that are in the system.
      var request = sureal.rest.request.get("bob");
      var request1 = sureal.rest.request.get("sam");
      var store = { query: function (inst) { 
        if(
          inst.type === 'LOOKUP' &&
          inst.subject.operator === "=" &&
          inst.subject.value === "bob" &&
          inst.predicate.final === true &&
          inst.object.final === false &&
          inst.identifier.final === false
        ) {
          return {results: [ "address", "phone"]}
        }
        if(
          inst.type === 'LOOKUP' &&
          inst.subject.operator === "=" &&
          inst.subject.value === "sam" &&
          inst.predicate.final === true &&
          inst.object.final === false &&
          inst.identifier.final === false
        ) {
          return {results: [ "street"]}
        }
        throw "Called query with incourect instruction";
      }};
      var restRespose = request.execute(store);
      var restRespose1 = request1.execute(store);
      it("should return a restResponse with correct uri ", function() {
        restRespose.uri.should.equal("bob");
        restRespose1.uri.should.equal("sam");
      });
      it("should return a restResponse with correct value ", function() {
        restRespose.value.should.equal("bob");
        restRespose1.value.should.equal("sam");
      });
      it("should return a restResponse with correct children", function() {
        restRespose.children.should.eql([{value:"address", uri:"bob/address"}, {value:"phone", uri:"bob/phone"}]);
        restRespose1.children.should.eql([{value:"street", uri:"sam/street"}]);
      });
      it("should return a restResponse with correct methods", function() {
        restRespose.methods.should.eql(["GET"]);
        restRespose1.methods.should.eql(["GET"]);
      });
    });
    describe("when created with a subject/attrubute path then its execute method, called with a store object as its argument", function() {
      var request = sureal.rest.request.get("sam/address");
      var request1 = sureal.rest.request.get("sam");
      var store = { query: function (inst) { 
        if(
          inst.type === 'LOOKUP' &&
          inst.subject.operator === "=" &&
          inst.subject.value === "sam" &&
          inst.predicate.operator === "=" &&
          inst.predicate.value === "address" &&
          inst.object.final === false &&
          inst.identifier.final === true
        ) {
          return {results: [ 
            {subject:"sam", predicate:"address", object:"home",  identifier:"123", order:"1"},
            {subject:"sam", predicate:"address", object:"work",  identifier:"321", order:"5"},
            {subject:"sam", predicate:"address", object:"work",  identifier:"222", order:"2"}
          ]};
        }
        throw "Called query with incourect instruction";
      }};
      var restRespose = request.execute(store);
      it("should return a restResponse with correct uri ", function() {
        restRespose.uri.should.equal("sam/address");
      });
      it("should return a restResponse with correct value ", function() {
        restRespose.value.should.equal("address");
      });
      it("should return a restResponse with correct children", function() {
        restRespose.children.should.eql([
          {value:"home", uri:"sam/address/123"},
          {value:"work", uri:"sam/address/222"},
          {value:"work", uri:"sam/address/321"},
        ]);
      });
      it("should return a restResponse with correct methods", function() {
        restRespose.methods.should.eql(["GET", "POST"]);
      });
    });
    describe("when created with a subject/attrubute/identifier path then its execute method, called with a store object as its argument", function() {
      var request = sureal.rest.request.get("sam/address/identifier496");
      var store = { query: function (inst) { 
        if(
          inst.type === 'LOOKUP' &&
          inst.subject.operator === "=" &&
          inst.subject.value === "sam" &&
          inst.predicate.operator === "=" &&
          inst.predicate.value === "address" &&
          inst.object.final === true &&
          inst.identifier.value === "identifier496" &&
          inst.identifier.operator === "=" 
        ) {
          return {results: [ "This is the home address"]}
        }
        throw "Called query with incourect instruction";
      }};
      var restRespose = request.execute(store);
      it("should return a restResponse with correct uri ", function() {
        restRespose.uri.should.equal("sam/address/identifier496");
      });
      it("should return a restResponse with correct value ", function() {
        restRespose.value.should.equal("This is the home address");
      });
      it("should return a restResponse with correct children", function() {
        restRespose.children.should.eql([]);
      });
      it("should return a restResponse with correct methods", function() {
        restRespose.methods.should.eql(["DELETE", "GET", "POST", "PUT"]);
      });
      /*
      */
    });
  });
});

describe("sureal.data.request.query", function() {
  it('should be a function');
  describe("return object", function() {
    it('should have method execute');
    describe("execute method", function() {
      it('should take a datasource as a param');
      it('should return a sureal.data.response');
    });
  });
});

describe("sureal.data.response", function() {
  it("should be a function");
  describe(".is_a", function() {
    it("should be a function");
  });
});

describe("sureal.dataStore.request.update", function() {
  
});
