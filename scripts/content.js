// Start from scratch to have a clean slate


/// for some reason after clicking an individual tweet and going back to the home page it stops working
// need to fix this

// try adding the logic to detect if it's on the home page somewhere in here, maybe that'll help

// Note: occasionally there are tweet divs that have no tweets in them. A copy is down below

// try using a proxy object and passing in the current URL and when it changes from the one the monitorTweetDiv was fired on, end the observer then
// might help with the unexpected behavior when switching pages

// for things I don't want to show, try adding an inline style to display "none" instead of removing it from the DOM.
// explore benefits of each

// check if the direct tweet has no image or video, and also if there's a qupted tweet that it also has no image or video
// if so then remove that whole tweet from the thing

function tweetChanger (tweet) {

  if (tweet.children[0].childNodes[0] === undefined) {
    // mark the empty tweet divs
    tweet.id = "tweet-parent-NO-KIDS"
    tweet.style.display = "none"
  } else if (tweet.children[0].childNodes[0].getElementsByTagName("article").length === 0) {
    console.log(tweet.children[0].childNodes[0].getElementsByTagName("article"), " HERE'S THE ARTICLE THING")
    if (tweet.children[0].childNodes[0].childNodes[0].getElementsByTagName("a").length === 1) {
      tweet.id = "tweet-parent-SHOW-MORE-REPLIES"
    }
    // there are divs in the timeline for "Show more replies" when the tweet below it is a reply to the tweet above it.
    // need to account for those and have different behavior when they're encountered
    // "Show more replies" contains an href while the regular tweet contains an "article" - "Show more replies" must be just a link then
    // tweets seem to have data-testid="tweet"
  } else {
    tweet.id = "tweet-parent"
    //hide the tweet-text div from every tweet on the home page, whether we end up displayign the tweet or not
    let tweetArticle = tweet.childNodes[0].childNodes[0].childNodes[0]
    tweetArticle.id = "REAL-TWEET"
    tweetArticle.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[1].style.display = "none";
    tweetArticle.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[1].id = "Tweet-Text-Parent"
    if (tweetArticle.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes.length > 3) {
      // swap this with the one below
      let imgOrRepost = tweetArticle.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[2]
      imgOrRepost.id = "Image-Or-Quote-Tweet-Parent"

      if (imgOrRepost.childNodes[0].childNodes.length > 1) {
        // above checks if there's a quoted tweet at index 1, otherwise index 0 is an image
        // then handle the quoted tweet
        let quotedTweet = imgOrRepost.childNodes[0].childNodes[1].childNodes[0]
        quotedTweet.id = "Quoted-Tweet-Parent"
        let quotedTweetText = quotedTweet.childNodes[1].childNodes[0]
        quotedTweetText.id = "Quoted-Tweet-Text"
        quotedTweetText.style.display = "none";

        if (quotedTweet.childNodes.length < 3) {
          // if the quoted tweet doesn't have any images, remove it completely from the timeline
          // next need to add removing the tweet altogether if neither the top level or quoted tweet have images
          // need to test performance again before moving further
          quotedTweet.id = "Quoted-Tweet-Parent-NO-IMAGES"
          quotedTweet.parentElement.style.display = "none"
        }
      }

      if (imgOrRepost.childNodes.length > 1) {
        const otherKindRepost = imgOrRepost.childNodes[1]
        console.log(otherKindRepost, "This is the new quoted tweet type!!!")
        otherKindRepost.id = "Other-Repost-Type"
        console.log(otherKindRepost, "This is the new quoted tweet type after adding the ID!!!")
      }

    } else if (tweetArticle.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes.length === 3) {
      // this accurately covers when there is only text in the tweet and removes it
      tweet.id = "tweet-parent-NO-IMAGES";
      tweet.style.display = "none";
    }
  }

}

function monitorTweetDiv (tweetDiv) {

  const elementToObserve = tweetDiv;

  const timelineMutationObserver = new MutationObserver((mutationRecords) => {
  (function observerFunction() {

    try {

      for (let i = 0; i < mutationRecords.length; i++) {
        for (let node of mutationRecords[i].addedNodes) {
          if (node.id === "") {
            tweetChanger(node);
          }
        }
      }

      console.log(tweetDiv, "these are the tweets")
    } catch (err) {
      console.log("Sumting Wong", err)
    }


    })()

  });

  timelineMutationObserver.observe(elementToObserve, {childList: true});
  }

function findInnerTweetDiv (timelineChild1) {

  console.log("findInnerTweetDiv started!!!!")
  console.log("timelineChild1.children === ", timelineChild1.children)
  console.log("timelineChild1.children.length === ", timelineChild1.children.length)
  console.log("timelineChild1.childNodes === ", timelineChild1.childNodes)
  console.log("timelineChild1.childNodes.length === ", timelineChild1.childNodes.length)

  const elementToObserve = timelineChild1;

  const timelineMutationObserver = new MutationObserver(() => {
  (function observerFunction() {

    try {
      if (timelineChild1.children.length > 0) {
        console.log("Something happened bruh?????")

        let tweetDiv = timelineChild1.childNodes[0]
        tweetDiv.id = "tweet-div"

        console.log("This is the tweetDiv", tweetDiv)

        for (let i = 0; i < tweetDiv.childNodes.length; i++) {
          tweetChanger(tweetDiv.childNodes[i])
        }

        monitorTweetDiv(tweetDiv);

        console.log("Disconnecting the findInnerTweetDiv observer")
        timelineMutationObserver.disconnect();
      }
    } catch (err){

      console.error(err);
    }


    })()

  });

  timelineMutationObserver.observe(elementToObserve, {subtree: false, childList: true});
  }


function findTweetDiv (primaryColumn) {

  const elementToObserve = primaryColumn;

  const innerMutationObserver = new MutationObserver(() => {
  (function observerFunction() {

    try {
      if (primaryColumn.querySelector("section").children.length > 0) {

        let timelineChild1 = primaryColumn.querySelector("section").childNodes[1]
        timelineChild1.id = "timeline-child-1"

        console.log("This is timeline child 1", timelineChild1)

        findInnerTweetDiv(timelineChild1);
        console.log("Disconnecting the findTweetDiv observer")
        innerMutationObserver.disconnect();
      }
    } catch {

    }


    })()

  });

  innerMutationObserver.observe(elementToObserve, {subtree: true, childList: true});
  }


let primaryColumnSet = false;

function pageLoad () {

const elementToObserve = document.getElementById("react-root");

let primaryColumn = ""

const outerMutationObserver = new MutationObserver(() => {
(function observerFunction() {

  try {
    if (document.body.querySelector("[data-testid=primaryColumn]").children.length > 0) {

      primaryColumn = document.body.querySelector("[data-testid=primaryColumn]")
      primaryColumn.id = "primary-column"
      console.log(primaryColumn, " primaryColumn now in a variable")
      primaryColumnSet = true;
      findTweetDiv(primaryColumn);
      console.log("Disconnecting the observer")
      outerMutationObserver.disconnect();
    }
  } catch {

  }


  })()

});

outerMutationObserver.observe(elementToObserve, {subtree: true, childList: true});
}


// pageLoad()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {
    console.log(document.location.href);
    pageLoad()
  }
})


// tweet div with no tweet looks like -

{/* <div class="css-175oi2r" data-testid="cellInnerDiv" style="transform: translateY(12928px); position: absolute; width: 100%;" id="tweet-parent">
    <div class="css-175oi2r r-1adg3ll r-1ny4l3l"></div>
</div> */}

// should accomodate for this