
const quoteText = document.querySelector('.quote'),
    autorName = document.querySelector('.autor .name'),
    quoteBtn = document.querySelector('button'),
    soundBtn = document.querySelector('.sound'),
    copyBtn = document.querySelector('.Copy'),
    twitterBtn = document.querySelector('.twitter');


const randomQuote = async () => {

    quoteBtn.classList.add('louding');
    quoteBtn.innerHTML = 'Louding quote...';

    try {

        const response = await fetch('http://api.quotable.io/random');
        const result = await response.json();
        const { content, author } = result

        render(content, author);

    } catch (err) {
        let error = new Error("Estas cosas pasan... o_O");
        console.log(error.message);
    }

};

const render = (content, author) => {

    quoteText.innerHTML = content;
    autorName.innerHTML = author;
    quoteBtn.classList.remove('louding');
    quoteBtn.innerHTML = 'New Quoat';
}

soundBtn.addEventListener('click', () => {

    let uttrance = new SpeechSynthesisUtterance(` ${quoteText.innerHTML} by ${autorName.innerHTML}`,);
    speechSynthesis.speak(uttrance);
});

copyBtn.addEventListener('click', () => navigator.clipboard.writeText(quoteText.innerHTML));

twitterBtn.addEventListener('click', () => {
    let twitterUrl = `https://twitter.com/intnent/tweet?url=${quoteText.innerHTML}`;
    window.open(twitterUrl, '_blank')
});

window.addEventListener('load', randomQuote)
quoteBtn.addEventListener('click', randomQuote);

