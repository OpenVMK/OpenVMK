// 239fb1d2675fc448140198b03238814c.cct / CLoadingWindow / DeleteWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DeleteWindow(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rWindow")))
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rAnimationManager)) {
  callMethod("RemoveAnimation", t_rAnimationManager, "animation")
  }

  if (callNamed("objectp", meProp(_me, "m_LoopSnd_obj"))) {
  callMethod("StopSound", meProp(_me, "m_LoopSnd_obj"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_LoopSnd_obj")))
  callNamed("executeMessage", "LoadRoomSound")
  }

  var t_rWindow = undefined;
  setMeProp(_me, "m_objClient", undefined);
  setMeProp(_me, "m_LoopSnd_obj", undefined);
  }

}

