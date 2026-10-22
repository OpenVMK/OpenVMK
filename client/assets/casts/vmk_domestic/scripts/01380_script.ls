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
  t_rContext = tMsg.connection
  t_iAct = getThread("room").getComponent()._AccessRoom()
  t_iID = t_rContext.GetIntFrom()
  t_iTile = t_rContext.GetIntFrom()
  t_rObj = t_rContext.GetIntFrom()
  t_iType = t_rContext.GetStrFrom()
  tCon = t_rContext.GetIntFrom()
  t_iDir = t_rContext.GetIntFrom()
  t_sName = this.m_rXMLDomestic
  t_sName.SetParam("REF", string(t_iID))
  t_sName.SetParam("NAME", t_iType)
  t_sName.SetParam("TYPE", string(t_iTile))
  t_sName.SetParam("DIR", string(t_rObj))
  t_sName.SetParam("ACT", string(t_iDir))
  if t_iAct._CreateIndexed(t_iID, "domestic", t_sName) then
    t_rTile = t_iAct._AccessIndexed(t_iID, "domestic")
    t_rTile.GetVisual().CreateSprites()
    tXml = t_iAct._AccessIndexed(tCon, "tile")
    if objectp(tXml) then
      t_iStack = 0
      t_rCopy = tXml
      repeat while 1
        if t_rCopy.GetCount() > 0 then
          t_rCopy = t_rCopy[1]
          t_iStack = t_iStack + 1
          next repeat
        end if
        exit repeat
      end repeat
      t_rTile.GetFactor().SetToTileStack(tXml, t_iStack)
    end if
  end if
end
on handle_removepet this, tMsg
  getThread("room").getComponent()._AccessRoom()._RemoveIndexed(tMsg.connection.GetIntFrom(), "domestic")
end
on handle_petstatus this, tMsg
  t_rContext = tMsg.connection
  t_iAct = getThread("room").getComponent()._AccessRoom()
  t_bMoveUpdate = t_rContext.GetIntFrom()
  t_iRef = t_rContext.GetIntFrom()
  tCon = t_rContext.GetIntFrom()
  t_rObj = t_rContext.GetIntFrom()
  t_iDir = t_rContext.GetIntFrom()
  t_rTile = t_iAct._AccessIndexed(t_bMoveUpdate, "domestic")
  if objectp(t_rTile) then
    t_rTile.SetParam("DIR", string(t_rObj))
    t_rTile.SetParam("ACT", string(t_iDir))
    tXml = t_iAct._AccessIndexed(tCon, "tile")
    if objectp(tXml) then
      t_iStack = 0
      t_rCopy = tXml
      repeat while 1
        if t_rCopy.GetCount() > 0 then
          t_rCopy = t_rCopy[1]
          t_iStack = t_iStack + 1
          next repeat
        end if
        exit repeat
      end repeat
      if not t_iRef then
        t_rTile.GetFactor().WalkToTile(tXml, t_iStack)
      else
        t_rTile.GetFactor().SetToTileStack(tXml, t_iStack)
      end if
    end if
  end if
end
on handle_petchat this, tMsg
  t_rContext = tMsg.connection
  t_iAct = getThread("room").getComponent()._AccessRoom()
  t_bMoveUpdate = t_rContext.GetIntFrom()
  t_sMsg = t_rContext.GetStrFrom()
  t_rTile = t_iAct._AccessIndexed(t_bMoveUpdate, "domestic")
  if objectp(t_rTile) then
    t_veLoc = rgb(255, 90, 183)
    t_iType = t_rTile.GetParam("NAME")
    t_rColor = t_rTile.GetScrPos()
    executeMessage(#chat, [#message: t_sMsg, #mode: #say, #name: t_iType, #color: t_veLoc, #loc: t_rColor])
  end if
end
on regMsgList this, tBool
  trace("regMsgList()")
  tCmds = [:]
  tCmds.setaProp(3000, #handle_createpet)
  tCmds.setaProp(3001, #handle_petstatus)
  tCmds.setaProp(3002, #handle_petchat)
  tCmds.setaProp(3003, #handle_removepet)
  tMsgs = [:]
  tMsgs.setaProp("CLICKPET", 3000)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
    registerCommands(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
    unregisterCommands(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
  end if
  trace("end regMsgList()")
end