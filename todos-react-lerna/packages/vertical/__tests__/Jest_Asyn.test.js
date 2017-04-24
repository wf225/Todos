describe('Jest - Getting started', () => {

    // 1. Callbacks
    function fetchData(callback) {
        callback('peanut butter');
    }

    // Instead of putting the test in a function with an empty argument, use a single argument called done.
    // Jest will wait until the done callback is called before finishing the test.
    // If done() is never called, the test will fail, which is what you want to happen.
    test('the data is peanut butter', done => {
        function callback(data) {
            expect(data).toBe('peanut butter');
            done();
        }

        fetchData(callback);
    });

    // 2. Promises
    // function fetchData() {
    // }

    // test('the data is peanut butter', () => {
    //     return fetchData().then(data => {
    //         expect(data).toBe('peanut butter');
    //     });
    // });

    // 3. Async/Await
    // test('the data is peanut butter', async () => {
    //     await expect(fetchData()).resolves.toBe('peanut butter');
    // });


});