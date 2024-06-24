// Start from scratch to have a clean slate

// check if the timeline element is loaded
// add an id to identify that element in the DOM
// use a mutant observer to check any new child divs
// (possibly add a new class to each div that has been cleared already)
// for those divs that have not been cleared - clear the text

// make observer for primary column, then make another observer on that and add a proper ID to it

// when looping through each tweet, assign it an id with an increasing value. Only run the subsequent things if the tweet does not have an ID present / one that's
// in the list of already used IDs

function monitorTweetDiv (tweetDiv) {

  const elementToObserve = tweetDiv;

  const timelineMutationObserver = new MutationObserver(() => {
  (function observerFunction() {

    try {
      if (tweetDiv.children.length > 0) {

        for (let i = 0; i < tweetDiv.childNodes.length; i++) {
          if (tweetDiv.childNodes[i].id === "") {
            tweetDiv.childNodes[i].id = "tweet-parent"
            // console.log("For loop be running! and ID was not empty string!")
          }
        }
        console.log(tweetDiv.children, "INSIDE THE THING!!!")

        // console.log("Disconnecting the findInnerTweetDiv observer")
        // timelineMutationObserver.disconnect();
      }
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