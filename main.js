var main = document.getElementById('main');
const sliders = 5;

const slider = (name, activo) => {
    return (
        `<div class="${name}"> 
            <div class="${name + '-bg'}" disabled="${activo}"></div>
            <input type="range" class="${name + '-slider'}"/>
        </div>`);
}

const state = {
    slider: Array(5).fill({
        sliderValie: 0,
        activo: true,
        name: 'slider'
    })
}

console.log('working');



window.onload = function () {
    for (let i = 0; i < state.slider.length; i++) {
        var sld = state.slider[i];
    
        this.main.innerHTML += slider(sld.name, sld.activo);
    }    
}