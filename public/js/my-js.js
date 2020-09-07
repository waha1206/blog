$(function() {
    $('#mask').on('click', function() {
        $('.box').slideToggle('fast', 'linear')
        hideMask()
    })

    $('.edit_user_data').on('click', function() {
        $('.box').slideToggle('fast', 'linear', function() {
            showMask()
        })
    })

    function showMask() {
        $("#mask").css("height", $(document).height());
        $("#mask").css("width", $(document).width());
        $("#mask").show();
    }
    //隱藏遮罩層
    function hideMask() {
        $("#mask").hide();
    }
})