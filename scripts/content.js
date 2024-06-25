// Start from scratch to have a clean slate


/// for some reason after clicking an individual tweet and going back to the home page it stops working
// need to fix this

function tweetChanger (tweet) {

  tweet.id = "tweet-parent"

}

function monitorTweetDiv (tweetDiv) {

  const elementToObserve = tweetDiv;

  const timelineMutationObserver = new MutationObserver((mutationRecords) => {
  (function observerFunction() {

    try {

      for (let i = 0; i < mutationRecords.length; i++) {
        for (let node of mutationRecords[i].addedNodes) {
          tweetChanger(node);
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

  const elementToObserve = timelineChild1;

  const timelineMutationObserver = new MutationObserver(() => {
  (function observerFunction() {

    try {
      if (timelineChild1.children.length > 0) {

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
    } catch {
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



//   let tweetDiv = primaryColumn.querySelector("section").childNodes[1].childNodes[0]

// if (tweetDiv.children.length > 0) {

//   tweetDiv.id = "tweet-div";

//   console.log(tweetDiv, " this is tweetDiv")
//   console.log("there are tweets, disconnect the observer now")


//     // disconnect to stop the observer from observing once the element is found
//     outerMutationObserver.disconnect();