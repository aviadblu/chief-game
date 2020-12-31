export function makeStateManager(utils) {
    const state = {}
    const stateChangeEventRegistration = {}

    function update(statePiece) {

        Object.assign(state, statePiece)
        console.log("state updated", state);
    }

    function getState() {
        return Object.freeze(state)
    }

    function onChangeListener(node, cb) {
        const id = utils.makeId(5)
        stateChangeEventRegistration[id] = cb
        return id
    }

    function removeOnChangeListener(id) {
        delete stateChangeEventRegistration[id]
    }

    return function () {
        return Object.freeze({
            update,
            getState,
            onChangeListener,
            removeOnChangeListener
        })
    }
}
