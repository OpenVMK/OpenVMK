// vmk_music_mixer.cct / CMusicMixerComponent / SetTrackData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTrackData(_me: LingoMe, t_pData: LingoValue) {
  callMethod("ClearAll", _me)
  var t_ar_config = callNamed("getVariableValue", "samples.config");
  var t_channelNum = 1;
  callMethod("ClearAll", _me)
  var t_ar_trackLengths = new LingoList([]);
  for (var t_channel of t_pData.toArray()) {
  while (lingoBinary("lt", t_channel.count, 16)) {
  callMethod("append", t_channel, 0)
  }

  }

  for (var t_channel of t_pData.toArray()) {
  var t_trackData = new LingoList([]);
  var t_sampleNum = 1;
  var t_Length = 0;
  for (var t_sample of t_channel.toArray()) {
  if (lingoBinary("neq", t_sample, 0)) {
  t_Length = t_sampleNum;
  var t_error = 0;
  if (lingoBinary("eq", t_sample, -float(1))) {
  var lastData = t_pData[t_channelNum][lingoBinary("sub", t_sampleNum, 1)];
  if (lingoBinary("neq", lastData, 0)) {
  callMethod("append", t_trackData, t_sample)
  var t_imgSample = meProp(_me, "m_imgLongSample2");
  var t_memname = t_ar_config[lastData];
  var t_mem = callNamed("member", callNamed("getmemnum", t_memname));
  var t_sID = callNamed("getUniqueID");
  callMethod("addProp", meProp(_me, "m_mp_LongSamples")[t_channelNum._string], t_sampleNum, t_sID)
  callMethod("addProp", meProp(_me, "m_mp_LongSamples")[t_channelNum._string], lingoBinary("sub", t_sampleNum, 1), t_sID)
  } else {
  t_error = 1;
  callMethod("append", t_trackData, 0)
  }

  } else {
  t_memname = t_ar_config[t_sample];
  t_mem = callNamed("member", callNamed("getmemnum", t_memname));
  if (lingoBinary("lt", t_sampleNum, 16)) {
  var tNext = t_pData[t_channelNum][lingoBinary("add", t_sampleNum, 1)];
  if (lingoBinary("eq", tNext, -float(1))) {
  t_imgSample = meProp(_me, "m_imgLongSample1");
  } else {
  t_imgSample = meProp(_me, "m_imgSample");
  }

  } else {
  t_imgSample = meProp(_me, "m_imgSample");
  }

  callMethod("append", t_trackData, t_mem)
  }

  if ((lingoTruthy(t_error) ? 0 : 1)) {
  var t_sSymbolNum = callMethod("getSongType", _me, t_memname);
  var a_sInst = callMethod("getInstrumentType", _me, t_memname);
  switch (a_sInst) {
case "drm":
  var tBtnColor = "red";
  var t_Col = callNamed("rgb", "6F0000");
  break;
case "gtr":
  tBtnColor = "green";
  t_Col = callNamed("rgb", "5C8B00");
  break;
case "fx":
  tBtnColor = "blue";
  t_Col = callNamed("rgb", "008687");
  break;
case "bas":
  tBtnColor = "orange";
  t_Col = callNamed("rgb", "B05800");
  break;
case "snt":
  tBtnColor = "pink";
  t_Col = callNamed("rgb", "C20081");
  break;
  default:
  t_Col = callNamed("rgb", 20, 30, 210);
  }

  var t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", lingoBinary("join", tBtnColor, t_sSymbolNum), ".big"))).image;
  callMethod("ChangeImage", callMethod("getInterface", _me), t_channelNum, t_sampleNum, t_Col, t_imgSample, t_Img)
  }

  } else {
  callMethod("append", t_trackData, t_sample)
  }

  t_sampleNum = lingoBinary("add", t_sampleNum, 1);
  }

  callMethod("append", t_ar_trackLengths, t_Length)
  meProp(_me, "m_mp_TrackData")[t_channelNum._string] = t_trackData;
  t_channelNum = lingoBinary("add", t_channelNum, 1);
  }

  callMethod("SetUpPlaying", _me)
}

