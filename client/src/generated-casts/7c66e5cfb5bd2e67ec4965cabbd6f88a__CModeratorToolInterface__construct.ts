// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  var m_sWindowID = "Moderator_Message";
  var m_mp_MessageIDList = new LingoPropList([]);
  callNamed("registerMessage", "show_mod_window", callMethod("getID", _this), symbol("ShowModsWindow"))
  callNamed("registerMessage", "room_avatar_selection", callMethod("getID", _this), symbol("AvatarSelected"))
  callNamed("registerMessage", "OpenModerationMenu", callMethod("getID", _this), symbol("OpenModMenu"))
  setMeProp(_me, "m_objModMessage", callNamed("createObject", "ModMessage", "CModeratorMessage"));
  setMeProp(_me, "m_objModAKB", callNamed("createObject", "ModAKB", "CModeratorAKB"));
  setMeProp(_me, "m_objModMenu", callNamed("createObject", "ModMenu", "CModeratorMenu"));
  return 1;
}

