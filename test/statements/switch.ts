import { pass, fail } from '../test-utils';

describe('Statements - Switch', () => {

          fail(`duplicate default`, {
              source: `function SwitchTest(value){
                var result = 0;

                switch(value) {
                  case 0:
                    result += 2;
                  default:
                    result += 32;
                    break;
                  default:
                    result += 32;
                    break;
                }

                return result;
              }`,
              line: 12
          });

          fail(`switch(value) {
            case:
              result += 2;
            default:
              result += 32;
              break;
          }`, {
            source: `switch(value) {
                case:
                  result += 2;
                default:
                  result += 32;
                  break;
              }`,
            line: 2
        });

          fail(`switch(value) {
            result =2;
          case 0:
            result += 2;
          default:
            result += 32;
            break;
        }`, {
            source: `switch(value) {
                result =2;
              case 0:
                result += 2;
              default:
                result += 32;
                break;
            }`,
            line: 1
        });

          pass(`switch (x) {}`, {
          source: 'switch (x) {}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 13,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 13
                  }
              },
              body: [{
                  type: 'SwitchStatement',
                  start: 0,
                  end: 13,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 13
                      }
                  },
                  discriminant: {
                      type: 'Identifier',
                      start: 8,
                      end: 9,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 9
                          }
                      },
                      name: 'x'
                  },
                  cases: []
              }],
              sourceType: 'script'
          }
      });

          pass(`switch(a){case 1:}`, {
          source: 'switch(a){case 1:}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 18,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 18
                  }
              },
              body: [{
                  type: 'SwitchStatement',
                  start: 0,
                  end: 18,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 18
                      }
                  },
                  discriminant: {
                      type: 'Identifier',
                      start: 7,
                      end: 8,
                      loc: {
                          start: {
                              line: 1,
                              column: 7
                          },
                          end: {
                              line: 1,
                              column: 8
                          }
                      },
                      name: 'a'
                  },
                  cases: [{
                      type: 'SwitchCase',
                      start: 10,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 10
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      consequent: [],
                      test: {
                          type: 'Literal',
                          start: 15,
                          end: 16,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 15
                              },
                              end: {
                                  line: 1,
                                  column: 16
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  }]
              }],
              sourceType: 'script'
          }
      });

          pass(`switch (answer) { case 0: hi(); break; }`, {
          source: 'switch (answer) { case 0: hi(); break; }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 40,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 40
                  }
              },
              body: [{
                  type: 'SwitchStatement',
                  start: 0,
                  end: 40,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 40
                      }
                  },
                  discriminant: {
                      type: 'Identifier',
                      start: 8,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      name: 'answer'
                  },
                  cases: [{
                      type: 'SwitchCase',
                      start: 18,
                      end: 38,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 38
                          }
                      },
                      consequent: [{
                              type: 'ExpressionStatement',
                              start: 26,
                              end: 31,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 26
                                  },
                                  end: {
                                      line: 1,
                                      column: 31
                                  }
                              },
                              expression: {
                                  type: 'CallExpression',
                                  start: 26,
                                  end: 30,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 26
                                      },
                                      end: {
                                          line: 1,
                                          column: 30
                                      }
                                  },
                                  callee: {
                                      type: 'Identifier',
                                      start: 26,
                                      end: 28,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 26
                                          },
                                          end: {
                                              line: 1,
                                              column: 28
                                          }
                                      },
                                      name: 'hi'
                                  },
                                  arguments: []
                              }
                          },
                          {
                              type: 'BreakStatement',
                              start: 32,
                              end: 38,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 32
                                  },
                                  end: {
                                      line: 1,
                                      column: 38
                                  }
                              },
                              label: null
                          }
                      ],
                      test: {
                          type: 'Literal',
                          start: 23,
                          end: 24,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 23
                              },
                              end: {
                                  line: 1,
                                  column: 24
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }]
              }],
              sourceType: 'script'
          }
      });

          pass(`switch (answer) { case 0: let a; } switch (answer) { case 0: let a; }`, {
          source: 'switch (answer) { case 0: let a; } switch (answer) { case 0: let a; }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 69,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 69
                  }
              },
              body: [{
                      type: 'SwitchStatement',
                      start: 0,
                      end: 34,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 34
                          }
                      },
                      discriminant: {
                          type: 'Identifier',
                          start: 8,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          },
                          name: 'answer'
                      },
                      cases: [{
                          type: 'SwitchCase',
                          start: 18,
                          end: 32,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 18
                              },
                              end: {
                                  line: 1,
                                  column: 32
                              }
                          },
                          consequent: [{
                              type: 'VariableDeclaration',
                              start: 26,
                              end: 32,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 26
                                  },
                                  end: {
                                      line: 1,
                                      column: 32
                                  }
                              },
                              declarations: [{
                                  type: 'VariableDeclarator',
                                  start: 30,
                                  end: 31,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 30
                                      },
                                      end: {
                                          line: 1,
                                          column: 31
                                      }
                                  },
                                  id: {
                                      type: 'Identifier',
                                      start: 30,
                                      end: 31,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 30
                                          },
                                          end: {
                                              line: 1,
                                              column: 31
                                          }
                                      },
                                      name: 'a'
                                  },
                                  init: null
                              }],
                              kind: 'let'
                          }],
                          test: {
                              type: 'Literal',
                              start: 23,
                              end: 24,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 23
                                  },
                                  end: {
                                      line: 1,
                                      column: 24
                                  }
                              },
                              value: 0,
                              raw: '0'
                          }
                      }]
                  },
                  {
                      type: 'SwitchStatement',
                      start: 35,
                      end: 69,
                      loc: {
                          start: {
                              line: 1,
                              column: 35
                          },
                          end: {
                              line: 1,
                              column: 69
                          }
                      },
                      discriminant: {
                          type: 'Identifier',
                          start: 43,
                          end: 49,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 43
                              },
                              end: {
                                  line: 1,
                                  column: 49
                              }
                          },
                          name: 'answer'
                      },
                      cases: [{
                          type: 'SwitchCase',
                          start: 53,
                          end: 67,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 53
                              },
                              end: {
                                  line: 1,
                                  column: 67
                              }
                          },
                          consequent: [{
                              type: 'VariableDeclaration',
                              start: 61,
                              end: 67,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 61
                                  },
                                  end: {
                                      line: 1,
                                      column: 67
                                  }
                              },
                              declarations: [{
                                  type: 'VariableDeclarator',
                                  start: 65,
                                  end: 66,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 65
                                      },
                                      end: {
                                          line: 1,
                                          column: 66
                                      }
                                  },
                                  id: {
                                      type: 'Identifier',
                                      start: 65,
                                      end: 66,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 65
                                          },
                                          end: {
                                              line: 1,
                                              column: 66
                                          }
                                      },
                                      name: 'a'
                                  },
                                  init: null
                              }],
                              kind: 'let'
                          }],
                          test: {
                              type: 'Literal',
                              start: 58,
                              end: 59,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 58
                                  },
                                  end: {
                                      line: 1,
                                      column: 59
                                  }
                              },
                              value: 0,
                              raw: '0'
                          }
                      }]
                  }
              ],
              sourceType: 'script'
          }
      });

          pass(`switch (answer) { case 0: let a; }`, {
          source: 'switch (answer) { case 0: let a; }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 34,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 34
                  }
              },
              body: [{
                  type: 'SwitchStatement',
                  start: 0,
                  end: 34,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 34
                      }
                  },
                  discriminant: {
                      type: 'Identifier',
                      start: 8,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      name: 'answer'
                  },
                  cases: [{
                      type: 'SwitchCase',
                      start: 18,
                      end: 32,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 32
                          }
                      },
                      consequent: [{
                          type: 'VariableDeclaration',
                          start: 26,
                          end: 32,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 26
                              },
                              end: {
                                  line: 1,
                                  column: 32
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
                              start: 30,
                              end: 31,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 30
                                  },
                                  end: {
                                      line: 1,
                                      column: 31
                                  }
                              },
                              id: {
                                  type: 'Identifier',
                                  start: 30,
                                  end: 31,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 30
                                      },
                                      end: {
                                          line: 1,
                                          column: 31
                                      }
                                  },
                                  name: 'a'
                              },
                              init: null
                          }],
                          kind: 'let'
                      }],
                      test: {
                          type: 'Literal',
                          start: 23,
                          end: 24,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 23
                              },
                              end: {
                                  line: 1,
                                  column: 24
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }]
              }],
              sourceType: 'script'
          }
      });

          pass(`switch ({}) { default: }`, {
        source: 'switch ({}) { default: }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'SwitchStatement',
                    discriminant: {
                        type: 'ObjectExpression',
                        properties: [],
                        start: 8,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    cases: [
                        {
                            type: 'SwitchCase',
                            test: null,
                            consequent: [],
                            start: 14,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            }
                        }
                    ],
                    start: 0,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 24,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 24
                }
            }
        }
      });

          pass(`function foo() { "use strict"; switch(x) { case 1: function f() { }}}`, {
        source: 'function foo() { "use strict"; switch(x) { case 1: function f() { }}}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 'use strict',
                                    start: 17,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    },
                                    raw: '"use strict"'
                                },
                                directive: 'use strict',
                                start: 17,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            },
                            {
                                type: 'SwitchStatement',
                                discriminant: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 38,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                },
                                cases: [
                                    {
                                        type: 'SwitchCase',
                                        test: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 48,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 48
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            },
                                            raw: '1'
                                        },
                                        consequent: [
                                            {
                                                type: 'FunctionDeclaration',
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
                                                    start: 64,
                                                    end: 67,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 64
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 67
                                                        }
                                                    }
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'f',
                                                    start: 60,
                                                    end: 61,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 60
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 61
                                                        }
                                                    }
                                                },
                                                start: 51,
                                                end: 67,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 51
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 67
                                                    }
                                                }
                                            }
                                        ],
                                        start: 43,
                                        end: 67,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 43
                                            },
                                            end: {
                                                line: 1,
                                                column: 67
                                            }
                                        }
                                    }
                                ],
                                start: 31,
                                end: 68,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 68
                                    }
                                }
                            }
                        ],
                        start: 15,
                        end: 69,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 69
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 9,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    start: 0,
                    end: 69,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 69
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 69,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 69
                }
            }
        }
      });

  });