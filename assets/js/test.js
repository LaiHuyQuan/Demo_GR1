//api
let prjBlock = document.querySelector('.top-cnt-main');

function getAndShowProjects() {
    let apiURL = 'https://ems.ioteamvn.com//test/test1?json={"token":"O1L486UPS9MVY7jcihhe4idshRBb0TyD"}';
    let data = fetch(apiURL).then(res => res.json())
    console.log(data)
    fetch(apiURL)
        .then(res => res.json())
        .then(dataObject => {
            let parentCount = Object.keys(dataObject).length;
            console.log(parentCount);

            let htmlContent = '';
            for (const key in dataObject) {
                if (dataObject.hasOwnProperty(key)) {
                    const projectData = dataObject[key];

                    const onlineCount = projectData.filter(item => item[1] === "Online").length;
                    const totalCount = projectData.length;

                    htmlContent += `<div class="prj-view prj-view-js" data-project='${JSON.stringify(projectData)}'>
                                        <div class="i-wrapper prj-view-js">
                                            <i class="fa-solid fa-eye prj-view-js"></i>
                                        </div>
                                        <div class="prj-main prj-view-js">
                                            <span class="prj-cnt prj-view-js">${key}</span>
                                            <span class="prj-info prj-view-js">On: ${onlineCount}/${totalCount}</span>
                                        </div>
                                    </div>`;
                }
            }
            prjBlock.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
}
getAndShowProjects();

// view project
// const test = document.querySelector('.top-cnt-main');
const projectDis = document.querySelector('.prj-chart-js');

// test.addEventListener('click', function (e) {
//     if (e.target && e.target.matches('.prj-view-js')) {
//         const projectData = JSON.parse(e.target.getAttribute('data-project'));
//         // Sử dụng dữ liệu projectData ở đây để làm gì đó với nó
//         console.log(projectData);
//         if (projectDis.classList.contains('hide')) {
//             projectDis.classList.add('show');
//             projectDis.classList.remove('hide');
//         } else {
//             projectDis.classList.add('hide');
//             projectDis.classList.remove('show');
//         }
//     }
// });

// view project
const test = document.querySelector('.top-cnt-main');
let currentTable = null; // Lưu trữ tham chiếu đến bảng hiện tại

test.addEventListener('click', function (e) {
    if (e.target && e.target.matches('.prj-view-js')) {

        const projectData = JSON.parse(e.target.getAttribute('data-project'));
        console.log(projectData);

        let tableHTML = `
            <table class="project-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Thêm dữ liệu vào bảng
        for (let i = 0; i < projectData.length; i++) {
            const rowData = projectData[i];
            tableHTML += `
                <tr>
                    <td>${rowData[0]}</td>
                    <td>${rowData[1]}</td>
                </tr>
            `;
        }

        // Đóng bảng
        tableHTML += `
                </tbody>
            </table>
        `;

        // Gán nội dung HTML vào phần tử projectDis
        projectDis.innerHTML = tableHTML;

        // Ẩn bảng hiện tại và hiển thị bảng mới
        if (currentTable) {
            currentTable.classList.add('hide');
        }
        projectDis.classList.remove('hide');
        currentTable = projectDis;
    }
});

// Sự kiện click để ẩn bảng hiện tại khi nhấn vào đối tượng khác
document.addEventListener('click', function (e) {
    if (currentTable && !e.target.matches('.prj-chart-js, .prj-view-js')) {
        currentTable.classList.add('hide');
    }
});



