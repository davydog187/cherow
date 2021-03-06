import { pass, fail } from '../test-utils';
import { parseScript, parseModule } from '../../src/cherow';

describe('Miscellaneous - Comma (ES2017)', () => {

    const conciseBody = (arg: string) => `let fun = (${arg}) => foo`;
    const arrow = (arg: string) => `fun = (${arg}) => {}`;
    const asyncArrow = (arg: string) => `async (${arg}) => a
    async (${arg}) => {}`;
    const functionExpression =  (arg: string) => `function* f(${arg}) {}`;
    const generatorExpression = (arg: string) => `function* f(${arg}) {}`;
    const asyncExpression = (arg: string) => `async function f(${arg}) {}`;
    const callExpression = (arg: string) => `new foo(${arg})`;
    const superCall = (arg: string) => `(new foo(${arg}))`;
    const newCall = (arg: string)  => `(new class extends Cherow {
        constructor() {
            super(${arg});
        }
    })`;

    const objectMethod = (arg: string) => `({
                m(${arg}) {
                    var fun = this.m;
                }
            })`;

    const objectGeneratorMethod = (arg: string) => `({
                * m(${arg}) {
                }
            })`;

    const classMethod = (arg: string) => `(new class {
                m(${arg}) {
                    var fun = this.m;
                }
            })`;

    const classAsyncMethod = (arg: string) => `(new class {
                *m(${arg}) {
                    var fun = this.m;
                }
            })`;

    const classStaticMethod = (arg: string) => `(class {
                static m(${arg}) {
                    var fun = this.m;
                }
            })`;

    const classGeneratorMethod = (arg: string) => `(new class {
                * m(${arg}) {
                    var fun = this.m;
                }
            })`;

    const classStaticGeneratorMethod = (arg: string) => `(class {
                static * m(${arg}) {
                    var fun = this.m;
                }
            })`;

    const classConstructorMethod = (arg: string) => `new (class {
                constructor(${arg}) {
                    var fun = this.constructor;
                }
            })`;

    const tests = [
        conciseBody,
        functionExpression,
        generatorExpression,
        objectMethod,
        objectGeneratorMethod,
        classMethod,
        classAsyncMethod,
        classStaticMethod,
        classConstructorMethod,
        classGeneratorMethod,
        asyncExpression,
        callExpression
    ];

    for (const test of tests) {

        pass(test('a, '), {
            source: test('a, b, '),
            next: true,
            expected: parseScript(test('a, b, '))
        });

        pass(test('a, '), {
            source: test('a, b, '),
            module: true,
            next: true,
            expected: parseModule(test('a, b, '))
        });

        pass(test('{a}, {b}, '), {
            source: test('{a}, {b}, '),
            next: true,
            expected: parseScript(test('{a}, {b}, '))
        });

        pass(test('{a} = {a: 30}, {b} = {b: 40}, '), {
            source: test('{a} = {a: 30}, {b} = {b: 40}, '),
            next: true,
            expected: parseScript(test('{a} = {a: 30}, {b} = {b: 40}, '))
        });

        pass(test('{a} = {a: 30}, {b} = {b: 40}, '), {
            source: test('{a} = {a: 30}, {b} = {b: 40}, '),
            module: true,
            next: true,
            expected: parseModule(test('{a} = {a: 30}, {b} = {b: 40}, '))
        });

        pass(test('[a], '), {
            source: test('[a], '),
            next: true,
            expected: parseScript(test('[a], '))
        });

        pass(test('[a] = [30], '), {
            source: test('[a] = [30], '),
            next: true,
            expected: parseScript(test('[a] = [30], '))
        });

        pass(test('[a] = [30], [b] = [40], '), {
            source: test('[a] = [30], [b] = [40], '),
            next: true,
            expected: parseScript(test('[a] = [30], [b] = [40], '))
        });

        pass(test('a, b, '), {
            source: test('a, b, '),
            next: true,
            expected: parseScript(test('a, b, '))
        });

        pass(test('a, b, '), {
            source: test('a, b, '),
            next: true,
            expected: parseScript(test('a, b, '))
        });

        pass(test('{a}, {b}, '), {
            source: test('{a}, {b}, '),
            next: true,
            expected: parseScript(test('{a}, {b}, '))
        });

        pass(test('{a}, {b}, '), {
            source: test('{a}, {b}, '),
            module: true,
            next: true,
            expected: parseModule(test('{a}, {b}, '))
        });

        pass(test('a = 30, '), {
            source: test('a = 30, '),
            next: true,
            expected: parseScript(test('a = 30, '))
        });

        fail(test('...a,'), {
            source: test('...a,'),
            next: true
        });

        fail(test(','), {
            source: test(','),
            next: true
        });

        fail(test(', a'), {
            source: test(', a'),
            next: true
        });

        fail(test('a..., , '), {
            source: test('a..., , '),
            next: true
        });

        fail(test('a, ...b, '), {
            source: test('a, ...b, '),
            next: true
        });

        fail(test('a, ...b, '), {
            source: test('a, ...b, '),
            next: true,
            module: true
        });
    }

    for (const trail of ['', ';', '\n => {}']) {

        fail('(a,)' + trail, {
            source: '(a,)' + trail
        });

        fail('(a, b,)' + trail, {
            source: '(a, b,)' + trail
        });

        fail('(...a, )' + trail, {
            source: '(...a, )' + trail
        });

        fail('(a, ...b, )' + trail, {
            source: '(a, ...b, )' + trail
        });

        fail('(a, ...b, )' + trail, {
            source: '(a, ...b, )' + trail,
            module: true
        });

        fail('(a, , b)' + trail, {
            source: '(a, , b)' + trail
        });

        fail('(, a)' + trail, {
            source: '(, a)' + trail
        });

        fail('(, ...a)' + trail, {
            source: '(, ...a)' + trail
        });

        fail('(a, , )' + trail, {
            source: '(a, , )' + trail
        });

        fail('(a, , )' + trail, {
            source: '(a, , )' + trail,
            module: true
        });

        fail('(...a, , )' + trail, {
            source: '(...a, , )' + trail
        });
    }

    for (const test of [newCall, superCall]) {
        pass(test('...[10, 20], ...[30], '), {
            source: test('...[10, 20], ...[30], '),
            next: true,
            expected: parseScript(test('...[10, 20], ...[30], '))
        });

        pass(test('10, 20, '), {
            source: test('10, 20, '),
            next: true,
            expected: parseScript(test('10, 20, '))
        });

        pass(test('...[10, 20], ...[30], '), {
            source: test('...[10, 20], ...[30], '),
            next: true,
            expected: parseScript(test('...[10, 20], ...[30], '))
        });

        pass(test('10, 20, 30, 40, '), {
            source: test('10, 20, 30, 40, '),
            next: true,
            expected: parseScript(test('10, 20, 30, 40, '))
        });

        fail(test('() => test(",")'), {
            source: test('() => test(",")'),
            next: true,
            module: true
        });

        fail(test('() => test("...a, , ")'), {
            source: test('() => test("...a, , ")'),
            next: true,
            module: true
        });

        fail(test('() => test(", a")'), {
            source: test('() => test(", a")'),
            next: true,
            module: true
        });

        fail(test('() => test("...a, , '), {
            source: test('() => test("...a, , '),
            next: true,
            module: true
        });
    }

    fail(`() => (, a)`, {
        source: `() => (, a)`,
        line: 1
    });

    fail(`() => (a, , )`, {
        source: `() => (a, , )`,
        line: 1
    });

    fail(`() => (...a, , )`, {
        source: `() => (...a, , )`,
        line: 1
    });

    fail(`(,) => 0;`, {
        source: '(,) => 0;',
        line: 1
    });

    fail(`f(,);`, {
        source: 'f(,);',
        line: 1
    });

    fail(`function f(,){}`, {
        source: 'function f(,){}',
        line: 1
    });

    fail(`function f(...a,) {}`, {
        source: 'function f(...a,) {}',
        module: true,
        line: 1
    });

    fail(`async (,) => a`, {
        source: 'async (,) => a',
        module: true,
        line: 1
    });

    fail(`async (...a,) => a`, {
        source: 'async (...a,) => a',
        module: true,
        line: 1
    });

    fail(`class A {foo(...a,) {}}`, {
        source: 'class A {foo(...a,) {}}',
        module: true,
        line: 1
    });

    fail(`"use strict"; (function   (b,,) {})`, {
        source: '"use strict"; (function   (b,,) {})',
        module: true,
        line: 1
    });

    fail(`"use strict"; (b,,) => {};`, {
        source: '"use strict"; (b,,) => {};',
        module: true,
        line: 1
    });

    fail(`"use strict"; a(1,,);`, {
        source: '"use strict"; a(1,,);',
        module: true,
        line: 1
    });

    fail(`"use strict";  function* a2(,) {}`, {
        source: '"use strict";  function* a2(,) {}',
        module: true,
        line: 1
    });

    fail(`"use strict"; (function  a(...b,) {});`, {
        source: '"use strict"; (function  a(...b,) {});',
        module: true,
        line: 1
    });

    fail(`"use strict"; (function* a(b, c, ...d,) {});`, {
        source: '"use strict"; (function* a(b, c, ...d,) {});',
        module: true,
        line: 1
    });

    fail(`"use strict"; a1(,);`, {
        source: '"use strict"; a1(,);',
        module: true,
        line: 1
    });

    fail(`"use strict"; (a,b,c,);`, {
        source: '"use strict"; (a,b,c,);',
        module: true,
        line: 1
    });

    fail(`"use strict"; (a,);`, {
        source: '"use strict"; (a,);',
        module: true,
        line: 1
    });

    fail(`"use strict"; (function* a(b,,) {})`, {
        source: '"use strict"; (function* a(b,,) {})',
        module: true,
        line: 1
    });

    pass(` function  a(b,) {}`, {
        source: 'function  a(b,) {}',
        ranges: true,
        next: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'b',
                            start: 12,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 16,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        start: 10,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(` function  a(b,c,d,) {}`, {
        source: ' function  a(b,c,d,) {}',
        ranges: true,
        next: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'b',
                            start: 13,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        {
                            type: 'Identifier',
                            name: 'c',
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
                            }
                        },
                        {
                            type: 'Identifier',
                            name: 'd',
                            start: 17,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 21,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        start: 11,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    start: 1,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 23,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 23
                }
            }
        }
    });

    pass(`a(1,2,3,);`, {
        source: 'a(1,2,3,);',
        ranges: true,
        next: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'a',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'Literal',
                                value: 1,
                                start: 2,
                                end: 3,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 3
                                    }
                                },
                                raw: '1'
                            },
                            {
                                type: 'Literal',
                                value: 2,
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                raw: '2'
                            },
                            {
                                type: 'Literal',
                                value: 3,
                                start: 6,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                },
                                raw: '3'
                            }
                        ],
                        start: 0,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    start: 0,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 10,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 10
                }
            }
        }
    });

    pass(`a(...[], 2, ...[],);`, {
        source: 'a(...[], 2, ...[],);',
        ranges: true,
        next: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 20
              }
            },
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                },
                expression: {
                  type: 'CallExpression',
                  start: 0,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  },
                  callee: {
                    type: 'Identifier',
                    start: 0,
                    end: 1,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 1
                      }
                    },
                    name: 'a'
                  },
                  arguments: [
                    {
                      type: 'SpreadElement',
                      start: 2,
                      end: 7,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 7
                        }
                      },
                      argument: {
                        type: 'ArrayExpression',
                        start: 5,
                        end: 7,
                        loc: {
                          start: {
                            line: 1,
                            column: 5
                          },
                          end: {
                            line: 1,
                            column: 7
                          }
                        },
                        elements: []
                      }
                    },
                    {
                      type: 'Literal',
                      start: 9,
                      end: 10,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 10
                        }
                      },
                      value: 2,
                      raw: '2'
                    },
                    {
                      type: 'SpreadElement',
                      start: 12,
                      end: 17,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 17
                        }
                      },
                      argument: {
                        type: 'ArrayExpression',
                        start: 15,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 15
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        },
                        elements: []
                      }
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`(function*  (b,c,d,) {});`, {
        source: '(function*  (b,c,d,) {});',
        ranges: true,
        next: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 25,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 25
              }
            },
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                },
                expression: {
                  type: 'FunctionExpression',
                  start: 1,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  },
                  id: null,
                  generator: true,
                  expression: false,
                  async: false,
                  params: [
                    {
                      type: 'Identifier',
                      start: 13,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      name: 'b'
                    },
                    {
                      type: 'Identifier',
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
                      name: 'c'
                    },
                    {
                      type: 'Identifier',
                      start: 17,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      name: 'd'
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    start: 21,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    },
                    body: []
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`var foo = (a, b,) => {};`, {
        source: 'var foo = (a, b,) => {};',
        ranges: true,
        next: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 21,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 11,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 14,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 10,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 4,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            start: 4,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass(`var foo = function(a, b,) {};`, {
        source: 'var foo = function(a, b,) {};',
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'FunctionExpression',
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 19,
                                        end: 20
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 22,
                                        end: 23
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 26,
                                    end: 28
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 10,
                                end: 28
                            },
                            id: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 4,
                                end: 7
                            },
                            start: 4,
                            end: 28
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 29
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 29
        }
    });

    pass(`foo(a, b,);`, {
        source: 'foo(a, b,);',
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 0,
                            end: 3
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                start: 4,
                                end: 5
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                start: 7,
                                end: 8
                            }
                        ],
                        start: 0,
                        end: 10
                    },
                    start: 0,
                    end: 11
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 11
        }
    });

    pass(`function foo(a, b,) {};`, {
        source: 'function foo(a, b,) {};',
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'a',
                            start: 13,
                            end: 14
                        },
                        {
                            type: 'Identifier',
                            name: 'b',
                            start: 16,
                            end: 17
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 20,
                        end: 22
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 9,
                        end: 12
                    },
                    start: 0,
                    end: 22
                },
                {
                    type: 'EmptyStatement',
                    start: 22,
                    end: 23
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 23
        }
    });

    pass(`var [a, ...[b, c]] = d;`, {
        source: 'var [a, ...[b, c]] = d;',
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Identifier',
                                name: 'd',
                                start: 21,
                                end: 22
                            },
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 5,
                                        end: 6
                                    },
                                    {
                                        type: 'RestElement',
                                        argument: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'b',
                                                    start: 12,
                                                    end: 13
                                                },
                                                {
                                                    type: 'Identifier',
                                                    name: 'c',
                                                    start: 15,
                                                    end: 16
                                                }
                                            ],
                                            start: 11,
                                            end: 17
                                        },
                                        start: 8,
                                        end: 17
                                    }
                                ],
                                start: 4,
                                end: 18
                            },
                            start: 4,
                            end: 22
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 23
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 23
        }
    });

    pass(`f(x,);`, {
        source: 'f(x,);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'f',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                start: 2,
                                end: 3,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 3
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 6,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }
    });

    pass(`class X { constructor(a,) {} }`, {
        source: 'class X { constructor(a,) {} }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'X',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'constructor',
                                    start: 10,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    }
                                },
                                kind: 'constructor',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 22,
                                            end: 23,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 23
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
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
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 21,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    start: 0,
                    end: 30,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 30,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 30
                }
            }
        }
    });

    pass(`class P { f(a,b,) { } }`, {
        source: 'class P { f(a,b,) { } }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'P',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'f',
                                    start: 10,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 12,
                                            end: 13,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 13
                                                }
                                            }
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'b',
                                            start: 14,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 18,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 11,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 23,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 23
                }
            }
        }
    });

    pass(`f(...a,);`, {
        source: 'f(...a,);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'f',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'SpreadElement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    }
                                },
                                start: 2,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    start: 0,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 9,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }
    });

    pass(`function foo(a,) { }`, {
        source: 'function foo(a,) { }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'a',
                            start: 13,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 17,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 20
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
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 20,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 20
                }
            }
        }
    });

    pass(`class A {foo(a,) {}}`, {
        source: 'class A {foo(a,) {}}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'A',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
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
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 13,
                                            end: 14,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 14
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 17,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 12,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                static: false,
                                start: 9,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 20,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 20
                }
            }
        }
    });

    pass(`class A {static foo(a,) {}}`, {
        source: 'class A {static foo(a,) {}}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'A',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 16,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 20,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 24,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 19,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    }
                                },
                                static: true,
                                start: 9,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        }
                    },
                    start: 0,
                    end: 27,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 27,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 27
                }
            }
        }
    });

    pass(`new foo(...a,)`, {
        source: 'new foo(...a,)',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'NewExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 4,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'SpreadElement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 11,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                start: 8,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 14,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }
    });

    pass(`({foo(a,) {}})`, {
        source: '({foo(a,) {}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 2,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 6,
                                            end: 7,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 7
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 10,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 5,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 2,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 14,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }
    });

    pass(`let f = (x,y,) => x;`, {
        source: 'let f = (x,y,) => x;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 18,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 9,
                                        end: 10,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 10
                                            }
                                        }
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'y',
                                        start: 11,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
                                start: 8,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'f',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                }
                            },
                            start: 4,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        }
                    ],
                    kind: 'let',
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 20,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 20
                }
            }
        }
    });
});