$(document).ready(function() {
    // tạo khối project(prjList)
    function addProject(project, online, total) {
        var htmlString = '<div class="col-6 col-lg-3 col-md-6 prjBtn" data-info="' + project + '" >' +
                            '<div class="card">' +
                                '<div class="card-body px-4 py-4-5">' +
                                    '<div class="row">' +
                                        '<div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">' +
                                            '<div class="stats-icon purple mb-2">' +
                                                '<i class="fa-solid fa-eye fa-xs"></i>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">' +
                                            '<h6 class="text-muted font-semibold">' + project + '</h6>' +
                                            '<h6 class="font-extrabold mb-0">On:' + online + '/' + total + '</h6>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

        $('.prjList').append(htmlString); //thêm khối vào prjList
    }

    // API
    $.ajax({
        url: 'https://ems.ioteamvn.com//test/test1',
        method: 'GET',
        dataType: 'json',
        data: {
            json: '{"token":"O1L486UPS9MVY7jcihhe4idshRBb0TyD"}'
        },
        success: function(data) {
            var result = countOnlineElements(data);
            console.log(result);
            createTable(data);  // tạp bảng dữ liệu
        },
        error: function(xhr, status, error) {
            console.error(status, error);
        }
    });

    // đếm thiết bị trong project || tạo khối
    function countOnlineElements(data) {
        var counts = {};

        $.each(data, function(project, projectData) {
            var onlineCount = 0;
            var totalCount = projectData.length;
            
            // đếm số thiết bị online
            $.each(projectData, function(index, item) {
                if (item[1] === 'Online') {
                    onlineCount++;
                }
            });
            // thông tin project
            counts[project] = {
                online: onlineCount,
                total: totalCount
            };
            addProject(project, onlineCount, totalCount); // tạo khối project
        });
        return counts;
    };
    // tạo bảng theo dõi thiết bị
    function createTable(data) {
        $.each(data, function(parentName, childrenData) {
            var tableNameCSS = convertToValidCSSClass(parentName);
            var tableHTML = '<div class="table-container hide ' + tableNameCSS + ' " >' + 
                                '<h3 class="table-hd ">' + parentName + '</h3>' +
                                '<table class="table table-lg">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>ID</th>' +
                                            '<th>STATUS</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            // kiểm tra trạng thái thiêt bị
            $.each(childrenData, function(index, childData) {
                if(childData[1] == 'Online'){
                    childStatus = '<td>' +'<span class="online">' + childData[1] +'</span>' + '</td>'
                }else{
                    childStatus = '<td>' +'<span style="padding: 10px 15px">' + childData[1] +'</span>' + '</td>'
                }
                tableHTML += '<tr>' +
                                '<td class="text-bold-500">' + childData[0] + '</td>' +
                                childStatus +
                            '</tr>';
            });

            tableHTML += '</tbody></table></div>';
            // tạo bảng
            $('.table-responsive').append(tableHTML);
        });
    }

    // hiển thị bảng theo dõi thiết bị
    $('.prjList').on('click', '.prjBtn', function() {
        // tìm đối tượng
        var tableName = $(this).data('info');
        // console.log(tableName)
        var tableNameCSS = convertToValidCSSClass(tableName);
        // console.log(tableNameCSS)
        var tableContainer = $('.table-container.' + tableNameCSS);

        tableContainer.toggleClass('show'); // đánh dấu đối tượng
        $('.table-container:not(.show)').addClass('hide'); // ẩn bảng 
    
        tableContainer.toggleClass('hide');// hiện đối tượng
        tableContainer.toggleClass('show');// xóa đánh dấu

        
    });
    // chuyển đổi tên dự án --> class
    function convertToValidCSSClass(str) {
        return str.replace(/\W+/g, '-').toLowerCase(); 
    }
    
});
