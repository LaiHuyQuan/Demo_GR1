// //api
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

            for (const key in dataObject) {
                if (dataObject.hasOwnProperty(key)) {
                    const projectData = dataObject[key];
                    const projectDiv = document.createElement("div");
                    projectDiv.classList.add("prj-view");

                    const eyeWrapper = document.createElement("div");
                    eyeWrapper.classList.add("i-wrapper");
                    const eyeIcon = document.createElement("i");
                    eyeIcon.classList.add("fa-solid", "fa-eye");
                    eyeWrapper.appendChild(eyeIcon);
                    projectDiv.appendChild(eyeWrapper);

                    const prjMainDiv = document.createElement("div");
                    prjMainDiv.classList.add("prj-main");
                    const prjNameSpan = document.createElement("span");
                    prjNameSpan.classList.add("prj-cnt");
                    prjNameSpan.textContent = key;

                    const onlineCount = projectData.filter(item => item[1] === "Online").length;
                    const totalCount = projectData.length;

                    const prjInfoSpan = document.createElement("span");
                    prjInfoSpan.classList.add("prj-info");
                    prjInfoSpan.textContent = `On: ${onlineCount}/${totalCount}`;

                    prjMainDiv.appendChild(prjNameSpan);
                    prjMainDiv.appendChild(prjInfoSpan);
                    projectDiv.appendChild(prjMainDiv);

                    prjBlock.appendChild(projectDiv);
                }
            }
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
}
getAndShowProjects();

// create chart
const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Jan', 'Feb', 'Mar'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 6, 1, 33],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// chart menu
const chartmnbtn = document.querySelector('.chart-menu-js');
const chartmenu = document.querySelector('.chart-menu');

chartmnbtn.addEventListener('click', function () {
    if (chartmenu.classList.contains('hide')) {
        chartmenu.classList.add('show');
        chartmenu.classList.remove('hide');
    } else {
        chartmenu.classList.remove('show');
        chartmenu.classList.add('hide');
    }
})

//view project
const test = document.querySelector('.top-cnt-main')
const projectlist = document.querySelectorAll('.prj-view');
const projectDis = document.querySelector('.prj-chart-js');

for (const projectBtn of projectlist) {
    test.addEventListener('click', function (e) {
        if (projectDis.classList.contains('hide')) {
            projectDis.classList.add('show');
            projectDis.classList.remove('hide');
        } else {
            projectDis.classList.add('hide');
            projectDis.classList.remove('show');
        }
    })
}








