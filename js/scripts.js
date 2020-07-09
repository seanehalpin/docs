
const searcher = () => {
  $("body.home").find("#searchBar input").focus();
};

$(document).ready(() => {
  searcher();
});
