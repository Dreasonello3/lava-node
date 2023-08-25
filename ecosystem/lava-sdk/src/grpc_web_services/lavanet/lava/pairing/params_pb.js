// source: lavanet/lava/pairing/params.proto
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

var gogoproto_gogo_pb = require('../../../gogoproto/gogo_pb.js');
goog.object.extend(proto, gogoproto_gogo_pb);
goog.exportSymbol('proto.lavanet.lava.pairing.Params', null, global);
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
proto.lavanet.lava.pairing.Params = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.lavanet.lava.pairing.Params, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.lavanet.lava.pairing.Params.displayName = 'proto.lavanet.lava.pairing.Params';
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
proto.lavanet.lava.pairing.Params.prototype.toObject = function(opt_includeInstance) {
  return proto.lavanet.lava.pairing.Params.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.lavanet.lava.pairing.Params} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lavanet.lava.pairing.Params.toObject = function(includeInstance, msg) {
  var f, obj = {
    mintcoinspercu: jspb.Message.getFieldWithDefault(msg, 3, ""),
    fraudstakeslashingfactor: jspb.Message.getFieldWithDefault(msg, 5, ""),
    fraudslashingamount: jspb.Message.getFieldWithDefault(msg, 6, 0),
    epochblocksoverlap: jspb.Message.getFieldWithDefault(msg, 8, 0),
    unpaylimit: jspb.Message.getFieldWithDefault(msg, 10, ""),
    slashlimit: jspb.Message.getFieldWithDefault(msg, 11, ""),
    datareliabilityreward: jspb.Message.getFieldWithDefault(msg, 12, ""),
    qosweight: jspb.Message.getFieldWithDefault(msg, 13, ""),
    recommendedepochnumtocollectpayment: jspb.Message.getFieldWithDefault(msg, 14, 0)
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
 * @return {!proto.lavanet.lava.pairing.Params}
 */
proto.lavanet.lava.pairing.Params.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lavanet.lava.pairing.Params;
  return proto.lavanet.lava.pairing.Params.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lavanet.lava.pairing.Params} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lavanet.lava.pairing.Params}
 */
proto.lavanet.lava.pairing.Params.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMintcoinspercu(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setFraudstakeslashingfactor(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setFraudslashingamount(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setEpochblocksoverlap(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setUnpaylimit(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setSlashlimit(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setDatareliabilityreward(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setQosweight(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setRecommendedepochnumtocollectpayment(value);
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
proto.lavanet.lava.pairing.Params.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.lavanet.lava.pairing.Params.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lavanet.lava.pairing.Params} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lavanet.lava.pairing.Params.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMintcoinspercu();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getFraudstakeslashingfactor();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getFraudslashingamount();
  if (f !== 0) {
    writer.writeUint64(
      6,
      f
    );
  }
  f = message.getEpochblocksoverlap();
  if (f !== 0) {
    writer.writeUint64(
      8,
      f
    );
  }
  f = message.getUnpaylimit();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getSlashlimit();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getDatareliabilityreward();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getQosweight();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = message.getRecommendedepochnumtocollectpayment();
  if (f !== 0) {
    writer.writeUint64(
      14,
      f
    );
  }
};


/**
 * optional string mintCoinsPerCU = 3;
 * @return {string}
 */
proto.lavanet.lava.pairing.Params.prototype.getMintcoinspercu = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.pairing.Params} returns this
 */
proto.lavanet.lava.pairing.Params.prototype.setMintcoinspercu = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string fraudStakeSlashingFactor = 5;
 * @return {string}
 */
proto.lavanet.lava.pairing.Params.prototype.getFraudstakeslashingfactor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.pairing.Params} returns this
 */
proto.lavanet.lava.pairing.Params.prototype.setFraudstakeslashingfactor = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional uint64 fraudSlashingAmount = 6;
 * @return {number}
 */
proto.lavanet.lava.pairing.Params.prototype.getFraudslashingamount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.lavanet.lava.pairing.Params} returns this
 */
proto.lavanet.lava.pairing.Params.prototype.setFraudslashingamount = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional uint64 epochBlocksOverlap = 8;
 * @return {number}
 */
proto.lavanet.lava.pairing.Params.prototype.getEpochblocksoverlap = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.lavanet.lava.pairing.Params} returns this
 */
proto.lavanet.lava.pairing.Params.prototype.setEpochblocksoverlap = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional string unpayLimit = 10;
 * @return {string}
 */
proto.lavanet.lava.pairing.Params.prototype.getUnpaylimit = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.pairing.Params} returns this
 */
proto.lavanet.lava.pairing.Params.prototype.setUnpaylimit = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional string slashLimit = 11;
 * @return {string}
 */
proto.lavanet.lava.pairing.Params.prototype.getSlashlimit = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.pairing.Params} returns this
 */
proto.lavanet.lava.pairing.Params.prototype.setSlashlimit = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * optional string dataReliabilityReward = 12;
 * @return {string}
 */
proto.lavanet.lava.pairing.Params.prototype.getDatareliabilityreward = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.pairing.Params} returns this
 */
proto.lavanet.lava.pairing.Params.prototype.setDatareliabilityreward = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * optional string QoSWeight = 13;
 * @return {string}
 */
proto.lavanet.lava.pairing.Params.prototype.getQosweight = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.pairing.Params} returns this
 */
proto.lavanet.lava.pairing.Params.prototype.setQosweight = function(value) {
  return jspb.Message.setProto3StringField(this, 13, value);
};


/**
 * optional uint64 recommendedEpochNumToCollectPayment = 14;
 * @return {number}
 */
proto.lavanet.lava.pairing.Params.prototype.getRecommendedepochnumtocollectpayment = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.lavanet.lava.pairing.Params} returns this
 */
proto.lavanet.lava.pairing.Params.prototype.setRecommendedepochnumtocollectpayment = function(value) {
  return jspb.Message.setProto3IntField(this, 14, value);
};


goog.object.extend(exports, proto.lavanet.lava.pairing);
