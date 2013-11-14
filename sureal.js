sureal = {};
sureal.rest = {};
sureal.rest.request = {};
sureal.rest.request.get = function requestGet(path, queryString) {
  var that = {}
  that.path = (typeof path == 'string') ? sureal.path(path) : path;
  return that;
}

sureal.rest.response = {};
sureal.rest.response.validate = function responseValidate(response) {
  if(typeof response.uri == 'undefined') {
    throw Error("sureal.rest.response missing uri");
  }
  if(typeof response.uri == 'object') {
    throw Error("sureal.rest.respose's uri is not a uri");
  }
  if(typeof response.value == 'undefined') {
    throw Error("sureal.rest.response missing value");
  }
  if(typeof response.value == 'object') {
    throw Error("sureal.rest.respose's value is not a string");
  }
  if(typeof response.methods == 'undefined') {
    throw Error("sureal.rest.response missing methods");
  }
  if(typeof response.methods.forEach == 'undefined') {
    throw Error("sureal.rest.response's methods includes invalid method");
  }
  if(!response.methods.every(function(item) {
    ['GET', 'PUSH', 'PUT', 'POST'].some(function(method) {
      item === method;
    })
  })) {
    throw Error("sureal.rest.response's methods includes invalid method");
  }
  return response;
}


sureal.path = function Path(path) {
  
  if(typeof path == 'undefined') {
    path = '';
  }
  else if(typeof path != 'string') {
    throw "sureal.path only takes a string";
  }
  var parts = path.split("/");
  var that = {};
  that.predicate = parts[1] ? parts[1] : '';
  that.subject = parts[0] ? parts[0] : '';
  that.position = parts[2] ? parts[2] : that.subject ? 0 :'';
  return that;
};

sureal.path.is_a = function is_aPath(obj) {
  if((typeof obj != 'undefined') &&
     obj.hasOwnProperty('predicate') && 
     obj.hasOwnProperty('subject') && 
     obj.hasOwnProperty('position')
    ) {
    return true;
  }
  return false;
};



sureal.data = {}
sureal.data.request = {}
/**
 * Instructions are a recurive tree of items that allow one to describe
 * a query for a node in a data web. 
 *
 * Here is the tree of recursive instructions
 *
 * instruction : intersection
 * instruction : lookup
 * intersection: instruction instruction
 * lookup      : lookup_part lookup_part lookup_part lookup_part
 * lookup_part : variable
 * lookup_part : {operator : , value }
*/
sureal.data.request.instruction = {}
sureal.data.request.instruction.variable = function(counter) {
  var that = {}
  that.counter = typeof counter === 'undefined' ? sureal.data.request.instruction.variable.counter(): counter;
  that.name = that.counter.count;
  that.final = that.name === 0 ;
  
  that.next = function() {
    this.counter.count ++;
    return sureal.data.request.instruction.variable(this.counter);
  }
  return that;
}
sureal.data.request.instruction.variable.counter = function() {
  var that = {}
  that.count = 0;
  return that;
}
sureal.data.request.instruction.lookupPart = function(op, value) {
  var that = {}
  that.operator = op;
  that.value = value;
  return that;
}
sureal.data.request.instruction.lookup = function(subject, predicate, object, identifier) {
  var that = {}
  that.subject = subject;
  that.predicate = predicate;
  that.object = object;
  that.identifier = identifier;
  that.type = 'LOOKUP';
  return that;
}
/*
sureal.data.request.instruction.intersect = function(lhs, rhs) {
  var that = {}
  that.lhs = lhs;
  that.rhs = rhs;
  that.type = 'INTERSECT';
  return that;
  
}

*/
