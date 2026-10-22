-- Script
property interface
property component
property handler

on construct this
  interface = 0
  component = 0
  handler = 0
  return 1
end
on deconstruct this
  interface = 0
  component = 0
  handler = 0
  return 1
end
on getInterface this
  return interface
end
on getComponent this
  return component
end
on getHandler this
  return handler
end