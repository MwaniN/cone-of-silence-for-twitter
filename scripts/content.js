
// retrieve all of the individual tweets and store it in a variable called tweets
let tweets = document.querySelectorAll("article");

// doesn't work for quoted tweet

function removePostText(element) {
// classes css-1rynq56 r-8akbws r-krxsd3 r-dnmrzs r-1udh08x r-bcqeeo r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-bnwqim

let textParent = element.querySelectorAll(".css-1rynq56.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-bnwqim")
let quotedTweetText = element.querySelectorAll(".css-1rynq56.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-bnwqim.r-14gqq1x")

// this works on the main page, will need to be different when it's on the individual tweet's page it seems

if (textParent.length > 0) {
  textParent[0].remove();
}

if (quotedTweetText.length > 0) {
  quotedTweetText[0].remove();
}

return

}

// mvp - remove all post text on main page and individual post link
