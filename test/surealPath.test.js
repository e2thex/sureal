describe("surealPath() Module", function() {
  path = surealPath();
  describe("Base", function() {
    it('should be a function', function() {
      path.should.be.type('function');
    });
    it("should return an object", function() {
      var obj = path();
      obj.should.be.an.Object;
    });
    describe("path Parameter", function() {
      it("should only accept strings", function() {
        (function() {
          var path = path({});
        }).should.throw();
        (function() {
          var path = path([]);
        }).should.throw();
      });
    });
    describe("Object", function() {
      var pathObj = path();
      it(".predicate should exist as a property", function() {
        pathObj.should.have.property("predicate");
      });
      it(".subject should exist as a property", function() {
        pathObj.should.have.property("subject");
      });
      it(".identifier should exist as a property", function() {
        pathObj.should.have.property("identifier");
      });
      describe("default value", function() {
        var pathObj = path();
        it("should be NULL for predicate, subject and identifier property", function() {
          pathObj.predicate.should.be.empty;
          pathObj.subject.should.be.empty;
          pathObj.identifier.should.be.empty;
        });
      });
      it("subject property should equal anything before the first '/' in the path parameter.", function() {
        var pathObj = path("bob/address");
        pathObj.subject.should.equal("bob");
      });
      it("pedicate property should equal anything after the first '/' and/or before the second '/'.", function() {
        var pathObj = path("bob/address");
        pathObj.predicate.should.equal("address");
      });
      it("identifier property should equal anything after the ssecond '/'.", function() {
        var pathObj = path("bob/address/9");
        pathObj.identifier.should.equal("9");
      });
      it("Should set identifier to false if there is a predicate but no identifier", function() {
        var pathObj = path("bob/address");
        pathObj.identifier.should.be.false;
      });
    });
  });
  describe("path.validate", function() {
    it("should be a function", function () {
      path.validate.should.be.type('function');
    });
    it("should not throw if passed a valid path Object", function() {
      (function() {
        var pathObj = path();
        path.validate(pathObj);
      }).should.not.throw();
    });
    it("should throw an error if subject is missing", function () {
      (function() {
        var pathObj = {}
        path.validate(pathObj);
      }).should.throw();
    });
    it("should throw an error if predicate is missing", function () {
      (function() {
        var pathObj = {subject: ""}
        path.validate(pathObj);
      }).should.throw();
    });
    it("should throw an error if identifier is missing", function () {
      (function() {
        var pathObj = {subject: "", predicate: ""}
        path.validate(pathObj);
      }).should.throw();
    });
  });
});
