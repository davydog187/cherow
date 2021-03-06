import { fail, pass } from '../test-utils';

describe('Miscellaneous - Simple parameter list', () => {

    const testCases = [
        // Array destructuring.
        '[]',
        '[a]',
        'x, [a]',
        '[a], x',
        // Array destructuring with defaults.
        '[a = 0]',
        'x, [a = 0]',
        '[a = 0], x',
        // Array destructuring with rest binding identifier.
        '[...a]',
        'x, [...a]',
        '[...a], x',

        // Array destructuring with rest binding pattern.
        '[...[a]]',
        'x, [...[a]]',
        '[...[a]], x',

        // Object destructuring.
        '{}',
        '{p: o}',
        'x, {p: o}',
        '{p: o}, x',

        // Object destructuring with defaults.
        '{p: o = 0}',
        'x, {p: o = 0}',
        '{p: o = 0}, x',

        // Object destructuring with shorthand identifier form.
        '{o}',
        'x, {o}',
        '{o}, x',

        // Object destructuring with CoverInitName.
        '{o = 0}',
        'x, {o = 0}',
        '{o = 0}, x',

        // Object setter

        '{ set f(a = 1) }, x',

        // Default parameter.
        'd = 0',
        'x, d = 0',
        'd = 0, x',

        // Rest parameter.
        '...rest',
        'x, ...rest',
        '...x',

        // Rest parameter with array destructuring.
        '...[]',
        '...[a]',
        'x, ...[]',
        'x, ...[a]',

        // Rest parameter with object destructuring.
        '...{}',
        '...{p: o}',
        'x, ...{}',
        'x, ...{p: o}',

        // All non-simple cases combined.
        'x, d = 123, [a], {p: 0}, ...rest',
    ];

    const functionDefinitions = [
        // FunctionDeclaration
        (parameters: string) => `function f(${parameters}) { "use strict"; }`,

        // FunctionExpression
        (parameters: string) => `void function(${parameters}) { "use strict"; };`,
        (parameters: string) => `void function f(${parameters}) { "use strict"; };`,

        // Function constructor
        (parameters: string) => `Function('${parameters}', '"use strict";')`,

        // GeneratorDeclaration
        (parameters: string) => `function* g(${parameters}) { "use strict"; }`,

        // AsyncFunctionDeclaration
        (parameters: string) => `async function g(${parameters}) { "use strict"; }`,

        // AsyncGeneratorDeclaration
        (parameters: string) => `async function *g(${parameters}) { "use strict"; }`,

        // GeneratorExpression
        (parameters: string) => `void function*(${parameters}) { "use strict"; };`,
        (parameters: string) => `void function* g(${parameters}) { "use strict"; };`,

        // GeneratorFunction constructor
        (parameters: string) => `GeneratorFunction('${parameters}', '"use strict";')`,

        // MethodDefinition
        (parameters: string) => `({ m(${parameters}) { "use strict"; } });`,
        (parameters: string) => `(class { m(${parameters}) { "use strict"; } });`,
        (parameters: string) => `class C { m(${parameters}) { "use strict"; } }`,

        // MethodDefinition (constructors)
        (parameters: string) => `(class { constructor(${parameters}) { "use strict"; } });`,
        (parameters: string) => `class C { constructor(${parameters}) { "use strict"; } }`,

        // MethodDefinition (getter)
        (parameters: string) => `({ get m(${parameters}) { "use strict"; } });`,
        (parameters: string) => `(class { get m(${parameters}) { "use strict"; } });`,
        (parameters: string) => `class C { get m(${parameters}) { "use strict"; } }`,
        (parameters: string) => `class C { async m(${parameters}) { "use strict"; } }`,

        // MethodDefinition (setter)
        (parameters: string) => `({ set m(${parameters}) { "use strict"; } });`,
        (parameters: string) => `(class { set m(${parameters}) { "use strict"; } });`,
        (parameters: string) => `class C { set m(${parameters}) { "use strict"; } }`,
        (parameters: string) => `({ async set m(${parameters}) { "use strict"; } });`,

        // GeneratorMethod
        (parameters: string) => `({ *m(${parameters}) { "use strict"; } });`,
        (parameters: string) => `(class { *m(${parameters}) { "use strict"; } });`,
        (parameters: string) => `class C { *m(${parameters}) { "use strict"; } }`,

        // ArrowFunction
        (parameters: string) => `(${parameters}) => { "use strict"; };`,

        // AsyncArrowFunction
        (parameters: string) => `async (${parameters}) => { "use strict"; };`,
    ];

    for (const nonSimpleParameters of testCases) {
        for (const def of functionDefinitions) {

            // Sloppy mode
            fail(def(nonSimpleParameters), {
                source: def(nonSimpleParameters)
            });

            // Strict script code.
            fail('"use strict"; ' + def(nonSimpleParameters), {
                source: '"use strict"; ' + def(nonSimpleParameters)
            });

             // Module code.
            fail(def(nonSimpleParameters), {
                module: true,
                source: def(nonSimpleParameters)
            });
        }
    }

    fail(`function a([ option1, option2 ] = []) {  "use strict"; }`, {
        source: 'function a([ option1, option2 ] = []) {  "use strict"; }',
        line: 1
    });

    fail(`function foo(a=2) { "use strict"; }`, {
        source: 'function foo(a=2) { "use strict"; }',
        line: 1
    });

    fail(`function foo({a}) { "use strict"; }`, {
        source: 'function foo({a}) { "use strict"; }',
        line: 1
    });

    fail(`function foo([a]) { "use strict"; }`, {
        source: 'function foo([a]) { "use strict"; }',
        line: 1
    });

    fail(`function foo({a}) { "use strict"; }`, {
        source: 'function foo({a}) { "use strict"; }',
        line: 1
    });

    fail(`({a}) => { "use strict"; }`, {
        source: '({a}) => { "use strict"; }',
        module: true,
        line: 1
    });

    fail(`function a([ option1, option2 ]) { "use strict"; }`, {
        source: 'function a([ option1, option2 ]) { "use strict"; }',
        line: 1
    });

    fail(`function a(options = {}) { "use strict"; }`, {
        source: 'function a(options = {}) { "use strict"; }',
        line: 1
    });

    fail(`function a(...options) { "use strict"; }`, {
        source: 'function a(...options) { "use strict"; }',
        line: 1
    });

    fail(`var a = async (options = {}) => { "use strict"; }`, {
        source: 'var a = async (options = {}) => { "use strict"; }',
        line: 1
    });

    fail(`function a([ option1, option2 ]) { "use strict"; }`, {
        source: 'function a([ option1, option2 ]) { "use strict"; }',
        line: 1
    });

    fail(`function a([ option1, option2 ]) { "use strict"; }`, {
        source: 'function a([ option1, option2 ]) { "use strict"; }',
        module: true,
        line: 1
    });

    fail(`function f([x] = [1]) { "use strict" }`, {
        source: 'function f([x] = [1]) { "use strict" }',
        line: 1
    });

});