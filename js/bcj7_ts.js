/**
 * Created by acer-pc on 2017/2/14.
 */


$(function () {

    /*���ú���*/
    getData();

    //var
    /*��ȡ����*/

    function getData() {
        $.ajax({
            type: 'get',
            url: './data/title.json',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var html = template("menuTpl", info)
                //console.log(html);

                $(".nav.nav-tabs").html(html);

                //console.log($('.nav.nav-tabs>li').data('titleid'));
                var html2 = template('tabPanTpl', info);
                //console.log(html2);
                $(".tab-content").html(html2);
                initTab();

                $('.tab-content ul').each(function (i, v) {
                    //var $box = $(".tab-content ul");
                    // console.log(v);
                    var $ul = $(v);
                    var title = $(v).data('titleid');
                    // console.log($box);
                      console.log(title);

                    $.ajax({
                        type: 'get',
                        url: './data/titleid=' + title+'.json',
                        dataType: 'json',
                        success: function (info) {
                            // console.log(info);
                            var html = template("menuTpl1", info)

                            //console.log(html);
                            $ul.html(html);
                            // $(".tab-content ul").html(html);
                        }
                    })
                })
            }
        });
    }

});

function initTab() {
    var parentBox = document.querySelector('.slide');
    var childBox = parentBox.querySelector('ul');
    var parentBoxWidth = parentBox.offsetWidth;
    var childBoxWidth = childBox.offsetWidth;
    //console.log(parentBoxWidth);
    console.log(childBoxWidth);
    var maxX = 0;
    var minX = parentBoxWidth -childBoxWidth;
    //console.log(maxX);
    var distance = 100;
    var maxSwipt = maxX + distance;
    var minSwipt = minX - distance;
    console.log(minSwipt);
//��һ��  1 �ò˵���������
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;

    var currX = 0;//��¼��ǰ��λ

    //���幫�÷���
    /*��ӹ���*/
    var addTransition = function () {
        childBox.style.webkitTransition = "all .2s";
        /*����*/
        childBox.style.transition = "all .2s";
    }
    /*ɾ������*/
    var removeTransition = function () {
        childBox.style.webkitTransition = "none";
        /*����*/
        childBox.style.transition = "none";
    }
    /*���ö�λ*/
    var setTranslateX = function (x) {
        childBox.style.webkitTransform = "translateX(" + x + "px)";
        childBox.style.transform = "translateX(" + x + "px)";
    }

    //���¼�
    childBox.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });
    childBox.addEventListener('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX
        //console.log(distanceX);
        //�������
        removeTransition();
        //���ö�λ
        //�ڶ��� ������һ�������䲻�ܻ���
            console.log(maxSwipt);
        if((currX + distanceX)<maxSwipt && (currX + distanceX)>minSwipt){
            //alert(11);
        setTranslateX(currX + distanceX);
        }
    });
    window.addEventListener('touchend', function (e) {
        if((currX + distanceX)>maxX){
            currX = maxX;
            addTransition();
            setTranslateX(currX);
        }else if((currX + distanceX)<minX){
            currX = minX;
            addTransition();
            setTranslateX(currX);
        }
        else{
            currX = currX + distanceX;
        }

        startX = 0;
        moveX = 0;
        distanceX =0;
        isMove = 0;
    });


}


