
const fluent = require('fluent-ffmpeg');

const executeFfmpeg = args => {
    let command = fluent().output(' '); // pass "Invalid output" validation
    command._outputs[0].isFile = false; // disable adding "-y" argument
    command._outputs[0].target = ""; // bypass "Unable to find a suitable output format for ' '"

    command._global.get = () => { // append custom arguments
      return typeof args === "string" ? args.split(' ') : args;
    };
    return command;
  };

    executeFfmpeg("-re -i /home/ubuntu/example.avi -c:a aac -f flv rtmp://localhost/live/test") // rtmp://192.168.0.108/live/test
  .on('start', commandLine => console.log('start', commandLine))
  .on('codecData', codecData => console.log('codecData', codecData))
  .on('error', error => console.log('error', error))
  .on('stderr', stderr => console.log('stderr', stderr))
  .run();