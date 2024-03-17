// //api
// let prjBlock = document.querySelector('.top-cnt-main');

// function getAndShowProjects() {
//     let apiURL = 'https://ems.ioteamvn.com//test/test1?json={"token":"O1L486UPS9MVY7jcihhe4idshRBb0TyD"}';
//     let data = fetch(apiURL).then(res => res.json())
//     console.log(data)
//     fetch(apiURL)
//         .then(res => res.json())
//         .then(dataObject => {
//             let parentCount = Object.keys(dataObject).length;
//             console.log(parentCount);

//             let htmlContent = '';
//             for (const key in dataObject) {
//                 if (dataObject.hasOwnProperty(key)) {
//                     const projectData = dataObject[key];

//                     const onlineCount = projectData.filter(item => item[1] === "Online").length;
//                     const totalCount = projectData.length;

//                     htmlContent += `<div class="prj-view prj-view-js">
//                                         <div class="i-wrapper prj-view-js">
//                                             <i class="fa-solid fa-eye prj-view-js"></i>
//                                         </div>
//                                         <div class="prj-main prj-view-js">
//                                             <span class="prj-cnt prj-view-js">${key}</span>
//                                             <span class="prj-info prj-view-js">On: ${onlineCount}/${totalCount}</span>
//                                         </div>
//                                     </div>`;
//                 }
//             }
//             prjBlock.innerHTML = htmlContent;
//         })
//         .catch(error => {
//             console.error('Lỗi:', error);
//         });
// }
// getAndShowProjects();


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

// //view project
// const test = document.querySelector('.top-cnt-main');
// const projectDis = document.querySelector('.prj-chart-js');
// const projectlist = document.querySelectorAll('.prj-view-js');

// test.addEventListener('click', function (e) {
//     if (e.target && e.target.matches('.prj-view-js')) {
//         if (projectDis.classList.contains('hide')) {
//             projectDis.classList.add('show');
//             projectDis.classList.remove('hide');
//         } else {
//             projectDis.classList.add('hide');
//             projectDis.classList.remove('show');
//         }
//     }
// });
