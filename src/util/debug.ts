export function debug(err) {
    if (process.env.DEBUG === 'true') {
        console.log(err);
    }
}