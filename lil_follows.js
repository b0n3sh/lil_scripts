// Compares followers and followings in Instagram and yields back the ppl that you're following but they ain't.
// Just paste code in console and gg.

function getElementByXpath(path) {
    return document.evaluate(path, document, null, 9, null).singleNodeValue;
}

async function followers() {
    followers_number = parseInt(getElementByXpath('/html/body/div[1]/section/main/div/header/section/ul/li[2]/a/span').title.replace(/,/g,''),10);
    console.log("Working for " + followers_number + " followers...");
    var followers_tab = getElementByXpath('/html/body/div[1]/section/main/div/header/section/ul/li[2]/a/span');
    followers_tab.click();
    while(!getElementByXpath('/html/body/div[4]/div/div/div[2]')) {
        await new Promise(r => setTimeout(r, 500));
    }
    var x = getElementByXpath('/html/body/div[4]/div/div/div[2]');
    var y = x.getElementsByClassName("FPmhX notranslate  _0imsa ");
    while(followers_number != y.length) {
        await new Promise(r => setTimeout(r, 500));
        x.scrollBy(0,1000);
        console.log("Processing " + y.length + " users...");
        
    }
    for (i=0; i < y.length; i++) {
        array_followers.push(y[i].title);
    }
    var close = getElementByXpath('/html/body/div[4]/div/div/div[1]/div/div[2]/button');
    close.click();
}

async function following(){
    while(!getElementByXpath('html/body/div[1]/section/main/div/header/section/ul/li[3]/a/span')) {
        await new Promise(x => setTimeout(x, 500));
    }
    following_number = parseInt(getElementByXpath('/html/body/div[1]/section/main/div/header/section/ul/li[3]/a/span').textContent.replace(/,/g,''),10);
    console.log("Working for " + following_number + " followings...");
    var following_tab = getElementByXpath('//*[@id="react-root"]/section/main/div/header/section/ul/li[3]/a');
    following_tab.click();
    while(!document.querySelector('body > div.RnEpo.Yx5HN > div > div > div.isgrP')) {
        await new Promise(r => setTimeout(r, 500));
    }
    var x = getElementByXpath('/html/body/div[4]/div/div/div[2]');
    var y = x.getElementsByClassName("FPmhX notranslate  _0imsa ");
    while(following_number > y.length+1) {
        await new Promise(r => setTimeout(r, 500));
        x.scrollBy(0,1000);
        console.log("Processing " + y.length + " users...");
    }
    x.scrollBy(0,1000);
    for (i=0; i<y.length; i++) {
        array_following.push(y[i].title);
    }
}

array_followers = []
array_following = []
bitches = []

async function compare() {
    await followers();
    await following();
    var difference = array_following.filter(x => !array_followers.includes(x));
    alert(difference.join('\n'));
    
}
compare()
