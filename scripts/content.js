// Start from scratch to have a clean slate

// check if the timeline element is loaded
// add an id to identify that element in the DOM
// use a mutant observer to check any new child divs
// (possibly add a new class to each div that has been cleared already)
// for those divs that have not been cleared - clear the text

const elementToObserve = document.getElementById("react-root");
let primaryColumnSet = false;

const outerMutationObserver = new MutationObserver(() => {
(function observerFunction() {

  if(primaryColumnSet === false) {
    if (document.body.querySelector("[data-testid=primaryColumn]").children){
      if (document.body.querySelector("[data-testid=primaryColumn]").children.length > 0) {

        const primaryColumn = document.body.querySelector("[data-testid=primaryColumn]")
        console.log(primaryColumn, " primaryColumn now in a variable")
        primaryColumnSet = true;

      }
    }

  } else if (primaryColumnSet === true) {
      try {
        // try getelementsbytagname instead of querySelector
        let tweetDiv = primaryColumn.querySelector("section").childNodes[1].childNodes[0]

        if (tweetDiv.children.length > 0) {

          tweetDiv.id = "tweet-div";

          console.log("there are tweets, disconnect the observer now")


            // disconnect to stop the observer from observing once the element is found
            outerMutationObserver.disconnect();
        }

      } catch (error) {

      }
        }
  })()

});

outerMutationObserver.observe(elementToObserve, {subtree: true, childList: true});