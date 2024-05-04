// Only show tweets or comments, with images or video and removes text from the remaining tweets.


// remove texts from tweets
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

  let tweets = document.body.querySelector("section").childNodes[1].childNodes[0].children;

  for (let tweet of tweets) {
    // ----refactor this to drill down into each tweet directly rather than user querySelectorAll
    const gifsAndVids = tweet.querySelectorAll("[data-testid=videoComponent]")
    const tweetImg = tweet.querySelectorAll("[data-testid=tweetPhoto]")
    if ((gifsAndVids.length === 0) && (tweetImg.length === 0)) {
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


// create a mutation observer to watch for changes to the tweet's parent elements
function runTweetObserver() {

const targetNode = document.body.querySelector("section").childNodes[1].childNodes[0]

// which mutations to observe
const config = {attributes: true, childList: true, subtree:false};

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // console.log("A child node has been added or removed.");
      removeAllPostText();
    } else if (mutation.type === "attributes") {
      // console.log(`The ${mutation.attributeName} attribute was modified.`);
      removeAllPostText();
    }
  }
};
// Create an observer instance linked to the callback function
const tweetObserver = new MutationObserver(callback);

// Start observing the target node for configured mutations
tweetObserver.observe(targetNode, config);
}



// check that the required section has been loaded to the DOM before running the tweetObserver
window.addEventListener('load', function () {
  console.log("Window is loaded!")

const elementToObserve = document.querySelector("#react-root");
const lookingFor = 'section';
const outerObserver = new MutationObserver(() => {
    if (document.querySelector(lookingFor)) {
        console.log(`${lookingFor} is ready`);
        removeAllPostText()
        runTweetObserver();
        // disconnect to stop the observer from observing once the element is found
        outerObserver.disconnect();
    }
});

outerObserver.observe(elementToObserve, {attributes: true, attributeFilter:['[data-testid=cellInnerDiv]'], subtree: true, childList: true});
})







