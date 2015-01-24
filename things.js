var monk = require('monk'),
    wrap = require('co-monk'),
    co = require('co'),
    db = monk(process.env.DB_PORT_27017_TCP_ADDR + '/library');

// From lifeofjs
co(function* () {
  var things = yield things.find({});
});

module.exports.list = function* list(collectionName) {
  if ('GET' != this.method) return yield next;
  var things = wrap(db.get(collectionName));
  this.body = yield things.find({});
};

module.exports.fetch = function* fetch(collectionName, id) {
  if ('GET' != this.method) return yield next;
  var things = wrap(db.get(collectionName));
  var thing = yield things.findOne({ _id: id });
  if (thing.length === 0) {
    this.throw(404, 'thing with id = ' + id + ' was not found');
  }
  this.body = yield thing;
};

module.exports.add = function* add(collectionName, data) {
  if ('POST' != this.method) return yield next;
  var things = wrap(db.get(collectionName));
  var thing = yield parse(this, {
    limit: '1kb'
  });
  var inserted = yield things.insert(thing);
  if (!inserted) {
    this.throw(405, "The thing couldn't be added.");
  }
  this.body = 'Done!';
};

module.exports.modify = function* modify(collectionName, id) {
  if ('PUT' != this.method) return yield next;
  var things = wrap(db.get(collectionName));

  var data = yield parse(this, {
    limit: '1kb'
  });

  var thing = yield things.find({}, {
    'skip': id - 1,
    'limit': 1
  });

  if (thing.length === 0) {
    this.throw(404, 'thing with id = ' + id + ' was not found');
  }

  var updated = things.update(thing[0], {
    $set: data
  });

  if (!updated) {
    this.throw(405, "Unable to update.");
  } else {
    this.body = "Done";
  }
};

module.exports.remove = function* remove(collectionName, id) {
  if ('DELETE' != this.method) return yield next;
  var things = wrap(db.get(collectionName));

  var thing = yield things.find({}, {
    'skip': id - 1,
    'limit': 1
  });

  if (thing.length === 0) {
    this.throw(404, 'thing with id = ' + id + ' was not found');
  }

  var removed = things.remove(thing[0]);

  if (!removed) {
    this.throw(405, "Unable to delete.");
  } else {
    this.body = "Done";
  }

};

module.exports.options = function* () {
  this.body = "Allow: HEAD,GET,PUT,DELETE,OPTIONS";
};

module.exports.trace = function* () {
  this.body = "Smart! But you can't trace.";
};