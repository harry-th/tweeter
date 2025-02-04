/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escapee = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

let createTweetElement = function(tweetObj) {
  const tweet = $(`<article>
<header>
    <div><img src=${escapee(tweetObj.user.avatars)}/> ${escapee(tweetObj.user.name)}</div>
    <p>
    ${escapee(tweetObj.content.text)}
    </p>
</header>
<hr />
<footer>
    <time>${escapee(timeago.format(tweetObj.created_at))}</time>
    <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-regular fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
    </span>
</footer>
</article>`);
  return tweet;
};

let renderTweets = function(allTweets) {
  for (let tweet of allTweets) {
    let renTweet = createTweetElement(tweet);
    $('.tweet-container').prepend(renTweet);
  }
};

$(document).ready(function() {
  //tweet submission, get and post and input handling
  $('#tweetForm').on('submit', function(e) {
    e.preventDefault();
    let info = $(this).serialize();
    //check tweet length hides/show error messages
    let string = info.split('=')[1];
    string = (decodeURIComponent(string));
    if (string.length > 140 || string.length === 0) {
      $('#tweetForm').hide();
      $('#error-message').slideDown('medium');
      setTimeout(() => {
        $('#tweetForm').fadeIn();
        $('#error-message').hide();
      }, 4000);
    } else {
      //adds the new tweet then retrives the collection of tweets and animates the addition
      $.post('/tweets', info).then(() => {
        $.get('/tweets', (data) => {
          $('.tweet-container').empty();
          renderTweets(data);
        }).then(() => {
          //animation new tweet
          $('article:first-child').css('top', '-205px').css('opacity', '0').animate({
            top: '+=10px',
            opacity: '+=1'
          }, 700, 'linear');
          $('article').css('top', '-195px').animate({
            top: '+=195px',
          }, 1400, 'linear');
        });
      }).then(() => {
        //clear tweet input field
        setTimeout(() => {
          $('#tweet-text').val('').trigger('input');
        }, 1000);
        
      });
    }
  });
  //initial get for tweet
  $.get('/tweets', (data) => {
    renderTweets(data);
  });

});
