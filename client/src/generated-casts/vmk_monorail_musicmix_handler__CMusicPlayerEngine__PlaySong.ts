// vmk_monorail_musicmix_handler.cct / CMusicPlayerEngine / PlaySong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySong(_me: LingoMe, t_pData: LingoValue) {
  if (callNamed("timeoutExists", "MonorailStartRoomSound")) {
  callNamed("removeTimeout", "MonorailStartRoomSound")
  }

  if (callNamed("timeoutExists", "MonorailEndSong")) {
  callNamed("removeTimeout", "MonorailEndSong")
  }

  callNamed("executeMessage", "TrainStartSong")
  if (callMethod("get", callNamed("getObject", symbol("session")), "music")) {
  callNamed("executeMessage", "StopRoomSound")
  }

  if (callMethod("get", callNamed("getObject", symbol("session")), "music")) {
  callMethod("ClearAll", _me)
  for (var t_channel of t_pData.toArray()) {
  while (lingoBinary("lt", t_channel.count, 16)) {
  callMethod("append", t_channel, 0)
  }

  }

  var t_ar_config = callNamed("getVariableValue", "samples.config");
  var t_channelNum = 1;
  callMethod("ClearAll", _me)
  var t_ar_trackLengths = new LingoList([]);
  for (var t_channel of t_pData.toArray()) {
  var t_trackData = new LingoList([]);
  var t_sampleNum = 1;
  var t_Length = 0;
  for (var t_sample of t_channel.toArray()) {
  if (lingoBinary("neq", t_sample, 0)) {
  t_Length = t_sampleNum;
  }

  if (lingoBinary("and", lingoBinary("neq", t_sample, 0), lingoBinary("neq", t_sample, -float(1)))) {
  var t_memname = t_ar_config[t_sample];
  var t_mem = callNamed("member", callNamed("getmemnum", t_memname));
  callMethod("append", t_trackData, t_mem)
  } else {
  callMethod("append", t_trackData, t_sample)
  }

  t_sampleNum = lingoBinary("add", t_sampleNum, 1);
  }

  callMethod("append", t_ar_trackLengths, t_Length)
  meProp(_me, "m_mp_TrackData")[t_channelNum._string] = t_trackData;
  t_channelNum = lingoBinary("add", t_channelNum, 1);
  }

  callNamed("createTimeout", "MonorailEndSong", lingoBinary("mul", callMethod("max", t_ar_trackLengths), 1778), symbol("trainEndSong"), callMethod("getID", _me), undefined, 1)
  } else {
  callNamed("createTimeout", "MonorailEndSong", lingoBinary("mul", 16, 1778), symbol("trainEndSong"), callMethod("getID", _me), undefined, 1)
  }

  if (callMethod("get", callNamed("getObject", symbol("session")), "music")) {
  callNamed("put", lingoBinary("join", lingoBinary("joinPad", "Song length", lingoBinary("mul", callMethod("max", t_ar_trackLengths), 2)), " sec"))
  callNamed("createTimeout", "MonorailStartRoomSound", lingoBinary("mul", lingoBinary("mul", callMethod("max", t_ar_trackLengths), 2), 1000), symbol("playRoomSounds"), callMethod("getID", _me), undefined, 1)
  setMeProp(_me, "m_iLastSample", callMethod("max", t_ar_trackLengths));
  setMeProp(_me, "m_kNextState", symbol("start"));
  }

}

