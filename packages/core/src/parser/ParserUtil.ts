/* eslint-disable @typescript-eslint/naming-convention */
import { compact, flatten } from "lodash";
import * as moo from "moo";

export const basicSymbols: moo.Rules = {
  ws: /[ \t]+/,
  nl: { match: /\r\n|\r|\n/, lineBreaks: true },
  subtypeOf: "<:",
  lte: "<=",
  lt: "<",
  gte: ">=",
  gt: ">",
  eq: "==",
  rarrow: "->",
  tilda: "~",
  lparen: "(",
  rparen: ")",
  apos: "'",
  comma: ",",
  string_literal: {
    match: /"(?:[^\n\\"]|\\["\\ntbfr])*"/,
    value: (s: string): string => s.slice(1, -1),
  },
  float_literal: /[+-]?(?:\d+(?:[.]\d*)?(?:[eE][+-]?\d+)?|[.]\d+(?:[eE][+-]?\d+)?)/,
  comment: /--.*?$/,
  multiline_comment: {
    match: /\/\*(?:[\s\S]*?)\*\//,
    lineBreaks: true,
  },
  dot: ".",
  brackets: "[]",
  lbracket: "[",
  rbracket: "]",
  lbrace: "{",
  rbrace: "}",
  assignment: "=",
  def: ":=",
  plus: "+",
  exp: "^",
  minus: "-",
  multiply: "*",
  divide: "/",
  modulo: "%",
  colon: ":",
  semi: ";",
  question: "?",
  dollar: "$",
  tick: "`",
};

const tokenStart = (token: any) => {
  return {
    line: token.line,
    col: token.col - 1,
  };
};

// TODO: test multiline range
const tokenEnd = (token: any) => {
  const { text } = token;
  const nl = /\r\n|\r|\n/;
  let newlines = 0;
  let textLength = text.length;
  if (token.lineBreaks) {
    newlines = text.split(nl).length;
    textLength = text.substring(text.lastIndexOf(nl) + 1);
  }
  return {
    line: token.line + newlines,
    col: token.col + textLength - 1,
  };
};

export const rangeOf = (token: any) => {
  // if it's already converted, assume it's an AST Node
  if (token.start && token.end) {
    return { start: token.start, end: token.end };
  }
  return {
    start: tokenStart(token),
    end: tokenEnd(token),
  };
};

const before = (loc1: SourceLoc, loc2: SourceLoc) => {
  if (loc1.line < loc2.line) {
    return true;
  }
  if (loc1.line > loc2.line) {
    return false;
  }
  return loc1.col < loc2.col;
};

const minLoc = (...locs: SourceLoc[]) => {
  if (locs.length === 0) throw new TypeError();
  let minLoc = locs[0];
  for (const l of locs) if (before(l, minLoc)) minLoc = l;
  return minLoc;
};

const maxLoc = (...locs: SourceLoc[]) => {
  if (locs.length === 0) throw new TypeError();
  let maxLoc = locs[0];
  for (const l of locs) if (before(maxLoc, l)) maxLoc = l;
  return maxLoc;
};

/** Given a list of tokens, find the range of tokens */
export const rangeFrom = (children: any[]) => {
  // NOTE: this function is called in intermediate steps with empty lists, so will need to guard against empty lists.
  if (children.length === 0) {
    // console.trace(`No children ${JSON.stringify(children)}`);
    return { start: { line: 1, col: 1 }, end: { line: 1, col: 1 } };
  }

  if (children.length === 1) {
    const child = children[0];
    return { start: child.start, end: child.end };
  }

  // NOTE: use of compact to remove optional nodes
  return {
    start: minLoc(...compact(children).map((n) => n.start)),
    end: maxLoc(...compact(children).map((n) => n.end)),
    // children TODO: decide if want children/parent pointers in the tree
  };
};

export const rangeBetween = (beginToken: any, endToken: any) => {
  // handle null cases for easier use in postprocessors
  if (!endToken) return rangeOf(beginToken);
  if (!beginToken) return rangeOf(endToken);
  const [beginRange, endRange] = [beginToken, endToken].map(rangeOf);
  return {
    start: beginRange.start,
    end: endRange.end,
  };
};

// const walkTree = <T>(root: ASTNode, f: (ASTNode): T) => {
// TODO: implement
// }

export const convertTokenId = ([token]: any) => {
  return {
    ...rangeOf(token),
    value: token.text,
    type: token.type,
  };
};

export const nth = (n: number) => {
  return function (d: any[]) {
    return d[n];
  };
};

export const optional = <T>(optionalValue: T | undefined, defaultValue: T) =>
  optionalValue ? optionalValue : defaultValue;
// Helper that takes in a mix of single token or list of tokens, drops all undefined (i.e. optional ealues), and finally flattten the mixture to a list of tokens.
export const tokensIn = (tokenList: any[]): any[] =>
  flatten(compact(tokenList));

// HACK: locations for dummy AST nodes. Revisit if this pattern becomes widespread.
export const idOf = (value: string, nodeType: string): Identifier => ({
  nodeType,
  children: [],
  start: { line: 1, col: 1 },
  end: { line: 1, col: 1 },
  tag: "Identifier",
  type: "identifier",
  value,
});

export const lastLocation = (parser: nearley.Parser): SourceLoc | undefined => {
  const lexerState = parser.lexerState;
  if (lexerState) {
    return {
      line: lexerState.line,
      col: lexerState.col,
    };
  } else {
    return undefined;
  }
};
