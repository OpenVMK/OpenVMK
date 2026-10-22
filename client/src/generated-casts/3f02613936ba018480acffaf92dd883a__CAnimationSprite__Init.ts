// 3f02613936ba018480acffaf92dd883a.cct / CAnimationSprite / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, i_ar_spriteData: LingoValue, i_ar_spriteDefaults: LingoValue) {
  callMethod("sort", i_ar_spriteData)
  var t_ar_spriteDefaults = callMethod("duplicate", i_ar_spriteDefaults);
  for (var i = 1; i <= i_ar_spriteData.sprite.count; ++i) {
  var tProp = callMethod("getPropAt", i_ar_spriteData.sprite, i);
  var tSymbol = callNamed("symbol", tProp);
  var tDefaultValue = callMethod("getaProp", t_ar_spriteDefaults, tSymbol);
  if ((lingoTruthy(callNamed("voidp", tDefaultValue)) ? 0 : 1)) {
  if (lingoBinary("eq", callNamed("ilk", tDefaultValue), symbol("string"))) {
  if (lingoBinary("eq", tSymbol, symbol("member"))) {
  var tNewValue = callNamed("member", i_ar_spriteData.sprite[tProp]);
  } else {
  tNewValue = i_ar_spriteData.sprite[tProp];
  }

  } else {
  tNewValue = callNamed("value", i_ar_spriteData.sprite[tProp]);
  }

  } else {
  tNewValue = i_ar_spriteData.sprite[tProp];
  }

  t_ar_spriteDefaults[tSymbol] = tNewValue;
  meProp(_me, "m_ar_spriteData")[tSymbol] = tNewValue;
  }

  var t_ar_tweenProperties = new LingoPropList([symbol("locH"), 0, symbol("locV"), 0, symbol("width"), 0, symbol("height"), 0, symbol("blend"), 0, symbol("rotation"), 0, symbol("skew"), 0]);
  var t_ar_keyFrames = new LingoList([]);
  var t_frame = new LingoPropList([symbol("data"), new LingoPropList([]), symbol("tween"), callMethod("duplicate", t_ar_tweenProperties)]);
  var tFirstKeyFrame = i_ar_spriteData.keyframes[1];
  var tdata = callMethod("duplicate", meProp(_me, "m_ar_spriteData"));
  for (var iParamCounter = 1; iParamCounter <= tFirstKeyFrame.count; ++iParamCounter) {
  var tParamName = callNamed("symbol", callMethod("getPropAt", tFirstKeyFrame, iParamCounter));
  var tParamValue = callNamed("value", tFirstKeyFrame[iParamCounter]);
  tdata[tParamName] = tParamValue;
  }

  setThePropOf(t_frame, "data", tdata);
  callMethod("append", t_ar_keyFrames, t_frame)
  for (var i = 2; i <= i_ar_spriteData.keyframes.count; ++i) {
  var tLastKeyFrame = t_ar_keyFrames[t_ar_keyFrames.count];
  var tThisKeyFrame = i_ar_spriteData.keyframes[i];
  t_frame = new LingoPropList([symbol("data"), new LingoPropList([]), symbol("tween"), callMethod("duplicate", t_ar_tweenProperties)]);
  tdata = new LingoPropList([]);
  for (var iParamCounter = 1; iParamCounter <= tThisKeyFrame.count; ++iParamCounter) {
  tParamName = callNamed("symbol", callMethod("getPropAt", tThisKeyFrame, iParamCounter));
  tParamValue = callNamed("value", tThisKeyFrame[iParamCounter]);
  tdata[tParamName] = tParamValue;
  }

  setThePropOf(t_frame, "data", tdata);
  var t_bTweened = 0;
  if (lingoBinary("gt", callMethod("findPos", tdata, symbol("locH")), 0)) {
  setThePropOf(tLastKeyFrame.tween, "locH", 1);
  t_bTweened = 1;
  }

  if (lingoBinary("gt", callMethod("findPos", tdata, symbol("locV")), 0)) {
  setThePropOf(tLastKeyFrame.tween, "locV", 1);
  t_bTweened = 1;
  }

  if (lingoBinary("gt", callMethod("findPos", tdata, symbol("width")), 0)) {
  setThePropOf(tLastKeyFrame.tween, "width", 1);
  t_bTweened = 1;
  }

  if (lingoBinary("gt", callMethod("findPos", tdata, symbol("height")), 0)) {
  setThePropOf(tLastKeyFrame.tween, "height", 1);
  t_bTweened = 1;
  }

  if (lingoBinary("or", lingoBinary("gt", callMethod("findPos", tdata, symbol("blend")), 0), lingoBinary("gt", callMethod("findPos", tdata, symbol("blendLevel")), 0))) {
  setThePropOf(tLastKeyFrame.tween, "blend", 1);
  t_bTweened = 1;
  }

  if (callMethod("findPos", tdata, symbol("rotation"))) {
  setThePropOf(tLastKeyFrame.tween, "rotation", 1);
  t_bTweened = 1;
  }

  if (callMethod("findPos", tdata, symbol("skew"))) {
  setThePropOf(tLastKeyFrame.tween, "skew", 1);
  t_bTweened = 1;
  }

  if (t_bTweened) {
  tLastKeyFrame.data[symbol("tweened")] = 1;
  }

  tLastKeyFrame.data[symbol("steps")] = lingoBinary("sub", tdata.frame, tLastKeyFrame.data.frame);
  callMethod("append", t_ar_keyFrames, t_frame)
  }

  if (lingoBinary("eq", t_ar_keyFrames.count, 1)) {
  var keyFrameIndex = 1;
  tThisKeyFrame = callMethod("duplicate", t_ar_spriteDefaults);
  for (var i = 1; i <= t_ar_keyFrames[keyFrameIndex].data.count; ++i) {
  tProp = callMethod("getPropAt", t_ar_keyFrames[keyFrameIndex].data, i);
  var tvalue = t_ar_keyFrames[keyFrameIndex].data[tProp];
  tThisKeyFrame[tProp] = tvalue;
  t_ar_spriteDefaults[tProp] = tvalue;
  }

  callMethod("append", meProp(_me, "m_ar_frames"), tThisKeyFrame)
  } else {
  for (var keyFrameIndex = 1; keyFrameIndex <= lingoBinary("sub", t_ar_keyFrames.count, 1); ++keyFrameIndex) {
  tThisKeyFrame = callMethod("duplicate", t_ar_spriteDefaults);
  for (var i = 1; i <= t_ar_keyFrames[keyFrameIndex].data.count; ++i) {
  tProp = callMethod("getPropAt", t_ar_keyFrames[keyFrameIndex].data, i);
  tvalue = t_ar_keyFrames[keyFrameIndex].data[tProp];
  tThisKeyFrame[tProp] = tvalue;
  t_ar_spriteDefaults[tProp] = tvalue;
  }

  var tNextKeyFrame = t_ar_keyFrames[lingoBinary("add", keyFrameIndex, 1)];
  if (lingoBinary("eq", keyFrameIndex, 1)) {
  callMethod("append", meProp(_me, "m_ar_frames"), tThisKeyFrame)
  } else {
  callMethod("append", meProp(_me, "m_ar_frames"), t_ar_keyFrames[keyFrameIndex].data)
  }

  var tween = t_ar_keyFrames[keyFrameIndex].tween;
  var t_fSteps = lingoBinary("mul", t_ar_keyFrames[keyFrameIndex].data.steps, float(1));
  if (tThisKeyFrame.tweened) {
  if (tween.locH) {
  var tDeltaLocH = lingoBinary("mul", lingoBinary("sub", tNextKeyFrame.data.locH, tThisKeyFrame.locH), float(1));
  }

  if (tween.locV) {
  var tDeltaLocV = lingoBinary("mul", lingoBinary("sub", tNextKeyFrame.data.locV, tThisKeyFrame.locV), float(1));
  }

  if (tween.width) {
  var tDeltaWidth = lingoBinary("mul", lingoBinary("sub", tNextKeyFrame.data.width, tThisKeyFrame.width), float(1));
  }

  if (tween.height) {
  var tDeltaHeight = lingoBinary("mul", lingoBinary("sub", tNextKeyFrame.data.height, tThisKeyFrame.height), float(1));
  }

  if (tween.blend) {
  var tDeltaBlend = lingoBinary("mul", lingoBinary("sub", tNextKeyFrame.data.blend, tThisKeyFrame.blend), float(1));
  }

  if (tween.rotation) {
  var tDeltaRotation = lingoBinary("mul", lingoBinary("sub", tNextKeyFrame.data.rotation, tThisKeyFrame.rotation), float(1));
  }

  if (tween.skew) {
  var tDeltaSkew = lingoBinary("mul", lingoBinary("sub", tNextKeyFrame.data.skew, tThisKeyFrame.skew), float(1));
  }

  for (var i = 1; i <= t_ar_keyFrames[keyFrameIndex].data.steps; ++i) {
  tdata = new LingoPropList([]);
  callMethod("sort", tdata)
  var t = lingoBinary("div", i, t_fSteps);
  if (tween.locH) {
  if (lingoBinary("neq", tDeltaLocH, 0)) {
  tdata[symbol("locH")] = lingoBinary("add", tThisKeyFrame.locH, lingoBinary("mul", tDeltaLocH, t));
  }

  }

  if (tween.locV) {
  if (lingoBinary("neq", tDeltaLocV, 0)) {
  tdata[symbol("locV")] = lingoBinary("add", tThisKeyFrame.locV, lingoBinary("mul", tDeltaLocV, t));
  }

  }

  if (tween.width) {
  if (lingoBinary("neq", tDeltaWidth, 0)) {
  tdata[symbol("width")] = lingoBinary("add", tThisKeyFrame.width, lingoBinary("mul", tDeltaWidth, t));
  }

  }

  if (tween.height) {
  if (lingoBinary("neq", tDeltaHeight, 0)) {
  tdata[symbol("height")] = lingoBinary("add", tThisKeyFrame.height, lingoBinary("mul", tDeltaHeight, t));
  }

  }

  if (tween.blend) {
  if (lingoBinary("neq", tDeltaBlend, 0)) {
  tdata[symbol("blend")] = lingoBinary("add", tThisKeyFrame.blend, lingoBinary("mul", tDeltaBlend, t));
  }

  }

  if (tween.rotation) {
  if (lingoBinary("neq", tDeltaRotation, 0)) {
  tdata[symbol("rotation")] = lingoBinary("add", tThisKeyFrame.rotation, lingoBinary("mul", tDeltaRotation, t));
  }

  }

  if (tween.skew) {
  if (lingoBinary("neq", tDeltaSkew, 0)) {
  tdata[symbol("skew")] = lingoBinary("add", tThisKeyFrame.skew, lingoBinary("mul", tDeltaSkew, t));
  }

  }

  callMethod("append", meProp(_me, "m_ar_frames"), tdata)
  }

  continue;
  }

  for (var i = 1; i <= t_ar_keyFrames[keyFrameIndex].data.steps; ++i) {
  tdata = new LingoPropList([]);
  callMethod("append", meProp(_me, "m_ar_frames"), tdata)
  }

  }

  }

  var m_bInited = 1;
}

