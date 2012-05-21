// PLUGIN: Superpanelator
// 2011-03-31 @maboa changed id='big' and id='mid' to classes as ids must be unique and these repeat      
// 2011-05-18 @maboa removing the css insertion as we don't need this, also changing asdf as a unique identifier for divs to something more useful/configurable
 
var utility = {
  getMins: function(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    //var hours = Math.floor(time / 3600);
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
  },

  getTweet: function(options) {

    var myWindow = window;

    if (parent) {
      myWindow = parent.window;
    }

    var shareText = "";

    if (!!options.text) {
      shareText = options.text;
    }

    if (!!options.quote) {
      shareText = options.quote;
    }

    shareText = escape('"'+shareText.substr(0,80)+'..."');

    return("https://twitter.com/share?text="+shareText+" "+options.shareUrl+'?s='+options.start+" "+options.shareHash);

  }
};

(function (Popcorn) {

  var i = 0; 
  var divIdPrefix = "pc-timeline-item";
  var fsDivIdPrefix = "fs-timeline-item";
   
   /* var head = document.getElementsByTagName("head")[0];
    var css = document.createElement('link');
    css.type = "text/css";
    css.rel = "stylesheet";
    css.href =  "asdf.css";
    head.insertBefore( css, head.firstChild );  */

  Popcorn.plugin( "superpanelator" , function( options ) {
    // create a new div and append it to the parent div so nothing
    // that already exists in the parent div gets overwritten

    var newdiv = document.createElement( "div" );
    newdiv.style.display = "none";
    newdiv.id = divIdPrefix+i; 
    var newfsdiv = document.createElement( "div" );
    newfsdiv.style.display = "none";
    newfsdiv.id = fsDivIdPrefix+i; 
    //newfsdiv.className = "fs-info";
    newfsdiv.className = "hideme fs-info";

    var attr = document.createAttribute('start');
    attr.value = options.start;
    newfsdiv.setAttributeNode(attr);

    var attr = document.createAttribute('data-index');
    attr.value = i;
    newdiv.setAttributeNode(attr);

    //console.log(options);


    if ( document.getElementById( options.target ) ) {
      document.getElementById( options.target ).appendChild( newdiv );

      //document.getElementById( options.fstarget ).appendChild( newfsdiv );  
      // if this isnt the first div added to the target div
      if( i ){
        // insert the current div before the previous div inserted
        document.getElementById( options.target ).insertBefore( newdiv, document.getElementById( divIdPrefix + ( i - 1 ) ) );      
      }

      document.getElementById( options.fstarget ).appendChild( newfsdiv ); 


    }

    i++;
          
	//newdiv.innerHTML = "<p><span class='big'>" + options.title + "</span> - <a href='" + options.link_href + "' target='_blank'>" + options.link_text + "</a><br /><span class='mid'>" + options.text + "</span></p><br />";

  var divMarkup = '<div class="info-item fadeable">';
  var pMarkup = '';

  //console.dir(options);

  if (!!options.img) {
    divMarkup += '<img class="info-image" src="'+options.img+'" />';
  }

  if (!!options.quote) {
    divMarkup += '<p class="info-quote">&ldquo;'+options.quote+'&rdquo;</p>';
  }

  if (!!options.quoter) {
    divMarkup += '<p class="info-quoter">'+options.quoter+'</p>';
  }

  if (!!options.start == 0) {
    if (options.text) {
        divMarkup += '<p class="info-text info-intro">'+options.text+'</p>';
    }
  } else {

    if (!!options.text) {
      divMarkup += '<p class="info-text">'+options.text+'</p>';
    }
  }

  //divMarkup += '<p class="info-controls" style="height:32px"><div class="info-nav"><a class="clean-gray jump-btn" href="'+options.start+'"><img class="button-img" src="images/vcamera_small.png" /> jump to video</a></div><div class="info-social"></div></p></div>';

  //console.log(divMarkup);

  newfsdiv.innerHTML = divMarkup;


  //divMarkup += '<div id="tweet-like"><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></'+'script><a data-url="" data-text="test" href="http://twitter.com/share?url=x" class="twitter-share-button">Tweet</a></div>';


  
  //http%3A%2F%2Flocalhost%2Faj%2Fhypervideo%2Fv14%2Fpcframe.htm

  divMarkup += '</div></div>';

/*
  divMarkup += '<p style="height:32px;width380px"></p>'; // temp

  divMarkup += '<div class="info-nav">';
  divMarkup += '<a class="clean-gray jump-btn" href="'+options.start+'"><img class="button-img" src="images/vcamera_small.png" /> jump to video</a>';
  divMarkup += '</div></div>';*/

  newdiv.innerHTML = divMarkup;
  
  
    
    return {
      /**
       * @member webpage
       * The start function will be executed when the currentTime
       * of the video reaches the start time provided by the
       * options variable
       */
      start: function( event, options ){

        //console.log('start');

        //newdiv.setAttribute( "style", "display:block" );

        // check to see if the user is on the previous panel
        // otherwise don't fade

        

        newdiv.className = "fademe";
        //newdiv.firstChild.setAttribute("style", "opacity:0");   
        //newdiv.firstChild.setAttribute("style", "opacity:1");
        //newDiv.classList.add("show");    
        var divstohide = document.getElementsByClassName('hideme');

        for (var i=0;i<divstohide.length;i++) {
            divstohide[i].setAttribute( "style", "display:none" ); 
        }

        var time = options.start;

        newfsdiv.setAttribute( "style", "display:block" );  
        document.getElementById( options.btntarget ).innerHTML = utility.getMins( time );    
        document.getElementById( options.btnhref ).href = time;

        document.getElementById( options.tweethref ).href = utility.getTweet( options );

        document.getElementsByClassName( options.panelnum )[0].innerHTML = (parseInt(options.index)+1);

        /*var shareText = "";

        if (!!options.text) {
          shareText = options.text;
        }

        if (!!options.quote) {
          shareText = options.quote;
        }

        shareText = escape('"'+shareText.substr(0,80)+'..."');
  
        var shareUrl =  escape(myWindow.location.origin + myWindow.location.pathname+'?s='+options.start);
        var shareHash = escape("#amazonia");

        


        divMarkup += '<a class="twitter-blue" href="https://twitter.com/share?text='+shareText+' '+shareUrl+' '+shareHash+'" target="_blank"><img class="button-img" src="images/twitter.png" />Tweet</a>';*/

      },
      /**
       * @member webpage
       * The end function will be executed when the currentTime
       * of the video reaches the end time provided by the
       * options variable
       */
      end: function(event, options){
        newdiv.setAttribute( "style", "display:none" );
      }
    };
  },
  {
    about: {
      name: "Popcorn Timeline Plugin",
      version: "0.1.1",
      author: "David Seifried, Mark Boas (@maboa)",
      website: "dseifried.wordpress.com"
    },
    options: {
      start          : { elem:"input", type:"text", label:"In" },
      end            : { elem:"input", type:"text", label:"Out" },
      target         : "feed-container",
      text           : { elem:"input", type:"text", label:"text" }
    }
  });  
})( Popcorn );


