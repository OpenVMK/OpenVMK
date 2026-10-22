/**
 * Minimal Lingo bytecode disassembler, enough to read a handler and reason
 * about a patch.
 *
 * Opcode table taken verbatim from DirPlayer's
 * `vm-rust/src/director/lingo/opcode.rs` — a working VM is a better source than
 * anything inferred from a hex dump, and guessing an opcode is how a patch
 * silently corrupts a script.
 *
 * Operand width follows the high bits: below 0x40 no operand, 0x40-0x7f one
 * byte, 0x80-0xbf two bytes, 0xc0+ four. The LOGICAL opcode for the wider forms
 * is `0x40 + (op % 0x40)`, so `0xa7` and `0x67` are the same instruction with
 * differently sized operands.
 */
export const OPCODES = {
  0x01: "ret", 0x02: "retfactory", 0x03: "pushzero", 0x04: "mul", 0x05: "add",
  0x06: "sub", 0x07: "div", 0x08: "mod", 0x09: "inv", 0x0a: "joinstr",
  0x0b: "joinpadstr", 0x0c: "lt", 0x0d: "lteq", 0x0e: "nteq", 0x0f: "eq",
  0x10: "gt", 0x11: "gteq", 0x12: "and", 0x13: "or", 0x14: "not",
  0x15: "containsstr", 0x16: "contains0str", 0x17: "getchunk", 0x18: "hilitechunk",
  0x19: "ontospr", 0x1a: "intospr", 0x1b: "getfield", 0x1c: "starttell",
  0x1d: "endtell", 0x1e: "pushlist", 0x1f: "pushproplist", 0x21: "swap",
  0x26: "calljavascript",
  0x41: "pushint8", 0x42: "pusharglistnoret", 0x43: "pusharglist", 0x44: "pushcons",
  0x45: "pushsymb", 0x46: "pushvarref", 0x48: "getglobal2", 0x49: "getglobal",
  0x4a: "getprop", 0x4b: "getparam", 0x4c: "getlocal", 0x4e: "setglobal2",
  0x4f: "setglobal", 0x50: "setprop", 0x51: "setparam", 0x52: "setlocal",
  0x53: "jmp", 0x54: "endrepeat", 0x55: "jmpifz", 0x56: "localcall",
  0x57: "extcall", 0x58: "objcallv4", 0x59: "put", 0x5a: "putchunk",
  0x5b: "deletechunk", 0x5c: "get", 0x5d: "set", 0x5f: "getmovieprop",
  0x60: "setmovieprop", 0x61: "getobjprop", 0x62: "setobjprop", 0x63: "tellcall",
  0x64: "peek", 0x65: "pop", 0x66: "thebuiltin", 0x67: "objcall",
  0x6d: "pushchunkvarref", 0x6e: "pushint16", 0x6f: "pushint32",
  0x70: "getchainedprop", 0x71: "pushfloat32", 0x72: "gettoplevelprop",
  0x73: "newobj",
};

/** Which opcodes take a NAME-table index, so the disassembly can show the name. */
const NAMED = new Set([
  "extcall", "objcall", "objcallv4", "localcall", "getprop", "setprop",
  "getmovieprop", "setmovieprop", "getobjprop", "setobjprop", "getglobal",
  "getglobal2", "setglobal", "setglobal2", "getchainedprop", "gettoplevelprop",
  "pushsymb", "newobj", "thebuiltin",
]);

export function disassemble(code, names = [], base = 0) {
  const out = [];
  let at = 0;
  while (at < code.length) {
    const raw = code[at];
    let op = raw;
    let width = 0;
    if (raw >= 0xc0) { op = 0x40 + (raw % 0x40); width = 4; }
    else if (raw >= 0x80) { op = 0x40 + (raw % 0x40); width = 2; }
    else if (raw >= 0x40) { op = raw; width = 1; }
    const name = OPCODES[op] ?? `op${op.toString(16)}`;
    let operand = null;
    if (width === 1) operand = code[at + 1];
    else if (width === 2) operand = code.readUInt16BE(at + 1);
    else if (width === 4) operand = code.readUInt32BE(at + 1);
    const bytes = [...code.subarray(at, at + 1 + width)]
      .map((b) => b.toString(16).padStart(2, "0")).join(" ");
    let text = name;
    if (operand !== null) {
      text += ` ${operand}`;
      if (NAMED.has(name) && names[operand] !== undefined) text += ` (${names[operand]})`;
    }
    out.push({ at: at + base, rel: at, bytes, text });
    at += 1 + width;
  }
  return out;
}

export function render(code, names, base = 0) {
  return disassemble(code, names, base)
    .map((i) => `  ${String(i.at).padStart(5)}  ${i.bytes.padEnd(14)}  ${i.text}`)
    .join("\n");
}
