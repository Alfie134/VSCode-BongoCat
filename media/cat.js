console.log("webview js loaded");

let cat = null;
let frames = [];
let frame = 0;

window.addEventListener('message', event => {
    console.log("webview recieved message:", event.data);
    const message = event.data;

    if(message.type === 'catAssets') {
        const base = message.base;
        console.log("BASE REVIEVED");

        frames = [
            `${base}/fullcat1.png`,
            `${base}/cat_rightpaw.png`,
            `${base}/cat_leftpaw.png`
        ];

        cat = document.createElement('img');
        cat.src = frames[0];

        cat.onerror = () => {
        console.error("❌ FAILED TO LOAD:", cat.src);
        };

        console.log("CAT URI:", cat.src);

        cat.style.width = '100%';
        cat.style.height = 'auto';
        cat.style.position = 'absolute';
        
        document.getElementById('bongo-cat').appendChild(cat);
    }
});

function drum() {
    console.log("loading frame:", frames[frame]);

    if(!cat) return;

    frame = (frame + 1) % frames.length;
    cat.src = frames[frame];
}

window.addEventListener('keydown', drum);

// function startDrum() {
//     cat.classList.add('drum');

//     setTimeout(() => {
//         cat.classList.remove('drum');
//     }, 120);
// }