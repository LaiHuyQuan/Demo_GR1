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
    }else {
        chartmenu.classList.remove('show');
        chartmenu.classList.add('hide');
    }
})

//view project
const projectlist = document.querySelectorAll('.prj-view');
const projectDis = document.querySelector('.prj-chart-js');

for (const projectBtn of projectlist){
    projectBtn.addEventListener('click', function() {
        if (projectDis.classList.contains('hide')){
            projectDis.classList.add('show');
            projectDis.classList.remove('hide');
        }else {
            projectDis.classList.add('hide');
            projectDis.classList.remove('show');
        }
    })
}
