$(document).ready(function() {
    function addProject(project, online, total){
        var htmlString = '<div class="col-6 col-lg-3 col-md-6 prjBtn">' +
                            '<div class="card">' +
                                '<div class="card-body px-4 py-4-5">' +
                                    '<div class="row">' +
                                        '<div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">' +
                                            '<div class="stats-icon purple mb-2">' +
                                                '<i class="fa-solid fa-eye fa-xs"></i>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">' +
                                            '<h6 class="text-muted font-semibold">' + project +'</h6>' +
                                            '<h6 class="font-extrabold mb-0">On:'+ online +'/'+ total+'</h6>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
    
        $('.prjList').append(htmlString);
    }

    $.ajax({
        url: 'https://ems.ioteamvn.com//test/test1',
        method: 'GET',
        dataType: 'json',
        data: {
            json: '{"token":"O1L486UPS9MVY7jcihhe4idshRBb0TyD"}'
        },
        success: function(data) {
            console.log(data); 
            var result = countOnlineElements(data);
            console.log(result);
        },
        error: function(xhr, status, error) {
            // Xử lý lỗi ở đây
            console.error(status, error);
        }
    });

    function countOnlineElements(data) {
        var counts = {};
    
        $.each(data, function(project, projectData) {
            var onlineCount = 0;
            var totalCount = projectData.length;
    
            $.each(projectData, function(index, item) {
                if (item[1] === 'Online') {
                    onlineCount++;
                }
            });
    
            counts[project] = {
                online: onlineCount,
                total: totalCount
            };
            addProject(project, onlineCount, totalCount);
        });
    
        return counts;
    };
    
    $('.prjList').on('click', '.prjBtn', function() {
        alert('Button clicked!');
    });

    function createTableRowHTML(id, status) {
        var htmlString = '<tr>' +
                            '<td class="text-bold-500">' + id + '</td>' +
                            '<td>' + status + '</td>' +
                        '</tr>';
        return htmlString;
    }
    
    var idValue = 'Michael Right';
    var statusValue = '$15/hr';
    var newTableRowHTML = createTableRowHTML(idValue, statusValue);
    
    $('.table tbody').append(newTableRowHTML);
    
});

