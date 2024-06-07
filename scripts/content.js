// Only show tweets or comments, with images or video and removes text from the remaining tweets.

// ---- HELPER FUNCTIONS -----

// remove texts from tweets
function removePostText(element) {

let textParent = element.querySelector(".css-1rynq56.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-bnwqim");
let quotedTweetText = element.querySelector(".css-1rynq56.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-bnwqim.r-14gqq1x");
let actualTweetPageMainText =element.querySelector(".css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-1inkyih.r-16dba41.r-bnwqim.r-135wba7");

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

function removeAllPostText(theTweets){

// retrieve all of the individual tweets and store it in a variable called tweets

  let tweets = document.body.querySelector('[id^="accessible-list-"]').parentNode.childNodes[1].childNodes[0].children;

  console.log(tweets, " this is tweets")

  for (let tweet of tweets) {
    // ----refactor this to drill down into each tweet directly rather than user querySelectorAll
    const gifsAndVids = tweet.querySelectorAll("[data-testid=videoComponent]")
    const tweetImg = tweet.querySelectorAll("[data-testid=tweetPhoto]")

    console.log(tweet, "this is tweet")
    console.log(gifsAndVids, tweetImg, " these are the both of them")
    if ((gifsAndVids.length === 0) && (tweetImg.length === 0)) {
      tweet.remove();
    } else {
      removePostText(tweet);
    }
  }
}


// ------ OBSERVERS --------


// INNER OBSERVER

// watch for changes to the tweet's parent elements
function runTweetObserver(theTarget) {

const targetNode = theTarget
//document.body.querySelector('[id^="accessible-list-"]').parentNode.childNodes[1].childNodes[0]
console.log(targetNode, " this is target node")

// which mutations to observe
const config = {childList: true};

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // console.log("A child node has been added or removed.");
      removeAllPostText(document.body.querySelector("[data-testid=primaryColumn]").childNodes[0].childNodes[4].childNodes[0].childNodes[0].childNodes[1].childNodes[0].children);
    }
    // } else if (mutation.type === "attributes") {
    //   // console.log(`The ${mutation.attributeName} attribute was modified.`);
    //   removeAllPostText();
    // }
  }
};
// Create an observer instance linked to the callback function
const tweetObserver = new MutationObserver(callback);

// Start observing the target node for configured mutations
tweetObserver.observe(targetNode, config);
}

// OUTER OBSERVER

// check that the required section has been loaded to the DOM before running the tweetObserver

const elementToObserve = document.getElementById("react-root");
const outerObserver = new MutationObserver(() => {
(async function observerFunction() {
    if (document.body.querySelectorAll("[data-testid=primaryColumn]").length > 0) {
      const primaryColumn = document.body.querySelectorAll("[data-testid=primaryColumn]")[0]
      console.log(primaryColumn, " the top thing now in a variable")
      let targetHasKids = await primaryColumn.childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[1].childNodes[0].children
      console.log(targetHasKids, "the target kids")
      if (targetHasKids.length > 0) {
        console.log("we removing")
        console.log(targetHasKids, "the target kids in the IF statement")
        console.log(document.body.querySelector("[data-testid=primaryColumn]").childNodes[0].childNodes[4].childNodes[0].childNodes[0].childNodes[1].childNodes[0], " this is what we're looking for to be loaded")
        let theTweets = document.body.querySelector("[data-testid=primaryColumn]").childNodes[0].childNodes[4].childNodes[0].childNodes[0].childNodes[1].childNodes[0].children
        let theTarget = document.body.querySelector("[data-testid=primaryColumn]").childNodes[0].childNodes[4].childNodes[0].childNodes[0].childNodes[1].childNodes[0]
          removeAllPostText(theTweets)
          runTweetObserver(theTarget);
          // disconnect to stop the observer from observing once the element is found
          outerObserver.disconnect();
      }
        }
  })()

});

outerObserver.observe(elementToObserve, {subtree: true, childList: true});



