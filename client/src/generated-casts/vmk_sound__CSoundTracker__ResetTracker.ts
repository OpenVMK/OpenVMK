// vmk_sound.cct / CSoundTracker / ResetTracker

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResetTracker(_me: LingoMe) {
  setMeProp(_me, "m_arLoopChannels", new LingoList([]));
  for (var i = 1; i <= 8; ++i) {
  if (lingoBinary("gt", callNamed("sound", i).loopCount, 0)) {
  callMethod("add", meProp(_me, "m_arLoopChannels"), i)
  }

  }

  if (lingoBinary("gt", meProp(_me, "m_ar_OneShot").count, 0)) {
  for (var f = 1; f <= meProp(_me, "m_ar_OneShot").count; ++f) {
  var t_iPos = callMethod("findPos", meProp(_me, "m_mpSoundData"), callMethod("getPropAt", meProp(_me, "m_ar_OneShot"), f));
  var t_ar_List = meProp(_me, "m_ar_OneShot")[f];
  if (lingoBinary("neq", callMethod("findPos", t_ar_List[2], meProp(_me, "m_iMasterLoopCount")), undefined)) {
  if (lingoBinary("gt", t_iPos, 0)) {
  callMethod("add", meProp(_me, "m_mpSoundData")[t_iPos], t_ar_List[1])
  }

  continue;
  }

  if (lingoBinary("gt", t_iPos, 0)) {
  for (var e = 1; e <= meProp(_me, "m_mpSoundData")[t_iPos].count; ++e) {
  if (lingoBinary("eq", meProp(_me, "m_mpSoundData")[t_iPos][e][1], meProp(_me, "m_ar_OneShot")[f][1][1])) {
  callMethod("deleteAt", meProp(_me, "m_mpSoundData")[t_iPos], e)
  break;
  }

  }

  }

  }

  }

  setMeProp(_me, "m_iMasterLoopCount", lingoBinary("add", meProp(_me, "m_iMasterLoopCount"), 1));
  setMeProp(_me, "m_CurrentTime", float(0));
  setMeProp(_me, "m_mp_SndTypes", new LingoPropList([]));
}

