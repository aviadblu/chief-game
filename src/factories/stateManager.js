export function makeStateManager(utils) {
    const state = {}
    const stateChangeEventRegistration = {}

    function update(statePiece) {
        Object.assign(state, statePiece)
    }

    function getState() {
        return state
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
