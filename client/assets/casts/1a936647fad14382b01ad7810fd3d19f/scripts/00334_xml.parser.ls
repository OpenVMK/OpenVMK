-- Script
property child
property count
property _ignoreWhiteSpace
property _doneParsing
property _cbMethod
property _cbObject
property _netID
property _whiteSpace
property _entityList
property _docType
property _errorStr
property _idList
property _tagList

on new me
  me.child = []
  me._ignoreWhiteSpace = 1
  me._doneParsing = 1
  me._errorStr = EMPTY
  me._whiteSpace = SPACE & RETURN & TAB & numToChar(10)
  return me
end
on parseUrl me, url, cbMethod, cbObject
  me._cbMethod = cbMethod
  me._cbObject = cbObject
  me._netID = getNetText(url)
  me._doneParsing = 0
  (the actorList).add(me)
end
on parseString me, xmlString
  me.child = []
  me._idList = [:]
  me._tagList = [:]
  me._entityList = [:]
  me._entityList.addProp("lt", "<")
  me._entityList.addProp("gt", ">")
  me._entityList.addProp("amp", "&")
  me._entityList.addProp("apos", "'")
  me._entityList.addProp("quot", QUOTE)
  currentNode = me
  me.count = 0
  elementStack = []
  xmlTokens = new(script("xml.tokenizer"), xmlString, "<>", 1)
  repeat while xmlTokens.hasMoreTokens()
    token = xmlTokens.NextToken()
    if token = "<" then
      token = xmlTokens.NextToken()
      case token.char[1] of
        "?":
          if token.char[2..4] <> "xml" then
            currentNode.child.append(me.parseProcInst(token))
          end if
        "!":
          case token.char[1..3] of
            "!DO":
              me.parseDocType(token)
              if token contains "[" then
                repeat while xmlTokens.hasMoreTokens()
                  token = xmlTokens.NextToken()
                  if token contains "]" then
                    exit repeat
                  end if
                  case token.char[1..3] of
                    "!EN":
                      me.parseEntity(token)

                  end case
                end repeat
              end if
            "!--":
              repeat while xmlTokens.hasMoreTokens()
                newToken = xmlTokens.NextToken()
                if newToken = ">" then
                  if token.char[token.length - 1..token.length] = "--" then
                    exit repeat
                  end if
                end if
                token = newToken
              end repeat
            "![C":
              repeat while xmlTokens.hasMoreTokens()
                newToken = xmlTokens.NextToken()
                if newToken = ">" then
                  if token.char[token.length - 1..token.length] = "]]" then
                    textNode = me.parseCDATA(token)
                    if textNode.ilk = #instance then
                      currentNode.child.append(textNode)
                    end if
                    exit repeat
                  end if
                end if
                token = token & newToken
              end repeat

          end case
        "/":
          if elementStack.count then
            currentNode = elementStack[1]
            elementStack.deleteAt(1)
            currentNode.count = currentNode.count + 1
          end if
        otherwise:
          if token.char[token.length] = "/" then
            delete (token).char[token.length]
            newNode = me.parseElement(token, 1)
            currentNode.child.append(newNode)
            currentNode.count = currentNode.count + 1
          else
            elementStack.addAt(1, currentNode)
            newNode = me.parseElement(token, 0)
            currentNode.child.append(newNode)
            currentNode = newNode
            currentNode.count = 0
          end if

      end case
      next repeat
    end if
    if token = ">" then
      next repeat
    end if
    if currentNode <> me then
      textNode = me.ParseText(token)
      if textNode.ilk = #instance then
        currentNode.child.append(textNode)
      end if
    end if
  end repeat
end
on ignoreWhitespace me, ignore
  me._ignoreWhiteSpace = ignore
end
on doneParsing me
  return the _doneParsing of me
end
on makeList me
  docList = [:]
  childList = ["!ATTRIBUTES": [:]]
  repeat with node in me.child
    case node.type of
      #element:
        childList.addProp(node.name, node.toList())
      #procinst:
        childList.addProp("!PROCINST", node.toList())
      #chardata:
        childList.addProp("!CHARDATA", node.toList())

    end case
  end repeat
  if count(me.child) then
    docList.addProp("ROOT OF XML DOCUMENT", childList)
  end if
  return docList
end
on getError me
  return the _errorStr of me
end
on getAt me, index
  if index.ilk = #integer then
    return me.child[index]
  else
    index = string(index)
    repeat with node in me.child
      if node.name = index then
        return node
      end if
    end repeat
  end if
end
on count me
  return count(the child of me)
end
on getElementByID me, id
  return me._idList[id]
end
on getElementByName me, TagName
  if TagName = "*" then
    return the _tagList of me
  else
    elemList = me._tagList[TagName]
    if elemList.count > 1 then
      return elemList
    else
      return elemList[1]
    end if
  end if
end
on getText me
  str = EMPTY
  repeat with node in me.child
    str = str & node.getText()
  end repeat
  return str
end
on makeDocument me
  xmlDoc = "<?xml version=" & QUOTE & "1.0" & QUOTE & "?>" & RETURN
  repeat with node in me.child
    xmlDoc = xmlDoc & node.toString() & RETURN
  end repeat
  return xmlDoc
