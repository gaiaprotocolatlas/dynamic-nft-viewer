import Color from 'color';
import MersenneTwister from 'mersenne-twister';
export const DEFAULT_SHAPE_COUNT = 3;
export const DEFAULT_WOBBLE = 30;
export const DEFAULT_BASE_COLORS = [
    '#01888C',
    '#FC7500',
    '#034F5D',
    '#F73F01',
    '#FC1960',
    '#C7144C',
    '#F3C100',
    '#1598F2',
    '#2465E1',
    '#F19E02',
];
export default function Jazzicon(address, shapeCount = DEFAULT_SHAPE_COUNT, wobble = DEFAULT_WOBBLE, baseColors = DEFAULT_BASE_COLORS) {
    if (!/^0x[0-9a-fA-F]{40}$/.test(address))
        throw new Error('Invalid address');
    if (shapeCount + 1 > baseColors.length)
        throw new Error('Insufficient base colors');
    const seed = parseInt(address.slice(2, 10), 16);
    const generator = new MersenneTwister(seed);
    const position = generator.random();
    const hueShift = 30 * position - wobble / 2;
    const colors = baseColors.map((hex) => Color(hex).rotate(hueShift).hex());
    function nextColor() {
        const unused = generator.random();
        const position = generator.random();
        const index = Math.floor(colors.length * position);
        const [color] = colors.splice(index, 1);
        return color || '#FFFFFF';
    }
    function nextTransform(index) {
        const firstRotation = generator.random();
        const boost = generator.random();
        const secondRotation = generator.random();
        const angle = 2 * Math.PI * firstRotation;
        const velocity = 100 * (index + boost) / shapeCount;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        const r = firstRotation * 360 + secondRotation * 180;
        return 'translate(' + x.toFixed(3) + ' ' + y.toFixed(3) + ') rotate(' + r.toFixed(1) + ' 50 50)';
    }
    const shapes = [];
    shapes.push('<rect x="0" y="0" width="100%" height="100%" fill="' + nextColor() + '" />');
    for (let i = 0; i < shapeCount; i++) {
        shapes.push('<rect x="0" y="0" width="100%" height="100%" transform="' + nextTransform(i) + '" fill="' + nextColor() + '" />');
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 100 100">' + shapes.join('') + '</svg>';
}
//# sourceMappingURL=Jazzicon.js.map