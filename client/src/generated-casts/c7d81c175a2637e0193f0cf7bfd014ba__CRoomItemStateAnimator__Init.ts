// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemStateAnimator / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe) {
  setMeProp(_me, "m_ar_frames", new LingoList([]));
  var t_rItem = callMethod("getObject", _me);
  setMeProp(_me, "m_iDir", callNamed("integer", callMethod("GetParam", t_rItem, "DIR")));
  if (callMethod("checkAniReady", _me)) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rStructure"))) ? 0 : 1)) {
  var t_iType = callNamed("integer", callMethod("GetParam", t_rItem, "TYPE"));
  setMeProp(_me, "m_rStructure", callNamed("GetItemAniStructure", t_iType));
  }

  var t_ar_props = new LingoPropList([symbol("frames"), undefined, symbol("sound"), undefined, symbol("condition"), undefined, symbol("delay"), meProp(_me, "m_iMaxDelay"), symbol("loop"), 0]);
  var t_bSuccess = callMethod("returnAnimatedBlocks", meProp(_me, "m_rStructure"), meProp(_me, "m_iState"), meProp(_me, "m_iDir"), t_ar_props);
  if (t_bSuccess) {
  callMethod("setFrames", _me, t_ar_props.frames)
  callMethod("setSound", _me, t_ar_props.sound)
  callMethod("setCondition", _me, t_ar_props.condition)
  callMethod("setDelay", _me, t_ar_props.delay)
  callMethod("setLoop", _me, t_ar_props.loop)
  }

  setMeProp(_me, "m_bInteractive", callMethod("GetInteractive", meProp(_me, "m_rStructure")));
  setMeProp(_me, "m_bReady", 1);
  }

}

