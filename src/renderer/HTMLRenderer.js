export default function UIRenderer(parent) {

    const castArray = (subject = []) => Array.isArray(subject) ? subject : [subject];

    const $node = tagName => ({ className, style, ...props } = {}, children) => {
        const el = document.createElement(tagName);
        className && el.classList.add(...className.split(/\s+/));
        style && Object.assign(el.style, style);

        Object.keys(props)
            .forEach(propName => el.setAttribute(propName, props[propName]));

        castArray(children).forEach(child => el.appendChild(child));

        return el;
    };


    const div = $node("div");
    const txt = text => document.createTextNode(text);
    const button = $node("button");

    const append =  el => parent.appendChild(el);
    const remove =  el => parent.removeChild(el);
    const replace =  (newEl, oldEl) => parent.replaceChild(newEl, oldEl);
    const update = (newEl, oldEl) => {
        if (oldEl) {
            replace(newEl, oldEl);
        } else {
            append(newEl);
        }

        return newEl;
    };

    return {
        div,
        txt,
        button,

        append,
        remove,
        replace,
        update
    };
}

