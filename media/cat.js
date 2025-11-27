console.log("webview js loaded");

window.addEventListener('message', event => {
    console.log("webview recieved message:", event.data);
    const message = event.data;

    if(message.type === 'catAssets') {
        const base = message.base;

        const cat = document.createElement('img');
        cat.src = `${base}/fullCat.png`;
        console.log("CAT URI:", cat.src);

        cat.style.width = '100%';
        cat.style.height = 'auto';
        cat.style.position = 'absolute';
        
        document.getElementById('bongo-cat').appendChild(cat);
    }
});