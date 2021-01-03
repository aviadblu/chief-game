export function makeCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = innerWidth - 4;
    canvas.height = innerHeight - 4;
    return canvas;
}