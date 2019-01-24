let id = 'fsdbhgrwh5'

let upload = function(){

    let msg = $('#text').val()
    console.log(msg)
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:3000/getfs",
        data: {
            id: id,
            title : 'main',
            msg: msg
        },
        dataType: "text",
        success: function (data) {
            console.log('success')
            console.log(data)
        },
        error: function (err) {
            console.log('error')
            console.log(err)
        }
    })
}