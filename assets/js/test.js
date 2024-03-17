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

//                     htmlContent += `<div class="prj-view prj-view-js" data-project='${JSON.stringify(projectData)}'>
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

// const projectDis = document.querySelector('.prj-chart-js');

// // view project
// const test = document.querySelector('.top-cnt-main');
// let currentTable = null; 

// test.addEventListener('click', function (e) {
//     if (e.target && e.target.matches('.prj-view-js')) {

//         const projectData = JSON.parse(e.target.getAttribute('data-project'));
//         console.log(projectData);

//         let tableHTML = `
//             <table class="project-table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//         `;

//         for (let i = 0; i < projectData.length; i++) {
//             const rowData = projectData[i];
//             tableHTML += `
//                 <tr>
//                     <td>${rowData[0]}</td>
//                     <td>${rowData[1]}</td>
//                 </tr>
//             `;
//         }

//         tableHTML += `
//                 </tbody>
//             </table>
//         `;

//         projectDis.innerHTML = tableHTML;

//         if (currentTable) {
//             currentTable.classList.add('hide');
//         }
//         projectDis.classList.remove('hide');
//         currentTable = projectDis;
//     }
// });

// document.addEventListener('click', function (e) {
//     if (currentTable && !e.target.matches('.prj-chart-js, .prj-view-js')) {
//         currentTable.classList.add('hide');
//     }
// });



