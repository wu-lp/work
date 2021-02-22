Baseurl = 'http://localhost:3000'



window.onload=function(){
    var show=document.getElementById('show');
    var hiddentext=document.getElementById('hiddentext');
    show.onclick=function(){
        if(hiddentext.style.display=="none"){
            hiddentext.style.display="block";
            $('.change').html("收起");
        }
        else{
            hiddentext.style.display="none";
            $('.change').html("展开");
        }
    }
    var id=id;
    console.log(id);
    $.ajax({
        type:'get',
        url:Baseurl+'/playlist/detail?id='+id,
        data:{
            id:id
        },
        success:function(result){
            console.log(result);
        }
    })
}