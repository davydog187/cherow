import { pass, fail } from '../test-utils';

describe('Expressions - Generators', () => {

    fail(`'use strict'; (function *g() { ( x, y=yield ) => {} });`, {
        source: '"use strict"; (function *g() { ( x, y=yield ) => {} });',
        line: 1,
    });

    fail(`'use strict'; (function *g() { ( [x=(yield)]) => {} });`, {
        source: '"use strict"; (function *g() { ([x=(yield)]) => {} });',
        line: 1,
    });

    fail(`'use strict'; (function *g() { ( [x=f(yield)]) => {} });`, {
        source: '"use strict"; (function *g() { ( [x=f(yield)]) => {} });',
        line: 1,
    });

    fail(`'use strict'; (function *g() { ( [x]=f(yield) ) => {} });`, {
        source: '"use strict"; (function *g() { ( [x]=f(yield)) => {} });',
        line: 1,
    });

    fail(`(function *g() { ( x, y=yield ) => {} });`, {
        source: '(function *g() { ( x, y=yield ) => {} });',
        line: 1,
    });

    fail(`'use strict'; (function *g() { ( x = class extends f(yield) { } ) => {} });`, {
        source: '"use strict"; (function *g() { ( x = class extends f(yield) { } ) => {} });',
        line: 1,
    });

    fail(`'use strict'; (function *g() { ( x = class { [(yield, 1)]() { }  ) => {} });`, {
        source: '"use strict"; (function *g() { ( x = class { [(yield, 1)]() { }  ) => {} });',
        line: 1,
    });

    fail(`var g = function*(yield) {};`, {
        source: 'var g = function*(yield) {};',
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`var g = function*(yield) {};`, {
        source: 'var g = function*(yield) {};',
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`var gen = function *() { void yield; };`, {
        source: 'var gen = function *() { void yield; };',
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
        column: 29,
        index: 29
    });

    fail(`let gfe = function* yield() { }`, {
        source: 'let gfe = function* yield() { }',
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
        column: 19,
        index: 19
    });

    pass(`yield spread multiple`, {
        source: `var gen = function *() {
            yield [...yield yield];
          };`,
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'YieldExpression',
                                                argument: {
                                                    type: 'ArrayExpression',
                                                    elements: [
                                                        {
                                                            type: 'SpreadElement',
                                                            argument: {
                                                                type: 'YieldExpression',
                                                                argument: {
                                                                    type: 'YieldExpression',
                                                                    argument: null,
                                                                    delegate: false,
                                                                    start: 53,
                                                                    end: 58,
                                                                    loc: {
                                                                        start: {
                                                                            line: 2,
                                                                            column: 28
                                                                        },
                                                                        end: {
                                                                            line: 2,
                                                                            column: 33
                                                                        }
                                                                    }
                                                                },
                                                                delegate: false,
                                                                start: 47,
                                                                end: 58,
                                                                loc: {
                                                                    start: {
                                                                        line: 2,
                                                                        column: 22
                                                                    },
                                                                    end: {
                                                                        line: 2,
                                                                        column: 33
                                                                    }
                                                                }
                                                            },
                                                            start: 44,
                                                            end: 58,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 19
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 33
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 43,
                                                    end: 59,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                delegate: false,
                                                start: 37,
                                                end: 59,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 34
                                                    }
                                                }
                                            },
                                            start: 37,
                                            end: 60,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 35
                                                }
                                            }
                                        }
                                    ],
                                    start: 23,
                                    end: 72,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 3,
                                            column: 11
                                        }
                                    }
                                },
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 10,
                                end: 72,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 3,
                                        column: 11
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'gen',
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
                            end: 72,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 3,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 73,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 3,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 73,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 3,
                    column: 12
                }
            }
        }
    });

    pass(`yield spread single`, {
        source: `var gen = function *() {
            yield [...yield];
          };`,
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'YieldExpression',
                                                argument: {
                                                    type: 'ArrayExpression',
                                                    elements: [
                                                        {
                                                            type: 'SpreadElement',
                                                            argument: {
                                                                type: 'YieldExpression',
                                                                argument: null,
                                                                delegate: false,
                                                                start: 47,
                                                                end: 52,
                                                                loc: {
                                                                    start: {
                                                                        line: 2,
                                                                        column: 22
                                                                    },
                                                                    end: {
                                                                        line: 2,
                                                                        column: 27
                                                                    }
                                                                }
                                                            },
                                                            start: 44,
                                                            end: 52,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 19
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 27
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 43,
                                                    end: 53,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 28
                                                        }
                                                    }
                                                },
                                                delegate: false,
                                                start: 37,
                                                end: 53,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 28
                                                    }
                                                }
                                            },
                                            start: 37,
                                            end: 54,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 29
                                                }
                                            }
                                        }
                                    ],
                                    start: 23,
                                    end: 66,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 3,
                                            column: 11
                                        }
                                    }
                                },
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 10,
                                end: 66,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 3,
                                        column: 11
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'gen',
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
                            end: 66,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 3,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 67,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 3,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 67,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 3,
                    column: 12
                }
            }
        }
    });

    pass(`(function* () { yield *v });`, {
        source: '(function* () { yield *v });',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'v',
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
                                            }
                                        },
                                        delegate: true,
                                        start: 16,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    },
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 28,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 28
                }
            }
        }
    });

    pass(`(function* () { fn(yield); });`, {
        source: '(function* () { fn(yield); });',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'fn',
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
                                        arguments: [
                                            {
                                                type: 'YieldExpression',
                                                argument: null,
                                                delegate: false,
                                                start: 19,
                                                end: 24,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 24
                                                    }
                                                }
                                            }
                                        ],
                                        start: 16,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 28,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 28
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 28
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

    pass(`(function* () { yield; });`, {
        source: '(function* () { yield; });',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: null,
                                        delegate: false,
                                        start: 16,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        }
                    },
                    start: 0,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 26,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 26
                }
            }
        }
    });

    pass(`(function* () { yield yield 10 });`, {
        source: '(function* () { yield yield 10 });',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'YieldExpression',
                                            argument: {
                                                type: 'Literal',
                                                value: 10,
                                                start: 28,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                }
                                            },
                                            delegate: false,
                                            start: 22,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        delegate: false,
                                        start: 16,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`(function* () { yield });`, {
        source: '(function* () { yield });',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: null,
                                        delegate: false,
                                        start: 16,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
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
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`(function* () { yield v });`, {
        source: '(function* () { yield v });',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'v',
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
                                        },
                                        delegate: false,
                                        start: 16,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 25
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

    pass(`(function* () { yield yield 10 });`, {
        source: '(function* () { yield yield 10 });',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'YieldExpression',
                                            argument: {
                                                type: 'Literal',
                                                value: 10,
                                                start: 28,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                }
                                            },
                                            delegate: false,
                                            start: 22,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        delegate: false,
                                        start: 16,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`function* test () { yield *v };`, {
        source: 'function* test () { yield *v };',
        loc: true,
        ranges: true,
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'v',
                                        start: 27,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    },
                                    delegate: true,
                                    start: 20,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                },
                                start: 20,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        start: 18,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'test',
                        start: 10,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 14
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
                },
                {
                    type: 'EmptyStatement',
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
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 31,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 31
                }
            }
        }
    });

    pass(`(function* () { yield *v });`, {
        source: '(function* () { yield *v });',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'v',
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
                                            }
                                        },
                                        delegate: true,
                                        start: 16,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    },
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 28,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 28
                }
            }
        }
    });

    pass(`(function* () { yield; });`, {
        source: '(function* () { yield; });',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: null,
                                        delegate: false,
                                        start: 16,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        }
                    },
                    start: 0,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 26,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 26
                }
            }
        }
    });

    pass(`(function* () { yield });`, {
        source: '(function* () { yield });',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: null,
                                        delegate: false,
                                        start: 16,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
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
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`yield as statement`, {
        source: `var g1 = function*() { yield; };
        var g2 = function*() { yield 1; };`,
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'YieldExpression',
                                                argument: null,
                                                delegate: false,
                                                start: 23,
                                                end: 28,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 28
                                                    }
                                                }
                                            },
                                            start: 23,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        }
                                    ],
                                    start: 21,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 9,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'g1',
                                start: 4,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            },
                            start: 4,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                },
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'YieldExpression',
                                                argument: {
                                                    type: 'Literal',
                                                    value: 1,
                                                    start: 70,
                                                    end: 71,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 37
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 38
                                                        }
                                                    },
                                                    raw: '1'
                                                },
                                                delegate: false,
                                                start: 64,
                                                end: 71,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 38
                                                    }
                                                }
                                            },
                                            start: 64,
                                            end: 72,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 39
                                                }
                                            }
                                        }
                                    ],
                                    start: 62,
                                    end: 74,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 29
                                        },
                                        end: {
                                            line: 2,
                                            column: 41
                                        }
                                    }
                                },
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 50,
                                end: 74,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 17
                                    },
                                    end: {
                                        line: 2,
                                        column: 41
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'g2',
                                start: 45,
                                end: 47,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 2,
                                        column: 14
                                    }
                                }
                            },
                            start: 45,
                            end: 74,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 12
                                },
                                end: {
                                    line: 2,
                                    column: 41
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 41,
                    end: 75,
                    loc: {
                        start: {
                            line: 2,
                            column: 8
                        },
                        end: {
                            line: 2,
                            column: 42
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 75,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 42
                }
            }
        }
    });

    pass(`yield property name`, {
        source: `var g = function*() {
            ({  yield: 1 });
          };`,
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
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
                                                            name: 'yield',
                                                            start: 38,
                                                            end: 43,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 16
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 21
                                                                }
                                                            }
                                                        },
                                                        value: {
                                                            type: 'Literal',
                                                            value: 1,
                                                            start: 45,
                                                            end: 46,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 23
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 24
                                                                }
                                                            },
                                                            raw: '1'
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 38,
                                                        end: 46,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 16
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 24
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 35,
                                                end: 48,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 13
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 26
                                                    }
                                                }
                                            },
                                            start: 34,
                                            end: 50,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 28
                                                }
                                            }
                                        }
                                    ],
                                    start: 20,
                                    end: 62,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 3,
                                            column: 11
                                        }
                                    }
                                },
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 8,
                                end: 62,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 3,
                                        column: 11
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'g',
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
                            end: 62,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 3,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 63,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 3,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 63,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 3,
                    column: 12
                }
            }
        }
    });

    pass(`yield spread object`, {
        source: `var gen = function *() {
            yield {
                ...yield,
                y: 1,
                ...yield yield,
              };
          };`,
        loc: true,
        ranges: true,
        next: true,
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'YieldExpression',
                                                argument: {
                                                    type: 'ObjectExpression',
                                                    properties: [
                                                        {
                                                            type: 'SpreadElement',
                                                            argument: {
                                                                type: 'YieldExpression',
                                                                argument: null,
                                                                delegate: false,
                                                                start: 64,
                                                                end: 69,
                                                                loc: {
                                                                    start: {
                                                                        line: 3,
                                                                        column: 19
                                                                    },
                                                                    end: {
                                                                        line: 3,
                                                                        column: 24
                                                                    }
                                                                }
                                                            },
                                                            start: 61,
                                                            end: 69,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 16
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 24
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'y',
                                                                start: 87,
                                                                end: 88,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 16
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 17
                                                                    }
                                                                }
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: 1,
                                                                start: 90,
                                                                end: 91,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 19
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 20
                                                                    }
                                                                },
                                                                raw: '1'
                                                            },
                                                            kind: 'init',
                                                            computed: false,
                                                            method: false,
                                                            shorthand: false,
                                                            start: 87,
                                                            end: 91,
                                                            loc: {
                                                                start: {
                                                                    line: 4,
                                                                    column: 16
                                                                },
                                                                end: {
                                                                    line: 4,
                                                                    column: 20
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'SpreadElement',
                                                            argument: {
                                                                type: 'YieldExpression',
                                                                argument: {
                                                                    type: 'YieldExpression',
                                                                    argument: null,
                                                                    delegate: false,
                                                                    start: 118,
                                                                    end: 123,
                                                                    loc: {
                                                                        start: {
                                                                            line: 5,
                                                                            column: 25
                                                                        },
                                                                        end: {
                                                                            line: 5,
                                                                            column: 30
                                                                        }
                                                                    }
                                                                },
                                                                delegate: false,
                                                                start: 112,
                                                                end: 123,
                                                                loc: {
                                                                    start: {
                                                                        line: 5,
                                                                        column: 19
                                                                    },
                                                                    end: {
                                                                        line: 5,
                                                                        column: 30
                                                                    }
                                                                }
                                                            },
                                                            start: 109,
                                                            end: 123,
                                                            loc: {
                                                                start: {
                                                                    line: 5,
                                                                    column: 16
                                                                },
                                                                end: {
                                                                    line: 5,
                                                                    column: 30
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 43,
                                                    end: 140,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 6,
                                                            column: 15
                                                        }
                                                    }
                                                },
                                                delegate: false,
                                                start: 37,
                                                end: 140,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 15
                                                    }
                                                }
                                            },
                                            start: 37,
                                            end: 141,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 16
                                                }
                                            }
                                        }
                                    ],
                                    start: 23,
                                    end: 153,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 7,
                                            column: 11
                                        }
                                    }
                                },
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 10,
                                end: 153,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 7,
                                        column: 11
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'gen',
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
                            end: 153,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 7,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 154,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 7,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 154,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 7,
                    column: 12
                }
            }
        }
    });

    pass(`(function* () { yield *v });`, {
        source: '(function* () { yield *v });',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'v',
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
                                            }
                                        },
                                        delegate: true,
                                        start: 16,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    },
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 28,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 28
                }
            }
        }
    });

    pass(`(function* () { yield; });`, {
        source: '(function* () { yield; });',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: null,
                                        delegate: false,
                                        start: 16,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        }
                    },
                    start: 0,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 26,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 26
                }
            }
        }
    });

    pass(`(function* () { yield yield 10 });`, {
        source: '(function* () { yield yield 10 });',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'YieldExpression',
                                            argument: {
                                                type: 'Literal',
                                                value: 10,
                                                start: 28,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                },
                                                raw: '10'
                                            },
                                            delegate: false,
                                            start: 22,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        delegate: false,
                                        start: 16,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    start: 16,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                }
                            ],
                            start: 14,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`generator declaration`, {
        source: 'function* test () { yield *v };',
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'v',
                                        start: 27,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    },
                                    delegate: true,
                                    start: 20,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                },
                                start: 20,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        start: 18,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'test',
                        start: 10,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 14
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
                },
                {
                    type: 'EmptyStatement',
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
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 31,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 31
                }
            }
        }
    });

    pass(`function* gf() { yield, 10; }`, {
        source: `function* gf() { yield, 10; }`,
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
                                    type: 'SequenceExpression',
                                    expressions: [
                                        {
                                            type: 'YieldExpression',
                                            argument: null,
                                            delegate: false,
                                            start: 17,
                                            end: 22,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            }
                                        },
                                        {
                                            type: 'Literal',
                                            value: 10,
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
                                            },
                                            raw: '10'
                                        }
                                    ],
                                    start: 17,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    }
                                },
                                start: 17,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            }
                        ],
                        start: 15,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gf',
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
                    start: 0,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 29,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 29
                }
            }
        }
    });

    pass(`var gfe = function* () { switch (1) { case yield: break; } }`, {
        source: `var gfe = function* () { switch (1) { case yield: break; } }`,
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'SwitchStatement',
                                            discriminant: {
                                                type: 'Literal',
                                                value: 1,
                                                start: 33,
                                                end: 34,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 33
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 34
                                                    }
                                                },
                                                raw: '1'
                                            },
                                            cases: [
                                                {
                                                    type: 'SwitchCase',
                                                    test: {
                                                        type: 'YieldExpression',
                                                        argument: null,
                                                        delegate: false,
                                                        start: 43,
                                                        end: 48,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 43
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 48
                                                            }
                                                        }
                                                    },
                                                    consequent: [
                                                        {
                                                            type: 'BreakStatement',
                                                            label: null,
                                                            start: 50,
                                                            end: 56,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 50
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 56
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 38,
                                                    end: 56,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 38
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 56
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 25,
                                            end: 58,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 58
                                                }
                                            }
                                        }
                                    ],
                                    start: 23,
                                    end: 60,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 60
                                        }
                                    }
                                },
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 10,
                                end: 60,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 60
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'gfe',
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
                            end: 60,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 60
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 60,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 60
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 60,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 60
                }
            }
        }
    });

    pass(`var gfe = function* () { switch (1) { case yield* 'foo': break; } }`, {
        source: `var gfe = function* () { switch (1) { case yield* 'foo': break; } }`,
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'SwitchStatement',
                                            discriminant: {
                                                type: 'Literal',
                                                value: 1,
                                                start: 33,
                                                end: 34,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 33
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 34
                                                    }
                                                },
                                                raw: '1'
                                            },
                                            cases: [
                                                {
                                                    type: 'SwitchCase',
                                                    test: {
                                                        type: 'YieldExpression',
                                                        argument: {
                                                            type: 'Literal',
                                                            value: 'foo',
                                                            start: 50,
                                                            end: 55,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 50
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 55
                                                                }
                                                            },
                                                            raw: '\'foo\''
                                                        },
                                                        delegate: true,
                                                        start: 43,
                                                        end: 55,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 43
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 55
                                                            }
                                                        }
                                                    },
                                                    consequent: [
                                                        {
                                                            type: 'BreakStatement',
                                                            label: null,
                                                            start: 57,
                                                            end: 63,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 57
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 63
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 38,
                                                    end: 63,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 38
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 63
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 25,
                                            end: 65,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 65
                                                }
                                            }
                                        }
                                    ],
                                    start: 23,
                                    end: 67,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 67
                                        }
                                    }
                                },
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 10,
                                end: 67,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 67
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'gfe',
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
                            end: 67,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 67
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 67,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 67
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 67,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 67
                }
            }
        }
    });

    pass(`var o = { *gf() { yield* 'foo'; } }`, {
        source: `var o = { *gf() { yield* 'foo'; } }`,
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'gf',
                                            start: 11,
                                            end: 13,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 11
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 13
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'YieldExpression',
                                                            argument: {
                                                                type: 'Literal',
                                                                value: 'foo',
                                                                start: 25,
                                                                end: 30,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 25
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 30
                                                                    }
                                                                },
                                                                raw: '\'foo\''
                                                            },
                                                            delegate: true,
                                                            start: 18,
                                                            end: 30,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 18
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 30
                                                                }
                                                            }
                                                        },
                                                        start: 18,
                                                        end: 31,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 18
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 31
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 16,
                                                end: 33,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 16
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 33
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 13,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 10,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        }
                                    }
                                ],
                                start: 8,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'o',
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
                            end: 35,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 35
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 35,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 35
                }
            }
        }
    });
});