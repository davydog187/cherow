import { pass, fail } from '../test-utils';

describe('Miscellaneous - Surrogate pair', () => {

  fail(`var \\uD83B\\uDE00`, {
    source: 'var \\uD83B\\uDE00',
    message: 'Unexpected surrogate pair',
    line: 1,
    column: 0,
    index: 0
  });

  fail(`var 🀒`, {
    source: 'var 🀒',
    message: 'Unexpected token 🀒',
    line: 1,
    column: 0,
    index: 0
  });

  pass(`var _\\u{1EE03}`, {
    source: 'var _\\u{1EE03}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      body: [
        {
          declarations: [
            {
              end: 14,
              id: {
               end: 14,
                loc: {
                  end: {
                    column: 14,
                    line: 1,
                  },
                  start: {
                    column: 4,
                    line: 1,
                 },
                },
                name: '_𞸃',
                start: 4,
                type: 'Identifier',
              },
              init: null,
              loc: {
                end: {
                  column: 14,
                  line: 1,
                },
                start: {
                  column: 4,
                  line: 1,
                }
             },
              start: 4,
              type: 'VariableDeclarator',
            },
          ],
          end: 14,
          kind: 'var',
          loc: {
           end: {
              column: 14,
              line: 1,
            },
            start: {
              column: 0,
              line: 1,
           },
          },
          start: 0,
          type: 'VariableDeclaration',
        },
     ],
      end: 14,
      loc: {
        end: {
          column: 14,
          line: 1,
        },
        start: {
          column: 0,
          line: 1,
        }
      },
     sourceType: 'script',
      start: 0,
      type: 'Program'
    }
  });

  pass(`var \\u{1EE0A}\\u{1EE0B}`, {
    source: 'var \\u{1EE0A}\\u{1EE0B}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      body: [
        {
          declarations: [
            {
              end: 22,
             id: {
                end: 22,
                loc: {
                  end: {
                    column: 22,
                    line: 1,
                  },
                  start: {
                    column: 4,
                    line: 1,
                  },
                },
                name: '𞸊𞸋',
                start: 4,
                type: 'Identifier',
              },
              init: null,
              loc: {
                end: {
                  column: 22,
                  line: 1,
                },
                start: {
                  column: 4,
                  line: 1,
                }
              },
              start: 4,
              type: 'VariableDeclarator',
            },
          ],
          end: 22,
         kind: 'var',
          loc: {
            end: {
              column: 22,
              line: 1,
            },
            start: {
              column: 0,
              line: 1,
            }
          },
          start: 0,
          type: 'VariableDeclaration',
        },
     ],
      end: 22,
      loc: {
        end: {
          column: 22,
          line: 1,
        },
        start: {
          column: 0,
          line: 1,
        }
      },
     sourceType: 'script',
      start: 0,
      type: 'Program'
    }
  });

  pass(`var \\u{1EE06}_$`, {
    source: 'var \\u{1EE06}_$',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      body: [
        {
          declarations: [
            {
              end: 15,
              id: {
                end: 15,
                loc: {
                  end: {
                    column: 15,
                    line: 1,
                 },
                  start: {
                    column: 4,
                    line: 1,
                  }
                },
                name: '𞸆_$',
                start: 4,
                type: 'Identifier',
              },
              init: null,
              loc: {
                end: {
                  column: 15,
                  line: 1,
               },
                start: {
                  column: 4,
                  line: 1,
                }
              },
              start: 4,
              type: 'VariableDeclarator',
            },
          ],
          end: 15,
          kind: 'var',
          loc: {
            end: {
              column: 15,
              line: 1,
            },
            start: {
              column: 0,
              line: 1,
            }
          },
          start: 0,
          type: 'VariableDeclaration',
        }
      ],
      end: 15,
      loc: {
        end: {
          column: 15,
          line: 1,
        },
        start: {
          column: 0,
          line: 1,
        }
      },
      sourceType: 'script',
      start: 0,
      type: 'Program'
    }
  });

  pass(`var \\u{1EE00}`, {
    source: 'var \\u{1EE00}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      body: [
        {
          declarations: [
            {
              end: 13,
             id: {
                end: 13,
                loc: {
                  end: {
                    column: 13,
                    line: 1,
                  },
                  start: {
                    column: 4,
                    line: 1,
                  }
                },
                name: '𞸀',
                start: 4,
                type: 'Identifier',
              },
              init: null,
              loc: {
                end: {
                  column: 13,
                  line: 1,
                },
                start: {
                  column: 4,
                 line: 1,
                },
             },
              start: 4,
              type: 'VariableDeclarator',
            },
          ],
          end: 13,
          kind: 'var',
          loc: {
            end: {
              column: 13,
              line: 1,
            },
            start: {
              column: 0,
              line: 1,
            }
          },
         start: 0,
          type: 'VariableDeclaration',
        }
      ],
      end: 13,
      loc: {
        end: {
          column: 13,
          line: 1,
        },
        start: {
          column: 0,
          line: 1
       },
      },
      sourceType: 'script',
      start: 0,
      type: 'Program'
    }
  });
});