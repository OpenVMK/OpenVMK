// 42c66f7b170484e24189f467fe87b08d.cct / Sound Manager Class / play

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function play(_me: LingoMe, tMemName: LingoValue, tPriority: LingoValue, tProps: LingoValue) {
  if (meProp(_me, "pMuted")) {
  return 1;
  }

  var tObject = callMethod("createSoundInstance", _me, tMemName, tPriority, tProps);
  switch (tPriority) {
case symbol("pass"):
case undefined:
  for (var i = 1; i <= meProp(_me, "pChannelCount"); ++i) {
  var tStatus = callMethod("getTimeRemaining", meProp(_me, "pChannelList")[i]);
  if (lingoBinary("eq", tStatus, 0)) {
  return callMethod("play", meProp(_me, "pChannelList")[i], tObject);
  }

  }

  return 0;
case symbol("cut"):
  var tStatusList = new LingoPropList([]);
  for (var i = 1; i <= meProp(_me, "pChannelCount"); ++i) {
  tStatus = callMethod("getTimeRemaining", meProp(_me, "pChannelList")[i]);
  if (lingoBinary("eq", tStatus, 0)) {
  return callMethod("play", meProp(_me, "pChannelList")[i], tObject);
  }

  callMethod("addProp", tStatusList, tStatus, i)
  }

  callMethod("sort", tStatusList)
  return callMethod("play", meProp(_me, "pChannelList")[tStatusList[1]], tObject);
case symbol("queue"):
  tStatusList = new LingoPropList([]);
  for (var i = 1; i <= meProp(_me, "pChannelCount"); ++i) {
  tStatus = callMethod("getTimeRemaining", meProp(_me, "pChannelList")[i]);
  if (lingoBinary("eq", tStatus, 0)) {
  return callMethod("play", meProp(_me, "pChannelList")[i], tObject);
  }

  callMethod("addProp", tStatusList, tStatus, i)
  }

  callMethod("sort", tStatusList)
  return callMethod("queue", meProp(_me, "pChannelList")[tStatusList[1]], tObject);
  break;
  }

  tObject = undefined;
  return 0;
}

