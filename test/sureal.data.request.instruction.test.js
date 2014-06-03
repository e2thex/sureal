describe("surealInstruction() @module", function() {
  var inst = surealInstruction();
  var v = inst.variable();
  var v2 = v.next();
  var v3 = v.next();
  describe("@class SurealInstructionVariable", function() {
    it("@property {bool} final: Awnsers the question is this the last variable (immutable)", function() {
      v.should.have.property("final");
      var a = v.final;
      v.final = "something else";
      v.final.should.equal(a);
    });
    it("@property {number} name : the unique id for the variable should be 0 (immutable)", function() {
      v.should.have.property('name');
      var a = v.name;
      v.name = "something else";
      v.name.should.equal(a);
    })
    describe("@method next()", function() {
      it("should be a function", function(){
        v.next.should.be.type('function');
      });
      describe("@return {variable} : next method return object", function() {
        it("property name should be increment of parent name", function() {
          v2.should.have.property('name');
          v2.name.should.equal(1);
        });
        it("property final that is false", function() {
          v2.final.should.be.false;
        });
        describe("next method return object when called a second time", function() {
          it("should have a property name incremented agian", function() {
            v3.should.have.property('name');
            v3.name.should.equal(2)
          });
        });
      });
    });
  });
  describe(".variable() @constructs SurealInstructionVariable", function() {
    it("should be a function", function() {
      inst.variable.should.be.type('function');
    });
    describe("@return {Variable} : a variable lookupPart", function() {
      it("final property should be true", function() {
        v.final.should.be.true;

      });
      it("name property should be true", function() {
        v.name.should.equal(0);
      });
    });
  });
  describe("@class SurealInstructionLookupPart", function() {
    var v = inst.variable();
    var p = inst.lookupPart("=", "bob", v);
    it("@property {string} operator : the type of comparison", function() {
      p.should.have.property("operator");
    });
    it("@property {string} value : the value to compare", function() {
      p.should.have.property("value");
    });
    it("@property {SurealInstrctionVariable} value : the variable to which the campare is associated", function() {
      p.should.have.property("variable");
    });
  });
  describe(".lookupPart() @constructs", function() {
    var v = inst.variable();
    var p = inst.lookupPart("=", "bob", v);
    it("should be a function", function() {
      inst.lookupPart.should.be.type('function');
    });
    it("@param {string} operator : should became the operator", function() {
        p.operator.should.equal('=');
    });
    it("@param {string} value : should became the value property", function() {
        p.value.should.equal('bob');
    });
    it("@param {Variable} variable : should became the variable property", function() {
        p.variable.should.equal(v);
    });
    it.skip("@return {SurealInstructionLookupPart} : should return a instruction lookup part", function () {
    });
  });
  describe(".lookup() create a lookup instruction object @constructs", function() {
    it("should be a function", function() {
      sureal.data.request.instruction.lookup.should.be.type('function');
    });
    var v = sureal.data.request.instruction.variable();
    var v1 = v.next();
    var v2 = v.next();
    var v3 = v.next();
    var l = sureal.data.request.instruction.lookup(v, v1, v2, v3);
    it("@param {instructionItem}  subject: should become the subject property", function() {
      l.should.have.property("subject");
      l.subject.should.eql(v);
    });
    it("@param {instructionItem} predicate: should become the predicate property", function() {
      l.should.have.property("predicate");
      l.predicate.should.eql(v1);
    });
    it("@param {instructionItem} object: should become the object property", function() {
      l.should.have.property("object");
      l.object.should.eql(v2);
    });
    it("@param {instructionItem} identifier: should become the identifier property", function() {
      l.should.have.property("identifier");
      l.identifier.should.eql(v3);
    });
    describe("@return {instruction} : return a instruction object", function() {
      it("which as a type property of 'LOOKUP'", function() {
        l.should.have.property("type");
        l.type.should.eql("LOOKUP");
      });
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
