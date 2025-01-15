import * as ping from './ping';
import * as imagePoll from './imagePoll';

export const commands = {
    [ping.meta.commandName]: ping,
    [imagePoll.meta.commandName]: imagePoll
}