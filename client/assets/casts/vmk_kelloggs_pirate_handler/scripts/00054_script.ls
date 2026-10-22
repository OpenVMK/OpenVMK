-- Script
property m_ActiveItemSprites
property m_sKelloggsWindowTitle

on construct me
  m_sKelloggsWindowTitle = "Kelloggs Treasure Window"
  registerMessage(#room_ready, me.getID(), #initActiveItems)
  m_ActiveItemSprites = []
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #initActiveItems)
  repeat with tSprite in m_ActiveItemSprites
    removeEventBroker(tSprite.spriteNum)
  end repeat
  return 1
end
on initActiveItems me
  m_ActiveItemSprites = []
  tSpriteNames = ["treasure_chest", "kelloggs_promo"]
  repeat with tSprite in tSpriteNames
    me.createProcedure(tSprite, #EventProc)
  end repeat
end
on createProcedure me, t_NodeName, t_eventProc
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", t_NodeName)
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    m_ActiveItemSprites.append(tSprite)
    t_ActiveItemSprite = sprite(tSprite)
    setEventBroker(t_ActiveItemSprite.spriteNum, t_NodeName)
    t_ActiveItemSprite.registerProcedure(t_eventProc, me.getID(), #mouseUp)
    t_ActiveItemSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
  end if
end
on EventProc me, tEvent, tElemID, tParm
  case tElemID of
    "treasure_chest":
      if tEvent = #mouseUp then
        if the doubleClick then
          tRoomContext = getThread(#room).getComponent()._AccessRoom()
          tItem = tRoomContext.Search("TYPE", "254")
          if not voidp(tItem) then
            me.getHandler().TreasureChestClicked(integer(tItem.GetParam("REF")))
          else
            put "The Kelloggs Treasure Chest Item wasn not found"
          end if
        end if
      end if
    "kelloggs_promo":
      me.showKelloggsWindow(1)
    otherwise:
      put "Treasure Island is listening on something strange:" && tElemID

  end case
end
on showKelloggsWindow me, a_true
  if a_true then
    if getWindow(m_sKelloggsWindowTitle) <> 0 then
      getWindow(m_sKelloggsWindowTitle).setProperty(#visible, 1)
    else
      if createWindow(m_sKelloggsWindowTitle, "vmk_basic.window") then
        if getWindow(m_sKelloggsWindowTitle).merge("vmk_kelloqgs_promo.window") then
          tWndObj = getWindow(m_sKelloggsWindowTitle)
          tWndObj.registerClient(me.getID())
          tWndObj.registerProcedure(#EventProcKelloggsWindow, me.getID(), #mouseUp)
          tElem = tWndObj.getElement("basic.window.title")
          if tElem <> 0 then
            tElem.setText(getText("kelloggs.title"))
          end if
        else
          error(me, "Failed to merge Kelloggs window", #showKelloggsWindow)
        end if
      else
        error(me, "Failed to create Kelloggs window", #showKelloggsWindow)
      end if
    end if
  else
    removeWindow(m_sKelloggsWindowTitle)
  end if
end
on EventProcKelloggsWindow me, tEvent, tElemID, tParm
  put [tEvent, tElemID, tParm]
  if tEvent = #mouseUp then
    case tElemID of
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sKelloggsWindowTitle)
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, "help.kelloggs.promo")
      "quest.vmksite":
        executeMessage("PlayInterfaceSound", "UI-click")
        t_sURL = getText("kelloggs.promo.url")
        if t_sURL = 0 then
        else
          gotoNetPage(t_sURL, "_new")
        end if
      otherwise:
        put "Kelloggs element" && tElemID

    end case
  end if
end