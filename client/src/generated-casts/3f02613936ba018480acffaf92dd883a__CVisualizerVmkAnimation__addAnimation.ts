// 3f02613936ba018480acffaf92dd883a.cct / CVisualizerVmkAnimation / addAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addAnimation(_me: LingoMe, i_animation: LingoValue) {
  setMeProp(_me, "m_ar_channels", new LingoList([]));
  var t_inputData = new LingoList([symbol("version"), symbol("creator"), symbol("date"), symbol("time")]);
  for (var tdata of t_inputData.toArray()) {
  callMethod("SetParam", callMethod("getObject", _me), tdata, i_animation[tdata])
  }

  var tInfo = i_animation.Info;
  for (var iParamCounter = 1; iParamCounter <= tInfo.count; ++iParamCounter) {
  var tParamName = callMethod("getPropAt", tInfo, iParamCounter);
  var tParamValue = callNamed("value", tInfo[iParamCounter]);
  callMethod("SetParam", callMethod("getObject", _me), tParamName, callNamed("value", tParamValue))
  }

  var tRegPoint = callNamed("value", callMethod("GetParam", callMethod("getObject", _me), "REGPOINT"));
  var i = 0;
  for (var tChannelData of i_animation.channels.toArray()) {
  var t_rChannel = callNamed("createObject", symbol("random"), "CAnimationChannel");
  callMethod("Init", t_rChannel, tChannelData, callMethod("GetParam", callMethod("getObject", _me), "spriteDefaults"))
  callMethod("setRegPoint", t_rChannel, tRegPoint)
  callMethod("setRoomObject", t_rChannel, callMethod("getObject", _me))
  callMethod("setDeltaLocZ", t_rChannel, i)
  callMethod("append", meProp(_me, "m_ar_channels"), t_rChannel)
  i = lingoBinary("add", i, 1);
  }

}

