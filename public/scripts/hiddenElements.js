/* eslint-disable no-undef */
let scrollButton = () => {
  if ($(window).scrollTop() > 500) {
    $('#upButton').show();
  } else {
    $('#upButton').hide();
  }
};

$(document).ready(function() {
  $('#error-message').hide();
  //hide tweet form and toggle show on click
  $('.new-tweet').hide();
  $('#dropTweet').on('click', () => {
    $('.new-tweet').slideToggle('slow');
  });
  // top of the page button
  //is hidden and counts scroll depth to figures if should display
  $('#upButton').hide();
  $(window).on('scroll', scrollButton);
  $('#upButton').on('click', () => $(window).scrollTop(0, 0));
});