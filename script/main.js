/**************trabajoFinalBarrionueboDamian**************/

// Objetos
class entidad {
    constructor(name, hP, storage){
        this.name = name;
        this.hP = hP;
        this.storage = storage;
      
    }
    accionHero=(atacante, daño, skill)=>{
        //guarda la info del storage en una variable, resta el daño, vacio el cache para poder resubir la nueva info
        let hp = localStorage.getItem(objetivoPosition);
        hp -= daño;
        localStorage.removeItem(objetivoPosition);
        localStorage.setItem(objetivoPosition,hp);
        console.log(`${atacante.name} hace ${daño} de daño a ${objetivoName}`);
        skill;
        //ocultar habilidades
        $('#skillCruzado').hide();
        $('#skillBarbara').hide();
        $('#skillArbalestera').hide();
        switch (position){
            case 1:
                showContent('barbara', barbara, 'hpHero2', 2);  //mostrar heroe 2
                $('#skillBarbara').show();                      //mostrar habilidades
                break;
            case 2:
                showContent('arbalestera', arbalestera, 'hpHero3', 3);  //mostrar heroe 3
                $('#skillArbalestera').show();                          //mostrar habilidades
                break;
            default:
                ocultar();            //ocultar info de heroes
                showButton();         //mostrar boton para finalizar ronda
                break;
        }
    }
    accionEnemy=(atacante, objetivo, daño)=>{
        let hp = localStorage.getItem(objetivo.storage);
        hp -= daño;
        localStorage.removeItem(objetivo.storage);
        localStorage.setItem(objetivo.storage,hp);
        console.log(`${atacante.name} hace ${daño} de daño a ${objetivo.name}`);
        heroDefend(objetivo);
        skillEnemy(atacante);
    }
}
//ejemplo = heraldo.accionDeCombate(heraldo,4);

//heroes
const heraldo = new entidad("Heraldo",24);
const cruzado = new entidad("Cruzado",24,'hpHero1')
const barbara = new entidad("Barbara",20, 'hpHero2');
const arbalestera = new entidad("Arbalestera",18, 'hpHero3');
//enemigos
const esqueletoEscudero = new entidad("Esqueleto escudero",24);
const esqueletoGuerrero = new entidad("Esqueleto guerrero",20);
const esqueletoArbalestero = new entidad("Esqueleto Arballestero",18);
//------------------------------------------------------//
// Variables
let heroe = false;
let ronda = 0;
let rondaIncial = 0;
let img = new Image();

//variables de objetivo enemigo
let objetivoName = "";
let objetivoPosition = "";
let heroPosition = "";
let heroName = "";
let defendName = "";

//medidor de turnos de heroes
let position = 1;

//variables de localStorage
let hpHero1 = "";
let hpHero2 = "";
let hpHero3 = "";
let hpEnemy1 = "";
let hpEnemy2 = "";
let hpEnemy3 = "";

//------------------------------------------------------//
//Local Storage
const definirHP=(hpHero1,hpHero2,hpHero3,hpEnemy1,hpEnemy2,hpEnemy3)=>{
    localStorage.setItem('hpHero1',hpHero1);
    localStorage.setItem('hpHero2',hpHero2);
    localStorage.setItem('hpHero3',hpHero3);
    localStorage.setItem('hpEnemy1',hpEnemy1);
    localStorage.setItem('hpEnemy2',hpEnemy2);
    localStorage.setItem('hpEnemy3',hpEnemy3);
};
definirHP(heraldo.hP,barbara.hP,arbalestera.hP,esqueletoEscudero.hP,esqueletoGuerrero.hP,esqueletoArbalestero.hP);

//------------------------------------------------------//
//DADOS
function dado (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
//------------------------------------------------------//
//Objetivo
const objetive = (roll)=>{
    if (0 === roll){
        return cruzado;
    }else if (1 === roll){
        return barbara;
    }else {
        return arbalestera;
    }
}
//-------------------------------------------------------//
//still alive
const stillAlive=(vida)=>{
    return (localStorage.getItem(objetivoPosition)>0);
}
/*
const stillAlive=(vida)=>{
    return (localStorage.getItem(vida)>0);
}*/
//-------------------------------------------------------//
//Combate

const finalizarTurno=()=>{
    esqueletoEscudero.accionEnemy(esqueletoEscudero,objetive(dado(0,2)),dado(0,6));   
    esqueletoGuerrero.accionEnemy(esqueletoGuerrero,objetive(dado(0,2)),dado(0,8));
    esqueletoArbalestero.accionEnemy(esqueletoArbalestero,objetive(dado(0,2)),dado(0,8));
    hideButton();                                   //ocultar boton de ronda
    mostrar();
    showContent('cruzado', cruzado, 'hpHero1', 1);    //volver a heroe 1
    ronda+=1;                                       //sumar ronda
    console.log(`Ronda: ${ronda}`);
}
//-------------------------------------------------------//
const skillEnemy=(atacante)=>{
    switch (atacante) {
        case esqueletoEscudero:
            enemyAnimation('#esqEscuderoSkill1','esqueletoEscudero','skeleton_shield','animacion-skeleton-escudero-skill-1-body','skeleton_axe_animation','animacion-skeleton-escudero-skill-1-anim', `style= 'height: 400px'`);
            break;
        case esqueletoGuerrero:
            enemyAnimation('#esqGuerreroSkill1','esqueletoGuerrero','skeleton_common_attack','animacion-skeleton-guerrero-skill-1-body','','animacion-skeleton-guerrero-skill-1-anim', `style= 'height: px'`);
            break;
        case esqueletoArbalestero:
            enemyAnimation('#esqArbalesteroSkill1','esqueletoArbalestero','skeleton_crossbow','animacion-skeleton-Arbalestero-skill-1-body','','animacion-skeleton-Arbalestero-skill-1-anim', `style= 'height: px'`);
            break;
        default:
            break;
    }
}

