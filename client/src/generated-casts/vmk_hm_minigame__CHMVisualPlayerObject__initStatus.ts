// vmk_hm_minigame.cct / CHMVisualPlayerObject / initStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initStatus(_me: LingoMe, i_rAvatar: LingoValue) {
  setMeProp(_me, "m_rOwner", i_rAvatar);
  setMeProp(_me, "m_rAvatarRenderer", callMethod("GetRenderer", callMethod("GetVisual", i_rAvatar)));
  var t_sName = callMethod("GetParam", i_rAvatar, "NAME");
  setMeProp(_me, "m_rStatus", callNamed("createObject", lingoBinary("join", lingoBinary("join", "HMAvatar_", t_sName), ".status"), "CHMPlayerStatus"));
  callMethod("Init", meProp(_me, "m_rStatus"), t_sName, callMethod("GetParam", callMethod("getObject", _me), "Team"))
}

