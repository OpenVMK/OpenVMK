-- Script
property dimensions
property children
property obj
property isleaf

on construct me
  dimensions = []
  children = []
  obj = VOID
  isleaf = 0
  return 1
end
on deconstruct me
  repeat with t_rChild in children
    t_rChild.deconstruct()
    t_rChild = VOID
  end repeat
  children = []
  return 1
end
on inside me, a_ar_coordinate
  if a_ar_coordinate.count * 2 > dimensions.count then
    return error(me, "Can't search in more dimensions than the node contains!", #inside)
  end if
  tInside = 1
  repeat with i = 1 to a_ar_coordinate.count
    tTest = a_ar_coordinate[i]
    tMin = dimensions[(i - 1) * 2 + 1]
    tMAX = dimensions[(i - 1) * 2 + 2]
    if tTest < tMin or tTest > tMAX then
      tInside = 0
    end if
  end repeat
  return tInside
end
on subdivide me, a_iLastAxis
  if me.children.count > 1 then
    tNextAxis = me.getNextAxis(a_iLastAxis)
    tSplit = me.split(tNextAxis)
    repeat with t = 2 to me.dimensions.count
      if tSplit.high.count < 1 or tSplit.low.count < 1 then
        tNextAxis = me.getNextAxis(tNextAxis)
        tSplit = me.split(tNextAxis)
        if t = me.dimensions.count then
          tNextAxis = me.getNextAxis(a_iLastAxis)
          tSplit = me.split(tNextAxis, #DONT_FIX_OVERLAP)
          put "BSP couldn't perform a clean split, your objects might overlap!"
        end if
        next repeat
      end if
      exit repeat
    end repeat
    me.children = []
    if tSplit.low.count > 0 then
      tNu = createObject(#random, "CBspTreeNode")
      tNu.children = tSplit.low
      tNu.dimensions = getMaxDimensions(tSplit.low, dimensions.count / 2)
      me.children.append(tNu)
    end if
    if tSplit.high.count > 0 then
      tNu = createObject(#random, "CBspTreeNode")
      tNu.children = tSplit.high
      tNu.dimensions = getMaxDimensions(tSplit.high, dimensions.count / 2)
      me.children.append(tNu)
    end if
    me.children[1].subdivide(tNextAxis)
    if me.children.count > 1 then
      me.children[2].subdivide(tNextAxis)
    end if
  else
    me.obj = me.children[1].obj
    me.dimensions = me.children[1].dimensions
    me.isleaf = 1
    removeObject(me.children[1].getID())
    me.children = []
  end if
end
on getNextAxis me, a_iLastAxis
  tNextAxis = a_iLastAxis + 1
  if tNextAxis * 2 > me.dimensions.count then
    tNextAxis = 1
  end if
  return tNextAxis
end
on sortChildrenByAxis me, a_iAxis
  repeat with i = 1 to me.children.count
    repeat with j = i to me.children.count
      tMid1 = (me.children[i].dimensions[(a_iAxis - 1) * 2 + 1] + me.children[i].dimensions[(a_iAxis - 1) * 2 + 2]) / 2
      tMid2 = (me.children[j].dimensions[(a_iAxis - 1) * 2 + 1] + me.children[j].dimensions[(a_iAxis - 1) * 2 + 2]) / 2
      if tMid1 > tMid2 then
        tTemp = me.children[i]
        me.children[i] = me.children[j]
        me.children[j] = tTemp
      end if
    end repeat
  end repeat
end
on fixOverlap me, a_ar_low, a_ar_high, a_iAxis
  if a_ar_low.count > 0 and a_ar_high.count > 0 then
    tNuLow = []
    tNuHigh = []
    if a_ar_low.count > a_ar_high.count then
      tHighDimensions = getMaxDimensions(a_ar_high, me.dimensions.count / 2)
      repeat with tNode in a_ar_low
        if tHighDimensions[(a_iAxis - 1) * 2 + 1] < tNode.dimensions[(a_iAxis - 1) * 2 + 2] then
          tNuHigh.append(tNode)
          next repeat
        end if
        tNuLow.append(tNode)
      end repeat
      repeat with tNode in a_ar_high
        tNuHigh.append(tNode)
      end repeat
    else
      tLowDimensions = getMaxDimensions(a_ar_low, me.dimensions.count / 2)
      repeat with tNode in a_ar_high
        if tLowDimensions[(a_iAxis - 1) * 2 + 2] > tNode.dimensions[(a_iAxis - 1) * 2 + 1] then
          tNuLow.append(tNode)
          next repeat
        end if
        tNuHigh.append(tNode)
      end repeat
      repeat with tNode in a_ar_low
        tNuLow.append(tNode)
      end repeat
    end if
    tOut = [#low: tNuLow, #high: tNuHigh]
    return tOut
  else
    tOut = [#low: a_ar_low, #high: a_ar_high]
    return tOut
  end if
end
on split me, a_iAxis, a_yNoFix
  if me.children.count <> 2 then
    me.sortChildrenByAxis(a_iAxis)
    tPickLow = 1
    tPickHigh = me.children.count
    tLow = []
    tHigh = []
    repeat while tPickLow <= tPickHigh
      tLow.append(me.children[tPickLow])
      if tPickLow < tPickHigh then
        tHigh.append(me.children[tPickHigh])
      end if
      tPickLow = tPickLow + 1
      tPickHigh = tPickHigh - 1
    end repeat
    if voidp(a_yNoFix) then
      return me.fixOverlap(tLow, tHigh, a_iAxis)
    else
      if a_yNoFix = #DONT_FIX_OVERLAP then
        tOut = [#low: tLow, #high: tHigh]
        return tOut
      end if
    end if
  else
    tOut = [#low: [children[1]], #high: [children[2]]]
    return tOut
  end if
end
on toString me, a_iIndent
  if voidp(a_iIndent) then
    a_iIndent = 0
  end if
  t_sIndent = EMPTY
  repeat with i = 1 to a_iIndent
    put TAB after t_sIndent
  end repeat
  t_sTag = t_sIndent & "<NODE"
  put SPACE & "DIM=" & QUOTE & string(dimensions) & QUOTE after t_sTag
  if not voidp(obj) then
    put SPACE & "OBJREF=" & QUOTE & obj.GetParam("REF") & QUOTE & " />" after t_sTag
  else
    put ">" & RETURN after t_sTag
    repeat with t_rChild in children
      put t_rChild.toString(a_iIndent + 1) & RETURN after t_sTag
    end repeat
    put t_sIndent & "</NODE>" after t_sTag
  end if
  return t_sTag
end