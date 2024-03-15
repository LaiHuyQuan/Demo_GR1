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
// const chartmnbtn = document.querySelector('.chart-menu-js');
// const chartmenu  =document.querySelector('.chart-menu');

// chartmnbtn.addEventListener('click', function() {
//     chartmenu.classList.add('show');
// })