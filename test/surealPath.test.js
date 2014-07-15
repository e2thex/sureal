describe("@module surealPath", function() {
  path = surealPath();
  describe("@function surealPath it @is used to create a SurealPath from a path describe in a string", function() {
    it('should be a function', function() {
      path.should.be.type('function');
    });
    it("should @return a @type SurealPath", function() {
      var obj = path();
      obj.should.be.an.Object;
    });
    it("should accept a @param path of @type String", function() {
      (function() {
        var path = path({});
      }).should.throw();
      (function() {
        var path = path([]);
      }).should.throw();
    });
    describe("The @class SurealPath @is an object that describes a path to a sureal endpoint ", function() {
      var pathObj = path();
      it("should have @property predicate", function() {
        pathObj.should.have.property("predicate");
      });
      it("should have @property subject", function() {
        pathObj.should.have.property("subject");
      });
      it("should have @property identifier", function() {
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
  describe("The @function surealPath.validate @is used to validate a object as a surealPath", function() {
    it("should be a function", function () {
      path.validate.should.be.type('function');
    });
    it("should no @throw @type error ifa pathObject is the @param candidate of @type Anything which @is the item to check", function() {
      (function() {
        var pathObj = path();
        path.validate(pathObj);
      }).should.not.throw();
    });
    it("should @throw error if subject is missing", function () {
      (function() {
        var pathObj = {}
        path.validate(pathObj);
      }).should.throw();
    });
    it("should @throw an error if predicate is missing", function () {
      (function() {
        var pathObj = {subject: ""}
        path.validate(pathObj);
      }).should.throw();
    });
    it("should @throw an error if identifier is missing", function () {
      (function() {
        var pathObj = {subject: "", predicate: ""}
        path.validate(pathObj);
      }).should.throw();
    });
    it("should @return @type SurealPath that @is the object pass in as the candidate", function() {
        var pathObj = path();
        var retPathObj = path.validate(pathObj);
        retPathObj.should.equal(pathObj);
    });
  });
});
