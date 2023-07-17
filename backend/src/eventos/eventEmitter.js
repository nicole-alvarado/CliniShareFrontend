import { EventEmitter } from 'events';
import loadListeners from './subscribers.js';

const emitter = new EventEmitter();

loadListeners(emitter);

export default emitter;