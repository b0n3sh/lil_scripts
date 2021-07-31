// Compares followers and followings in Instagram and yields back the ppl that you're following but they ain't.
// Just paste code in console and gg.

async function followers() {
    followers_number = parseInt(document.querySelectorAll('main > div > header > section > ul > li > a > span')[0].title);
    console.log("Working for " + followers_number + " followers...");
    var followers_tab = document.querySelectorAll('main > div > header > section > ul > li > a')[0];
    followers_tab.click();
    while(document.querySelectorAll('[aria-label=Followers]').length == 0) {
        await new Promise(r => setTimeout(r, 2500));
    }
    x = document.querySelectorAll('[aria-label=Followers] > div > div')[1];
    y = document.querySelectorAll('[aria-label=Followers] li');
    while(followers_number != y.length) {
        await new Promise(r => setTimeout(r, 1500));
        x.scrollBy(0,1000);
        //y = document.querySelectorAll('[aria-label=Followers] li >');
        y = document.querySelectorAll('[aria-label=Followers] li > div > div > div > div > span > a')
        console.log("Processing " + y.length + " users...");
    }
    for (i=0; i < y.length; i++) {
        array_followers.push(y[i].title);
    }
    document.querySelector('[aria-label=Followers] > div > div > div > div > button').click()
}

async function following(){
     while(!document.querySelectorAll('main > div > header > section > ul > li > a > span')[1]) {
        await new Promise(x => setTimeout(x, 500));
    }

    following_number = parseInt(document.querySelectorAll('main > div > header > section > ul > li > a > span')[1].textContent);
    console.log("Working for " + following_number + " followings...");
    document.querySelectorAll('main>div>header li>a')[1].click();
    while(document.querySelectorAll('[aria-label=Following]').length == 0) {
        await new Promise(r => setTimeout(r, 1500));
    }
    x = document.querySelectorAll('[aria-label=Following] > div > div')[2] 
    y = document.querySelectorAll('[aria-label=Following] li > div > div > div > div > a') 
    while(following_number != y.length) {
        await new Promise(r => setTimeout(r, 1500));
        x.scrollBy(0,1000);
        y = document.querySelectorAll('[aria-label=Following] li > div > div > div > div > span > a') 
        console.log("Processing " + y.length + " users...");
    }
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
