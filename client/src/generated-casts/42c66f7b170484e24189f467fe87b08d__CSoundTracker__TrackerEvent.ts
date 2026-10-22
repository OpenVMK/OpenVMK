// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / TrackerEvent

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
  /*
   * ⚠ HAND-CORRECTED — DIAGNOSTIC ONLY, no behaviour change.
   * ⚠ RE-APPLY THIS AFTER ANY REGENERATION of client/src/generated-casts.
   *
   * A cue that is FOUND and still makes no sound has several silent exits below
   * — the sprite-type switch, the empty-playlist branch, `CheckTypeStatus`, or
   * `sound(n)` not being an object — and none of them say anything.
   *
   * MEASURED in the VMK Gallery: `StartRoomSounds` reported `sounds=2
   * cueTimes=1`, the members resolved, `CheckTypeStatus` answered 1, session
   * music and fx were both on, `sound(4)`/`sound(5)` were objects, and
   * `findPos` located the cue — yet rewinding the clock past 0.1 played nothing.
   * Everything checkable from outside says it should work, so the answer has to
   * come from inside the branch.
   */
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad",
    "SNDCUE snd=", t_Snd), lingoBinary("joinPad", "ch=", t_iChannel)),
    lingoBinary("joinPad", "type=", t_sType)))
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
  if (lingoBinary("gt", callNamed("sound", t_iChannel).volume, meProp(_me, "m_iVolume"))) {
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
  if (lingoBinary("gt", callNamed("sound", t_iChannel).volume, meProp(_me, "m_iVolume"))) {
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

