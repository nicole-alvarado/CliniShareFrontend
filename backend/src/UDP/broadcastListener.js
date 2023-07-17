import dgram from 'dgram';

import emitter from '../eventos/eventEmitter.js';

import {SERVER_PORT, MAGIC_STRING} from "./constants.js";

import { getComputadora } from './constants.js';

export async function listenForBroadcasts(){
    const computadora = await getComputadora();
    // non looping nonLoopingListeners
    let nonLoopingListeners = [];
    let i = 0;

    for(let ipName in computadora.IPS){
        let ip = computadora.IPS[ipName][0];
        
        nonLoopingListeners.push(dgram.createSocket("udp4"))

        nonLoopingListeners[i].bind(SERVER_PORT,ip,function(){
            console.log("listening for directed messages on " + ip);
        });

        nonLoopingListeners[i].on("message",function(message,rinfo){
        
            const computadoraNueva =JSON.parse(message);
            
            //si es la misma ip no hacemos nada (estamos enviando nosotros el mensaje)
            if(JSON.stringify(computadora) === JSON.stringify(computadoraNueva)) {
                return;
            }
    
            if(computadoraNueva){            
                
                computadoraNueva.MAGIC_STRING = computadora.MAGIC_STRING.trim();
                if(computadoraNueva.MAGIC_STRING === MAGIC_STRING){
                    console.log('Message from: ' + rinfo.address + ':' + rinfo.port +' - ' + message);
                    emitter.emit("new_computer_non_looping", computadoraNueva);
                }
            }
    
        });

    
    
        i++;
    }

    var listener = dgram.createSocket("udp4");

    listener.bind(SERVER_PORT,"255.255.255.255",function(){
        console.log("listening for broadcasts");
    });
    
    listener.on("message",function(message,rinfo){
        
        const computadoraNueva =JSON.parse(message);
        
        //si es la misma ip no hacemos nada (estamos enviando nosotros el mensaje)
        if(JSON.stringify(computadora) === JSON.stringify(computadoraNueva)) {
            return;
        }

        
        if(computadoraNueva){            
            computadoraNueva.MAGIC_STRING = computadora.MAGIC_STRING.trim();
            
            if(computadoraNueva.MAGIC_STRING === MAGIC_STRING){
                console.log('Message from: ' + rinfo.address + ':' + rinfo.port +' - ' + message);
                emitter.emit("new_computer", computadoraNueva);
            }
        }

    });
    
}

