$( document ).ready(function() {
  var fotos = 'f1 f2 f3 f4 f5',
  				i = 1;

	window.currentUser = !!sessionStorage.getItem("currentUser") || null;
	// window.tokenExpireTime = sessionStorage.getItem("tokenExpireTime") || null;

	if(!window.currentUser && window.location.pathname != "/index.html" /*&& !window.tokenExpireTime*/) {		
		window.location.replace("/index.html");
	} else {
		$('body').show();
	}

	function login(user,pass) {
		console.log(user, pass)
		return new Promise(function(resolve, reject){
			var usuario = arr.some(function(obj){
				return (obj.user == user && obj.pass == pass);
			});
			
			if(usuario) {
				resolve(usuario); //salvar token no currentUser para verificação da seção				
				return;
			}
			reject();
		});
	}

	var validar = function() {
		$("#valid").attr({type: "submit"});				
		$(".admin").removeClass("up").delay( 200 ).show( 100 );
  	$(".cms").removeClass("down").delay( 250 ).show( 100 );

  	login($("#username").val(), $("#password").val())
  	.then(function(){
  		sessionStorage.setItem("currentUser", true);
  		// sessionStorage.setItem("tokenExpireTime", (new Date()).getTime() + 120000);
		window.location.replace("/home.html");				
  	})
  	.catch(function(){
  		console.log('Peça ajuda e traduza.')
  	});
	}

	$("#valid").click(function() {
		if(!!$("#username").val() && !!$("#password").val()){
			$("#valid").attr({type: "button"});
	  	$(".admin").addClass("up").delay( 100 ).fadeOut( 100 );
	  	$(".cms").addClass("down").delay( 150 ).fadeOut( 100 , validar);
  	}
	});

	var arr = [
		{user: "1+1", pass:"3"}
	];

	var mostrarFoto = function(){
		$('.bt').off();
		var foto = 'f'+((i<5) ? i++ : i=1);
		console.log(foto);
		$('#camera .foto').removeClass(fotos).addClass(foto);

	  $(this).addClass('foto-click');
	  $('.foto').addClass('foto-click');
	                                       
	  setTimeout(function(){
	    $('.bt').removeClass('foto-click');
	    $('.foto').removeClass('foto-click');
			$('.bt').on('click', mostrarFoto);	    
	  }, 5000);
	}

	$('.bt').on('click', mostrarFoto);

	$('#example').countdown({
		date: '07/31/2017 17:00:00',
		offset: -3,
		day: 'Dia', days: 'Dias',
		hour: 'Hora', hours: 'Horas',
		minute: 'Minuto', minutes: 'Minutos',
		second: 'Segundos', seconds: 'Segundos'
	}, function () {
		alert('Vai Nascer!');
	});    
});