// source: lavanet/lava/epochstorage/stake_entry.proto
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

var lavanet_lava_epochstorage_endpoint_pb = require('../../../lavanet/lava/epochstorage/endpoint_pb.js');
goog.object.extend(proto, lavanet_lava_epochstorage_endpoint_pb);
var gogoproto_gogo_pb = require('../../../gogoproto/gogo_pb.js');
goog.object.extend(proto, gogoproto_gogo_pb);
var cosmos_base_v1beta1_coin_pb = require('../../../cosmos/base/v1beta1/coin_pb.js');
goog.object.extend(proto, cosmos_base_v1beta1_coin_pb);
goog.exportSymbol('proto.lavanet.lava.epochstorage.StakeEntry', null, global);
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
proto.lavanet.lava.epochstorage.StakeEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.lavanet.lava.epochstorage.StakeEntry.repeatedFields_, null);
};
goog.inherits(proto.lavanet.lava.epochstorage.StakeEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.lavanet.lava.epochstorage.StakeEntry.displayName = 'proto.lavanet.lava.epochstorage.StakeEntry';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.lavanet.lava.epochstorage.StakeEntry.repeatedFields_ = [4];



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
proto.lavanet.lava.epochstorage.StakeEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.lavanet.lava.epochstorage.StakeEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.lavanet.lava.epochstorage.StakeEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lavanet.lava.epochstorage.StakeEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
    stake: (f = msg.getStake()) && cosmos_base_v1beta1_coin_pb.Coin.toObject(includeInstance, f),
    address: jspb.Message.getFieldWithDefault(msg, 2, ""),
    stakeAppliedBlock: jspb.Message.getFieldWithDefault(msg, 3, 0),
    endpointsList: jspb.Message.toObjectList(msg.getEndpointsList(),
    lavanet_lava_epochstorage_endpoint_pb.Endpoint.toObject, includeInstance),
    geolocation: jspb.Message.getFieldWithDefault(msg, 5, 0),
    chain: jspb.Message.getFieldWithDefault(msg, 6, ""),
    moniker: jspb.Message.getFieldWithDefault(msg, 8, "")
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
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry}
 */
proto.lavanet.lava.epochstorage.StakeEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lavanet.lava.epochstorage.StakeEntry;
  return proto.lavanet.lava.epochstorage.StakeEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lavanet.lava.epochstorage.StakeEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry}
 */
proto.lavanet.lava.epochstorage.StakeEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new cosmos_base_v1beta1_coin_pb.Coin;
      reader.readMessage(value,cosmos_base_v1beta1_coin_pb.Coin.deserializeBinaryFromReader);
      msg.setStake(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setStakeAppliedBlock(value);
      break;
    case 4:
      var value = new lavanet_lava_epochstorage_endpoint_pb.Endpoint;
      reader.readMessage(value,lavanet_lava_epochstorage_endpoint_pb.Endpoint.deserializeBinaryFromReader);
      msg.addEndpoints(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setGeolocation(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setChain(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setMoniker(value);
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
proto.lavanet.lava.epochstorage.StakeEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.lavanet.lava.epochstorage.StakeEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lavanet.lava.epochstorage.StakeEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lavanet.lava.epochstorage.StakeEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStake();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      cosmos_base_v1beta1_coin_pb.Coin.serializeBinaryToWriter
    );
  }
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getStakeAppliedBlock();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getEndpointsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      lavanet_lava_epochstorage_endpoint_pb.Endpoint.serializeBinaryToWriter
    );
  }
  f = message.getGeolocation();
  if (f !== 0) {
    writer.writeUint64(
      5,
      f
    );
  }
  f = message.getChain();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getMoniker();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
};


/**
 * optional cosmos.base.v1beta1.Coin stake = 1;
 * @return {?proto.cosmos.base.v1beta1.Coin}
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.getStake = function() {
  return /** @type{?proto.cosmos.base.v1beta1.Coin} */ (
    jspb.Message.getWrapperField(this, cosmos_base_v1beta1_coin_pb.Coin, 1));
};


/**
 * @param {?proto.cosmos.base.v1beta1.Coin|undefined} value
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry} returns this
*/
proto.lavanet.lava.epochstorage.StakeEntry.prototype.setStake = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry} returns this
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.clearStake = function() {
  return this.setStake(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.hasStake = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string address = 2;
 * @return {string}
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry} returns this
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint64 stake_applied_block = 3;
 * @return {number}
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.getStakeAppliedBlock = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry} returns this
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.setStakeAppliedBlock = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * repeated Endpoint endpoints = 4;
 * @return {!Array<!proto.lavanet.lava.epochstorage.Endpoint>}
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.getEndpointsList = function() {
  return /** @type{!Array<!proto.lavanet.lava.epochstorage.Endpoint>} */ (
    jspb.Message.getRepeatedWrapperField(this, lavanet_lava_epochstorage_endpoint_pb.Endpoint, 4));
};


/**
 * @param {!Array<!proto.lavanet.lava.epochstorage.Endpoint>} value
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry} returns this
*/
proto.lavanet.lava.epochstorage.StakeEntry.prototype.setEndpointsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.lavanet.lava.epochstorage.Endpoint=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lavanet.lava.epochstorage.Endpoint}
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.addEndpoints = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.lavanet.lava.epochstorage.Endpoint, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry} returns this
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.clearEndpointsList = function() {
  return this.setEndpointsList([]);
};


/**
 * optional uint64 geolocation = 5;
 * @return {number}
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.getGeolocation = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry} returns this
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.setGeolocation = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional string chain = 6;
 * @return {string}
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.getChain = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry} returns this
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.setChain = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string moniker = 8;
 * @return {string}
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.getMoniker = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.lavanet.lava.epochstorage.StakeEntry} returns this
 */
proto.lavanet.lava.epochstorage.StakeEntry.prototype.setMoniker = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


goog.object.extend(exports, proto.lavanet.lava.epochstorage);
