// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / ParseSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseSounds(_me: LingoMe, a_sSoundList: LingoValue) {
  if (callNamed("memberExists", a_sSoundList)) {
  setMeProp(_me, "m_mp_SoundProperties", new LingoPropList([]));
  var t_rDocXML = callNamed("CreateXML");
  var t_mem = callNamed("member", callNamed("getmemnum", a_sSoundList)).text;
  callMethod("open", t_rDocXML, t_mem)
  if (callMethod("Search", t_rDocXML, "type", "SOUNDS")) {
  var t_rSOundList = callMethod("GetNode", t_rDocXML);
  var t_iSoundCount = t_rSOundList.child.count;
  for (var i = 1; i <= t_iSoundCount; ++i) {
  var t_mp_Child = t_rSOundList.child[i];
  if (callMethod("findPos", t_mp_Child.param, "member")) {
  var t_sName = t_mp_Child.param["member"];
  if (callNamed("memberExists", t_sName)) {
  var t_arList = new LingoPropList([symbol("member"), callNamed("member", callNamed("getmemnum", t_sName))]);
  /*
   * ⚠ HAND-CORRECTED — DIAGNOSTIC ONLY, no behaviour change.
   * ⚠ RE-APPLY THIS AFTER ANY REGENERATION of client/src/generated-casts.
   *
   * `memberExists` and `getmemnum` answer from DIFFERENT places: the former
   * from the cast registry, the latter from `CMgrResource.pAllMemNumList`,
   * which `preIndexMembers` fills when a cast attaches. So they can disagree,
   * and when they do this line stores `member(0)` — an EMPTY member — while the
   * guard above says everything is fine.
   *
   * That is silent: the cue is registered, the tracker plays it, and `setPlayList`
   * gets a member with no sound. MEASURED in the VMK Gallery — the stored entry
   * came out `[#member: <empty>]` for GLR-music while `getmemnum` answered
   * correctly 12300004 by the time anything looked. The room's only cue sits at
   * t=0.1 and its tracker has no <END>, so it never loops and never retries: one
   * miss at room entry is permanent silence.
   *
   * Report the disagreement AT THE MOMENT IT HAPPENS, which is the one thing
   * no amount of after-the-fact inspection can recover.
   */
  if (lingoBinary("eq", callNamed("member", callNamed("getmemnum", t_sName)).name, "")) {
  callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", "SOUND MEMBER RESOLVED EMPTY:", t_sName), lingoBinary("joinPad", "getmemnum =", callNamed("getmemnum", t_sName))), symbol("ParseSounds"))
  }

  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "No such Member:", t_sName), symbol("ParseSounds"));
  }

  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Sound name Missing:", t_mp_Child.param), symbol("ParseSounds"));
  }

  for (var e = 2; e <= t_mp_Child.param.count; ++e) {
  var t_kSymbol = callNamed("symbol", callMethod("getPropAt", t_mp_Child.param, e));
  var t_iValue = callNamed("value", t_mp_Child.param[e]);
  t_arList[t_kSymbol] = t_iValue;
  }

  meProp(_me, "m_mp_SoundProperties")[t_sName] = t_arList;
  }

  }

  } else {
  }

}

