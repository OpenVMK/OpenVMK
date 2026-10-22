// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / RoomSellConfRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoomSellConfRequest(_me: LingoMe, a_rMsg: LingoValue) {
  var t_iSpaceID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sSpaceName = callMethod("GetStrFrom", a_rMsg.connection);
  var t_iRefund = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _me), "ConfirmRoomSell", 2, 1);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", callNamed("getText", "nav.sellroom.desc1"), t_sSpaceName), callNamed("getText", "nav.sellroom.desc2")), t_iRefund), callNamed("getText", "nav.sellroom.desc3")), callNamed("getText", "nav.sellroom.title"), callNamed("getText", "nav.sellroom.no"), callNamed("getText", "nav.sellroom.yes"))
  setMeProp(_me, "m_iSellRoomID", t_iSpaceID);
}

