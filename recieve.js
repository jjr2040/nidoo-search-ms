const amqp = require('amqplib/callback_api');

const q = 'booking';

amqp.connect('amqp://rabbit', (err, conn) => {

    console.log(err);

    conn.createChannel((err, channel) => {
        channel.assertQueue(q, { durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        channel.consume(q, msg => {
            console.log(" [x] Received %s", msg.content.toString());
        }, { noAck: true});        
    });
});

