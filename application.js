var Charts = function(){
  this.container = $(".page-container");
};


Charts.prototype.list = function(){ 
  $.getJSON('https://itunes.apple.com/us/rss/toppodcasts/limit=10/json', function(chartData, response){
    $(".page-container").empty();
    $(".header").remove();
    $(".title").remove();
    $(".pod-img").remove();
    $(".byline").remove();


    var listArray = (chartData['feed']['entry']);
    $(".page-title").append('<h1 class="header">Most Popular Podcasts</h1>');
    for (var i = 0; i < listArray.length; i++){
      $(".page-container").append('<li><a class="pod-list" href="'+ i +'">' + (listArray[i]['im:name']['label']) + '</a></li>');
    };
  });
};


Charts.prototype.listOne = function(id){
  $.getJSON('https://itunes.apple.com/us/rss/toppodcasts/limit=10/json', function(chartData, response){
      var listArray = (chartData['feed']['entry'])[id];

      // remove chart content
      $(".header").remove();
      $(".page-container").empty();

      // append podcast title, byline, summary, image, itunes link, back button.
      $(".page-title").append('<h3 class="title">' + listArray['im:name']['label'] + '</h3>');
      $(".page-title").append('<p class="byline">' +'By ' + listArray['im:artist']['label'] + '</p>');
      $(".page-title").append('<p class="summary">' + listArray['summary']['label'] + '</p>');
      $(".page-title").append('<img class="pod-img" src="' + listArray['im:image']['2']['label'] + '">');
      $(".page-container").append('<a class="btn" href="' + listArray['link']['attributes']['href'] + '">iTunes Link</a>');
      $(".page-container").append('<p><a class="btn" href="" class="back">Go Back</a></p>');
  });
};


Charts.prototype.bindListeners = function(){
  this.bindPodcastLinks();
  this.bindBack();
};

Charts.prototype.bindBack = function(){
  var podcastsObject = this;
  $(document).on("click", ".back", function(event){
    event.preventDefault();

    podcastsObject.list();
  });
};


Charts.prototype.bindPodcastLinks = function(){
  var podcastsObject = this;

  $(document).on("click", "a.pod-list", function(event){
    event.preventDefault();

    var podcastId = ($(this).attr("href"));
      podcastsObject.container.empty();
      podcastsObject.listOne(podcastId);     
  });
};


var charts = new Charts;
charts.list();
charts.bindListeners();








