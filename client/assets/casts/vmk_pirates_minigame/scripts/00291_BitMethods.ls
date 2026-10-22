-- Behavior
on SetBit i_iValue, i_iBit
  if not voidp(i_iValue) and not voidp(i_iBit) then
    tValue = i_iValue
    tMask = 1
    repeat with multi = 2 to i_iBit
      tMask = tMask * 2
    end repeat
    tValue = bitOr(tValue, tMask)
    return tValue
  end if
end
on ClearBit i_iValue, i_iBit
  if not voidp(i_iValue) and not voidp(i_iBit) then
    tValue = i_iValue
    tMask = 1
    repeat with multi = 2 to i_iBit
      tMask = tMask * 2
    end repeat
    tMask = bitNot(tMask)
    tValue = bitAnd(tValue, tMask)
    return tValue
  end if
end
on TestBit i_iValue, i_iBit
  if not voidp(i_iValue) and not voidp(i_iBit) then
    tValue = i_iValue
    tMask = 1
    repeat with multi = 2 to i_iBit
      tMask = tMask * 2
    end repeat
    tValue = bitAnd(tValue, tMask)
    return tValue > 0
  end if
end