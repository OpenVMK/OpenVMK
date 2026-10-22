-- Script
property id
property pSprite
property pLink
property pProcList

on registerProcedure this, tMethod, tClientID, tEvent
  if voidp(pProcList) then
    pProcList = this.createProcListTemplate()
  end if
  if voidp(tEvent) and voidp(tMethod) then
    repeat with i = 1 to pProcList.count
      pProcList[i] = [pProcList.getPropAt(i), tClientID]
    end repeat
  else
    if voidp(tEvent) then
      repeat with i = 1 to pProcList.count
        pProcList[i] = [tMethod, tClientID]
      end repeat
    else
      if voidp(tMethod) then
        tMethod = tEvent
      end if
      pProcList[tEvent] = [tMethod, tClientID]
    end if
  end if
  return 1
end
on removeProcedure this, tEvent
  if voidp(tEvent) then
    pProcList = this.createProcListTemplate()
  else
    if pProcList.getaProp(tEvent) <> VOID then
      pProcList[tEvent] = [#null, 0]
    end if
  end if
  return 1
end
on getID this
  return id
end
on setID this, tID
  pSprite = sprite(this.spriteNum)
  if not stringp(tID) and not symbolp(tID) then
    return error(this, "String expected:" && tID, #setID)
  end if
  id = tID
  return 1
end
on getMember this
  return the member of pSprite
end
on setMember this, tmember
  pSprite.member = tmember
  pSprite.width = pSprite.member.width
  pSprite.height = pSprite.member.height
  return 1
end
on getCursor this
  return the cursor of pSprite
end
on setcursor this, ttype
  if symbolp(ttype) then
    case ttype of
      #arrow:
        ttype = -1
      #ibeam:
        ttype = 1
      #crosshair:
        ttype = 2
      #crossbar:
        ttype = 3
      #timer:
        ttype = 4

    end case
  else
    if stringp(ttype) then
      ttype = [getmemnum(ttype), getmemnum(ttype & ".mask")]
    else
      if listp(ttype) then
        ttype = [getmemnum(ttype[1]), getmemnum(ttype[2])]
      else
        if voidp(ttype) then
          ttype = 0
        end if
      end if
    end if
  end if
  pSprite.cursor = ttype
  return 1
end
on getLink this
  if stringp(pLink) then
    return pLink
  else
    return 0
  end if
end
on setLink this, tUrlOrKey
  if stringp(tUrlOrKey) then
    pLink = tUrlOrKey
    return 1
  else
    return 0
  end if
end
on mouseEnter this
  return this.redirectEvent(#mouseEnter)
end
on mouseLeave this
  return this.redirectEvent(#mouseLeave)
end
on mouseWithin this
  return this.redirectEvent(#mouseWithin)
end
on mouseDown this
  if not voidp(pProcList) then
    getObject(#session).set("client_lastclick", id && "->" && pProcList[#mouseDown][2] && "/" && the long time)
  end if
  if this.redirectEvent(#mouseDown) then
    stopEvent()
    return 1
  else
    pass()
    return 0
  end if
end
on mouseUp this
  if not voidp(pLink) then
    getSpecialServices().openNetPage(pLink)
  end if
  if this.redirectEvent(#mouseUp) then
    stopEvent()
    return 1
  else
    pass()
    return 0
  end if
end
on mouseUpOutSide this
  if this.redirectEvent(#mouseUpOutSide) then
    stopEvent()
    return 1
  else
    pass()
    return 0
  end if
end
on keyDown this
  if this.redirectEvent(#keyDown) then
    return 1
  end if
  pass()
end
on keyUp this
  if this.redirectEvent(#keyUp) then
    return 1
  end if
  pass()
end
on redirectEvent this, tEvent
  if voidp(pProcList) then
    pProcList = this.createProcListTemplate()
  end if
  if not pProcList[tEvent][2] then
    return 0
  end if
  if not objectExists(pProcList[tEvent][2]) then
    return 0
  end if
  return call(pProcList[tEvent][1], getObject(pProcList[tEvent][2]), tEvent, id)
end
on createProcListTemplate this
  tList = [:]
  tList[#mouseEnter] = [#null, 0]
  tList[#mouseLeave] = [#null, 0]
  tList[#mouseWithin] = [#null, 0]
  tList[#mouseDown] = [#null, 0]
  tList[#mouseUp] = [#null, 0]
  tList[#mouseUpOutSide] = [#null, 0]
  tList[#keyDown] = [#null, 0]
  tList[#keyUp] = [#null, 0]
  return tList
end