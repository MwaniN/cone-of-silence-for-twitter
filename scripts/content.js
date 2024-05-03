// Only shows tweets or comments, with images or video and removes text from the remaining tweets.
// works on the timeline now

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
  // tried using "[data-testid=cellInnerDiv]" - performance seemed improved yet there was an error when scrolling - can explore more later
  // can also use "[data-testid=tweet]"

  let tweets = document.body.querySelectorAll("article");

  for (let tweet of tweets) {
    console.log(tweet, " is tweet")
    const gifsAndVids = tweet.querySelectorAll("[data-testid=videoComponent]")
    const tweetImg = tweet.querySelectorAll("[data-testid=tweetPhoto]")
    console.log(tweetImg, "this is tweetImg")
    if (gifsAndVids.length === 0 && tweetImg.length === 0) {
      tweet.remove();
    } else {
      removePostText(tweet);
    }
  }
}

// document.addEventListener("DOMContentLoaded", (event) => {
//   console.log("DOM fully loaded and parsed");
//   removeAllPostText();
// });

function runInnerObserver() {

const targetNode = document.querySelector(".css-175oi2r.r-1jgb5lz.r-13qz1uu.r-1ye8kvj");

// Options for the inner observer (which mutations to observe)
const config = { attributes: true, attributeFilter:['[data-testid=tweet]'], childList: true, subtree: true };
// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // console.log("A child node has been added or removed.");
      removeAllPostText();
    } else if (mutation.type === "attributes") {
      // console.log("The " + mutation.attributeName + " attribute was modified.");
      //removeAllPostText();
    }
  }
};
// Create an observer instance linked to the callback function
const innerObserver = new MutationObserver(callback);

// Start observing the target node for configured mutations
innerObserver.observe(targetNode, config);
}




window.addEventListener('load', function () {
  console.log("It's loaded!")

const elementToObserve = document.querySelector("#react-root");
console.log("this is the element to observe - ", elementToObserve);
const lookingFor = '.css-175oi2r.r-1jgb5lz.r-13qz1uu.r-1ye8kvj';
const outerObserver = new MutationObserver(() => {
    if (document.querySelector(lookingFor)) {
        console.log(`${lookingFor} is ready`);
        runInnerObserver();
        outerObserver.disconnect();
    }
});

outerObserver.observe(elementToObserve, {attributes: true, attributeFilter:['[data-testid=cellInnerDiv]'], subtree: true, childList: true});
})