end
on stepFrame me
  if netDone(me._netID) then
    if netError(me._netID) = "OK" then
      xmlDoc = netTextResult(me._netID)
      me.parseString(xmlDoc)
    else
      me._errorStr = "net error:" && netError(me._netID)
    end if
    me._doneParsing = 1
    if me._cbMethod.ilk <> #void then
      if me._cbObject.ilk = #void then
        do(me._cbMethod && "me")
      else
        call(me._cbMethod, me._cbObject, me)
      end if
    end if
  end if
end
on parseProcInst me, tokenStr
  delete (tokenStr).char[tokenStr.length]
  delete (tokenStr).char[1]
  piName = tokenStr.word[1]
  piData = tokenStr.word[2..tokenStr.word.count]
  piNode = new(script("xml.node"), piName, #procinst, piData)
  return piNode
end
on parseDocType me, tokenStr
  me._docType = tokenStr.word[2]
end
on parseEntity me, tokenStr
  entityName = tokenStr.word[2]
  if entityName <> "%" then
    entityValue = tokenStr.word[3..tokenStr.word.count]
    delete (entityValue).char[entityValue.length]
    delete (entityValue).char[1]
    entityValue = me.decodeEntities(entityValue)
    if not me._entityList.findPos(entityName) then
      me._entityList.addProp(entityName, entityValue)
    end if
  end if
end
on parseCDATA me, tokenStr
  delete (tokenStr).char[tokenStr.length - 1..tokenStr.length]
  delete (tokenStr).char[1..8]
  if tokenStr.length then
    return new(script("xml.node"), VOID, #chardata, tokenStr)
  else
    return VOID
  end if
end
on parseElement me, tokenStr, isEmpty
  elementName = tokenStr.word[1]
  elementNode = new(script("xml.node"), elementName, #element, VOID)
  elementNode.isEmpty = isEmpty
  if offset("=", tokenStr) then
    attributeStr = tokenStr.word[2..tokenStr.word.count]
    attributeList = me.parseAttributes(attributeStr)
    elementNode.attributeValue = attributeList
    numAttributes = attributeList.count
    repeat with i = 1 to numAttributes
      elementNode.attributeName.append(attributeList.getPropAt(i))
    end repeat
    if attributeList.findPos("id") then
      me._idList.setaProp(attributeList["id"], elementNode)
    end if
  end if
  if not me._tagList.findPos(elementName) then
    me._tagList.addProp(elementName, [elementNode])
  else
    tagList = me._tagList[elementName]
    tagList.append(elementNode)
  end if
  return elementNode
end
on parseAttributes me, attrStr
  attrList = [:]
  attrTokens = new(script("xml.tokenizer"), attrStr, QUOTE & "'=" & me._whiteSpace, 1)
  repeat while attrTokens.hasMoreTokens()
    token = attrTokens.NextToken()
    repeat while me._whiteSpace contains token
      token = attrTokens.NextToken()
    end repeat
    attrName = token
    repeat while token <> "="
      token = attrTokens.NextToken()
    end repeat
    quoteType = attrTokens.NextToken()
    repeat while quoteType <> "'" and quoteType <> QUOTE
      quoteType = attrTokens.NextToken()
    end repeat
    token = attrTokens.NextToken()
    attrValue = EMPTY
    repeat while token <> quoteType
      attrValue = attrValue & token
      token = attrTokens.NextToken()
    end repeat
    attrValue = me.decodeEntities(attrValue)
    attrList.addProp(attrName, attrValue)
  end repeat
  return attrList
end
on ParseText me, tokenStr
  textStr = EMPTY
  if me._ignoreWhiteSpace then
    tokens = new(script("xml.tokenizer"), tokenStr, me._whiteSpace)
    if tokens.hasMoreTokens() then
      textStr = me.decodeEntities(tokens.NextToken())
    end if
    repeat while tokens.hasMoreTokens()
      textToken = tokens.NextToken()
      textStr = textStr && me.decodeEntities(textToken)
    end repeat
  else
    textStr = me.decodeEntities(tokenStr)
  end if
  if textStr.length then
    return new(script("xml.node"), VOID, #chardata, textStr)
  else
    return VOID
  end if
end
on decodeEntities me, str
  if offset("&", str) and offset(";", str) then
    tokens = new(script("xml.tokenizer"), str, "&;", 1)
    decodedStr = EMPTY
    repeat while tokens.hasMoreTokens()
      token = tokens.NextToken()
      if token = "&" then
        entityName = tokens.NextToken()
        if entityName.char[1] = "#" then
          if entityName.char[2] = "x" then
            entityValue = numToChar(rgb(entityName.char[3..4] & "FFFF").red)
          else
            entityValue = numToChar(entityName.value)
          end if
        else
          entityValue = me._entityList.getaProp(entityName)
        end if
        decodedStr = decodedStr & entityValue
        tokens.NextToken()
        next repeat
      end if
      decodedStr = decodedStr & token
    end repeat
    return decodedStr
  else
    return str
  end if
end