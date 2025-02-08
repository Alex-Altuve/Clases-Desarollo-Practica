interface Notifier {
    send(message: string): void;
}

class BaseDecorador implements Notifier {
    protected wrappee!: Notifier;

    constructor(notifier: Notifier) {
        this.wrappee = notifier;
    }
    send(message: string): void {
        this.wrappee.send(message);
    }
}

class Mensaje_Sencillo implements Notifier {
    send(message: string): void {
        console.log('Mensaje (sencillo): ' + message);
    }
}
class SMS_Decorator extends BaseDecorador{
    
    send(message: string): void {
       super.send(message);
       console.log('SMS enviado');
    }
}

class Slack_Decorator extends BaseDecorador{
    send(message: string): void {
        super.send(message);
        console.log('Slack sms enviado');
    }
}

class Facebook_Dcorator extends BaseDecorador{
    send(message: string): void {
        super.send(message);
        console.log('Facebook sms enviado');
    }
}

function clientCodeV_3(notifier: Notifier) {
    notifier.send('Hola, quiero mandar un mensaje con SMS');
}
console.log('-------MENSAJE QUE QUIERE MANDAR------------');
const simpleNotifier = new Mensaje_Sencillo();
clientCodeV_3(simpleNotifier);
console.log('');


console.log('-------- S M S-----------');
const SMSMessage = new SMS_Decorator(simpleNotifier);
clientCodeV_3(SMSMessage);

console.log('');
console.log('-------- S L A C K-----------');
const SlackMessage = new Slack_Decorator(simpleNotifier);
clientCodeV_3(SlackMessage);

console.log('');
console.log('-------- F A C E B O O K-----------');
const FacebookMessage = new Facebook_Dcorator(simpleNotifier);
clientCodeV_3(FacebookMessage);

console.log('');
console.log('-------- TODOS -----------');
const SMS_Slack = new Slack_Decorator(SMSMessage);
const SMS_Slack_Facebook = new Facebook_Dcorator(SMS_Slack);

clientCodeV_3(SMS_Slack_Facebook);

console.log('');
console.log('-------- SMS_SLACK-----------');
clientCodeV_3(SMS_Slack);