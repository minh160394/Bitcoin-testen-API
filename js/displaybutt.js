
$(function(){
    //GET
    $('#get-button').on('click', function(e){
        e.preventDefault();
        var send= $('#search-address').val();
        const table  = $('.Table');
        table.empty();
        $.ajax({
            url: '/products/' + send,
            method: 'GET',
            success: function(response){    
                table.append("<thead class=thead-dark>\
                <tr>\
                  <th scope=co>ID</th>\
                  <th scope=col>AccountID</th>\
                  <th scope=col>TransHas</th>\
                  <th scope=col>Date</th>\
                  <th scope=col>TransFees</th>\
                </tr>\
                </thead>\
                <tbody>");
                response.forEach(element => {
                   table.append("  <tr> \
                    <th scope= col>"+ element.transID + "</th> \
                    <th scope= col>"+element.accountID.substring(0,25)+ "</th>\
                    <th scope= col>"+element.transhas.substring(0,25)+"</th>\
                    <th scope= col>"+element.date+"</th>\
                    <th scope= col>"+element.transfees+"</th>\
                  </tr>");
                });
            }
        });

    })

})
//n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF