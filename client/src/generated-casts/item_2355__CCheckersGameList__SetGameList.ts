// item_2355.cct / CCheckersGameList / SetGameList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetGameList(_me: LingoMe, _this: LingoValue, a_ar_rGames: LingoValue) {
  callNamed("callAncestor", symbol("SetGameList"), _this, a_ar_rGames)
  if (callNamed("objectp", meProp(_me, "m_rComponent"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rComponent")))
  setMeProp(_me, "m_rComponent", undefined);
  }

  setMeProp(_me, "m_rComponent", callNamed("createObject", callNamed("getUniqueID"), "CUIComponentPage"));
  callMethod("setSize", meProp(_me, "m_rComponent"), meProp(_me, "m_rElement").pOwnW, meProp(_me, "m_rElement").pOwnH)
  callMethod("setColor", meProp(_me, "m_rComponent"), callNamed("rgb", "#001F56"))
  var t_iCount = a_ar_rGames.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rComponent = callMethod("addComponent", meProp(_me, "m_rComponent"), "component.casual.gamelist.watch.item.xml");
  var t_sText = "";
  var t_sPlayer = a_ar_rGames[i].players[1].name;
  var t_sScore = callNamed("string", a_ar_rGames[i].players[1].score);
  t_sText = t_sText + lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", t_sPlayer, "Lvl:"), t_sScore), "\r"), "vs"), "\r");
  t_sPlayer = a_ar_rGames[i].players[2].name;
  t_sScore = callNamed("string", a_ar_rGames[i].players[2].score);
  t_sText = t_sText + lingoBinary("join", lingoBinary("joinPad", t_sPlayer, "Lvl:"), t_sScore);
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), t_sText)
  }

  callMethod("feedImage", meProp(_me, "m_rElement"), callMethod("render", meProp(_me, "m_rComponent")))
}

