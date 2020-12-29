export function makeCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = innerWidth - 10;
    canvas.height = innerHeight - 10;
    return canvas;
}

export function makeCanvasWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add("canvas-wrapper");
    return wrapper;
}
