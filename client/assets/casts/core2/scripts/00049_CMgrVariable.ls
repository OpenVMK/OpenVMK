-- Script
on construct this
  this.pItemList = [:]
  this.pItemList.sort()
  return 1
end
on deconstruct this
  this.pItemList = [:]
  return 1
end
on create this, a_sKey, a_vValue
  if not stringp(a_sKey) and not symbolp(a_sKey) then
    return error(this, "String or symbol expected:" && a_sKey, #create)
  end if
  this.pItemList[a_sKey] = a_vValue
  return 1
end
on set this, a_sKey, a_vValue
  if not stringp(a_sKey) and not symbolp(a_sKey) then
    return error(this, "String or symbol expected:" && a_sKey, #set)
  end if
  this.pItemList[a_sKey] = a_vValue
  return 1
end
on get me, tVariable, tDefault
  tvalue = me.pItemList[tVariable]
  if voidp(tvalue) then
    tError = "Variable not found:" && QUOTE & tVariable & QUOTE
    if not voidp(tDefault) then
      tvalue = tDefault
      tError = tError & RETURN & "Using given default:" && tDefault
    else
      tvalue = 0
    end if
    error(me, tError, #get)
  end if
  return tvalue
end
on getInt this, tVariable, tDefault
  tvalue = integer(this.pItemList[tVariable])
  if not integerp(tvalue) then
    tError = "Variable not found:" && QUOTE & tVariable & QUOTE
    if not voidp(tDefault) then
      tvalue = tDefault
      tError = tError & RETURN & "Using given default:" && tDefault
    end if
    error(this, tError, #getInt)
  end if
  return tvalue
end
on getValue me, tVariable, tDefault
  tvalue = value(me.pItemList[tVariable])
  if voidp(tvalue) then
    tError = "Variable not found:" && QUOTE & tVariable & QUOTE
    if not voidp(tDefault) then
      tvalue = tDefault
      tError = tError & RETURN & "Using given default:" && tDefault
    end if
    error(me, tError, #getValue)
  end if
  return tvalue
end
on Remove this, a_sKey
  return the pItemList of this.deleteProp(a_sKey)
end
on exists this, a_sKey
  return not voidp(this.pItemList[a_sKey])
end
on dump me, tField, tDelimiter
  tStr = field(tField)
  tDelim = the itemDelimiter
  if voidp(tDelimiter) then
    tDelimiter = RETURN
  end if
  the itemDelimiter = tDelimiter
  repeat with i = 1 to tStr.item.count
    tPair = tStr.item[i]
    if tPair.word[1].char[1] <> "#" and tPair <> EMPTY then
      the itemDelimiter = "="
      tProp = tPair.item[1].word[1..tPair.item[1].word.count]
      tvalue = tPair.item[2..tPair.item.count]
      tvalue = tvalue.word[1..tvalue.word.count]
      if not (tvalue contains SPACE) then
        if tvalue.char[1] = "#" then
          tvalue = symbol(chars(tvalue, 2, length(tvalue)))
        else
          if integerp(integer(tvalue)) then
            if length(string(integer(tvalue))) = length(tvalue) then
              tvalue = integer(tvalue)
            end if
          end if
        end if
      else
        if floatp(float(tvalue)) then
          tvalue = float(tvalue)
        end if
      end if
      if stringp(tvalue) then
        repeat with j = 1 to length(tvalue)
          case charToNum(tvalue.char[j]) of
            228:
              put "ä" into char j of tvalue
            246:
              put "ö" into char j of tvalue

          end case
        end repeat
      end if
      me.pItemList[tProp] = tvalue
      the itemDelimiter = tDelimiter
    end if
  end repeat
  the itemDelimiter = tDelim
  return 1
end
on clear this
  this.pItemList = [:]
end