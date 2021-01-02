export function makeUtils() {

    return function () {

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

        function rect(x, y, w, h) {
            return function () {
                function intersects(rect) {
                    return !(rect.x > (x + w) ||
                        (rect.x + rect.w) < x ||
                        rect.y > (y + h) ||
                        (rect.y + rect.h) < y);
                }

                function getRect() {
                    return {
                        x, y, w, h
                    }
                }

                return Object.freeze({
                    intersects,
                    getRect
                })
            }
        }


        return Object.freeze({
            rect,
            makeId,
            getRandomArbitrary
        })
    }
}
