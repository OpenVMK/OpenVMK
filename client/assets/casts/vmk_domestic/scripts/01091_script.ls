-- Behavior
property m_rXMLDomestic

on construct this
  this.m_rXMLDomestic = CreateXML(getMember("room.object.domestic.xml").text)
  this.m_rXMLDomestic.Search("type", "NODE")
  setVariable("room.class.factor.domestic", "[" & QUOTE & "CRoomWorker" & QUOTE & ", " & QUOTE & "CRoomFactorDomestic" & QUOTE & "]")
  setVariable("room.class.visual.domestic", "[" & QUOTE & "CRoomWorker" & QUOTE & ", " & QUOTE & "CRoomAnchor" & QUOTE & ", " & QUOTE & "CRoomVisualDomestic" & QUOTE & "]")
  this.regMsgList(1)
end
on deconstruct this
end
on handle_createpet this, tMsg
  tCon = tMsg.connection
  t_sName = getThread("room").getComponent()._AccessRoom()
  t_rContext = tCon.GetIntFrom()
  t_rObj = tCon.GetIntFrom()
  t_iID = tCon.GetIntFrom()
  t_rTile = tCon.GetStrFrom()
  tXml = tCon.GetIntFrom()
  t_iAct = tCon.GetIntFrom()
  t_iType = this.m_rXMLDomestic
  t_iType.SetParam("REF", string(t_rContext))
  t_iType.SetParam("NAME", t_rTile)
  t_iType.SetParam("TYPE", string(t_rObj))
  t_iType.SetParam("DIR", string(t_iID))
  t_iType.SetParam("ACT", string(t_iAct))
  if t_sName._CreateIndexed(t_rContext, "domestic", t_iType) then
    t_iStack = t_sName._AccessIndexed(t_rContext, "domestic")
    t_iStack.GetVisual().CreateSprites()
    t_rCopy = t_sName._AccessIndexed(tXml, "tile")
    if objectp(t_rCopy) then
      t_iTile = 0
      t_iDir = t_rCopy
      repeat while 1
        if t_iDir.GetCount() > 0 then
          t_iDir = t_iDir[1]
          t_iTile = t_iTile + 1
          next repeat
        end if
        exit repeat
      end repeat
      t_iStack.GetFactor().SetToTileStack(t_rCopy, t_iTile)
    end if
  end if
end
on handle_removepet this, tMsg
  getThread("room").getComponent()._AccessRoom()._RemoveIndexed(tMsg.connection.GetIntFrom(), "domestic")
end
on handle_petstatus this, tMsg
  tCon = tMsg.connection
  t_sName = getThread("room").getComponent()._AccessRoom()
  t_iRef = tCon.GetIntFrom()
  t_bMoveUpdate = tCon.GetIntFrom()
  tXml = tCon.GetIntFrom()
  t_iID = tCon.GetIntFrom()
  t_iAct = tCon.GetIntFrom()
  t_iStack = t_sName._AccessIndexed(t_iRef, "domestic")
  if objectp(t_iStack) then
    t_iStack.SetParam("DIR", string(t_iID))
    t_iStack.SetParam("ACT", string(t_iAct))
    t_rCopy = t_sName._AccessIndexed(tXml, "tile")
    if objectp(t_rCopy) then
      t_iTile = 0
      t_iDir = t_rCopy
      repeat while 1
        if t_iDir.GetCount() > 0 then
          t_iDir = t_iDir[1]
          t_iTile = t_iTile + 1
          next repeat
        end if
        exit repeat
      end repeat
      if not t_bMoveUpdate then
        t_iStack.GetFactor().WalkToTile(t_rCopy, t_iTile)
      else
        t_iStack.GetFactor().SetToTileStack(t_rCopy, t_iTile)
      end if
    end if
  end if
end
on handle_petchat this, tMsg
  tCon = tMsg.connection
  t_sName = getThread("room").getComponent()._AccessRoom()
  t_iRef = tCon.GetIntFrom()
  t_rColor = tCon.GetStrFrom()
  t_iStack = t_sName._AccessIndexed(t_iRef, "domestic")
  if objectp(t_iStack) then
    t_veLoc = rgb(255, 90, 183)
    t_rTile = t_iStack.GetParam("NAME")
    t_sMsg = t_iStack.GetScrPos()
    executeMessage(#chat, [#message: t_rColor, #mode: #say, #name: t_rTile, #color: t_veLoc, #loc: t_sMsg])
  end if
end
on regMsgList this, tBool
  trace("regMsgList()")
  tMsgs = [:]
  tMsgs.setaProp(3000, #handle_createpet)
  tMsgs.setaProp(3001, #handle_petstatus)
  tMsgs.setaProp(3002, #handle_petchat)
  tMsgs.setaProp(3003, #handle_removepet)
  tCmds = [:]
  tCmds.setaProp("CLICKPET", 3000)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  end if
  trace("end regMsgList()")
end