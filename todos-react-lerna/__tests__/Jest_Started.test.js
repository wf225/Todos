
describe('Jest - Getting started', () => {

    // toBe uses === to test exact equality.
    test('two plus two is four', () => {
        expect(2 + 2).toBe(4);
    });

    // If you want to check the value of an object, use toEqual instead.
    // toEqual recursively checks every field of an object or array.
    test('object assignment', () => {
        const data = { one: 1 };
        data['two'] = 2;
        expect(data).toEqual({ one: 1, two: 2 });
    });

    test('adding positive numbers is not zero', () => {
        for (let a = 1; a < 10; a++) {
            for (let b = 1; b < 10; b++) {
                expect(a + b).not.toBe(0);
            }
        }
    });

    // Truthiness

    // toBeNull matches only null
    // toBeUndefined matches only undefined
    // toBeDefined is the opposite of toBeUndefined
    // toBeTruthy matches anything that an if statement treats as true
    // toBeFalsy matches anything that an if statement treats as false

    test('null', () => {
        const n = null;
        expect(n).toBeNull();
        expect(n).toBeDefined();
        expect(n).not.toBeUndefined();
        expect(n).not.toBeTruthy();
        expect(n).toBeFalsy();
    });

    test('zero', () => {
        const z = 0;
        expect(z).not.toBeNull();
        expect(z).toBeDefined();
        expect(z).not.toBeUndefined();
        expect(z).not.toBeTruthy();
        expect(z).toBeFalsy();
    });

    // Numbers
    test('two plus two', () => {
        const value = 2 + 2;
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(3.5);
        expect(value).toBeLessThan(5);
        expect(value).toBeLessThanOrEqual(4.5);

        // toBe and toEqual are equivalent for numbers
        expect(value).toBe(4);
        expect(value).toEqual(4);
    });

    test('adding floating point numbers', () => {
        const value = 0.1 + 0.2;
        expect(value).not.toBe(0.3);    // It isn't! Because rounding error
        expect(value).toBeCloseTo(0.3); // This works.
    });

    // Strings
    test('there is no I in team', () => {
        expect('team').not.toMatch(/I/);
    });

    test('but there is a "stop" in Christoph', () => {
        expect('Christoph').toMatch(/stop/);
    });

    // Arrays
    const shoppingList = [
        'diapers',
        'kleenex',
        'trash bags',
        'paper towels',
        'beer',
    ];

    test('the shopping list has beer on it', () => {
        expect(shoppingList).toContain('beer');
    });

    // Exceptions
    // function compileAndroidCode() {
    //     throw new ConfigError('you are using the wrong JDK');
    // }

    // test('compiling android goes as expected', () => {
    //     expect(compileAndroidCode).toThrow();
    //     expect(compileAndroidCode).toThrow(ConfigError);

    //     // You can also use the exact error message or a regexp
    //     expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    //     expect(compileAndroidCode).toThrow(/JDK/);
    // });

});