sinon = require("sinon");
describe("sureal.rest.request.is_a", function() {
  it('should be a function');
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
  describe("'s return object,", function() {
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
        restRespose.methods.should.eql(["DELETE", "GET"]);
        restRespose1.methods.should.eql(["DELETE", "GET"]);
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

describe("sureal.path", function() {
  it('should be a function', function() {
    sureal.path.should.be.type('function');
  });
  it("should return an object", function() {
    sureal.path().should.be.an.Object;
  });
  describe("return object Path", function() {
    var path = sureal.path();
    it("should have a predicate property", function() {
      path.should.have.property("predicate");
    });
    it("should have a subject property", function() {
      path.should.have.property("subject");
    });
    it("should have a position property", function() {
      path.should.have.property("position");
    });
    describe("default value", function() {
      var path = sureal.path();
      it("should be NULL for predicate, subject and position property", function() {
        path.predicate.should.be.empty;
        path.subject.should.be.empty;
        path.position.should.be.empty;
      });
    });
  });
  describe("Param", function() {
    it("should throw an error if the param pass is not a string", function() {
      (function() {
        var path = sureal.path({});
      }).should.throw();
      (function() {
        var path = sureal.path([]);
      }).should.throw();
    });
    it("should parse everything before a / to subject", function() {
      var path = sureal.path("bob/address");
      path.subject.should.equal("bob");
    });
    it("should parse everything after the second '/' to predicate", function() {
      var path = sureal.path("bob/address");
      path.predicate.should.equal("address");
    });
    it("should parse everything after the third '/' to position", function() {
      var path = sureal.path("bob/address/9");
      path.position.should.equal("9");
    });
    it("Should set position to 0 if there is a predicate but no position", function() {
      var path = sureal.path("bob/address/0");
      path.position.should.equal("0");
    });
  });
  describe("is_a", function() {
    it("should be a function", function () {
      sureal.path.is_a.should.be.type('function');
    });
    it("should return false if there is no param", function () {
      sureal.path.is_a().should.be.false;
    });
    it("should return False if a obj passed is missing predicate, subject or position", function() {
      var item = {subject:"",position:""};
      sureal.path.is_a(item).should.be.false;
      var item = {predicate:"",position:""};
      sureal.path.is_a(item).should.be.false;
      var item = {predicate:"", subject:""};
      sureal.path.is_a(item).should.be.false;
    });
  });
});

describe("sureal.dataStore.request.update", function() {
  
});
