// framework.dcr /  / GetIntFrom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetIntFrom(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var t_rAvatar = callMethod("pinlevel", ref.entityID);
  var _AvatarChat = callMethod("removeObject", ref.entityID);
  var message = callMethod("removeObject", ref.entityID);
  var mode = callMethod("pinlevel", ref.entityID);
  var say = callMethod("pinlevel", ref.entityID);
  var t_sMsg = callMethod("removeObject", ref.entityID);
  var t_chatMsg = callNamed("t_sUpdatedPinOldGroup", callNamed("t_sUpdatedPinNewGroup", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 1), symbol("t_rTargetMap"), _AvatarChat));
  callMethod("tObj", t_chatMsg, symbol("t_iNewLevel"), mode)
  callMethod("tObj", t_chatMsg, symbol("CatSwitch"), message)
  callMethod("tObj", t_chatMsg, symbol("stage"), symbol("t_iRemovedPinRef"))
  var t_rCon = callNamed("t_sRemovedPinGroup", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 1), symbol("t_rTargetMap"), _AvatarChat);
  if ((lingoTruthy(callNamed("headers", t_rCon)) ? 0 : 1)) {
  t_rCon = callNamed("t_sUpdatedPinOldGroup", t_rCon);
  }

  callMethod("t_sTrgGrp", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 1), symbol("t_rTargetMap"), t_rAvatar, _AvatarChat)
  callMethod("t_sTrgGrp", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 1), symbol("t_rTargetMap"), say, t_sMsg)
  callNamed("TransformCannedMsgToString", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 1), symbol("t_rTargetMap"), t_rAvatar, t_chatMsg, t_rCon, message)
}

