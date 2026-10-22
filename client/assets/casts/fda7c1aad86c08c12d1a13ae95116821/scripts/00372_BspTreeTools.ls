-- Behavior
on getMaxDimensions a_ar_nodes, a_iAxisMax
  tDimMax = []
  tDimMin = []
  repeat with i = 1 to a_iAxisMax
    tDimMax.append(-1000000000.0)
    tDimMin.append(1000000000.0)
  end repeat
  repeat with tNode in a_ar_nodes
    repeat with a = 1 to a_iAxisMax
      tMin = tNode.dimensions[(a - 1) * 2 + 1]
      tMAX = tNode.dimensions[(a - 1) * 2 + 2]
      if tMin < tDimMin[a] then
        tDimMin[a] = tMin
      end if
      if tMAX > tDimMax[a] then
        tDimMax[a] = tMAX
      end if
    end repeat
  end repeat
  tOut = []
  repeat with a = 1 to a_iAxisMax
    tOut.append(tDimMin[a])
    tOut.append(tDimMax[a])
  end repeat
  return tOut
end