"use strict";
var size = null,
	ext = "";


// Funtion to include HTML files
  $(function(){
    var includes = $('[data-include]');
    jQuery.each(includes, function(){
      var file = 'partials/' + $(this).data('include') + '.html';
      $(this).load(file);
    });
  });

// function to check uploading files
	$('input[type=file]').change(function(){ 
		ext = $('#upload').val().split('.').pop().toLowerCase();
		//Allowed file types
		if($.inArray(ext, ['docx', 'doc', 'pdf']) == -1) {
			alert('The file type is invalid!');
			$('#upload').val("");
			$('#upload-file-info').html("");
		}
		
		// sizee = $("#upload")[0].files[0].size; //file size in bytes
		// sizee = sizee / 1024; //file size in Kb
		// sizee = sizee / 1024; //file size in Mb
		 
		// //file size more than 2Mb
		// if (sizee <= 2) {
		// 	alert("Maximum file size is 2Mb");
		// 	return false;
		// }  else {
		// //Ajax code to upload file to server
		// }
	});