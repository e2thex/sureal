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
  describe("return object", function() {
    it('should have a execute method');
    /*
    if('should have if first param is a string then it should be converted to a sural.path and stored as path attribute', function() {

      var path = "bob/name/3";
      var request = sureal.rest.request.get(path);
      var obj = sureal.path(path);
      request.path.should.eql(obj);
      
    });
    */
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
