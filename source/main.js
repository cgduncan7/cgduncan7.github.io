$(function(){
  var Post = Backbone.Model.extend({
    defaults: function() {
      return {
        title: "home page",
	createdDate: "",
	modifiedDate: "",
	author: "",
	tags: []
      };
    }
  });

  var PostList = Backbone.Collection.extend({
    model: Post,
    localStorage: new Backbone.LocalStorage('cgduncan7-website'),
    comparator: 'order'
  });

  var Posts = new PostList;
});
