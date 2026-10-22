// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  callMethod("set", callNamed("getObject", symbol("session")), "user_credits", 0)
  setMeProp(_me, "m_rTradeDevice", undefined);
  setMeProp(_me, "m_bInventoryRequested", 0);
  setMeProp(_me, "m_iCredits", 0);
  setMeProp(_me, "m_mp_iRedeemPrice", callNamed("getVariableValue", "redeemprices"));
  if (callNamed("voidp", meProp(_me, "m_mp_iRedeemPrice"))) {
  setMeProp(_me, "m_mp_iRedeemPrice", new LingoPropList([]));
  }

  setMeProp(_me, "m_mp_iInventory", new LingoPropList([]));
  callMethod("addProp", meProp(_me, "m_mp_iInventory"), 1, callNamed("createObject", "mainInventory", "CInventoryContainer"))
  callMethod("addProp", meProp(_me, "m_mp_iInventory"), 2, callNamed("createObject", "wornClothes", "CInventoryContainer"))
  callMethod("addProp", meProp(_me, "m_mp_iInventory"), 3, callNamed("createObject", "wornPins", "CInventoryContainer"))
  callMethod("addProp", meProp(_me, "m_mp_iInventory"), 4, callNamed("createObject", "questPrize", "CInventoryContainer"))
  callMethod("addProp", meProp(_me, "m_mp_iInventory"), 5, callNamed("createObject", "carryOnVmks", "CInventoryContainer"))
  callMethod("_SetState", _this, symbol("reset"))
  callNamed("registerMessage", "room_ready", callMethod("getID", _this), symbol("reset"))
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("TradeClose"))
  setMeProp(_me, "m_ar_mpCreditsCallbacks", new LingoList([]));
  return 1;
}

