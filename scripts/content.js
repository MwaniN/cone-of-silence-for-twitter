// Start from scratch to have a clean slate

// check if the timeline element is loaded
// add an id to identify that element in the DOM
// use a mutant observer to check any new child divs
// (possibly add a new class to each div that has been cleared already)
// for those divs that have not been cleared - clear the text

// make observer for primary column, then make another observer on that and add a proper ID to it



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