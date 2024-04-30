
function removePostText(element) {

let textParent = element.querySelectorAll(".css-1rynq56.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-bnwqim");
let quotedTweetText = element.querySelectorAll(".css-1rynq56.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-bnwqim.r-14gqq1x");
let actualTweetPageMainText =element.querySelectorAll(".css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-1inkyih.r-16dba41.r-bnwqim.r-135wba7");

if (textParent.length > 0) {
  textParent[0].remove();
}

if (quotedTweetText.length > 0) {
  // works for both the timeline and the main tweet page if quoted
  quotedTweetText[0].remove();
}

if (actualTweetPageMainText.length > 0) {
  actualTweetPageMainText[0].remove();
}

return

}

function removeAllPostText(){

// retrieve all of the individual tweets and store it in a variable called tweets
  let tweets = document.querySelectorAll("article");

  for (let tweet of tweets) {
    removePostText(tweet);
  }
}

removeAllPostText();

// const observer = new MutationObserver(callbackHere)

// mvp - remove all post text on main page and individual post link

// tweets[1].querySelectorAll("[data-testid=videoComponent]") actually worked in the Console
