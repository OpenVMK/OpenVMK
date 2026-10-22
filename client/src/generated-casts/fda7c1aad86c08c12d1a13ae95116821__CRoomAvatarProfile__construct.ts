// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rSelected", undefined);
  setMeProp(_me, "m_rControls", undefined);
  setMeProp(_me, "m_iTradeState", -float(1));
  setMeProp(_me, "m_iFriendRequestState", -float(1));
  setMeProp(_me, "m_ar_rPinData", undefined);
  callNamed("registerMessage", "ask_friendship", callMethod("getID", _this), symbol("AskFriendship"))
  callNamed("registerMessage", "RemoveAvatar", callMethod("getID", _this), symbol("_RemoveAvatarCbk"))
  callNamed("registerMessage", "close_profile", callMethod("getID", _this), symbol("CloseProfile"))
  callNamed("registerMessage", "CreateAvatar", callMethod("getID", _this), symbol("UpdateAvatarProfile"))
  setMeProp(_me, "m_rPinGrid", callNamed("createObject", callNamed("getUniqueID"), "CGenericThumbnailGrid"));
  return 1;
}

