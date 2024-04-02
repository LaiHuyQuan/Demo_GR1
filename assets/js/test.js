$(document).ready(function() {
    var canvas = $('#yourCanvas')[0];
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0);

        // Số lượng cột và hàng
        var columns = 6;
        var rows = 2;

        // Kích thước của mỗi ô
        var cellWidth = canvas.width / columns;
        var cellHeight = canvas.height / rows;

        // Vẽ lưới
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                var cellNumber = i * columns + j + 1;
                var x = j * cellWidth;
                var y = i * cellHeight;
                ctx.strokeRect(x, y, cellWidth, cellHeight);
                ctx.fillText(cellNumber, x + cellWidth / 2, y + cellHeight / 2);
            }
        }

        // Xử lý sự kiện click
        $('#yourCanvas').click(function(event) {
            var x = event.pageX - $(this).offset().left;
            var y = event.pageY - $(this).offset().top;

            // Tính toán số ô được click
            var columnNumber = Math.floor(x / cellWidth);
            var rowNumber = Math.floor(y / cellHeight);
            var cellNumber = rowNumber * columns + columnNumber + 1;

            // Log ra số ô được click
            console.log('Clicked on cell ' + cellNumber);
        });
    };
    img.src = './assets/img/test.png'; // Đường dẫn đến hình ảnh của bạn
});
