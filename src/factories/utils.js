export function makeUtils() {

    return function() {

        function makeId(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }


        return Object.freeze({
            makeId,
            getRandomArbitrary
        })
    }
}
