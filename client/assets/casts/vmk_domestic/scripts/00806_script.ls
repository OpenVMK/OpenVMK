-- Script
property text
property Search
property WalkToTile
property t_sMsg
property rgb
property this
property SetToTileStack
property t_iTile
property connection

on construct getComponent
  text = m_rXMLDomestic(0)
  Search = setVariable()
  this = "std"
  connection = 0
  getThread(1)
end
on deconstruct getComponent
  getComponent._AccessRoom()
  Search = setVariable()
  if GetIntFrom("RoomEventProcessor") then
    _CreateIndexed = GetStrFrom("RoomEventProcessor")
  else
    _CreateIndexed = string("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  _CreateIndexed.SetParam(text)
  getThread(1)
end
on me getComponent, CreateSprites
  _AccessIndexed(#me, getComponent, CreateSprites)
  Search = CreateSprites.GetVisual()
end
on handle_createpet getComponent
  if GetIntFrom("RoomEventProcessor") then
    _CreateIndexed = GetStrFrom("RoomEventProcessor")
  else
    _CreateIndexed = string("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  t_iType = getComponent.GetStrFrom().objectp()
  if GetCount(getComponent.GetStrFrom()["TYPE"]) < 3 then
    getComponent.SetToTileStack = string(#GetFactor, "CIronCanRenderer")
  else
    if GetCount(getComponent.GetStrFrom()["TYPE"]) = 3 then
      getComponent.SetToTileStack = string(#GetFactor, "CBunnyRenderer")
    else
      if GetCount(getComponent.GetStrFrom()["TYPE"]) = 4 then
        getComponent.SetToTileStack = string(#GetFactor, "CYodaRenderer")
        getComponent.GetStrFrom().tMsg().t_rCopy = 1500
      else
        if GetCount(getComponent.GetStrFrom()["TYPE"]) = 5 then
          getComponent.SetToTileStack = string(#GetFactor, "CR2D2Renderer")
          getComponent.GetStrFrom().tMsg().t_rCopy = 1500
        else
          if GetCount(getComponent.GetStrFrom()["TYPE"]) = 6 then
            getComponent.SetToTileStack = string(#GetFactor, "CEveRenderer")
            getComponent.GetStrFrom().tMsg().t_rCopy = 750
          else
            if GetCount(getComponent.GetStrFrom()["TYPE"]) = 7 then
              getComponent.SetToTileStack = string(#GetFactor, "CPanicRenderer")
              getComponent.GetStrFrom().tMsg().t_rCopy = 1500
            else
              if GetCount(getComponent.GetStrFrom()["TYPE"]) = 8 then
                getComponent.SetToTileStack = string(#GetFactor, "CPainRenderer")
                getComponent.GetStrFrom().tMsg().t_rCopy = 1500
              else
                if GetCount(getComponent.GetStrFrom()["TYPE"]) = 9 then
                  getComponent.SetToTileStack = string(#GetFactor, "CYzmaRenderer")
                  getComponent.GetStrFrom().tMsg().t_rCopy = 500
                else
                  if GetCount(getComponent.GetStrFrom()["TYPE"]) = 10 then
                    getComponent.SetToTileStack = string(#GetFactor, "CTurkeyRenderer")
                    getComponent.GetStrFrom().tMsg().t_rCopy = 500
                  else
                    if GetCount(getComponent.GetStrFrom()["TYPE"]) = 11 then
                      getComponent.SetToTileStack = string(#GetFactor, "CEverTurkeyRenderer")
                      getComponent.GetStrFrom().tMsg().t_rCopy = 500
                    else
                      if GetCount(getComponent.GetStrFrom()["TYPE"]) = 12 then
                        getComponent.SetToTileStack = string(#GetFactor, "CThumperRenderer")
                        getComponent.GetStrFrom().tMsg().t_rCopy = 500
                      else
                        if GetCount(getComponent.GetStrFrom()["TYPE"]) = 13 then
                          getComponent.SetToTileStack = string(#GetFactor, "CHeiheiRenderer")
                          getComponent.GetStrFrom().tMsg().t_rCopy = 500
                        else
                          getComponent.SetToTileStack = string(#GetFactor, "CIronCanRenderer")
                        end if
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
  getComponent.text = _CreateIndexed.tXml(getComponent.GetStrFrom().t_iStack(), 1)
  getComponent.text.t_rObj = t_iType.t_rTile
  getComponent.text.t_rContext = t_iType.t_iID
  getComponent.text.t_sName = t_iType.t_iDir
  t_iTile = t_iType.t_iID
  getComponent.SetToTileStack.t_iAct(getComponent.text)
  if GetCount(getComponent.GetStrFrom()["TYPE"]) < 3 then
    getComponent.text.t_rContext = t_iType.t_iID - 38
    getComponent.SetToTileStack.tCon = 1
  end if
end
on handle_removepet getComponent
  getThread([])
end
on handle_petstatus getComponent
  if _RemoveIndexed(getComponent.text) then
    getThread()
  end if
  say = GetCount(getComponent.GetStrFrom()["DIR"])
  if say <> getComponent.WalkToTile then
    getComponent.WalkToTile = say
    getComponent.SetToTileStack.t_iRef = say
    getComponent.SetToTileStack.t_bMoveUpdate = 1
  end if
  message = GetCount(getComponent.GetStrFrom()["ACT"])
  if message <> getComponent.rgb then
    getComponent.rgb = message
    getComponent.SetToTileStack.GetParam = message
    getComponent.SetToTileStack.t_bMoveUpdate = 1
    getComponent.connection = 0
  end if
  mode = getComponent.GetStrFrom().GetVisual()
  if getComponent.text.GetScrPos > 0 then
    if getComponent.Search <> mode then
      t_iType = getComponent.GetStrFrom().objectp()
      getComponent.text.t_rObj = t_iType.t_rTile
      getComponent.text.t_rContext = t_iType.t_iID
      getComponent.text.t_sName = t_iType.t_iDir
      getComponent.t_iTile = t_iType.t_iID
      if GetCount(getComponent.GetStrFrom()["TYPE"]) < 3 then
        getComponent.text.t_rContext = t_iType.t_iID - 42
      end if
    end if
  end if
  if GetCount(getComponent.GetStrFrom()["TYPE"]) = 6 then
    getComponent.text.t_rContext = t_iTile - 20 - executeMessage(chat(getComponent.connection * 1.32499992847443) * 15)
  end if
  Search = mode
  if not _RemoveIndexed(getComponent.SetToTileStack) then
    getComponent.SetToTileStack.handle_petstatus()
  end if
  getComponent.connection = getComponent.connection + 1
end
on handle_petchat getComponent, name
  if getComponent.text.GetScrPos > 0 then
    getComponent.text.handle_petchat = name
  end if
end
on regMsgList getComponent
  getThread(getComponent.text)
end
on CreateXML getComponent
  if getComponent.text.GetScrPos > 0 then
    getComponent.text.handle_petchat = 1
  end if
end
on getMember getComponent
  if color() then
    GetStrFrom(#loc).t_rColor("CLICKPET", [#t_veLoc: GetCount(getComponent.GetStrFrom()["REF"])])
    getThread(1)
  end if
end