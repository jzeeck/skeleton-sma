var lastPostID;
$(document).ready(function() {
  //var number = $("#selectedNumber").html(); //Edit this if you want the selector to work
  //$('#number'+number).attr("selected","selected");
 
  $('.fixedPosition').css('left',$('#sendToGoogleMaps').offset().left +$('#sendToGoogleMaps').width()+ 80);
  $('.fixedPosition').css('top',$('#sendToGoogleMaps').offset().top);
});

function showFullMessage(postID){
    var element = $('#' + 'full' + postID);
    element.removeClass('hidden');
    element.hide();
    element.fadeIn('fast');

    $('#'+'partial' + postID).addClass('selected');

    var tempID1 = parseInt(lastPostID);
    var tempID2 = parseInt(postID);
    if(tempID1!=tempID2){			//Kollar att de två senaste posterna ej samma
        hideInfo(lastPostID)			//Om ej samma, hideInfo - förra			
    }
    lastPostID = postID;

}
function hideInfo(postID) {
    var element=  $('#'+'full' + postID);		//gör till element..
    element.addClass('hidden'); 			//Ska vara hidden
    $('#'+'partial' + postID).removeClass('selected');	//info ej selected
}

function limitPost(){
	$('#resultsForm').attr('action', '../results/limit');
	$('#resultsForm').submit();
}

function staticGraphPost(){
	$('#resultsForm').attr('action', '../results/static');
	$('#resultsForm').submit();
}
function dynamicGraphPost(){
	$('#resultsForm').attr('action', '../results/dynamic');
	$('#resultsForm').submit();
}
function googlePost(){
	$('#resultsForm').attr('action', '../results/map');
	$('#resultsForm').submit();
}
