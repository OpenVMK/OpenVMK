-- Script
property pWriterClass
property pPlainStruct
property pItemList

on construct this
  pWriterClass = getClassVariable("writer.instance.class")
  pPlainStruct = getStructVariable("struct.font.plain")
  pItemList = [:]
  return 1
end
on deconstruct this
  call(#deconstruct, pItemList)
  pItemList = [:]
  return 1
end
on create this, a_sID, tMetrics
  if not voidp(pItemList[a_sID]) then
    return error(this, "Writer already exists:" && a_sID, #create)
  end if
  tObj = getObjectManager().create(#temp, pWriterClass)
  if not tObj then
    return 0
  end if
  case tMetrics.ilk of
    #struct:
      tObj.setFont(tMetrics)
    otherwise:
      tObj.setFont(pPlainStruct)
      tObj.Define(tMetrics)

  end case
  pItemList[a_sID] = tObj
  tObj.setID(a_sID)
  return 1
end
on Remove this, a_sID
  tObj = pItemList[a_sID]
  if voidp(tObj) then
    return error(this, "Writer not found:" && a_sID, #Remove)
  end if
  tObj.deconstruct()
  return pItemList.deleteProp(a_sID)
end
on get this, a_sID
  tObj = pItemList[a_sID]
  if voidp(tObj) then
    return 0
  end if
  return tObj
end
on exists this, a_sID
  return not voidp(pItemList[a_sID])
end