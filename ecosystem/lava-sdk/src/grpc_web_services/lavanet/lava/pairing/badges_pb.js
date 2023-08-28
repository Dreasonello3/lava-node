// source: lavanet/lava/pairing/badges.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var lavanet_lava_pairing_relay_pb = require('../../../lavanet/lava/pairing/relay_pb.js');
goog.object.extend(proto, lavanet_lava_pairing_relay_pb);
var lavanet_lava_pairing_query_pb = require('../../../lavanet/lava/pairing/query_pb.js');
goog.object.extend(proto, lavanet_lava_pairing_query_pb);
var gogoproto_gogo_pb = require('../../../gogoproto/gogo_pb.js');
goog.object.extend(proto, gogoproto_gogo_pb);
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
goog.object.extend(proto, google_protobuf_wrappers_pb);
var lavanet_lava_epochstorage_stake_entry_pb = require('../../../lavanet/lava/epochstorage/stake_entry_pb.js');
goog.object.extend(proto, lavanet_lava_epochstorage_stake_entry_pb);
var lavanet_lava_spec_spec_pb = require('../../../lavanet/lava/spec/spec_pb.js');
goog.object.extend(proto, lavanet_lava_spec_spec_pb);
goog.exportSymbol('proto.lavanet.lava.pairing.GenerateBadgeRequest', null, global);
goog.exportSymbol('proto.lavanet.lava.pairing.GenerateBadgeResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.lavanet.lava.pairing.GenerateBadgeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.lavanet.lava.pairing.GenerateBadgeRequest.displayName = 'proto.lavanet.lava.pairing.GenerateBadgeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.lavanet.lava.pairing.GenerateBadgeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.lavanet.lava.pairing.GenerateBadgeResponse.displayName = 'proto.lavanet.lava.pairing.GenerateBadgeResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.lavanet.lava.pairing.GenerateBadgeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.lavanet.lava.pairing.GenerateBadgeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    badge_address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    project_id: jspb.Message.getFieldWithDefault(msg, 2, ""),
    spec_id: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeRequest}
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lavanet.lava.pairing.GenerateBadgeRequest;
  return proto.lavanet.lava.pairing.GenerateBadgeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lavanet.lava.pairing.GenerateBadgeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeRequest}
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setBadgeAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setProjectId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSpecId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.lavanet.lava.pairing.GenerateBadgeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lavanet.lava.pairing.GenerateBadgeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBadgeAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getProjectId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSpecId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string badge_address = 1;
 * @return {string}
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.prototype.getBadgeAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeRequest} returns this
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.prototype.setBadgeAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string project_id = 2;
 * @return {string}
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.prototype.getProjectId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeRequest} returns this
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.prototype.setProjectId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string spec_id = 3;
 * @return {string}
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.prototype.getSpecId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeRequest} returns this
 */
proto.lavanet.lava.pairing.GenerateBadgeRequest.prototype.setSpecId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.lavanet.lava.pairing.GenerateBadgeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.lavanet.lava.pairing.GenerateBadgeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    badge: (f = msg.getBadge()) && lavanet_lava_pairing_relay_pb.Badge.toObject(includeInstance, f),
    get_pairing_response: (f = msg.getGetPairingResponse()) && lavanet_lava_pairing_query_pb.QueryGetPairingResponse.toObject(includeInstance, f),
    badge_signer_address: jspb.Message.getFieldWithDefault(msg, 3, ""),
    spec: (f = msg.getSpec()) && lavanet_lava_spec_spec_pb.Spec.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeResponse}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lavanet.lava.pairing.GenerateBadgeResponse;
  return proto.lavanet.lava.pairing.GenerateBadgeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lavanet.lava.pairing.GenerateBadgeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeResponse}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new lavanet_lava_pairing_relay_pb.Badge;
      reader.readMessage(value,lavanet_lava_pairing_relay_pb.Badge.deserializeBinaryFromReader);
      msg.setBadge(value);
      break;
    case 2:
      var value = new lavanet_lava_pairing_query_pb.QueryGetPairingResponse;
      reader.readMessage(value,lavanet_lava_pairing_query_pb.QueryGetPairingResponse.deserializeBinaryFromReader);
      msg.setGetPairingResponse(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setBadgeSignerAddress(value);
      break;
    case 4:
      var value = new lavanet_lava_spec_spec_pb.Spec;
      reader.readMessage(value,lavanet_lava_spec_spec_pb.Spec.deserializeBinaryFromReader);
      msg.setSpec(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.lavanet.lava.pairing.GenerateBadgeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lavanet.lava.pairing.GenerateBadgeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBadge();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      lavanet_lava_pairing_relay_pb.Badge.serializeBinaryToWriter
    );
  }
  f = message.getGetPairingResponse();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      lavanet_lava_pairing_query_pb.QueryGetPairingResponse.serializeBinaryToWriter
    );
  }
  f = message.getBadgeSignerAddress();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSpec();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      lavanet_lava_spec_spec_pb.Spec.serializeBinaryToWriter
    );
  }
};


/**
 * optional Badge badge = 1;
 * @return {?proto.lavanet.lava.pairing.Badge}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.getBadge = function() {
  return /** @type{?proto.lavanet.lava.pairing.Badge} */ (
    jspb.Message.getWrapperField(this, lavanet_lava_pairing_relay_pb.Badge, 1));
};


/**
 * @param {?proto.lavanet.lava.pairing.Badge|undefined} value
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeResponse} returns this
*/
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.setBadge = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeResponse} returns this
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.clearBadge = function() {
  return this.setBadge(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.hasBadge = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional QueryGetPairingResponse get_pairing_response = 2;
 * @return {?proto.lavanet.lava.pairing.QueryGetPairingResponse}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.getGetPairingResponse = function() {
  return /** @type{?proto.lavanet.lava.pairing.QueryGetPairingResponse} */ (
    jspb.Message.getWrapperField(this, lavanet_lava_pairing_query_pb.QueryGetPairingResponse, 2));
};


/**
 * @param {?proto.lavanet.lava.pairing.QueryGetPairingResponse|undefined} value
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeResponse} returns this
*/
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.setGetPairingResponse = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeResponse} returns this
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.clearGetPairingResponse = function() {
  return this.setGetPairingResponse(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.hasGetPairingResponse = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string badge_signer_address = 3;
 * @return {string}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.getBadgeSignerAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeResponse} returns this
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.setBadgeSignerAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional lavanet.lava.spec.Spec spec = 4;
 * @return {?proto.lavanet.lava.spec.Spec}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.getSpec = function() {
  return /** @type{?proto.lavanet.lava.spec.Spec} */ (
    jspb.Message.getWrapperField(this, lavanet_lava_spec_spec_pb.Spec, 4));
};


/**
 * @param {?proto.lavanet.lava.spec.Spec|undefined} value
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeResponse} returns this
*/
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.setSpec = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.lavanet.lava.pairing.GenerateBadgeResponse} returns this
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.clearSpec = function() {
  return this.setSpec(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.lavanet.lava.pairing.GenerateBadgeResponse.prototype.hasSpec = function() {
  return jspb.Message.getField(this, 4) != null;
};


goog.object.extend(exports, proto.lavanet.lava.pairing);
