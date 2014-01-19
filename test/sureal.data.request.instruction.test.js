describe("sureal.data.request.instruction", function() {
  describe(".variable", function() {
    it("should be a function", function() {
      sureal.data.request.instruction.variable.should.be.type('function');
    });
    describe("called with no params return object", function() {
      var v = sureal.data.request.instruction.variable();
      
      it("should have property final, that is true", function() {
        v.should.have.property("final");
        v.final.should.be.true;
      });
      it("should have property name, that is 0", function() {
        v.should.have.property('name');
        v.name.should.equal(0);
        
      });
      it("should have method next", function(){
        v.next.should.be.type('function');
      });
      describe("next method return object", function() {
        var v2 = v.next();
        it("should have a property name incremented", function() {
          v2.should.have.property('name');
          v2.name.should.equal(1);
        });
        it("should have a property final that is false", function() {
          v2.final.should.be.false;
        });
      });
      describe("next method return object when called a second time", function() {
        var v3 = v.next();
        it("should have a property name incremented agian", function() {
          v3.should.have.property('name');
          v3.name.should.equal(2)
        });
      });

    });
  });
  describe(".lookupPart", function() {
    it("should be a function", function() {
      sureal.data.request.instruction.lookupPart.should.be.type('function');
    });
    var v = sureal.data.request.instruction.variable();
    var p = sureal.data.request.instruction.lookupPart("=", "bob", v);
    it("should return an object with a operator property matching the first param", function() {
        p.should.have.property("operator");
        p.operator.should.equal('=');
    });
    it("should return an object with a value property matching the second param", function() {
        p.should.have.property("value");
        p.value.should.equal('bob');
    });
    it("should return an object with a variable property matching the third param", function() {
        p.should.have.property("variable");
        p.variable.should.equal(v);
    });
  });
  describe(".lookup", function() {
    it("should be a function", function() {
      sureal.data.request.instruction.lookup.should.be.type('function');
    });
    var v = sureal.data.request.instruction.variable();
    var v1 = v.next();
    var v2 = v.next();
    var v3 = v.next();
    var l = sureal.data.request.instruction.lookup(v, v1, v2, v3);
    it("should return an object with a subject property matching the first param", function() {
      l.should.have.property("subject");
      l.subject.should.eql(v);
    });
    it("should return an object with a predicate property matching the second param", function() {
      l.should.have.property("predicate");
      l.predicate.should.eql(v1);
    });
    it("should return an object with a object property matching the third param", function() {
      l.should.have.property("object");
      l.object.should.eql(v2);
    });
    it("should return an object with a identifier property matching the fourth param", function() {
      l.should.have.property("identifier");
      l.identifier.should.eql(v3);
    });
    it("should return an object with a type property of 'LOOKUP'", function() {
      l.should.have.property("type");
      l.type.should.eql("LOOKUP");
    });
  });
/**  intersectCreation: function(test) {
    test.equal(typeof aspot.query.instruction.intersect, 'function', "Should have instuction.intersect function");
    inst = aspot.query.instruction.intersect("bob", "joe");
    test.equal(inst.lhs, "bob", " aspot.query.instruction.intersect should return an object with the lhs passed in");
    test.equal(inst.rhs, "joe", " aspot.query.instruction.intersect should return an object with the rhs passed in");
    test.equal(inst.type, "INTERSECT", " aspot.query.instruction should return an object with type LOOKUP");
    test.done();
  },*/

  describe(".intersect", function() {
    it("should be a function");
    it("should return an object with a lhs property matching the first param");
    it("should return an object with a rhs property matching the second param");
    it("should return an object with a type property of 'INTERSECT'");
  });
});
