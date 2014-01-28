/**
 * Extend all object with a validate funtion
 */
Object.prototype.surealValidate = function ObjectPrototypeSurealValidate(validator) {
  validator(this);
  return this;
}

sureal = {};
sureal.rest = {};
sureal.rest.request = {};
/**
 * The Sureal Rest Request Get Object allows for Get request to be executed
 *
 * @constructor
 * @param {string} path : the restful path of the request
 * @return a sureal.rest.request.get Object
 */
sureal.rest.request.get = function requestGet(path, queryString) {
  var that = {}
  //that.path = (typeof path == 'string') ? sureal.path(path) : path;
  that.path = path;
  var parts = path.split("/");
  that.subject = parts[0];
  that.predicate = parts[1] ? parts[1] : false;
  that.identifier = typeof parts[2] !== 'undefined' ? parts[2] : false;
  that.value = that.predicate ? that.predicate : that.subject;
  that.methods = {
    '1'    : ["GET"], //subject
    '2'  : ["GET", "POST"], //predicate 
    '3' : ["DELETE", "GET", "POST", "PUT"] // identifier
  }[parts.length];

  // Method for querying a data source for all attributes of a subject
  that.getAttributes = function(store, subject) {
    var variable = sureal.data.request.instruction.variable();
    return store.query(
      sureal.data.request.instruction.lookup( 
        sureal.data.request.instruction.lookupPart("=", subject),
        variable,
        variable.next(),
        variable.next()
      )
    ).results;
  };
  that.execute = function execute(store) {
    var variable = sureal.data.request.instruction.variable();
    var variable1 = variable.next();
    var variable2 = variable.next();
    
    var data = store.query(
      sureal.data.request.instruction.lookup( 
        sureal.data.request.instruction.lookupPart("=", that.subject),
        this.predicate ? sureal.data.request.instruction.lookupPart("=", that.predicate) : variable,
        this.identifier ? variable : variable1,
        this.identifier ?  sureal.data.request.instruction.lookupPart("=", that.identifier) : this.predicate ? variable : variable2
      )
    );
    this.results = typeof data !=='undefined' ? data.results : undefined;

    if(this.identifier) {
      typeof this.results !== 'undefined' ?
        this.value = this.results[0] :
        '';
    }
    var path = this.path;
    return {
      uri:this.path,
      value: this.value,
      children: this.parseChildrenFromData(),
      methods:this.methods
    };
  };
  /**
   * Heler function for converting return data to child data
   */
  that.parseChildrenFromData = function() {
    //if we have no data then no return
    if(typeof this.results === 'undefined') {
      return [];
    }
    // if we have a predicate then we need to sort
    if(this.identifier) {
      return [];
    }
    if(this.predicate) {
      this.results.sort(function(a,b) {
        return a.order < b.order ? -1 :( a.order>b.order ?1 :0);
      });
    }
    return this.results.map(this.parseChildFromData, this);
  }
  that.parseChildFromData = function(item) {
    if(that.predicate) {
     return {value:item.object, uri:this.path +"/"+ item.identifier};
      
    }
    else {
     return {value:item, uri:this.path +"/"+ item};
    }
  };
  return that;
}

/**
 * The Sureal Rest Request Get Object allows for Get request to be executed
 *
 * @constructor
 * @param {string} path : the restful path of the request
 * @return a sureal.rest.request.get Object
 */
sureal.rest.request.put = function requestGet(path, data) {
  var that = {}
  that.triplet = sureal.path(path);
  that.triplet.object = data;
  that.execute = function requestPutExecute(store) {
    var variable = sureal.data.request.instruction.variable();
    
    var data = store.update(
      sureal.data.request.instruction.lookup( 
        variable.next(),
        variable.next(),
        variable.next(),
        sureal.data.request.instruction.lookupPart("=", this.triplet.identifier, variable)
      ),
      this.triplet
    );
    var triplet = data.results[0].to;
    return {
      uri:triplet.subject +"/"+triplet.predicate+"/"+triplet.identifier,
      value: triplet.object,
      children: [],
      methods:["DELETE", "GET", "POST", "PUT"]
    }
  }
  return that;
};

sureal.rest.request.delete = function requestGet(path) {
  var that = {}
  that.triplet = sureal.path(path);
  that.execute = function surealRestRequestDelete(store) {
    var variable = sureal.data.request.instruction.variable();
    var data = store.update(
      sureal.data.request.instruction.lookup( 
        variable.next(),
        variable.next(),
        variable.next(),
        sureal.data.request.instruction.lookupPart("=", this.triplet.identifier, variable)
      )
    );
    return {
      uri:this.triplet.subject +"/"+this.triplet.predicate+"/"+this.triplet.identifier,
      value: '',
      children: [],
      methods:["DELETE", "GET", "POST", "PUT"]
    }
  }


  return that;
}
/**
 * A function to validate if a object is a request
 * @param {object} request : an object to validate as a request
 */
sureal.rest.request.validate = function surealRestRequestValidate(request) {
  if (typeof request.execute !== 'function') {
    throw "Invalid SurealRestRequest: missing execute method"
  }
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

/**
 * Create a path object
 *
 * @param {string}
 * @return {object} returns an sureal.path Object
 */
sureal.path = function SurealPath(path) {
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
  that.identifier = parts[2] ? parts[2] : false;
  return that;
};

sureal.path.validate = function surealPathValidate(obj) {
  if(!obj.hasOwnProperty('subject')) {
    throw "Invalid SurealPath: missing subject property"
  }
  if(!obj.hasOwnProperty('predicate')) {
    throw "Invalid SurealPath: missing prediate property"
  }
  if(!obj.hasOwnProperty('identifier')) {
    throw "Invalid SurealPath: missing identifier property"
  }
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
sureal.data.request.instruction.lookupPart = function(op, value, variable) {
  var that = {}
  that.operator = op;
  that.value = value;
  that.variable = variable;
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
