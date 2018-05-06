import main from "./main";
import Raf from "./core/Raf";
import BrowserKeyListener from "./core/BrowserKeyListener";

const provideCanvas = selector => {
    const canvas = document.querySelector(selector);
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    return canvas;
};

const layers = {
    L0: provideCanvas("#layer-0"),
    L1: provideCanvas("#layer-1"),
    L2: provideCanvas("#layer-2"),
    L3: provideCanvas("#layer-3"),
    L4: provideCanvas("#layer-4"),
    UI: document.querySelector("#ui")
};

const match = document.location.href.match(/seed=(\d+)/) || [];
const seed = parseInt(match[1], 10) || Math.trunc(Math.random() * Math.pow(10, 6));

const keyListener = BrowserKeyListener(window).init();
const font = new FontFace("Rubik", "url(Rubik-Regular.ttf)");

font.load().then(() => {
    document.fonts.add(font);
    document.title += ` [${ seed }]`;

    main(seed, layers, () => new Raf(), keyListener);
});

