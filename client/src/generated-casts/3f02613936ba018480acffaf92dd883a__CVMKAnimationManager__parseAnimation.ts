// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / parseAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseAnimation(_me: LingoMe, t_rXML: LingoValue, tObject: LingoValue) {
  if (callNamed("objectp", t_rXML)) {
  var t_animation = new LingoPropList([]);
  t_animation[symbol("fileVersion")] = "0.1";
  t_animation[symbol("version")] = "1.0";
  t_animation[symbol("creator")] = "";
  t_animation[symbol("date")] = "";
  t_animation[symbol("time")] = "";
  callMethod("GetRoot", t_rXML)
  var t_checkData = new LingoList(["fileversion", "version", "creator", "time", "date"]);
  for (var tdata of t_checkData.toArray()) {
  var tPos = callMethod("findPos", callMethod("GetRoot", t_rXML).param, tdata);
  if (lingoBinary("neq", tPos, 0)) {
  t_animation[callNamed("symbol", tdata)] = callMethod("GetRoot", t_rXML).param[tPos];
  }

  }

  if (lingoBinary("eq", t_animation.version, 0.3)) {
  setThePropOf(t_animation, "fileVersion", 0.3);
  setThePropOf(t_animation, "version", float(1));
  }

  var t_ar_Events = new LingoPropList([]);
  var t_ar_Sounds = new LingoPropList([]);
  if (lingoBinary("gte", callNamed("value", t_animation.fileVersion), 0.5)) {
  if (callMethod("Search", t_rXML, "type", "SCORE", 1)) {
  }

  if (callMethod("Search", t_rXML, "type", "EVENTS", 1)) {
  for (var tEvent of callMethod("GetNode", t_rXML).child.toArray()) {
  switch (tEvent[symbol("type")]) {
case "EVENT":
  var t_sEventID = callNamed("string", tEvent.param["FRAME"]);
  var t_sEventName = tEvent.param["NAME"];
  t_ar_Events[t_sEventID] = t_sEventName;
  break;
  }

  }

  }

  if (callMethod("Search", t_rXML, "type", "SOUNDS", 1)) {
  for (var tSound of callMethod("GetNode", t_rXML).child.toArray()) {
  switch (tSound[symbol("type")]) {
case "SOUND":
  var t_sSoundID = callNamed("string", tSound.param["FRAME"]);
  var t_sSoundName = tSound.param["NAME"];
  if (callNamed("listp", callMethod("getaProp", t_ar_Sounds, t_sSoundID))) {
  callMethod("append", t_ar_Sounds[t_sSoundID], t_sSoundName)
  } else {
  t_ar_Sounds[t_sSoundID] = new LingoList([t_sSoundName]);
  }

  break;
  }

  }

  }

  }

  if (callMethod("Search", t_rXML, "type", "ANIMATION", 1)) {
  var t_bDebug = 0;
  if (lingoBinary("eq", t_animation.fileVersion, "0.1")) {
  if (lingoBinary("eq", callMethod("findPos", callMethod("GetNode", t_rXML).param, "REGPOINT"), 0)) {
  callNamed("put", "No Animation REGPOINT Defined!!")
  return 0;
  } else {
  setThePropOf(t_animation, "fileVersion", "0.2");
  }

  }

  if (t_bDebug) {
  callNamed("put", callMethod("GetParam", t_rXML, "LASTFRAME"))
  callNamed("put", callMethod("GetParam", t_rXML, "LASTCHANNEL"))
  callNamed("put", callMethod("GetParam", t_rXML, "REGPOINT"))
  }

  t_animation[symbol("Info")] = callMethod("duplicate", callMethod("GetNode", t_rXML).param);
  t_animation[symbol("channels")] = new LingoList([]);
  var t_iLastFrameOfLastSprite = 1;
  for (var tChannel of callMethod("GetNode", t_rXML).child.toArray()) {
  switch (tChannel[symbol("type")]) {
case "CHANNEL":
  if (t_bDebug) {
  callNamed("put", "CHANNEL")
  for (var iChannelCounter = 1; iChannelCounter <= tChannel.param.count; ++iChannelCounter) {
  var tParamName = callMethod("getPropAt", tChannel.param, iChannelCounter);
  var tParamValue = callNamed("value", tChannel.param[iChannelCounter]);
  callNamed("put", lingoBinary("joinPad", tParamName, tParamValue))
  }

  }

  var t_ar_channelSprites = new LingoList([]);
  for (var tSprite of tChannel.child.toArray()) {
  switch (tSprite._type) {
case "SPRITE":
  var t_ar_sprite = new LingoPropList([]);
  tPos = callMethod("findPos", tSprite.param, "SCORECOLOR");
  if (lingoBinary("neq", tPos, 0)) {
  tParamValue = callNamed("value", tSprite.param[tPos]);
  if (lingoBinary("eq", tParamValue, 4)) {
  continue;
  }

  }

  tPos = callMethod("findPos", tSprite.param, "ENDFRAME");
  if (lingoBinary("neq", tPos, 0)) {
  tParamValue = callNamed("value", tSprite.param[tPos]);
  if (lingoBinary("gt", tParamValue, t_iLastFrameOfLastSprite)) {
  t_iLastFrameOfLastSprite = tParamValue;
  }

  }

  if (t_bDebug) {
  callNamed("put", "  SPRITE")
  for (var iSpriteCounter = 1; iSpriteCounter <= tSprite.param.count; ++iSpriteCounter) {
  tParamName = callMethod("getPropAt", tSprite.param, iSpriteCounter);
  tParamValue = callNamed("value", tSprite.param[iSpriteCounter]);
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "      ", tParamName), tParamValue))
  }

  }

  t_ar_sprite[symbol("sprite")] = callMethod("duplicate", tSprite.param);
  t_ar_sprite[symbol("keyframes")] = new LingoList([]);
  for (var tKeyframe of tSprite.child.toArray()) {
  switch (tKeyframe._type) {
case "KEYFRAME":
  callMethod("append", t_ar_sprite[symbol("keyframes")], callMethod("duplicate", tKeyframe.param))
  if (t_bDebug) {
  callNamed("put", "    KEYFRAME")
  for (var iKeyframeCounter = 1; iKeyframeCounter <= tKeyframe.param.count; ++iKeyframeCounter) {
  tParamName = callMethod("getPropAt", tKeyframe.param, iKeyframeCounter);
  tParamValue = callNamed("value", tKeyframe.param[iKeyframeCounter]);
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "          ", tParamName), tParamValue))
  }

  }

  break;
  default:
  callNamed("put", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Unknown keyframe", tChannel[symbol("type")]), "."), tSprite[symbol("type")]), "."), tKeyframe[symbol("type")]))
  }

  }

  callMethod("append", t_ar_channelSprites, t_ar_sprite)
  break;
  default:
  callNamed("put", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Unknnown sprite", tChannel[symbol("type")]), "."), tSprite[symbol("type")]))
  }

  }

  if (lingoBinary("gt", t_ar_channelSprites.count, 0)) {
  callMethod("append", t_animation[symbol("channels")], t_ar_channelSprites)
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown channel", tChannel[symbol("type")]))
  }

  }

  t_animation[symbol("Info")]["LASTFRAME"] = t_iLastFrameOfLastSprite;
  callMethod("addAnimation", callMethod("GetVisual", tObject), t_animation)
  callMethod("setEvents", callMethod("GetFactor", tObject), t_ar_Events)
  callMethod("setSounds", callMethod("GetFactor", tObject), t_ar_Sounds)
  return 1;
  } else {
  return 0;
  }

  } else {
  return 0;
  }

}

