//api
let prjBlock = document.querySelector('.top-cnt-main');

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
                                            <span class="prj-info prj-view-js">Online: ${onlineCount}/${totalCount}</span>
                                        </div>
                                    </div>`;
            }
        }
        prjBlock.innerHTML = htmlContent;
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });


// // create chart
// const ctx = document.getElementById('myChart');
// new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Jan', 'Feb', 'Mar'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3, 6, 1, 33],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

// // chart menu
// const chartmnbtn = document.querySelector('.chart-menu-js');
// const chartmenu = document.querySelector('.chart-menu');

// chartmnbtn.addEventListener('click', function () {
//     if (chartmenu.classList.contains('hide')) {
//         chartmenu.classList.add('show');
//         chartmenu.classList.remove('hide');
//     } else {
//         chartmenu.classList.remove('show');
//         chartmenu.classList.add('hide');
//     }
// })

// view project
const test = document.querySelector('.top-cnt-main');
const projectDis = document.querySelector('.prj-chart-js')
let currentTable = null;

test.addEventListener('click', function (e) {
    if (e.target.matches('.prj-view-js')) {
        const projectData = JSON.parse(e.target.getAttribute('data-project'));
        console.log(projectData);

        let tableHTML = `
            <div class="prj-chart-hd">
                <span>Project Visit</span>
                <i class="fa-solid fa-x"></i>
            </div>
            <table class="project-table" cellpadding="5" cellspacing="0" width="50%" align="left">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (let i = 0; i < projectData.length; i++) {
            const rowData = projectData[i];
            if(rowData[1] ==  'Online'){
                tableHTML += `
                    <tr>
                        <td>${rowData[0]}</td>
                        <td >
                            <span class='online'>${rowData[1]}</span>
                        </td>
                    </tr>
                `;
            }else{
                tableHTML += `
                    <tr>
                        <td>${rowData[0]}</td>
                        <td class='offline'>${rowData[1]}</td>
                    </tr>
                `;
            }
        }

        tableHTML += `
                </tbody>
            </table>
        `;

        projectDis.innerHTML = tableHTML;

        if (currentTable) {
            currentTable.classList.add('hide');
        }
        projectDis.classList.remove('hide');
        projectDis.classList.add('show');
        currentTable = projectDis;
    }
});

projectDis.addEventListener('click', function (e) {
    if(e.target.matches('.fa-x')){
        projectDis.classList.add('hide');
        projectDis.classList.remove('show');
    }
});

