var main = document.getElementById('main');
const sliders = 5;
var localIP = null;
var ws = null;

var colors = ['#131A40', '#355B8C', '#081826', '#17AEBF', '#30F2F2'];

const slider = (name, activo, svalue, color) => {
    return (
        `<div class="${name}"> 
            <div class="${name + '-bg'}" disabled="${activo}" style="background-color:${color}"></div>
            <input type="range" min="0" max="100" value="50" class="${name + '-slider'}"/>
        </div>`);
}

var state = {
    slider: Array(5).fill({
        sliderValue: 0,
        activo: false,
        name: 'slider'
    })
}

const handleSliderChange = (e, value) => {
    var sliderVal = e.value;
    value = sliderVal;
}

//-------------------------------
//--
//-------------------------------
var slidersRange, slidersBg, slidersContainer = null;


//------------------------
//WebSocket Conn
//------------------------

var connection = function () {

    var ip = prompt("Digita la dirección Ip del computador donde corre Pure Data o la dirección Ip junto al puerto ej: 192.168.1.5 ó 192.165.1.5:9898");
    ip = ip.split(':')

    if (ip.length > 1) {
        console.log('ws://' + ip[0] + ':' + ip[1])
        ws = new WebSocket('ws://' + ip[0] + ':' + ip[1]);
    } else {
        console.log('ws://' + ip[0] + ':9898')
        ws = new WebSocket('ws://' + ip[0] + ':9898');
    }

    ws.onopen = (e) => {
        alert("[open] Connection established");
    };

    ws.onmessage = function (event) {
        // alert(`[message] Data received from server: ${event.data}`);
        var data = event.data.split(' ');
        slidersRange[data[0]].disabled = data[1] == 1 ? false : true;
        slidersBg[data[0]].style.backgroundColor = data[1] == 1 ? colors[data[0]] : 'gray';
    };

    ws.onclose = (e) => {
        connection();
    }
}

window.onload = function () {



    for (let i = 0; i < state.slider.length; i++) {
        var sld = state.slider[i];

        this.main.innerHTML += slider(sld.name, sld.activo, this.parseInt(sld.sliderValue), colors[i]);
    }

    slidersRange = document.querySelectorAll('.slider-slider');
    slidersBg = document.querySelectorAll('.slider-bg');
    slidersContainer = document.querySelectorAll('.slider');

    this.connection();

    for (let i = 0; i < slidersContainer.length; i++) {
        const sliderr = slidersContainer[i];

        sliderr.querySelector('.slider-bg').style.width = 50 + '%';

        sliderr.querySelector('.slider-slider').addEventListener('input', (e) => {
            // console.log(i, e);
            sliderr.querySelector('.slider-bg').style.width = e.target.value + '%';
            if (ws.OPEN) {
                ws.send(i + ' ' + e.target.value);
            }

        });
    }
}