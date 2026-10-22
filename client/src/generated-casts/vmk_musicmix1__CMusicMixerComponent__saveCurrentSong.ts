// vmk_musicmix1.cct / CMusicMixerComponent / saveCurrentSong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function saveCurrentSong(_me: LingoMe, t_ar_songName: LingoValue) {
  var t_ar_config = callNamed("getVariableValue", "samples.config");
  var t_data = new LingoList([]);
  var t_shortData = new LingoList([]);
  for (var t_channel of meProp(_me, "m_mp_TrackData").toArray()) {
  var t_track = new LingoList([]);
  for (var t_sample of t_channel.toArray()) {
  if (lingoBinary("and", lingoBinary("neq", t_sample, 0), lingoBinary("neq", t_sample, -float(1)))) {
  var t_index = callMethod("getOne", t_ar_config, t_sample.name);
  var t_sampleName = t_index;
  } else {
  t_sampleName = t_sample;
  }

  callMethod("append", t_track, t_sampleName)
  }

  callMethod("append", t_data, t_track)
  var t_short = callMethod("duplicate", t_track);
  for (var t_index = t_short.count; t_index >= 1; --t_index) {
  if (lingoBinary("eq", t_short[t_index], 0)) {
  callMethod("deleteAt", t_short, t_index)
  continue;
  }

  break;
  }

  callMethod("append", t_shortData, t_short)
  }

  var t_sendData = callNamed("replaceChunks", t_shortData._string, " ", "");
  if (lingoBinary("eq", callMethod("getEditingMode", _me), symbol("edit"))) {
  callMethod("SaveSong", callMethod("getHandler", _me), lingoBinary("sub", callMethod("getActiveSong", _me), 1), t_ar_songName, t_sendData)
  } else {
  if (lingoBinary("eq", callMethod("getEditingMode", _me), symbol("new"))) {
  callMethod("CreateSong", callMethod("getHandler", _me), t_ar_songName, t_sendData)
  }

  }

}

