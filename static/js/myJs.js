$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "https://api.manana.kr/exchange/rate.json",
        data: {},
        success: function (response) {
            $('#dollarToKrw').append(response[1]["rate"]);
        },
    });
    // 주문목록 setting
    orderListing();
}) 
function order(){
    let orderman_name = $("#orderman_name");
    let order_list = $("#order_list");
    let order_addr = $("#order_addr");
    let order_phone = $("#order_phone");
    
    
    if(orderman_name.val() ==''){
        alert('주문자 이름을 입력해주세요.');
        orderman_name.focus();
    }else if(order_list.val() == '0'){
        alert('수량을 선택해주세요.');
        order_list.focus();
    }else if(order_addr.val() ==''){
        alert('주소를 입력해주세요.');
        order_addr.focus();
    }else if(order_phone.val() == ''){
        alert('전화번호를 입력해주세요');
        order_phone.focus();
    }else{
        $.ajax({
            type: "POST",
            url: "/order",
            data: {
                "orderman_name":orderman_name.val(),
                "order_list":order_list.val(),
                "order_addr":order_addr.val(),
                "order_phone":order_phone.val()
            },
            success: function (response) {
                if(response['result']=='success'){
                    alert(response['msg']);
                    window.location.reload();
                }else{
                    alert('주문이 취소되었습니다.');
                }
            },
        });
    }
}
function orderListing(){
    $.ajax({
        type: "GET",
        url: "/orderListing",
        data: {},
        success: function (response) {
            if(response['result']=='success'){
                $.each(response['order_list'],function(index,order_item){
                    let result = make_orderlist(index+1,order_item);
                    $('#order_table').append(result);
                });
            }
        },
    });
}
function make_orderlist(i,list){
    return order_html = `<tr><th scope="row">${i}</th>
    <td>${list.orderman_name}</td>
    <td>${list.order_list}</td>
    <td>${list.order_addr}</td>
    <td>${list.order_phone}</td>
    </tr>`;
}