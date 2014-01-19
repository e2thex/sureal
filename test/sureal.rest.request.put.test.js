describe("sureal.rest.request.put", function() {
  it("should be a function", function() {
    sureal.rest.request.put.should.be.type('function');
  });
  it("should accept a path string as the first param", function() {
    (function() {
      sureal.rest.request.put("bob/name");
    }).should.not.throw();
  });
  it("should accept a value string as a the second param", function() {
    (function() {
      sureal.rest.request.put("bob/name", '*[."name" = "bob"]');
    }).should.not.throw();
  });
  describe("'s return object", function() {
    it("should have a execute method", function() {
      var request = sureal.rest.request.put("bob");
      request.execute.should.be.type("function");
    });
    describe("when created with a subject only path then its execute method, called with a store object as its argument,", function() {
      it("should throw an error");
    });
    describe("when created with a subject/attribute only path then its execute method, called with a store object as its argument,", function() {
      it("should throw an error");
    });
    /*
    describe("when created with a subject/attribute/identifier only path then its execute method, called with a store object as its argument,", function() {
      var request = sureal.rest.request.put("sam/address/123");
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
      },
      update: function(inst, to) {
        if(inst.type === LOOKUP &&
          inst.subject.final === false &&
          inst.predicate.final === false &&
          inst.object.final === false &&
          inst.identifier.variable.final === true &&
          inst.identifier.operator === "=" &&
          inst.identifier.value === "123"
        ){
          return {
            results: [
              { 
                from: {subject:"sam", predicate:"address", object:"home",  identifier:"123", order:"1"},
                to: {subject:"sam", predicate:"address", object:"home2",  identifier:"123", order:"1"}
              }
            ]
          };
        }
        throw "Called query with incourect instruction";
      };
    });
    */
  });
});
