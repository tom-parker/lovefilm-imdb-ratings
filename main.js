$(function(){
  var containerEl = 'div.fl_detail_info',
      titleEl = 'h2 a',
      yearEl = 'h2 span',
      reg = new RegExp('[SE]{1}[0-9]{2}','i'),
      matches,
      movieTitle,
      movieYear;

  //get all film listing
  matches = $(containerEl);


  matches.each(function(item){
    var that = this;
    
    //grab title and year for film
    movieTitle = $(this).find(titleEl).text();
    movieYear = $(this).find(yearEl).text().substring(1,5);

    //check if listing is for a tv episode rather than a film
    if(!reg.test(movieTitle)){
      //make call to imdb to get film details
      $.ajax({
        url: 'http://www.imdbapi.com/?t='+movieTitle+'&y='+movieYear,
        success: function(obj){
          //render results into page
          var data = $.parseJSON(obj);
          $(that).find('h2').append(' <a style="color:#f0f;" href="http://www.imdb.com/title/'+data.ID+'">'+data.Rating+'</a><span style="font-size:0.8em;"> - '+data.Votes+'</span>');
        }
      });
    }
  });
});
