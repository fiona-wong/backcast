var AppView = Backbone.View.extend({

  el: '#app',

  initialize: function() {
    this.videos = new Videos(exampleVideoData);
    this.listenTo(this.videos, 'sync', this.selectFirst);
    this.videos.search('javascript tutorial');

    // this.videoListEntry = new VideoListEntryView({model: this.videos});
    // _.map(this.videos, function(video) {
    //   video = new VideoListEntryView();
    // });
    //this.videoListEntry = new VideoListEntryView({model: this.videos});
    this.render();
  },

  selectFirst: function() {
    if (this.videos.length > 0) {
      this.videos.at(0).select();
    }
  },


  render: function() {
    this.$el.html(this.template());

    new VideoListView({
    	el: this.$('.list'),
    	collection: this.videos
    });//call videolistrender where you can specify the el property to the list class in 

    new VideoPlayerView({
    	el: this.$('.player'),
    	model: this.videos.at(0),//grabs first item of a collection
    	collection: this.videos
    });

    new SearchView({
      el: this.$('.search'),
      collection:this.videos
    });

    return this;
  },

  template: templateURL('src/templates/app.html')

});
