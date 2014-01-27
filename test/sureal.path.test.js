describe("sureal.path", function() {
  it('should be a function', function() {
    sureal.path.should.be.type('function');
  });
  it("should return an object", function() {
    sureal.path().should.be.an.Object;
  });
  describe("path Parameter", function() {
    it("should only accept strings", function() {
      (function() {
        var path = sureal.path({});
      }).should.throw();
      (function() {
        var path = sureal.path([]);
      }).should.throw();
    });
  });
  describe("Object", function() {
    var path = sureal.path();
    it(".predicate should exist as a property", function() {
      path.should.have.property("predicate");
    });
    it(".subject should exist as a property", function() {
      path.should.have.property("subject");
    });
    it(".identifier should exist as a property", function() {
      path.should.have.property("identifier");
    });
    describe("default value", function() {
      var path = sureal.path();
      it("should be NULL for predicate, subject and identifier property", function() {
        path.predicate.should.be.empty;
        path.subject.should.be.empty;
        path.identifier.should.be.empty;
      });
    });
    it("subject property should equal anything before the first '/' in the path parameter.", function() {
      var path = sureal.path("bob/address");
      path.subject.should.equal("bob");
    });
    it("pedicate property should equal anything after the first '/' and/or before the second '/'.", function() {
      var path = sureal.path("bob/address");
      path.predicate.should.equal("address");
    });
    it("identifier property should equal anything after the ssecond '/'.", function() {
      var path = sureal.path("bob/address/9");
      path.identifier.should.equal("9");
    });
    it("Should set identifier to false if there is a predicate but no identifier", function() {
      var path = sureal.path("bob/address");
      path.identifier.should.be.false;
    });
  });
});
describe("sureal.path.validate", function() {
  it("should be a function", function () {
    sureal.path.validate.should.be.type('function');
  });
  it("should not throw if passed a valid sureal.path Object", function() {
    (function() {
      var path = sureal.path();
      sureal.path.validate(path);
    }).should.not.throw();
  });
  it("should throw an error if subject is missing", function () {
    (function() {
      var path = {}
      sureal.path.validate(path);
    }).should.throw();
  });
  it("should throw an error if predicate is missing", function () {
    (function() {
      var path = {subject: ""}
      sureal.path.validate(path);
    }).should.throw();
  });
  it("should throw an error if identifier is missing", function () {
    (function() {
      var path = {subject: "", predicate: ""}
      sureal.path.validate(path);
    }).should.throw();
  });
});

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
  });
});
