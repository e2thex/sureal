surealPath = function() {
  var surealPathModule = function constructor(pathString) {
    var that = {};
    var parts = [];
    if(typeof pathString === 'undefined') {
      pathString = '';
    }
    else if(typeof pathString !== 'string') {
      throw "sureal.path only takes a string";
    }
    parts = pathString.split("/");
    that.predicate = parts[1] ? parts[1] : '';
    that.subject = parts[0] ? parts[0] : '';
    that.identifier = parts[2] ? parts[2] : false;
    return that;
  };
  surealPathModule.validate = function validator(obj) {
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
  return surealPathModule;
}
