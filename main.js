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
            url: 'http://www.deanclatworthy.com/imdb/?q='+movieTitle+'&year='+movieYear,
            success: function(obj){
                //hack response to form proper JSON when rate limited
                var divided = obj.replace('}{','},{');
                var wrapper = '['+divided+']';
                var json = $.parseJSON(wrapper);
                var data;
                //if rate limited error will be first item in array
                if(json.length > 1){
                    data = json[1];
                } else {
                    data = json[0];
                }
                //Check for undefined data
                if('imdbid' in data){
                    $(that).find('h2').append(' <a style="color:#f0f;" href="'+data.imdburl+'">'+data.rating+'</a><span style="font-size:0.8em;"> - '+data.votes+'</span>');
                }
            }
        });
    }
});
});
