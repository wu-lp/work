
Baseurl = 'http://sandyz.ink:3000'


function show() {
    document.getElementById("closereminder").style.display = "block";
}
function hide() {
    document.getElementById("closereminder").style.display = "none";
}
function show_hidden() {
    if (document.getElementById("show-content").style.display == "block") {
        document.getElementById("show-content").style.display = "none";
    }
    else
        document.getElementById("show-content").style.display = "block";
}
function show1() {
    document.getElementById("prev1",).style.display = "block";
    document.getElementById("next1").style.display = "block";
}
function hidden1() {
    document.getElementById("prev1",).style.display = "none";
    document.getElementById("next1").style.display = "none";
}
window.onload = function () {
    // 点击小圆点事件
    var lunbotu = document.getElementById('lunbotu');
    var pwidth = lunbotu.offsetWidth;
    var point = document.getElementsByClassName('point');
    for (var i = 0; i < point.length; i++) {
        var a = point[i].children;
        for (var j = 0; j < a.length; j++) {
            var li = point[i].children[j];
            li.setAttribute('index', j);
            li.addEventListener('click', function () {
                for (var n = 0; n < a.length; n++) {
                    a[n].className = '';
                }
                this.className = 'current';
                var index = this.getAttribute('index');
                num = index;
                circle = index;
                var shift = $('.photo');
                // console.log("🚀 ~ file: index.html ~ line 497 ~ shift", shift)
                var sum = pwidth * index;
                console.log(sum);
                shift.animate({ left: -sum + 'px' }, 1000);
            })
        }
    }

    // 获取左右按钮元素
    var next1 = document.getElementById('next1');
    var prev1 = document.getElementById('prev1');
    var num = 0;
    var circle = 0;
    var photo = document.getElementById('photo');
    var addition = photo.children[0].cloneNode(true);
    photo.appendChild(addition);
    // 右键按钮
    next1.addEventListener('click', function () {
        if (num == photo.children.length - 1) {
            photo.style.left = 0;
            num = 0;
        }
        num++;
        $('.photo').animate({ left: -num * pwidth + 'px' }, 2000);
        var point1 = document.getElementById('point');
        circle++;
        if (circle == point1.children.length) {
            circle = 0;
        }
        for (var i = 0; i < point1.children.length; i++) {
            point1.children[i].className = '';
        }
        point1.children[circle].className = 'current';
    })
    // 左侧按钮
    prev1.addEventListener('click', function () {
        if (num == 0) {
            num = photo.children.length - 1;
            photo.style.left = -pwidth * num + 'px';
        }
        num--;
        $('.photo').animate({ left: -num * pwidth + 'px' }, 2000);
        var point1 = document.getElementById('point');
        circle--;
        if (circle < 0) {
            circle = point1.children.length - 1;
        }
        for (var i = 0; i < point1.children.length; i++) {
            point1.children[i].className = '';
        }
        point1.children[circle].className = 'current';
    })
    // 自动播放
    var timer = setInterval(function () {
        next1.click();
    }, 3000);
    // 聚焦清除定时器
    lunbotu.addEventListener('mouseenter', function () {
        clearInterval(timer);
    })
    // 离开重新开始计时
    lunbotu.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            next1.click();
        }, 3000);
    })
    var Search = function () {

        // 点击出现热搜榜
        search.onclick = function () {
            $.ajax({
                type: 'get',
                url: Baseurl + '/search/hot/detail',
                success: function (result) {
                    console.log('热搜榜');
                    console.log(result);
                    var hot = result.data;
                    console.log(hot);
                    var hotlist = '';
                    for (var i = 0; i < hot.length; i++) {
                        var j = i + 1;
                        hotlist += '<li class="items">' +
                            '<span class="order' + i + '">' + j + '</span>' +
                            '<span class="disc">' +
                            '<p>' +
                            '<span class="searchWord">' + hot[i].searchWord + '</span>' +
                            '<span class="hot' + i + '" >' + '<img src=' + hot[i].iconUrl + '>' + '</span>' +
                            '<span class="score">' + hot[i].score + '</span>' +
                            '</p>' +
                            '<p class="content">' + hot[i].content + '</p>' +
                            '</span>' +
                            '</li>'
                    }
                    $('.list-items').html(hotlist);
                    for (var i = 0; i < hot.length; i++) {
                        if (hot[i].iconUrl == null) {
                            $('.hot' + i + '').remove();
                        }

                    }
                }
            })
            document.getElementById('list').style.display = "block";
        }
    }
    Search();
    // 点击页面其他地方隐藏ul
    // document.addEventListener("click", clickHidden);
    // function clickHidden() {
    //         document.getElementById('list').style.display = "none";
    // }
    // 搜索栏输入内容出现相应提示
    search.oninput = function () {
        var key = this.value;
        if (key) {
            document.getElementById('list').style.display = "none";
            $.ajax({
                type: 'get',
                url: Baseurl + '/search/suggest',
                data: {
                    keywords: key
                },
                success: function (result) {
                    console.log('搜索提示');
                    var relative = '搜' + '"' + key + '"' + '相关的结果>'
                    $('.list-title-top').html(relative);
                    // 单曲
                    var songs = result.result.songs;
                    console.log(songs);
                    var s_items1 = '';
                    if (songs != undefined) {
                        $('.list-title1').html('单曲');
                        for (var i = 0; i < songs.length; i++) {
                            s_items1 += '<li class="items sitems">' + songs[i].name + '-' + songs[i].artists[0].name + '</li>'
                        }
                        $('.list-items').html(s_items1);
                    }
                    // else
                    // {$('.list-title1').remove();}
                    // 歌手
                    var artists = result.result.artists;
                    console.log(artists);
                    var s_items2 = '';
                    if (artists != undefined) {
                        $('.list-title2').html('歌手');
                        for (var i = 0; i < artists.length; i++) {
                            s_items2 += '<li class="items">' + artists[i].name + '</li>'
                        }
                        $('.list-items2').html(s_items2);
                    }
                    // else
                    // {$('.list-title2').remove();}
                    // 专辑
                    var albums = result.result.albums;
                    console.log(albums);
                    var s_items3 = '';
                    if (albums != undefined) {
                        $('.list-title3').html('专辑');
                        for (var i = 0; i < albums.length; i++) {
                            s_items3 += '<li class="items">' + albums[i].name + '-' + albums[i].artist.name + '</li>'
                        }
                        $('.list-items3').html(s_items3);
                    }
                    // 歌单
                    var playlists = result.result.playlists;
                    console.log(playlists);
                    var s_items4 = '';
                    if (playlists != undefined) {
                        $('.list-title4').html('歌单');
                        for (var i = 0; i < playlists.length; i++) {
                            s_items4 += '<li class="items">' + playlists[i].name + '</li>'
                        }
                        $('.list-items4').html(s_items4);
                    }
                }
            })
            document.getElementById('rec_search').style.display = "block";
        }
        else {
            Search();
            document.getElementById('rec_search').style.display = "none";
        }
    }
    var login_close = document.getElementById('login_close');
    var login = document.getElementById('login');
    login.onclick = function () {
        // 点击出现登录窗口
        document.getElementById("loginwin").style.display = "block";
        // 获取国家编码列表
        $.ajax({
            type:'get',
            url: Baseurl + '/countries/code/list',
            success:function(result){
                console.log("国家编码");
                console.log(result);
                var code=result.data[0].countryList;
                console.log(code);
                var option='';
                for(var i=0;i<code.length;i++){
                    option+='<option>'+code[i].zh+"&nbsp;+"+code[i].code+'</option>'
                }
            $('.prefix').html(option);
            }
        })
    }
    var login_buttom = document.getElementById('login_buttom');
        // 登录头像、昵称显示
    login_buttom.onclick = function () {
        var telphone = document.getElementById('telphone');
        var phone = telphone.value;
        var pw = document.getElementById('pw');
        var password = pw.value;
        $.ajax({
            type: 'post',
            url: Baseurl + '/login/cellphone?phone=' + phone + '&password=' + password,
            data: {
                phone: phone,
                password: password
            },
            success: function (result) {
                console.log('登录');
                console.log(result);
                var myname = result.profile.nickname;
                console.log(myname);
                $('.my_name').html(myname);
                var myvia = document.getElementById('my_via');
                myvia.setAttribute('src', result.profile.avatarUrl);
                document.getElementById("loginwin").style.display = "none";
            }
        })
    }
    login_close.onclick = function () {
        document.getElementById("loginwin").style.display = "none";
    }
    // 获取轮播图图片
    $.ajax({
        type: 'get',
        url: Baseurl + '/banner?type=1',
        success: function (result) {
            console.log('轮播图');
            var banner = result.banners;
            console.log(banner);
            var banner_img = '';
            for (var i = 0; i < banner.length; i++) {
                banner_img += '<li class="banner">' +
                    '<img src="' + banner[i].pic + '">' +
                    '<span style="background-color :' + banner[i].titleColor + '">' + banner[i].typeTitle + '</span>' +
                    '</li>'
            }
            $('.photo').html(banner_img);

        }
    })
    // 推荐歌单
    $.ajax({
        type: 'get',
        url: Baseurl + '/personalized?limit=10',
        success: function (result) {
            console.log('推荐歌单');
            console.log(result);
            var rec = result.result;
            console.log(rec);
            var recom = '';
            for (var i = 0; i < rec.length; i++) {
                var n = rec[i].playCount;
                var n = parseInt(n / 10000);
                recom += '<span>' +
                    '<img src="' + rec[i].picUrl + '" class="box'+i+'">' +
                    '<span class="up">' + n + '万' + '</span>' +
                    '<p class="p1">' + rec[i].name + '</p>' +
                    '</span>'
            }
            $('.specify1').html(recom);
            var cover_box=document.getElementsByClassName('specify1')[0].children;
            console.log(cover_box);
            for(var i=0;i<cover_box.length;i++){
                cover_box[i].setAttribute('id',rec[i].id);
                cover_box[i].onclick=function(){
                // 点击歌单封面获取id号
                    id=this.id;
                    console.log(id);
                    id='link.html?id='+id;
                // 跳转页面
                    $(".main_content").load('./link.html'); 
                    document.getElementById('prev').style.background="#d93b3b";
                }
            }
        }
    })
    // 点击prev转到上一页
    document.getElementById('prev').onclick=function(){
        window.history.go(-1);
    }
    // 独家放送
    $.ajax({
        type: 'get',
        url: Baseurl + '/personalized/privatecontent',
        success: function (result) {
            console.log('独家放送');
            console.log(result);
            var private = result.result;
            console.log(private);
            var p_rec = '';
            for (var i = 0; i < private.length; i++) {
                p_rec += '<span>' +
                    '<img src="' + private[i].picUrl + '">' +
                    '<p class="p1">' + private[i].name + '</p>' +
                    '</span>'
            }
            $('.specify2').html(p_rec);
        }
    })
    // 最新音乐
    $.ajax({
        type: 'get',
        url: Baseurl + '/personalized/newsong?limit=12',
        success: function (result) {
            console.log('最新音乐');
            console.log(result);
            var newmusic = result.result;
            console.log(newmusic);
            console.log(newmusic[0].song.artists[0].name)
            var new_music1 = '';
            var new_music2 = '';
            var new_music3 = '';
            for (var i = 0; i < newmusic.length; i++) {
                if (i < 4) {
                    new_music1 += '<li>' +
                        '<div>' + 
                        '<img src="' + newmusic[i].picUrl + '">' + 
                        '<img src="bofang1.jpg" class="bofang">'+
                        '</div>' +
                        '<div>' + '<p class="p1">' + newmusic[i].name +
                        '<span class="p2 toremove' + i + '">' + '(' + newmusic[i].song.alias[0] + ')' + '</span>' +
                        '</p>' +
                        '<p class="p1 p2">' + newmusic[i].song.artists[0].name + '</p>' +
                        '</div>' +
                        '</li>'
                }
                if (i > 3 && i < 8) {
                    new_music2 += '<li>' +
                    '<div>' + 
                    '<img src="' + newmusic[i].picUrl + '">' + 
                    '<img src="bofang1.jpg" class="bofang">'+
                    '</div>' +
                        '<div>' + '<p class="p1">' + newmusic[i].name +
                        '<span class="p2 toremove' + i + '">' + '(' + newmusic[i].song.alias[0] + ')' + '</span>' +
                        '</p>' +
                        '<p class="p1 p2">' + newmusic[i].song.artists[0].name + '</p>' +
                        '</div>' +
                        '</li>'
                }
                if (i > 7) {
                    new_music3 += '<li>' +
                    '<div>' + 
                    '<img src="' + newmusic[i].picUrl + '">' + 
                    '<img src="bofang1.jpg" class="bofang">'+
                    '</div>' +
                        '<div>' + '<p class="p1">' + newmusic[i].name +
                        '<span class="p2 toremove' + i + '">' + '(' + newmusic[i].song.alias[0] + ')' + '</span>' +
                        '</p>' +
                        '<p class="p1 p2">' + newmusic[i].song.artists[0].name + '</p>' +
                        '</div>' +
                        '</li>'
                }
            }
            $('.new1').html(new_music1);
            $('.new2').html(new_music2);
            $('.new3').html(new_music3);
            for (var i = 0; i < newmusic.length; i++) {
                if (newmusic[i].song.alias[0] == undefined) {
                    $('.toremove' + i + '').remove();
                }
            }
        }
    })
    // 推荐MV
    $.ajax({
        type: 'get',
        url: Baseurl + '/personalized/mv',
        success: function (result) {
            console.log('推荐MV');
            console.log(result);
            var MVdata = result.result;
            console.log(MVdata);
            var recMV = '';
            for (var i = 0; i < MVdata.length; i++) {
                recMV += '<span>' +
                    '<img src="' + MVdata[i].picUrl + '">' +
                    '<p class="p1">' + MVdata[i].name + '</p>' +
                    '<span class="up">' + MVdata[i].playCount + '</span>' +
                    '<p class="p1 p2">' + MVdata[i].artists[0].name + '</p>' +
                    '</span>'
            }
            $('.specify4').html(recMV);
        }
    })
    // 主播电台
    $.ajax({
        type: 'get',
        url: Baseurl + '/dj/personalize/recommend',
        success: function (result) {
            console.log('主播电台');
            console.log(result);
            var djdata = result.data;
            console.log(djdata);
            var recdj = '';
            for (var i = 0; i < djdata.length; i++) {
                recdj += '<span>' +
                    '<img src="' + djdata[i].picUrl + '">' +
                    '<p class="special">' + djdata[i].name + '</p>' +
                    '<p class="p1">' + djdata[i].rcmdText + '</p>' +
                    '</span>'
            }
            $('.specify5').html(recdj);
        }
    })
    // 听听
    $.ajax({
        type: 'get',
        url: Baseurl + '/dj/hot?limit=5',
        success: function (result) {
            console.log('听听');
            console.log(result);
            var listendata = result.djRadios;
            console.log(listendata);
            var listen = '';
            for (var i = 0; i < listendata.length; i++) {
                listen += '<span>' + '<img src="' + listendata[i].picUrl + '">' +
                    '<span class="title">' + listendata[i].category + '</span>' +
                    '<p class="p1">' + listendata[i].copywriter + '</p>' +
                    '<p class="via p2">' + '<img src="' + listendata[i].dj.avatarUrl + '">' + listendata[i].name + '</p>' +
                    '</span>'
            }
            $('.specify6').html(listen);
        }
    })
    // 看看
    $.ajax({
        type: 'get',
        url: Baseurl + '/dj/toplist/newcomer?limit=5',
        success: function (result) {
            console.log('看看');
            console.log(result);
            var lookdata = result.data.list;
            console.log(lookdata);
            var look = '';
            for (var i = 0; i < lookdata.length; i++) {
                look += '<span>' + '<img src="' + lookdata[i].avatarUrl + '">' +
                    '<p class="via p2">' + '<img src="' + lookdata[i].avatarUrl + '">' + lookdata[i].nickName + '</p>' +
                    '<p class="p1">' + lookdata[i].nickName + '</p>' +
                    '</span>'
            }
            $('.specify7').html(look);
        }
    })
}