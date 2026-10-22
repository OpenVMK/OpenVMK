-- Script
property pItemList

on construct me
  pItemList = []
  pItemList.sort()
  return 1
end
on deconstruct me
  tObjMngr = getObjectManager()
  repeat with i = 1 to pItemList.count
    if tObjMngr.exists(pItemList[i]) then
      tObjMngr.Remove(pItemList[i])
    end if
  end repeat
  pItemList = []
  return 1
end
on create me, tID, tClass
  tObjMgr = getObjectManager()
  if tObjMgr.exists(tID) then
    return error(me, "Object already exists:" && tID, #create)
  end if
  if objectp(tObjMgr.create(tID, tClass)) then
    pItemList.add(tID)
    return 1
  else
    return 0
  end if
end
on get me, tID
  t_sStructName = "item." & tID & ".ani.struct"
  t_rStruct = getObject(t_sStructName)
  if objectp(t_rStruct) then
    t_rStructure = t_rStruct
  else
    t_rStructure = createObject(t_sStructName, "CItemAniStructure")
    t_rStructure.Init(tID)
  end if
  return t_rStructure
end
on GetStates me, tID
  return me.get(tID).GetStates()
end
on Remove me, tID
  if me.exists(tID) then
    pItemList.deleteOne(tID)
    return getObjectManager().Remove(tID)
  else
    return 0
  end if
end
on exists me, tID
  return the pItemList of me.getOne(tID) > 0
end
on print me
  tListMode = ilk(me.pItemList)
  repeat with i = 1 to me.pItemList.count
    if tListMode = #list then
      tID = me.pItemList[i]
    else
      tID = me.pItemList.getPropAt(i)
    end if
    tObj = me.get(tID)
    if symbolp(tID) then
      tID = "#" & tID
    end if
    put tID && ":" && tObj
  end repeat
  return 1
end