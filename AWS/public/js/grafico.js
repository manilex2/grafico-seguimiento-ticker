let urln = document.location.pathname;
let regTransform = urln.replace(/\/seg\/grafico\//, '');
const nombreIndice = regTransform;
const ctx = document.querySelector('#chart').getContext('2d');
const image = new Image();
image.src = `/seg/img/logo-invrtir-charts1.svg`;
const plugin = {
    id: 'custom_canvas_background_image',
    beforeDraw: (chart) => {
        if (image.complete) {
        const ctx = chart.ctx;
        const {top, left, width, height} = chart.chartArea;
        const x = left + width / 2 - image.width / 2;
        const y = top + height / 2 - image.height / 2;
        ctx.drawImage(image, x, y);
        } else {
        image.onload = () => chart.draw();
        }
    }
};

function totalChart(ctx, extraerdatos){
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: extraerdatos.map(item => new Intl.DateTimeFormat('ex-EC', {
                month: 'short',
                day: 'numeric'
            }).format(new Date(item.fecha).setDate(new Date(item.fecha).getDate()+1))),
            datasets: [{
                label: 'Precio Real',
                data: extraerdatos.map((item) => {
                    if(item.preop > 0){
                        return item.preop;
                    }
                }),
                borderColor: '#ff944c',
                backgroundColor: '#ff944c',
                radius: 0
                //Agregar Puntos
            }, {
                label: 'Precio Actual', 
                data: extraerdatos.map((item) => {
                    if(item.propost > 0){
                        return item.propost;
                    }
                }),
                borderColor: '#ff944c',
                backgroundColor: '#ff944c',
                borderDash: [2],
                radius: 0
                //Editar Line Style - Agregar Puntos
            }, {
                label: 'P1',
                data: extraerdatos.map((item) => {
                    if(item.p1 > 0){
                        return item.p1;
                    }
                }),
                borderColor: '#1169ee',
                backgroundColor: '#1169ee',
                radius: 0
            }, {
                label: 'P2',
                data: extraerdatos.map((item) => {
                    if(item.p2 > 0){
                        return item.p2;
                    }
                }),
                borderColor: '#4087f2',
                backgroundColor: '#4087f2',
                radius: 0
            }, {
                label: 'P3',
                data: extraerdatos.map((item) => {
                    if(item.p3 > 0){
                        return item.p3;
                    }
                }),
                borderColor: '#70a5f5',
                backgroundColor: '#70a5f5',
                radius: 0
            },{
                label: 'P4',
                data: extraerdatos.map((item) => {
                    if(item.p4 > 0){
                        return item.p4;
                    }
                }),
                borderColor: '#a0c3f8',
                backgroundColor: '#a0c3f8',
                radius: 0
            },{
                label: 'PM',
                data: extraerdatos.map((item) => {
                    if(item.pm > 0){
                        return item.pm;
                    }
                }),
                borderColor: '#00aa00',
                backgroundColor: '#00aa00',
                radius: 0
            }, {
                label: 'PM2',
                data: extraerdatos.map((item) => {
                    if(item.pm2 > 0){
                        return item.pm2;
                    }
                }),
                borderColor: '#00e600',
                backgroundColor: '#00e600',
                radius: 0
            },{
                label: 'SL',
                data: extraerdatos.map((item) => {
                    if(item.sl > 0){
                        return item.sl;
                    }
                }),
                borderColor: '#ff4c4d',
                backgroundColor: '#ff4c4d',
                radius: 0
            }]
        },
        plugins: [plugin],
        options: {
            layout: {
                padding: {
                    left: 0,
                    right: 0
                },
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: function(val, index) {
                            return index % 8 === 0 ? this.getLabelForValue(val) : '';
                        },
                        maxRotation: 0,
                    },
                },
                y: {
                    grid: {
                        display: false
                    },
                },
            },
            elements: {
                line: {
                    borderWidth: 3,
                    fill: false,
                },
                point: {
                    pointStyles: 'line'
                }
            },
            plugins: {
                title: {
                    display: false,
                    text: nombreIndice,
                    font: {
                        size: 15,
                    },
                    color: '#FFF',
                    padding: 30
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        boxWidth: 2,
                        boxHeight: 2,
                        color: '#797b86',
                        font: {
                            family: 'system-ui',
                            size: 7
                        },
                    }
                },
                tooltip: {
                    backgroundColor: '#0584f6',
                    titleFontSize: 20,
                    xPadding: 20,
                    yPadding: 20,
                    bodyFontSize: 15,
                    bodySpacing: 10,
                    mode: 'x'
                },
            }
        },
        
    });
    for (let i = 0; i < extraerdatos.length; i++) {
        var p3Var = extraerdatos[i].p3++;
    }
    for (let i = 0; i < extraerdatos.length; i++) {
        var p4Var = extraerdatos[i].p4++;
    }
    for (let i = 0; i < extraerdatos.length; i++) {
        var pm2Var = extraerdatos[i].pm2++;
    }
    if (p3Var===0 && p4Var===0 && pm2Var===0) {
        chart.data.datasets.splice(4, 2);
        chart.data.datasets.splice(5, 1);
    }else if (p3Var===0 && p4Var===0 && pm2Var!=0){
        chart.data.datasets.splice(4, 2);
    }else if (p3Var===0 && p4Var!=0 && pm2Var===0) {
        chart.data.datasets.splice(4, 1);
        chart.data.datasets.splice(6, 1);
    }else if (p3Var===0 && p4Var!=0 && pm2Var!=0) {
        chart.data.datasets.splice(4, 1);
    }else if (p3Var!=0 && p4Var===0 && pm2Var===0) {
        chart.data.datasets.splice(5, 1);
        chart.data.datasets.splice(6, 1);
    }else if (p3Var!=0 && p4Var===0 && pm2Var!=0) {
        chart.data.datasets.splice(5, 1);
    }else if (p3Var!=0 && p4Var!=0 && pm2Var===0) {
        chart.data.datasets.splice(7, 1);
    }
    chart.update();
    if (chart.legend.legendItems.length >= 0) {
        chart.legend.legendItems.splice(1, 1);
    }
}
async function renderizarCharts() {
    const respuesta = await fetch(`/seg/graficos/grafico/` + nombreIndice).then((res) => {
        return res.json();
    }).then((json) => {
        var extraerDatos = json;
        totalChart(ctx, extraerDatos);
    });
}
renderizarCharts();