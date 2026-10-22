// vmk_sound.cct / CSoundTracker / TrackerEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrackerEvent(_me: LingoMe) {
  var t_FloatPre = theProperty("floatPrecision");
  setTheProperty("floatPrecision", 1);
  setMeProp(_me, "m_CurrentTime", lingoBinary("add", meProp(_me, "m_CurrentTime"), 0.1));
  var t_iPos = callMethod("findPos", meProp(_me, "m_mpSoundData"), callNamed("string", meProp(_me, "m_CurrentTime")));
  setTheProperty("floatPrecision", t_FloatPre);
  if (lingoBinary("gte", meProp(_me, "m_CurrentTime"), meProp(_me, "m_mpEndTime"))) {
  callMethod("ResetTracker", _me)
  }

  if (lingoBinary("neq", t_iPos, 0)) {
  for (var i = 1; i <= meProp(_me, "m_mpSoundData")[t_iPos].count; ++i) {
  var t_Snd = meProp(_me, "m_mpSoundData")[t_iPos][i][1];
  var t_iChannel = meProp(_me, "m_mpSoundData")[t_iPos][i][2];
  var t_sType = meProp(_me, "m_mpSoundData")[t_iPos][i][3];
  var t_arPref = meProp(_me, "m_mpSoundData")[t_iPos][i][4];
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_arLoopChannels"))) ? 0 : 1)) {
  var t_iData = callMethod("findPos", meProp(_me, "m_arLoopChannels"), t_iChannel);
  }

  if (lingoBinary("eq", t_iData, 0)) {
  switch (t_sType) {
case "sound":
case "music":
case "fx":
case "Music":
case "FX":
  if (callNamed("objectp", callNamed("sound", t_iChannel))) {
  if (lingoBinary("neq", callMethod("getPlaylist", callNamed("sound", t_iChannel)), new LingoList([]))) {
  callMethod("stop", callNamed("sound", t_iChannel))
  var t_SndData = callNamed("value", meProp(_me, "m_mp_SoundProperties")[t_Snd]);
  callMethod("setPlayList", callNamed("sound", t_iChannel), t_SndData)
  if ((lingoTruthy(callNamed("voidp", t_SndData)) ? 0 : 1)) {
  var t_bStatus = callMethod("CheckTypeStatus", _me, t_SndData[symbol("member")]);
  if (t_bStatus) {
  callNamed("call", symbol("play"), new LingoList([callNamed("sound", t_iChannel)]))
  if (lingoBinary("neq", callNamed("sound", t_iChannel).volume, meProp(_me, "m_iVolume"))) {
  setThePropOf(callNamed("sound", t_iChannel), "volume", meProp(_me, "m_iVolume"));
  }

  }

  }

  } else {
  if (callNamed("memberExists", t_Snd)) {
  t_SndData = callNamed("value", meProp(_me, "m_mp_SoundProperties")[t_Snd]);
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", t_SndData)) ? 0 : 1), callNamed("objectp", callNamed("sound", t_iChannel)))) {
  t_bStatus = callMethod("CheckTypeStatus", _me, t_SndData[symbol("member")]);
  if (t_bStatus) {
  callNamed("call", symbol("queue"), new LingoList([callNamed("sound", t_iChannel)]), t_SndData)
  callNamed("call", symbol("play"), new LingoList([callNamed("sound", t_iChannel)]))
  if (lingoBinary("neq", callNamed("sound", t_iChannel).volume, meProp(_me, "m_iVolume"))) {
  setThePropOf(callNamed("sound", t_iChannel), "volume", meProp(_me, "m_iVolume"));
  }

  }

  }

  } else {
  }

  }

  }

  break;
case "fade":
  var t_iDuration = t_arPref[1];
  callMethod("fadeOut", callNamed("sound", t_iChannel), t_iDuration)
  break;
case "vol":
  if (lingoBinary("eq", t_arPref.count, 3)) {
  callMethod("EventTimer", _me, new LingoPropList(["channel", t_iChannel, "min", t_arPref[1], "max", t_arPref[2], "event", t_sType, "time", t_arPref[3]]))
  } else {
  var t_iVol = t_arPref[1];
  if (lingoBinary("gt", t_iVol, meProp(_me, "m_iVolume"))) {
  t_iVol = meProp(_me, "m_iVolume");
  }

  setThePropOf(callNamed("sound", t_iChannel), "volume", t_iVol);
  }

  break;
case "pan":
  if (lingoBinary("eq", t_arPref.count, 3)) {
  callMethod("EventTimer", _me, new LingoPropList(["channel", t_iChannel, "min", t_arPref[1], "max", t_arPref[2], "event", t_sType, "time", t_arPref[3]]))
  } else {
  setThePropOf(callNamed("sound", t_iChannel), "pan", t_arPref[1]);
  }

  break;
  break;
  break;
  break;
  break;
  }

  }

  }

  }

}

