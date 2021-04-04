// Passed though info on posts
// console.log(script_vars);

let w = 0;
let h = 0;
let transforms = [];

let currentArticle = 0;
let background = document.getElementById('bg-img');

let article1 = document.getElementById("article1");
let article2 = document.getElementById("article2");
let article3 = document.getElementById("article3");
let article4 = document.getElementById("article4");

let font_size = 0;

window.addEventListener('resize', initialize);
initialize();

updateBackground();

initializeArticles();

updateArticles();

function plusSlides(dir) {
    currentArticle += dir;
    currentArticle = passOver(currentArticle);

    updateBackground();

    updateArticles();
}

function initialize () {

    w = window.innerWidth;
    h = window.innerHeight;

    font_size = getComputedStyle(document.documentElement).getPropertyValue('--font-3');

    // For each article, x pos | y pos | width | height | z index | font size | overlay color
        // Multiplier for size of slideshow
    let m = 1.3;
    let y = 0.75;

        // Media resizing
    if (w < 1480) {
        m = 1;
    }
    if (w < 1150) {
        m = 0.8;
    }
    if (w < 950) {
        m = 0.5;
    }
    if (h < 900 ) {
        m = 0.5;
    }

    transforms = [
        (w * 0.5) - 200 * m, (h * y) - 100 * m, 400 * m, 250 * m, 1, font_size,
        (w * 0.5) - 475 * m, (h * y) - 0 * m, 200 * m, 125 * m, 0, 0,
        (w * 0.5), (h * y) + 25 * m, 0, 0, -1, 0,
        (w * 0.5) + 275 * m, (h * y) - 0 * m, 200 * m, 125 * m, 0, 0,
    ];

    updateArticles();

    // Update pointers
    document.getElementById("prev").style.left = "calc(50vw - " + (540 * m) + "px)";
    document.getElementById("next").style.right = "calc(50vw - " + ((540 * m) + 17) + "px)";

    document.getElementById("prev").style.top = ((h * y) + 10 * m) + "px";
    document.getElementById("next").style.top = ((h * y) + 10 * m) + "px";

}

function updateArticles() {
    let tempVar = currentArticle;

    updateArticlePosition(article1, tempVar);
    tempVar --;
    tempVar = passOver(tempVar);
    updateArticlePosition(article2, tempVar);
    tempVar --;
    tempVar = passOver(tempVar);
    updateArticlePosition(article3, tempVar);
    tempVar --;
    tempVar = passOver(tempVar);
    updateArticlePosition(article4, tempVar);
}

function updateBackground() {
    let newBackgroundImage = script_vars[currentArticle + 8];
    background.style.backgroundImage = "url(" + newBackgroundImage + ")";
}

function initializeArticles () {
    // article1.querySelector("#label").innerHTML = "" + script_vars[0] + "";
    // article2.querySelector("#label").innerHTML = "" + script_vars[1] + "";
    // article3.querySelector("#label").innerHTML = "" + script_vars[2] + "";
    // article4.querySelector("#label").innerHTML = "" + script_vars[3] + "";

    article1.setAttribute("href", script_vars[4]);
    article2.setAttribute("href", script_vars[5]);
    article3.setAttribute("href", script_vars[6]);
    article4.setAttribute("href", script_vars[7]);

    article1.querySelector("#background").style.backgroundImage = "url(" + script_vars[12] + ")";
    article2.querySelector("#background").style.backgroundImage = "url(" + script_vars[13] + ")";
    article3.querySelector("#background").style.backgroundImage = "url(" + script_vars[14] + ")";
    article4.querySelector("#background").style.backgroundImage = "url(" + script_vars[15] + ")";
}

function updateArticlePosition(article, id) {
    article.style.left   = transforms[6 * id + 0] + "px";
    article.style.top    = transforms[6 * id + 1] + "px";
    article.style.width  = transforms[6 * id + 2] + "px";
    article.style.height = transforms[6 * id + 3] + "px";
    article.style.zIndex = transforms[6 * id + 4];
    article.style.fontSize = transforms[6 * id + 5];

    if (transforms[6 * id + 5] == font_size) {
        article.classList.add("current");
    } else {
        article.classList.remove("current");
    }
}

function passOver (a) {
    if (a < 0) {
        a = 3;
    } else if (a > 3) {
        a = 0;
    }

    return a;
}