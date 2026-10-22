// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / LoadArrangement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadArrangement(_me: LingoMe, i_ar_animContainers: LingoValue) {
  setMeProp(_me, "m_ar_sounds", new LingoPropList([]));
  setMeProp(_me, "m_ar_animContainers", new LingoList([]));
  setMeProp(_me, "m_ar_pAnimations", new LingoList([]));
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_total_offset = 0;
  for (var tContainer of i_ar_animContainers.toArray()) {
  var t_type = callMethod("getaProp", tContainer, symbol("type"));
  if (lingoBinary("eq", t_type, "sound")) {
  meProp(_me, "m_ar_sounds")[callNamed("string", tContainer.offset)] = new LingoPropList([symbol("name"), tContainer.name, symbol("playcount"), 0]);
  continue;
  }

  var tNewAnim = callNamed("createObject", symbol("random"), "CAnimation");
  var t_mp_loop = callNamed("getVariableValue", tContainer.loop);
  callMethod("load", tNewAnim, callMethod("duplicate", t_mp_loop.framelist), t_mp_loop.loopstart, t_mp_loop.loopend, t_mp_loop.loopCount, t_mp_loop.freeze, callMethod("getaProp", t_mp_loop, symbol("sounds")))
  callMethod("append", meProp(_me, "m_ar_pAnimations"), tNewAnim)
  callMethod("append", meProp(_me, "m_ar_pNodes"), callMethod("Search", tRoomContext, "NAME", tContainer.node))
  callMethod("append", meProp(_me, "m_ar_animContainers"), tContainer)
  }

  callMethod("getRunningLength", _me)
}

