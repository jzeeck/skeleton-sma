var lastPostID;
$(document).ready(function() {
  var number = $("#selectedNumber").html();
  $('#number'+number).attr("selected","selected");
 
  $('.fixedPosition').css('left',$('#tweetFilter').offset().left-9);
  $('.fixedPosition').css('top',$('#table').offset().top);
});

function showInfo(postID) {
    var element=  $('#'+'details' + postID);
    element.removeClass('hidden');
    element.hide();
    element.fadeIn('fast');

    $('#'+'shortInfo' + postID).addClass('selected');

    var tempID1 = parseInt(lastPostID);
    var tempID2 = parseInt(postID);
    if(tempID1!=tempID2){
        hideInfo(lastPostID)
	$('#tagInput'+postID).css('background-color','#FFFFFF');
    }
    lastPostID = postID;
}
function hideInfo(postID) {
    var element=  $('#'+'details' + postID);
    element.addClass('hidden');
    $('#'+'shortInfo' + postID).removeClass('selected');
}
function clickTag(postID,index){
    var element=$('#postTags'+postID);
    if(element.children("#tagItemIndex"+index).hasClass('selected')){
        element.children("#tagItemIndex"+index).removeClass('selected');
    }
    else{
        element.children("#tagItemIndex"+index).addClass('selected');
    }
    //element.children("#tagItemIndex"+index).css('color','#FF0000').fadeOut('slow',function () 
//{element.children("#tagItemIndex"+index).remove();});
}
function addTag(postID){
    var element=$('#postTags'+postID);

    var tag = $('#tagInput'+postID).val();

    $('#tagInput'+postID).val('');
    if(tag.trim()!=''){
    $('#tagInput'+postID).css('background-color','#FFFFFF');
    var count = $('ul#postTags'+postID+' li').length;

    

    tags = tag.split(' ');
    for(i = 0;i<tags.length;i++){
        if(tags[i] != ''){
            if(i==0){
                tag = tags[i];
            }
            else{
            tag = tag + "-" + tags[i];
            }
        }
    }

    element.append('<li id ="tagItemIndex'+count+'" onClick="clickTag('+postID+','+count+')" class="tagItem selected">'+tag+ '</li>');



    $('#tagItemIndex'+count).hide().fadeIn('slow');
    
    setTimeout(function() {
             $('#tagItemIndex'+count).stop().animate({'color': '#444'}, 1000).css('color', '#444');}, 1500);
    }
    else{
    $('#tagInput'+postID).css('background-color','#FFC0C0');
    }
}
function discard(postID){
    $.post('/tagging/discard/'+postID);
    $('#'+'details' + postID).css('background-color','#FFC0C0').fadeOut('slow',function(){$('#'+'details' + postID).remove()});

    $('#'+'shortInfo' + postID).removeClass('selected').css('background-color','#FFC0C0').slideUp('slow',function () 
{$('#'+'shortInfo' + postID).remove();updateList();});
    
}

function commit(postID) {
    var ul=$('ul#postTags'+postID);
    var numberOfTags = $('ul#postTags'+postID+' li').length;
    var tagsString = '';

    var first = true;
    for (var i =0;i<=numberOfTags;i=i+1){
        if($('ul#postTags'+postID+' li:nth-child('+i+')').hasClass('selected')){
            if(first){
            tagsString = tagsString+$('ul#postTags'+postID+' li:nth-child('+i+')').text();
            first = false;
            }
            else{
            tagsString = tagsString+','+$('ul#postTags'+postID+' li:nth-child('+i+')').text();
            }
        }

    }
    $.post('/tagging/commit/'+postID, {tags:tagsString});

    $('#'+'details' + postID).css('background-color','#99CC99').fadeOut('slow',function(){$('#'+'details' + postID).remove();});
    $('#'+'shortInfo' + postID).removeClass('selected').css('background-color','#99CC99').slideUp('slow',function () 
{$('#'+'shortInfo' + postID).remove();updateList();});
}
function updateList(){
    //$('tr.messageItem:nth-child(even)').css('background','#F0F0F0');
    //$('tr.messageItem:nth-child(odd)').css('background','#FFFFFF');
}
