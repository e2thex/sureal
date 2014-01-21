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
    it("should have a identifier property", function() {
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
    it("should parse everything after the third '/' to identifier", function() {
      var path = sureal.path("bob/address/9");
      path.identifier.should.equal("9");
    });
    it("Should set identifier to false if there is a predicate but no identifier", function() {
      var path = sureal.path("bob/address");
      path.identifier.should.be.false;
    });
  });
  describe("is_a", function() {
    it("should be a function", function () {
      sureal.path.is_a.should.be.type('function');
    });
    it("should return false if there is no param", function () {
      sureal.path.is_a().should.be.false;
    });
    it("should return False if a obj passed is missing predicate, subject or identifier", function() {
      var item = {subject:"",identifier:""};
      sureal.path.is_a(item).should.be.false;
      var item = {predicate:"",identifier:""};
      sureal.path.is_a(item).should.be.false;
      var item = {predicate:"", subject:""};
      sureal.path.is_a(item).should.be.false;
    });
  });
});

