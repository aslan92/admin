!function(n,a,e,i){n(".app-sidebar .nav-parent > .nav").hide(),n(".app-sidebar .nav-parent.open > .nav").show(),n(".app-sidebar .nav-parent > .nav-link").on("click",function(a){a.preventDefault();var e=n(this).parent();if(e.hasClass("open"))e.addClass("animating").find(".nav").slideUp(function(){e.removeClass("open animating").find(".nav-parent.open").removeClass("open")});else{e.addClass("open animating").children(".nav").slideDown(function(){e.removeClass("animating")});var i=e.siblings(".nav-parent.open");i.addClass("animating").find(".nav").slideUp(function(){i.removeClass("open animating").find(".nav-parent.open").removeClass("open")})}})}(jQuery,window,document);
//# sourceMappingURL=app.js.map