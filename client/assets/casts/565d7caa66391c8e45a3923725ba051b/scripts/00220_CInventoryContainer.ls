-- Script
property m_mp_kCat_rGroups
property m_mp_kCat_rDetails
property m_ar_mp_itemListCallbacks
property m_ar_mp_detailsCallbacks

on construct this
  m_mp_kCat_rGroups = [:]
  m_mp_kCat_rGroups.addProp(#items, [:])
  m_mp_kCat_rGroups.addProp(#pins, [:])
  m_mp_kCat_rGroups.addProp(#clothes, [:])
  m_mp_kCat_rGroups.addProp(#posters, [:])
  m_mp_kCat_rGroups.addProp(#undefined, [:])
  m_mp_kCat_rDetails = [:]
  m_mp_kCat_rDetails.addProp(#items, [:])
  m_mp_kCat_rDetails.addProp(#pins, [:])
  m_mp_kCat_rDetails.addProp(#clothes, [:])
  m_mp_kCat_rDetails.addProp(#posters, [:])
  m_mp_kCat_rDetails.addProp(#undefined, [:])
  m_mp_kCat_rDetails[#items].sort()
  m_mp_kCat_rDetails[#pins].sort()
  m_mp_kCat_rDetails[#clothes].sort()
  m_mp_kCat_rDetails[#posters].sort()
  m_mp_kCat_rDetails[#undefined].sort()
  m_ar_mp_itemListCallbacks = []
  m_ar_mp_detailsCallbacks = []
  return 1
end
on deconstruct this
  m_mp_kCat_rGroups = [:]
  return 1
end
on ClearItems this
  m_mp_kCat_rGroups = [:]
  m_mp_kCat_rGroups.addProp(#items, [:])
  m_mp_kCat_rGroups.addProp(#pins, [:])
  m_mp_kCat_rGroups.addProp(#clothes, [:])
  m_mp_kCat_rGroups.addProp(#posters, [:])
  m_mp_kCat_rGroups.addProp(#undefined, [:])
end
on ClearDetails this
  m_mp_kCat_rDetails = [:]
  m_mp_kCat_rDetails.addProp(#items, [:])
  m_mp_kCat_rDetails.addProp(#pins, [:])
  m_mp_kCat_rDetails.addProp(#clothes, [:])
  m_mp_kCat_rDetails.addProp(#posters, [:])
  m_mp_kCat_rDetails.addProp(#undefined, [:])
  m_mp_kCat_rDetails[#items].sort()
  m_mp_kCat_rDetails[#pins].sort()
  m_mp_kCat_rDetails[#clothes].sort()
  m_mp_kCat_rDetails[#posters].sort()
  m_mp_kCat_rDetails[#undefined].sort()
end
on UpdateItemList this, a_kCat, a_mp_sGroup_rData
  if a_kCat = #all then
    t_kCat = #undefined
  else
    t_kCat = a_kCat
  end if
  t_iCount = a_mp_sGroup_rData.count
  t_rDest = m_mp_kCat_rGroups[t_kCat]
  if t_kCat = #undefined then
    repeat with j = 1 to t_iCount
      t_sGroup = a_mp_sGroup_rData.getPropAt(j)
      t_rGroup = a_mp_sGroup_rData[j]
      t_bfound = 0
      repeat with i = 1 to m_mp_kCat_rGroups.count
        t_kTest = m_mp_kCat_rGroups.getPropAt(i)
        if not voidp(m_mp_kCat_rGroups[t_kTest][t_sGroup]) then
          t_bfound = 1
          t_rTable = [:]
          t_rTable.setaProp(t_sGroup, t_rGroup)
          this.UpdateItemList(t_kTest, t_rTable)
          exit repeat
        end if
      end repeat
      if not t_bfound then
        if t_rGroup.items > 0 then
          m_mp_kCat_rGroups[#undefined].setaProp(t_sGroup, t_rGroup)
          next repeat
        end if
        m_mp_kCat_rGroups[#undefined].deleteProp(t_sGroup)
        m_mp_kCat_rDetails[#undefined].deleteProp(t_sGroup)
      end if
    end repeat
  else
    repeat with j = 1 to t_iCount
      t_sGroup = a_mp_sGroup_rData.getPropAt(j)
      t_rGroup = a_mp_sGroup_rData[j]
      if t_rGroup.items > 0 then
        if not voidp(t_rDest.getaProp(t_sGroup)) then
          t_rOld = t_rDest.getaProp(t_sGroup)
          t_rOld.ref = t_rGroup.ref
          t_rOld.items = t_rGroup.items
          if integerp(t_rGroup.getaProp(#param)) then
            t_rOld.setaProp(#param, t_rGroup.getaProp(#param))
          end if
        else
          t_rDest.setaProp(t_sGroup, a_mp_sGroup_rData[j])
        end if
      else
        t_rDest.deleteProp(t_sGroup)
        m_mp_kCat_rDetails[t_kCat].deleteProp(t_sGroup)
      end if
      t_rGroup = m_mp_kCat_rDetails[#undefined].getaProp(t_sGroup)
      if not voidp(t_rGroup) then
        m_mp_kCat_rDetails[t_kCat].setaProp(t_sGroup, t_rGroup)
        m_mp_kCat_rDetails[#undefined].deleteProp(t_sGroup)
      end if
    end repeat
  end if
  this.SortItemListByCategory(a_kCat)
  repeat with t_rCallback in m_ar_mp_itemListCallbacks
    call(t_rCallback[#method], t_rCallback[#target], m_mp_kCat_rGroups, t_kCat)
  end repeat
end
on UpdateDetails this, a_kCat, a_mp_sGroup_rData
  t_iCount = a_mp_sGroup_rData.count
  if a_kCat = #all or voidp(a_kCat) then
    repeat with j = 1 to t_iCount
      t_rDetails = a_mp_sGroup_rData[j]
      t_sGroup = a_mp_sGroup_rData.getPropAt(j)
      if not voidp(m_mp_kCat_rGroups[#items].getaProp(t_sGroup)) then
        m_mp_kCat_rDetails[#items].setaProp(t_sGroup, t_rDetails)
        next repeat
      end if
      if not voidp(m_mp_kCat_rGroups[#pins].getaProp(t_sGroup)) then
        m_mp_kCat_rDetails[#pins].setaProp(t_sGroup, t_rDetails)
        next repeat
      end if
      if not voidp(m_mp_kCat_rGroups[#clothes].getaProp(t_sGroup)) then
        m_mp_kCat_rDetails[#clothes].setaProp(t_sGroup, t_rDetails)
        next repeat
      end if
      if not voidp(m_mp_kCat_rGroups[#posters].getaProp(t_sGroup)) then
        m_mp_kCat_rDetails[#posters].setaProp(t_sGroup, t_rDetails)
        next repeat
      end if
      if m_mp_kCat_rGroups[#undefined].getaProp(t_sGroup) then
        m_mp_kCat_rDetails[#undefined].setaProp(t_sGroup, t_rDetails)
      end if
    end repeat
  else
    t_kCat = a_kCat
    repeat with j = 1 to t_iCount
      t_sGroup = a_mp_sGroup_rData.getPropAt(j)
      t_rDetails = a_mp_sGroup_rData[j]
      m_mp_kCat_rDetails[t_kCat].setaProp(t_sGroup, t_rDetails)
    end repeat
  end if
  repeat with t_rCallback in m_ar_mp_detailsCallbacks
    call(t_rCallback[#method], t_rCallback[#target], m_mp_kCat_rDetails, t_kCat)
  end repeat
end
on RemItem this, a_kCat, a_iRef, a_sGroup
  if a_kCat = #all or voidp(a_kCat) then
    repeat with i = 1 to m_mp_kCat_rGroups.count
      if m_mp_kCat_rGroups[i].getaProp(a_sGroup) then
        return this.RemItem(m_mp_kCat_rGroups.getPropAt(i), a_iRef, a_sGroup)
      end if
    end repeat
    return error(this, "Tried to remove item that does not exist:" && a_sGroup && a_iRef, #RemItem)
  end if
  t_rGroup = m_mp_kCat_rGroups[a_kCat].getaProp(a_sGroup)
  if not voidp(t_rGroup) then
    if t_rGroup.getaProp(#items) > 1 then
      t_rGroup.setaProp(#items, t_rGroup.getaProp(#items) - 1)
    else
      m_mp_kCat_rGroups[a_kCat].deleteProp(a_sGroup)
      m_mp_kCat_rDetails[a_kCat].deleteProp(a_sGroup)
    end if
  end if
  repeat with t_rCallback in m_ar_mp_itemListCallbacks
    call(t_rCallback[#method], t_rCallback[#target], m_mp_kCat_rGroups, a_kCat)
  end repeat
  repeat with t_rCallback in m_ar_mp_detailsCallbacks
    call(t_rCallback[#method], t_rCallback[#target], m_mp_kCat_rDetails, a_kCat)
  end repeat
  return 1
end
on addItem this, a_kCat, a_iNewRef, a_mp_item, a_mp_details, a_sGroup
  if a_kCat = #all or voidp(a_kCat) then
    t_kCat = #undefined
  else
    t_kCat = a_kCat
  end if
  a_mp_item = a_mp_item.duplicate()
  a_mp_item.setaProp(#ref, a_iNewRef)
  a_mp_item.setaProp(#group, a_sGroup)
  a_mp_item.setaProp(#items, 1)
  if not voidp(a_mp_item) then
    if voidp(m_mp_kCat_rGroups[t_kCat].getaProp(a_sGroup)) then
      m_mp_kCat_rGroups[t_kCat].setaProp(a_sGroup, a_mp_item)
    else
      m_mp_kCat_rGroups[t_kCat].getaProp(a_sGroup).ref = a_iNewRef
    end if
  end if
  if not voidp(a_mp_details) then
    m_mp_kCat_rDetails[t_kCat].setaProp(a_sGroup, a_mp_details.duplicate())
  end if
  this.SortItemListByCategory(t_kCat)
  repeat with t_rCallback in m_ar_mp_itemListCallbacks
    call(t_rCallback[#method], t_rCallback[#target], m_mp_kCat_rGroups, t_kCat)
  end repeat
  repeat with t_rCallback in m_ar_mp_detailsCallbacks
    call(t_rCallback[#method], t_rCallback[#target], m_mp_kCat_rDetails, t_kCat)
  end repeat
end
on SortItemListByCategory this, a_kCat
  if a_kCat = #all or voidp(a_kCat) then
    repeat with i = 1 to m_mp_kCat_rGroups.count
      t_kCat = m_mp_kCat_rGroups.getPropAt(i)
      this.SortItemListByCategory(t_kCat)
    end repeat
  else
    t_rCategory = m_mp_kCat_rGroups[a_kCat]
    t_rSortBuffer = [:]
    t_iCount = t_rCategory.count
    repeat with t = 1 to t_iCount
      t_sName = getText("item." & t_rCategory[t].getaProp(#code), EMPTY)
      t_rSortBuffer.addProp(t_sName, t_rCategory.getPropAt(t))
    end repeat
    t_rSortBuffer.sort()
    t_rNewItemList = [:]
    repeat with t = 1 to t_iCount
      t_sGroup = t_rSortBuffer[t]
      t_rNewItemList.addProp(t_sGroup, t_rCategory.getaProp(t_sGroup))
    end repeat
    m_mp_kCat_rGroups.setaProp(a_kCat, t_rNewItemList)
  end if
end
on CatSwitch this, a_kSrcCat, a_iRef, a_rDestInventory, a_kDestCat, a_iNewRef, a_sGroup, a_sNewGroup
  if not stringp(a_sNewGroup) then
    a_sNewGroup = a_sGroup
  end if
  t_rItem = this.GetItem(a_kSrcCat, a_sGroup)
  if not voidp(t_rItem) then
    t_rDetails = this.GetItemDetails(a_kSrcCat, t_rItem.getaProp(#group))
    this.RemItem(a_kSrcCat, a_iRef, a_sGroup)
    a_rDestInventory.addItem(a_kDestCat, a_iNewRef, t_rItem, t_rDetails, a_sNewGroup)
  else
    error(this, "Item with group id" && a_sGroup && "not found!", #CatSwitch)
  end if
end
on GetAllItemLists this
  return m_mp_kCat_rGroups
end
on GetAllDetails this
  return m_mp_kCat_rDetails
end
on GetItemListByCategory this, a_kCat
  if a_kCat = #all then
    t_mp_out = [:]
    repeat with i = 1 to m_mp_kCat_rGroups.count
      t_mpList = m_mp_kCat_rGroups[i]
      repeat with j = 1 to t_mpList.count
        t_mp_out.addProp(t_mpList.getPropAt(j), t_mpList[j])
      end repeat
    end repeat
    return t_mp_out
  else
    return m_mp_kCat_rGroups[a_kCat]
  end if
end
on GetItemDetailsByCategory this, a_kCat
  if a_kCat = #all then
    t_mp_out = [:]
    repeat with i = 1 to m_mp_kCat_rDetails.count
      t_mpList = m_mp_kCat_rDetails[i]
      repeat with j = 1 to t_mpList.count
        t_mp_out.addProp(t_mpList.getPropAt(j), t_mpList[j])
      end repeat
    end repeat
    return t_mp_out
  else
    return m_mp_kCat_rDetails[a_kCat]
  end if
end
on GetItemDetails this, a_kCat, a_sGroup
  if a_kCat = #all or voidp(a_kCat) then
    repeat with i = 1 to m_mp_kCat_rDetails.count
      if not voidp(m_mp_kCat_rDetails[i].getaProp(a_sGroup)) then
        return m_mp_kCat_rDetails[i].getaProp(a_sGroup)
      end if
    end repeat
    return VOID
  else
    return m_mp_kCat_rDetails[a_kCat].getaProp(a_sGroup)
  end if
end
on GetItem this, a_kCat, a_sGroup
  if a_kCat = #all or voidp(a_kCat) then
    repeat with i = 1 to m_mp_kCat_rGroups.count
      t_rGroup = m_mp_kCat_rGroups[i].getaProp(a_sGroup)
      if not voidp(t_rGroup) then
        return t_rGroup
      end if
    end repeat
    return VOID
  else
    return m_mp_kCat_rGroups[a_kCat].getaProp(a_sGroup)
  end if
end
on RegisterItemListCallback this, a_rTarget, a_kMethod
  m_ar_mp_itemListCallbacks.append([#target: a_rTarget, #method: a_kMethod])
  repeat with i = 1 to m_mp_kCat_rGroups.count
    if m_mp_kCat_rGroups[i].count then
      call(a_kMethod, a_rTarget, m_mp_kCat_rGroups, m_mp_kCat_rGroups.getPropAt(i))
    end if
  end repeat
end
on RegisterItemDetailsCallback this, a_rTarget, a_kMethod
  m_ar_mp_detailsCallbacks.append([#target: a_rTarget, #method: a_kMethod])
  repeat with i = 1 to m_mp_kCat_rDetails.count
    if m_mp_kCat_rDetails[i].count then
      call(a_kMethod, a_rTarget, m_mp_kCat_rDetails, m_mp_kCat_rDetails.getPropAt(i))
    end if
  end repeat
end
on UnregisterItemListCallback this, a_rTarget, a_kMethod
  t_iHit = 0
  repeat with i = 1 to m_ar_mp_itemListCallbacks.count
    if m_ar_mp_itemListCallbacks[i].target = a_rTarget and m_ar_mp_itemListCallbacks[i].method = a_kMethod then
      t_iHit = i
      exit repeat
    end if
  end repeat
  if t_iHit <> 0 then
    m_ar_mp_itemListCallbacks.deleteAt(t_iHit)
  end if
end
on UnregisterItemDetailsCallback this, a_rTarget, a_kMethod
  t_iHit = 0
  repeat with i = 1 to m_ar_mp_itemListCallbacks.count
    if m_ar_mp_detailsCallbacks[i].target = a_rTarget and m_ar_mp_detailsCallbacks[i].method = a_kMethod then
      t_iHit = i
      exit repeat
    end if
  end repeat
  if t_iHit <> 0 then
    m_ar_mp_detailsCallbacks.deleteAt(t_iHit)
  end if
end