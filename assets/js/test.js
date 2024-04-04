// add channel
        $('.add-device').on('click', '.add-channel-btn', function () {
            $('.channel-lv').find('.mockup').remove();
            $('.add-channel-mockup').find('#chonch').remove();
            var deviceID = $(this).data('info');
            createSelectInputsForLevels('.channel-lv');
    
            $('.add-channel-mockup').removeClass('hide');
            var channelSavebtn = '<button type="reset" class="btn btn-primary me-1 mb-1 channel-save" data-info="' + deviceID + '">Save</button>';
            $('.channel-btns').append(channelSavebtn);
        });
    
       // addproject
            // ẩn/hiện danh sách kênh
    $('.add-device-main').on('click', '.fa-caret-down', function () {
        var deviceID = $(this).data('info');
        var $table = $(this).parent().parent().find('table');
        if ($table.length > 0) {
            $table.remove();
        } else {
            $(this).parent().parent().append(createchannelTable(deviceID));
        }
        var newTable = $('.device-added-' + deviceID).find('table');

        // Kiểm tra xem bảng mới có hàng nào không
        var tableExist = $('.device-added-' + deviceID).find('table');
        if (tableExist.length > 0) {
            var rowCount = newTable.find('tbody tr').length;
            if (rowCount === 0) {
                tableExist.remove(); // Loại bỏ bảng nếu không có hàng nào
                alert("Thiết bị chưa có kênh nào");
            }
        }
    });

    