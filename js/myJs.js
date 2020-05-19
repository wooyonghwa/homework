$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "https://api.manana.kr/exchange/rate.json",
        data: {},
        success: function (response) {
            console.log(response);
            $('#dollarToKrw').append(response[1]["rate"]);
        },
    });
}) 
function order(){
    let orderman_name = document.getElementById("orderman_name").value;
    let order_list = document.getElementById("order_list").value;
    let order_addr = document.getElementById("order_addr").value;
    let order_phone = document.getElementById("order_phone").value;
    console.log(order_list);
    
    if(orderman_name ==''){
        alert('주문자 이름을 입력해주세요.');
    }else if(order_list == '0'){
        alert('수량을 선택해주세요.');
    }else if(order_addr ==''){
        alert('주소를 입력해주세요.');
    }else if(order_phone == ''){
        alert('전화번호를 입력해주세요');
    }else{
        alert('주문이 완료되었습니다.');
    }
}
function checkAgent(){
    var userAgent=navigator.userAgent.toLowerCase();
    var browser;
    
    if(userAgent.indexOf('iphone')>-1){
        window.location.href="file:///Users/yonghwa/Desktop/sparta/homework/shoppingmall_redirect_iphone.html";
    }else if(userAgent.indexOf('android')>-1){
        window.location.href="file:///Users/yonghwa/Desktop/sparta/homework/shoppingmall_redirect_galaxy.html";
    }else{
        window.location.href="file:///Users/yonghwa/Desktop/sparta/homework/shoppingmall_redirect_etc.html";
    }
    
}