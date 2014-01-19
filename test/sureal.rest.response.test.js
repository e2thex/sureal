describe("sureal.rest.response", function() {
  describe(".validate", function() {
    it("should be a function", function() {
      sureal.rest.response.validate.should.be.type('function');
    });
    var validObj = {};
    beforeEach(function() {
      validObj = { 
        uri: "bob",
        value: "bob",
        methods: []
      };
    });
    it("should return first param if valid", function() {
      sureal.rest.response.validate(validObj).should.eql(validObj);
    });
    describe("first params uri property", function() {
      it("should throw error if none existent", function() {
        delete validObj.uri;
        (function() {
          sureal.rest.response.validate(validObj);
        }).should.throw("sureal.rest.response missing uri");
      });
      describe("should throw error if non-uri", function() {
        if("such as an object", function() {
          (function() {
            validObj.uri = {};
            sureal.rest.response.validate(validObj);
          }).should.throw("sureal.rest.respose's uri is not a uri");
        });
        /*
        (function() {
          validObj.uri = {};
          sureal.rest.response.validate(validObj);
        }).should.throw("sureal.rest.respose's uri is not a uri");
        */
      });
    });
    describe("first params value property", function() {
      it("should throw error if non existent", function() {
        delete validObj.value;
        (function() {
          sureal.rest.response.validate(validObj);
        }).should.throw("sureal.rest.response missing value");
      });
      describe("should throw error if non-string", function() {
        it("such as an object", function() {
          (function() {
            validObj.value = {};
            sureal.rest.response.validate(validObj);
          }).should.throw("sureal.rest.respose's value is not a string");
        });
      });
    });
    describe("first params methods property", function() {
      it("should throw error if non existent", function() {
        delete validObj.methods;
        (function() {
          sureal.rest.response.validate(validObj);
        }).should.throw("sureal.rest.response missing methods");
      });
      describe("should throw error if every item not in [POST, PUT, PUSH, GET]", function() {
        it("such as 'baseball'", function() {
          (function() {
            validObj.methods = "baseball";
            sureal.rest.response.validate(validObj);
          }).should.throw("sureal.rest.response's methods includes invalid method");
        });
        it("such as [{}, POST]", function() {
          (function() {
            validObj.methods = [{}, 'POST'];
            sureal.rest.response.validate(validObj);
          }).should.throw("sureal.rest.response's methods includes invalid method");
        });
        it("such as ['other string', 'POST']", function() {
          (function() {
            validObj.methods = ['other string', 'POST'];
            sureal.rest.response.validate(validObj);
          }).should.throw("sureal.rest.response's methods includes invalid method");
        });
      });
    });
  });
});
