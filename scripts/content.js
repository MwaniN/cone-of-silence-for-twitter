
// retrieve all of the individual tweets and store it in a variable called tweets
let tweets = document.querySelectorAll("article");

function removePostText(element) {
// classes css-1rynq56 r-8akbws r-krxsd3 r-dnmrzs r-1udh08x r-bcqeeo r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-bnwqim

let textParent = element.querySelectorAll(".css-1rynq56.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-bnwqim")

function recursion(input) {
// be more specific and check for the class names or something to specify
// those spans where text, hashtags, and links exist.
// otherwise it looks like it's bonking the whole tweet

  if (input.innerText) {
    if (input.innerText.length > 0) {
      input.innerText = '';
    }
  }

  if (input.hasChildNodes()) {
    let currChildren = input.childNodes;
    for (let child of currChildren) {
      recursion(child);
    }
  }


}

recursion(element);

}