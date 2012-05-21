
Popcorn.player( "jplayer", {
  _canPlayType: function( nodeName, url ) {

    return true;
  },
  _setup: function( options ) {

    var media = this;

    var jPlayerInit = function() {

      var myPlayer = $("#" +  media.id);

      myPlayer.jPlayer({
        ready: function (event) {
          $(this).jPlayer("setMedia", {
            m4v: media.src,
            poster: "fight-poster.png"
          }).jPlayer("pause");

          media.dispatchEvent( "loadeddata" );
          $(this).trigger("jPlayerPopcornReady");
        },
        timeupdate: function(event) {
          media.dispatchEvent("timeupdate");
        },
        swfPath: "js",
        supplied: "m4v",
        size: {
          width: "680px",
          height: "383px",
          cssClass: "jp-video-360p"
        },
        autohide: {full: false}
      });

      Popcorn.player.defineProperty( media, "currentTime", {
        set: function( val ) {
          return myPlayer.data('jPlayer').status.currentTime;
        },
        get: function() {
          return myPlayer.data('jPlayer').status.currentTime;
        }
      });
    };
    jPlayerInit();
  },
  _teardown: function( options ) {

    options.destroyed = true;
    $("#" +  this.id).jPlayer("destroy");
  }
});